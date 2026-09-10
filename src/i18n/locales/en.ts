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
	app: {
		demoTitle: "Demo: The Science of Speed Reading",
		demoText: `Every time you read a line of text, your eyes don't move smoothly, they jump. These rapid jumps are called saccades, and they happen three to four times per second. During each jump, you read nothing at all. That dead time adds up to roughly ten percent of every reading session, wasted on pure eye movement.

Rapid Serial Visual Presentation, or RSVP, eliminates saccades entirely. Instead of your eyes chasing words across a page, the words come to you, one at a time, at a fixed point on the screen. Your gaze stays perfectly still. The result is a significant reduction in the mechanical overhead of reading, which means more of your attention goes to understanding rather than scanning.

There is a second insight built into this app: the Optimal Recognition Point. Research by O'Regan and Jacobs showed that every word has a sweet spot, typically the letter just to the left of center, where the brain identifies the word fastest. Speeedy aligns every single word to this exact position. Your eye lands on the pivot, and recognition happens at peak efficiency, flash after flash.

Speed without comprehension is useless. That is why automatic pauses are inserted after punctuation, giving your working memory the fraction of a second it needs to consolidate each clause before the next one arrives. Combined with a gentle slow-start ramp at the beginning of each session, the experience is surprisingly comfortable even at speeds well above your normal reading pace.

The average adult reads at around two hundred and thirty-eight words per minute. With practice on RSVP, many readers comfortably reach four hundred words per minute while maintaining strong comprehension. You just experienced a small sample. Hit play on your own text and see what your number is.`,
		clipboardTextLoaded: "Text loaded from clipboard ✓",
		clipboardEmpty: "Clipboard is empty",
		clipboardLoaded: "Clipboard loaded ✓",
		clipboardReadError: "Could not read clipboard — try Ctrl+V instead",
		nothingToPreview:
			"Nothing to preview yet. Paste some text or load a file first.",
		nothingToRead:
			"Nothing to read yet. Paste some text or load a file first.",
		pastedText: "Pasted Text",
		modifiedTitle: "{title} – modified",
		saveDocumentError:
			"Could not save this document. Try again, or paste a shorter text.",
		themeDark: "Theme: Dark — click for light",
		themeLight: "Theme: Light — click for dark",
		landingPage: "Landing Page",
		profile: "Profile",
		stats: "Stats",
		feedback: "Feedback",
		readingQuestionPrefix: "What are you reading",
		readingQuestionToday: "today?",
		yourAverage: "Your avg:",
		dropFilePrompt: "Drop a file or paste text to start reading",
		demoLoadedPrefix: "A demo is loaded — hit",
		beginReading: "Begin Reading",
		demoLoadedSuffix: "to try RSVP, or paste your own text.",
		findYourWpm: "Find your WPM →",
		dismissHint: "Dismiss hint",
		fileTab: "File",
		textTab: "Text",
		chooseWhereToStart: "Choose where to start",
		learnAboutRsvp: "Learn more about RSVP",
		forBloggers: "Speeedy for Bloggers",
		privacy: "Privacy",
		terms: "Terms",
		fileUploadLabel: "Drop a file, or click to browse",
		fileUploadHint:
			"PDF · DOCX · DOC · TXT · EPUB · RTF · HTML · ODT · and more · up to 50 MB",
		estimatedTime: " · ~{time} at {wpm} WPM",
		extracted: "extracted ✓",
		tryDemo: "Try a demo",
		loadClipboardTitle: "Load text from clipboard",
		pasteClipboard: "Paste clipboard",
		titleLabel: "Title",
		textToRead: "Text to read",
		pasteTextPlaceholder: "Paste your text here…",
		longDocumentPrefix: "Long document — use",
		preview: "Preview",
		longDocumentSuffix:
			"to skip copyright / front matter and start where the book begins.",
		wordCount: "{count} words{time}",
		clear: "Clear",
		recent: "Recent",
		showAll: "Show all",
		minimize: "Minimize",
		showRecentDocuments: "Show recent documents",
		minimizeRecentDocuments: "Minimize recent documents",
		viewAll: "View All →",
		readAgain: "Read again",
		resumePercent: "Resume {percent}%",
		documentMetadata: "{date} · {count} words",
		edit: "Edit",
		editDocument: "Edit {title}",
		remove: "Remove",
		removeDocument: "Remove {title}",
	},
	settings: {
		theme: "Theme", light: "Light", dark: "Dark", speed: "Speed",
		fontSize: "Font size", letterSpacing: "Letter spacing",
		letterSpacingTip: "Adjust the horizontal space between characters.",
		pivotOffset: "Pivot offset", centre: "Centre",
		pivotOffsetTip: "Nudges the focus point left or right if you prefer eye-fixation off-center.",
		wordsPerFlash: "Words per flash", oneWord: "1 word", words: "{count} words",
		wordsPerFlashTip: "Number of words displayed in each flash. More words = faster reading but may reduce comprehension.",
		advancedTiming: "Advanced timing", sentencePause: "Sentence pause",
		sentencePauseTip: "Extra duration after periods, question marks, and exclamation points.",
		paragraphPause: "Paragraph pause", paragraphPauseHint: "Extra dwell at paragraph start",
		paragraphPauseTip: "Extra delay when a new paragraph begins.", speedRamp: "Speed ramp",
		speedRampHint: "Accelerate gradually to target",
		speedRampTip: "Slowly accelerates the speed at the start of a session so your brain can adjust.",
		targetWpm: "Target WPM", accessibilityVisuals: "Accessibility & visuals",
		readingFont: "Reading font", dyslexicActive: "Dyslexic active", fontWeight: "Font weight",
		weightLight: "Light", weightRegular: "Regular", weightMedium: "Medium",
		weightSemiBold: "Semi-bold", weightBold: "Bold", weightExtraBold: "Extra-bold",
		fontWeightTip: "Heavier weight makes text easier to track. Many dyslexic readers prefer medium-to-bold weights.",
		visualHighlights: "Visual highlights", pivotOrp: "Pivot (ORP)",
		orpHighlightColor: "ORP pivot highlight color", colorizeDialogue: "Colorize dialogue",
		colorizeDialogueTip: "Apply a distinct color to words inside double quotes (dialogue).",
		quoteColor: "Quote color", dialogueHighlightColor: "Dialogue quote highlight color",
		colorizeAsides: "Colorize asides ( ) [ ]",
		colorizeAsidesTip: "Apply a distinct color to words inside parentheses or square brackets (asides).",
		asideColor: "Aside color", asideHighlightColor: "Parentheses and brackets highlight color",
		dyslexiaFriendlyFont: "Dyslexia-friendly font",
		dyslexiaFriendlyFontTip: "Uses OpenDyslexic, a font designed to improve readability for neurodivergent readers.",
		irlenOverlayTint: "Irlen overlay tint", irlenPeach: "Peach", irlenMint: "Mint",
		irlenParchment: "Parchment", overlayIntensity: "Overlay intensity",
		overlayIntensityTip: "Adjust how strong the color tint is.", pauseAnchor: "Pause & anchor",
		pauseViewMode: "Pause view mode", pauseFocus: "Focus", pauseContext: "Context",
		pauseFulltext: "Fulltext", bionicAnchorPosition: "Bionic anchor position",
		anchorEarly: "Early", anchorBalanced: "Balanced", anchorLate: "Late",
		readingFeatures: "Reading features", showProgressBar: "Show progress bar",
		focusMode: "Focus mode (immersion)",
		focusModeTip: "While playing, hide the header, progress bar, bottom controls, and settings so only words show. Tap the reading area or Space to pause and bring controls back. Toggle anytime with F.",
		orpGuideMarks: "ORP guide marks",
		orpGuideMarksTip: "Small markers above and below the focus point to help lock your gaze.",
		hideTrailingPunctuation: "Hide trailing punctuation", removeCitations: "Remove citations",
		removeCitationsTip: "Strip inline citations like [1], [1-3], and (Smith et al., 2020) for distraction-free academic reading.",
		tickerMode: "Ticker mode",
		tickerModeTip: "Instead of flashing one word at a time, text scrolls horizontally at your configured WPM. Speed, pause, and seek all work as normal.",
		smartSpeedLogic: "Smart speed logic",
		smartSpeedTip: "Varies the duration of each word based on its character length (longer words dwell longer).",
		bionicReadingFixations: "Bionic reading fixations",
		bionicReadingTip: "Bold the first few letters of each word to guide the eye.",
		peripheralContext: "Peripheral context",
		peripheralContextTip: "Shows a ghost of the previous and next words to help stay oriented.",
		contextDensity: "Density (words each side)", audioFocus: "Audio & focus",
		tactileWordClicks: "Tactile word clicks",
		tactileWordClicksTip: "Soft procedural clicks synchronized with word flashes for rhythmic focus.",
		clickPitchFactor: "Click pitch factor", ambientFocusNoise: "Ambient focus noise",
		noiseWhite: "White", noisePink: "Pink", noiseBrown: "Brown", noiseVolume: "Noise volume",
		engineLogic: "Engine logic", startCountdown: "Start countdown (3s)",
		startCountdownTip: "Show a 3-2-1 timer before the text starts flowing.",
		commaPauseBeacon: "Comma pause beacon",
		commaPauseTip: "Treat commas with the same weighted pause as full sentence ends.",
		asideClosingPause: "Aside closing pause",
		asideClosingPauseTip: "Slight extra pause after closing ) or ] to help process the phrase.",
		rewindSkipAmount: "Rewind skip amount", wordCountShort: "{count}w", wordSuffix: "w",
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
