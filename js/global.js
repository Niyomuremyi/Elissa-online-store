/* ==========================================================================
   ELISSA ONLINE STORE — global.js
   Shared engine: product catalog, cart, wishlist, drawer, quick-view,
   checkout, card builder, hamburger, toast. Loaded on every page.
   ========================================================================== */

/* ============================ PRODUCT CATALOG ============================ */
/* Folder for "home" category is images/home&living/ (the & is fine in a path) */
const CATEGORIES = {
  accessories: "Accessories",
  beauty: "Beauty",
  clothing: "Clothing",
  electronics: "Electronics",
  footwear: "Footwear",
  home: "Home & Living",
};

const PRODUCTS = [
  // ---- ACCESSORIES ----
  {
    id: "a1",
    name: "Lipstick",
    category: "accessories",
    image: "images/accessories/lipstick.webp",
    price: 12000,
    oldPrice: 18000,
    rating: 4,
    reviews: 45,
    badge: "NEW",
    badgeClass: "badge-green",
    desc: "A long-lasting, richly pigmented lipstick for a bold, beautiful finish.",
  },
  {
    id: "a2",
    name: "Necklace",
    category: "accessories",
    image: "images/accessories/necklace.jpg",
    price: 45000,
    oldPrice: 70000,
    rating: 5,
    reviews: 78,
    badge: "",
    badgeClass: "",
    desc: "An elegant gold-tone necklace that adds shine to any outfit.",
  },
  {
    id: "a3",
    name: "Ring",
    category: "accessories",
    image: "images/accessories/ring.avif",
    price: 30000,
    oldPrice: 55000,
    rating: 4,
    reviews: 32,
    badge: "SALE",
    badgeClass: "badge-green",
    desc: "A sparkling statement ring crafted for special occasions.",
  },
  {
    id: "a4",
    name: "Wallet",
    category: "accessories",
    image: "images/accessories/wallet.avif",
    price: 25000,
    oldPrice: 40000,
    rating: 4,
    reviews: 61,
    badge: "",
    badgeClass: "",
    desc: "A slim leather wallet with plenty of room for cards and cash.",
  },
  {
    id: "a5",
    name: "Watch",
    category: "accessories",
    image: "images/accessories/watch.jpg",
    price: 120000,
    oldPrice: 180000,
    rating: 5,
    reviews: 203,
    badge: "🔥 HOT",
    badgeClass: "",
    desc: "A classic timepiece combining timeless style with reliable accuracy.",
  },

  // ---- BEAUTY ----
  {
    id: "b1",
    name: "Face Cream",
    category: "beauty",
    image: "images/beauty/facecream.avif",
    price: 28000,
    oldPrice: 45000,
    rating: 4,
    reviews: 54,
    badge: "",
    badgeClass: "",
    desc: "A hydrating face cream that leaves your skin soft and glowing.",
  },
  {
    id: "b2",
    name: "Face Makeup",
    category: "beauty",
    image: "images/beauty/facemakeup.jpg",
    price: 35000,
    oldPrice: 50000,
    rating: 4,
    reviews: 67,
    badge: "NEW",
    badgeClass: "badge-green",
    desc: "A smooth makeup set for a flawless, natural-looking complexion.",
  },
  {
    id: "b3",
    name: "Foundation",
    category: "beauty",
    image: "images/beauty/foundation.webp",
    price: 22000,
    oldPrice: 32000,
    rating: 5,
    reviews: 89,
    badge: "",
    badgeClass: "",
    desc: "A buildable foundation with all-day coverage and a matte finish.",
  },
  {
    id: "b4",
    name: "Perfume",
    category: "beauty",
    image: "images/beauty/perfume.jpg",
    price: 45000,
    oldPrice: 65000,
    rating: 5,
    reviews: 120,
    badge: "🔥 HOT",
    badgeClass: "",
    desc: "A luxurious long-lasting fragrance with warm, elegant notes.",
  },
  {
    id: "b5",
    name: "Shampoo",
    category: "beauty",
    image: "images/beauty/shampoo.avif",
    price: 15000,
    oldPrice: 22000,
    rating: 4,
    reviews: 73,
    badge: "",
    badgeClass: "",
    desc: "A gentle nourishing shampoo for healthy, shiny hair.",
  },

  // ---- CLOTHING ----
  {
    id: "c1",
    name: "Blazer",
    category: "clothing",
    image: "images/clothing/blazer.jpg",
    price: 75000,
    oldPrice: 110000,
    rating: 5,
    reviews: 56,
    badge: "🔥 HOT",
    badgeClass: "",
    desc: "A tailored blazer that brings sharp style to any wardrobe.",
  },
  {
    id: "c2",
    name: "Coat",
    category: "clothing",
    image: "images/clothing/coat.avif",
    price: 95000,
    oldPrice: 140000,
    rating: 5,
    reviews: 41,
    badge: "",
    badgeClass: "",
    desc: "A warm, well-cut coat designed to keep you cosy and stylish.",
  },
  {
    id: "c3",
    name: "Hoodie",
    category: "clothing",
    image: "images/clothing/hoodie.jpg",
    price: 40000,
    oldPrice: 60000,
    rating: 4,
    reviews: 98,
    badge: "NEW",
    badgeClass: "badge-green",
    desc: "A soft, comfortable hoodie perfect for everyday wear.",
  },
  {
    id: "c4",
    name: "Shirt",
    category: "clothing",
    image: "images/clothing/shirt.webp",
    price: 30000,
    oldPrice: 45000,
    rating: 4,
    reviews: 64,
    badge: "",
    badgeClass: "",
    desc: "A crisp, breathable shirt suitable for work or casual outings.",
  },
  {
    id: "c5",
    name: "T-Shirt",
    category: "clothing",
    image: "images/clothing/tshirt.avif",
    price: 18000,
    oldPrice: 28000,
    rating: 4,
    reviews: 132,
    badge: "",
    badgeClass: "",
    desc: "A classic cotton t-shirt that pairs with everything.",
  },

  // ---- ELECTRONICS ----
  {
    id: "e1",
    name: "Headphone",
    category: "electronics",
    image: "images/electronics/headphone.jpg",
    price: 89000,
    oldPrice: 129000,
    rating: 5,
    reviews: 128,
    badge: "🔥 HOT",
    badgeClass: "",
    desc: "Premium wireless headphones with deep bass and clear sound.",
  },
  {
    id: "e2",
    name: "Lenovo Laptop",
    category: "electronics",
    image: "images/electronics/lenovo.webp",
    price: 650000,
    oldPrice: 780000,
    rating: 5,
    reviews: 64,
    badge: "",
    badgeClass: "",
    desc: "A powerful, lightweight laptop built for work and study.",
  },
  {
    id: "e3",
    name: "Mouse",
    category: "electronics",
    image: "images/electronics/mouse.jpg",
    price: 15000,
    oldPrice: 25000,
    rating: 4,
    reviews: 210,
    badge: "SALE",
    badgeClass: "badge-green",
    desc: "A responsive wireless mouse with comfortable, ergonomic design.",
  },
  {
    id: "e4",
    name: "Power Bank",
    category: "electronics",
    image: "images/electronics/powerbank.webp",
    price: 35000,
    oldPrice: 50000,
    rating: 4,
    reviews: 156,
    badge: "",
    badgeClass: "",
    desc: "A high-capacity power bank to keep your devices charged on the go.",
  },
  {
    id: "e5",
    name: "Samsung Phone",
    category: "electronics",
    image: "images/electronics/samsung.webp",
    price: 280000,
    oldPrice: 350000,
    rating: 5,
    reviews: 312,
    badge: "🔥 HOT",
    badgeClass: "",
    desc: "A sleek smartphone with a stunning display and a powerful camera.",
  },

  // ---- FOOTWEAR ----
  {
    id: "f1",
    name: "Boots",
    category: "footwear",
    image: "images/footwear/boots.jpg",
    price: 65000,
    oldPrice: 95000,
    rating: 5,
    reviews: 87,
    badge: "",
    badgeClass: "",
    desc: "Durable, stylish boots ready for any season.",
  },
  {
    id: "f2",
    name: "Elegant Heels",
    category: "footwear",
    image: "images/footwear/elegant-heels.avif",
    price: 59000,
    oldPrice: 89000,
    rating: 5,
    reviews: 84,
    badge: "NEW",
    badgeClass: "badge-green",
    desc: "Graceful heels that elevate any evening look.",
  },
  {
    id: "f3",
    name: "Sandals",
    category: "footwear",
    image: "images/footwear/sandals.webp",
    price: 30000,
    oldPrice: 50000,
    rating: 4,
    reviews: 112,
    badge: "SALE",
    badgeClass: "badge-green",
    desc: "Light, comfortable sandals for warm sunny days.",
  },
  {
    id: "f4",
    name: "Shoes",
    category: "footwear",
    image: "images/footwear/shoes.webp",
    price: 75000,
    oldPrice: 110000,
    rating: 5,
    reviews: 198,
    badge: "🔥 HOT",
    badgeClass: "",
    desc: "Versatile sport shoes with great support and grip.",
  },
  {
    id: "f5",
    name: "Slippers",
    category: "footwear",
    image: "images/footwear/slippers.jpg",
    price: 15000,
    oldPrice: 25000,
    rating: 4,
    reviews: 76,
    badge: "",
    badgeClass: "",
    desc: "Soft cushioned slippers for cosy relaxation at home.",
  },

  // ---- HOME & LIVING ----
  {
    id: "h1",
    name: "Blanket",
    category: "home",
    image: "images/home&living/blanket.jpg",
    price: 35000,
    oldPrice: 55000,
    rating: 4,
    reviews: 54,
    badge: "",
    badgeClass: "",
    desc: "A warm, ultra-soft blanket for cosy nights in.",
  },
  {
    id: "h2",
    name: "Chair",
    category: "home",
    image: "images/home&living/chair.jpg",
    price: 150000,
    oldPrice: 220000,
    rating: 5,
    reviews: 43,
    badge: "🔥 HOT",
    badgeClass: "",
    desc: "A comfortable, modern chair that fits any living space.",
  },
  {
    id: "h3",
    name: "Lamp",
    category: "home",
    image: "images/home&living/lamp.jpg",
    price: 45000,
    oldPrice: 70000,
    rating: 4,
    reviews: 38,
    badge: "NEW",
    badgeClass: "badge-green",
    desc: "A decorative lamp that adds warm light and character to a room.",
  },
  {
    id: "h4",
    name: "Pillow",
    category: "home",
    image: "images/home&living/pillow.jpg",
    price: 20000,
    oldPrice: 35000,
    rating: 4,
    reviews: 92,
    badge: "",
    badgeClass: "",
    desc: "A plush, supportive pillow set for a restful sleep.",
  },
  {
    id: "h5",
    name: "Utensils",
    category: "home",
    image: "images/home&living/utensils.jpg",
    price: 55000,
    oldPrice: 80000,
    rating: 5,
    reviews: 67,
    badge: "SALE",
    badgeClass: "badge-green",
    desc: "A complete kitchen utensils set for every home cook.",
  },
];

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

