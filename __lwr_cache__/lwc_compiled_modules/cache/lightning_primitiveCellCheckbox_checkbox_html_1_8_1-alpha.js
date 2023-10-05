import _implicitStylesheets from "./checkbox.css";

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
    _m1,
    _m2
  } = $ctx;
  return [api_element("span", {
    classMap: {
      "slds-checkbox": true
    },
    key: 4,
    on: {
      "click": _m1 || ($ctx._m1 = api_bind($cmp.handleCheckboxContainerClick)),
      "mousedown": _m2 || ($ctx._m2 = api_bind($cmp.handleCheckboxContainerMouseDown))
    }
  }, [api_element("input", {
    attrs: {
      "type": "checkbox",
      "name": $cmp.computedOptionName,
      "id": api_scoped_id("primitive-cell-checkbox-id"),
      "tabindex": api_tab_index($cmp.internalTabIndex),
      "data-navigation": "enable",
      "data-action-triggers": "space"
    },
    props: {
      "disabled": $cmp.isDisabled,
      "checked": $cmp.isSelected
    },
    key: 0,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.handleCheckboxClick))
    }
  }, []), api_element("label", {
    classMap: {
      "slds-checkbox__label": true
    },
    attrs: {
      "for": `${api_scoped_id("primitive-cell-checkbox-id")}`
    },
    key: 3
  }, [api_element("span", {
    classMap: {
      "slds-checkbox_faux": true
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
  hostAttribute: "lightning-primitiveCellCheckbox_checkbox-host",
  shadowAttribute: "lightning-primitiveCellCheckbox_checkbox"
};
