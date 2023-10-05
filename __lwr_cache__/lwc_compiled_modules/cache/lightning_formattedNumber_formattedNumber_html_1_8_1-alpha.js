import _implicitStylesheets from "./formattedNumber.css";

import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    d: api_dynamic
  } = $api;
  return [api_dynamic($cmp.formattedNumber)];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-formattedNumber_formattedNumber-host",
  shadowAttribute: "lightning-formattedNumber_formattedNumber"
};
