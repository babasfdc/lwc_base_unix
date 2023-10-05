import _implicitStylesheets from "./datetimepicker.css";

import _lightningHelptext from "lightning/helptext";
import _lightningDatepicker from "lightning/datepicker";
import _lightningTimepicker from "lightning/timepicker";
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
    _m5
  } = $ctx;
  return [api_element("div", {
    classMap: {
      "slds-form": true
    },
    attrs: {
      "tabindex": "-1"
    },
    key: 10
  }, [api_element("fieldset", {
    classMap: {
      "slds-form-element": true,
      "slds-form-element_compound": true
    },
    key: 9
  }, [api_element("legend", {
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
    key: 7
  }, [api_element("div", {
    classMap: {
      "slds-form-element__group": true
    },
    key: 6
  }, [api_element("div", {
    classMap: {
      "slds-form-element__row": true
    },
    key: 5
  }, [api_custom_element("lightning-datepicker", _lightningDatepicker, {
    classMap: {
      "slds-form-element": true
    },
    props: {
      "autocomplete": $cmp.autocomplete,
      "min": $cmp.dateMin,
      "max": $cmp.dateMax,
      "label": $cmp.i18n.date,
      "name": $cmp.name,
      "variant": $cmp.variant,
      "placeholder": $cmp.placeholder,
      "readOnly": $cmp.readOnly,
      "disabled": $cmp.disabled,
      "dateStyle": $cmp.dateStyle
    },
    key: 3,
    on: {
      "focus": _m0 || ($ctx._m0 = api_bind($cmp.handleDatepickerFocus)),
      "blur": _m1 || ($ctx._m1 = api_bind($cmp.handleDatepickerBlur)),
      "change": _m2 || ($ctx._m2 = api_bind($cmp.handleDateChange))
    }
  }, []), api_custom_element("lightning-timepicker", _lightningTimepicker, {
    classMap: {
      "slds-form-element": true
    },
    props: {
      "autocomplete": $cmp.autocomplete,
      "label": $cmp.i18n.time,
      "name": $cmp.name,
      "variant": $cmp.variant,
      "timeStyle": $cmp.timeStyle,
      "placeholder": $cmp.placeholder,
      "readOnly": $cmp.readOnly,
      "disabled": $cmp.disabled
    },
    key: 4,
    on: {
      "focus": _m3 || ($ctx._m3 = api_bind($cmp.handleTimepickerFocus)),
      "blur": _m4 || ($ctx._m4 = api_bind($cmp.handleTimepickerBlur)),
      "change": _m5 || ($ctx._m5 = api_bind($cmp.handleTimeChange))
    }
  }, [])])])]), $cmp.customErrorMessage ? api_element("div", {
    classMap: {
      "slds-form-element__help": true
    },
    attrs: {
      "data-error-message": true,
      "id": api_scoped_id("errormessage"),
      "aria-live": "assertive"
    },
    key: 8
  }, [api_dynamic($cmp.customErrorMessage)]) : null])])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-datetimepicker_datetimepicker-host",
  shadowAttribute: "lightning-datetimepicker_datetimepicker"
};
