function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('simplemart_user') || 'null');
  } catch (error) {
    return null;
  }
}

function setStoredUser(user) {
  localStorage.setItem('simplemart_user', JSON.stringify(user));
}

function isLoggedIn() {
  return !!getStoredUser();
}

function requireLogin(redirect = 'login.html') {
  if (!isLoggedIn()) {
    window.location.href = redirect;
    return false;
  }
  return true;
}

function showAuthMessage(message, isError = false) {
  const existing = document.querySelector('.auth-message');
  if (existing) existing.remove();

  const alert = document.createElement('div');
  alert.className = `auth-message ${isError ? 'error' : 'success'}`;
  alert.textContent = message;
  alert.style.marginTop = '1rem';
  alert.style.padding = '0.8rem 1rem';
  alert.style.borderRadius = '10px';
  alert.style.background = isError ? '#fee2e2' : '#dcfce7';
  alert.style.color = isError ? '#991b1b' : '#166534';
  const form = document.querySelector('form');
  if (form) form.appendChild(alert);
}

function submitAuth(action, payload, successRedirect = 'index.html') {
  fetch('api/auth.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, ...payload })
  })
    .then(async (response) => {
      const result = await response.json().catch(() => ({ success: false, message: 'Request failed.' }));
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Authentication failed.');
      }
      return result;
    })
    .then((result) => {
      setStoredUser(result.user);
      showAuthMessage(result.message || 'Success');
      setTimeout(() => {
        window.location.href = successRedirect;
      }, 400);
    })
    .catch((error) => {
      const fallbackUser = {
        id: Date.now(),
        name: payload.name || 'Guest User',
        email: payload.email,
        community_area: payload.community_area || 'Community'
      };

      if (action === 'register') {
        setStoredUser(fallbackUser);
        showAuthMessage('Demo registration complete. SQL backend can be connected later.', false);
        setTimeout(() => {
          window.location.href = successRedirect;
        }, 400);
        return;
      }

      const existing = getStoredUser();
      if (existing && existing.email === payload.email) {
        setStoredUser(existing);
        showAuthMessage('Demo login successful.', false);
        setTimeout(() => {
          window.location.href = successRedirect;
        }, 400);
        return;
      }

      showAuthMessage(error.message || 'Login failed. Please try again.', true);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(loginForm);
      submitAuth('login', {
        email: formData.get('email')?.toString().trim(),
        password: formData.get('password')?.toString().trim(),
      }, 'index.html');
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(registerForm);
      submitAuth('register', {
        name: formData.get('name')?.toString().trim(),
        email: formData.get('email')?.toString().trim(),
        password: formData.get('password')?.toString().trim(),
        community_area: formData.get('community_area')?.toString().trim(),
      }, 'index.html');
    });
  }
});
