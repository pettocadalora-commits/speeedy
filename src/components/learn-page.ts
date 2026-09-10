import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./ui/page-nav.js";
import "./learn/learn-saccade-demo.js";
import "./learn/learn-wpm-chart.js";
import "./orp-demo.js";
import { LocaleController } from "../i18n/controller.js";
import {
	initDataReveal,
	initTipReveal,
	prefersReducedMotion,
} from "../utils/scroll-reveal.js";

const SCRAMBLE_CHARS = "✦◆▸◉✺⬡◈▲◇✸⬢◐▹◑";

interface TipItem {
	title: string;
	body: string;
	open: boolean;
}

@customElement("learn-page")
export class LearnPage extends LitElement {
	private i18n = new LocaleController(this);
	protected override createRenderRoot() {
		return this;
	}

	@state() private scrollProgress = 0;
	@state() private tips: TipItem[] = [
		{
			title: this.i18n.t("learn.tipStartSlowTitle"),
			body: this.i18n.t("learn.tipStartSlowBody"),
			open: false,
		},
		{
			title: this.i18n.t("learn.tipPunctuationTitle"),
			body: this.i18n.t("learn.tipPunctuationBody"),
			open: false,
		},
		{
			title: this.i18n.t("learn.tipTestTitle"),
			body: this.i18n.t("learn.tipTestBody"),
			open: false,
		},
		{
			title: this.i18n.t("learn.tipDailyTitle"),
			body: this.i18n.t("learn.tipDailyBody"),
			open: false,
		},
		{
			title: this.i18n.t("learn.tipContextTitle"),
			body: this.i18n.t("learn.tipContextBody"),
			open: false,
		},
		{
			title: this.i18n.t("learn.tipComfortTitle"),
			body: this.i18n.t("learn.tipComfortBody"),
			open: false,
		},
	];

	private _scrollHandler = () => {
		const el = this.querySelector("article");
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const total = el.scrollHeight - window.innerHeight;
		const scrolled = Math.max(0, -rect.top);
		this.scrollProgress = total > 0 ? Math.min(1, scrolled / total) : 0;
	};

	override connectedCallback(): void {
		super.connectedCallback();
		window.addEventListener("scroll", this._scrollHandler, { passive: true });
		requestAnimationFrame(() => {
			this._initDecodeHeadings();
			this._initScrollReveal();
		});
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		window.removeEventListener("scroll", this._scrollHandler);
	}

	private _initScrollReveal(): void {
		initDataReveal(this);
		initTipReveal(this);
	}

