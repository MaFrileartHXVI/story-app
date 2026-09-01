import { LitElement, html } from 'lit';

class NavBar extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div class="container">
          <a class="navbar-brand" href="/">StoryApp</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            class="offcanvas offcanvas-end text-bg-primary"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">StoryApp</h5>
              <button
                type="button"
                class="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <nav-links></nav-links>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    `;
  }
}

customElements.define('nav-bar', NavBar);
