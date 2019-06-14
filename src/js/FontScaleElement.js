import { html, css } from 'lit-element';
import BaseElement from './BaseElement.js';
import { space as spaceSeparatorConverter } from './SeparatorConverter.js';

export default class FontScaleElement extends BaseElement {
  static get properties() {
    return {
      sizes: {
        type: Array,
        reflect: true,
        converter: spaceSeparatorConverter.toObj(),
      }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      * + * {
        margin-top: var(--puncture-space-md);
      }

      p {
        font-size: var(--size);
      }
    `;
  }

  constructor() {
    super();

    this.sizes = [];
  }

  render() {
    return html`
      ${this.sizes.map(size => html`<p style="--size: ${size}">${size}</p>`)}
    `;
  }
}