/* ============================ HELPERS ============================ */
function formatRWF(amount) {
  return "RWF " + Number(amount).toLocaleString("en-US");
}
function renderStars(rating) {
  const full = Math.round(rating);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

/* ============================ CART ============================ */
const CART_KEY = "elissaCart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
  renderCartDrawer();
}
function addToCart(id) {
  const product = getProductById(id);
  if (!product) return;
  const cart = getCart();
  const existing = cart.find((i) => i.id === id);
  if (existing) existing.qty += 1;
  else
    cart.push({
      id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1,
    });
  saveCart(cart);
  showToast(`${product.name} added to cart`);
}
function removeFromCart(id) {
  saveCart(getCart().filter((i) => i.id !== id));
}
function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else saveCart(cart);
}
function cartTotal() {
  return getCart().reduce((s, i) => s + i.price * i.qty, 0);
}
function cartCount() {
  return getCart().reduce((s, i) => s + i.qty, 0);
}
function updateCartCount() {
  const c = cartCount();
  document.querySelectorAll(".cart-count").forEach((el) => {
    el.textContent = c;
  });
}

/* ============================ WISHLIST ============================ */
const WISH_KEY = "elissaWishlist";
function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISH_KEY)) || [];
  } catch (e) {
    return [];
  }
}
function isWished(id) {
  return getWishlist().includes(id);
}
function toggleWishlist(id) {
  const list = getWishlist();
  const i = list.indexOf(id);
  if (i === -1) {
    list.push(id);
    showToast("Added to wishlist ❤️");
  } else {
    list.splice(i, 1);
    showToast("Removed from wishlist");
  }
  localStorage.setItem(WISH_KEY, JSON.stringify(list));
}

