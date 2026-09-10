/**
 * Canonical message catalogue (English).
 *
 * This file defines the SHAPE of every translation: `pt-BR.ts` is typed as
 * `Messages`, so a missing or misspelled key there is a TypeScript error, not a
 * silent runtime fallback.
 *
 * Convention: namespaces mirror the UI area, not the file path.
 *   common.*     reusable verbs/labels
 *   shell.*      app frame (loading, fatal errors, toasts)
 *   landing.*    marketing page
 *   app.*        library / home page inside the app
 *   reader.*     RSVP reader + HUD
 *   settings.*   settings panel
 *   profile.*    profile page, backup, sharing
 *   stats.*      stats dashboard
 *   bench.*      benchmark test + passages
 *   wellness.*   eye/break overlay
 *   onboarding.* first-run modal
 *   learn.*      learn page
 *   donate.*     donate page
 *   promote.*    promote page
 *   changelog.*  changelog page
 *   legal.*      privacy + terms
 *   share.*      public share view
 *   feedback.*   feedback modal
 *   errors.*     user-facing failure messages
 *
 * Placeholders use `{name}` and are resolved by `t(key, { name })`.
 */
const en = {
	common: {
		close: "Close",
		cancel: "Cancel",
		save: "Save",
		saved: "Saved",
		delete: "Delete",
		back: "Back",
		next: "Next",
		done: "Done",
		skip: "Skip",
		start: "Start",
		stop: "Stop",
		pause: "Pause",
		resume: "Resume",
		restart: "Restart",
		reset: "Reset",
		copy: "Copy",
		copied: "Copied",
		loading: "Loading…",
		optional: "optional",
		enabled: "Enabled",
		disabled: "Disabled",
		on: "On",
		off: "Off",
	},
	shell: {
		loadingApp: "Loading Speeedy…",
		unexpectedError:
			"Something went wrong. Refresh the page — if it keeps happening, send us feedback.",
		sharedReadingTitle: "Shared Reading",
		badReadLink: "That reading link could not be opened.",
	},
	profile: {
		pageTitle: "Profile",
		language: "Language",
		languageHint: "Choose the language used by Speeedy.",
	},
	errors: {
		genericTitle: "Something went wrong",
		offline:
			"You appear to be offline. Your reading data is safe on this device.",
	},
};

export type Messages = typeof en;
export { en };
