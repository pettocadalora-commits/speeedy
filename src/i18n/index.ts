import { en, type Messages } from "./locales/en.js";
import { ptBR } from "./locales/pt-BR.js";

/**
 * Minimal, dependency-free i18n core.
 *
 * Deliberately PURE: no DOM, no CSS, no Lit. The Lit binding lives in
 * `controller.ts` so this module stays importable from the browser extension
 * context (see the shared-core purity rule in docs/evolucao.md).
 */
export type Locale = "pt-BR" | "en";

export const LOCALES: readonly Locale[] = ["pt-BR", "en"];
export const DEFAULT_LOCALE: Locale = "pt-BR";
export const LOCALE_STORAGE_KEY = "speeedy:locale";

export const LOCALE_LABELS: Record<Locale, string> = {
	"pt-BR": "Português (Brasil)",
	en: "English",
};

const CATALOGUES: Record<Locale, Messages> = {
	"pt-BR": ptBR,
	en,
};

/** Union of every dot-path key, e.g. "common.close" | "reader.play". */
type Leaves<T, P extends string = ""> = {
	[K in keyof T & string]: T[K] extends string
		? P extends ""
			? K
			: `${P}.${K}`
		: Leaves<T[K], P extends "" ? K : `${P}.${K}`>;
}[keyof T & string];

export type MessageKey = Leaves<Messages>;

export type TVars = Record<string, string | number>;

function resolve(catalogue: Messages, key: string): string | undefined {
	let node: unknown = catalogue;
	for (const part of key.split(".")) {
		if (typeof node !== "object" || node === null) return undefined;
		node = (node as Record<string, unknown>)[part];
	}
	return typeof node === "string" ? node : undefined;
}

function interpolate(raw: string, vars?: TVars): string {
	if (!vars) return raw;
	return raw.replace(/\{(\w+)\}/g, (match, name: string) =>
		name in vars ? String(vars[name]) : match,
	);
}

function readStored(): Locale | null {
	try {
		const raw = globalThis.localStorage?.getItem(LOCALE_STORAGE_KEY);
		return raw && (LOCALES as readonly string[]).includes(raw)
			? (raw as Locale)
			: null;
	} catch {
		return null;
	}
}

function readFromNavigator(): Locale | null {
	const langs = globalThis.navigator?.languages ?? [];
	for (const lang of langs) {
		if (/^pt(-br)?$/i.test(lang)) return "pt-BR";
		if (/^en/i.test(lang)) return "en";
	}
	return null;
}

export function detectLocale(): Locale {
	const param = new URLSearchParams(globalThis.location?.search ?? "").get(
		"lang",
	);
	if (param && (LOCALES as readonly string[]).includes(param)) {
		return param as Locale;
	}
	return readStored() ?? readFromNavigator() ?? DEFAULT_LOCALE;
}

let currentLocale: Locale = detectLocale();
const listeners = new Set<(locale: Locale) => void>();

export function getLocale(): Locale {
	return currentLocale;
}

export function setLocale(
	locale: Locale,
	options?: { persist?: boolean },
): void {
	if (!(LOCALES as readonly string[]).includes(locale)) return;
	currentLocale = locale;
	if (options?.persist !== false) {
		try {
			globalThis.localStorage?.setItem(LOCALE_STORAGE_KEY, locale);
		} catch {
			/* private mode: locale stays session-only */
		}
	}
	for (const listener of listeners) listener(locale);
}

export function onLocaleChange(listener: (locale: Locale) => void): () => void {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

/**
 * Translate a key in the active locale. Falls back to English, then to the key
 * itself, so a missing translation degrades visibly instead of throwing.
 */
export function t(key: MessageKey, vars?: TVars): string {
	const raw = resolve(CATALOGUES[currentLocale], key) ?? resolve(en, key);
	return interpolate(raw ?? key, vars);
}

/** Same as `t`, but for a runtime-known key (e.g. built from data). */
export function tDynamic(key: string, vars?: TVars): string {
	const raw = resolve(CATALOGUES[currentLocale], key) ?? resolve(en, key);
	return interpolate(raw ?? key, vars);
}
