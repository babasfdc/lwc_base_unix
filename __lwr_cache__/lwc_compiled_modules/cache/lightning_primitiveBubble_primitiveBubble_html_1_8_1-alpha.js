import _implicitStylesheets from "./primitiveBubble.css";

import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    b: api_bind,
    h: api_element
  } = $api;
  const {
    _m0
  } = $ctx;
  return [api_element("div", {
    classMap: {
      "slds-popover__body": true
    },
    context: {
      lwc: {
        dom: "manual"
      }
    },
    key: 0,
    on: {
      "mouseleave": _m0 || ($ctx._m0 = api_bind($cmp.handleMouseLeave))
    }
  }, [])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-primitiveBubble_primitiveBubble-host",
  shadowAttribute: "lightning-primitiveBubble_primitiveBubble"
};
