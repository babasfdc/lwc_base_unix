import _implicitStylesheets from "./radio.css";

import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    gid: api_scoped_id,
    ti: api_tab_index,
    b: api_bind,
    h: api_element,
    d: api_dynamic
  } = $api;
  const {
    _m0,
    _m1
  } = $ctx;
  return [api_element("span", {
    classMap: {
      "slds-radio": true
    },
    key: 4
  }, [api_element("input", {
    attrs: {
      "type": "radio",
      "name": $cmp.computedOptionName,
      "id": api_scoped_id("primitive-checkbox-radio-id"),
      "tabindex": api_tab_index($cmp.internalTabIndex),
      "data-navigation": "enable",
      "data-action-triggers": "space",
      "aria-labelledby": api_scoped_id($cmp.ariaLabelledBy)
    },
    props: {
      "disabled": $cmp.isDisabled,
      "checked": $cmp.isSelected
    },
    key: 0,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.handleRadioClick)),
      "keydown": _m1 || ($ctx._m1 = api_bind($cmp.handleRadioKeyDown))
    }
  }, []), api_element("label", {
    classMap: {
      "slds-radio__label": true
    },
    attrs: {
      "for": `${api_scoped_id("primitive-checkbox-radio-id")}`
    },
    key: 3
  }, [api_element("span", {
    classMap: {
      "slds-radio_faux": true
    },
    key: 1
  }, []), api_element("span", {
    classMap: {
      "slds-form-element__label": true,
      "slds-assistive-text": true
    },
    key: 2
  }, [api_dynamic($cmp.selectItemAssistiveText)])])])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-primitiveCellCheckbox_radio-host",
  shadowAttribute: "lightning-primitiveCellCheckbox_radio"
};
