import { html, css } from 'lit-element';
import BaseElement from './BaseElement.js';

export default class ColorsElement extends BaseElement {
  render() {
    return html`
    <ul class="colors">
      ${Array.from(this.children).map(ppColor => {
        const div = document.createElement('div');
        div.innerHTML = 'Test';
        div.style.color = ppColor.value;
        this.parentNode.appendChild(div);
        const computedStyle = window.getComputedStyle(this);
        const computedColor = computedStyle.color;
        this.parentNode.removeChild(div);

        return html`
        <li>
          <span class="swatch" style="--color: ${ppColor.value};"></span>
          <div class="label">${ppColor.label}</div>
          <div class="label label--raw">${ppColor.value}</div>
          <div class="label label--hex">${computedColor}</div>
        </li>
        `;
      })}
    </ul>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: var(--puncture-font-family-default);
        line-height: var(--puncture-line-height);
      }

      .colors {
        display: flex;
        flex-wrap: wrap;
        list-style: none !important;
        padding: 0 !important;
        margin: 0 !important;
      }

      .colors li {
        flex: auto;
        padding: 0.3em;
        margin: 0 0.5em 0.5em 0;
        min-width: 5em;
        max-width: 14em;
        border: 1px solid #ddd;
        border-radius: 8px;
      }

      .swatch {
        background: var(--color);
        display: block;
        height: 4em;
        margin-bottom: 0.3em;
        border-radius: 5px;
      }

      .label {
        font-size: 90%;
        line-height: 1;
      }
    `;
  }
}
