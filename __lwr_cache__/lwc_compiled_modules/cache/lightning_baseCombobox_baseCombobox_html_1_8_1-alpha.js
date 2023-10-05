import _implicitStylesheets from "./baseCombobox.css";

import _lightningIcon from "lightning/icon";
import _lightningPrimitiveIcon from "lightning/primitiveIcon";
import _lightningBaseComboboxItem from "lightning/baseComboboxItem";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    c: api_custom_element,
    gid: api_scoped_id,
    b: api_bind,
    h: api_element,
    d: api_dynamic,
    k: api_key,
    i: api_iterator,
    f: api_flatten
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
    className: $cmp.computedDropdownTriggerClass,
    attrs: {
      "role": "combobox",
      "aria-expanded": $cmp.computedAriaExpanded,
      "aria-haspopup": "listbox"
    },
    key: 29,
    on: {
      "click": _m14 || ($ctx._m14 = api_bind($cmp.handleTriggerClick))
    }
  }, [api_element("div", {
    className: $cmp.computedFormElementClass,
    attrs: {
      "role": "none"
    },
    key: 12
  }, [$cmp.hasInputPill ? api_custom_element("lightning-icon", _lightningIcon, {
    classMap: {
      "slds-icon_container": true,
      "slds-combobox__input-entity-icon": true
    },
    props: {
      "iconName": $cmp.inputPill.iconName,
      "alternativeText": $cmp.inputPill.iconAlternativeText,
      "size": "x-small"
    },
    key: 0
  }, []) : null, api_element("input", {
    className: $cmp.computedInputClass,
    attrs: {
      "id": api_scoped_id("input"),
      "type": "text",
      "role": "textbox",
      "autocomplete": $cmp.autocomplete,
      "name": $cmp.name,
      "placeholder": $cmp.computedPlaceholder,
      "maxlength": $cmp.inputMaxlength,
      "aria-autocomplete": $cmp.computedAriaAutocomplete,
      "aria-label": $cmp.inputLabel
    },
    props: {
      "required": $cmp.required,
      "value": $cmp.computedInputValue,
      "disabled": $cmp.disabled,
      "readOnly": $cmp._inputReadOnly
    },
    key: 1,
    on: {
      "focus": _m0 || ($ctx._m0 = api_bind($cmp.handleFocus)),
      "select": _m1 || ($ctx._m1 = api_bind($cmp.handleInputSelect)),
      "change": _m2 || ($ctx._m2 = api_bind($cmp.handleTextChange)),
      "input": _m3 || ($ctx._m3 = api_bind($cmp.handleInput)),
      "keydown": _m4 || ($ctx._m4 = api_bind($cmp.handleInputKeyDown)),
      "blur": _m5 || ($ctx._m5 = api_bind($cmp.handleBlur))
    }
  }, []), $cmp.hasInputPill ? api_element("div", {
    classMap: {
      "slds-input__icon-group": true,
      "slds-input__icon-group_right": true
    },
    key: 5
  }, [api_element("button", {
    classMap: {
      "slds-button": true,
      "slds-button_icon": true,
      "slds-input__icon": true,
      "slds-input__icon_right": true
    },
    attrs: {
      "type": "button",
      "title": $cmp.i18n.pillCloseButtonAlternativeText
    },
    key: 4,
    on: {
      "click": _m6 || ($ctx._m6 = api_bind($cmp.handlePillRemove))
    }
  }, [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": "utility:close",
      "variant": "bare",
      "svgClass": "slds-button__icon"
    },
    key: 2
  }, []), api_element("span", {
    classMap: {
      "slds-assistive-text": true
    },
    key: 3
  }, [api_dynamic($cmp.i18n.pillCloseButtonAlternativeText)])])]) : null, !$cmp.hasInputPill ? api_element("div", {
    classMap: {
      "slds-input__icon-group": true,
      "slds-input__icon-group_right": true
    },
    key: 11
  }, [$cmp.showInputActivityIndicator ? api_element("div", {
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
  }, [api_dynamic($cmp.i18n.loadingText)]), api_element("div", {
    classMap: {
      "slds-spinner__dot-a": true
    },
    key: 7
  }, []), api_element("div", {
    classMap: {
      "slds-spinner__dot-b": true
    },
    key: 8
  }, [])]) : null, $cmp.inputIconName ? api_custom_element("lightning-icon", _lightningIcon, {
    classMap: {
      "slds-input__icon": true,
      "slds-input__icon_right": true
    },
    props: {
      "alternativeText": $cmp.inputIconAlternativeText,
      "iconName": $cmp.inputIconName,
      "size": $cmp.inputIconSize
    },
    key: 10
  }, []) : null]) : null]), api_element("div", {
    className: $cmp.computedDropdownClass,
    attrs: {
      "id": api_scoped_id("dropdown-element"),
      "data-dropdown-element": true,
      "role": "listbox"
    },
    key: 28,
    on: {
      "scroll": _m9 || ($ctx._m9 = api_bind($cmp.handleListboxScroll)),
      "mousedown": _m10 || ($ctx._m10 = api_bind($cmp.handleDropdownMouseDown)),
      "mouseup": _m11 || ($ctx._m11 = api_bind($cmp.handleDropdownMouseUp)),
      "mouseleave": _m12 || ($ctx._m12 = api_bind($cmp.handleDropdownMouseLeave)),
      "click": _m13 || ($ctx._m13 = api_bind($cmp.handleOptionClick))
    }
  }, $cmp._hasDropdownOpened ? api_flatten([api_iterator($cmp._items, function (item) {
    return [!item.items ? api_custom_element("lightning-base-combobox-item", _lightningBaseComboboxItem, {
      classMap: {
        "slds-media": true,
        "slds-listbox__option": true,
        "slds-media_center": true
      },
      attrs: {
        "data-item-id": item.id,
        "data-value": item.value
      },
      props: {
        "role": "option",
        "item": item,
        "id": api_scoped_id(item.id),
        "ariaChecked": item.checked
      },
      key: api_key(13, item.value),
      on: {
        "mouseenter": _m7 || ($ctx._m7 = api_bind($cmp.handleOptionMouseEnter))
      }
    }, []) : null, item.items ? api_element("ul", {
      attrs: {
        "role": "group",
        "aria-label": item.label
      },
      key: api_key(19, item.label)
    }, api_flatten([item.label ? api_element("li", {
      classMap: {
        "slds-listbox__item": true
      },
      attrs: {
        "role": "presentation"
      },
      key: 16
    }, [api_element("div", {
      classMap: {
        "slds-media": true,
        "slds-listbox__option": true,
        "slds-listbox__option_plain": true,
        "slds-media_small": true
      },
      attrs: {
        "role": "presentation"
      },
      key: 15
    }, [api_element("h3", {
      attrs: {
        "role": "presentation",
        "title": item.label
      },
      key: 14
    }, [api_dynamic(item.label)])])]) : null, api_iterator(item.items, function (groupItem) {
      return api_element("li", {
        classMap: {
          "slds-listbox__item": true
        },
        attrs: {
          "role": "presentation"
        },
        key: api_key(18, groupItem.value)
      }, [api_custom_element("lightning-base-combobox-item", _lightningBaseComboboxItem, {
        classMap: {
          "slds-media": true,
          "slds-listbox__option": true,
          "slds-media_center": true
        },
        attrs: {
          "data-item-id": groupItem.id,
          "data-value": groupItem.value
        },
        props: {
          "role": "option",
          "item": groupItem,
          "id": api_scoped_id(groupItem.id),
          "ariaChecked": groupItem.checked
        },
        key: 17,
        on: {
          "mouseenter": _m8 || ($ctx._m8 = api_bind($cmp.handleOptionMouseEnter))
        }
      }, [])]);
    })])) : null];
  }), $cmp.showDropdownActivityIndicator ? api_element("div", {
    classMap: {
      "slds-listbox__item": true
    },
    attrs: {
      "role": "presentation"
    },
    key: 25
  }, [api_element("div", {
    classMap: {
      "slds-align_absolute-center": true,
      "slds-p-top_medium": true
    },
    key: 24
  }, [api_element("div", {
    classMap: {
      "slds-spinner": true,
      "slds-spinner_x-small": true,
      "slds-spinner_inline": true
    },
    attrs: {
      "role": "status"
    },
    key: 23
  }, [api_element("span", {
    classMap: {
      "slds-assistive-text": true
    },
    key: 20
  }, [api_dynamic($cmp.i18n.loadingText)]), api_element("div", {
    classMap: {
      "slds-spinner__dot-a": true
    },
    key: 21
  }, []), api_element("div", {
    classMap: {
      "slds-spinner__dot-b": true
    },
    key: 22
  }, [])])])]) : null, $cmp.showAttribution ? api_element("div", {
    classMap: {
      "slds-align_absolute-center": true
    },
    key: 27
  }, [api_element("img", {
    classMap: {
      "slds-inline-logo": true
    },
    attrs: {
      "src": $cmp.attributionLogoUrl,
      "alt": $cmp.attributionLogoAssistiveText,
      "title": $cmp.attributionLogoAssistiveText
    },
    key: 26
  }, [])]) : null]) : [])])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-baseCombobox_baseCombobox-host",
  shadowAttribute: "lightning-baseCombobox_baseCombobox"
};
