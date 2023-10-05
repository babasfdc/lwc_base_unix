import _implicitStylesheets from "./primitiveButton.css";

import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {} = $api;
  return [];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-primitiveButton_primitiveButton-host",
  shadowAttribute: "lightning-primitiveButton_primitiveButton"
};
