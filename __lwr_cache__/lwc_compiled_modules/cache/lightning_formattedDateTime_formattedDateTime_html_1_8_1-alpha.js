import _implicitStylesheets from "./formattedDateTime.css";

import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    d: api_dynamic
  } = $api;
  return [api_dynamic($cmp.formattedValue)];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-formattedDateTime_formattedDateTime-host",
  shadowAttribute: "lightning-formattedDateTime_formattedDateTime"
};
