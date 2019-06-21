import { css, html } from 'lit-element';
import pretty from 'pretty';
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

  return pretty(lines.map(removeExtraSpaces).join("\n"));
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
        reflect: true,
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();

    this.code = sanitizeCode(this.innerHTML);
  }

  render() {
    return html`
      <slot ?hidden="${this.mode === 'code'}"></slot>

      <code ?hidden="${this.mode !== 'code'}">
        <pre>${this.code}</pre>
      </code>
    `;
  }

  static get styles() {
    return css`
      :host {
        margin: 0;
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
    `;
  }
}
