import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./menuDivider.html";
import { classSet } from 'lightning/utils';
import { normalizeString as normalize } from 'lightning/utilsPrivate';
class LightningMenuDivider extends LightningElement {
  constructor(...args) {
    super(...args);
    this._variant = 'standard';
  }
  connectedCallback() {
    this.setAttribute('role', 'separator');
  }
  get variant() {
    return this._variant;
  }
  set variant(value) {
    this._variant = normalize(value, {
      fallbackValue: 'standard',
      validValues: ['standard', 'compact']
    });
  }
  get computedClass() {
    return classSet({
      'slds-has-divider_top-space': this.variant === 'standard',
      'slds-has-divider_top': this.variant === 'compact'
    }).toString();
  }
}
_registerDecorators(LightningMenuDivider, {
  publicProps: {
    variant: {
      config: 3
    }
  },
  track: {
    _variant: 1
  }
})
export default _registerComponent(LightningMenuDivider, {
  tmpl: _tmpl
});