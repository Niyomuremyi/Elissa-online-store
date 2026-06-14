/* ==========================================================================
   ELISSA ONLINE STORE — about.js  (About page)
   Scroll-reveal animation for the .reveal sections.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  // Fallback: if IntersectionObserver isn't supported, just show everything
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);   // reveal once, then stop watching
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));
});