import { css, html } from 'lit-element';
import BaseElement from './BaseElement.js';

export default class BlockElement extends BaseElement {
  render() {
    return html`<div class="wrapper"><span><slot></slot></span></div>`
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .wrapper {
        align-items: center;
        background: #eee;
        border: 0.0625rem solid;
        color: var(--puncture-color-mid);
        display: flex;
        height: 7.5em;
        justify-content: center;
        padding: var(--puncture-space-md);
      }
    `;
  }
}
