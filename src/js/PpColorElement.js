import PpBaseElement from './PpBaseElement.js';

export default class PpColorElement extends PpBaseElement {
  get value() {
    return this.getAttribute('value');
  }

  get label() {
    return this.getAttribute('label');
  }
}
