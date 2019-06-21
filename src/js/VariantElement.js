import { css, html } from 'lit-element';
import pretty from 'pretty';
import BaseElement from './BaseElement.js';

function sanitizeCode(str) {
  const prettyStr = pretty(str);
  const lines = prettyStr.split("\n").filter(l => l.match(/\S/));
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

      <div class="code-wrapper" ?hidden="${this.mode !== 'code'}">
        <code>
          <pre>${this.code}</pre>
        </code>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host {
        margin: 0;
      }

      :host([mode='code']) {
        display: flex;
        flex-direction: column;
      }


      :host([mode='code']) .code-wrapper {
        flex: 1 1 auto;
      }

      code {
        background: #eee;
        box-sizing: border-box;
        display: block;
        flex: 1 1 auto;
        height: 100%;
        padding: var(--puncture-space-md);
        width: max-content;
      }

      pre {
        margin: 0;
      }

      .code-wrapper {
        display: flex;
        flex-direction: column;
        overflow: auto;
        width: 100%;
      }

      .code-wrapper[hidden] {
        display: none;
      }
    `;
  }
}
