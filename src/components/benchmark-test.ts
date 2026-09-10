import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Heart } from "lucide";
import type { BenchmarkPassage } from "../data/benchmark-passages.js";
import { getBenchmarkPassages } from "../data/benchmark-passages.js";
import { LocaleController } from "../i18n/controller.js";
import type { Locale } from "../i18n/index.js";
import { onLocaleChange } from "../i18n/index.js";
import type { UserProfile } from "../models/types.js";
import { tokenize } from "../services/rsvp-engine.js";
import { saveProfile } from "../services/storage-service.js";
import {
	comprehensionBracket,
	trackEvent,
	wpmBracket,
} from "../utils/analytics.js";
import { emitProfileUpdated, navigate } from "../utils/events.js";
import { icon } from "../utils/icons.js";
import "./ui/page-nav.js";

type Phase = "intro" | "reading" | "quiz" | "results";

/**
 * Sorteia uma passagem do locale pedido.
 *
 * Existe como função pura (e exportada) porque é justamente aqui que estava o
 * defeito: `pickPassage()` do arquivo de dados só enxerga o array inglês, então
 * as 5 passagens pt-BR nunca apareciam na interface. Cair para o inglês quando o
 * locale não tem passagens evita tela vazia.
 */
export function pickPassageForLocale(
	locale: Locale,
	excludeId?: string,
): BenchmarkPassage {
	const all = getBenchmarkPassages(locale);
	const available = excludeId
		? all.filter((p) => p.id !== excludeId)
		: all;
	const pool = available.length > 0 ? available : all;
	return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * WPM = tokens realmente lidos / minutos.
 *
 * O denominador vem do tokenizador, não do campo `wordCount` do arquivo de
 * dados: nas passagens inglesas herdadas do upstream esse campo desvia de +0,7%
 * a +5,8% (sleep-science declara 308, o tokenizador produz 291), inflando o WPM.
 */
export function computeWpm(text: string, elapsedMs: number): number {
	const elapsedMinutes = elapsedMs / 60_000;
	return Math.round(tokenize(text).length / Math.max(elapsedMinutes, 0.1));
}

@customElement("benchmark-test")
export class BenchmarkTest extends LitElement {
	private i18n = new LocaleController(this);

	protected override createRenderRoot() {
		return this;
	}

	override connectedCallback() {
		super.connectedCallback();
		this.unsubscribeLocale = onLocaleChange(this.handleLocaleChange);
	}

	override disconnectedCallback() {
		this.unsubscribeLocale?.();
		this.unsubscribeLocale = undefined;
		super.disconnectedCallback();
	}

	private readonly handleLocaleChange = () => {
		// Só re-sorteia antes de começar: trocar de passagem no meio do teste
		// descartaria a leitura em andamento.
		if (this.phase === "intro") this.passage = this.pickLocalizedPassage();
	};

	private pickLocalizedPassage(excludeId?: string): BenchmarkPassage {
		return pickPassageForLocale(this.i18n.locale, excludeId);
	}

	/**
	 * Denominador do WPM: o número de tokens que o leitor realmente percorre.
	 *
	 * Não usar `passage.wordCount`. Nas 5 passagens inglesas herdadas do upstream
	 * esse campo desvia de +0,7% a +5,8% do que o tokenizador produz (ex.:
	 * sleep-science declara 308 e o tokenizador devolve 291), o que INFLA o WPM em
	 * inglês. Medir a partir do texto é sempre exato e, ao corrigir o consumo em
	 * vez do dado, mantém o bloco de passagens byte a byte igual ao upstream — o
	 * que evita conflito a cada merge.
	 */
	private get wordCount(): number {
		return tokenize(this.passage.text).length;
	}

	@property({ type: Object }) profile!: UserProfile;

	@state() private phase: Phase = "intro";
	@state() private passage: BenchmarkPassage = this.pickLocalizedPassage();
	private unsubscribeLocale?: () => void;
	@state() private readingStartTime = 0;
	@state() private answers: (number | null)[] = [];
	@state() private resultWpm = 0;
	@state() private resultComprehension = 0;

	private startReading() {
		this.answers = Array(this.passage.questions.length).fill(null);
		this.phase = "reading";
		this.readingStartTime = 0;
	}

	private beginTimer() {
		this.readingStartTime = Date.now();
	}

	private finishReading() {
		this.resultWpm = computeWpm(
			this.passage.text,
			Date.now() - this.readingStartTime,
		);
		this.phase = "quiz";
	}

	private setAnswer(qIdx: number, aIdx: number) {
		this.answers = this.answers.map((a, i) => (i === qIdx ? aIdx : a));
	}

	private submitQuiz() {
		const correct = this.answers.filter(
			(a, i) => a === this.passage.questions[i].correct,
		).length;
		this.resultComprehension = Math.round(
			(correct / this.passage.questions.length) * 100,
		);
		this.phase = "results";
		this.saveResults();
		trackEvent("benchmark-completed", {
			wpm_bracket: wpmBracket(this.resultWpm),
			comprehension_bracket: comprehensionBracket(this.resultComprehension),
		});
	}

	private reset() {
		this.passage = this.pickLocalizedPassage(this.passage.id);
		this.phase = "intro";
		this.readingStartTime = 0;
		this.answers = [];
		this.resultWpm = 0;
		this.resultComprehension = 0;
	}

	private saveResults() {
		const updated: UserProfile = {
			...this.profile,
			baselineWpm: this.resultWpm,
			baselineComprehension: this.resultComprehension,
			settings: { ...this.profile.settings, wpm: this.resultWpm },
		};
		saveProfile(updated);
		emitProfileUpdated(updated);
	}

	override render() {
		switch (this.phase) {
			case "intro":
				return this.renderIntro();
			case "reading":
				return this.renderReading();
			case "quiz":
				return this.renderQuiz();
			case "results":
				return this.renderResults();
		}
	}

	private renderIntro() {
		return html`
      <div class="min-h-screen bg-base-100 flex flex-col">
        <speeedy-page-nav label=${this.i18n.t("bench.pageTitle")} back-href="#/"></speeedy-page-nav>

        <main class="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div class="max-w-md w-full flex flex-col gap-8">
            <div>
              <h1 class="text-3xl font-light text-base-content mb-3">${this.i18n.t("bench.heading")}</h1>
              <p class="text-ui-muted text-sm font-light leading-relaxed">
                ${this.i18n.t("bench.introPrefix")}
                <strong class="font-medium text-base-content">${this.i18n.t("bench.start")}</strong>${this.i18n.t("bench.introMiddle")}
                <strong class="font-medium text-base-content">${this.i18n.t("bench.done")}</strong>${this.i18n.t("bench.introSuffix")}
              </p>
            </div>

            <div class="grid grid-cols-3 gap-3">
              ${this.chip(this.i18n.t("bench.wordCount", { count: this.wordCount }), this.i18n.t("bench.passageLength"))}
              ${this.chip(this.i18n.t("bench.yourPace"), this.i18n.t("bench.noTimePressure"))}
              ${this.chip(this.i18n.t("bench.questionCount", { count: 10 }), this.i18n.t("bench.comprehensionQuiz"))}
            </div>

            <p class="text-xs text-ui-muted-subtle -mt-2">${this.i18n.t("bench.passageLabel")} <span class="text-ui-muted">${this.passage.title}</span></p>

            <button class="btn btn-primary btn-lg rounded-full w-full" data-umami-event="benchmark-start" @click=${this.startReading}>
              ${this.i18n.t("bench.startReading")}
            </button>
          </div>
        </main>
      </div>
    `;
	}

	private chip(value: string, label: string) {
		return html`
      <div class="rounded-xl border border-base-200 py-4 text-center">
        <div class="text-sm font-light text-base-content">${value}</div>
        <div class="text-xs text-ui-muted mt-0.5">${label}</div>
      </div>
    `;
	}

	private renderReading() {
		const started = this.readingStartTime > 0;
		return html`
      <div class="min-h-screen bg-base-100 flex flex-col">
        <div class="shrink-0 px-6 py-3 border-b border-base-200 flex items-center justify-between">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/8 text-primary text-xs font-medium tracking-wide">
            ${this.i18n.t("bench.readingTest")}
          </span>
          <span class="text-xs text-ui-muted">${this.i18n.t("bench.passageMetadata", { count: this.wordCount, title: this.passage.title })}</span>
        </div>

        <main class="flex-1 max-w-2xl mx-auto w-full px-6 py-6">

          ${
						!started
							? html`
            <div class="flex flex-col items-center gap-2 mb-8">
              <button class="btn btn-primary btn-lg rounded-full px-14" @click=${this.beginTimer}>
                ${this.i18n.t("bench.startReading")}
              </button>
              <p class="text-xs text-ui-muted">${this.i18n.t("bench.timerHint")}</p>
            </div>
          `
							: ""
					}

          <div class="prose prose-sm max-w-none leading-[1.95] text-base-content font-light text-[1.05rem] whitespace-pre-line select-none">
            ${this.passage.text}
          </div>

          ${
						started
							? html`
            <div class="flex flex-col items-center gap-2 mt-10 pb-8">
              <button class="btn btn-primary btn-lg rounded-full px-14" @click=${this.finishReading}>
                ${this.i18n.t("bench.doneReading")}
              </button>
              <p class="text-xs text-ui-muted">${this.i18n.t("bench.quizNextHint")}</p>
            </div>
          `
							: ""
					}

        </main>
      </div>
    `;
	}

	private renderQuiz() {
		const answered = this.answers.filter((a) => a !== null).length;
		return html`
      <div class="min-h-screen bg-base-100 flex flex-col">
        <div class="shrink-0 px-6 py-3 border-b border-base-200 flex items-center justify-between">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-warning/10 text-warning text-xs font-medium tracking-wide">
            ${this.i18n.t("bench.comprehensionQuizTitle")}
          </span>
          <span class="text-xs text-ui-muted font-mono">${answered} / ${this.passage.questions.length}</span>
        </div>

        <main class="flex-1 max-w-xl mx-auto w-full px-6 py-10 flex flex-col gap-10">
          ${this.passage.questions.map((q, qi) => this.renderQuestion(q, qi))}

          <div class="pb-16">
            <button
              class="btn btn-primary btn-lg w-full rounded-xl"
              data-umami-event="benchmark-submit"
              ?disabled=${this.answers.some((a) => a === null)}
              @click=${this.submitQuiz}
            >
              ${this.i18n.t("bench.submitAnswers")}
            </button>
            ${
							answered < this.passage.questions.length
								? html`
              <p class="text-xs text-center text-ui-muted mt-3">
                ${this.i18n.t(this.passage.questions.length - answered === 1 ? "bench.questionLeft" : "bench.questionsLeft", { count: this.passage.questions.length - answered })}
              </p>
            `
								: ""
						}
          </div>
        </main>
      </div>
    `;
	}

	private renderQuestion(
		q: { q: string; options: string[]; correct: number },
		qi: number,
	) {
		return html`
      <div class="flex flex-col gap-3">
        <p class="text-sm font-medium text-base-content leading-snug">
          <span class="text-ui-muted mr-2 font-mono">${qi + 1}.</span>${q.q}
        </p>
        <div class="flex flex-col gap-2">
          ${q.options.map((opt, oi) => {
						const selected = this.answers[qi] === oi;
						return html`
              <button
                class="text-left px-4 py-3 rounded-xl border text-sm transition-all
                  ${
										selected
											? "border-primary bg-primary/8 text-base-content font-medium"
											: "border-base-200 text-base-content hover:border-base-content/40"
									}"
                @click=${() => this.setAnswer(qi, oi)}
              >
                <span class="text-ui-muted font-mono text-xs mr-2">${String.fromCharCode(65 + oi)}.</span>${opt}
              </button>
            `;
					})}
        </div>
      </div>
    `;
	}

	private renderResults() {
		const correct = this.answers.filter(
			(a, i) => a === this.passage.questions[i].correct,
		).length;
		const wpmLabel =
			this.resultWpm < 200
				? this.i18n.t("bench.belowAverage")
				: this.resultWpm < 300
					? this.i18n.t("bench.average")
					: this.resultWpm < 450
						? this.i18n.t("bench.aboveAverage")
						: this.i18n.t("bench.excellent");
		const comprLabel =
			this.resultComprehension < 50
				? this.i18n.t("bench.needsWork")
				: this.resultComprehension < 70
					? this.i18n.t("bench.fair")
					: this.resultComprehension < 90
						? this.i18n.t("bench.good")
						: this.i18n.t("bench.excellent");

		return html`
      <div class="min-h-screen bg-base-100 flex flex-col">
        <nav class="px-6 py-4 border-b border-base-200 flex items-center justify-between">
          <span class="text-xs tracking-[0.4em] uppercase text-ui-muted">${this.i18n.t("bench.yourResults")}</span>
        </nav>

        <main class="flex-1 max-w-lg mx-auto w-full px-6 py-12 flex flex-col gap-10">

          <div class="grid grid-cols-2 gap-4">
            <div class="rounded-2xl border border-base-200 bg-base-200/30 p-6 text-center">
              <div class="text-4xl font-light text-base-content mb-1">${this.resultWpm}</div>
              <div class="text-xs text-ui-muted-subtle mb-2">${this.i18n.t("bench.wpm")}</div>
              <span class="inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">${wpmLabel}</span>
            </div>
            <div class="rounded-2xl border border-base-200 bg-base-200/30 p-6 text-center">
              <div class="text-4xl font-light text-base-content mb-1">${this.resultComprehension}%</div>
              <div class="text-xs text-ui-muted-subtle mb-2">${this.i18n.t("bench.comprehension")}</div>
              <span class="inline-block px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-xs">${comprLabel}</span>
            </div>
          </div>

          <div class="rounded-xl border border-base-200 p-5 flex flex-col gap-3">
            <p class="text-xs uppercase tracking-widest text-ui-muted">${this.i18n.t("bench.howYouCompare")}</p>
            <div class="flex items-center justify-between text-sm">
              <span class="text-ui-muted font-light">${this.i18n.t("bench.averageAdult")}</span>
              <span class="font-mono text-base-content">${this.i18n.t("bench.wpmValue", { value: 238 })}</span>
            </div>
            <div class="flex items-center justify-between text-sm border-t border-base-200 pt-3">
              <span class="text-base-content font-medium">${this.i18n.t("bench.yourBaseline")}</span>
              <span class="font-mono text-base-content font-semibold">${this.i18n.t("bench.wpmValue", { value: this.resultWpm })}</span>
            </div>
            <div class="flex items-center justify-between text-sm">
              <span class="text-ui-muted font-light">${this.i18n.t("bench.rsvpCeiling")}</span>
              <span class="font-mono text-base-content">${this.i18n.t("bench.wpmPlusValue", { value: 600 })}</span>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <p class="text-xs uppercase tracking-widest text-ui-muted">${this.i18n.t("bench.correctCount", { correct, total: this.passage.questions.length })}</p>
            <div class="flex gap-1.5 flex-wrap">
              ${this.passage.questions.map((_, qi) => {
								const ok =
									this.answers[qi] === this.passage.questions[qi].correct;
								return html`
                  <span class="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono
                    ${ok ? "bg-success/15 text-success" : "bg-error/15 text-error"}">
                    ${qi + 1}
                  </span>`;
							})}
            </div>
          </div>

          <p class="text-xs text-ui-muted font-light leading-relaxed">
            ${this.i18n.t("bench.baselineSaved")}
          </p>

          <div class="rounded-xl border border-base-200/60 bg-base-200/20 px-5 py-4 flex flex-col gap-2.5">
            <p class="text-sm font-light text-ui-muted leading-relaxed">
              ${this.i18n.t("bench.measuredPrefix")} <strong class="text-base-content font-medium">${this.i18n.t("bench.wpmValue", { value: this.resultWpm })}</strong> ${this.i18n.t("bench.measuredMiddle")} <strong class="text-base-content font-medium">${this.i18n.t("bench.comprehensionValue", { value: this.resultComprehension })}</strong>.
              ${this.i18n.t("bench.supportMessage")}
            </p>
            <a
              href="#/donate"
              class="btn btn-outline border-error/30 text-error hover:bg-error/10 hover:border-error btn-sm w-fit gap-1.5"
              data-umami-event="benchmark-donate-nudge-click"
            >
              ${icon(Heart, "w-3.5 h-3.5")}
              ${this.i18n.t("bench.supportSpeeedy")}
            </a>
          </div>

          <div class="flex flex-col gap-3 pb-8">
            <a href="#/app" class="btn btn-primary btn-lg rounded-xl">${this.i18n.t("bench.startReadingArrow")}</a>
            <div class="flex gap-3">
              <button class="btn btn-ghost btn-sm flex-1" @click=${() => navigate("profile")}>${this.i18n.t("bench.viewProfile")}</button>
              <button class="btn btn-ghost btn-sm flex-1" @click=${this.reset}>${this.i18n.t("bench.retest")}</button>
            </div>
          </div>

        </main>
      </div>
    `;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"benchmark-test": BenchmarkTest;
	}
}
