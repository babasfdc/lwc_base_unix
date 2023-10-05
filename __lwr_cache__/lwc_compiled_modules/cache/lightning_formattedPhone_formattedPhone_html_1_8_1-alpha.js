import _implicitStylesheets from "./formattedPhone.css";

import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    d: api_dynamic,
    ti: api_tab_index,
    h: api_element
  } = $api;
  return [$cmp.showLink ? api_element("a", {
    attrs: {
      "href": $cmp.link,
      "tabindex": api_tab_index($cmp.tabIndex)
    },
    key: 0
  }, [api_dynamic($cmp.formattedPhoneNumber)]) : null];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-formattedPhone_formattedPhone-host",
  shadowAttribute: "lightning-formattedPhone_formattedPhone"
};
