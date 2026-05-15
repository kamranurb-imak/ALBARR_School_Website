# Update Site Theme / Colors

Change the color scheme, typography, or visual variables for the Al-Barr Secondary School website.

## Instructions

All colors and design tokens live in a single place: `css/main.css` inside the `:root { }` block and the `[data-theme="dark"] { }` block. **Never hardcode colors anywhere else** — only update variables here and the change propagates site-wide.

### Current Color Variables (Light Theme — in `:root`)

```css
--color-primary:        #1B3A6B;   /* Navy — headers, navbar, buttons */
--color-primary-dark:   #122850;   /* Darker navy — hover states */
--color-primary-light:  #2a5299;   /* Lighter navy — accents */
--color-secondary:      #F5A623;   /* Gold — highlights, badges, CTA accents */
--color-secondary-dark: #d4891a;   /* Dark gold — hover on secondary elements */
--color-accent:         #2E86AB;   /* Sky blue — links, accent badges */
--color-bg:             #FAFAFA;   /* Page background */
--color-bg-alt:         #F0F4FA;   /* Alternating section background */
--color-surface:        #FFFFFF;   /* Cards, navbar, footer backgrounds */
--color-text:           #1A1A2E;   /* Body text */
--color-text-muted:     #6B7280;   /* Secondary/muted text */
--color-border:         #E5E7EB;   /* Borders, dividers */
--color-white:          #FFFFFF;
```

### Current Dark Theme Variables (`[data-theme="dark"]`)

```css
--color-bg:      #0f1623;
--color-bg-alt:  #1a2332;
--color-surface: #1e2d42;
--color-text:    #e8edf5;
--color-primary: #2a5299;
```

### Current Font Variables

```css
--font-heading: 'Playfair Display', Georgia, serif;
--font-body:    'Source Sans 3', system-ui, sans-serif;
```

To change fonts: update these variables AND update the Google Fonts `@import` URL at the top of `css/main.css`.

### How the Theme Toggle Works

The toggle button in the navbar has `class="theme-toggle"`. Clicking it runs code in `js/main.js` that:
1. Reads `localStorage.getItem('albarr-theme')`
2. Toggles `data-theme="dark"` on the `<html>` element
3. Saves the preference back to localStorage

The key is `'albarr-theme'`. Do not change this key without updating every HTML file's inline theme-init script in `<head>`.

### Shadow Variables

```css
--shadow-sm:  0 1px 3px rgba(0,0,0,0.08);
--shadow-md:  0 4px 12px rgba(0,0,0,0.10);
--shadow-lg:  0 8px 32px rgba(0,0,0,0.12);
--shadow-xl:  0 20px 60px rgba(0,0,0,0.15);
```

### Border Radius Variables

```css
--radius-sm:   4px;
--radius-md:   8px;
--radius-lg:   16px;
--radius-xl:   24px;
--radius-full: 9999px;
```

### Rules

- Only edit `css/main.css` for theme changes — never touch individual page CSS or component CSS for color.
- After changing `--color-primary`, also update `--color-primary-dark` and `--color-primary-light` to consistent darker/lighter variants of the new color.
- If changing the dark theme, always check that `--color-text` on `--color-bg` in dark mode has sufficient contrast (aim for 4.5:1 ratio).
- The shader backgrounds on `index.html` are WebGL and are not affected by CSS variables. They are independently styled in `js/shaders.js`.
