---
paths:
  - "css/**/*.css"
  - "**/*.html"
---

# CSS Architecture

## File responsibilities

| File | Purpose |
|---|---|
| `css/main.css` | CSS variables, reset, typography, buttons, cards |
| `css/components.css` | Navbar, footer, forms, gallery grid, lightbox, stats bar, testimonials |
| `css/pages/home.css` | Hero section, shader picker, info card, home-only layouts |

## Variable system

All colours, spacing, radius and shadow tokens live in `:root` in `css/main.css`. Dark theme overrides are on `[data-theme="dark"]`. Never hardcode colours — always use a `--color-*` variable.

Key colour tokens:
- `--color-primary` → `#1B3A6B` (navy)
- `--color-secondary` → `#F5A623` (gold)
- `--color-accent` → `#2E86AB` (sky blue)

## Theme toggle

`data-theme` attribute lives on `<html>`. `js/main.js` reads/writes it and persists to `localStorage` key `albarr-theme`. Every page must have a `<button id="themeToggle">` and load `js/main.js`.
