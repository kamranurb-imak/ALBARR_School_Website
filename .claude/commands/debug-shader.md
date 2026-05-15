# Debug or Modify WebGL Shader

Diagnose issues with the hero background shader on `index.html`, or add/modify one of the 5 shader effects.

## Instructions

The user will describe the problem (e.g., "shader not loading", "black screen on mobile", "I want a new shader effect") or request a modification to an existing shader.

---

### Shader Architecture

All shader code lives in `js/shaders.js`. The file exports (or defines in scope) 5 GLSL fragment shader programs and a `ShaderManager` class (or equivalent) that:
1. Creates a `<canvas>` element and inserts it as the hero background
2. Compiles and links a WebGL program for the active shader
3. Runs a `requestAnimationFrame` render loop
4. Passes `u_time`, `u_resolution`, and `u_mouse` uniforms per frame
5. Passes `u_burst` uniform on click for the click-burst effect

The picker buttons in `index.html` have class `.shader-btn` and a `data-shader` attribute matching the shader key. Clicking calls `ShaderManager.setShader(key)` (or equivalent).

**The 5 shaders and their keys:**
| Button | Key | Description |
|---|---|---|
| 🌊 Ocean | `ocean` | Water waves reacting to mouse |
| 🌌 Aurora | `aurora` | Northern lights effect |
| 🔥 Lava | `lava` | Lava vortex flow |
| 🤖 Cyber | `cyber` | Neon tech grid |
| ✨ Galaxy | `galaxy` | Particle/dust field |

---

### Common Issues & Fixes

**Black/blank canvas:**
- WebGL not supported in browser → add a fallback CSS gradient on `.hero-section` so content is still readable
- Shader compile error → open browser DevTools console, look for `WebGL: INVALID_OPERATION` or `ERROR: ...` in GLSL logs
- Canvas not resizing → check that the resize observer or `window.resize` listener in `js/shaders.js` calls `gl.viewport(0, 0, canvas.width, canvas.height)` after resize

**Shader not switching:**
- `.shader-btn` click handler may not be attaching — check that `js/shaders.js` is loaded after the DOM (`defer` attribute or at end of `<body>`)
- `.shader-active` class toggle may be broken — it controls the visual highlight on the picker button

**Performance / frame drop on mobile:**
- Reduce resolution by rendering at `0.5 * devicePixelRatio` instead of full resolution
- Simplify the fragment shader by reducing loop iterations (look for `for` loops in GLSL)

**Mouse position wrong:**
- The `u_mouse` uniform should be normalized (0.0–1.0). Check the mousemove listener normalizes: `x / canvas.width`, `y / canvas.height`

---

### Adding a New Shader

To add a 6th shader effect:

1. **In `js/shaders.js`:** Add a new GLSL string to the shaders object with a unique key. Minimum shader structure:
```glsl
precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_burst;
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  // ... your effect code ...
  gl_FragColor = vec4(color, 1.0);
}
```

2. **In `index.html`:** Add a new button in `.shader-picker-btns`:
```html
<button class="shader-btn" data-shader="[key]" title="[Name]">[emoji]</button>
```

3. **Test:** Check browser console for GLSL compile errors immediately after adding.

---

### Fallback for No-WebGL

If the user wants to support browsers without WebGL, add this fallback in `js/shaders.js` after the canvas creation attempt:
```javascript
if (!gl) {
  canvas.style.display = 'none';
  document.querySelector('.hero-section').style.background =
    'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)';
}
```

---

### File Reference

- Shader programs: `js/shaders.js`
- Shader picker buttons: `index.html` (`.shader-picker` section)
- Picker button styles: `css/pages/home.css` (`.shader-btn`, `.shader-active`, `.shader-pulse`)
- Hero canvas positioning: `css/pages/home.css` (`#hero-canvas` or `canvas` inside `.hero-section`)
