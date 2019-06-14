import PpBaseElement from './PpBaseElement.js';

export default class PpBlockElement extends PpBaseElement {
  getHTML() {
    return `<div class="wrapper"><span><slot></slot></span></div>`
  }

  getCSS() {
    return `
      :host {
        display: block;
      }

      .wrapper {
        align-items: center;
        background: #eee;
        border: 0.0625rem solid;
        color: var(--pp-color-gray);
        display: flex;
        height: 7.5em;
        justify-content: center;
        padding: var(--pp-space-md);
      }
    `;
  }
}
