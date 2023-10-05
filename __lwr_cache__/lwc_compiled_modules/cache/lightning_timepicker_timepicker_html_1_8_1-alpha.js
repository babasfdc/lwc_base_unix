import _implicitStylesheets from "./timepicker.css";

import _lightningHelptext from "lightning/helptext";
import _lightningBaseCombobox from "lightning/baseCombobox";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    t: api_text,
    h: api_element,
    d: api_dynamic,
    c: api_custom_element,
    b: api_bind,
    gid: api_scoped_id
  } = $api;
  const {
    _m0,
    _m1,
    _m2,
    _m3,
    _m4,
    _m5,
    _m6
  } = $ctx;
  return [api_element("label", {
    className: $cmp.computedLabelClass,
    key: 1
  }, [$cmp.required ? api_element("abbr", {
    classMap: {
      "slds-required": true
    },
    attrs: {
      "title": $cmp.i18n.required
    },
    key: 0
  }, [api_text("*")]) : null, api_dynamic($cmp.label)]), $cmp.fieldLevelHelp ? api_custom_element("lightning-helptext", _lightningHelptext, {
    props: {
      "content": $cmp.fieldLevelHelp
    },
    key: 2
  }, []) : null, api_element("div", {
    classMap: {
      "slds-form-element__control": true
    },
    key: 4
  }, [api_custom_element("lightning-base-combobox", _lightningBaseCombobox, {
    props: {
      "autocomplete": $cmp.autocomplete,
      "dropdownHeight": "small",
      "name": $cmp.name,
      "variant": "lookup",
      "placeholder": $cmp.placeholder,
      "disabled": $cmp.disabled,
      "readOnly": $cmp.readOnly,
      "items": $cmp.items,
      "inputText": $cmp.displayValue,
      "inputIconName": "utility:clock",
      "inputLabel": $cmp.ariaLabel,
      "inputControlsElement": $cmp.ariaControlsElement,
      "inputLabelledByElement": $cmp.ariaLabelledByElement,
      "dropdownAlignment": "auto"
    },
    key: 3,
    on: {
      "ready": _m0 || ($ctx._m0 = api_bind($cmp.handleReady)),
      "textchange": _m1 || ($ctx._m1 = api_bind($cmp.handleInputChange)),
      "textinput": _m2 || ($ctx._m2 = api_bind($cmp.handleTextInput)),
      "dropdownopenrequest": _m3 || ($ctx._m3 = api_bind($cmp.handleDropdownOpenRequest)),
      "focus": _m4 || ($ctx._m4 = api_bind($cmp.handleFocus)),
      "blur": _m5 || ($ctx._m5 = api_bind($cmp.handleBlur)),
      "select": _m6 || ($ctx._m6 = api_bind($cmp.handleTimeSelect))
    }
  }, [])]), $cmp._errorMessage ? api_element("div", {
    classMap: {
      "slds-form-element__help": true
    },
    attrs: {
      "id": api_scoped_id("error-message"),
      "data-error-message": true,
      "aria-live": "assertive"
    },
    key: 5
  }, [api_dynamic($cmp._errorMessage)]) : null];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-timepicker_timepicker-host",
  shadowAttribute: "lightning-timepicker_timepicker"
};
