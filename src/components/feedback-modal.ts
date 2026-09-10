import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Bug, MessageCircle, Rocket, X } from "lucide";
import { GITHUB_URL } from "../config.js";
import { LocaleController } from "../i18n/controller.js";
import { icon } from "../utils/icons.js";
import "./ui/dialog.js";
import "./ui/input.js";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xykneboe";

type FeedbackType = "bug" | "feature" | "other";
type SubmitStatus = "idle" | "sending" | "success" | "error";

@customElement("feedback-modal")
export class FeedbackModal extends LitElement {
	private i18n = new LocaleController(this);

	protected override createRenderRoot() {
		return this;
	}

	@state() private open = false;
	@state() private feedbackType: FeedbackType = "bug";
	@state() private message = "";
	@state() private email = "";
	@state() private status: SubmitStatus = "idle";

	override connectedCallback() {
		super.connectedCallback();
		window.addEventListener("speeedy:open-feedback", this.handleOpen);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener("speeedy:open-feedback", this.handleOpen);
	}

	private handleOpen = () => {
		this.open = true;
		this.status = "idle";
		this.message = "";
		this.email = "";
		this.feedbackType = "bug";

		setTimeout(() => this.querySelector("textarea")?.focus(), 150);
	};

	private hide = () => {
		this.open = false;
	};

	private async handleSubmit(e: Event) {
		e.preventDefault();
		if (!this.message.trim()) return;

		this.status = "sending";

		try {
			const payload: Record<string, string> = {
				type: this.feedbackType,
				message: this.message.trim(),
			};

			if (this.email?.includes("@")) {
				payload.email = this.email.trim();
			}

			const res = await fetch(FORMSPREE_ENDPOINT, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			this.status = res.ok ? "success" : "error";
		} catch {
			this.status = "error";
		}
	}

	override render() {
		const githubIssueUrl = `${GITHUB_URL}/issues/new/choose`;

		return html`
      <speeedy-dialog .open=${this.open} @speeedy-dialog-close=${this.hide}>
        <div class="w-[min(28rem,calc(100vw-2rem))] bg-base-100 rounded-2xl shadow-2xl border border-base-200 animate-in zoom-in-95 fade-in duration-300">
          <div class="card-body p-6">

            <div class="flex justify-between items-center mb-4">
              <h3 class="font-semibold text-lg">${this.i18n.t("feedback.title")}</h3>
              <button class="btn btn-ghost btn-circle btn-sm" @click=${this.hide}>${icon(X, "w-4 h-4")}</button>
            </div>

            ${
							this.status === "success"
								? html`
                <div class="text-center py-8">
                  <div class="text-5xl mb-4">${icon(Rocket, "w-12 h-12 text-primary")}</div>
                  <p class="font-medium text-lg">${this.i18n.t("feedback.thankYou")}</p>
                  <p class="text-ui-muted mt-1">${this.i18n.t("feedback.messageReceived")}</p>
                  <button class="btn btn-ghost mt-6" @click=${this.hide}>${this.i18n.t("feedback.close")}</button>
                </div>
              `
								: html`
                <form @submit=${this.handleSubmit} class="flex flex-col gap-5">

                  <!-- Type selector -->
                  <div class="flex gap-2">
                    ${(["bug", "feature", "other"] as const).map(
											(t) => html`
                      <button
                        type="button"
                        class="btn flex-1 btn-sm ${this.feedbackType === t ? "btn-primary" : "btn-ghost border"}"
                        @click=${() => (this.feedbackType = t)}>
                        ${t === "bug" ? html`${icon(Bug, "w-4 h-4")} ${this.i18n.t("feedback.bug")}` : t === "feature" ? html`${icon(Rocket, "w-4 h-4")} ${this.i18n.t("feedback.feature")}` : html`${icon(MessageCircle, "w-4 h-4")} ${this.i18n.t("feedback.other")}`}
                      </button>
                    `,
										)}
                  </div>

                  <speeedy-textarea
                    placeholder=${
											this.feedbackType === "bug"
												? this.i18n.t("feedback.bugPlaceholder")
												: this.feedbackType === "feature"
													? this.i18n.t("feedback.featurePlaceholder")
													: this.i18n.t("feedback.otherPlaceholder")
										}
                    .value=${this.message}
                    min-height="140px"
                    @change=${(e: CustomEvent<{ value: string }>) => (this.message = e.detail.value)}
                  ></speeedy-textarea>

                  <speeedy-input
                    type="email"
                    placeholder=${this.i18n.t("feedback.emailPlaceholder")}
                    .value=${this.email}
                    @change=${(e: CustomEvent<{ value: string }>) => (this.email = e.detail.value)}
                  ></speeedy-input>

                  ${
										this.status === "error"
											? html`
                    <p class="text-error text-sm">${this.i18n.t("feedback.sendError")}</p>
                  `
											: ""
									}

                  <button
                    type="submit"
                    class="btn btn-primary"
                    ?disabled=${!this.message.trim() || this.status === "sending"}>
                    ${
											this.status === "sending"
												? html`<span class="loading loading-spinner"></span> ${this.i18n.t("feedback.sending")}`
												: this.i18n.t("feedback.send")
										}
                  </button>

                  <p class="text-xs text-ui-muted-subtle text-center">
                    ${this.i18n.t("feedback.preferGitHub")}
                    <a href=${githubIssueUrl} target="_blank" rel="noopener" class="underline underline-offset-2 hover:text-base-content transition-colors">
                      ${this.i18n.t("feedback.openIssue")}
                    </a>
                  </p>
                </form>
              `
						}
          </div>
        </div>
      </speeedy-dialog>
    `;
	}
}
