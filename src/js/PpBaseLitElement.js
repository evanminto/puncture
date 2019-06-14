import { LitElement } from 'lit-element';

export default class PpBaseLitElement extends LitElement {
  constructor() {
    super();

    this.ppDefined = true;
    this.dispatchEvent(new CustomEvent('pp-defined'));
  }
}
