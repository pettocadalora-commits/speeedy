import type { ReactiveController, ReactiveControllerHost } from "lit";
import {
	getLocale,
	type Locale,
	type MessageKey,
	onLocaleChange,
	type TVars,
	t as translate,
} from "./index.js";

/**
 * One-line Lit binding for the i18n core.
 *
 *   private i18n = new LocaleController(this);
 *   ... html`<button>${this.i18n.t("common.close")}</button>`
 *
 * The host re-renders automatically when the locale changes.
 */
export class LocaleController implements ReactiveController {
	private readonly host: ReactiveControllerHost;
	private unsubscribe?: () => void;

	constructor(host: ReactiveControllerHost) {
		this.host = host;
		host.addController(this);
	}

	hostConnected(): void {
		this.unsubscribe = onLocaleChange(() => this.host.requestUpdate());
	}

	hostDisconnected(): void {
		this.unsubscribe?.();
		this.unsubscribe = undefined;
	}

	get locale(): Locale {
		return getLocale();
	}

	t(key: MessageKey, vars?: TVars): string {
		return translate(key, vars);
	}
}
