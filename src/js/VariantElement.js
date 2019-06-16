import { css, html } from 'lit-element';
import BaseElement from './BaseElement.js';

function sanitizeCode(str) {
  const lines = str.split("\n").filter(l => l.match(/\S/));
  const indent = lines.reduce((i, current) => {
    const match = current.match(/^( *)/)[0];
    const indentSpaces = match.length;

    if (i.length === 0 || indentSpaces < i.length) {
      return match;
    }

    return i;
  }, '');

  const re = new RegExp(`^${indent}`, 'g');
  const removeExtraSpaces = s => s.replace(re, '');

  return lines.map(removeExtraSpaces).join("\n");
}

export default class VariantElement extends BaseElement {
  static get properties() {
    return {
      label: {
        type: String,
        attribute: true,
      },

      mode: {
        type: String,
        attribute: true,
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    const doc = document.documentElement.cloneNode(true);
    doc.querySelector('body').innerHTML = this.innerHTML;
    const base64encoded = btoa(doc.outerHTML);
    this.dataUri = `data:text/html;base64,${base64encoded}`;

    this.code = sanitizeCode(this.innerHTML);
  }

  render() {
    return html`
      <iframe src="${this.dataUri}" ?hidden="${this.mode === 'code'}"></iframe>

      <code ?hidden="${this.mode !== 'code'}">
        <pre>${this.code}</pre>
      </code>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
      }

      code {
        background: #eee;
        display: block;
        padding: var(--puncture-space-md);
      }

      pre {
        margin: 0;
      }

      code[hidden] {
        display: none;
      }

      iframe {
        border: 0;
        box-sizing: border-box;
        flex: 1 1 auto;
        position: relative;
        width: 100%;
        z-index: 0;
      }
    `;
  }
}
