import _implicitStylesheets from "./datepicker.css";

import _lightningHelptext from "lightning/helptext";
import _lightningButtonIcon from "lightning/buttonIcon";
import _lightningCalendar from "lightning/calendar";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    t: api_text,
    h: api_element,
    d: api_dynamic,
    gid: api_scoped_id,
    c: api_custom_element,
    b: api_bind
  } = $api;
  const {
    _m0,
    _m1,
    _m2,
    _m3,
    _m4,
    _m5,
    _m6,
    _m7,
    _m8,
    _m9,
    _m10,
    _m11,
    _m12,
    _m13,
    _m14
  } = $ctx;
  return [api_element("div", {
    classMap: {
      "slds-dropdown-trigger": true,
      "slds-dropdown-trigger_click": true,
      "slds-size_1-of-1": true
    },
    attrs: {
      "tabindex": "-1"
    },
    key: 7
  }, [api_element("label", {
    className: $cmp.computedLabelClass,
    attrs: {
      "for": `${api_scoped_id("input")}`
    },
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
      "slds-form-element__control": true,
      "slds-input-has-icon": true,
      "slds-input-has-icon_right": true
    },
    key: 6
  }, [api_element("input", {
    classMap: {
      "slds-input": true
    },
    attrs: {
      "type": "text",
      "id": api_scoped_id("input"),
      "name": $cmp.name,
      "placeholder": $cmp.placeholder,
      "aria-label": $cmp.ariaLabel,
      "autocomplete": $cmp.autocomplete
    },
    props: {
      "value": $cmp.displayValue,
      "required": $cmp.required,
      "readOnly": $cmp.readOnly,
      "disabled": $cmp.disabled
    },
    key: 3,
    on: {
      "input": _m0 || ($ctx._m0 = api_bind($cmp.handleInput)),
      "change": _m1 || ($ctx._m1 = api_bind($cmp.handleInputChange)),
      "focusin": _m2 || ($ctx._m2 = api_bind($cmp.onFocusIn)),
      "focusout": _m3 || ($ctx._m3 = api_bind($cmp.handleInputBlur)),
      "keydown": _m4 || ($ctx._m4 = api_bind($cmp.handleInputKeydown)),
      "click": _m5 || ($ctx._m5 = api_bind($cmp.handleInputClick))
    }
  }, []), api_custom_element("lightning-button-icon", _lightningButtonIcon, {
    classMap: {
      "slds-input__icon": true,
      "slds-input__icon_right": true
    },
    props: {
      "iconName": "utility:event",
      "variant": "bare",
      "disabled": $cmp.computedIconDisabledState,
      "title": $cmp.i18n.selectDate,
      "alternativeText": $cmp.i18n.selectDate
    },
    key: 4,
    on: {
      "click": _m6 || ($ctx._m6 = api_bind($cmp.handleDatePickerIconClick)),
      "keydown": _m7 || ($ctx._m7 = api_bind($cmp.handleDatePickerIconKeyDown)),
      "focusin": _m8 || ($ctx._m8 = api_bind($cmp.onFocusIn)),
      "focusout": _m9 || ($ctx._m9 = api_bind($cmp.onFocusOut))
    }
  }, []), $cmp.isCalendarVisible ? api_custom_element("lightning-calendar", _lightningCalendar, {
    props: {
      "value": $cmp.value,
      "min": $cmp.min,
      "max": $cmp.max
    },
    key: 5,
    on: {
      "select": _m10 || ($ctx._m10 = api_bind($cmp.handleDateSelect)),
      "ready": _m11 || ($ctx._m11 = api_bind($cmp.startPositioning)),
      "keydown": _m12 || ($ctx._m12 = api_bind($cmp.handleCalendarKeyDown)),
      "focusin": _m13 || ($ctx._m13 = api_bind($cmp.onFocusIn)),
      "focusout": _m14 || ($ctx._m14 = api_bind($cmp.onFocusOut))
    }
  }, []) : null])]), $cmp.errorMessage ? api_element("div", {
    classMap: {
      "slds-form-element__help": true
    },
    attrs: {
      "id": api_scoped_id("error-message"),
      "data-error-message": true,
      "aria-live": "assertive"
    },
    key: 8
  }, [api_dynamic($cmp.errorMessage)]) : null];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-datepicker_datepicker-host",
  shadowAttribute: "lightning-datepicker_datepicker"
};
