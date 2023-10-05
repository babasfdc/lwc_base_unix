import _implicitStylesheets from "./button.css";

import _lightningPrimitiveIcon from "lightning/primitiveIcon";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    c: api_custom_element,
    d: api_dynamic,
    b: api_bind,
    h: api_element
  } = $api;
  const {
    _m0,
    _m1
  } = $ctx;
  return [api_element("button", {
    className: $cmp.computedButtonClass,
    attrs: {
      "name": $cmp.name,
      "accesskey": $cmp.computedAccessKey,
      "title": $cmp.computedTitle,
      "type": $cmp.normalizedType,
      "value": $cmp.value,
      "aria-label": $cmp.computedAriaLabel,
      "aria-expanded": $cmp.computedAriaExpanded,
      "aria-live": $cmp.computedAriaLive,
      "aria-atomic": $cmp.computedAriaAtomic
    },
    props: {
      "disabled": $cmp.disabled
    },
    key: 2,
    on: {
      "focus": _m0 || ($ctx._m0 = api_bind($cmp.handleButtonFocus)),
      "blur": _m1 || ($ctx._m1 = api_bind($cmp.handleButtonBlur))
    }
  }, [$cmp.showIconLeft ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": $cmp.iconName,
      "svgClass": $cmp.computedIconClass,
      "variant": "bare"
    },
    key: 0
  }, []) : null, api_dynamic($cmp.label), $cmp.showIconRight ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": $cmp.iconName,
      "svgClass": $cmp.computedIconClass,
      "variant": "bare"
    },
    key: 1
  }, []) : null])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-button_button-host",
  shadowAttribute: "lightning-button_button"
};
