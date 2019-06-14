import { LitElement } from 'lit-element';

export default class BaseElement extends LitElement {
  constructor() {
    super();

    this.ppDefined = true;
    this.dispatchEvent(new CustomEvent('puncture-defined'));
  }
}
