/* ═══════════════════════════════════════════════════════════════
   AL-BARR — 5 INTERACTIVE SHADER WALLPAPERS
   All react to mouse position + clicks via WebGL fragment shaders
═══════════════════════════════════════════════════════════════ */

const SHADERS = [
  {
    name: "Ocean Depth",
    emoji: "🌊",
    description: "Deep ocean currents follow your cursor",
    frag: `
      precision highp float;
      uniform vec2  u_res;
      uniform vec2  u_mouse;
      uniform float u_time;
      uniform vec2  u_click;
      uniform float u_clickTime;

      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i), hash(i + vec2(1,0)), f.x),
          mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y
        );
      }

      float fbm(vec2 p) {
        float v = 0.0, a = 0.5;
        for(int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.1; a *= 0.52; }
        return v;
      }

      void main() {
        vec2 uv    = gl_FragCoord.xy / u_res;
        vec2 mouse = u_mouse / u_res;

        // Gentle mouse warp
        vec2 offset = (mouse - 0.5) * 0.12;
        vec2 warped = uv + offset * (1.0 - uv.y * 0.4);

        // Layered ocean noise
        float n1 = fbm(warped * 2.8 + vec2(u_time * 0.08,  u_time * 0.05));
        float n2 = fbm(warped * 4.5 - vec2(u_time * 0.06,  u_time * 0.09) + n1 * 0.4);
        float n3 = fbm(warped * 1.4 + vec2(u_time * 0.04, -u_time * 0.03) + n2 * 0.3);
        float ocean = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;

        // Mouse shimmer ripple
        float mdist = length(uv - mouse);
        float ripple = sin(mdist * 22.0 - u_time * 3.0) * exp(-mdist * 4.5) * 0.06;
        ocean += ripple;

        // Click wave
        vec2 clickUV = u_click / u_res;
        float cd  = length(uv - clickUV);
        float ca  = u_time - u_clickTime;
        float wave = sin(cd * 28.0 - ca * 7.0) * exp(-cd * 3.5) * exp(-ca * 1.3) * 0.12;
        ocean += wave;

        // Deep navy → teal → light sky gradient — professional & calm
        vec3 deep    = vec3(0.04, 0.11, 0.28);   // deep navy
        vec3 mid     = vec3(0.07, 0.28, 0.52);   // ocean blue
        vec3 surface = vec3(0.12, 0.52, 0.72);   // teal
        vec3 light   = vec3(0.55, 0.82, 0.94);   // sky shimmer

        vec3 col = mix(deep, mid,     smoothstep(0.20, 0.45, ocean));
        col      = mix(col,  surface, smoothstep(0.44, 0.65, ocean));
        col      = mix(col,  light,   smoothstep(0.64, 0.80, ocean));

        // Vertical depth gradient — darker bottom, lighter top
        col = mix(col * 0.55, col, uv.y * 0.85 + 0.15);

        // Subtle caustic shimmer near surface
        float caustic = fbm(uv * 8.0 + u_time * 0.15) * 0.06;
        col += vec3(0.3, 0.7, 1.0) * caustic * uv.y;

        // Mouse glow — soft warm highlight
        float mglow = exp(-mdist * 5.0) * 0.18;
        col += vec3(0.4, 0.75, 1.0) * mglow;

        gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
      }
    `
  },
  {
    name: "Aurora Waves",
    emoji: "🌊",
    description: "Northern lights follow your cursor",
    frag: `
      precision highp float;
      uniform vec2  u_res;
      uniform vec2  u_mouse;
      uniform float u_time;
      uniform vec2  u_click;
      uniform float u_clickTime;

      float wave(vec2 uv, float freq, float speed, float amp, float off) {
        return sin(uv.x * freq + u_time * speed + off) * amp;
      }

      void main() {
        vec2 uv  = gl_FragCoord.xy / u_res;
        vec2 muv = u_mouse / u_res;

        float mx = (muv.x - 0.5) * 2.0;
        float my = (muv.y - 0.5) * 2.0;

        float y = uv.y;
        y += wave(uv, 3.0 + mx * 1.5, 0.6, 0.06, 0.0);
        y += wave(uv, 5.0 + my * 1.2, 0.9, 0.04, 2.1);
        y += wave(uv, 7.0,             1.3, 0.025, 4.2);
        y += wave(uv, 2.0 - mx * 0.8, 0.4, 0.08, 1.0);

        // Click ripple
        vec2 clickUV = u_click / u_res;
        float cd = length(uv - clickUV);
        float ca = u_time - u_clickTime;
        y += sin(cd * 30.0 - ca * 6.0) * exp(-cd * 4.0) * exp(-ca * 1.5) * 0.07;

        float band1 = smoothstep(0.0, 0.12, abs(y - 0.30)) * smoothstep(0.0, 0.12, abs(y - 0.70));
        float band2 = smoothstep(0.0, 0.09, abs(y - 0.50));
        float band3 = smoothstep(0.0, 0.14, abs(y - 0.20)) * smoothstep(0.0, 0.14, abs(y - 0.80));

        vec3 aurora1 = vec3(0.07, 0.62, 0.85) * (1.0 - band1);
        vec3 aurora2 = vec3(0.38, 0.90, 0.55) * (1.0 - band2) * 0.8;
        vec3 aurora3 = vec3(0.82, 0.35, 0.95) * (1.0 - band3) * 0.6;

        vec3 bg = mix(vec3(0.02, 0.04, 0.14), vec3(0.06, 0.12, 0.30), uv.y);
        vec3 col = bg + aurora1 + aurora2 + aurora3;

        // Stars
        vec2 sp = fract(uv * 180.0);
        float star = smoothstep(0.97, 1.0, sin(sp.x * 63.1) * sin(sp.y * 71.3));
        col += star * 0.7 * vec3(0.9, 0.95, 1.0);

        gl_FragColor = vec4(col, 1.0);
      }
    `
  },
  {
    name: "Lava Vortex",
    emoji: "🔥",
    description: "Molten geometry explodes on click",
    frag: `
      precision highp float;
      uniform vec2  u_res;
      uniform vec2  u_mouse;
      uniform float u_time;
      uniform vec2  u_click;
      uniform float u_clickTime;

      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i), hash(i + vec2(1,0)), f.x),
          mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
          f.y
        );
      }

      float fbm(vec2 p) {
        float v = 0.0, a = 0.5;
        for(int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.1; a *= 0.5; }
        return v;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - u_res * 0.5) / min(u_res.x, u_res.y);
        vec2 mouse = (u_mouse - u_res * 0.5) / min(u_res.x, u_res.y);

        // Vortex pull toward mouse
        float angle = atan(uv.y - mouse.y, uv.x - mouse.x);
        float dist  = length(uv - mouse);
        float swirl = 1.8 / (dist + 0.4);
        vec2 swirled = uv + vec2(cos(angle + swirl + u_time * 0.5), sin(angle + swirl + u_time * 0.5)) * 0.08;

        // Click explosion
        vec2 clickUV = (u_click - u_res * 0.5) / min(u_res.x, u_res.y);
        float cd = length(uv - clickUV);
        float ca = u_time - u_clickTime;
        float explode = exp(-cd * 1.8) * exp(-ca * 0.9) * sin(cd * 12.0 - ca * 10.0) * 0.4;

        float n = fbm(swirled * 2.5 + u_time * 0.18) + explode;

        vec3 lava1 = vec3(1.0,  0.18, 0.02);
        vec3 lava2 = vec3(1.0,  0.55, 0.0);
        vec3 lava3 = vec3(0.12, 0.02, 0.05);
        vec3 lava4 = vec3(1.0,  0.92, 0.4);

        vec3 col = mix(lava3, lava1, smoothstep(0.0, 0.45, n));
        col = mix(col, lava2, smoothstep(0.4, 0.65, n));
        col = mix(col, lava4, smoothstep(0.7, 0.9,  n));

        float vig = 1.0 - length(uv) * 0.65;
        col *= clamp(vig, 0.2, 1.0);

        gl_FragColor = vec4(col, 1.0);
      }
    `
  },
  {
    name: "Cyber Grid",
    emoji: "🤖",
    description: "Digital lattice pulses with every click",
    frag: `
      precision highp float;
      uniform vec2  u_res;
      uniform vec2  u_mouse;
      uniform float u_time;
      uniform vec2  u_click;
      uniform float u_clickTime;

      float grid(vec2 uv, float size) {
        vec2 g = fract(uv * size);
        float lx = smoothstep(0.0, 0.03, g.x) * smoothstep(1.0, 0.97, g.x);
        float ly = smoothstep(0.0, 0.03, g.y) * smoothstep(1.0, 0.97, g.y);
        return 1.0 - lx * ly;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_res;
        vec2 mouse = u_mouse / u_res;

        // Perspective warp toward mouse
        vec2 center = uv - 0.5;
        float warp  = 1.0 + length(center) * 0.4;
        vec2 warped = center * warp + 0.5;
        vec2 delta  = (mouse - 0.5) * 0.12;
        warped += delta * (1.0 - length(center));

        float g1 = grid(warped + u_time * 0.012, 12.0);
        float g2 = grid(warped + u_time * 0.007, 4.0);
        float g3 = grid(warped * 1.0 - u_time * 0.005, 28.0);

        // Click pulse
        float cd = length(uv - u_click / u_res);
        float ca = u_time - u_clickTime;
        float ring = smoothstep(0.03, 0.0, abs(cd - ca * 0.55)) * exp(-ca * 1.4) * 2.5;

        vec3 bg   = vec3(0.02, 0.04, 0.10);
        vec3 line1 = vec3(0.10, 0.70, 1.00);
        vec3 line2 = vec3(0.97, 0.65, 0.10);
        vec3 line3 = vec3(0.20, 1.00, 0.70);

        vec3 col = bg;
        col += line1 * g1 * 0.6;
        col += line2 * g2 * 0.5;
        col += line3 * g3 * 0.3;

        // Mouse glow
        float mglow = exp(-length(uv - mouse) * 6.0) * 0.5;
        col += vec3(0.10, 0.65, 1.0) * mglow;

        // Click ring
        col += vec3(1.0, 0.85, 0.2) * ring;

        // Scanlines
        float scan = sin(gl_FragCoord.y * 3.14159 * 1.5) * 0.04 + 0.96;
        col *= scan;

        gl_FragColor = vec4(col, 1.0);
      }
    `
  },
  {
    name: "Galaxy Dust",
    emoji: "✨",
    description: "Stardust spirals around your cursor",
    frag: `
      precision highp float;
      uniform vec2  u_res;
      uniform vec2  u_mouse;
      uniform float u_time;
      uniform vec2  u_click;
      uniform float u_clickTime;

      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

      float star(vec2 uv, float thresh) {
        return smoothstep(thresh + 0.01, thresh, hash(floor(uv * 220.0)));
      }

      vec3 hsv2rgb(vec3 c) {
        vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - u_res * 0.5) / min(u_res.x, u_res.y);
        vec2 mouse = (u_mouse - u_res * 0.5) / min(u_res.x, u_res.y);

        // Spiral arms
        float r = length(uv);
        float a = atan(uv.y, uv.x);

        float mouseR = length(mouse);
        float spiral  = sin(a * 3.0 - r * 8.0 + u_time * 0.5 + mouseR * 4.0) * 0.5 + 0.5;
        float spiral2 = sin(a * 2.0 - r * 6.0 - u_time * 0.35 + mouse.x * 3.0) * 0.5 + 0.5;

        float nebula = spiral * exp(-r * 2.2) + spiral2 * exp(-r * 1.8) * 0.6;

        // Mouse gravity lensing
        float mDist = length(uv - mouse);
        float lens  = 0.12 / (mDist + 0.15);

        // Click starburst
        vec2 clickUV = (u_click - u_res * 0.5) / min(u_res.x, u_res.y);
        float ca = u_time - u_clickTime;
        float cr = length(uv - clickUV);
        float burst = exp(-cr * 2.0) * exp(-ca * 0.7) * (1.0 + sin(cr * 20.0 - ca * 12.0) * 0.5);

        // Background deep space
        vec3 bg = mix(vec3(0.01, 0.01, 0.06), vec3(0.04, 0.02, 0.12), r);

        // Galaxy hue shifts with mouse position
        float hue = 0.62 + mouse.x * 0.15 + mouse.y * 0.1;
        vec3 armCol  = hsv2rgb(vec3(hue,         0.7, 1.0));
        vec3 armCol2 = hsv2rgb(vec3(hue + 0.25,  0.9, 0.9));
        vec3 burstCol= hsv2rgb(vec3(hue + 0.12,  0.5, 1.0));

        vec3 col = bg;
        col += armCol  * nebula * 0.7;
        col += armCol2 * nebula * spiral2 * 0.5;
        col += vec3(0.6, 0.8, 1.0) * lens * 0.15;
        col += burstCol * burst * 0.9;

        // Twinkle stars
        vec2 starUV = uv + u_time * 0.005;
        col += vec3(1.0) * star(starUV, 0.992) * (0.7 + sin(u_time * 3.0 + hash(floor(starUV * 220.0)) * 6.28) * 0.3);
        col += vec3(0.85, 0.9, 1.0) * star(starUV + 0.3, 0.996) * 0.5;

        gl_FragColor = vec4(col, 1.0);
      }
    `
  }
];

