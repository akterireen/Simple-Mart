function getStoredOrders() {
  try {
    return JSON.parse(localStorage.getItem('simplemart_orders') || '[]');
  } catch (error) {
    return [];
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const profileCard = document.getElementById('profile-card');
  if (!profileCard) return;

  const profile = JSON.parse(localStorage.getItem('simplemart_user') || 'null') || {
    name: 'Maria Lopez',
    community_area: 'North Block',
    email: 'maria@example.com'
  };

  if (!profile.email) {
    window.location.href = 'login.html';
    return;
  }

  const orders = getStoredOrders();

  profileCard.innerHTML = `
    <h1>Profile</h1>
    <div class="profile-header" style="display:flex; align-items:center; gap:1rem; margin-bottom:1rem;">
      <div class="avatar" style="width:90px;height:90px;border-radius:50%;background:linear-gradient(135deg,#dfeaff,#cffafe);display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:700;color:#1f52bf;">${profile.name.charAt(0).toUpperCase()}</div>
      <div>
        <h2>${profile.name}</h2>
        <p>${profile.community_area || 'Community'}</p>
        <p>${profile.email}</p>
      </div>
    </div>
    <div class="price-list">
      <div class="price-item"><span>Community</span><strong>${profile.community_area || 'Community'}</strong></div>
      <div class="price-item"><span>Orders</span><strong>${orders.length}</strong></div>
      <div class="price-item"><span>Status</span><strong>Active buyer</strong></div>
    </div>
    <div style="margin-top:1.5rem;">
      <h3>Recent orders</h3>
      ${orders.length
        ? orders.map(order => `
          <div class="price-item" style="margin-bottom:0.5rem;">
            <span>${order.item_name}</span>
            <strong>$${order.amount} • ${order.status}</strong>
          </div>
        `).join('')
        : '<p>No orders yet.</p>'}
    </div>
    <div class="item-actions" style="margin-top:1rem;">
      <button class="btn secondary" type="button" id="logout-btn">Logout</button>
    </div>
  `;

  const logoutButton = document.getElementById('logout-btn');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('simplemart_user');
      window.location.href = 'login.html';
    });
  }
});
