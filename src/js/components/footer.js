class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  
  static get styles() {
    return `
      :host {
        display: block;
        background-color: #f8f9fa;
        padding: 1rem;
        text-align: center;
        border-top: 1px solid #dee2e6;
      }

      .footer-content {
        max-width: 1200px;
        margin: 0 auto;
      }

      .footer-content p {
        margin: 0;
        color: #6c757d;
      }

      .footer-content a {
        color: #007bff;
        text-decoration: none;
      }

      .footer-content a:hover {
        text-decoration: underline;
      }
    `;
  }
  
  connectedCallback() {
    this.render();
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      <style>${Footer.styles}</style>
      <footer>
        <div class="footer-content">
          <p>&copy; ${new Date().getFullYear()} Carita, by Muhammad Fauzul Hanif. All rights reserved.</p>
        </div>
      </footer>
    `;
  }
}

customElements.define('c-footer', Footer);
