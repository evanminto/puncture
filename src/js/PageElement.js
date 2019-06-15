import { css, html } from 'lit-element';
import BaseElement from './BaseElement.js';

export default class PageElement extends BaseElement {
  static get properties() {
    return {
      open: {
        type: Boolean,
        attribute: true,
        reflect: true,
      },
    };
  }

  get label() {
    return this.querySelector('h1, h2, h3, h4, h5, h6').textContent;
  }

  connectedCallback() {
    super.connectedCallback();
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: none;
        padding: var(--puncture-space-md);
      }

      :host([open]) {
        display: block;
      }
    `;
  }
}
