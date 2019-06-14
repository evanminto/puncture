import BaseElement from './BaseElement.js';

export default class ColorElement extends BaseElement {
  get value() {
    return this.getAttribute('value');
  }

  get label() {
    return this.getAttribute('label');
  }
}
