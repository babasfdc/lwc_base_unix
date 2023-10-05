import _implicitStylesheets from "./primitiveDatatableIeditInputWrapper.css";

import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    t: api_text,
    h: api_element,
    s: api_slot
  } = $api;
  return [$cmp.required ? api_element("abbr", {
    classMap: {
      "slds-required": true,
      "slds-col": true,
      "slds-grow-none": true,
      "slds-m-right_xx-small": true
    },
    attrs: {
      "aria-hidden": "true"
    },
    key: 0
  }, [api_text("*")]) : null, api_slot("", {
    key: 1
  }, [], $slotset)];
}

export default registerTemplate(tmpl);
tmpl.slots = [""];
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-primitiveDatatableIeditInputWrapper_primitiveDatatableIeditInputWrapper-host",
  shadowAttribute: "lightning-primitiveDatatableIeditInputWrapper_primitiveDatatableIeditInputWrapper"
};
