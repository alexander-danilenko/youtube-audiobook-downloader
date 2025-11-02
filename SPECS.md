# YouTube Audiobook Script Generator - Requirements Specification

## Overview
Functional requirements for the YouTube Audiobook Script Generator, identified with REQ#### codes.

---

## REQ0001: Book Information Input
Book entry fields: YouTube URL, Title, Author, Narrator (required); Series Name, Series #, Year (optional).

---

## REQ0003: Book Entry Management
Users can add/remove entries. At least one entry always available.

---

## REQ0004: Input Field Editing
Edit via typing; auto-save on blur.

---

## REQ0011: YouTube Thumbnail Display
Auto-extract and display thumbnail for valid URLs. Show "No preview" for invalid/empty URLs. No API calls required.

---

## REQ0012: Thumbnail Lightbox
Click thumbnail to view full-size in overlay. Close via click outside, Escape, or close button. Prevent page scroll.

---

## REQ0013: Filename Template Input
Editable template field with Reset button. Default: `$author - [$series - $series_num] - $title [$narrator].%(ext)s`
Variables: `$author`, `$title`, `$narrator`, `$series`, `$series_num`, `$year`. Supports yt-dlp placeholders.

---

## REQ0014: Filename Template Processing
Replace variables (longest first); remove empty bracketed sections; clean multiple spaces; preserve yt-dlp placeholders.

---

## REQ0015: Shell Script Generation
Generate .sh file with one yt-dlp command per book, proper formatting, individual filenames per template.

---

## REQ0016: Script Download
Button generates/downloads script as `download-audiobooks.sh`. Validate required fields (URL, title, author, narrator). Show errors on validation failure.

---

## REQ0017: yt-dlp Command Format
Include: `--extract-audio`, `--audio-format m4a`, `--embed-chapters`, `--embed-metadata`, `--embed-thumbnail`, genre replacement to "Audiobook", metadata mapping, output filename, URL.

---

## REQ0018: State Persistence
Auto-save book entries and template to browser storage. Restore on reload. Handle errors gracefully.

---

## REQ0022: Input Validation
Accept valid YouTube URLs only. Validate required fields before script generation. Provide visual feedback.

---

## REQ0023: Error Handling
Handle storage errors gracefully. Display user-friendly messages. Continue in degraded mode if storage unavailable. Log to console.

---

## REQ0024: Data Format Support
Support numeric Series # and Year. Auto-parse correctly. Default Series # to 1 if invalid/empty.

---

## REQ0025: User Interface Clarity
High contrast colors. Clear visual distinction for editable fields. Show edit indicators.

---

## REQ0026: Book Entry Actions
Remove button per entry. Individual removal allowed. Don't persist editing mode across reloads.

---

## REQ0027: Large Dataset Support
Handle 10MB+ datasets without degradation. Efficient storage. Smooth interaction at scale. Async saves.

---

## REQ0028: Single Page Application
SPA behavior. No navigation. Client-side only. Generate/download files locally.

---

## REQ0029: Data Integrity
Maintain consistency during updates. No data loss. Validate structure before saving.

---

## REQ0030: Accessibility
Keyboard-only navigation. ARIA labels. Semantic HTML. Sufficient color contrast.

---

## REQ0031: CSV Import and Export
Export button: Generate CSV with headers (URL, Title, Author, Narrator, Series, Series #, Year). Escape special chars. Disable when no books.
Import button: File dialog, header checkbox (default checked), parse and replace data. Handle errors. Skip incomplete rows.

---

## REQ0032: Page Description
Show title, description, and prerequisites (yt-dlp, ffmpeg required in PATH) in formatted section above entries.

---

## REQ0033: Button Grouping
"Add New Book" (primary, contained), CSV/Import buttons, positioned right-aligned below entries.

---

## REQ0034: Image Host Config
Configure next.config.ts to allow img.youtube.com via remotePatterns.

---

## REQ0035: Book Entry Table View
Display as scrollable table with columns: Thumbnail, URL, Title, Author, Narrator, Series, Series #, Year, Actions. Inline editing. Remove buttons per row.

---

## REQ0036: Text Input Transformations
Dropdown on editable fields: Sentence case, Name Case, UPPERCASE, lowercase.

---

## REQ0037: YouTube Metadata Auto-Fetch
Auto-fetch title/author from YouTube oEmbed API when URL entered (no API key needed). Debounce 500ms. Auto-populate empty fields only.
Disable card during fetch. Manual refresh button (AutorenewIcon) on URL field. Remove text transform from URL field.

---

## REQ0038: YouTube URL Validation
Real-time validation with visual feedback: Red border + "Loading thumbnail..." when URL valid but fetching. Green border + text + "✓ Valid" when validated. Unstyled when empty/invalid. Refresh button enabled when URL not empty.

---

## REQ0039: Metadata Comparison Dialog
On conflict between fetched and current data, show dialog with radio buttons for each field (current vs YouTube). Default to current. Include Cancel/Apply buttons. Skip if no conflicts or fetch fails.

