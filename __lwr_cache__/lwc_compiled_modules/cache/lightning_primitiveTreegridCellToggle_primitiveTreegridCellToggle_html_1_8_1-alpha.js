import _implicitStylesheets from "./primitiveTreegridCellToggle.css";

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
    _m0
  } = $ctx;
  return [api_element("button", {
    className: $cmp.computedButtonClass,
    attrs: {
      "type": "button",
      "tabindex": api_tab_index($cmp.buttonTabIndex),
      "title": $cmp.buttonTitle
    },
    key: 2,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.handleChevronClick))
    }
  }, [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": "utility:chevronright",
      "variant": "bare",
      "svgClass": "slds-button__icon slds-button__icon_small"
    },
    key: 0
  }, []), api_element("span", {
    classMap: {
      "slds-assistive-text": true
    },
    key: 1
  }, [api_dynamic($cmp.buttonTitle)])])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-primitiveTreegridCellToggle_primitiveTreegridCellToggle-host",
  shadowAttribute: "lightning-primitiveTreegridCellToggle_primitiveTreegridCellToggle"
};
