/* ═══════════════════════════════════════════
   AL-BARR — FORM JS
   Validation with red borders + error messages
   Loading state on submit button
═══════════════════════════════════════════ */

function validateField(id, check) {
  const el  = document.getElementById(id);
  const err = document.getElementById('err-' + id);
  if (!el) return true;
  const valid = check(el.value.trim());
  el.classList.toggle('error', !valid);
  if (err) err.classList.toggle('show', !valid);
  return valid;
}

const notEmpty = v => v.length > 0;
const isEmail  = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isPhone  = v => v.length >= 7;

/* ── Admissions Form ── */
const admForm = document.getElementById('admForm');
if (admForm) {
  admForm.addEventListener('submit', e => {
    e.preventDefault();
    const v = [
      validateField('parentName',  notEmpty),
      validateField('studentName', notEmpty),
      validateField('phone',       isPhone),
      validateField('email',       isEmail),
      validateField('grade',       notEmpty),
    ].every(Boolean);
    if (!v) return;
    const btn = document.getElementById('admSubmit');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ Enquiry Submitted!';
      btn.style.background = '#27ae60';
      btn.style.borderColor = '#27ae60';
      admForm.reset();
      setTimeout(() => {
        btn.textContent = 'Submit Enquiry';
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
      }, 4000);
    }, 1200);
  });
  admForm.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => {
      el.classList.remove('error');
      const err = document.getElementById('err-' + el.id);
      if (err) err.classList.remove('show');
    });
  });
}

/* ── Contact Form ── */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const v = [
      validateField('firstName', notEmpty),
      validateField('lastName',  notEmpty),
      validateField('cphone',    isPhone),
      validateField('cemail',    isEmail),
      validateField('subject',   notEmpty),
      validateField('cmessage',  notEmpty),
    ].every(Boolean);
    if (!v) return;
    const btn = document.getElementById('contactSubmit');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#27ae60';
      btn.style.borderColor = '#27ae60';
      contactForm.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
      }, 4000);
    }, 1200);
  });
  contactForm.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => {
      el.classList.remove('error');
      const err = document.getElementById('err-' + el.id);
      if (err) err.classList.remove('show');
    });
  });
}
