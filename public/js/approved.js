document.addEventListener('DOMContentLoaded', () => {
  const approvedItems = [
    {
      id: 4,
      name: 'Lawn Mower',
      category: 'Tools',
      description: 'Borrow approved for 3 days. Return before deadline.',
      dueIn: '2 days 5 hours',
      price: '$36 total'
    }
  ];

  const container = document.getElementById('approved-items');
  if (!container) return;

  container.innerHTML = approvedItems.map(item => `
    <article class="item-card" data-item-id="${item.id}">
      <div class="item-body">
        <div class="item-meta"><span>${item.category}</span><span>Approved</span></div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="item-price">${item.price}</div>
        <p><strong>Return countdown:</strong> ${item.dueIn}</p>
        <div class="item-actions">
          <button class="btn secondary next-btn" type="button">Next</button>
          <button class="btn primary return-btn" type="button">Return Item</button>
          <a class="btn secondary" href="chat.html">Chat</a>
        </div>
      </div>
    </article>
  `).join('');

  const nextButtons = document.querySelectorAll('.next-btn');
  nextButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.item-card');
      const title = card?.querySelector('h3')?.textContent || 'Item';
      alert(`${title}: moved to the next step for return confirmation.`);
    });
  });

  const returnButtons = document.querySelectorAll('.return-btn');
  returnButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.item-card');
      const title = card?.querySelector('h3')?.textContent || 'Item';
      button.textContent = 'Returned';
      button.disabled = true;
      button.classList.remove('primary');
      button.classList.add('secondary');
      alert(`${title} has been marked as returned.`);
    });
  });
});
