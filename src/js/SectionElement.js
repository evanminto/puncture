import { css, html } from 'lit-element';
import BaseElement from './BaseElement';

export default class SectionElement extends BaseElement {
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

    this.patterns = Array.from(this.querySelectorAll('puncture-pattern'));
  }

  render() {
    return html`<slot></slot>`;
  }

  static get styles() {
    return css`
      :host {
        display: none;
        height: 100%;
        margin: 0 !important;
      }

      :host([open]) {
        display: block;
      }
    `;
  }
}
