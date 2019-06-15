import { LitElement } from 'lit-element';
import idRegistry from './idRegistry';

export default class BaseElement extends LitElement {
  constructor() {
    super();

    this.id = this.id || idRegistry.getNew();
  }
}
