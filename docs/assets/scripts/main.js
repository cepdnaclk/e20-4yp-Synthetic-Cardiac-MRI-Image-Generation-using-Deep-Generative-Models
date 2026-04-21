/* ════════════════════════════════════════════
   CMR·GEN·FYP  —  main.js
   ════════════════════════════════════════════ */

/* ─── SCROLL REVEAL ─── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── PIPELINE MODEL TABS ─── */
function switchPvTab(model, btn) {
  document.querySelectorAll('.pv-arch').forEach(a => a.classList.add('pv-hidden'));
  document.querySelectorAll('.pv-tab').forEach(t => t.classList.remove('pv-active'));
  document.getElementById('arch-' + model).classList.remove('pv-hidden');
  btn.classList.add('pv-active');
}

/* ─── SAMPLE GALLERY TABS ─── */
function switchGal(model, btn) {
  document.querySelectorAll('.gallery-panel').forEach(p => p.classList.remove('gal-show'));
  document.querySelectorAll('.gal-tab').forEach(t => t.classList.remove('gal-active'));
  document.getElementById('gal-' + model).classList.add('gal-show');
  btn.classList.add('gal-active');
}

/* ─── TEAM PHOTO FALLBACK ─── */
/*
  For each .team-photo-wrap that contains an <img>, if the image fails
  to load the wrapper is replaced with an initials-based avatar fallback.
  The initials are read from the data-initials attribute on the wrapper.
*/
document.querySelectorAll('.team-photo-wrap img').forEach(img => {
  img.addEventListener('error', () => {
    const wrap   = img.closest('.team-photo-wrap');
    const isSup  = wrap.closest('.supervisor-card') !== null;
    const initials = wrap.dataset.initials || '?';
    const fallback = document.createElement('div');
    fallback.className = 'team-avatar-fallback' + (isSup ? ' sup-fallback' : '');
    fallback.textContent = initials;
    wrap.replaceWith(fallback);
  });
});

/* ─── ACTIVE NAV HIGHLIGHT ON SCROLL ─── */
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + entry.target.id
          ? 'var(--teal)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));
