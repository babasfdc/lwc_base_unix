import _tmpl from "./primitiveDatatableLoadingIndicator.html";
import { registerComponent as _registerComponent, LightningElement } from "lwc";
import labelLoading from '@salesforce/label/LightningDatatable.loading';
const i18n = {
  loading: labelLoading
};
class LightningPrimitiveDatatableLoadingIndicator extends LightningElement {
  get i18n() {
    return i18n;
  }
}
export default _registerComponent(LightningPrimitiveDatatableLoadingIndicator, {
  tmpl: _tmpl
});