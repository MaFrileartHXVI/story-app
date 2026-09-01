import { LitElement, html } from 'lit';
import { allLocales } from '../localization/generated/locale-codes.js';
import { getLocale, setLocale } from '../localization/localization.js';

class LocalePicker extends LitElement {
  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <div class="locale-picker">
        ${allLocales.map((locale) => {
          return html`
            <button 
              class="locale-picker__btn ${locale === getLocale() ? 'locale-picker__btn--active' : ''}" 
              @click=${() => this.localeChanged(locale)}
            >
              ${locale.toUpperCase()}
            </button>
          `;
        })}
      </div>
    `;
  }

  localeChanged(newLocale) {
    if (newLocale !== getLocale()) {
      setLocale(newLocale);
    }
  }
}

customElements.define('locale-picker', LocalePicker);
