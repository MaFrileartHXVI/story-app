import { LitElement, html, css } from 'lit';
import { msg } from '@lit/localize';
import { formatReadableDate } from '../utils/dateUtils.js';

class StoryCard extends LitElement {
  static get properties() {
    return {
      story: { type: Object },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: 'Inter', system-ui, -apple-system, sans-serif;
      }
      .story-card {
        background: linear-gradient(145deg, #ffffff, #f3f4f6);
        border-radius: 1.25rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        display: flex;
        flex-direction: column;
        height: 100%;
        border: 1px solid rgba(255, 255, 255, 0.4);
      }
      .story-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      }
      .story-card__img {
        width: 100%;
        height: 250px;
        object-fit: cover;
        border-bottom: 2px solid rgba(0,0,0,0.05);
      }
      .story-card__body {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      }
      .story-card__title {
        font-size: 1.25rem;
        font-weight: 700;
        margin: 0 0 0.75rem 0;
        color: #1e293b;
        letter-spacing: -0.025em;
      }
      .story-card__text {
        color: #475569;
        margin-bottom: 1.5rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        flex-grow: 1;
        line-height: 1.6;
      }
      .story-card__footer {
        font-size: 0.85rem;
        font-weight: 500;
        color: #94a3b8;
        margin-top: auto;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .story-card__footer::before {
        content: '';
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #3b82f6;
      }
    `;
  }

  render() {
    if (!this.story) return html``;
    return html`
      <div class="story-card">
        <img src="${this.story.photoUrl}" class="story-card__img" alt="${this.story.name}" />
        <div class="story-card__body">
          <h5 class="story-card__title">${this.story.name}</h5>
          <p class="story-card__text">${this.story.description}</p>
          <div class="story-card__footer">
            ${msg('Created at')}: ${formatReadableDate(this.story.createdAt)}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('story-card', StoryCard);
