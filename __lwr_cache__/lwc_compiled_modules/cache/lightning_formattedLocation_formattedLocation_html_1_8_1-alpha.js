import _implicitStylesheets from "./formattedLocation.css";

import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    d: api_dynamic,
    t: api_text
  } = $api;
  return [$cmp.isValid ? api_dynamic($cmp.latitude) : null, $cmp.isValid ? api_text(", ") : null, $cmp.isValid ? api_dynamic($cmp.longitude) : null];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-formattedLocation_formattedLocation-host",
  shadowAttribute: "lightning-formattedLocation_formattedLocation"
};
