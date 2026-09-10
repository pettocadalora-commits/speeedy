import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import type {
	FontFamily,
	FontWeight,
	ReaderSettings,
	ThemeName,
} from "../models/types.js";
import { getResolvedTheme } from "../services/theme-service.js";
import { LocaleController } from "../i18n/controller.js";
import { trackEvent } from "../utils/analytics.js";
import "./ui/range.js";
import "./ui/segmented.js";
import "./ui/toggle.js";

const FONTS: FontFamily[] = [
	"JetBrains Mono",
	"Fira Mono",
	"Source Code Pro",
	"Inconsolata",
	"IBM Plex Mono",
];

@customElement("settings-panel")
export class SettingsPanel extends LitElement {
	private i18n = new LocaleController(this);
	protected override createRenderRoot() {
		return this;
	}

	@property({ type: Object }) settings!: ReaderSettings;

	private emit(partial: Partial<ReaderSettings>): void {
		this.dispatchEvent(
			new CustomEvent("settings-change", {
				detail: { ...this.settings, ...partial },
				bubbles: true,
				composed: true,
			}),
		);
	}

	override render() {
		const s = this.settings;
		const theme: ThemeName = s.theme ?? "system";
		const effectiveTheme = theme === "system" ? getResolvedTheme(theme) : theme;
		const themeOptions: ("light" | "dark")[] = ["light", "dark"];
		const themeLabels: Record<"light" | "dark", string> = {
			light: `☀️ ${this.i18n.t("settings.light")}`,
			dark: `🌙 ${this.i18n.t("settings.dark")}`,
		};

		return html`
      <div class="flex flex-col gap-0 p-4 md:px-5 overflow-x-hidden">

        <!-- Theme -->
        <section class="pb-6">
          <span class="text-xs uppercase tracking-widest text-ui-muted block mb-2">${this.i18n.t("settings.theme")}</span>
          <speeedy-segmented
            group-label=${this.i18n.t("settings.theme")}
            .options=${themeOptions.map((t) => ({ value: t, label: themeLabels[t] }))}
            .value=${effectiveTheme}
            @change=${(e: CustomEvent) => {
							trackEvent("theme-changed", { theme: e.detail.value });
							this.emit({ theme: e.detail.value });
						}}
          ></speeedy-segmented>
        </section>

        <!-- Speed -->
        <section class="pb-6">
          <speeedy-range
            label=${this.i18n.t("settings.speed")}
            min="50" max="1600" step="25"
            .value=${s.wpm}
            unit=" WPM"
            min-label="50"
            max-label="1600"
            @change=${(e: CustomEvent) => this.emit({ wpm: e.detail.value })}
          ></speeedy-range>
        </section>

        <!-- Font Size -->
        <section class="pb-6">
          <speeedy-range
            label=${this.i18n.t("settings.fontSize")}
            min="16" max="256" step="4"
            .value=${s.fontSize}
            unit="px"
            @change=${(e: CustomEvent) => this.emit({ fontSize: e.detail.value })}
          ></speeedy-range>
        </section>

        <!-- Letter Spacing -->
        <section class="pb-6">
          <speeedy-range
            label=${this.i18n.t("settings.letterSpacing")}
            min="0" max="0.5" step="0.01"
            .value=${s.letterSpacing}
            .format=${(v: number) => `${v.toFixed(2)}em`}
            min-label="0em"
            max-label="0.5em"
            tip=${this.i18n.t("settings.letterSpacingTip")}
            @change=${(e: CustomEvent) => this.emit({ letterSpacing: e.detail.value })}
          ></speeedy-range>
        </section>

        <!-- Pivot Position -->
        <section class="pb-6">
          <speeedy-range
            label=${this.i18n.t("settings.pivotOffset")}
            min="-30" max="30" step="1"
            .value=${s.pivotOffset ?? 0}
            .format=${(v: number) => (v === 0 ? this.i18n.t("settings.centre") : v > 0 ? `+${v}%` : `${v}%`)}
            min-label="-30%"
            max-label="+30%"
            tip=${this.i18n.t("settings.pivotOffsetTip")}
            @change=${(e: CustomEvent) => this.emit({ pivotOffset: e.detail.value })}
          ></speeedy-range>
        </section>

        <!-- Words per flash -->
        <section class="pb-6">
          <span class="text-xs uppercase tracking-widest text-ui-muted block mb-2">${this.i18n.t("settings.wordsPerFlash")}</span>
          <speeedy-segmented
            group-label=${this.i18n.t("settings.wordsPerFlash")}
            .options=${[1, 2, 3, 4, 5].map((n) => ({ value: n, label: this.i18n.t(n === 1 ? "settings.oneWord" : "settings.words", { count: n }) }))}
            .value=${s.chunkSize}
            tip=${this.i18n.t("settings.wordsPerFlashTip")}
            @change=${(e: CustomEvent) => this.emit({ chunkSize: e.detail.value })}
          ></speeedy-segmented>
        </section>

        <!-- Advanced timing -->
        <section class="border-t border-base-200 pt-6 pb-2" aria-labelledby="settings-advanced-heading">
          <h2 id="settings-advanced-heading" class="text-xs uppercase tracking-widest text-ui-muted font-medium mb-4">
            ${this.i18n.t("settings.advancedTiming")}
          </h2>
          <div class="flex flex-col gap-5">
            <speeedy-range
              label=${this.i18n.t("settings.sentencePause")}
              min="1" max="10" step="0.5"
              .value=${s.sentencePauseMultiplier}
              unit="×"
              min-label="1×"
              max-label="10×"
              tip=${this.i18n.t("settings.sentencePauseTip")}
              @change=${(e: CustomEvent) => this.emit({ sentencePauseMultiplier: e.detail.value })}
            ></speeedy-range>
            <speeedy-range
              label=${this.i18n.t("settings.paragraphPause")}
              hint=${this.i18n.t("settings.paragraphPauseHint")}
              min="1" max="3" step="0.1"
              .value=${s.paragraphPauseMultiplier ?? 1}
              .format=${(v: number) => `${v.toFixed(1)}×`}
              min-label="1×"
              max-label="3×"
              tip=${this.i18n.t("settings.paragraphPauseTip")}
              @change=${(e: CustomEvent) => this.emit({ paragraphPauseMultiplier: e.detail.value })}
            ></speeedy-range>
            <div class="flex flex-col gap-3">
              <speeedy-toggle
                label=${this.i18n.t("settings.speedRamp")}
                hint=${this.i18n.t("settings.speedRampHint")}
                ?checked=${s.speedRampEnabled}
                tip=${this.i18n.t("settings.speedRampTip")}
                @change=${(e: CustomEvent) => this.emit({ speedRampEnabled: e.detail.value })}
              ></speeedy-toggle>
              ${
								s.speedRampEnabled
									? html`
                <speeedy-range
                  label=${this.i18n.t("settings.targetWpm")}
                  min="50" max="1600" step="25"
                  .value=${s.speedRampTarget}
                  unit=" WPM"
                  color="secondary"
                  min-label="50"
                  max-label="1600"
                  @change=${(e: CustomEvent) => this.emit({ speedRampTarget: e.detail.value })}
                ></speeedy-range>
              `
									: ""
							}
            </div>
          </div>
        </section>

        <!-- Accessibility & visuals -->
        <section class="border-t border-base-200 pt-6 pb-2" aria-labelledby="settings-a11y-heading">
          <h2 id="settings-a11y-heading" class="text-xs uppercase tracking-widest text-ui-muted font-medium mb-4">
            ${this.i18n.t("settings.accessibilityVisuals")}
          </h2>
          <div class="flex flex-col gap-6">
            <div>
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="text-xs uppercase tracking-widest text-ui-muted">${this.i18n.t("settings.readingFont")}</span>
                ${s.dyslexiaMode ? html`<span class="text-[10px] bg-warning text-warning-content px-1.5 py-0.5 rounded font-medium uppercase shrink-0">${this.i18n.t("settings.dyslexicActive")}</span>` : ""}
              </div>
              <div class="rounded-xl border border-base-200 bg-base-200/20 p-1.5 flex flex-col gap-0.5 ${s.dyslexiaMode ? "opacity-40 pointer-events-none grayscale" : ""}">
                ${FONTS.map(
									(font) => html`
                  <button
                    type="button"
                    class="btn btn-sm justify-start min-h-10 rounded-lg ${s.fontFamily === font ? "bg-base-100 shadow-sm font-semibold border border-primary/40" : "btn-ghost border border-transparent"}"
                    style="font-family: '${font}', monospace;"
                    @click=${() => this.emit({ fontFamily: font })}
                    ?disabled=${s.dyslexiaMode}
                    aria-pressed="${s.fontFamily === font}"
                  >${font}</button>
                `,
								)}
              </div>
            </div>
            <speeedy-range
              label=${this.i18n.t("settings.fontWeight")}
              min="300" max="800" step="100"
              .value=${s.fontWeight ?? 400}
              .format=${(v: number) => {
								const labels: Record<number, string> = {
									300: this.i18n.t("settings.weightLight"),
									400: this.i18n.t("settings.weightRegular"),
									500: this.i18n.t("settings.weightMedium"),
									600: this.i18n.t("settings.weightSemiBold"),
									700: this.i18n.t("settings.weightBold"),
									800: this.i18n.t("settings.weightExtraBold"),
								};
								return labels[v] ?? String(v);
							}}
              min-label=${this.i18n.t("settings.weightLight")}
              max-label=${this.i18n.t("settings.weightExtraBold")}
              tip=${this.i18n.t("settings.fontWeightTip")}
              @change=${(e: CustomEvent) => this.emit({ fontWeight: e.detail.value as FontWeight })}
            ></speeedy-range>
            <div class="flex flex-col gap-3">
              <span class="text-xs uppercase tracking-widest text-ui-muted">${this.i18n.t("settings.visualHighlights")}</span>
              <div class="rounded-xl border border-base-200/80 bg-base-100/40 p-3 flex flex-col gap-3">
                <div class="flex items-center justify-between gap-3">
                  <span class="text-sm text-base-content">${this.i18n.t("settings.pivotOrp")}</span>
                  <input
                    type="color" .value=${s.highlightColor}
                    aria-label=${this.i18n.t("settings.orpHighlightColor")}
                    @input=${(e: InputEvent) => this.emit({ highlightColor: (e.target as HTMLInputElement).value })}
                    class="w-9 h-9 rounded-lg shrink-0 cursor-pointer border border-base-300 bg-transparent"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <speeedy-toggle
                    label=${this.i18n.t("settings.colorizeDialogue")}
                    ?checked=${s.colorizeQuotes ?? false}
                    tip=${this.i18n.t("settings.colorizeDialogueTip")}
                    @change=${(e: CustomEvent) => this.emit({ colorizeQuotes: e.detail.value })}
                  ></speeedy-toggle>
                  ${
										s.colorizeQuotes
											? html`
                    <div class="flex items-center justify-between gap-3 pl-0.5">
                      <span class="text-xs text-ui-muted-subtle">${this.i18n.t("settings.quoteColor")}</span>
                      <input
                        type="color" .value=${s.quoteHighlightColor}
                        aria-label=${this.i18n.t("settings.dialogueHighlightColor")}
                        @input=${(e: InputEvent) => this.emit({ quoteHighlightColor: (e.target as HTMLInputElement).value })}
                        class="w-9 h-9 rounded-lg shrink-0 cursor-pointer border border-base-300 bg-transparent"
                      />
                    </div>
                  `
											: ""
									}
                </div>
                <div class="flex flex-col gap-2">
                  <speeedy-toggle
                    label=${this.i18n.t("settings.colorizeAsides")}
                    ?checked=${s.colorizeParens ?? false}
                    tip=${this.i18n.t("settings.colorizeAsidesTip")}
                    @change=${(e: CustomEvent) => this.emit({ colorizeParens: e.detail.value })}
                  ></speeedy-toggle>
                  ${
										s.colorizeParens
											? html`
                    <div class="flex items-center justify-between gap-3 pl-0.5">
                      <span class="text-xs text-ui-muted-subtle">${this.i18n.t("settings.asideColor")}</span>
                      <input
                        type="color" .value=${s.parenHighlightColor}
                        aria-label=${this.i18n.t("settings.asideHighlightColor")}
                        @input=${(e: InputEvent) => this.emit({ parenHighlightColor: (e.target as HTMLInputElement).value })}
                        class="w-9 h-9 rounded-lg shrink-0 cursor-pointer border border-base-300 bg-transparent"
                      />
                    </div>
                  `
											: ""
									}
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-4">
              <speeedy-toggle
                label=${this.i18n.t("settings.dyslexiaFriendlyFont")}
                ?checked=${s.dyslexiaMode}
                tip=${this.i18n.t("settings.dyslexiaFriendlyFontTip")}
                @change=${(e: CustomEvent) => {
									trackEvent("dyslexia-toggled", { enabled: e.detail.value });
									this.emit({ dyslexiaMode: e.detail.value });
								}}
              ></speeedy-toggle>
              <div>
                <span class="text-sm text-base-content block mb-2">${this.i18n.t("settings.irlenOverlayTint")}</span>
                <speeedy-segmented
                  .options=${(
										["none", "peach", "mint", "parchment"] as const
									).map((mode) => {
										const colors: Record<string, string> = {
											peach: "background: #ffcc99; color: #4d2600;",
											mint: "background: #ccffdd; color: #004d1a;",
											parchment: "background: #f4ead5; color: #5c4d33;",
										};
										return {
											value: mode,
											label:
												mode === "none"
											? this.i18n.t("common.off")
											: this.i18n.t(`settings.irlen${mode.charAt(0).toUpperCase()}${mode.slice(1)}` as "settings.irlenPeach" | "settings.irlenMint" | "settings.irlenParchment"),
											style: mode === "none" ? "" : colors[mode],
										};
									})}
                  .value=${s.irlenMode ?? "none"}
                  @change=${(e: CustomEvent) => this.emit({ irlenMode: e.detail.value })}
                ></speeedy-segmented>
                ${
									s.irlenMode && s.irlenMode !== "none"
										? html`
                  <div class="mt-3">
                    <speeedy-range
                      label=${this.i18n.t("settings.overlayIntensity")}
                      min="0.05" max="0.5" step="0.01"
                      .value=${s.irlenOpacity ?? 0.18}
                      .format=${(v: number) => `${Math.round(v * 100)}%`}
                      min-label="5%"
                      max-label="50%"
                      tip=${this.i18n.t("settings.overlayIntensityTip")}
                      @change=${(e: CustomEvent) => this.emit({ irlenOpacity: e.detail.value })}
                    ></speeedy-range>
                  </div>
                `
										: ""
								}
              </div>
            </div>
            <div class="flex flex-col gap-4 pt-2 border-t border-base-200/60">
              <span class="text-xs uppercase tracking-widest text-ui-muted">${this.i18n.t("settings.pauseAnchor")}</span>
              <div>
                <span class="text-sm text-base-content block mb-2">${this.i18n.t("settings.pauseViewMode")}</span>
                <speeedy-segmented
                  .options=${(["focus", "context", "fulltext"] as const).map((v) => ({ value: v, label: this.i18n.t(v === "focus" ? "settings.pauseFocus" : v === "context" ? "settings.pauseContext" : "settings.pauseFulltext") }))}
                  .value=${s.pauseView ?? "focus"}
                  @change=${(e: CustomEvent) => this.emit({ pauseView: e.detail.value })}
                ></speeedy-segmented>
              </div>
              <div>
                <span class="text-sm text-base-content block mb-2">${this.i18n.t("settings.bionicAnchorPosition")}</span>
                <speeedy-segmented
                  .options=${(["early", "balanced", "late"] as const).map((pos) => ({ value: pos, label: this.i18n.t(pos === "early" ? "settings.anchorEarly" : pos === "balanced" ? "settings.anchorBalanced" : "settings.anchorLate") }))}
                  .value=${s.bionicFocusPosition ?? "balanced"}
                  @change=${(e: CustomEvent) => this.emit({ bionicFocusPosition: e.detail.value })}
                ></speeedy-segmented>
              </div>
            </div>
          </div>
        </section>

        <!-- Reading features -->
        <section class="border-t border-base-200 pt-6 pb-2">
          <h2 class="text-xs uppercase tracking-widest text-ui-muted font-medium mb-4">${this.i18n.t("settings.readingFeatures")}</h2>
          <div class="flex flex-col gap-3">
            <speeedy-toggle
              label=${this.i18n.t("settings.showProgressBar")}
              ?checked=${s.showProgress}
              @change=${(e: CustomEvent) => this.emit({ showProgress: e.detail.value })}
            ></speeedy-toggle>
            <speeedy-toggle
              label=${this.i18n.t("settings.focusMode")}
              ?checked=${s.focusModeEnabled ?? false}
              tip=${this.i18n.t("settings.focusModeTip")}
              @change=${(e: CustomEvent) => this.emit({ focusModeEnabled: e.detail.value })}
            ></speeedy-toggle>
            <speeedy-toggle
              label=${this.i18n.t("settings.orpGuideMarks")}
              ?checked=${s.showOrpGuides}
              tip=${this.i18n.t("settings.orpGuideMarksTip")}
              @change=${(e: CustomEvent) => this.emit({ showOrpGuides: e.detail.value })}
            ></speeedy-toggle>
            <speeedy-toggle
              label=${this.i18n.t("settings.hideTrailingPunctuation")}
              ?checked=${s.hidePunctuationInDisplay ?? false}
              @change=${(e: CustomEvent) => this.emit({ hidePunctuationInDisplay: e.detail.value })}
            ></speeedy-toggle>
            <speeedy-toggle
              label=${this.i18n.t("settings.removeCitations")}
              ?checked=${s.removeCitations ?? false}
              tip=${this.i18n.t("settings.removeCitationsTip")}
              @change=${(e: CustomEvent) => this.emit({ removeCitations: e.detail.value })}
            ></speeedy-toggle>
            <speeedy-toggle
              label=${this.i18n.t("settings.tickerMode")}
              ?checked=${s.tickerMode ?? false}
              tip=${this.i18n.t("settings.tickerModeTip")}
              @change=${(e: CustomEvent) => this.emit({ tickerMode: e.detail.value })}
            ></speeedy-toggle>
            <speeedy-toggle
              label=${this.i18n.t("settings.smartSpeedLogic")}
              ?checked=${s.smartSpeed}
              tip=${this.i18n.t("settings.smartSpeedTip")}
              @change=${(e: CustomEvent) => this.emit({ smartSpeed: e.detail.value })}
            ></speeedy-toggle>
            <speeedy-toggle
              label=${this.i18n.t("settings.bionicReadingFixations")}
              ?checked=${s.bionicMode}
              tip=${this.i18n.t("settings.bionicReadingTip")}
              @change=${(e: CustomEvent) => {
								trackEvent("bionic-toggled", { enabled: e.detail.value });
								this.emit({ bionicMode: e.detail.value });
							}}
            ></speeedy-toggle>

            <div class="flex flex-col gap-2">
              <speeedy-toggle
                label=${this.i18n.t("settings.peripheralContext")}
                ?checked=${s.peripheralContext}
                tip=${this.i18n.t("settings.peripheralContextTip")}
                @change=${(e: CustomEvent) => this.emit({ peripheralContext: e.detail.value })}
              ></speeedy-toggle>
              ${
								s.peripheralContext
									? html`
                <div class="pl-1 mt-1">
                  <speeedy-range
                    label=${this.i18n.t("settings.contextDensity")}
                    min="1" max="3" step="1"
                    .value=${s.peripheralContextCount ?? 1}
                    min-label="1"
                    max-label="3"
                    @change=${(e: CustomEvent) => this.emit({ peripheralContextCount: e.detail.value })}
                  ></speeedy-range>
                </div>
              `
									: ""
							}
            </div>
          </div>
        </section>

        <!-- Audio -->
        <section class="border-t border-base-200 pt-6 pb-2">
          <h2 class="text-xs uppercase tracking-widest text-ui-muted font-medium mb-4">${this.i18n.t("settings.audioFocus")}</h2>
          <div class="flex flex-col gap-5">
            <!-- Clicks -->
            <div class="flex flex-col gap-3">
              <speeedy-toggle
                label=${this.i18n.t("settings.tactileWordClicks")}
                ?checked=${s.clickSoundEnabled ?? false}
                tip=${this.i18n.t("settings.tactileWordClicksTip")}
                @change=${(e: CustomEvent) => this.emit({ clickSoundEnabled: e.detail.value })}
              ></speeedy-toggle>
              ${
								s.clickSoundEnabled
									? html`
                <div class="pl-1">
                  <speeedy-range
                    label=${this.i18n.t("settings.clickPitchFactor")}
                    min="0.1" max="3.0" step="0.1"
                    .value=${s.clickSoundPitch ?? 1.0}
                    .format=${(v: number) => `${v.toFixed(1)}x`}
                    min-label="0.1x"
                    max-label="3.0x"
                    @change=${(e: CustomEvent) => this.emit({ clickSoundPitch: e.detail.value })}
                  ></speeedy-range>
                </div>
              `
									: ""
							}
            </div>
            <!-- Ambient -->
            <div class="flex flex-col gap-3">
              <div>
                <span class="text-sm text-base-content block mb-2">${this.i18n.t("settings.ambientFocusNoise")}</span>
                <speeedy-segmented
                  .options=${(["none", "white", "pink", "brown"] as const).map(
										(n) => {
											const colors: Record<string, string> = {
												white: "background: #f8fafc; color: #0f172a;",
												pink: "background: #fce7f3; color: #831843;",
												brown: "background: #78350f; color: #fef3c7;",
											};
											return {
												value: n,
												label:
													n === "none"
												? this.i18n.t("common.off")
												: this.i18n.t(n === "white" ? "settings.noiseWhite" : n === "pink" ? "settings.noisePink" : "settings.noiseBrown"),
												style: n === "none" ? "" : colors[n],
											};
										},
									)}
                  .value=${s.ambientNoise ?? "none"}
                  @change=${(e: CustomEvent) => {
										if (e.detail.value !== "none") {
											trackEvent("ambient-noise-changed", {
												type: e.detail.value,
											});
										}
										this.emit({ ambientNoise: e.detail.value });
									}}
                ></speeedy-segmented>
              </div>
              ${
								s.ambientNoise && s.ambientNoise !== "none"
									? html`
                <div class="pl-1">
                  <speeedy-range
                    label=${this.i18n.t("settings.noiseVolume")}
                    min="0" max="1" step="0.05"
                    .value=${s.ambientVolume ?? 0.5}
                    .format=${(v: number) => `${Math.round(v * 100)}%`}
                    min-label="0%"
                    max-label="100%"
                    @change=${(e: CustomEvent) => this.emit({ ambientVolume: e.detail.value })}
                  ></speeedy-range>
                </div>
              `
									: ""
							}
            </div>
          </div>
        </section>

        <!-- Engine logic -->
        <section class="border-t border-base-200 pt-6 pb-4">
          <h2 class="text-xs uppercase tracking-widest text-ui-muted font-medium mb-4">${this.i18n.t("settings.engineLogic")}</h2>
          <div class="flex flex-col gap-4">
            <speeedy-toggle
              label=${this.i18n.t("settings.startCountdown")}
              ?checked=${s.countdownEnabled ?? false}
              tip=${this.i18n.t("settings.startCountdownTip")}
              @change=${(e: CustomEvent) => this.emit({ countdownEnabled: e.detail.value })}
            ></speeedy-toggle>
            <speeedy-toggle
              label=${this.i18n.t("settings.commaPauseBeacon")}
              ?checked=${s.commaAsPause ?? false}
              tip=${this.i18n.t("settings.commaPauseTip")}
              @change=${(e: CustomEvent) => this.emit({ commaAsPause: e.detail.value })}
            ></speeedy-toggle>
            <speeedy-toggle
              label=${this.i18n.t("settings.asideClosingPause")}
              ?checked=${s.contextPauseOnClose ?? true}
              tip=${this.i18n.t("settings.asideClosingPauseTip")}
              @change=${(e: CustomEvent) => this.emit({ contextPauseOnClose: e.detail.value })}
            ></speeedy-toggle>
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-base-content">${this.i18n.t("settings.rewindSkipAmount")}</span>
                <span class="font-mono text-sm font-medium">${this.i18n.t("settings.wordCountShort", { count: s.rewindStep ?? 5 })}</span>
              </div>
              <div class="flex items-center gap-1.5">
                ${([1, 3, 5] as const).map(
									(n) => html`
                  <button
                    class="btn btn-xs flex-1 ${(s.rewindStep ?? 5) === n ? "btn-primary" : "btn-ghost border border-base-300"}"
                    @click=${() => this.emit({ rewindStep: n })}
                  >${n}</button>
                `,
								)}
                <div class="flex-1 min-w-12 relative">
                  <input
                    type="number" min="1" max="100"
                    .value=${String([1, 3, 5].includes(s.rewindStep ?? 5) ? "" : s.rewindStep)}
                    placeholder=${[1, 3, 5].includes(s.rewindStep ?? 5) ? "..." : ""}
                    @input=${(e: InputEvent) => {
											const val = Number((e.target as HTMLInputElement).value);
											if (val > 0) this.emit({ rewindStep: val });
										}}
                    class="input input-xs input-bordered w-full pr-4 text-center font-mono"
                  />
                  <span class="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] opacity-30 pointer-events-none">${this.i18n.t("settings.wordSuffix")}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div class="h-2"></div>
      </div>
    `;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"settings-panel": SettingsPanel;
	}
}
