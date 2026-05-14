/* ═══════════════════════════════════════════
   AL-BARR SECONDARY SCHOOL — MAIN JS
   Navbar · Theme Toggle · Hamburger · Counters · Fade-in
═══════════════════════════════════════════ */

/* ── Navbar scroll ── */
const navbar = document.getElementById('navbar');
if (navbar && navbar.classList.contains('transparent')) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
}

/* ── Active nav link ── */
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage) a.classList.add('active');
});

/* ── Theme Toggle ── */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('albarr-theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateToggleIcon(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('albarr-theme', next);
    updateToggleIcon(next);
  });
}
function updateToggleIcon(theme) {
  if (themeToggle) themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
}

/* ── Hamburger / Mobile Drawer ── */
const hamburger = document.getElementById('hamburger');
const navDrawer  = document.getElementById('navDrawer');
if (hamburger && navDrawer) {
  hamburger.addEventListener('click', () => {
    const open = navDrawer.classList.toggle('open');
    hamburger.classList.toggle('open', open);
  });
  navDrawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navDrawer.classList.remove('open');
      hamburger.classList.remove('open');
    });
  });
}

/* ── Animated counters ── */
function animateCounter(el) {
  const target   = +el.dataset.target;
  const suffix   = el.querySelector('em') ? el.querySelector('em').textContent : '';
  const duration = 1800;
  const steps    = 60;
  const increment = target / steps;
  let current = 0;
  const interval = setInterval(() => {
    current += increment;
    if (current >= target) { current = target; clearInterval(interval); }
    const val = target >= 1000 ? Math.floor(current).toLocaleString() : Math.floor(current);
    const emEl = el.querySelector('em');
    el.childNodes[0].textContent = val;
    if (emEl) emEl.textContent = suffix;
  }, duration / steps);
}

const statsBar = document.querySelector('.stats-bar');
let countersAnimated = false;
if (statsBar) {
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !countersAnimated) {
      countersAnimated = true;
      document.querySelectorAll('.stat-num[data-target]').forEach(animateCounter);
    }
  }, { threshold: 0.4 });
  obs.observe(statsBar);
}

/* ── Scroll fade-in ── */
const fadeEls = document.querySelectorAll('.fade-up');
const fadeObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      fadeObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => fadeObs.observe(el));

/* ── Newsletter forms ── */
document.querySelectorAll('.nl-form').forEach(form => {
  const btn = form.querySelector('.btn');
  const input = form.querySelector('input');
  btn.addEventListener('click', () => {
    if (!input.value || !input.value.includes('@')) {
      input.style.borderColor = '#e53e3e';
      return;
    }
    input.style.borderColor = '';
    btn.textContent = '✓';
    btn.style.background = '#27ae60';
    setTimeout(() => { btn.textContent = 'Join'; btn.style.background = ''; input.value = ''; }, 2500);
  });
});
