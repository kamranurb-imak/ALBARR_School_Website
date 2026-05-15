/* ═══════════════════════════════════════════
   EVERGREEN ACADEMY — JAVASCRIPT
═══════════════════════════════════════════ */

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ── Mobile hamburger ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ── Smooth active nav highlighting ── */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navItems.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

/* ── Animated counters ── */
function animateCounter(el) {
  const target  = +el.dataset.target;
  const suffix  = el.querySelector('span').textContent;
  const duration = 2000;
  const step    = target / (duration / 16);
  let current   = 0;
  const timer   = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    const display = target >= 1000
      ? Math.floor(current).toLocaleString()
      : Math.floor(current);
    el.childNodes[0].textContent = display;
  }, 16);
}

const statsSection = document.getElementById('stats');
let countersStarted = false;
const statsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !countersStarted) {
    countersStarted = true;
    document.querySelectorAll('.stat-number').forEach(animateCounter);
  }
}, { threshold: 0.3 });
if (statsSection) statsObserver.observe(statsSection);

/* ── Scroll-reveal animations ── */
const fadeEls = document.querySelectorAll(
  '.program-card, .facility-card, .testimonial-card, .event-item, .pillar, .stat-card, .about-content, .contact-info, .contact-form-wrap'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => revealObserver.observe(el));

/* ── Contact form submit ── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#38a05c';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3500);
  });
}

/* ── Newsletter form ── */
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = newsletterForm.querySelector('.btn');
    btn.textContent = '✓';
    setTimeout(() => { btn.textContent = 'Join'; }, 2500);
  });
}
