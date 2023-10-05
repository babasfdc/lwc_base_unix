import _implicitStylesheets from "./formattedEmail.css";

import _lightningPrimitiveIcon from "lightning/primitiveIcon";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    c: api_custom_element,
    d: api_dynamic,
    h: api_element,
    t: api_text,
    ti: api_tab_index
  } = $api;
  return [$cmp.hasValue ? api_element("a", {
    attrs: {
      "href": $cmp.href,
      "tabindex": api_tab_index($cmp.tabIndex)
    },
    key: 2
  }, [!$cmp.hideIcon ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": "utility:email",
      "size": "x-small"
    },
    key: 0
  }, []) : null, !$cmp.hideIcon ? api_element("span", {
    classMap: {
      "slds-assistive-text": true
    },
    key: 1
  }, [api_dynamic($cmp.i18n.emailLabel)]) : null, api_text(" "), api_dynamic($cmp.computedLabel)]) : null];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-formattedEmail_formattedEmail-host",
  shadowAttribute: "lightning-formattedEmail_formattedEmail"
};
