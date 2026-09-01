import { register } from '../../network/auth';
import Swal from 'sweetalert2';

const Register = {
  async init() {
    this._initialListener();
  },

  _initialListener() {
    const registerForm = document.querySelector('#registerForm');
    registerForm.addEventListener(
      'submit',
      async (event) => {
        event.preventDefault();
        event.stopPropagation();

        registerForm.classList.add('was-validated');
        if (!this._validateForm()) {
          return;
        }

        await this._getRegistered();
      },
      false,
    );
  },

  _validateForm() {
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
    let isValid = true;
    
    if (!nameInput.value.trim()) {
      nameInput.classList.add('is-invalid');
      isValid = false;
    } else {
      nameInput.classList.remove('is-invalid');
    }

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

  async _getRegistered() {
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const registerBtn = document.querySelector('#registerBtn');

    // Show loading state
    const originalBtnText = registerBtn.innerHTML;
    registerBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...`;
    registerBtn.disabled = true;

    try {
      const response = await register(name, email, password);
      
      if (!response.error) {
        await Swal.fire({
          icon: 'success',
          title: 'Registrasi Berhasil',
          text: 'Silakan login menggunakan akun Anda.',
          timer: 2000,
          showConfirmButton: false,
        });

        window.location.href = '/auth/login.html';
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registrasi Gagal',
        text: error.message || 'Email mungkin sudah digunakan',
      });
    } finally {
      registerBtn.innerHTML = originalBtnText;
      registerBtn.disabled = false;
    }
  },
};

export default Register;
