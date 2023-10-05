import _implicitStylesheets from "./dateLocal.css";

import _lightningInput from "lightning/input";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    c: api_custom_element
  } = $api;
  return [api_custom_element("lightning-input", _lightningInput, {
    classMap: {
      "datatable-inline-edit": true
    },
    attrs: {
      "data-inputable": "true"
    },
    props: {
      "type": "date",
      "label": $cmp.columnLabel,
      "name": "dt-inline-edit-dateLocal",
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
  hostAttribute: "lightning-primitiveDatatableIeditTypeFactory_dateLocal-host",
  shadowAttribute: "lightning-primitiveDatatableIeditTypeFactory_dateLocal"
};
