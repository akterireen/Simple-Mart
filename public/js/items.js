const demoItems = [
  {
    id: 1,
    name: 'Vintage Dining Table',
    category: 'Furniture',
    mode: 'buy',
    buy_price: 240,
    hourly_price: 12,
    daily_price: 35,
    weekly_price: 180,
    description: 'Solid wood table in excellent condition.',
    photos: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=900&q=80'
    ],
    location: 'North Block',
    status: 'available'
  },
  {
    id: 2,
    name: 'Cordless Drill Set',
    category: 'Tools',
    mode: 'borrow',
    buy_price: 80,
    hourly_price: 8,
    daily_price: 25,
    weekly_price: 110,
    description: 'Great for home projects and repairs.',
    photos: [
      'https://images.unsplash.com/photo-1581147036324-c17ac5c3d7b1?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80'
    ],
    location: 'Garden Lane',
    status: 'available'
  },
  {
    id: 3,
    name: 'Portable Projector',
    category: 'Electronics',
    mode: 'rent',
    buy_price: 450,
    hourly_price: 15,
    daily_price: 45,
    weekly_price: 200,
    description: 'Perfect for movie nights and presentations.',
    photos: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80'
    ],
    location: 'Hill View',
    status: 'available'
  }
];

function buildCheckoutUrl(item, mode = item.mode) {
  const price = mode === 'buy' ? item.buy_price : mode === 'borrow' ? item.daily_price : item.weekly_price;
  return `checkout.html?id=${item.id}&mode=${mode}&price=${price}&name=${encodeURIComponent(item.name)}`;
}

function renderItems(containerId, filterMode = '') {
  const container = document.getElementById(containerId);
  if (!container) return;

  const items = filterMode
    ? demoItems.filter(item => item.mode === filterMode)
    : demoItems;

  container.innerHTML = items.map(item => {
    const primaryAction = item.mode === 'buy'
      ? `<a class="btn primary" href="${buildCheckoutUrl(item, 'buy')}">Buy</a>`
      : item.mode === 'borrow'
        ? `<a class="btn primary" href="${buildCheckoutUrl(item, 'borrow')}">Borrow</a>`
        : `<a class="btn primary" href="${buildCheckoutUrl(item, 'rent')}">Rent</a>`;

    const galleryPreview = item.photos.slice(0, 3).map((photo, index) => `
      <img src="${photo}" alt="${item.name} photo ${index + 1}" style="width: 32%; height: 70px; object-fit: cover; border-radius: 8px;" />
    `).join('');

    return `
      <article class="item-card">
        <div class="item-image">
          <img src="${item.photos[0]}" alt="${item.name}" />
        </div>
        <div class="item-body">
          <div class="item-meta">
            <span>${item.category}</span>
            <span>${item.location}</span>
          </div>
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <div style="display:flex; gap:0.35rem; margin:0.75rem 0;">${galleryPreview}</div>
          <div class="item-price">$${item.buy_price || item.daily_price || item.hourly_price}</div>
          <div class="item-actions">
            <a class="btn primary" href="item-details.html?id=${item.id}">View</a>
            ${primaryAction}
          </div>
        </div>
      </article>
    `;
  }).join('');
}
