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
		profileTab: "Profile",
		libraryTab: "Library",
		dataTab: "Data",
		documentAdded: '"{title}" added to your library.',
		avatarAlt: "Profile avatar",
		displayName: "Display name",
		editDisplayName: "Edit display name",
		memberSince: "Member since {date}",
		profileImage: "Profile Image",
		uploadingImage: "Uploading...",
		changeImage: "Change image",
		uploadImage: "Upload image",
		removeImage: "Remove",
		imageStoredLocally: "Stored only in your browser.",
		emojiAvatar: "Emoji Avatar",
		setAvatarTo: "Set avatar to {emoji}",
		customEmoji: "Custom emoji",
		customEmojiHint: "Or type / paste any emoji you like.",
		readingStats: "Reading Stats",
		words: "Words",
		averageWpm: "Avg WPM",
		time: "Time",
		readingProgress: "Reading Progress",
		retest: "Retest →",
		takeTest: "Take the test →",
		baselineWpm: "Baseline WPM",
		currentAverageWpm: "Current Avg WPM",
		improvement: "Improvement",
		keepReading: "Keep reading!",
		moreSessionsNeeded: "More sessions needed",
		baselineComprehension: "Baseline comprehension",
		noBaseline:
			"No baseline yet. Take the reading test to measure your WPM and comprehension — then track your improvement over time.",
		shareProfile: "Share Profile",
		privacyNotice: "Privacy notice",
		privacyDescription:
			"Shared profile links embed your selected stats directly in the URL. Analytics scripts, browser extensions, screenshots, or anyone you send the link to may be able to read any personal details included in that URL. Only share a link with personal information if you are comfortable with that.",
		privacyAcknowledgment:
			"I understand that personal details in a shared link may be visible to analytics tools or anyone with the URL.",
		includeProfileImage:
			"Include profile image in the shared card and link — increases privacy risk and may make the URL much longer.",
		shareStatsCard: "Share Stats Card",
		viewFullStats: "View Full Stats →",
		acknowledgePrivacy:
			"Acknowledge the privacy notice above to enable personal info in shared links.",
		exportProfile: "Export Profile",
		downloadBackupPrefix: "Download a",
		downloadBackupSuffix:
			"backup file with all your settings, history, and stats.",
		downloadSpeeedy: "Download .speeedy",
		importProfile: "Import Profile",
		restoreBackupPrefix: "Restore from a previously exported",
		restoreBackupSuffix:
			"file. This will overwrite your current data.",
		importSpeeedy: "Import .speeedy",
		resetAllData: "Reset All Data",
		resetAllDataDescription:
			"Permanently delete all reading history, settings, and stats. This cannot be undone.",
		resetConfirmation:
			"Are you sure? This will permanently delete all your data.",
		resetData: "Reset Data",
		addDocument: "Add a document to your library",
		supportedDocumentTypes:
			"PDF · DOCX · TXT · EPUB · RTF · HTML · ODT · and more",
		emptyLibrary: "Your library is empty.",
		readSomething: "Read something",
		readingHistory: "Reading History",
		totalDocuments: "{count} total",
		previousPage: "Prev",
		readAgain: "Read again",
		resumePercent: "Resume {percent}%",
		documentMetadata: "{date} · {count} words",
		shareYourStats: "Share Your Stats",
		closeShareModal: "Close share modal",
		savingPng: "Saving…",
		saveCardAsPng: "Save card as PNG",
		shareableLink: "Shareable Link",
		copyShareableLink: "Copy shareable link",
		previewShareCard: "Preview share card in new tab",
		previewNewTab: "Preview in new tab",
		saveImageError: "Could not save the image. Please try again.",
		chooseImageFile: "Please choose an image file.",
		readImageError: "Could not read that image file.",
		adjustImage: "Adjust image",
		cropInstructions: "Drag to reposition · scroll to zoom",
		zoom: "Zoom",
		apply: "Apply",
		processImageError:
			"Could not process that image. Please try a smaller file.",
	},
	errors: {
		genericTitle: "Something went wrong",
		offline:
			"You appear to be offline. Your reading data is safe on this device.",
	},
};

export type Messages = typeof en;
export { en };
