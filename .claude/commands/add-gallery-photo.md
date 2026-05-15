# Add Photo to Gallery

Add one or more photos to the gallery grid in `gallery.html` and optionally to the gallery strip on `index.html`.

## Instructions

The user will provide: image filename(s), caption(s), and optionally a category.

### Gallery Item HTML Structure

Each photo in `gallery.html` uses this structure:
```html
<div class="gallery-item fade-up" data-caption="[Caption text]">
  <img src="assets/images/gallery/[filename]" alt="[Descriptive alt text]" loading="lazy">
  <div class="gallery-overlay">
    <span>🔍</span>
  </div>
</div>
```

The `data-caption` attribute is read by `js/gallery.js` to display text in the lightbox when the image is clicked. Write a descriptive, specific caption (e.g., "Grade 9 students during Chemistry lab practical, March 2025").

### Gallery Grid in `gallery.html`

Images go inside `.gallery-grid`. The grid is CSS-based (3 columns desktop, 2 tablet, 1 mobile) — just append new `.gallery-item` divs. No additional wrappers needed.

### Placeholder (No Image Yet)

If the actual image file does not exist yet, add the item with a placeholder div:
```html
<div class="gallery-item fade-up" data-caption="[Caption]">
  <div class="ph large-ph" style="height:240px;">
    <span class="ph-icon">🖼️</span>
  </div>
  <div class="gallery-overlay"><span>🔍</span></div>
</div>
```
Note the file path to replace once the image is available.

### Image Path Convention

All gallery images go in: `assets/images/gallery/[filename]`

Recommended filename format: `[category]-[description]-[year].jpg`
Examples:
- `sports-football-final-2025.jpg`
- `academics-chemistry-lab-2025.jpg`
- `events-annual-prize-day-2025.jpg`

### Homepage Gallery Strip — `index.html`

The homepage shows a 6-photo strip with class `.gallery-strip`. It displays exactly 6 `.gallery-item` elements. If a new photo should replace one of the homepage strip photos (e.g., it's more recent or more representative), update `index.html` too.

If the user says "add to homepage gallery" or "feature this photo", replace the oldest/least relevant item in `.gallery-strip` in `index.html`.

### Lightbox

The lightbox is handled entirely by `js/gallery.js`. No changes needed there — it auto-attaches click events to all `.gallery-item` elements on page load.

### Alt Text

Write specific, descriptive alt text for every image. Format:
`"[What is shown] at Al-Barr Secondary School, [Year if known]"`

Never use generic alt text like "school photo" or "image".
