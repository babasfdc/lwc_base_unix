import _implicitStylesheets from "./card.css";

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
      "size": $cmp.iconSize,
      "alternativeText": $cmp.item.iconAlternativeText,
      "iconName": $cmp.item.iconName
    },
    key: 0
  }, []) : null]), api_element("span", {
    classMap: {
      "slds-media__body": true
    },
    key: 8
  }, [api_element("span", {
    classMap: {
      "slds-listbox__option-text": true,
      "slds-listbox__option-text_entity": true
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
      "title": $cmp.text,
      "text": $cmp.item.text
    },
    key: 3
  }, []) : null]), $cmp.hasSubText ? api_element("span", {
    classMap: {
      "slds-listbox__option-meta": true,
      "slds-listbox__option-meta_entity": true
    },
    key: 7
  }, [!$cmp.subTextHasParts ? api_element("span", {
    classMap: {
      "slds-truncate": true
    },
    attrs: {
      "title": $cmp.item.subText
    },
    key: 5
  }, [api_dynamic($cmp.item.subText)]) : null, $cmp.subTextHasParts ? api_custom_element("lightning-base-combobox-formatted-text", _lightningBaseComboboxFormattedText, {
    classMap: {
      "slds-truncate": true
    },
    props: {
      "title": $cmp.subText,
      "text": $cmp.item.subText
    },
    key: 6
  }, []) : null]) : null]), $cmp.item.rightIconName ? api_element("span", {
    classMap: {
      "slds-media__figure": true,
      "slds-media__figure_reverse": true
    },
    key: 10
  }, [api_custom_element("lightning-icon", _lightningIcon, {
    props: {
      "size": $cmp.rightIconSize,
      "alternativeText": $cmp.item.rightIconAlternativeText,
      "iconName": $cmp.item.rightIconName
    },
    key: 9
  }, [])]) : null];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-baseComboboxItem_card-host",
  shadowAttribute: "lightning-baseComboboxItem_card"
};
