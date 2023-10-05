import _implicitStylesheets from "./buttonMenu.css";

import _lightningPrimitiveIcon from "lightning/primitiveIcon";
import _lightningSpinner from "lightning/spinner";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    t: api_text,
    h: api_element,
    d: api_dynamic,
    c: api_custom_element,
    b: api_bind,
    s: api_slot
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
  return [api_element("button", {
    className: $cmp.computedButtonClass,
    attrs: {
      "aria-expanded": $cmp.computedAriaExpanded,
      "title": $cmp.computedTitle,
      "accesskey": $cmp.computedAccessKey,
      "value": $cmp.value,
      "aria-haspopup": "true",
      "type": "button"
    },
    props: {
      "disabled": $cmp.disabled
    },
    key: 4,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.handleButtonClick)),
      "keydown": _m1 || ($ctx._m1 = api_bind($cmp.handleButtonKeyDown)),
      "blur": _m2 || ($ctx._m2 = api_bind($cmp.handleBlur)),
      "focus": _m3 || ($ctx._m3 = api_bind($cmp.handleFocus)),
      "mousedown": _m4 || ($ctx._m4 = api_bind($cmp.handleButtonMouseDown))
    }
  }, [$cmp.isDraft ? api_element("abbr", {
    classMap: {
      "slds-indicator_unsaved": true,
      "slds-p-right_xx-small": true
    },
    attrs: {
      "title": $cmp.draftAlternativeText
    },
    key: 0
  }, [api_text("*")]) : null, api_dynamic($cmp.label), api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": $cmp.iconName,
      "svgClass": "slds-button__icon",
      "variant": "bare"
    },
    key: 1
  }, []), $cmp.computedShowDownIcon ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": "utility:down",
      "svgClass": "slds-button__icon slds-button__icon_x-small slds-m-left_xx-small",
      "variant": "bare"
    },
    key: 2
  }, []) : null, api_element("span", {
    classMap: {
      "slds-assistive-text": true
    },
    key: 3
  }, [api_dynamic($cmp.computedAlternativeText)])]), $cmp._dropdownOpened ? api_element("div", {
    className: $cmp.computedDropdownClass,
    key: 8,
    on: {
      "mousedown": _m11 || ($ctx._m11 = api_bind($cmp.handleDropdownMouseDown)),
      "mouseup": _m12 || ($ctx._m12 = api_bind($cmp.handleDropdownMouseUp)),
      "mouseleave": _m13 || ($ctx._m13 = api_bind($cmp.handleDropdownMouseLeave)),
      "scroll": _m14 || ($ctx._m14 = api_bind($cmp.handleDropdownScroll))
    }
  }, [$cmp.isLoading ? api_custom_element("lightning-spinner", _lightningSpinner, {
    props: {
      "size": "small",
      "alternativeText": $cmp.computedLoadingStateAlternativeText
    },
    key: 5
  }, []) : null, !$cmp.isLoading ? api_element("div", {
    classMap: {
      "slds-dropdown__list": true,
      "slds-dropdown_length-with-icon-10": true
    },
    attrs: {
      "role": "menu"
    },
    key: 7,
    on: {
      "privateselect": _m5 || ($ctx._m5 = api_bind($cmp.handleMenuItemPrivateSelect)),
      "privateblur": _m6 || ($ctx._m6 = api_bind($cmp.handlePrivateBlur)),
      "privatefocus": _m7 || ($ctx._m7 = api_bind($cmp.handlePrivateFocus)),
      "mouseover": _m8 || ($ctx._m8 = api_bind($cmp.handleMouseOverOnMenuItem)),
      "mouseout": _m9 || ($ctx._m9 = api_bind($cmp.allowBlur)),
      "keydown": _m10 || ($ctx._m10 = api_bind($cmp.handleKeyOnMenuItem))
    }
  }, [api_slot("", {
    key: 6
  }, [], $slotset)]) : null]) : null];
}

export default registerTemplate(tmpl);
tmpl.slots = [""];
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-buttonMenu_buttonMenu-host",
  shadowAttribute: "lightning-buttonMenu_buttonMenu"
};
