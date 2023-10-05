import _implicitStylesheets from "./inline.css";

import _lightningIcon from "lightning/icon";
import _lightningBaseComboboxFormattedText from "lightning/baseComboboxFormattedText";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    c: api_custom_element,
    h: api_element,
    d: api_dynamic
  } = $api;
  return [api_element("span", {
    classMap: {
      "slds-media__figure": true,
      "slds-listbox__option-icon": true
    },
    key: 1
  }, [$cmp.item.iconName ? api_custom_element("lightning-icon", _lightningIcon, {
    props: {
      "alternativeText": $cmp.item.iconAlternativeText,
      "iconName": $cmp.item.iconName,
      "size": "x-small"
    },
    key: 0
  }, []) : null]), api_element("span", {
    classMap: {
      "slds-media__body": true
    },
    key: 4
  }, [!$cmp.textHasParts ? api_element("span", {
    classMap: {
      "slds-truncate": true
    },
    attrs: {
      "title": $cmp.item.text
    },
    key: 2
  }, [api_dynamic($cmp.item.text)]) : null, $cmp.textHasParts ? api_custom_element("lightning-base-combobox-formatted-text", _lightningBaseComboboxFormattedText, {
    classMap: {
      "slds-truncate": true
    },
    props: {
      "text": $cmp.item.text,
      "title": $cmp.text
    },
    key: 3
  }, []) : null])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-baseComboboxItem_inline-host",
  shadowAttribute: "lightning-baseComboboxItem_inline"
};
