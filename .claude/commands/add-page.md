# Add New Page

Create a new HTML page for the Al-Barr Secondary School website.

## Instructions

The user will specify a page name and purpose. Create a complete, fully styled HTML file that matches the existing site.

### Requirements

**File naming:** Use the pattern `[name].html` at the project root (same level as `index.html`, `about.html`, etc.)

**Head block — copy this exactly and fill in the blanks:**
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Al-Barr Secondary School — [Page Description]. Quality education in Karachi.">
<meta property="og:title" content="Al-Barr Secondary School">
<meta property="og:description" content="Nurturing Minds, Building Futures">
<meta property="og:image" content="/assets/og-image.jpg">
<link rel="icon" href="/assets/favicon.ico">
<title>[Page Title] | Al-Barr Secondary School</title>
<link rel="stylesheet" href="css/main.css">
<link rel="stylesheet" href="css/components.css">
```

**CSS links:** Always include `css/main.css` and `css/components.css`. Add a page-specific sheet only if needed: `css/pages/[name].css`

**Navbar:** Use the "solid" variant (not transparent). Copy the navbar block from `about.html` — it has class `navbar solid` and does NOT include the shader picker.

**Page hero:** Every inner page starts with:
```html
<section class="page-hero">
  <div class="container">
    <nav class="breadcrumb">
      <a href="index.html">Home</a> / [Page Name]
    </nav>
    <h1>[Page Heading]</h1>
    <p>[One sentence description]</p>
  </div>
</section>
```

**Sections:** Use `<section class="section">` for standard sections and `<section class="section section-alt">` for alternating gray-background sections. Wrap content in `<div class="container">`.

**Footer:** Copy the footer block verbatim from `about.html`.

**Scripts:** End of `<body>`:
```html
<script src="js/main.js"></script>
```

**Active nav link:** Set `class="active"` on the `<a>` tag in both `.nav-links` and the mobile `.nav-drawer` that matches this new page.

**Content:** Write realistic, school-appropriate placeholder text — never "Lorem ipsum". Use facts about Al-Barr Secondary School (established 2020, Karachi, Principal Muhammad Imran, 850+ students, 94% pass rate).

**Fade animations:** Add `class="fade-up"` to section headings and cards so they animate in on scroll (handled by `js/main.js`).

After creating the file, add a link to it in the `<nav>` of every existing HTML page (`index.html`, `about.html`, `academics.html`, `admissions.html`, `news.html`, `gallery.html`, `contact.html`) in both `.nav-links` and `.nav-drawer`.
