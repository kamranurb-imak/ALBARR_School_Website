/* ═══════════════════════════════════════════
   AL-BARR — GALLERY JS
   Lightbox · Category filter
═══════════════════════════════════════════ */

/* ── Lightbox ── */
const lightbox = document.getElementById('lightbox');
const lbCaption = document.getElementById('lbCaption');
const lbIcon    = document.getElementById('lbIcon');
const lbClose   = document.getElementById('lbClose');

if (lightbox) {
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const caption = item.dataset.caption || 'Photo';
      const icon    = item.querySelector('.ph-icon');
      if (lbIcon && icon)    lbIcon.textContent = icon.textContent;
      if (lbCaption)         lbCaption.textContent = caption;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLb = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };
  if (lbClose)  lbClose.addEventListener('click', closeLb);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLb(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
}

/* ── Gallery category filter ── */
const galleryGrid = document.getElementById('galleryGrid');
document.querySelectorAll('[data-cat]').forEach(btn => {
  if (!btn.classList.contains('gallery-item')) {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gf-btn, .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      if (galleryGrid) {
        galleryGrid.querySelectorAll('.gallery-item').forEach(item => {
          const show = cat === 'all' || item.dataset.cat === cat;
          item.style.display = show ? '' : 'none';
        });
      }
    });
  }
});
