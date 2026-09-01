import { css, html, LitElement } from 'lit';

class ProfilePhoto extends LitElement {
  static properties = {
    name: { type: String },
    imageUrl: { type: String },
  };

  static styles = css`
    .profile-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
    }

    img {
      border-radius: 50%;
      width: 80px;
      height: 80px;
      object-fit: cover;
    }

    h1 {
      margin: 0;
      font-size: 1.5rem;
    }
  `;

  constructor() {
    super();
    this.name = 'John Doe';
    this.imageUrl = '';
  }

  render() {
    return html`
      <div class="profile-header">
        <img alt="Profile Picture" src="${this.imageUrl}" />
        <c-badge fullName="${this.name}"></c-badge>
      </div>
    `;
  }
}

customElements.define('c-profile-photo', ProfilePhoto);