/* ============================ PRODUCT CARD BUILDER ============================ */
function createProductCardHTML(p) {
  return `
    <div class="product-card" data-id="${p.id}">
      <div class="prod-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        ${p.badge ? `<span class="badge ${p.badgeClass}">${p.badge}</span>` : ""}
        <button class="wishlist-btn ${isWished(p.id) ? "active" : ""}" data-action="wish" aria-label="Toggle wishlist">${isWished(p.id) ? "❤️" : "🤍"}</button>
        <button class="quick-view-btn" data-action="quick">Quick View</button>
      </div>
      <div class="prod-info">
        <h3>${p.name}</h3>
        <div class="rating">${renderStars(p.rating)} (${p.reviews})</div>
        <div class="price-row">
          <span class="price-now">${formatRWF(p.price)}</span>
          ${p.oldPrice ? `<span class="price-old">${formatRWF(p.oldPrice)}</span>` : ""}
        </div>
        <button class="btn btn-orange" data-action="add">Add to Cart</button>
      </div>
    </div>`;
}

/* Wire one grid of cards (click handling via delegation) */
function wireProductGrid(grid) {
  if (!grid) return;
  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    if (!card) return;
    const id = card.dataset.id;
    const actionEl = e.target.closest("[data-action]");
    if (!actionEl) return;
    const action = actionEl.dataset.action;

    if (action === "add") {
      addToCart(id);
      openCart();
    } else if (action === "quick") openQuickView(id);
    else if (action === "wish") {
      toggleWishlist(id);
      const wished = isWished(id);
      actionEl.classList.toggle("active", wished);
      actionEl.textContent = wished ? "❤️" : "🤍";
    }
  });
}

