import _implicitStylesheets from "./primitiveFileDroppableZone.css";

import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    s: api_slot
  } = $api;
  return [api_slot("", {
    key: 0
  }, [], $slotset)];
}

export default registerTemplate(tmpl);
tmpl.slots = [""];
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-primitiveFileDroppableZone_primitiveFileDroppableZone-host",
  shadowAttribute: "lightning-primitiveFileDroppableZone_primitiveFileDroppableZone"
};
