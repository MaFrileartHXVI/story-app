import { login } from '../../network/auth';
import { setAuthToken } from '../../utils/authUtils';
import Swal from 'sweetalert2';

const Login = {
  async init() {
    this._initialListener();
  },

  _initialListener() {
    const loginForm = document.querySelector('#loginForm');
    loginForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        loginForm.classList.add('was-validated');
        if (!this._validateForm()) {
          return;
        }

        await this._getLogged();
      },
      false,
    );
  },

  _validateForm() {
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    let isValid = true;
    
    if (!emailInput.value.trim() || !emailInput.checkValidity()) {
      emailInput.classList.add('is-invalid');
      isValid = false;
    } else {
      emailInput.classList.remove('is-invalid');
    }

    if (passwordInput.value.length < 8) {
      isValid = false;
    }

    return isValid;
  },

  async _getLogged() {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const loginBtn = document.querySelector('#loginBtn');

    // Show loading state
    const originalBtnText = loginBtn.innerHTML;
    loginBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`;
    loginBtn.disabled = true;

    try {
      const response = await login(email, password);
      
      if (!response.error) {
        setAuthToken(response.loginResult.token);
        
        await Swal.fire({
          icon: 'success',
          title: 'Login Berhasil',
          text: 'Selamat datang kembali!',
          timer: 1500,
          showConfirmButton: false,
        });

        window.location.href = '/';
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Gagal',
        text: error.message || 'Email atau password salah',
      });
    } finally {
      loginBtn.innerHTML = originalBtnText;
      loginBtn.disabled = false;
    }
  },
};

export default Login;
