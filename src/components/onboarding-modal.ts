import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { Zap } from "lucide";
import type { UserProfile } from "../models/types.js";
import { DEFAULT_SETTINGS } from "../services/defaults.js";
import { type PlaybackState, RSVPEngine } from "../services/rsvp-engine.js";
import { saveProfile } from "../services/storage-service.js";
import { applyBionicReading } from "../services/text-parser.js";
import { trackEvent } from "../utils/analytics.js";
import { emitProfileUpdated } from "../utils/events.js";
import { icon } from "../utils/icons.js";
import { LocaleController } from "../i18n/controller.js";
import "./ui/dialog.js";

@customElement("onboarding-modal")
export class OnboardingModal extends LitElement {
	private i18n = new LocaleController(this);

	protected override createRenderRoot() {
		return this;
	}

	@property({ type: Object }) profile!: UserProfile;
	@property({ type: String }) currentRoute = "";
	@state() private isOpen = false;
	@state() private step: "welcome" | "dyslexia" | "confirm" = "welcome";
	@state() private dyslexiaMode = false;
	@state() private bionicMode = false;

	@state() private demoEngine = new RSVPEngine();
	@state() private demoState: PlaybackState | null = null;

	override updated(
		changedProperties: Map<string | number | symbol, unknown>,
	): void {
		if (
			changedProperties.has("currentRoute") ||
			changedProperties.has("profile")
		) {
			if (
				this.currentRoute === "app" &&
				this.profile &&
				!this.profile.onboardingSeen &&
				!this.isOpen
			) {
				setTimeout(() => {
					this.isOpen = true;
					this.initDemo();
				}, 600);
			}
		}

		if (
			this.isOpen &&
			(changedProperties.has("dyslexiaMode") ||
				changedProperties.has("bionicMode"))
		) {
			this.demoEngine.setWpm(this.getDemoSettings());
		}
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.demoEngine.stop();
	}

	private initDemo() {
		const settings = this.getDemoSettings();
		this.demoEngine.load(this.i18n.t("onboarding.previewText"), settings);
		this.demoEngine.on("word", (s) => {
			this.demoState = s;
		});
		this.demoEngine.on("complete", () => {
			setTimeout(() => {
				if (this.isOpen) this.demoEngine.play(this.getDemoSettings());
			}, 1000);
		});
		this.demoEngine.play(settings);
	}

	private getDemoSettings() {
		return {
			...DEFAULT_SETTINGS,
			wpm: 320,
			dyslexiaMode: this.dyslexiaMode,
			bionicMode: this.bionicMode,
			showOrpGuides: true,
		};
	}

	private renderPreviewWord() {
		if (!this.demoState?.currentOrp) {
			return html`<span class="text-base-content/20">…</span>`;
		}

		const orp = this.demoState.currentOrp;
		const highlightColor = this.profile?.settings?.highlightColor || "#e63946";

		const bionicMode = this.bionicMode;
		const before = bionicMode
			? unsafeHTML(applyBionicReading(orp.before))
			: orp.before;
		const after = bionicMode
			? unsafeHTML(applyBionicReading(orp.after))
			: orp.after;

		return html`
      <div 
        class="orp-container text-3xl sm:text-4xl max-w-full overflow-hidden" 
        style="font-family: ${this.dyslexiaMode ? "OpenDyslexic" : "'JetBrains Mono', monospace"}; letter-spacing: ${this.dyslexiaMode ? "0.05em" : "0"};"
      >
        <span class="orp-before text-base-content/40">${before}</span>
        <span class="orp-pivot-col">
          <span class="orp-guide" style="color:${highlightColor}"></span>
          <span style="color:${highlightColor}; font-weight:700; line-height:1">${orp.pivot}</span>
          <span class="orp-guide" style="color:${highlightColor}"></span>
        </span>
        <span class="orp-after text-base-content/40">${after}</span>
      </div>
    `;
	}

	private handleNext() {
		if (this.step === "welcome") {
			this.step = "dyslexia";
		} else if (this.step === "dyslexia") {
			this.step = "confirm";
		} else {
			this.complete();
		}
	}

	private complete() {
		const updated: UserProfile = {
			...this.profile,
			onboardingSeen: true,
			settings: {
				...this.profile.settings,
				dyslexiaMode: this.dyslexiaMode,
				bionicMode: this.bionicMode,
			},
		};
		trackEvent("onboarding-completed", {
			dyslexia: this.dyslexiaMode,
			bionic: this.bionicMode,
		});
		saveProfile(updated).then(() => {
			emitProfileUpdated(updated);
			this.isOpen = false;
		});
	}

	private skip = (): void => {
		const updated: UserProfile = { ...this.profile, onboardingSeen: true };
		trackEvent("onboarding-skipped", { step: this.step });
		saveProfile(updated).then(() => {
			emitProfileUpdated(updated);
			this.isOpen = false;
		});
	};

