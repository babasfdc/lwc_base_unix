import _implicitStylesheets from "./icon.css";

import _lightningPrimitiveIcon from "lightning/primitiveIcon";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    c: api_custom_element,
    d: api_dynamic,
    h: api_element
  } = $api;
  return [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": $cmp.state.iconName,
      "size": $cmp.size,
      "variant": $cmp.variant,
      "src": $cmp.state.src
    },
    key: 0
  }, []), $cmp.alternativeText ? api_element("span", {
    classMap: {
      "slds-assistive-text": true
    },
    key: 1
  }, [api_dynamic($cmp.alternativeText)]) : null];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-icon_icon-host",
  shadowAttribute: "lightning-icon_icon"
};
