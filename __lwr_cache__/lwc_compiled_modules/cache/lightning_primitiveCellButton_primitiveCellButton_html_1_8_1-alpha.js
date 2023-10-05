import _implicitStylesheets from "./primitiveCellButton.css";

import _lightningButtonIcon from "lightning/buttonIcon";
import _lightningButton from "lightning/button";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    b: api_bind,
    c: api_custom_element
  } = $api;
  const {
    _m0,
    _m1
  } = $ctx;
  return [$cmp.isButtonIconType ? api_custom_element("lightning-button-icon", _lightningButtonIcon, {
    className: $cmp.buttonClass,
    props: {
      "variant": $cmp.variant,
      "alternativeText": $cmp.alternativeText,
      "iconName": $cmp.iconName,
      "iconClass": $cmp.iconClass,
      "disabled": $cmp.disabled,
      "name": $cmp.buttonName,
      "title": $cmp.computedTitle
    },
    key: 0,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.handleButtonClick))
    }
  }, []) : null, !$cmp.isButtonIconType ? api_custom_element("lightning-button", _lightningButton, {
    className: $cmp.buttonClass,
    props: {
      "variant": $cmp.variant,
      "label": $cmp.label,
      "iconName": $cmp.iconName,
      "iconPosition": $cmp.iconPosition,
      "disabled": $cmp.disabled,
      "name": $cmp.buttonName,
      "title": $cmp.computedTitle
    },
    key: 1,
    on: {
      "click": _m1 || ($ctx._m1 = api_bind($cmp.handleButtonClick))
    }
  }, []) : null];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-primitiveCellButton_primitiveCellButton-host",
  shadowAttribute: "lightning-primitiveCellButton_primitiveCellButton"
};
