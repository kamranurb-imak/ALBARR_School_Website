# Add New Section to a Page

Add a well-structured, styled section to an existing page on the Al-Barr Secondary School website.

## Instructions

The user will specify: which page to edit, what the section is about, and where to insert it (before footer, after hero, etc.).

### Section Shell

Every section uses one of these two wrappers:
```html
<!-- Standard white background -->
<section class="section">
  <div class="container">
    ...
  </div>
</section>

<!-- Alternating gray background -->
<section class="section section-alt">
  <div class="container">
    ...
  </div>
</section>
```

Alternate between `section` and `section-alt` so adjacent sections never share the same background. Check the existing page to maintain the alternating pattern.

### Section Header Pattern

Most sections open with a label + title + subtitle:
```html
<div class="section-hdr text-center fade-up">
  <span class="label">[Short Category Label]</span>
  <h2 class="section-title">[Main Heading]</h2>
  <p class="section-sub">[One or two sentence description]</p>
</div>
```

### Available Layout Patterns

**2-column grid:**
```html
<div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-8);">
```

**3-column card grid:**
```html
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-6);">
```

**4-column grid (collapses to 2 at 768px — add a `<style>` block or page CSS):**
```html
<div class="values-grid">
```

### Available Card Components

**Generic card:**
```html
<div class="card fade-up">
  <h3>[Title]</h3>
  <p>[Description]</p>
</div>
```

**Program card:**
```html
<div class="program-card fade-up">
  <div class="program-card-icon">[emoji or icon]</div>
  <h3>[Program Name]</h3>
  <p>[Description]</p>
</div>
```

**Value/feature item:**
```html
<div class="value-item fade-up">
  <div class="value-icon">[emoji]</div>
  <h4>[Title]</h4>
  <p>[Description]</p>
</div>
```

### CTA Section

To add a call-to-action banner at the bottom of the page (before footer):
```html
<section class="cta-section">
  <div class="container text-center">
    <h2>[Heading]</h2>
    <p>[Supporting text]</p>
    <div class="cta-btns">
      <a href="admissions.html" class="btn btn-white btn-lg">Apply Now</a>
      <a href="contact.html" class="btn btn-outline-white btn-lg">Contact Us</a>
    </div>
  </div>
</section>
```

### CSS Variables to Use

Never hardcode colors. Always use:
- `var(--color-primary)` — Navy #1B3A6B
- `var(--color-secondary)` — Gold #F5A623
- `var(--color-accent)` — Sky Blue #2E86AB
- `var(--color-bg-alt)` — Light gray #F0F4FA
- `var(--color-text)` — Body text #1A1A2E
- `var(--color-text-muted)` — Muted #6B7280
- Spacing: `var(--space-4)` through `var(--space-24)`
- Shadows: `var(--shadow-sm)` through `var(--shadow-xl)`
- Radius: `var(--radius-md)`, `var(--radius-lg)`, `var(--radius-xl)`

### Animations

Add `class="fade-up"` to cards, section headers, and key elements. The `js/main.js` IntersectionObserver handles the entrance animation automatically.

### Content

Write realistic school-appropriate text. Reference Al-Barr Secondary School facts where relevant (Karachi, est. 2020, 850+ students, 94% pass rate, O-Level & A-Level programs).
