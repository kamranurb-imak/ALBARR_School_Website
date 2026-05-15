# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Al-Barr Secondary School** — a static 7-page school website. Pure HTML/CSS/JS, no build step, no framework, no package manager. Open `index.html` directly in a browser.

```
start chrome index.html          # Windows — open in Chrome
python -m http.server 8080       # optional local server (Python 3)
```

## Architecture

### File layout

```
school-website/
├── index.html                   # Home — only page with shader wallpaper
├── about / academics / admissions / news / gallery / contact .html
├── css/
│   ├── main.css                 # CSS variables (light + dark theme), reset, typography, buttons, cards
│   ├── components.css           # Navbar, footer, forms, gallery grid, lightbox, stats bar, testimonials
│   └── pages/home.css           # Hero section, shader picker, info card, home-only layouts
└── js/
    ├── main.js                  # Navbar scroll, dark/light theme toggle (localStorage), counters, fade-in observer
    ├── shaders.js               # WebGL engine + 5 GLSL fragment shaders; mounts on DOMContentLoaded
    ├── gallery.js               # Lightbox open/close + category filter
    └── form.js                  # Admissions & contact form validation with error states
```

### CSS variable system (`css/main.css`)

All colours, spacing, radius and shadow tokens live in `:root`. Dark theme overrides are on `[data-theme="dark"]`. Never hardcode colours — always use a `--color-*` variable.

Key tokens: `--color-primary` (#1B3A6B navy), `--color-secondary` (#F5A623 gold), `--color-accent` (#2E86AB sky).

### Theme toggle

`data-theme` attribute lives on `<html>`. `js/main.js` reads/writes it and persists to `localStorage` key `albarr-theme`. Every page must include a `<button id="themeToggle">` and load `js/main.js`.

### Shader wallpaper (`js/shaders.js`)

Five WebGL fragment shaders defined in the `SHADERS` array (each has `name`, `emoji`, `description`, `frag`). The `ShaderWallpaper` class compiles all five programs on init and switches between them instantly. Uniforms passed every frame: `u_res`, `u_mouse`, `u_time`, `u_click`, `u_clickTime`. Only used on `index.html` — the canvas `#shaderCanvas` must exist for the script to activate. The shader picker `[data-shader]` buttons live **inside `.hero-card-col`**, below `.hero-info-card`.

### Inner-page navbar

Pages other than `index.html` use `class="navbar solid"` (not `transparent`) so it has a white/surface background from load. `index.html` uses `transparent` which transitions to `scrolled` on scroll.

### Forms

`js/form.js` validates `#admForm` (admissions) and `#contactForm` (contact). Fields get `.error` class + sibling `.form-error` shown on failed submit. IDs must match the pattern `err-<fieldId>` for error spans.

## School details (hardcoded throughout)

| Field | Value |
|---|---|
| Name | Al-Barr Secondary School |
| Tagline | Nurturing Minds, Building Futures |
| Type | O-Level & A-Level (Cambridge IGCSE / AS & A-Level) |
| Address | R-123, Sector-9, Power House, North Karachi, Karachi, Pakistan |
| Phone | +92-334-1243456 |
| Email | info@albarr.edu.pk |
| Principal | Muhammad Imran |
| Established | 2020 |

## Git remote

```
https://github.com/kamranurb-imak/ALBARR_School_Website
```
Branch: `master`
