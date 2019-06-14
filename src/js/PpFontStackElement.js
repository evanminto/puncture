import PpBaseElement from './PpBaseElement.js';

export default class PpFontStackElement extends PpBaseElement {
  getHTML() {
    return `
      <p class="label">${this.getAttribute('label')}:</p>
      <p class="value">${this.getAttribute('value')}</p>
    `;
  }

  getCSS() {
    return `
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
        font-family: ${this.getAttribute('value')};
        font-size: 1.5em;
      }
    `;
  }
}
