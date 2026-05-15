# Fix Responsive / Mobile Layout Issues

Diagnose and fix layout problems on the Al-Barr Secondary School website at specific screen sizes.

## Instructions

The user will describe the issue (e.g., "navbar breaks on mobile", "cards overflow on tablet", "text too small on phone"). Read the relevant HTML and CSS files, find the root cause, and fix it.

### Breakpoint System

The site uses these breakpoints (all in `css/main.css` and `css/components.css`):

| Breakpoint | Width | Typical use |
|---|---|---|
| Desktop default | 1280px+ | Full multi-column layouts |
| Large tablet | `max-width: 1024px` | 2-col grids, collapsed stats |
| Tablet / small laptop | `max-width: 768px` | Single column, hamburger nav |
| Mobile | `max-width: 480px` | Font size reductions, tighter spacing |

Minimum supported width: **320px**.

### Key Responsive Behaviors to Know

**Navbar** (`css/components.css`):
- Desktop: `.nav-links` and `.nav-right` visible, `.hamburger` hidden
- ≤768px: `.nav-links` and `.nav-right` hidden (`display:none`), `.hamburger` visible
- Mobile drawer: `.nav-drawer` slides in, toggled via `.open` class added by `js/main.js`

**Stats bar** (`css/components.css`):
- Desktop: `.stats-bar-grid` — 4 columns
- ≤1024px: 2 columns
- ≤480px: 1 column (stacked)

**Gallery grid** (`css/components.css`):
- Desktop: `.gallery-grid` — 3 columns
- ≤768px: 2 columns
- ≤480px: 1 column

**Values grid** (`css/components.css`):
- Desktop: `.values-grid` — 4 columns
- ≤768px: 2 columns
- ≤480px: 1 column

**Hero section** (`css/pages/home.css`):
- Desktop: `.hero-container` — 2 columns (content left, info card right)
- ≤1024px: single column, card below content
- ≤768px: smaller font sizes, padding reduced

**Footer** (`css/components.css`):
- Desktop: `.footer-grid` — 4 columns
- ≤1024px: 2 columns
- ≤768px: 1 column stacked

### Container Width

`.container` in `css/main.css`:
```css
max-width: 1200px;
margin: 0 auto;
padding: 0 var(--space-6);
```
At ≤768px padding reduces to `var(--space-4)`. Do not remove container padding on mobile — it prevents content from touching screen edges.

### Common Fix Patterns

**Overflow/horizontal scroll:** Check for fixed widths or `width: 100vw` on inner elements. Add `overflow-x: hidden` to `.section` or the problem container only if needed — not globally on `body`.

**Text too large on mobile:** Add a `@media (max-width: 480px)` rule reducing `font-size` using spacing variables:
```css
@media (max-width: 480px) {
  .hero-heading { font-size: var(--text-3xl); }
}
```

**Grid breaking:** Replace `grid-template-columns: repeat(N, 1fr)` with a media query wrapping:
```css
@media (max-width: 768px) {
  .your-grid { grid-template-columns: 1fr; }
}
```

**Button row wrapping awkwardly:** Use `flex-wrap: wrap; gap: var(--space-3);` on the button container.

### Where to Add Media Queries

- Component-level fixes → `css/components.css` (at the bottom of the relevant component block)
- Page-specific fixes → `css/pages/[page].css`
- Global fixes → `css/main.css`

Never add `<style>` blocks inside HTML files. All CSS goes in the CSS files.

### Testing Checklist

After making fixes, confirm:
- [ ] 320px — no horizontal scroll
- [ ] 480px — readable font sizes, no overlap
- [ ] 768px — hamburger menu appears and works
- [ ] 1024px — tablet grid layouts correct
- [ ] 1280px+ — desktop layout unchanged
