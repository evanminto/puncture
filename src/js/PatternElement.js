import { css, html } from 'lit-element';
import BaseElement from './BaseElement.js';

export default class PatternElement extends BaseElement {
  constructor() {
    super();

    this.open = false;
    this.mode = 'ui';
    this.codeShown = false;
    this.code = '';
  }

  static get properties() {
    return {
      label: {
        type: String,
        attribute: true,
      },

      description: {
        type: String,
        attribute: true,
      },

      open: {
        type: Boolean,
        attribute: true,
        reflect: true,
      },

      mode: {
        type: String,
        attribute: true,
        reflect: true,
      },

      variants: {
        type: Array,
      },

      selectedVariant: {
        type: Object,
      },
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.variants = Array.from(this.querySelectorAll('puncture-variant'));

    if (this.variants.length === 0) {
      const variant = document.createElement('puncture-variant');
      variant.setAttribute('label', 'Default');
      variant.innerHTML = this.innerHTML;
      this.innerHTML = '';
      this.appendChild(variant);
      this.variants = Array.from(this.querySelectorAll('puncture-variant'));
    }

    this.selectedVariant = this.variants[0];
    this.variants[0].setAttribute('slot', 'selected');
  }

  selectVariant(variant) {
    this.variants.forEach(v => {
      if (variant === v) {
        v.setAttribute('slot', 'selected');
        this.selectedVariant = v;
      } else {
        v.removeAttribute('slot');
      }
    });
  }

  handleClickCodeButton() {
    if (this.mode === 'code') {
      this.mode = 'ui';
    } else{
      this.mode = 'code';
    }

    this.variants.forEach(variant => {
      variant.mode = this.mode;
    });
  }

  renderVariantButton(variant) {
    const handleClick = event => {
      event.preventDefault();
      this.selectVariant(variant);
    };

    return html`
      <button
        href=""
        class="variant-button"
        type="button"
        aria-pressed="${this.selectedVariant === variant}"
        @click="${handleClick}"
      >
        ${variant.label}
      </button>
    `;
  }

  renderVariantsList() {
    return html`
      <ul class="variants-list">
        ${this.variants.map(variant => html`
          <li>${this.renderVariantButton(variant)}</li>
        `)}
      </ul>
    `;
  }

  render() {
    return html`
      <div class="metadata">
        <h1>${this.label}</h1>
        <p>${this.description}</p>

        <div class="toggles">
          <div>
            ${this.variants.length > 1 ? this.renderVariantsList() : ''}
          </div>

          <div class="toggles__sidebar">
            <button
              type="button"
              class="code-button"
              aria-pressed="${this.mode === 'code'}"
              @click="${this.handleClickCodeButton}"
            >
              Show Code
            </button>
          </div>
        </div>
      </div>

      <slot name="selected"></slot>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: none;
        height: 100%;
        flex-direction: column;
        margin: 0 !important;
      }

      :host([open]) {
        display: flex;
      }

      ::slotted(puncture-variant) {
        flex: 1 1 auto;
      }

      button {
        background: var(--puncture-color-control);
        border: var(--puncture-border-width-sm) solid transparent;
        color: var(--puncture-color-text-on-control);
        display: block;
        font: inherit;
        font-family: var(--puncture-font-family-control);
        padding: var(--puncture-space-xs) var(--puncture-space-sm);
        position: relative;
        transition:
          background var(--puncture-transition-duration) ease-in-out,
          color var(--puncture-transition-duration) ease-in-out;
      }

      button::before {
        content: '';
        display: block;
        position: absolute;
        left: var(--puncture-space-sm);
        bottom: calc(var(--puncture-space-xs) * 3 / 4);
        right: var(--puncture-space-sm);
        border-bottom: 0 solid var(--puncture-color-accent);
        transition: border var(--puncture-transition-duration) ease-in-out;
      }

      button:focus,
      button:hover {
        background: var(--puncture-color-control-2);
      }

      button[aria-pressed='true']::before {
        border-bottom-width: calc(var(--puncture-space-xs) / 2);
      }

      .metadata {
        align-items: center;
        background: var(--puncture-color-mid);
        border-bottom: 0.0625rem solid;
        color: var(--puncture-color-text-on-mid);
        font-family: var(--puncture-font-family-default);
        justify-content: space-between;
        line-height: var(--puncture-line-height);
        padding: var(--puncture-space-md);
      }

      .metadata > * {
        margin: 0;
      }

      .metadata > * + * {
        margin-top: var(--puncture-space-md);
      }

      .metadata > h1 + p {
        margin-top: 0;
      }

      .metadata h1 {
        font-family: var(--puncture-font-family-title);
        font-size: var(--puncture-font-size-large);
      }

      .toggles {
        align-items: flex-end;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: calc(var(--puncture-space-md) * -1);
        margin-left: calc(var(--puncture-space-md) * -1);
      }

      .toggles > * {
        flex: 9999 1 auto;
        margin-left: var(--puncture-space-md);
        margin-bottom: var(--puncture-space-md);
      }

      .toggles__sidebar {
        flex-grow: 1;
      }

      .code-button[aria-pressed='true'] {
        background: var(--puncture-color-text-on-control);
        border-color: currentColor;
        color: var(--puncture-color-control);
      }

      .code-button[aria-pressed='true']::before {
        border-bottom-width: 0;
        content: '✓';
        display: inline-block;
        margin-right: var(--puncture-space-xs);
        position: static;
      }

      .variants-list {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        margin: 0 0 calc(var(--puncture-space-xs) * -1) calc(var(--puncture-space-xs) * -1);
        padding: 0;
      }

      .variants-list > * {
        display: inline-block;
        margin-bottom: var(--puncture-space-xs);
        margin-left: var(--puncture-space-xs);
      }
    `;
  }
}
