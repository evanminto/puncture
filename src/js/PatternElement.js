import { css, html } from 'lit-element';
import BaseElement from './BaseElement.js';

export default class PatternElement extends BaseElement {
  constructor() {
    super();

    this.open = false;
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

  renderVariantLink(variant) {
    const handleClick = event => {
      event.preventDefault();
      this.selectVariant(variant);
    };

    return html`
      <a
        href=""
        class="variant-link"
        @click="${handleClick}"
        aria-current="${this.selectedVariant === variant}"
      >
        ${variant.label}
      </a>
    `;
  }

  renderVariantsList() {
    return html`
      <ul class="variants-list">
        ${this.variants.map(variant => html`
          <li>${this.renderVariantLink(variant)}</li>
        `)}
      </ul>
    `;
  }

  render() {
    return html`
      <div class="metadata">
        <h1>${this.label}</h1>
        <p>${this.description}</p>
        ${this.variants.length > 1 ? this.renderVariantsList() : ''}
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
      }

      :host([open]) {
        display: flex;
      }

      ::slotted(puncture-variant) {
        flex: 1 1 auto;
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

      .variants-list {
        list-style: none;
        padding: 0;
      }

      .variants-list > * {
        display: inline-block;
      }

      .variant-link {
        background: var(--puncture-color-control);
        color: var(--puncture-color-text-on-control);
        display: block;
        font-family: var(--puncture-font-family-control);
        padding: var(--puncture-space-xs) var(--puncture-space-sm);
        position: relative;
        text-decoration: none;
        transition:
          background var(--puncture-transition-duration) ease-in-out,
          color var(--puncture-transition-duration) ease-in-out;
      }

      .variant-link::after {
        content: '';
        display: block;
        position: absolute;
        left: var(--puncture-space-sm);
        bottom: calc(var(--puncture-space-xs) * 3 / 4);
        right: var(--puncture-space-sm);
        border-bottom: 0 solid var(--puncture-color-accent);
        transition: border var(--puncture-transition-duration) ease-in-out;
      }

      .variant-link:focus,
      .variant-link:hover {
        background: var(--puncture-color-control-2);
      }

      .variant-link[aria-current='true']::after {
        border-bottom-width: calc(var(--puncture-space-xs) / 2);
      }
    `;
  }
}
