import _implicitStylesheets from "./date.css";

import _lightningInput from "lightning/input";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    c: api_custom_element
  } = $api;
  return [api_custom_element("lightning-input", _lightningInput, {
    attrs: {
      "data-inputable": "true"
    },
    props: {
      "type": "datetime",
      "label": $cmp.columnLabel,
      "name": "dt-inline-edit-datetime",
      "variant": "label-hidden",
      "value": $cmp.editedDateValue
    },
    key: 0
  }, [])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-primitiveDatatableIeditTypeFactory_date-host",
  shadowAttribute: "lightning-primitiveDatatableIeditTypeFactory_date"
};