/* ═══════════════════════════════════════════
   WebGL Engine
═══════════════════════════════════════════ */
class ShaderWallpaper {
  constructor(canvas) {
    this.canvas   = canvas;
    this.gl       = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    this.programs = [];
    this.current  = 0;
    this.mouse    = { x: 0, y: 0 };
    this.click    = { x: 0, y: 0 };
    this.clickTime = -999;
    this.startTime = performance.now();
    this.animId    = null;
    this.transitioning = false;
    this.transitionAlpha = 1.0;

    if (!this.gl) return;
    this._compile();
    this._bind();
    this._resize();
    this._loop();
  }

  _vert() {
    return `
      attribute vec2 a_pos;
      void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
    `;
  }

  _makeProgram(fragSrc) {
    const gl = this.gl;
    const vs = this._shader(gl.VERTEX_SHADER,   this._vert());
    const fs = this._shader(gl.FRAGMENT_SHADER, fragSrc);
    const prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    return prog;
  }

  _shader(type, src) {
    const gl = this.gl;
    const s  = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  }

  _compile() {
    const gl  = this.gl;
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    this.buf = buf;
    this.programs = SHADERS.map(s => this._makeProgram(s.frag));
  }

  _bind() {
    window.addEventListener('resize',      () => this._resize());
    window.addEventListener('mousemove',   e  => this._onMove(e));
    window.addEventListener('touchmove',   e  => this._onTouch(e), { passive: true });
    window.addEventListener('click',       e  => this._onClick(e));
    window.addEventListener('touchstart',  e  => this._onTouchClick(e), { passive: true });
  }

