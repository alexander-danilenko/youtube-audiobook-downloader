# YouTube Audiobook Script Generator - Requirements Specification

## Overview
This document defines the functional requirements for the YouTube Audiobook Script Generator application. Each requirement is assigned a unique identifier (REQ####) for tracking and processing.

---

## REQ0001: Book Information Input
The application shall allow users to input book information in a table format with the following fields:
- YouTube URL (required)
- Book Title (required)
- Book Author (required)
- Narrator (required)
- Book Series Name (optional)
- Book Series Number (optional, defaults to 1)
- Year (optional)

---

## REQ0002: Table Display
The application shall display book information in a table format with the following columns:
- Preview (thumbnail)
- YouTube URL
- Book Title
- Author
- Narrator
- Series Name
- Series Number
- Year
- Actions

---

## REQ0003: Row Management
The application shall allow users to:
- Add new rows to the table
- Remove existing rows from the table
- Have at least one row available at all times

---

## REQ0004: Cell Editing
The application shall allow users to edit cell values by:
- Clicking on a cell to enter edit mode
- Double-clicking on a cell to enter edit mode
- Typing to modify the cell value
- Pressing Escape to cancel editing and revert to original value
- Automatically saving the value when focus leaves the cell

---

## REQ0005: Keyboard Navigation - Tab Key
The application shall support keyboard navigation where:
- Pressing Tab moves the cursor to the next cell in the same row
- When at the last cell of a row, pressing Tab moves to the first cell of the next row
- When at the last cell of the last row, pressing Tab exits edit mode

---

## REQ0006: Keyboard Navigation - Enter Key
The application shall support keyboard navigation where:
- Pressing Enter/Return moves the cursor to the cell below in the same column
- When at the last row, pressing Enter exits edit mode
- Shift+Enter moves the cursor to the cell above in the same column

---

## REQ0007: Keyboard Navigation - Shift+Tab
The application shall support keyboard navigation where:
- Pressing Shift+Tab moves the cursor to the previous cell in the same row
- When at the first cell of a row, pressing Shift+Tab moves to the last cell of the previous row

---

## REQ0008: Multi-Cell Selection
The application shall allow users to:
- Select multiple cells by holding Ctrl (Windows/Linux) or Cmd (Mac) and clicking cells
- Visually indicate selected cells with highlighting
- Toggle cell selection when clicking a selected cell with modifier key pressed

---

## REQ0009: Multi-Cell Editing
The application shall allow users to:
- Type in a selected cell when multiple cells are selected
- Apply the same value to all selected cells simultaneously
- Only update cells of the same data type (text fields update text fields, number fields update number fields)

---

## REQ0010: Row Reordering
The application shall allow users to:
- Drag and drop table rows to reorder them
- Visually indicate the row being dragged with reduced opacity
- Maintain row order after drop operation

---

## REQ0011: YouTube Thumbnail Display
The application shall:
- Automatically extract and display a thumbnail image when a valid YouTube URL is entered
- Display a small thumbnail (medium quality) in the Preview column
- Show "No preview" message when no URL is provided or URL is invalid
- Display thumbnails without requiring API calls

---

## REQ0012: Thumbnail Lightbox
The application shall:
- Open a full-size image preview when clicking on a thumbnail
- Display the lightbox as an overlay with dark background
- Allow closing the lightbox by clicking outside the image, pressing Escape key, or clicking a close button
- Prevent page scrolling when lightbox is open

---

## REQ0013: Filename Template Input
The application shall:
- Provide an editable input field for the filename template above the table
- Default template: `$author - [$series - $series_num] - $title [$narrator].%(ext)s`
- Support custom variables: `$author`, `$title`, `$narrator`, `$series`, `$series_num`, `$year`
- Support yt-dlp placeholders: `%(ext)s`, `%(title)s`, and other standard yt-dlp placeholders
- Display helper text explaining available variables and placeholders

---

## REQ0014: Filename Template Processing
The application shall:
- Replace template variables with actual book data when generating filenames
- Remove empty optional fields enclosed in brackets `[]` from the final filename
- Clean up multiple spaces and separators in generated filenames
- Preserve yt-dlp placeholders as-is in the generated script

---

## REQ0015: Shell Script Generation
The application shall generate a shell script (.sh file) containing:
- One yt-dlp command per table row
- Proper command formatting with line continuations
- Individual filename per command based on the template and book data
- All required yt-dlp flags for audio extraction, metadata embedding, and formatting

---

## REQ0016: Script Download
The application shall:
- Provide a button to generate and download the shell script
- Validate that at least one book has required fields (URL, title, author, narrator) before generating
- Display an error message if validation fails
- Automatically trigger browser download when script is generated
- Name the downloaded file `download-audiobooks.sh`

---

## REQ0017: yt-dlp Command Format
Each generated command shall include:
- Audio extraction flag (`--extract-audio`)
- Audio format specification (`--audio-format m4a`)
- Chapter embedding (`--embed-chapters`)
- Metadata embedding (`--embed-metadata`)
- Thumbnail embedding (`--embed-thumbnail`)
- Genre replacement to "Audiobook"
- Book metadata mapping (title, author, series, narrator, series number)
- Output filename using the template
- YouTube URL

---

## REQ0018: State Persistence
The application shall:
- Automatically save application state to browser storage
- Persist the following data: books table data, filename template, column widths
- Restore saved state when the page is refreshed or reopened
- Handle storage initialization errors gracefully without breaking the application

---

## REQ0019: Column Width Customization
The application shall allow users to:
- Resize table columns by dragging the column border
- Maintain column widths after page refresh
- Enforce a minimum column width to prevent columns from becoming unusable
- Visually indicate the resize handle on hover

---

## REQ0020: Text Overflow Handling
The application shall:
- Truncate text that exceeds cell width with ellipsis (`...`)
- Display full text in a tooltip when hovering over truncated cells
- Prevent text from overlapping into adjacent columns
- Maintain cell boundaries and table layout integrity

---

## REQ0021: Table Layout Constraints
The application shall:
- Fit the table within 100% of the container width
- Prevent horizontal scrolling
- Distribute column widths proportionally to maintain table width
- Use percentage-based widths for responsive layout

---

## REQ0022: Input Validation
The application shall:
- Accept only valid YouTube URLs in the URL field
- Validate that required fields (title, author, narrator) are not empty before script generation
- Provide visual feedback for invalid inputs
- Allow users to correct invalid data before proceeding

---

## REQ0023: Error Handling
The application shall:
- Handle storage errors gracefully without breaking functionality
- Display user-friendly error messages when operations fail
- Continue operating in degraded mode if storage is unavailable
- Log errors to console for debugging purposes

---

## REQ0024: Data Format Support
The application shall:
- Support numeric input for Series Number and Year fields
- Auto-parse numeric values correctly
- Handle empty or undefined values for optional fields
- Default Series Number to 1 if not specified or invalid

---

## REQ0025: User Interface Clarity
The application shall:
- Use high contrast colors for text and backgrounds
- Provide clear visual distinction between editable and non-editable cells
- Indicate selected cells with distinct highlighting
- Show edit mode with a visual indicator (e.g., border highlight)

---

## REQ0026: Actions Column
The application shall:
- Display an "Actions" column header as a clickable button
- Provide a "Remove" button in each row's Actions cell
- Allow removing individual rows via the Remove button
- Not persist UI interaction state (selections, editing mode) across page refreshes

---

## REQ0027: Large Dataset Support
The application shall:
- Handle datasets larger than 10MB without performance degradation
- Store data efficiently to accommodate many books
- Support smooth interaction even with large numbers of rows
- Complete save operations asynchronously without blocking the UI

---

## REQ0028: Single Page Application Behavior
The application shall:
- Operate as a single-page application
- Not navigate away from the main page
- Generate and download files without server-side processing
- Perform all operations client-side

---

## REQ0029: Data Integrity
The application shall:
- Maintain data consistency during row reordering
- Preserve all book data when columns are resized
- Ensure no data loss during state persistence operations
- Validate data structure before saving to storage

---

## REQ0030: Accessibility
The application shall:
- Support keyboard-only navigation for all functionality
- Provide appropriate ARIA labels for interactive elements
- Use semantic HTML elements where applicable
- Ensure sufficient color contrast for readability

