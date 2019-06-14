import { css, html } from 'lit-element';
import BaseElement from './BaseElement.js';

export default class ProjectElement extends BaseElement {
  static get properties() {
    return {
      label: {
        type: String,
        attribute: true,
      },

      sections: {
        type: Array,
      },

      patterns: {
        type: Array,
      },

      selectedPattern: {
        type: Object,
      },

      navShown: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super();

    if (this.navShown === undefined) {
      const lsValue = localStorage.getItem('puncture-nav-shown');
      this.navShown = lsValue === null ? false : (lsValue === 'true');
    }

    this.label = this.label || 'Pattern Punch';
  }

  connectedCallback() {
    super.connectedCallback();

    this.sections = Array.from(this.querySelectorAll('puncture-section'));
    this.patterns = Array.from(this.querySelectorAll('puncture-pattern'));

    const searchParams = new URL(location).searchParams;
    const selectedPattern = this.getPatternByLabel(searchParams.get('pattern'));

    this.openPattern(selectedPattern);

    window.addEventListener('popstate', event => {
      if (event.state) {
        this.openPattern(this.getPatternByLabel(event.state.patternLabel));
      }
    });
  }

  getPatternByLabel(label) {
    return this.querySelector(`puncture-pattern[label='${label}']`);
  }

  openPattern(pattern) {
    if (!pattern) {
      return;
    }

    const section = pattern.closest('puncture-section');

    this.sections.forEach(s => {
      s.open = (s === section);
    });

    this.patterns.forEach(p => {
      p.open = (p === pattern);
    });
  }

  renderNavPattern(section, pattern) {
    const handleClick = event => {
      event.preventDefault();

      this.sections.forEach(s => {
        s.open = (s === section);
      });

      this.patterns.forEach(p => {
        p.open = (p === pattern);

        if (p.open) {
          window.history.pushState(
            {
              sectionLabel: section.label,
              patternLabel: pattern.label,
            },
            document.title,
            `${location.pathname}?pattern=${p.label}`
          );
        }
      });
    };

    return html`<a href="" @click="${handleClick}">${pattern.label}</a>`;
  }

  renderNavSection(section) {
    const hasPatterns = section.patterns.length > 0;

    return html`
      <details>
        <summary>${section.label}</summary>

        ${hasPatterns ? html`
          <ul>
            ${section.patterns.map(pattern => html`
              <li>${this.renderNavPattern(section, pattern)}</li>
            `)}
          </ul>
        ` : ''}
      </details>
    `;
  }

  renderNav() {
    return html`
      <nav>
        <ul>
          ${this.sections.map(section => html`
            <li>${this.renderNavSection(section)}</li>
          `)}
        </ul>
      </nav>
    `;
  }

  renderHamburger() {
    return html`
      <svg class="svg-icon" viewBox="0 0 100 100">
        <line x1="0" y1="14" x2="100" y2="14" />
        <line x1="0" y1="50" x2="100" y2="50" />
        <line x1="0" y1="86" x2="100" y2="86" />
      </svg>
    `;
  }

  renderX() {
    return html`
      <svg class="svg-icon" viewBox="0 0 100 100">
        <line x1="14" y1="14" x2="86" y2="86" />
        <line x1="86" y1="14" x2="14" y2="86" />
      </svg>
    `;
  }

  handleNavToggle() {
    this.navShown = !this.navShown;
    localStorage.setItem('puncture-nav-shown', this.navShown ? 'true' : 'false');
  }

  render() {
    return html`
      <div class="inner">
        <header>
          <button class="nav-toggle" type="button" @click="${this.handleNavToggle}" aria-expanded="${this.navShown}">
            <span class="nav-toggle__icon" aria-hidden="true">
              ${this.navShown ? this.renderX() : this.renderHamburger()}
            </span>

            <span>${this.label}</span>
          </button>
        </header>

        ${this.navShown ? this.renderNav() : null}

        <main>
          <slot></slot>
        </main>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host {
        --puncture-color-primary: #222;
        --puncture-color-secondary: #555;
        --puncture-color-dark: black;
        --puncture-color-gray: #eee;
        --puncture-color-light: white;

        --puncture-color-text: var(--puncture-color-dark);
        --puncture-color-text-on-secondary: var(--puncture-color-light);

        --puncture-color-bg: var(--puncture-color-light);

        --puncture-space-base: 0.5rem;

        --puncture-space-sm: var(--puncture-space-base);
        --puncture-space-md: calc(var(--puncture-space-sm) * 2);
        --puncture-space-lg: calc(var(--puncture-space-md) * 2);
        --puncture-space-xl: calc(var(--puncture-space-lg) * 2);

        --puncture-max-width: 60rem;

        --puncture-font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Helvetica, Arial, system-ui, sans-serif;

        --puncture-line-height: 1.5;
        --puncture-header-height: calc(var(--puncture-line-height) * 1rem + var(--puncture-space-sm) * 2);

        color: var(--puncture-color-text);
        height: 100%;
        max-height: 100%;
      }

      nav {
        background: var(--puncture-color-gray);
        border-right: 0.0625rem solid;
        font-family: var(--puncture-font-family);
        overflow-y: auto;
      }

      nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      nav ul ul {
        background: var(--puncture-color-light);
      }

      nav summary {
        cursor: default;
        font-weight: 700;
        padding: var(--puncture-space-sm) var(--puncture-space-md);
      }

      nav a {
        color: inherit;
        display: block;
        padding: var(--puncture-space-sm) var(--puncture-space-md) var(--puncture-space-sm) var(--puncture-space-lg);
        text-decoration: none;
      }

      main {
        grid-area: auto / 1 / auto / span 2;
      }

      nav + main {
        grid-area: auto;
      }

      header {
        background: var(--puncture-color-secondary);
        box-sizing: border-box;
        color: var(--puncture-color-text-on-secondary);
        font-family: var(--puncture-font-family);
        grid-area: 1 / 1 / span 1 / span 2;
        height: 100%;
        width: 100%;
      }

      .inner {
        display: grid;
        grid-template:
          auto
          1fr
          / minmax(0, 18rem) 1fr;
        height: 100%;
      }

      .svg-icon {
        display: inline-block;
        height: 1.25em;
        stroke: currentColor;
        stroke-width: 0.5em;
        vertical-align: middle;
        width: 1.25em;
      }

      .nav-toggle {
        box-sizing: border-box;
        background: transparent;
        border: 0;
        border-right: 0.0625rem solid;
        color: inherit;
        font: inherit;
        font-weight: 700;
        margin: 0;
        max-width: 100%;
        padding: var(--puncture-space-md);
        text-align: left;
        width: 18rem;
      }

      .nav-toggle > * {
        display: inline-block;
      }

      .nav-toggle > * + * {
        margin-left: var(--puncture-space-md);
      }
    `;
  }
}