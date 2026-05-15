const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const feedback = document.getElementById('feedback');
const toast = document.getElementById('toast');
const togglePassword = document.getElementById('togglePassword');

const validUsername = 'smkmandiri';
const validPassword = 'Mandiri2026';

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  setTimeout(() => {
    toast.classList.remove('visible');
  }, 2200);
}

function showFeedback(message) {
  feedback.textContent = message;
}

function validateForm() {
  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!username || !password) {
    showFeedback('Nama pengguna dan kata sandi wajib diisi.');
    return false;
  }

  if (username.toLowerCase() !== validUsername || password !== validPassword) {
    showFeedback('Nama pengguna atau kata sandi salah.');
    return false;
  }

  return true;
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  feedback.textContent = '';

  if (!validateForm()) {
    showToast('Periksa kembali data login Anda.');
    return;
  }

  showToast('Login berhasil. Mengalihkan ke halaman sekolah...');
  setTimeout(() => {
    window.location.href = 'sekolah.html';
  }, 900);
});

togglePassword.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  togglePassword.textContent = isPassword ? 'Sembunyikan' : 'Tampilkan';
});

window.addEventListener('DOMContentLoaded', () => {
  const savedUsername = localStorage.getItem('smkmandiri-username');
  if (savedUsername) {
    usernameInput.value = savedUsername;
  }

  loginForm.addEventListener('change', () => {
    if (document.getElementById('remember').checked) {
      localStorage.setItem('smkmandiri-username', usernameInput.value.trim());
    } else {
      localStorage.removeItem('smkmandiri-username');
    }
  });
});
