import { LitElement, html } from 'lit';
import { msg } from '@lit/localize';

class StoryForm extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <form class="story-form needs-validation" novalidate id="addStoryForm" @submit=${this._onSubmit}>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="photoUrl" class="story-form__label form-label">${msg('Photo')}</label>
            <input type="file" class="form-control" id="photoUrl" required accept="image/*" />
            <div class="invalid-feedback">${msg('Please select a photo.')}</div>
            <div class="mt-3">
              <img
                id="imagePreview"
                src=""
                alt="Image Preview"
                class="img-fluid d-none rounded"
                style="max-height: 250px; object-fit: cover; width: 100%;"
              />
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="description" class="story-form__label form-label">${msg('Description')}</label>
            <textarea class="form-control" id="description" rows="5" required></textarea>
            <div class="invalid-feedback">${msg('Please provide a description.')}</div>
          </div>
        </div>
        <button class="btn btn-primary w-100 mt-3" type="submit" id="submitBtn">${msg('Submit')}</button>
      </form>
    `;
  }

  firstUpdated() {
    const photoInput = this.querySelector('#photoUrl');
    const imagePreview = this.querySelector('#imagePreview');

    if (photoInput) {
      photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreview.classList.remove('d-none');
          };
          reader.readAsDataURL(file);
        } else {
          imagePreview.src = '';
          imagePreview.classList.add('d-none');
        }
      });
    }
  }

  _onSubmit(e) {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    const photo = this.querySelector('#photoUrl').files[0];
    const description = this.querySelector('#description').value;

    this.dispatchEvent(
      new CustomEvent('story-submitted', {
        detail: { photo, description },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

customElements.define('story-form', StoryForm);
