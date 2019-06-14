import { css, html } from 'lit-element';
import PpBaseLitElement from './PpBaseLitElement';

export default class PpSectionElement extends PpBaseLitElement {
  static get properties() {
    return {
      label: {
        type: String,
        attribute: true,
      },

      patterns: {
        type: Array,
      },

      open: {
        type: Boolean,
        attribute: true,
        reflect: true,
      },
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.patterns = Array.from(this.querySelectorAll('pp-pattern'));
  }

  static get styles() {
    return css`
      :host {
        display: none;
        height: 100%;
      }

      :host([open]) {
        display: block;
      }
    `;
  }

  render() {
    return html`<slot></slot>`;
  }
}
