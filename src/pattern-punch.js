import PpProjectElement from './js/PpProjectElement.js';
import PpPatternElement from './js/PpPatternElement.js';
import PpColorElement from './js/PpColorElement.js';
import PpColorsElement from './js/PpColorsElement.js';
import PpFontStackElement from './js/PpFontStackElement.js';
import PpFontScaleElement from './js/PpFontScaleElement.js';
import PpVariantElement from './js/PpVariantElement.js';
import PpBlockElement from './js/PpBlockElement.js';
import PpSectionElement from './js/PpSectionElement.js';

if (
  'customElements' in window &&
  'attachShadow' in document.createElement('div')
) {
  customElements.define('pp-project', PpProjectElement);
  customElements.define('pp-color', PpColorElement);
  customElements.define('pp-colors', PpColorsElement);
  customElements.define('pp-font-stack', PpFontStackElement);
  customElements.define('pp-font-scale', PpFontScaleElement);
  customElements.define('pp-block', PpBlockElement);
  customElements.define('pp-section', PpSectionElement);
  customElements.define('pp-pattern', PpPatternElement);
  customElements.define('pp-variant', PpVariantElement);
}
