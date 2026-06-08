// ===== ELISSA ONLINE STORE — main.js =====
let cart = JSON.parse(localStorage.getItem('elissaCart')) || [];

function saveCart() { localStorage.setItem('elissaCart', JSON.stringify(cart)); }
function cartCount() { return cart.reduce((s,i)=>s+i.qty,0); }
function cartTotal() { return cart.reduce((s,i)=>s+(i.price*i.qty),0); }

function updateBadge() {
  document.querySelectorAll('.cart-count').forEach(b => {
    const c = cartCount();
    b.textContent = c;
    b.style.display = c > 0 ? 'flex' : 'none';
  });
}

function addToCart(id, name, price, emoji) {
  const ex = cart.find(i=>i.id===id);
  if (ex) ex.qty++;
  else cart.push({id, name, price, emoji, qty:1});
  saveCart(); updateBadge();
  showToast(`✓ ${name} added to cart!`);
}

function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className='toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 3000);
}

function initNav() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', ()=> nav.style.boxShadow = scrollY>40 ? '0 4px 20px rgba(0,0,0,.5)' : 'none');
  const hb = document.querySelector('.hamburger');
  const nl = document.querySelector('.nav-links');
  if (hb && nl) hb.addEventListener('click', ()=>nl.classList.toggle('open'));
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}

function initCountdown() {
  const end = Date.now() + 3*24*60*60*1000;
  function tick() {
    const d = end - Date.now();
    if (d <= 0) return;
    const h = Math.floor((d%(864e5))/(36e5));
    const m = Math.floor((d%(36e5))/(6e4));
    const s = Math.floor((d%(6e4))/1000);
    if(document.getElementById('hours')) document.getElementById('hours').textContent = String(h).padStart(2,'0');
    if(document.getElementById('minutes')) document.getElementById('minutes').textContent = String(m).padStart(2,'0');
    if(document.getElementById('seconds')) document.getElementById('seconds').textContent = String(s).padStart(2,'0');
  }
  tick(); setInterval(tick, 1000);
}

function initFilters() {
  document.querySelectorAll('.f-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.f-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.product-card').forEach(c => {
        c.style.display = (f==='all' || c.dataset.cat===f) ? 'block' : 'none';
      });
    });
  });
  const si = document.querySelector('.search-wrap input');
  if (si) si.addEventListener('input', ()=>{
    const q = si.value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(c=>{
      c.style.display = c.querySelector('h3')?.textContent.toLowerCase().includes(q) ? 'block' : 'none';
    });
  });
}

function initAnim() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.style.opacity='1';
        e.target.style.transform='translateY(0)';
      }
    });
  }, {threshold:.1});
  document.querySelectorAll('.product-card,.cat-card,.team-card,.perk,.a-box,.flag-item').forEach(el=>{
    el.style.opacity='0';
    el.style.transform='translateY(20px)';
    el.style.transition='opacity .5s ease, transform .5s ease';
    obs.observe(el);
  });
}

function initNewsletter() {
  const f = document.querySelector('.nl-form');
  if (!f) return;
  f.addEventListener('submit', e => {
    e.preventDefault();
    const inp = f.querySelector('input');
    if (inp.value) { showToast('🎉 Subscribed! Murakoze (Thank you)!'); inp.value=''; }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNav(); updateBadge(); initCountdown(); initFilters(); initAnim(); initNewsletter();
});
