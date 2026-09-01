import { LitElement, html, css } from 'lit';

class Badge extends LitElement {
  static properties = {
    fullName: { type: String },
  };

  static styles = css`
    .badge {
      display: inline-block;
      padding: 0.5rem 1rem;
      background-color: gray;
      color: white;
      font-size: 1rem;
      border-radius: 0.25rem;
      font-weight: bold;
    }
  `;

  constructor() {
    super();
    this.fullName = 'John Doe';
  }

  render() {
    return html` <div class="badge">${this.fullName}</div> `;
  }
}

customElements.define('c-badge', Badge);