	private _initDecodeHeadings(): void {
		if (prefersReducedMotion()) return;

		const headings = this.querySelectorAll<HTMLElement>("h2[data-decode]");
		const obs = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						obs.unobserve(entry.target);
						this._decodeText(entry.target as HTMLElement);
					}
				}
			},
			{ threshold: 0.3 },
		);
		for (const h of headings) obs.observe(h);
	}

	private _decodeText(el: HTMLElement): void {
		const original = el.dataset.decode ?? el.textContent ?? "";
		const chars = original.split("");
		const total = chars.length;
		let frame = 0;
		const totalFrames = Math.ceil(total * 1.5);

		const tick = () => {
			const progress = frame / totalFrames;
			const revealed = Math.floor(progress * total);
			const html = chars
				.map((c, i) => {
					if (c === " ") return " ";
					if (i < revealed) return c;
					const scrambleChar =
						SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
					return `<span class="learn-heading-scramble" aria-hidden="true">${scrambleChar}</span>`;
				})
				.join("");
			el.innerHTML = html;
			frame++;
			if (frame <= totalFrames) requestAnimationFrame(tick);
			else el.textContent = original;
		};
		requestAnimationFrame(tick);
	}

	private _toggleTip(i: number): void {
		this.tips = this.tips.map((t, idx) => ({
			...t,
			open: idx === i ? !t.open : t.open,
		}));
	}

	override render() {
		return html`
      <!-- Scroll progress bar -->
      <div class="learn-progress-bar" style="--scroll-progress: ${this.scrollProgress};"></div>

      <div class="learn-reading-surface">

        <!-- Nav -->
        <speeedy-page-nav label=${this.i18n.t("learn.navLabel")} back-href="#/" sticky></speeedy-page-nav>

        <!-- Article -->
        <article class="max-w-2xl mx-auto px-6 py-14" @scroll=${this._scrollHandler}>

          <!-- Header -->
          <p class="text-ui-body tracking-[0.35em] uppercase text-base-content mb-4 font-semibold" data-reveal>${this.i18n.t("learn.science")}</p>
          <h1 class="text-ui-hero font-semibold text-base-content leading-tight mb-5" data-reveal>
            ${this.i18n.t("learn.heroTitle")}<br/>
            <span class="font-semibold">${this.i18n.t("learn.heroSubtitle")}</span>
          </h1>
          <p class="text-ui-body text-ui-muted leading-relaxed mb-14" data-reveal>
            ${this.i18n.t("learn.intro")}
          </p>

          <!-- Animated stats -->
          <div class="grid grid-cols-3 border border-base-300/60 rounded-2xl overflow-hidden mb-3" data-reveal>
            ${this.statCell("238", this.i18n.t("learn.statAdult"), false)}
            ${this.statCell("400+", this.i18n.t("learn.statRsvp"), true)}
            ${this.statCell("~10%", this.i18n.t("learn.statEyeMovement"), false)}
          </div>
          <p class="text-ui-body text-ui-muted mb-14" data-reveal>${this.i18n.t("learn.sourcesIntro")}</p>

          <h2 class="text-ui-title font-semibold text-base-content mb-4" data-reveal data-decode="The real bottleneck is your eyes, not your brain">
            ${this.i18n.t("learn.eyesTitle")}
          </h2>
          <p class="text-ui-body text-ui-muted leading-[1.9] mb-5" data-reveal>
            ${this.i18n.t("learn.eyesBeforeSaccades")} <em>${this.i18n.t("learn.saccades")}</em>${this.i18n.t("learn.eyesAfterSaccades")}
          </p>

          <!-- Saccade visualization -->
          <div class="mb-5" data-reveal>
            <learn-saccade-demo></learn-saccade-demo>
          </div>

          <p class="text-ui-body text-ui-muted leading-[1.9] mb-2" data-reveal>
            ${this.i18n.t("learn.brainSpeed")}
          </p>
          <p class="text-ui-body text-ui-muted mb-14" data-reveal>${this.i18n.t("learn.sourceRayner")}</p>

          <h2 class="text-ui-title font-semibold text-base-content mb-4" data-reveal data-decode="What is RSVP?">
            ${this.i18n.t("learn.rsvpTitle")}
          </h2>
          <p class="text-ui-body text-ui-muted leading-[1.9] mb-4" data-reveal>
            <strong class="font-semibold text-base-content">RSVP</strong>${this.i18n.t("learn.rsvpExplanation")}
          </p>
          <div class="rounded-xl border-l-4 border-primary bg-primary/5 px-5 py-4 mb-4" data-reveal>
            <p class="text-ui-body text-base-content leading-[1.85]">
              ${this.i18n.t("learn.rsvpCallout")}
            </p>
          </div>
          <p class="text-ui-body text-ui-muted leading-[1.9] mb-2" data-reveal>
            ${this.i18n.t("learn.rsvpWorksBefore")}<strong class="font-semibold text-base-content">${this.i18n.t("learn.linearText")}</strong>${this.i18n.t("learn.rsvpWorksAfter")}
          </p>
          <p class="text-ui-body text-ui-muted mb-14" data-reveal>${this.i18n.t("learn.sourceMasson")}</p>

          <h2 class="text-ui-title font-semibold text-base-content mb-4" data-reveal data-decode="RSVP beyond speed">
            ${this.i18n.t("learn.beyondTitle")}
          </h2>
          <p class="text-ui-body text-ui-muted leading-[1.9] mb-4" data-reveal>
            ${this.i18n.t("learn.beyondIntro")}
          </p>
          <div class="rounded-xl border-l-4 border-primary bg-primary/5 px-5 py-4 mb-4" data-reveal>
            <p class="text-ui-body text-base-content leading-[1.85]">
              ${this.i18n.t("learn.beyondCallout")}
            </p>
          </div>
          <p class="text-ui-body text-ui-muted leading-[1.9] mb-14" data-reveal>
            ${this.i18n.t("learn.accessibility")}
          </p>

          <h2 class="text-ui-title font-semibold text-base-content mb-4" data-reveal data-decode="The Optimal Recognition Point (ORP)">
            ${this.i18n.t("learn.orpTitle")}
          </h2>
          <p class="text-ui-body text-ui-muted leading-[1.9] mb-6" data-reveal>
            ${this.i18n.t("learn.orpBeforeOvp")} <strong class="font-semibold text-base-content">${this.i18n.t("learn.optimalViewingPosition")}</strong>${this.i18n.t("learn.orpBetween")} <strong class="font-semibold text-base-content">${this.i18n.t("learn.optimalRecognitionPoint")}</strong>${this.i18n.t("learn.orpAfter")}
          </p>

          <div class="mb-3" data-reveal>
            <speeedy-orp-demo tone="surface" hint=${this.i18n.t("learn.orpHint")}></speeedy-orp-demo>
          </div>
          <p class="text-ui-body text-ui-muted mb-14" data-reveal>${this.i18n.t("learn.sourceORegan")}</p>

          <h2 class="text-ui-title font-semibold text-base-content mb-4" data-reveal data-decode="What is a normal reading speed?">
            ${this.i18n.t("learn.normalSpeedTitle")}
          </h2>
          <div class="mb-4" data-reveal>
            <learn-wpm-chart></learn-wpm-chart>
          </div>
          <p class="text-ui-body text-ui-muted leading-[1.9] mb-14" data-reveal>
            ${this.i18n.t("learn.baseline")}
          </p>

          <h2 class="text-ui-title font-semibold text-base-content mb-4" data-reveal data-decode="Does speed reading hurt comprehension?">
            ${this.i18n.t("learn.comprehensionTitle")}
          </h2>
          <p class="text-ui-body text-ui-muted leading-[1.9] mb-4" data-reveal>
            ${this.i18n.t("learn.comprehensionBefore")} <strong class="font-semibold text-base-content">${this.i18n.t("learn.rsvpModerate")}</strong>${this.i18n.t("learn.comprehensionAfter")}
          </p>
          <div class="rounded-xl border-l-4 border-primary bg-primary/5 px-5 py-4 mb-4" data-reveal>
            <p class="text-ui-body text-base-content leading-[1.85]">
              ${this.i18n.t("learn.comprehensionCallout")}
            </p>
          </div>
          <p class="text-ui-body text-ui-muted leading-[1.9] mb-2" data-reveal>
            ${this.i18n.t("learn.subvocalization")}
          </p>
          <p class="text-ui-body text-ui-muted mb-14" data-reveal>${this.i18n.t("learn.sourcesComprehension")}</p>

          <h2 class="text-ui-title font-semibold text-base-content mb-4" data-reveal data-decode="What is bionic reading?">
            ${this.i18n.t("learn.bionicTitle")}
          </h2>
          <p class="text-ui-body text-ui-muted leading-[1.9] mb-4" data-reveal>
            <strong class="font-semibold text-base-content">${this.i18n.t("learn.bionicReading")}</strong>${this.i18n.t("learn.bionicExplanation")}
          </p>
          <div class="rounded-xl border border-base-300/60 bg-base-200/30 px-5 py-4 mb-4" data-reveal>
            <p class="text-ui-body text-ui-muted leading-[1.85]">
              <strong class="font-semibold text-base-content">${this.i18n.t("learn.note")}</strong> ${this.i18n.t("learn.bionicNote")}
            </p>
          </div>
          <p class="text-ui-body text-ui-muted leading-[1.9] mb-14" data-reveal>
            ${this.i18n.t("learn.bionicOption")}
          </p>

          <h2 class="text-ui-title font-semibold text-base-content mb-6" data-reveal data-decode="How to improve your reading speed">
            ${this.i18n.t("learn.tipsTitle")}
          </h2>
          <div class="space-y-0 divide-y divide-base-300/50 mb-14" data-reveal>
            ${this.tips.map(
							(tip, i) => html`
              <div class="py-0" data-tip-item>
                <button
                  type="button"
                  class="w-full flex items-center justify-between gap-4 py-4 text-left group"
                  @click=${() => this._toggleTip(i)}
                  aria-expanded=${tip.open}
                >
                  <div class="flex items-center gap-3 min-w-0">
                    <span class="font-mono text-ui-body shrink-0 w-5 transition-colors duration-200 ${tip.open ? "text-base-content" : "text-ui-muted-subtle"}">${i + 1}.</span>
                    <span class="text-ui-body font-semibold transition-colors duration-200 text-base-content">${tip.title}</span>
                  </div>
                  <svg class="w-4 h-4 shrink-0 transition-all duration-300 ${tip.open ? "rotate-45 text-base-content" : "text-ui-muted-subtle"}"
                    fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                </button>
                <div class="learn-tip-body ${tip.open ? "open" : ""}">
                  <div class="learn-tip-inner">
                    <p class="text-ui-body text-ui-muted leading-[1.85] pb-4 pl-8">${tip.body}</p>
                  </div>
                </div>
              </div>
            `,
						)}
          </div>

          <!-- CTA -->
          <div class="border border-primary/20 rounded-2xl p-8 text-center bg-primary/3" data-reveal
            style="box-shadow: 0 0 40px color-mix(in oklab, var(--color-primary) 8%, transparent);">
            <p class="text-ui-body tracking-[0.35em] uppercase text-base-content mb-4 font-semibold">${this.i18n.t("learn.ready")}</p>
            <h2 class="text-ui-hero font-semibold text-base-content mb-3">${this.i18n.t("learn.findSpeed")}</h2>
            <p class="text-ui-body text-ui-muted leading-relaxed mb-7 max-w-xs mx-auto">
              ${this.i18n.t("learn.ctaDescription")}
            </p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#/benchmark" class="btn btn-primary rounded-full px-8">${this.i18n.t("learn.takeTest")}</a>
              <a href="#/app" class="btn btn-ghost text-ui-muted hover:text-base-content">${this.i18n.t("learn.openApp")}</a>
            </div>
          </div>

        </article>
      </div>
    `;
	}

	private statCell(value: string, label: string, accent: boolean) {
		const labelTone = accent ? "text-ui-muted font-medium" : "text-ui-muted";
		return html`
      <div class="py-6 px-4 text-center ${accent ? "border-x border-base-300/60" : ""}">
        <div class="text-ui-hero font-semibold tabular-nums leading-none text-base-content">${value}</div>
        <div class="text-ui-body ${labelTone} mt-1 leading-snug">${label}</div>
      </div>
    `;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"learn-page": LearnPage;
	}
}
