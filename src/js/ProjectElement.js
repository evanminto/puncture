import { css, html } from 'lit-element';
import BaseElement from './BaseElement.js';

export default class ProjectElement extends BaseElement {
  static get properties() {
    return {
      label: {
        type: String,
        attribute: true,
      },

      punctureChildren: {
        type: Array,
      },

      sections: {
        type: Array,
      },

      patterns: {
        type: Array,
      },

      pages: {
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
      if (this.isMobile()) {
        this.navShown = false;
      } else {
        const lsValue = localStorage.getItem('puncture-nav-shown');
        this.navShown = lsValue === null ? false : (lsValue === 'true');
      }
    }

    this.label = this.label || 'Pattern Punch';
  }

  connectedCallback() {
    super.connectedCallback();

    this.punctureChildren = Array.from(this.querySelectorAll(':scope > puncture-section, :scope > puncture-pattern, :scope > puncture-page'));

    this.sections = Array.from(this.querySelectorAll('puncture-section'));
    this.patterns = Array.from(this.querySelectorAll('puncture-pattern'));
    this.pages = Array.from(this.querySelectorAll('puncture-page'));

    setTimeout(() => {
      const target = document.querySelector(':target');

      if (target) {
        this.openPatternOrPage(target);
      } else {
        const first = this.querySelector('puncture-pattern, puncture-page');
        this.openPatternOrPage(first);
      }
    }, 500);

    window.addEventListener('hashchange', event => {
      const target = document.querySelector(':target');
      this.openPatternOrPage(target);

      if (this.isMobile()) {
        this.navShown = false;
      }
    });
  }

  openPatternOrPage(patternOrPage) {
    if (!patternOrPage) {
      return;
    }

    const section = patternOrPage.closest('puncture-section');

    this.sections.forEach(s => {
      s.open = (s === section);
    });

    this.pages.forEach(p => {
      p.open = (p === patternOrPage)
    });

    this.patterns.forEach(p => {
      p.open = (p === patternOrPage);
    });

    this.update();
  }

  handleNavToggle() {
    this.navShown = !this.navShown;
    localStorage.setItem('puncture-nav-shown', this.navShown ? 'true' : 'false');
  }

  isMobile() {
    return !matchMedia('(min-width: 40em)').matches;
  }

  renderNavPatternOrPage(patternOrPage) {
    return html`
      <a href="${`#${patternOrPage.id}`}" aria-current="${patternOrPage.open ? 'page' : 'false'}">
        ${patternOrPage.label}
      </a>
    `;
  }

  renderNavSection(section) {
    const children = Array.from(section.querySelectorAll(':scope > puncture-pattern, :scope > puncture-page'));
    const hasChildren = children.length > 0;

    return html`
      <details ?open="${section.open}">
        <summary>${section.label}</summary>

        ${hasChildren ? html`
          <ul>
            ${children.map(child => html`
              <li>${this.renderNavChild(child)}</li>
            `)}
          </ul>
        ` : ''}
      </details>
    `;
  }

  renderNavChild(child) {
    if (child.matches('puncture-section')) {
      return this.renderNavSection(child);
    } else if (child.matches('puncture-pattern, puncture-page')) {
      return this.renderNavPatternOrPage(child);
    }
  }

  renderNav() {
    return html`
      <nav>
        <ul>
          ${this.punctureChildren.map(child => html`
            <li>${this.renderNavChild(child)}</li>
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
        --puncture-color-dark: #070707;
        --puncture-color-mid: #eee;
        --puncture-color-light: white;

        --puncture-color-dark-2: #131313;
        --puncture-color-mid-2: #e6e6e6;
        --puncture-color-light-2: #f6f6f6;

        --puncture-color-accent-light-mode: brown;
        --puncture-color-accent-2-light-mode: darkred;
        --puncture-color-accent-dark-mode: #550000;
        --puncture-color-accent-2-dark-mode: #390000;
        --puncture-color-accent: var(--puncture-color-accent-light-mode);
        --puncture-color-accent-2: var(--puncture-color-accent-2-light-mode);

        --puncture-color-bg: var(--puncture-color-light);
        --puncture-color-bg-2: var(--puncture-color-light-2);

        --puncture-color-text: var(--puncture-color-dark);
        --puncture-color-text-on-dark: var(--puncture-color-light);
        --puncture-color-text-on-mid: var(--puncture-color-dark);
        --puncture-color-text-on-light: var(--puncture-color-dark);

        --puncture-color-text-on-accent-light-mode: var(--puncture-color-light);
        --puncture-color-text-on-accent-dark-mode: var(--puncture-color-light);
        --puncture-color-text-on-accent: var(--puncture-color-text-on-accent-light-mode);

        --puncture-color-text-on-bg: var(--puncture-color-dark);

        --puncture-space-base: 0.5rem;

        --puncture-space-sm: var(--puncture-space-base);
        --puncture-space-md: calc(var(--puncture-space-sm) * 2);
        --puncture-space-lg: calc(var(--puncture-space-md) * 2);
        --puncture-space-xl: calc(var(--puncture-space-lg) * 2);

        --puncture-max-width: 60rem;

        --puncture-font-family-default: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Helvetica, Arial, system-ui, sans-serif;
        --puncture-font-family-title: var(--puncture-font-family-default);
        --puncture-font-family-control: var(--puncture-font-family-default);

        --puncture-font-scale: 1.666;
        --puncture-font-size-large: calc(1em * var(--puncture-font-scale));
        --puncture-font-size-small: calc(1em / var(--puncture-font-scale));

        --puncture-line-height: 1.5;
        --puncture-header-height: calc(var(--puncture-line-height) * 1rem + var(--puncture-space-sm) * 2);

        --puncture-transition-duration: 125ms;

        height: 100%;
        max-height: 100%;
      }

      @media (prefers-color-scheme: dark) {
        :host(:not([no-dark-mode])) {
          --puncture-color-accent: var(--puncture-color-accent-dark-mode);
          --puncture-color-accent-2: var(--puncture-color-accent-2-dark-mode);
          --puncture-color-text-on-accent: var(--puncture-color-text-on-accent-dark-mode);

          --puncture-color-mid: #2a2a2a;
          --puncture-color-mid-2: #202020;
          --puncture-color-text-on-mid: var(--puncture-color-light);

          --puncture-color-bg: var(--puncture-color-dark);
          --puncture-color-bg-2: var(--puncture-color-dark-2);
          --puncture-color-text-on-bg: var(--puncture-color-light);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        :host {
          --puncture-transition-duration: 0ms;
        }
      }

      nav {
        background: var(--puncture-color-mid);
        color: var(--puncture-color-text-on-mid);
        font-family: var(--puncture-font-family-control);
        grid-area: auto / auto / auto / span 2;
        overflow-y: auto;
      }

      nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      nav ul ul {
        background: var(--puncture-color-bg);
        color: var(--puncture-color-text-on-bg);
      }

      nav summary,
      nav a {
        transition: background var(--puncture-transition-duration) ease-in-out;
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
        transition: border var(--puncture-transition-duration) ease-in-out;
      }

      nav a[aria-current='page'] {
        border-right: 0.375rem solid;
      }

      nav summary:focus,
      nav summary:hover {
        background: var(--puncture-color-mid-2);
      }

      nav a:focus,
      nav a:hover {
        background: var(--puncture-color-mid-2);
      }

      nav ul ul a:focus,
      nav ul ul a:hover {
        background: var(--puncture-color-bg-2);
      }

      main {
        grid-area: auto / 1 / auto / span 2;
      }

      nav + main {
        display: none;
        grid-area: auto;
      }

      header {
        background: var(--puncture-color-accent);
        box-sizing: border-box;
        color: var(--puncture-color-text-on-accent);
        font-family: var(--puncture-font-family-default);
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
        font-family: var(--puncture-font-family-control);
        font-weight: 700;
        margin: 0;
        max-width: 100%;
        padding: var(--puncture-space-md);
        text-align: left;
        transition: background var(--puncture-transition-duration) ease-in-out;
      }

      .nav-toggle > * {
        display: inline-block;
      }

      .nav-toggle > * + * {
        margin-left: var(--puncture-space-md);
      }

      .nav-toggle:focus,
      .nav-toggle:hover {
        background: var(--puncture-color-accent-2);
      }

      @media screen and (min-width: 40em) {
        nav {
          border-right: 0.0625rem solid;
          grid-area: auto;
        }

        nav + main {
          display: block;
        }

        .nav-toggle {
          width: 18rem;
        }
      }
    `;
  }
}
