import _implicitStylesheets from "./menuItem.css";

import _lightningPrimitiveIcon from "lightning/primitiveIcon";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    c: api_custom_element,
    t: api_text,
    h: api_element,
    d: api_dynamic,
    ti: api_tab_index,
    b: api_bind
  } = $api;
  const {
    _m0,
    _m1,
    _m2,
    _m3
  } = $ctx;
  return [api_element("a", {
    attrs: {
      "href": $cmp.computedHref,
      "target": $cmp._target,
      "role": $cmp.computedRole,
      "tabindex": api_tab_index($cmp.computedTabIndex),
      "accesskey": $cmp.computedAccessKey,
      "aria-checked": $cmp.computedAriaChecked,
      "aria-disabled": $cmp.computedAriaDisabled,
      "download": $cmp.download
    },
    key: 5,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.handleClick)),
      "focus": _m1 || ($ctx._m1 = api_bind($cmp.handleFocus)),
      "keydown": _m2 || ($ctx._m2 = api_bind($cmp.handleKeyDown)),
      "blur": _m3 || ($ctx._m3 = api_bind($cmp.handleBlur))
    }
  }, [api_element("span", {
    classMap: {
      "slds-truncate": true
    },
    key: 3
  }, [$cmp.isMenuItemCheckbox ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": "utility:check",
      "size": "x-small",
      "svgClass": $cmp.computedCheckedIconClass,
      "variant": "bare"
    },
    key: 0
  }, []) : null, $cmp.isDraft ? api_element("abbr", {
    classMap: {
      "slds-indicator_unsaved": true
    },
    attrs: {
      "title": $cmp.draftAlternativeText
    },
    key: 1
  }, [api_text("*")]) : null, $cmp.prefixIconName ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": $cmp.prefixIconName,
      "size": "x-small",
      "svgClass": "slds-icon slds-icon_x-small slds-icon-text-default slds-m-right_x-small",
      "variant": "bare"
    },
    key: 2
  }, []) : null, api_dynamic($cmp.label)]), $cmp.iconName ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": $cmp.iconName,
      "size": "x-small",
      "svgClass": "slds-icon-text-default slds-m-left_small slds-shrink-none",
      "variant": "bare"
    },
    key: 4
  }, []) : null])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-menuItem_menuItem-host",
  shadowAttribute: "lightning-menuItem_menuItem"
};
