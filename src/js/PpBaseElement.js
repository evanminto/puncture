export default class PpBaseElement extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
    this.ppDefined = true;
    this.dispatchEvent(new CustomEvent('pp-defined'));
  }

  connectedCallback() {
    const css = this.getCSS();

    this.root.innerHTML = `
      ${this.getHTML()}
      ${css ? `<style>${css}</style>` : ''}
    `;

    this.afterConnectedCallback();

    this.ppReady = true;
    this.dispatchEvent(new CustomEvent('pp-ready'));
  }

  afterConnectedCallback() {
    // Override in subclass.
  }

  getHTML() {
    return '';
  }

  getCSS() {
    return '';
  }
}
