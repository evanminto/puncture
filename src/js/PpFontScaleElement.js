import { html, css } from 'lit-element';
import PpBaseLitElement from './PpBaseLitElement.js';
import { space as spaceSeparatorConverter } from './SeparatorConverter.js';

export default class PpFontScaleElement extends PpBaseLitElement {
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
        margin-top: var(--pp-space-md);
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
