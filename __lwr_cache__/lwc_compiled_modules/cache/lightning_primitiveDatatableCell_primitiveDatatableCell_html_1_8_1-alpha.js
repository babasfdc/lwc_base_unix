import _implicitStylesheets from "./primitiveDatatableCell.css";

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
  hostAttribute: "lightning-primitiveDatatableCell_primitiveDatatableCell-host",
  shadowAttribute: "lightning-primitiveDatatableCell_primitiveDatatableCell"
};
