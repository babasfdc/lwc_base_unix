import _implicitStylesheets from "./formattedUrl.css";

import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    d: api_dynamic,
    ti: api_tab_index,
    b: api_bind,
    h: api_element
  } = $api;
  const {
    _m0
  } = $ctx;
  return [$cmp.hasValue ? api_element("a", {
    attrs: {
      "href": $cmp.computedUrl,
      "title": $cmp.tooltip,
      "target": $cmp.target,
      "tabindex": api_tab_index($cmp.tabIndex)
    },
    key: 0,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.handleClick))
    }
  }, [api_dynamic($cmp.computedLabel)]) : null];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-formattedUrl_formattedUrl-host",
  shadowAttribute: "lightning-formattedUrl_formattedUrl"
};
