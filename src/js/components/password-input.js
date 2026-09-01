import { LitElement, html, css } from 'lit';

class PasswordInput extends LitElement {
  static get properties() {
    return {
      value: { type: String },
      showPassword: { type: Boolean, state: true },
    };
  }

  constructor() {
    super();
    this.value = '';
    this.showPassword = false;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        position: relative;
      }
      .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
      }
      input {
        width: 100%;
        padding: 0.375rem 0.75rem;
        padding-right: 2.5rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.375rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        box-sizing: border-box;
      }
      input:focus {
        color: #212529;
        background-color: #fff;
        border-color: #86b7fe;
        outline: 0;
        box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
      }
      .toggle-btn {
        position: absolute;
        right: 0.5rem;
        background: transparent;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #6c757d;
      }
      .toggle-btn:focus {
        outline: none;
      }
      .invalid-feedback {
        display: none;
        width: 100%;
        margin-top: 0.25rem;
        font-size: 0.875em;
        color: #dc3545;
      }
      .is-invalid {
        border-color: #dc3545;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right calc(2.5rem) center;
        background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
      }
      .is-invalid ~ .invalid-feedback {
        display: block;
      }
    `;
  }

  _togglePassword() {
    this.showPassword = !this.showPassword;
  }

  _handleInput(e) {
    this.value = e.target.value;
    
    const inputEl = this.shadowRoot.querySelector('input');
    if (this.value.length < 8) {
      inputEl.classList.add('is-invalid');
      inputEl.setCustomValidity('Password harus minimal 8 karakter');
    } else {
      inputEl.classList.remove('is-invalid');
      inputEl.setCustomValidity('');
    }
  }

  render() {
    return html`
      <div class="input-wrapper">
        <input 
          type="${this.showPassword ? 'text' : 'password'}" 
          .value="${this.value}"
          @input="${this._handleInput}"
          placeholder="Minimal 8 karakter"
          required
          minlength="8"
        >
        <button type="button" class="toggle-btn" @click="${this._togglePassword}">
          ${this.showPassword ? html`
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
              <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
              <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
            </svg>
          ` : html`
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
            </svg>
          `}
        </button>
      </div>
      <div class="invalid-feedback">
        Password harus memiliki minimal 8 karakter.
      </div>
    `;
  }
}

customElements.define('password-input', PasswordInput);
