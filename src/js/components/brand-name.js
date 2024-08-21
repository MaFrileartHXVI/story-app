import { css, html, LitElement } from 'lit';

class BrandName extends LitElement {
  static styles = css`
    h1 {
      font-size: 2rem;
      margin: 0;
    }

    .brand-container {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .brand-title {
      font-size: 1.5rem;
      margin: 0;
    }
  `;
  
  render() {
    return html`
      <div class="brand-container">
        <div class="brand-title">Carita</div>
      </div>
    `;
  }
}

customElements.define('c-brand-name', BrandName);
