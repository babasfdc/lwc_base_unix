import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./primitiveDatatableIeditInputWrapper.html";
/**
 * @TODO: This component should be removed once the issue with label is solved in SLDS or IO
 */
class LightningPrimitiveDatatableIeditInputWrapper extends LightningElement {
  constructor(...args) {
    super(...args);
    this.required = void 0;
  }
}
_registerDecorators(LightningPrimitiveDatatableIeditInputWrapper, {
  publicProps: {
    required: {
      config: 0
    }
  }
})
export default _registerComponent(LightningPrimitiveDatatableIeditInputWrapper, {
  tmpl: _tmpl
});