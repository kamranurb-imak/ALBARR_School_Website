---
paths:
  - "**/*.html"
---

# Navbar

## Variants

| Class | Used on | Behaviour |
|---|---|---|
| `navbar transparent` | `index.html` only | Starts transparent over the shader hero; gains `scrolled` class (white background + shadow) when `window.scrollY > 60` |
| `navbar solid` | All other pages | White/surface background from load, no scroll transition |

## Requirements per page

Every HTML page must include:
1. `<nav class="navbar solid" id="navbar">` (or `transparent` for home)
2. `<button class="hamburger" id="hamburger">` for mobile
3. `<div class="nav-drawer" id="navDrawer">` with the same links
4. `<button class="theme-toggle" id="themeToggle">` for dark/light
5. `<script src="js/main.js"></script>` before `</body>`

Active page link gets class `active` — set it manually in the HTML on the matching `<a>`.