  _onMove(e) {
    const r = this.canvas.getBoundingClientRect();
    this.mouse.x = e.clientX - r.left;
    this.mouse.y = r.height - (e.clientY - r.top);
  }
  _onTouch(e) {
    if (!e.touches[0]) return;
    const r = this.canvas.getBoundingClientRect();
    this.mouse.x = e.touches[0].clientX - r.left;
    this.mouse.y = r.height - (e.touches[0].clientY - r.top);
  }
  _onClick(e) {
    const r = this.canvas.getBoundingClientRect();
    this.click.x    = e.clientX - r.left;
    this.click.y    = r.height - (e.clientY - r.top);
    this.clickTime  = (performance.now() - this.startTime) / 1000;
  }
  _onTouchClick(e) {
    if (!e.touches[0]) return;
    const r = this.canvas.getBoundingClientRect();
    this.click.x   = e.touches[0].clientX - r.left;
    this.click.y   = r.height - (e.touches[0].clientY - r.top);
    this.clickTime = (performance.now() - this.startTime) / 1000;
  }

  _resize() {
    this.canvas.width  = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    // Start mouse in center
    this.mouse.x = this.canvas.width  / 2;
    this.mouse.y = this.canvas.height / 2;
  }

  _draw() {
    const gl   = this.gl;
    const prog = this.programs[this.current];
    const t    = (performance.now() - this.startTime) / 1000;

    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buf);

