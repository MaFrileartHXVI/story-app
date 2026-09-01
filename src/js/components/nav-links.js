import { LitElement, html } from 'lit';
import { msg } from '@lit/localize';
import { isAuthenticated, removeAuthToken } from '../utils/authUtils';
import Swal from 'sweetalert2';

class NavLinks extends LitElement {
  createRenderRoot() {
    return this;
  }

  _handleLogout(e) {
    e.preventDefault();
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Anda akan keluar dari sesi ini.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Logout!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        removeAuthToken();
        window.location.href = '/auth/login.html';
      }
    });
  }

  render() {
    return html`
      <li class="nav-item">
        <a class="nav-link" aria-current="page" href="/">${msg('Dashboard')}</a>
      </li>
      ${isAuthenticated() ? html`
        <li class="nav-item">
          <a class="nav-link" href="/stories/create.html">${msg('Add Story')}</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/profile.html">${msg('Profile')}</a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-danger fw-bold" href="#" @click=${this._handleLogout}>${msg('Logout')}</a>
        </li>
      ` : html`
        <li class="nav-item">
          <a class="nav-link text-primary fw-bold" href="/auth/login.html">Login</a>
        </li>
      `}
      <li class="nav-item ms-lg-3">
        <locale-picker></locale-picker>
      </li>
    `;
  }
}

customElements.define('nav-links', NavLinks);
