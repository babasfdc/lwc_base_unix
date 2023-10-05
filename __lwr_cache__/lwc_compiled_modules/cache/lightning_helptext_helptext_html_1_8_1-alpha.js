import _implicitStylesheets from "./helptext.css";

import _lightningPrimitiveIcon from "lightning/primitiveIcon";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    c: api_custom_element,
    d: api_dynamic,
    h: api_element
  } = $api;
  return [api_element("div", {
    classMap: {
      "slds-form-element__icon": true
    },
    key: 3
  }, [api_element("button", {
    classMap: {
      "slds-button": true,
      "slds-button_icon": true
    },
    attrs: {
      "type": "button"
    },
    key: 2
  }, [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "svgClass": $cmp.computedSvgClass,
      "iconName": $cmp.iconName,
      "variant": "bare"
    },
    key: 0
  }, []), api_element("span", {
    classMap: {
      "slds-assistive-text": true
    },
    key: 1
  }, [api_dynamic($cmp.i18n.buttonAlternativeText)])])])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-helptext_helptext-host",
  shadowAttribute: "lightning-helptext_helptext"
};
