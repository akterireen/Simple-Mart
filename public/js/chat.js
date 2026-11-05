document.addEventListener('DOMContentLoaded', () => {
  const chatBox = document.getElementById('chat-box');
  const form = document.getElementById('chat-form');

  if (!chatBox || !form) return;

  const initialMessages = [
    { text: 'Hi, is the drill still available?', mine: false, time: '09:42 AM' },
    { text: 'Yes, it is. You can borrow it today.', mine: true, time: '09:43 AM' },
    { text: 'Perfect, I will pick it up this evening.', mine: false, time: '09:44 AM' }
  ];

  const loadMessages = () => {
    const savedMessages = JSON.parse(localStorage.getItem('simplemart_chat') || 'null');
    return savedMessages && savedMessages.length ? savedMessages : initialMessages;
  };

  const renderMessages = () => {
    const messages = loadMessages();
    chatBox.innerHTML = messages.map(message => `
      <div class="message-wrap ${message.mine ? 'mine' : ''}">
        <div class="message ${message.mine ? 'mine' : ''}">
          ${message.text}
          <span class="message-time">${message.time}</span>
        </div>
      </div>
    `).join('');
    chatBox.scrollTop = chatBox.scrollHeight;
  };

  renderMessages();

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const text = (data.get('message') || '').toString().trim();
    if (!text) return;

    const messages = loadMessages();
    const newMessage = {
      text,
      mine: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...messages, newMessage];
    localStorage.setItem('simplemart_chat', JSON.stringify(updated));
    renderMessages();
    form.reset();
  });
});
