document.addEventListener('DOMContentLoaded', () => {
  const itemDetailSection = document.getElementById('item-detail');

  if (!itemDetailSection) return;

  const params = new URLSearchParams(window.location.search);
  const itemId = Number(params.get('id')) || 1;

  const item = {
    id: itemId,
    name: 'Vintage e',
    category: 'Furniture',
    mode: 'buy',
    buy_price: 240,
    hourly_price: 12,
    daily_price: 35,
    weekly_price: 180,
    description: 'Solid wood table in excellent condition. Perfect for small apartments and gatherings.',
    photos: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=900&q=80'
    ],
    location: 'North Block',
    status: 'available'
  };

  const checkoutData = (mode, label, price) => `
    <a class="btn ${mode === 'buy' ? 'primary' : 'secondary'}" href="checkout.html?id=${item.id}&mode=${mode}&price=${price}&name=${encodeURIComponent(item.name)}">${label}</a>
  `;

  const galleryThumbs = item.photos.map((photo, index) => `
    <img src="${photo}" alt="${item.name} photo ${index + 1}" class="${index === 0 ? 'active' : ''}" data-index="${index}" />
  `).join('');

  itemDetailSection.innerHTML = `
    <div class="detail-grid">
      <div>
        <div class="gallery-main">
          <img id="main-gallery-image" src="${item.photos[0]}" alt="${item.name}" style="width:100%; border-radius:14px; height:440px; object-fit:cover;" />
        </div>
        <div class="gallery-thumbs">${galleryThumbs}</div>
      </div>
      <div>
        <p class="eyebrow">${item.category}</p>
        <h1>${item.name}</h1>
        <p>${item.description}</p>
        <div class="price-list">
          <div class="price-item"><span>Buy</span><strong>$${item.buy_price}</strong></div>
          <div class="price-item"><span>Hourly</span><strong>$${item.hourly_price}</strong></div>
          <div class="price-item"><span>Daily</span><strong>$${item.daily_price}</strong></div>
          <div class="price-item"><span>Weekly</span><strong>$${item.weekly_price}</strong></div>
        </div>
        <div class="item-actions">
          ${checkoutData('buy', 'Buy Now', item.buy_price)}
          ${checkoutData('borrow', 'Borrow', item.daily_price)}
          ${checkoutData('rent', 'Rent', item.weekly_price)}
        </div>
        <p><strong>Location:</strong> ${item.location}</p>
      </div>
    </div>
  `;

  const mainImage = document.getElementById('main-gallery-image');
  const thumbs = document.querySelectorAll('.gallery-thumbs img');

  thumbs.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const index = Number(thumb.dataset.index);
      mainImage.src = item.photos[index];
      thumbs.forEach((itemThumb) => itemThumb.classList.remove('active'));
      thumb.classList.add('active');
    });
  });
});
