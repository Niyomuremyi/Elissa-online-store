/* ==========================================================================
   ELISSA ONLINE STORE — products.js  (Products page)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const grid        = document.getElementById('productsGrid');
  const searchInput = document.getElementById('searchInput');
  const priceRange  = document.getElementById('priceRange');
  const priceValue  = document.getElementById('priceValue');
  const sortSelect  = document.getElementById('sortSelect');
  const resetBtn    = document.getElementById('resetFilters');
  const countEl     = document.getElementById('productCount');
  const noResults   = document.getElementById('noResults');
  if (!grid) return;

  /* ---------- ordering helpers ---------- */

  // Round-robin merge so products look mixed, not grouped by category
  function interleave(groups) {
    const result = [];
    const max = Math.max(0, ...groups.map(g => g.length));
    for (let i = 0; i < max; i++) {
      groups.forEach(g => { if (g[i]) result.push(g[i]); });
    }
    return result;
  }

  // Display order: selected category first, then the rest (or all mixed)
  function buildBaseOrder(selectedCat) {
    const byCat = {};
    Object.keys(CATEGORIES).forEach(c => { byCat[c] = PRODUCTS.filter(p => p.category === c); });

    if (selectedCat === 'all') {
      return interleave(Object.values(byCat));
    }
    const selected = byCat[selectedCat] || [];
    const rest = Object.keys(CATEGORIES)
      .filter(c => c !== selectedCat)
      .map(c => byCat[c]);
    return [...selected, ...interleave(rest)];
  }

  /* ---------- main render ---------- */
  function render() {
    const term = searchInput.value.trim().toLowerCase();
    const maxPrice = Number(priceRange.value);
    const sortVal = sortSelect.value;
    const selectedCat = document.querySelector('input[name="cat"]:checked')?.value || 'all';

    // filter by search + price
    let list = PRODUCTS.filter(p =>
      (term === '' ||
        p.name.toLowerCase().includes(term) ||
        CATEGORIES[p.category].toLowerCase().includes(term)) &&
      p.price <= maxPrice
    );

    // order
    if (sortVal === 'price-low')       list.sort((a, b) => a.price - b.price);
    else if (sortVal === 'price-high') list.sort((a, b) => b.price - a.price);
    else if (sortVal === 'rating')     list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    else {
      // default: selected category first, others after
      const order = buildBaseOrder(selectedCat).map(p => p.id);
      list.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
    }

    // render cards
    grid.innerHTML = list.map(createProductCardHTML).join('');
    wireProductGrid(grid);

    // count text + empty state
    if (list.length) {
      let text = `Showing <strong>${list.length}</strong> product${list.length > 1 ? 's' : ''}`;
      if (selectedCat !== 'all' && sortVal === 'default') {
        text += ` — <strong>${CATEGORIES[selectedCat]}</strong> first`;
      }
      countEl.innerHTML = text;
      noResults.hidden = true;
    } else {
      countEl.innerHTML = '';
      noResults.hidden = false;
    }
  }

  /* ---------- read ?cat= from the URL ---------- */
  const urlCat = new URLSearchParams(location.search).get('cat');
  if (urlCat && CATEGORIES[urlCat]) {
    const radio = document.querySelector(`input[name="cat"][value="${urlCat}"]`);
    if (radio) radio.checked = true;
  }

  /* ---------- wire the controls ---------- */
  searchInput.addEventListener('input', render);
  document.querySelectorAll('input[name="cat"]').forEach(r => r.addEventListener('change', render));
  priceRange.addEventListener('input', () => {
    priceValue.textContent = formatRWF(priceRange.value);
    render();
  });
  sortSelect.addEventListener('change', render);
  resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    document.querySelector('input[name="cat"][value="all"]').checked = true;
    priceRange.value = priceRange.max;
    priceValue.textContent = formatRWF(priceRange.value);
    sortSelect.value = 'default';
    render();
  });

  /* ---------- first paint ---------- */
  priceValue.textContent = formatRWF(priceRange.value);
  render();
});