/* ==========================================================================
   ELISSA ONLINE STORE — index.js  (Home page)
   ========================================================================== */

/* ---------------------------- FEATURED PRODUCTS ---------------------------- */
function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;

  // A hand-picked mix across categories
  const featuredIds = ['e1', 'f4', 'c1', 'b4', 'a5', 'e5', 'h2', 'f2'];
  const featured = featuredIds.map(getProductById).filter(Boolean);

  grid.innerHTML = featured.map(createProductCardHTML).join('');
  wireProductGrid(grid);
}

/* ---------------------------- HERO SLIDER ---------------------------- */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dots .dot');
  const prev = document.getElementById('heroPrev');
  const next = document.getElementById('heroNext');
  if (!slides.length) return;

  let current = 0;
  let timer;

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('active', i === current));
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }
  function nextSlide() { show(current + 1); }
  function prevSlide() { show(current - 1); }
  function startAuto() { timer = setInterval(nextSlide, 5000); }
  function resetAuto() { clearInterval(timer); startAuto(); }

  next?.addEventListener('click', () => { nextSlide(); resetAuto(); });
  prev?.addEventListener('click', () => { prevSlide(); resetAuto(); });
  dots.forEach(dot => dot.addEventListener('click', () => {
    show(Number(dot.dataset.slide));
    resetAuto();
  }));

  startAuto();
}

/* ---------------------------- FLASH SALE COUNTDOWN ---------------------------- */
function initCountdown() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minsEl = document.getElementById('minutes');
  const secsEl = document.getElementById('seconds');
  if (!daysEl) return;

  // Sale ends 3 days from first visit; kept stable so the timer doesn't reset on refresh
  let end = Number(localStorage.getItem('elissaSaleEnd'));
  const now = Date.now();
  if (!end || end < now) {
    end = now + 3 * 24 * 60 * 60 * 1000;
    localStorage.setItem('elissaSaleEnd', end);
  }

  function pad(n) { return String(n).padStart(2, '0'); }
  function tick() {
    const diff = Math.max(0, end - Date.now());
    daysEl.textContent  = pad(Math.floor(diff / 86400000));
    hoursEl.textContent = pad(Math.floor((diff % 86400000) / 3600000));
    minsEl.textContent  = pad(Math.floor((diff % 3600000) / 60000));
    secsEl.textContent  = pad(Math.floor((diff % 60000) / 1000));
  }

  tick();
  setInterval(tick, 1000);
}

/* ---------------------------- NEWSLETTER ---------------------------- */
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;
  const email = document.getElementById('nlEmail');
  const msg = document.getElementById('nlMessage');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const value = email.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    if (!valid) {
      msg.style.color = '#C0392B';
      msg.textContent = 'Please enter a valid email address.';
      email.classList.add('invalid');
      return;
    }
    email.classList.remove('invalid');
    msg.style.color = '';               // back to the default green from CSS
    msg.textContent = '🎉 Thanks for subscribing!';
    email.value = '';
  });
}

/* ---------------------------- INIT ---------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  renderFeatured();
  initHeroSlider();
  initCountdown();
  initNewsletter();
});