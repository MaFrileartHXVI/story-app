import { LitElement, html, css } from 'lit';
import { msg } from '@lit/localize';

class LoadingSpinner extends LitElement {
  static get properties() {
    return {
      message: { type: String },
    };
  }

  constructor() {
    super();
    this.message = 'Loading...';
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;
      }
      .spinner {
        width: 3rem;
        height: 3rem;
        border: 0.25rem solid rgba(13, 110, 253, 0.2);
        border-top-color: #0d6efd;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 1rem;
      }
      .message {
        color: #6c757d;
        font-weight: 500;
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
  }

  render() {
    return html`
      <div class="spinner"></div>
      <div class="message">${msg(this.message)}</div>
    `;
  }
}

customElements.define('loading-spinner', LoadingSpinner);
