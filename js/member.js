/* ==========================================================================
   ELISSA ONLINE STORE — member.js  (Member page)
   Front-end login/register SIMULATION (localStorage). Not real security —
   passwords are stored in plain text in the browser, for demo purposes only.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const USER_KEY = 'elissaUser';        // currently logged-in user
  const ACCOUNTS_KEY = 'elissaAccounts'; // all registered accounts

  /* ---------- elements ---------- */
  const authSection = document.getElementById('authSection');
  const dashboardSection = document.getElementById('dashboardSection');
  if (!authSection || !dashboardSection) return;

  const loginBox = document.getElementById('loginBox');
  const registerBox = document.getElementById('registerBox');

  /* ---------- storage helpers ---------- */
  const getUser = () => { try { return JSON.parse(localStorage.getItem(USER_KEY)); } catch (e) { return null; } };
  const setUser = (u) => localStorage.setItem(USER_KEY, JSON.stringify(u));
  const clearUser = () => localStorage.removeItem(USER_KEY);
  const getAccounts = () => { try { return JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || []; } catch (e) { return []; } };
  const saveAccounts = (a) => localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(a));
  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  /* ---------- show auth vs dashboard ---------- */
  function showAuth() {
    authSection.hidden = false;
    dashboardSection.hidden = true;
  }
  function showDashboard() {
    const user = getUser();
    if (!user) { showAuth(); return; }
    authSection.hidden = true;
    dashboardSection.hidden = false;
    populateDashboard(user);
  }

  function updateProfileDisplay(user) {
    document.getElementById('sidebarName').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('sidebarEmail').textContent = user.email;
    document.getElementById('detailName').textContent = `${user.firstName} ${user.lastName}`;
    document.getElementById('detailEmail').textContent = user.email;
    document.getElementById('detailPhone').textContent = user.phone || '—';
  }
  function populateDashboard(user) {
    updateProfileDisplay(user);
    document.getElementById('settingsFirstName').value = user.firstName;
    document.getElementById('settingsLastName').value = user.lastName;
    document.getElementById('settingsEmail').value = user.email;
    document.getElementById('settingsPhone').value = user.phone || '';
    renderDashboardCart();
    showTab('profile');
  }

  /* ---------- dashboard tabs ---------- */
  function showTab(name) {
    document.querySelectorAll('.tab-content').forEach(t => { t.hidden = true; });
    const panel = document.getElementById('tab-' + name);
    if (panel) panel.hidden = false;
    document.querySelectorAll('.menu-item').forEach(m => m.classList.toggle('active', m.dataset.tab === name));
    if (name === 'cart') renderDashboardCart();
  }
  document.querySelectorAll('.menu-item[data-tab]').forEach(item => {
    item.addEventListener('click', e => { e.preventDefault(); showTab(item.dataset.tab); });
  });

  /* ---------- dashboard cart (reuses the shared cart) ---------- */
  function renderDashboardCart() {
    const container = document.getElementById('dashboardCart');
    if (!container) return;
    const cart = getCart();

    if (!cart.length) {
      container.innerHTML = '<p class="cart-empty">Your cart is empty. <a href="products.html">Start shopping →</a></p>';
      return;
    }
    container.innerHTML = `
      ${cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <img class="cart-item-img" src="${item.image}" alt="${item.name}">
          <div class="cart-item-info">
            <h4>${item.name}</h4>
            <span class="cart-item-price">${formatRWF(item.price)}</span>
            <div class="cart-qty">
              <button data-action="minus">−</button>
              <span class="qty-num">${item.qty}</span>
              <button data-action="plus">+</button>
            </div>
          </div>
          <button class="cart-item-remove" data-action="remove">🗑</button>
        </div>`).join('')}
      <div class="cart-total-row" style="margin-top:1.2rem;">
        <span>Total</span><span>${formatRWF(cartTotal())}</span>
      </div>
      <button class="btn btn-orange" id="dashCheckout" style="margin-top:1rem;">Proceed to Checkout</button>`;

    document.getElementById('dashCheckout')?.addEventListener('click', () => openCheckout());
  }

  // qty / remove inside the dashboard cart (delegation on the stable container)
  document.getElementById('dashboardCart')?.addEventListener('click', e => {
    const itemEl = e.target.closest('.cart-item');
    if (!itemEl) return;
    const id = itemEl.dataset.id;
    const action = e.target.closest('[data-action]')?.dataset.action;
    if (action === 'plus') changeQty(id, 1);
    else if (action === 'minus') changeQty(id, -1);
    else if (action === 'remove') removeFromCart(id);
    else return;
    renderDashboardCart();
  });

  /* ---------- password eye toggles ---------- */
  document.querySelectorAll('.toggle-pw').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      if (!input) return;
      const reveal = input.type === 'password';
      input.type = reveal ? 'text' : 'password';
      btn.textContent = reveal ? '🙈' : '👁';
    });
  });

  /* ---------- switch login / register ---------- */
  document.getElementById('showRegisterLink')?.addEventListener('click', e => {
    e.preventDefault(); loginBox.hidden = true; registerBox.hidden = false;
  });
  document.getElementById('showLoginLink')?.addEventListener('click', e => {
    e.preventDefault(); registerBox.hidden = true; loginBox.hidden = false;
  });

  /* ---------- login ---------- */
  document.getElementById('loginBtn')?.addEventListener('click', () => {
    const error = document.getElementById('loginError');
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const pw = document.getElementById('loginPassword').value;
    error.textContent = '';

    if (!isValidEmail(email) || !pw) { error.textContent = 'Please enter a valid email and password.'; return; }
    const acc = getAccounts().find(a => a.email === email && a.password === pw);
    if (!acc) { error.textContent = 'Invalid email or password. New here? Create an account.'; return; }

    setUser({ firstName: acc.firstName, lastName: acc.lastName, email: acc.email, phone: acc.phone });
    showDashboard();
  });

  /* ---------- register ---------- */
  document.getElementById('registerBtn')?.addEventListener('click', () => {
    const error = document.getElementById('registerError');
    const fn = document.getElementById('regFirstName').value.trim();
    const ln = document.getElementById('regLastName').value.trim();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const phone = document.getElementById('regPhone').value.trim();
    const pw = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirm').value;
    const terms = document.getElementById('termsCheck').checked;
    error.textContent = '';

    if (!fn || !ln || !isValidEmail(email)) { error.textContent = 'Please fill in your name and a valid email.'; return; }
    if (pw.length < 6) { error.textContent = 'Password must be at least 6 characters.'; return; }
    if (pw !== confirm) { error.textContent = 'Passwords do not match.'; return; }
    if (!terms) { error.textContent = 'Please agree to the Terms and Privacy Policy.'; return; }

    const accounts = getAccounts();
    if (accounts.some(a => a.email === email)) { error.textContent = 'An account with this email already exists.'; return; }

    accounts.push({ firstName: fn, lastName: ln, email, phone, password: pw });
    saveAccounts(accounts);
    setUser({ firstName: fn, lastName: ln, email, phone });
    showDashboard();
  });

  /* ---------- logout ---------- */
  document.getElementById('logoutBtn')?.addEventListener('click', e => {
    e.preventDefault();
    clearUser();
    showAuth();
  });

  /* ---------- save settings ---------- */
  document.getElementById('saveSettingsBtn')?.addEventListener('click', () => {
    const current = getUser();
    if (!current) return;
    const oldEmail = current.email;
    const msg = document.getElementById('settingsMessage');

    const updated = {
      firstName: document.getElementById('settingsFirstName').value.trim() || current.firstName,
      lastName:  document.getElementById('settingsLastName').value.trim() || current.lastName,
      email:     document.getElementById('settingsEmail').value.trim().toLowerCase() || current.email,
      phone:     document.getElementById('settingsPhone').value.trim()
    };
    setUser(updated);

    // keep the stored account record in sync
    const accounts = getAccounts();
    const acc = accounts.find(a => a.email === oldEmail);
    if (acc) { Object.assign(acc, { firstName: updated.firstName, lastName: updated.lastName, email: updated.email, phone: updated.phone }); saveAccounts(accounts); }

    updateProfileDisplay(updated);
    msg.textContent = 'Your changes have been saved ✓';
  });

  /* ---------- start ---------- */
  if (getUser()) showDashboard();
  else showAuth();
});