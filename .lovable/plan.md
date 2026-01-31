

# Footer Redesign with Legal Links

## Overview
Redesign the footer to include four links displayed as pop-up dialogs, with content loaded from markdown files. This approach keeps the content easily editable by non-programmers while maintaining a consistent UI with your existing dialogs.

## Footer Layout

The new footer will display:
- **Impressum** (Legal notice)
- **Datenschutzerklärung** (Data protection)  
- **Cookie Richtlinie** (Cookie policy)
- **Spielregeln** (Rules of the game)

Links will be styled as subtle text links with separators, keeping the copyright notice.

## Content from Markdown Files

Markdown files will be stored in the `public/` folder so they can be easily edited:

```
public/
├── content/
│   ├── impressum.md
│   ├── datenschutz.md
│   ├── cookies.md
│   └── spielregeln.md
```

Each file will contain placeholder Lorem Ipsum text initially. When you need to update the content, simply edit these `.md` files - no code changes required.

## Implementation Steps

### 1. Create Markdown Content Files
Create 4 markdown files in `public/content/` with placeholder content (Lorem Ipsum).

### 2. Install Markdown Parser
Add `react-markdown` package to render markdown content as styled HTML in the dialogs.

### 3. Create LegalDialog Component
A reusable dialog component that:
- Takes a title and markdown file path as props
- Fetches and displays the markdown content
- Uses your existing Dialog UI components for consistency
- Includes a scrollable area for longer content

### 4. Update Footer
Replace the simple copyright-only footer with:
- Four clickable links in a row
- Each link opens its corresponding dialog
- Keep the copyright notice below the links
- Responsive layout (links may wrap on mobile)

---

## Technical Details

### New Files to Create
| File | Purpose |
|------|---------|
| `public/content/impressum.md` | Legal notice content |
| `public/content/datenschutz.md` | Data protection content |
| `public/content/cookies.md` | Cookie policy content |
| `public/content/spielregeln.md` | Game rules content |
| `src/components/leaderboard/LegalDialog.tsx` | Reusable markdown dialog component |

### Files to Modify
| File | Change |
|------|--------|
| `src/pages/Index.tsx` | Add footer links and dialog state management |
| `package.json` | Add react-markdown dependency |

### Dependencies
- `react-markdown` - Lightweight markdown parser (approx. 10KB gzipped)

### LegalDialog Component Structure
```text
+----------------------------------+
|  Dialog Title (e.g., Impressum)  |
+----------------------------------+
|                                  |
|  [Scrollable Markdown Content]   |
|                                  |
|  Lorem ipsum dolor sit amet,     |
|  consectetur adipiscing elit...  |
|                                  |
+----------------------------------+
```

### Footer Visual Layout
```text
+--------------------------------------------------+
|  Impressum | Datenschutz | Cookies | Spielregeln |
|                                                  |
|    © 2025 TEAM CORA - Coburger Radsport e.V.     |
+--------------------------------------------------+
```

### Bug Fix
The current build has an error referencing `challenge.name` which doesn't exist. This will be fixed during implementation.

