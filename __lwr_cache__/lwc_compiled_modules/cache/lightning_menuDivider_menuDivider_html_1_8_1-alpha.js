import _implicitStylesheets from "./menuDivider.css";

import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    h: api_element
  } = $api;
  return [api_element("div", {
    className: $cmp.computedClass,
    key: 0
  }, [])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-menuDivider_menuDivider-host",
  shadowAttribute: "lightning-menuDivider_menuDivider"
};
