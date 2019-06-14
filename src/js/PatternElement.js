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

  render() {
    return html`
      <div class="metadata">
        <h1>${this.label}</h1>
        <p>${this.description}</p>

        ${this.variants.length > 1 ? html`
          <ul class="variants-list">
            ${this.variants.map(variant => {
              const handleClick = event => {
                event.preventDefault();

                this.variants.forEach(v => {
                  if (variant === v) {
                    v.setAttribute('slot', 'selected');
                    this.selectedVariant = v;
                  } else {
                    v.removeAttribute('slot');
                  }
                })
              };

              return html`
                <li>
                  <a
                    href=""
                    class="variant-link"
                    @click="${handleClick}"
                    aria-current="${this.selectedVariant === variant ? 'true' : 'false'}"
                  >
                    ${variant.label}
                  </a>
                </li>
              `;
            })}
          </ul>
        ` : ''}
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
        background: var(--puncture-color-gray);
        border-bottom: 0.0625rem solid;
        font-family: var(--puncture-font-family);
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

      .variants-list {
        list-style: none;
        padding: 0;
      }

      .variants-list > * {
        display: inline-block;
      }

      .variant-link {
        background: var(--puncture-color-light);
        color: inherit;
        display: block;
        padding: var(--puncture-space-sm) var(--puncture-space-md);
        text-decoration: none;
      }

      .variant-link[aria-current='true'] {
        background: var(--puncture-color-secondary);
        color: var(--puncture-color-text-on-secondary);
      }
    `;
  }
}