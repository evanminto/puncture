import ProjectElement from './js/ProjectElement.js';
import PatternElement from './js/PatternElement.js';
import ColorElement from './js/ColorElement.js';
import ColorsElement from './js/ColorsElement.js';
import FontStackElement from './js/FontStackElement.js';
import FontScaleElement from './js/FontScaleElement.js';
import VariantElement from './js/VariantElement.js';
import BlockElement from './js/BlockElement.js';
import SectionElement from './js/SectionElement.js';
import PageElement from './js/PageElement.js';

if (
  'customElements' in window &&
  'attachShadow' in document.createElement('div')
) {
  customElements.define('puncture-project', ProjectElement);
  customElements.define('puncture-color', ColorElement);
  customElements.define('puncture-colors', ColorsElement);
  customElements.define('puncture-font-stack', FontStackElement);
  customElements.define('puncture-font-scale', FontScaleElement);
  customElements.define('puncture-block', BlockElement);
  customElements.define('puncture-section', SectionElement);
  customElements.define('puncture-pattern', PatternElement);
  customElements.define('puncture-variant', VariantElement);
  customElements.define('puncture-page', PageElement);
}