    const pos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const set2f = (n, x, y) => { const l = gl.getUniformLocation(prog, n); if(l) gl.uniform2f(l, x, y); };
    const set1f = (n, v)    => { const l = gl.getUniformLocation(prog, n); if(l) gl.uniform1f(l, v); };

    set2f('u_res',       this.canvas.width, this.canvas.height);
    set2f('u_mouse',     this.mouse.x, this.mouse.y);
    set1f('u_time',      t);
    set2f('u_click',     this.click.x, this.click.y);
    set1f('u_clickTime', this.clickTime);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  _loop() {
    this._draw();
    this.animId = requestAnimationFrame(() => this._loop());
  }

  switchTo(index, onDone) {
    if (index === this.current) return;
    this.current = index;
    if (onDone) onDone();
  }

  destroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
  }
}

/* ═══════════════════════════════════════════
   Mount — called after DOM ready
═══════════════════════════════════════════ */
function mountShaderWallpaper() {
  const canvas = document.getElementById('shaderCanvas');
  if (!canvas) return;

  const wallpaper = new ShaderWallpaper(canvas);

  // Wire up picker buttons
  document.querySelectorAll('[data-shader]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.shader);
      wallpaper.switchTo(idx);
      document.querySelectorAll('[data-shader]').forEach(b => b.classList.remove('shader-active'));
      btn.classList.add('shader-active');

      // Ripple feedback
      btn.classList.add('shader-pulse');
      setTimeout(() => btn.classList.remove('shader-pulse'), 400);
    });
  });

  // Activate first button
  const first = document.querySelector('[data-shader="0"]');
  if (first) first.classList.add('shader-active');

  return wallpaper;
}

document.addEventListener('DOMContentLoaded', mountShaderWallpaper);
