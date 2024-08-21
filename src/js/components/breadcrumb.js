import { css, html, LitElement } from 'lit';

class Breadcrumb extends LitElement {
  static properties = {
    title: { type: String },
  };
  
  static styles = css`
    .breadcrumb-container {
      display: flex;
      align-items: center;
    }

    .navbar-brand {
      font-size: 2rem;
      margin: 0;
    }
  `;
  
  constructor() {
    super();
    this.title = 'Default Title';
  }
  
  render() {
    return html`
      <div class="breadcrumb-container">
        <span class="navbar-brand h1">${this.title}</span>
      </div>
    `;
  }
}

customElements.define('c-breadcrumb', Breadcrumb);
