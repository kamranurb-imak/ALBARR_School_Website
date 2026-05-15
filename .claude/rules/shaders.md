---
paths:
  - "js/shaders.js"
  - "index.html"
  - "css/pages/home.css"
---

# Shader Wallpaper

## Structure

Five WebGL fragment shaders are defined in the `SHADERS` array at the top of `js/shaders.js`. Each entry has `name`, `emoji`, `description`, and `frag` (GLSL string).

The `ShaderWallpaper` class compiles all five programs on init and switches between them instantly via `switchTo(index)`.

## Uniforms (passed every frame)

| Uniform | Type | Description |
|---|---|---|
| `u_res` | `vec2` | Canvas width × height in pixels |
| `u_mouse` | `vec2` | Mouse position in canvas pixels (Y flipped) |
| `u_time` | `float` | Seconds since page load |
| `u_click` | `vec2` | Last click position in canvas pixels |
| `u_clickTime` | `float` | `u_time` value at last click |

## HTML contract

- Canvas `#shaderCanvas` must exist in the hero section for the script to activate.
- Shader picker `[data-shader]` buttons must live **inside `.hero-card-col`**, below `.hero-info-card` — they flow in the document, not absolutely positioned.
- Only `index.html` uses shaders.
