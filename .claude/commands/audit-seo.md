# SEO & Accessibility Audit

Audit all HTML pages on the Al-Barr Secondary School website for missing or incorrect SEO meta tags, accessibility issues, and heading hierarchy problems. Fix every issue found.

## Instructions

Check all 7 HTML files: `index.html`, `about.html`, `academics.html`, `admissions.html`, `news.html`, `gallery.html`, `contact.html`.

---

### 1. Meta Tags — Required on Every Page

Each `<head>` must contain exactly these tags. Check and fix any that are missing or contain placeholder text like `[Page Title]`:

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="[Unique 150-160 char description for this page]">
<meta property="og:title" content="[Page Title] | Al-Barr Secondary School">
<meta property="og:description" content="[Same as meta description or close variant]">
<meta property="og:image" content="/assets/og-image.jpg">
<meta property="og:type" content="website">
<link rel="icon" href="/assets/favicon.ico">
<title>[Page Title] | Al-Barr Secondary School</title>
```

**Required page titles:**
| File | `<title>` |
|---|---|
| `index.html` | `Home \| Al-Barr Secondary School` |
| `about.html` | `About Us \| Al-Barr Secondary School` |
| `academics.html` | `Academics \| Al-Barr Secondary School` |
| `admissions.html` | `Admissions \| Al-Barr Secondary School` |
| `news.html` | `News & Events \| Al-Barr Secondary School` |
| `gallery.html` | `Gallery \| Al-Barr Secondary School` |
| `contact.html` | `Contact Us \| Al-Barr Secondary School` |

Write unique, descriptive `meta name="description"` content for each page — not the same text on every page.

---

### 2. Heading Hierarchy

Each page must have **exactly one `<h1>`** — no more, no less. Headings must not skip levels (h1 → h3 with no h2).

Check:
- `<h1>` exists and is unique per page
- `<h2>` used for major sections
- `<h3>` used for card titles and subsections
- No `<h4>` used where `<h3>` would be appropriate

---

### 3. Image Alt Text

Every `<img>` tag must have a non-empty, descriptive `alt` attribute. Check all `<img>` tags across all pages.

- Bad: `alt=""` or `alt="image"`
- Good: `alt="Students during annual sports day at Al-Barr Secondary School"`

Placeholder `.ph` divs do not need alt text (they are not `<img>` elements).

---

### 4. ARIA Labels

Check these elements:
- `.theme-toggle` button — must have `aria-label="Toggle dark mode"` (or similar)
- `.hamburger` button — must have `aria-label="Open navigation menu"`
- `.lightbox-close` button — must have `aria-label="Close lightbox"`
- Any icon-only button must have an `aria-label`

---

### 5. Link Accessibility

- All `<a>` tags must have visible text or an `aria-label`
- "Read More →" links should ideally have `aria-label="Read more about [article title]"` for screen readers

---

### 6. Form Labels

In `contact.html` and `admissions.html`, every `<input>`, `<textarea>`, and `<select>` must have an associated `<label>` with a matching `for` / `id` pair.

---

### 7. Active Nav Link

In every HTML file, the `<a>` in `.nav-links` and `.nav-drawer` matching the current page must have `class="active"`. Check all 7 pages.

---

### Output

After auditing, produce a summary of:
- Issues found per file
- Fixes applied
- Any issues that require content the user must supply (e.g., real descriptions, images)
