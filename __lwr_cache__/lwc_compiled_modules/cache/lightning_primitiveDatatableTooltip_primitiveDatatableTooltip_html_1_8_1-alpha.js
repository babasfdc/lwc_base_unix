import _implicitStylesheets from "./primitiveDatatableTooltip.css";

import _lightningPrimitiveIcon from "lightning/primitiveIcon";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    c: api_custom_element,
    d: api_dynamic,
    h: api_element,
    ti: api_tab_index,
    b: api_bind
  } = $api;
  const {
    _m0,
    _m1,
    _m2
  } = $ctx;
  return [api_element("button", {
    className: $cmp.computedButtonClass,
    attrs: {
      "data-trigger": "true",
      "tabindex": api_tab_index($cmp.internalTabIndex)
    },
    key: 2,
    on: {
      "mouseover": _m0 || ($ctx._m0 = api_bind($cmp.handleMouseOver)),
      "mouseout": _m1 || ($ctx._m1 = api_bind($cmp.handleMouseOut)),
      "click": _m2 || ($ctx._m2 = api_bind($cmp.handleClick))
    }
  }, [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": $cmp.computedHeaderIconName,
      "variant": $cmp.variant,
      "size": $cmp.size
    },
    key: 0
  }, []), $cmp.alternativeText ? api_element("span", {
    classMap: {
      "slds-assistive-text": true
    },
    key: 1
  }, [api_dynamic($cmp.alternativeText)]) : null])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-primitiveDatatableTooltip_primitiveDatatableTooltip-host",
  shadowAttribute: "lightning-primitiveDatatableTooltip_primitiveDatatableTooltip"
};
