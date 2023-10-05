import _implicitStylesheets from "./input.css";

import _lightningHelptext from "lightning/helptext";
import _lightningPrimitiveIcon from "lightning/primitiveIcon";
import _lightningPrimitiveFileDroppableZone from "lightning/primitiveFileDroppableZone";
import _lightningPrimitiveColorpickerButton from "lightning/primitiveColorpickerButton";
import _lightningDatepicker from "lightning/datepicker";
import _lightningTimepicker from "lightning/timepicker";
import _lightningDatetimepicker from "lightning/datetimepicker";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    h: api_element,
    t: api_text,
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
    _m14,
    _m15,
    _m16,
    _m17,
    _m18,
    _m19,
    _m20,
    _m21,
    _m22,
    _m23,
    _m24,
    _m25,
    _m26,
    _m27,
    _m28,
    _m29,
    _m30,
    _m31,
    _m32,
    _m33,
    _m34,
    _m35,
    _m36,
    _m37,
    _m38,
    _m39
  } = $ctx;
  return [api_element("span", {
    classMap: {
      "slds-assistive-text": true
    },
    attrs: {
      "data-aria": true
    },
    key: 0
  }, []), $cmp.isTypeSimple ? api_element("label", {
    className: $cmp.computedLabelClass,
    attrs: {
      "for": `${api_scoped_id("input")}`
    },
    key: 2
  }, [$cmp.required ? api_element("abbr", {
    classMap: {
      "slds-required": true
    },
    attrs: {
      "title": $cmp.i18n.required
    },
    key: 1
  }, [api_text("*")]) : null, api_dynamic($cmp.label)]) : null, $cmp.isTypeSimple ? $cmp.fieldLevelHelp ? api_custom_element("lightning-helptext", _lightningHelptext, {
    props: {
      "content": $cmp.fieldLevelHelp
    },
    key: 3
  }, []) : null : null, $cmp.isTypeSimple ? api_element("div", {
    className: $cmp.computedFormElementClass,
    key: 14
  }, [api_element("input", {
    classMap: {
      "slds-input": true
    },
    attrs: {
      "type": $cmp._internalType,
      "id": api_scoped_id("input"),
      "aria-label": $cmp.computedAriaLabel,
      "accesskey": $cmp.accesskey,
      "autocomplete": $cmp.autocomplete,
      "max": $cmp.normalizedMax,
      "min": $cmp.normalizedMin,
      "inputmode": $cmp._inputMode,
      "step": $cmp.step,
      "maxlength": $cmp.maxLength,
      "minlength": $cmp.minLength,
      "pattern": $cmp.pattern,
      "placeholder": $cmp.placeholder,
      "name": $cmp.name
    },
    props: {
      "required": $cmp.required,
      "readOnly": $cmp.readOnly,
      "disabled": $cmp.disabled
    },
    key: 4,
    on: {
      "blur": _m0 || ($ctx._m0 = api_bind($cmp.handleBlur)),
      "focus": _m1 || ($ctx._m1 = api_bind($cmp.handleFocus)),
      "change": _m2 || ($ctx._m2 = api_bind($cmp.handleChange)),
      "input": _m3 || ($ctx._m3 = api_bind($cmp.handleInput)),
      "keydown": _m4 || ($ctx._m4 = api_bind($cmp.handleKeyDown))
    }
  }, []), $cmp.isTypeSearch ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": "utility:search",
      "variant": "bare",
      "svgClass": "slds-input__icon slds-input__icon_left slds-icon-text-default"
    },
    key: 5
  }, []) : null, $cmp.isTypeSearch ? api_element("div", {
    classMap: {
      "slds-input__icon-group": true,
      "slds-input__icon-group_right": true
    },
    key: 13
  }, [$cmp.isLoading ? api_element("div", {
    classMap: {
      "slds-spinner": true,
      "slds-spinner_brand": true,
      "slds-spinner_x-small": true,
      "slds-input__spinner": true
    },
    attrs: {
      "role": "status"
    },
    key: 9
  }, [api_element("span", {
    classMap: {
      "slds-assistive-text": true
    },
    key: 6
  }, [api_dynamic($cmp.i18n.loading)]), api_element("div", {
    classMap: {
      "slds-spinner__dot-a": true
    },
    key: 7
  }, []), api_element("div", {
    classMap: {
      "slds-spinner__dot-b": true
    },
    key: 8
  }, [])]) : null, $cmp._showClearButton ? api_element("button", {
    classMap: {
      "slds-input__icon": true,
      "slds-input__icon_right": true,
      "slds-button": true,
      "slds-button_icon": true
    },
    attrs: {
      "data-element-id": "searchClear"
    },
    key: 12,
    on: {
      "blur": _m5 || ($ctx._m5 = api_bind($cmp.handleBlur)),
      "click": _m6 || ($ctx._m6 = api_bind($cmp._clearAndSetFocusOnInput))
    }
  }, [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": "utility:clear",
      "variant": "bare",
      "svgClass": "slds-button__icon"
    },
    key: 10
  }, []), api_element("span", {
    classMap: {
      "slds-assistive-text": true
    },
    key: 11
  }, [api_dynamic($cmp.i18n.clear)])]) : null]) : null]) : null, $cmp.isTypeToggle ? api_element("div", {
    classMap: {
      "slds-form-element__control": true
    },
    key: 23
  }, [api_element("label", {
    classMap: {
      "slds-checkbox_toggle": true,
      "slds-grid": true
    },
    attrs: {
      "for": `${api_scoped_id("checkbox-toggle")}`
    },
    key: 22
  }, [$cmp.required ? api_element("abbr", {
    classMap: {
      "slds-required": true
    },
    attrs: {
      "title": $cmp.i18n.required
    },
    key: 15
  }, [api_text("*")]) : null, api_element("span", {
    className: $cmp.computedLabelClass,
    key: 16
  }, [api_dynamic($cmp.label)]), api_element("input", {
    attrs: {
      "type": "checkbox",
      "id": api_scoped_id("checkbox-toggle"),
      "aria-label": $cmp.computedAriaLabel,
      "accesskey": $cmp.accesskey,
      "name": $cmp.name
    },
    props: {
      "required": $cmp.required,
      "readOnly": $cmp.readOnly,
      "disabled": $cmp.disabled
    },
    key: 17,
    on: {
      "blur": _m7 || ($ctx._m7 = api_bind($cmp.handleBlur)),
      "focus": _m8 || ($ctx._m8 = api_bind($cmp.handleFocus)),
      "change": _m9 || ($ctx._m9 = api_bind($cmp.handleChange))
    }
  }, []), api_element("span", {
    classMap: {
      "slds-checkbox_faux_container": true
    },
    attrs: {
      "id": api_scoped_id("toggle-description"),
      "data-toggle-description": true,
      "aria-live": "assertive"
    },
    key: 21
  }, [api_element("span", {
    classMap: {
      "slds-checkbox_faux": true
    },
    key: 18
  }, []), api_element("span", {
    classMap: {
      "slds-checkbox_on": true
    },
    key: 19
  }, [api_dynamic($cmp.messageToggleActive)]), api_element("span", {
    classMap: {
      "slds-checkbox_off": true
    },
    key: 20
  }, [api_dynamic($cmp.messageToggleInactive)])])])]) : null, $cmp.isTypeCheckbox ? !$cmp.isStandardVariant ? api_element("label", {
    classMap: {
      "slds-checkbox__label": true
    },
    attrs: {
      "for": `${api_scoped_id("checkbox")}`
    },
    key: 26
  }, [$cmp.required ? api_element("abbr", {
    classMap: {
      "slds-required": true
    },
    attrs: {
      "title": $cmp.i18n.required
    },
    key: 24
  }, [api_text("*")]) : null, api_element("span", {
    className: $cmp.computedLabelClass,
    key: 25
  }, [api_dynamic($cmp.label)])]) : null : null, $cmp.isTypeCheckbox ? !$cmp.isStandardVariant ? $cmp.fieldLevelHelp ? api_custom_element("lightning-helptext", _lightningHelptext, {
    props: {
      "content": $cmp.fieldLevelHelp
    },
    key: 27
  }, []) : null : null : null, $cmp.isTypeCheckbox ? api_element("div", {
    className: $cmp.computedFormElementClass,
    key: 36
  }, [api_element("span", {
    className: $cmp.computedCheckboxClass,
    key: 35
  }, [$cmp.isStandardVariant ? $cmp.required ? api_element("abbr", {
    classMap: {
      "slds-required": true
    },
    attrs: {
      "title": $cmp.i18n.required
    },
    key: 28
  }, [api_text("*")]) : null : null, api_element("input", {
    attrs: {
      "type": "checkbox",
      "id": api_scoped_id("checkbox"),
      "aria-label": $cmp.computedAriaLabel,
      "accesskey": $cmp.accesskey,
      "name": $cmp.name
    },
    props: {
      "required": $cmp.required,
      "readOnly": $cmp.readOnly,
      "disabled": $cmp.disabled
    },
    key: 29,
    on: {
      "blur": _m10 || ($ctx._m10 = api_bind($cmp.handleBlur)),
      "focus": _m11 || ($ctx._m11 = api_bind($cmp.handleFocus)),
      "change": _m12 || ($ctx._m12 = api_bind($cmp.handleChange))
    }
  }, []), !$cmp.isStandardVariant ? api_element("span", {
    classMap: {
      "slds-checkbox_faux": true
    },
    key: 30
  }, []) : null, $cmp.isStandardVariant ? api_element("label", {
    classMap: {
      "slds-checkbox__label": true
    },
    attrs: {
      "for": `${api_scoped_id("checkbox")}`
    },
    key: 33
  }, [api_element("span", {
    classMap: {
      "slds-checkbox_faux": true
    },
    key: 31
  }, []), api_element("span", {
    className: $cmp.computedLabelClass,
    key: 32
  }, [api_dynamic($cmp.label)])]) : null, $cmp.isStandardVariant ? $cmp.fieldLevelHelp ? api_custom_element("lightning-helptext", _lightningHelptext, {
    props: {
      "content": $cmp.fieldLevelHelp
    },
    key: 34
  }, []) : null : null])]) : null, $cmp.isTypeCheckboxButton ? api_element("div", {
    classMap: {
      "slds-checkbox_add-button": true
    },
    key: 40
  }, [api_element("input", {
    classMap: {
      "slds-assistive-text": true
    },
    attrs: {
      "type": "checkbox",
      "id": api_scoped_id("checkbox-button"),
      "aria-label": $cmp.computedAriaLabel,
      "accesskey": $cmp.accesskey,
      "name": $cmp.name
    },
    props: {
      "required": $cmp.required,
      "readOnly": $cmp.readOnly,
      "disabled": $cmp.disabled
    },
    key: 37,
    on: {
      "blur": _m13 || ($ctx._m13 = api_bind($cmp.handleBlur)),
      "focus": _m14 || ($ctx._m14 = api_bind($cmp.handleFocus)),
      "change": _m15 || ($ctx._m15 = api_bind($cmp.handleChange))
    }
  }, []), api_element("label", {
    classMap: {
      "slds-checkbox_faux": true
    },
    attrs: {
      "for": `${api_scoped_id("checkbox-button")}`
    },
    key: 39
  }, [api_element("span", {
    classMap: {
      "slds-assistive-text": true
    },
    key: 38
  }, [api_dynamic($cmp.label)])])]) : null, $cmp.isTypeRadio ? api_element("div", {
    classMap: {
      "slds-form-element__control": true
    },
    key: 46
  }, [api_element("span", {
    classMap: {
      "slds-radio": true
    },
    key: 45
  }, [api_element("input", {
    attrs: {
      "type": "radio",
      "id": api_scoped_id("radio"),
      "accesskey": $cmp.accesskey,
      "name": $cmp.name
    },
    props: {
      "required": $cmp.required,
      "readOnly": $cmp.readOnly,
      "disabled": $cmp.disabled
    },
    key: 41,
    on: {
      "blur": _m16 || ($ctx._m16 = api_bind($cmp.handleBlur)),
      "focus": _m17 || ($ctx._m17 = api_bind($cmp.handleFocus)),
      "change": _m18 || ($ctx._m18 = api_bind($cmp.handleChange))
    }
  }, []), api_element("label", {
    classMap: {
      "slds-radio__label": true
    },
    attrs: {
      "for": `${api_scoped_id("radio")}`
    },
    key: 44
  }, [api_element("span", {
    classMap: {
      "slds-radio_faux": true
    },
    key: 42
  }, []), api_element("span", {
    className: $cmp.computedLabelClass,
    key: 43
  }, [api_dynamic($cmp.label)])])])]) : null, $cmp.isTypeFile ? api_element("span", {
    className: $cmp.computedLabelClass,
    attrs: {
      "id": api_scoped_id("form-label"),
      "data-form-label": true
    },
    key: 48
  }, [$cmp.required ? api_element("abbr", {
    classMap: {
      "slds-required": true
    },
    attrs: {
      "title": $cmp.i18n.required
    },
    key: 47
  }, [api_text("*")]) : null, api_dynamic($cmp.label)]) : null, $cmp.isTypeFile ? api_element("div", {
    classMap: {
      "slds-form-element__control": true
    },
    key: 56
  }, [api_element("div", {
    classMap: {
      "slds-file-selector": true,
      "slds-file-selector_files": true
    },
    key: 55,
    on: {
      "drop": _m23 || ($ctx._m23 = api_bind($cmp.handleDropFiles))
    }
  }, [api_custom_element("lightning-primitive-file-droppable-zone", _lightningPrimitiveFileDroppableZone, {
    props: {
      "multiple": $cmp.multiple,
      "disabled": $cmp.disabled
    },
    key: 54
  }, [api_element("input", {
    classMap: {
      "slds-file-selector__input": true,
      "slds-assistive-text": true
    },
    attrs: {
      "type": "file",
      "id": api_scoped_id("input-file"),
      "aria-label": $cmp.computedAriaLabel,
      "accesskey": $cmp.accesskey,
      "accept": $cmp.accept,
      "name": $cmp.name
    },
    props: {
      "multiple": $cmp.multiple,
      "required": $cmp.required,
      "readOnly": $cmp.readOnly,
      "disabled": $cmp.disabled
    },
    key: 49,
    on: {
      "blur": _m19 || ($ctx._m19 = api_bind($cmp.handleBlur)),
      "click": _m20 || ($ctx._m20 = api_bind($cmp.handleFileClick)),
      "focus": _m21 || ($ctx._m21 = api_bind($cmp.handleFocus)),
      "change": _m22 || ($ctx._m22 = api_bind($cmp.handleChange))
    }
  }, []), api_element("label", {
    classMap: {
      "slds-file-selector__body": true
    },
    attrs: {
      "id": api_scoped_id("file-selector-label"),
      "data-file-selector-label": true,
      "for": `${api_scoped_id("input-file")}`
    },
    key: 53
  }, [api_element("span", {
    classMap: {
      "slds-file-selector__button": true,
      "slds-button": true,
      "slds-button_neutral": true
    },
    key: 51
  }, [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": "utility:upload",
      "variant": "bare",
      "svgClass": "slds-button__icon slds-button__icon_left"
    },
    key: 50
  }, []), api_dynamic($cmp.i18n.inputFileButtonLabel)]), api_element("span", {
    classMap: {
      "slds-file-selector__text": true,
      "slds-medium-show": true
    },
    key: 52
  }, [api_dynamic($cmp.i18n.inputFileBodyText)])])])])]) : null, $cmp.isTypeColor ? api_element("div", {
    classMap: {
      "slds-color-picker": true
    },
    key: 65
  }, [api_element("div", {
    classMap: {
      "slds-form-element": true,
      "slds-color-picker__summary": true
    },
    key: 64
  }, [api_element("label", {
    className: $cmp.computedColorLabelClass,
    attrs: {
      "for": `${api_scoped_id("color")}`
    },
    key: 58
  }, [$cmp.required ? api_element("abbr", {
    classMap: {
      "slds-required": true
    },
    attrs: {
      "title": $cmp.i18n.required
    },
    key: 57
  }, [api_text("*")]) : null, api_dynamic($cmp.label)]), api_element("div", {
    classMap: {
      "slds-form-element__control": true
    },
    key: 62
  }, [api_custom_element("lightning-primitive-colorpicker-button", _lightningPrimitiveColorpickerButton, {
    props: {
      "value": $cmp.value,
      "disabled": $cmp.disabled
    },
    key: 59,
    on: {
      "blur": _m24 || ($ctx._m24 = api_bind($cmp.handleBlur)),
      "focus": _m25 || ($ctx._m25 = api_bind($cmp.handleFocus)),
      "change": _m26 || ($ctx._m26 = api_bind($cmp.handleColorChange))
    }
  }, []), api_element("div", {
    classMap: {
      "slds-color-picker__summary-input": true
    },
    key: 61
  }, [api_element("input", {
    classMap: {
      "slds-input": true,
      "slds-m-right_x-small": true
    },
    attrs: {
      "type": "text",
      "id": api_scoped_id("color"),
      "name": $cmp.name,
      "autocomplete": $cmp.autocomplete,
      "accesskey": $cmp.accesskey,
      "aria-label": $cmp.computedAriaLabel,
      "minlength": "4",
      "maxlength": "7",
      "placeholder": $cmp.placeholder,
      "pattern": $cmp.pattern
    },
    props: {
      "disabled": $cmp.disabled
    },
    key: 60,
    on: {
      "blur": _m27 || ($ctx._m27 = api_bind($cmp.handleBlur)),
      "focus": _m28 || ($ctx._m28 = api_bind($cmp.handleFocus)),
      "change": _m29 || ($ctx._m29 = api_bind($cmp.handleChange)),
      "input": _m30 || ($ctx._m30 = api_bind($cmp.handleInput))
    }
  }, [])])]), $cmp.fieldLevelHelp ? api_custom_element("lightning-helptext", _lightningHelptext, {
    props: {
      "content": $cmp.fieldLevelHelp
    },
    key: 63
  }, []) : null])]) : null, $cmp.isTypeDesktopDate ? api_custom_element("lightning-datepicker", _lightningDatepicker, {
    props: {
      "max": $cmp.max,
      "min": $cmp.min,
      "label": $cmp.label,
      "name": $cmp.name,
      "variant": $cmp.variant,
      "ariaLabel": $cmp.ariaLabel,
      "dateStyle": $cmp.dateStyle,
      "placeholder": $cmp.placeholder,
      "required": $cmp.required,
      "readOnly": $cmp.readOnly,
      "fieldLevelHelp": $cmp.fieldLevelHelp,
      "autocomplete": "off",
      "messageWhenBadInput": $cmp.messageWhenBadInput,
      "messageWhenValueMissing": $cmp.messageWhenValueMissing,
      "messageWhenRangeOverflow": $cmp.messageWhenRangeOverflow,
      "messageWhenRangeUnderflow": $cmp.messageWhenRangeUnderflow,
      "disabled": $cmp.disabled
    },
    key: 66,
    on: {
      "change": _m31 || ($ctx._m31 = api_bind($cmp.handleChange)),
      "blur": _m32 || ($ctx._m32 = api_bind($cmp.handleBlur)),
      "focus": _m33 || ($ctx._m33 = api_bind($cmp.handleFocus))
    }
  }, []) : null, $cmp.isTypeDesktopTime ? api_custom_element("lightning-timepicker", _lightningTimepicker, {
    props: {
      "max": $cmp.max,
      "min": $cmp.min,
      "label": $cmp.label,
      "name": $cmp.name,
      "ariaLabel": $cmp.ariaLabel,
      "variant": $cmp.variant,
      "timeStyle": $cmp.timeStyle,
      "placeholder": $cmp.placeholder,
      "required": $cmp.required,
      "readOnly": $cmp.readOnly,
      "autocomplete": "off",
      "fieldLevelHelp": $cmp.fieldLevelHelp,
      "messageWhenBadInput": $cmp.messageWhenBadInput,
      "messageWhenValueMissing": $cmp.messageWhenValueMissing,
      "messageWhenRangeOverflow": $cmp.messageWhenRangeOverflow,
      "messageWhenRangeUnderflow": $cmp.messageWhenRangeUnderflow,
      "disabled": $cmp.disabled
    },
    key: 67,
    on: {
      "change": _m34 || ($ctx._m34 = api_bind($cmp.handleChange)),
      "blur": _m35 || ($ctx._m35 = api_bind($cmp.handleBlur)),
      "focus": _m36 || ($ctx._m36 = api_bind($cmp.handleFocus))
    }
  }, []) : null, $cmp.isTypeDesktopDateTime ? api_custom_element("lightning-datetimepicker", _lightningDatetimepicker, {
    props: {
      "dateAriaControls": $cmp.dateAriaControls,
      "dateAriaLabel": $cmp.dateAriaLabel,
      "dateAriaLabelledBy": $cmp.dateAriaLabelledBy,
      "dateAriaDescribedBy": $cmp.dateAriaDescribedBy,
      "dateStyle": $cmp.dateStyle,
      "timeStyle": $cmp.timeStyle,
      "timeAriaControls": $cmp.timeAriaControls,
      "timeAriaLabel": $cmp.timeAriaLabel,
      "timeAriaLabelledBy": $cmp.timeAriaLabelledBy,
      "timeAriaDescribedBy": $cmp.timeAriaDescribedBy,
      "max": $cmp.max,
      "min": $cmp.min,
      "timezone": $cmp.timezone,
      "label": $cmp.label,
      "name": $cmp.name,
      "variant": $cmp.variant,
      "placeholder": $cmp.placeholder,
      "required": $cmp.required,
      "readOnly": $cmp.readOnly,
      "fieldLevelHelp": $cmp.fieldLevelHelp,
      "autocomplete": "off",
      "messageWhenBadInput": $cmp.messageWhenBadInput,
      "messageWhenValueMissing": $cmp.messageWhenValueMissing,
      "messageWhenRangeOverflow": $cmp.messageWhenRangeOverflow,
      "messageWhenRangeUnderflow": $cmp.messageWhenRangeUnderflow,
      "disabled": $cmp.disabled
    },
    key: 68,
    on: {
      "change": _m37 || ($ctx._m37 = api_bind($cmp.handleChange)),
      "blur": _m38 || ($ctx._m38 = api_bind($cmp.handleBlur)),
      "focus": _m39 || ($ctx._m39 = api_bind($cmp.handleFocus))
    }
  }, []) : null, $cmp._helpMessage ? api_element("div", {
    classMap: {
      "slds-form-element__help": true
    },
    attrs: {
      "id": api_scoped_id("help-message"),
      "data-help-message": true,
      "role": "alert"
    },
    key: 69
  }, [api_dynamic($cmp._helpMessage)]) : null];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-input_input-host",
  shadowAttribute: "lightning-input_input"
};