	override render() {
		return html`
      <speeedy-dialog .open=${this.isOpen} .dismissible=${false}>
        <!-- Modal Card -->
        <div class="relative w-[min(32rem,calc(100vw-2rem))] bg-base-100 rounded-3xl shadow-2xl overflow-hidden border border-base-200 animate-in zoom-in-95 fade-in duration-500">

          <button
            class="absolute top-4 right-4 text-xs text-base-content/40 hover:text-base-content/70 transition-colors z-10"
            data-umami-event="onboarding-skip"
            @click=${this.skip}
          >
            ${this.i18n.t("common.skip")}
          </button>

          <div class="p-8 sm:p-10 flex flex-col items-center text-center">
            ${this.renderStep()}
          </div>

          <!-- Progress Dots -->
          <div class="flex justify-center gap-1.5 pb-8">
            <div class="w-1.5 h-1.5 rounded-full ${this.step === "welcome" ? "bg-primary w-4" : "bg-base-300"} transition-all duration-300"></div>
            <div class="w-1.5 h-1.5 rounded-full ${this.step === "dyslexia" ? "bg-primary w-4" : "bg-base-300"} transition-all duration-300"></div>
            <div class="w-1.5 h-1.5 rounded-full ${this.step === "confirm" ? "bg-primary w-4" : "bg-base-300"} transition-all duration-300"></div>
          </div>
        </div>
      </speeedy-dialog>
    `;
	}

	private renderStep() {
		switch (this.step) {
			case "welcome":
				return html`
          <div class="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-primary/20">
            ${icon(Zap, "w-9 h-9 text-primary")}
          </div>
          <h2 class="text-3xl font-semibold mb-3 tracking-tight">${this.i18n.t("onboarding.welcomeTitle")}</h2>
          <p class="text-base-content/60 font-light leading-relaxed mb-8">
            ${this.i18n.t("onboarding.welcomeDescription")}
          </p>
          <button @click=${this.handleNext} class="btn btn-primary btn-lg rounded-2xl px-12 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            ${this.i18n.t("onboarding.getStarted")}
          </button>
        `;
			case "dyslexia":
				return html`
          <div class="w-full text-left">
            <h2 class="text-2xl font-semibold mb-2 tracking-tight">${this.i18n.t("onboarding.personalizeDisplay")}</h2>
            <p class="text-sm text-base-content/50 font-light mb-6">
              ${this.i18n.t("onboarding.accessibilityDescription")}
            </p>

            <div class="flex flex-col gap-4">
              <!-- Dyslexia Option -->
              <label 
                class="group p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 ${this.dyslexiaMode ? "border-primary bg-primary/5" : "border-base-200"}"
              >
                <div class="flex-1">
                  <div class="font-medium text-base">${this.i18n.t("onboarding.dyslexiaSupport")}</div>
                  <div class="text-xs text-base-content/50 font-light">${this.i18n.t("onboarding.dyslexiaSupportDescription")}</div>
                </div>
                <input 
                  type="checkbox" 
                  class="checkbox checkbox-primary" 
                  .checked=${this.dyslexiaMode}
                  @change=${(e: Event) => (this.dyslexiaMode = (e.target as HTMLInputElement).checked)}
                />
              </label>

              <!-- Bionic Option -->
              <label 
                class="group p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4 ${this.bionicMode ? "border-primary bg-primary/5" : "border-base-200"}"
              >
                <div class="flex-1">
                  <div class="font-medium text-base">${this.i18n.t("onboarding.bionicReading")}</div>
                  <div class="text-xs text-base-content/50 font-light">${this.i18n.t("onboarding.bionicReadingDescription")}</div>
                </div>
                <input 
                  type="checkbox" 
                  class="checkbox checkbox-primary" 
                  .checked=${this.bionicMode}
                  @change=${(e: Event) => (this.bionicMode = (e.target as HTMLInputElement).checked)}
                />
              </label>
            </div>

            <!-- Preview Section -->
            <div class="mt-8 p-6 rounded-2xl bg-base-200/50 border border-base-200 overflow-hidden flex items-center justify-center min-h-[140px] w-full relative">
              <div class="text-[10px] absolute top-4 left-6 uppercase tracking-widest text-base-content/30 font-bold mb-3">${this.i18n.t("onboarding.livePreview")}</div>
              ${this.renderPreviewWord()}
            </div>

            <button @click=${this.handleNext} class="btn btn-primary btn-block btn-lg rounded-2xl border-none shadow-lg shadow-primary/20 mt-8 hover:scale-[1.01] active:scale-[0.99] transition-all">
              ${this.i18n.t("onboarding.continue")}
            </button>
          </div>
        `;
			case "confirm":
				return html`
          <div class="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-6 text-2xl text-success">
            ✓
          </div>
          <h2 class="text-2xl font-semibold mb-3 tracking-tight">${this.i18n.t("onboarding.allSet")}</h2>
          <p class="text-base-content/60 font-light leading-relaxed mb-8">
            ${this.i18n.t("onboarding.settingsLater")}
          </p>
          <div class="grid grid-cols-2 gap-3 w-full">
            <button @click=${() => (this.step = "dyslexia")} class="btn btn-ghost rounded-2xl">${this.i18n.t("common.back")}</button>
            <button @click=${this.complete} class="btn btn-primary rounded-2xl shadow-lg shadow-primary/20">${this.i18n.t("onboarding.finish")}</button>
          </div>
        `;
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"onboarding-modal": OnboardingModal;
	}
}
