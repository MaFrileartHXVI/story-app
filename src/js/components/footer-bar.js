import { LitElement, html, css } from 'lit';
import { msg } from '@lit/localize';

class FooterBar extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        background-color: var(--bs-primary, #4361ee);
        color: white;
        text-align: center;
        padding: 1rem 0;
        margin-top: 3rem;
      }
      p {
        margin: 0;
        font-size: 0.9rem;
      }
    `;
  }

  render() {
    return html`
      <footer>
        <p>&copy; 2026 ${msg('Story App')}. All rights reserved.</p>
      </footer>
    `;
  }
}

customElements.define('footer-bar', FooterBar);
