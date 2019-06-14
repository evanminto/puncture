import { css, html } from 'lit-element';
import BaseElement from './BaseElement.js';

export default class FontStackElement extends BaseElement {
  render() {
    return html`
      <p class="label">${this.getAttribute('label')}:</p>
      <p class="value">${this.getAttribute('value')}</p>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      * + * {
        margin-top: 0;
      }

      .label {
        margin-bottom: 0;
      }

      .value {
        font-size: 1.5em;
      }
    `;
  }
}