/* ============================ CART DRAWER ============================ */
function buildCartUI() {
  if (document.querySelector(".cart-drawer")) return;

  const overlay = document.createElement("div");
  overlay.className = "cart-overlay";

  const drawer = document.createElement("aside");
  drawer.className = "cart-drawer";
  drawer.innerHTML = `
    <div class="cart-drawer-header">
      <h3>Your Cart</h3>
      <button class="cart-close" aria-label="Close cart">&times;</button>
    </div>
    <div class="cart-drawer-items"></div>
    <div class="cart-drawer-footer">
      <div class="cart-total-row"><span>Total</span><span class="cart-total">RWF 0</span></div>
      <button class="btn btn-orange cart-checkout">Checkout</button>
    </div>`;

  document.body.appendChild(overlay);
  document.body.appendChild(drawer);

  overlay.addEventListener("click", closeCart);
  drawer.querySelector(".cart-close").addEventListener("click", closeCart);
  drawer
    .querySelector(".cart-checkout")
    .addEventListener("click", openCheckout);
  drawer.querySelector(".cart-drawer-items").addEventListener("click", (e) => {
    const itemEl = e.target.closest(".cart-item");
    if (!itemEl) return;
    const id = itemEl.dataset.id;
    const action = e.target.closest("[data-action]")?.dataset.action;
    if (action === "plus") changeQty(id, 1);
    else if (action === "minus") changeQty(id, -1);
    else if (action === "remove") removeFromCart(id);
  });

  renderCartDrawer();
}
function renderCartDrawer() {
  const itemsEl = document.querySelector(".cart-drawer-items");
  if (!itemsEl) return;
  const cart = getCart();

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
  } else {
    itemsEl.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-item" data-id="${item.id}">
        <img class="cart-item-img" src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <span class="cart-item-price">${formatRWF(item.price)}</span>
          <div class="cart-qty">
            <button data-action="minus" aria-label="Decrease">−</button>
            <span class="qty-num">${item.qty}</span>
            <button data-action="plus" aria-label="Increase">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-action="remove" aria-label="Remove">🗑</button>
      </div>`,
      )
      .join("");
  }
  const totalEl = document.querySelector(".cart-total");
  if (totalEl) totalEl.textContent = formatRWF(cartTotal());
}
function openCart() {
  document.querySelector(".cart-overlay")?.classList.add("open");
  document.querySelector(".cart-drawer")?.classList.add("open");
}
function closeCart() {
  document.querySelector(".cart-overlay")?.classList.remove("open");
  document.querySelector(".cart-drawer")?.classList.remove("open");
}

/* ============================ MODAL (quick-view + checkout) ============================ */
function buildModalUI() {
  if (document.querySelector(".modal-overlay")) return;
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.innerHTML = '<div class="modal"></div>';
  document.body.appendChild(overlay);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
}
function openModal(html) {
  buildModalUI();
  const overlay = document.querySelector(".modal-overlay");
  overlay.querySelector(".modal").innerHTML = html;
  overlay.classList.add("open");
  overlay.querySelector(".modal-close")?.addEventListener("click", closeModal);
}
function closeModal() {
  document.querySelector(".modal-overlay")?.classList.remove("open");
}

function openQuickView(id) {
  const p = getProductById(id);
  if (!p) return;
  openModal(`
    <button class="modal-close" aria-label="Close">&times;</button>
    <div class="qv-grid">
      <div class="qv-image"><img src="${p.image}" alt="${p.name}"></div>
      <div class="qv-info">
        <span class="qv-cat">${CATEGORIES[p.category]}</span>
        <h2 class="qv-name">${p.name}</h2>
        <div class="rating">${renderStars(p.rating)} (${p.reviews})</div>
        <div class="price-row">
          <span class="price-now">${formatRWF(p.price)}</span>
          ${p.oldPrice ? `<span class="price-old">${formatRWF(p.oldPrice)}</span>` : ""}
        </div>
        <p class="qv-desc">${p.desc}</p>
        <button class="btn btn-orange" id="qvAdd">Add to Cart</button>
      </div>
    </div>`);
  document.getElementById("qvAdd")?.addEventListener("click", () => {
    addToCart(id);
    closeModal();
    openCart();
  });
}

function openCheckout() {
  const cart = getCart();
  if (cart.length === 0) {
    showToast("Your cart is empty");
    return;
  }

  const rows = cart
    .map(
      (i) =>
        `<div class="checkout-row"><span>${i.name} × ${i.qty}</span><span>${formatRWF(i.price * i.qty)}</span></div>`,
    )
    .join("");

  closeCart();
  openModal(`
    <button class="modal-close" aria-label="Close">&times;</button>
    <h2>Checkout</h2>
    <div class="checkout-items">${rows}</div>
    <div class="checkout-total-row"><span>Total</span><span>${formatRWF(cartTotal())}</span></div>
    <form class="checkout-form" id="checkoutForm" novalidate>
      <div class="form-group"><label>Full Name *</label><input type="text" id="coName" placeholder="Your name"></div>
      <div class="form-group"><label>Phone *</label><input type="tel" id="coPhone" placeholder="+250 788 000 000"></div>
      <div class="form-group"><label>Delivery Address *</label><input type="text" id="coAddress" placeholder="Street, city"></div>
      <div class="form-group"><label>Payment Method</label>
        <select id="coPay">
          <option>MTN Mobile Money</option>
          <option>Airtel Money</option>
          <option>Cash on Delivery</option>
        </select>
      </div>
      <button type="submit" class="btn btn-orange cart-checkout">Place Order</button>
      <p class="auth-error" id="coError"></p>
    </form>`);

  document.getElementById("checkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("coName").value.trim();
    const phone = document.getElementById("coPhone").value.trim();
    const address = document.getElementById("coAddress").value.trim();
    if (!name || !phone || !address) {
      document.getElementById("coError").textContent =
        "Please fill in all required fields.";
      return;
    }
    localStorage.removeItem(CART_KEY);
    updateCartCount();
    renderCartDrawer();
    const overlay = document.querySelector(".modal-overlay");
    overlay.querySelector(".modal").innerHTML =
      `<button class="modal-close" aria-label="Close">&times;</button>
       <div class="checkout-success">✅ Thank you, ${name}!<br>Your order has been placed successfully.</div>`;
    overlay.querySelector(".modal-close").addEventListener("click", closeModal);
  });
}

/* ============================ TOAST ============================ */
let toastTimer;
function showToast(message) {
  let toast = document.getElementById("elissaToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "elissaToast";
    toast.style.cssText =
      "position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(20px);" +
      "background:#23262B;color:#fff;font-family:'Inter',sans-serif;font-size:.95rem;" +
      "padding:.9rem 1.5rem;border-radius:50px;box-shadow:0 10px 30px rgba(0,0,0,.25);" +
      "z-index:9999;opacity:0;transition:opacity .3s,transform .3s;pointer-events:none;max-width:90vw;text-align:center;";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(20px)";
  }, 2200);
}

/* ============================ HAMBURGER ============================ */
function initHamburger() {
  const burger = document.querySelector(".hamburger");
  const links = document.querySelector(".nav-links");
  if (!burger || !links) return;
  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    links.classList.toggle("open");
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      burger.classList.remove("open");
      links.classList.remove("open");
    }),
  );
}

/* ============================ INIT ============================ */
function initCartButton() {
  const btn = document.getElementById("cartBtn");
  if (!btn) return;
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    openCart();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  initHamburger();
  buildCartUI();
  initCartButton();
});
