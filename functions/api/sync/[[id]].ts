/**
 * Speeedy cloud sync — zero-knowledge blob vault.
 *
 * The server stores and returns CIPHERTEXT ONLY. The AES-GCM key lives
 * exclusively on the paired devices; there is no account, no email, no PII and
 * no way for this backend to read a title, a statistic or a word of text.
 *
 * Routes (see docs/cloud-sync.md):
 *   PUT    /api/sync/<id>   store envelope, returns { rev }
 *   GET    /api/sync/<id>   read envelope, 404 when absent
 *   DELETE /api/sync/<id>   destroy the vault
 *
 * The <id> is a 128-bit random identifier generated on the client; it *is* the
 * capability. Nothing here is enumerable.
 */

interface KVNamespaceLike {
	get(key: string): Promise<string | null>;
	put(
		key: string,
		value: string,
		options?: { expirationTtl?: number },
	): Promise<void>;
	delete(key: string): Promise<void>;
}

interface Env {
	SPEEDY_SYNC: KVNamespaceLike;
}

interface Context {
	request: Request;
	env: Env;
	params: Record<string, string | string[]>;
}

/** Envelope ceiling: base64url ciphertext of a ≤2 MB snapshot, plus slack. */
const MAX_ENVELOPE_BYTES = 3_500_000;
/** 128-bit ids in base64url (22 chars) or hex (32 chars). */
const ID_PATTERN = /^[A-Za-z0-9_-]{20,64}$/;
const RATE_LIMIT_PER_MINUTE = 60;
const RATE_LIMIT_IP_FALLBACK = "unknown";

function json(body: unknown, status = 200): Response {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			"content-type": "application/json; charset=utf-8",
			"cache-control": "no-store",
		},
	});
}

function clientIp(request: Request): string {
	return (
		request.headers.get("cf-connecting-ip") ??
		request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
		RATE_LIMIT_IP_FALLBACK
	);
}

async function isRateLimited(env: Env, request: Request): Promise<boolean> {
	const bucket = Math.floor(Date.now() / 60_000);
	const key = `rl:${clientIp(request)}:${bucket}`;
	const current = Number.parseInt((await env.SPEEDY_SYNC.get(key)) ?? "0", 10);
	if (current >= RATE_LIMIT_PER_MINUTE) return true;
	await env.SPEEDY_SYNC.put(key, String(current + 1), { expirationTtl: 180 });
	return false;
}

export const onRequest = async (context: Context): Promise<Response> => {
	const { request, env, params } = context;
	const raw = params.id;
	const id = Array.isArray(raw) ? raw[0] : raw;

	if (!id || !ID_PATTERN.test(id)) {
		return json({ error: "invalid_sync_id" }, 400);
	}

	if (!env?.SPEEDY_SYNC) {
		return json({ error: "sync_unavailable" }, 503);
	}

	let limited = false;
	try {
		limited = await isRateLimited(env, request);
	} catch {
		// Never let the limiter take down the endpoint.
		limited = false;
	}
	if (limited) {
		return json({ error: "rate_limited" }, 429);
	}

	switch (request.method.toUpperCase()) {
		case "GET": {
			const stored = await env.SPEEDY_SYNC.get(id);
			if (stored === null) return json({ error: "not_found" }, 404);
			return new Response(stored, {
				status: 200,
				headers: {
					"content-type": "application/json; charset=utf-8",
					"cache-control": "no-store",
				},
			});
		}

		case "PUT": {
			const body = await request.text();
			if (!body) return json({ error: "empty_body" }, 400);
			if (body.length > MAX_ENVELOPE_BYTES) {
				return json({ error: "payload_too_large" }, 413);
			}
			try {
				JSON.parse(body);
			} catch {
				return json({ error: "invalid_json" }, 400);
			}
			// KV has no multi-operation transactions: `rev` is the server write
			// stamp, used by clients to notice that the remote moved on.
			const stored = JSON.stringify({ payload: body, rev: Date.now() });
			await env.SPEEDY_SYNC.put(id, stored);
			return json({ rev: JSON.parse(stored).rev });
		}

		case "DELETE": {
			await env.SPEEDY_SYNC.delete(id);
			return json({ deleted: true });
		}

		default:
			return json({ error: "method_not_allowed" }, 405);
	}
};
