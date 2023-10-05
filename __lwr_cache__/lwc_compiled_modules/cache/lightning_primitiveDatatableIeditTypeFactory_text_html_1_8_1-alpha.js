import _implicitStylesheets from "./text.css";

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
      "required": $cmp.required,
      "label": $cmp.columnLabel,
      "name": "dt-inline-edit-text",
      "variant": "label-hidden",
      "value": $cmp.editedValue
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
  hostAttribute: "lightning-primitiveDatatableIeditTypeFactory_text-host",
  shadowAttribute: "lightning-primitiveDatatableIeditTypeFactory_text"
};
