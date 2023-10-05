import _implicitStylesheets from "./sortableHeader.css";

import _lightningIcon from "lightning/icon";
import _lightningPrimitiveIcon from "lightning/primitiveIcon";
import _lightningPrimitiveHeaderActions from "lightning/primitiveHeaderActions";
import _lightningPrimitiveResizeHandler from "lightning/primitiveResizeHandler";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    d: api_dynamic,
    h: api_element,
    c: api_custom_element,
    ti: api_tab_index,
    b: api_bind
  } = $api;
  const {
    _m0
  } = $ctx;
  return [api_element("span", {
    className: $cmp.computedClass,
    style: $cmp.columnStyles,
    attrs: {
      "tabindex": api_tab_index($cmp.internalTabIndex)
    },
    key: 11
  }, [api_element("a", {
    className: $cmp.computedSortClass,
    style: $cmp.columnStyles,
    attrs: {
      "href": "javascript:void(0);",
      "role": $cmp.headerRole,
      "tabindex": api_tab_index($cmp.internalTabIndex),
      "data-navigation": "enable",
      "data-action-triggers": "enter"
    },
    key: 7,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.handleSortingClick))
    }
  }, [api_element("span", {
    classMap: {
      "slds-assistive-text": true
    },
    key: 0
  }, [api_dynamic($cmp.i18n.sort)]), $cmp.def.iconName ? api_element("div", {
    classMap: {
      "slds-grid": true,
      "slds-grid_vertical-align-center": true,
      "slds-has-flexi-truncate": true
    },
    key: 4
  }, [api_custom_element("lightning-icon", _lightningIcon, {
    classMap: {
      "slds-icon_container": true,
      "slds-m-right_xx-small": true
    },
    props: {
      "iconName": $cmp.def.iconName,
      "size": "x-small"
    },
    key: 1
  }, []), api_element("span", {
    classMap: {
      "slds-truncate": true
    },
    attrs: {
      "title": $cmp.def.label
    },
    key: 2
  }, [api_dynamic($cmp.def.label)]), api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    classMap: {
      "slds-icon_container": true
    },
    props: {
      "svgClass": "slds-icon slds-icon-text-default slds-is-sortable__icon",
      "iconName": "utility:arrowdown",
      "size": "x-small"
    },
    key: 3
  }, [])]) : null, !$cmp.def.iconName ? api_element("span", {
    classMap: {
      "slds-truncate": true
    },
    attrs: {
      "title": $cmp.def.label
    },
    key: 5
  }, [api_dynamic($cmp.def.label)]) : null, !$cmp.def.iconName ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    classMap: {
      "slds-icon_container": true
    },
    props: {
      "svgClass": "slds-icon slds-icon-text-default slds-is-sortable__icon",
      "iconName": "utility:arrowdown",
      "size": "x-small"
    },
    key: 6
  }, []) : null]), api_element("span", {
    classMap: {
      "slds-assistive-text": true
    },
    attrs: {
      "aria-live": "assertive",
      "aria-atomic": "true"
    },
    key: 8
  }, [api_dynamic($cmp.sortedOrderLabel)]), $cmp.hasActions ? api_custom_element("lightning-primitive-header-actions", _lightningPrimitiveHeaderActions, {
    attrs: {
      "data-navigation": "enable"
    },
    props: {
      "colKeyValue": $cmp.def.colKeyValue,
      "actions": $cmp.actions,
      "tabIndex": api_tab_index($cmp.internalTabIndex)
    },
    key: 9
  }, []) : null, $cmp.isResizable ? api_custom_element("lightning-primitive-resize-handler", _lightningPrimitiveResizeHandler, {
    classMap: {
      "slds-resizable": true
    },
    attrs: {
      "data-navigation": "enable"
    },
    props: {
      "value": $cmp.columnWidth,
      "minWidth": $cmp.def.minWidth,
      "maxWidth": $cmp.def.maxWidth,
      "internalTabIndex": $cmp.internalTabIndex,
      "label": $cmp.def.label,
      "tabIndex": api_tab_index($cmp.internalTabIndex),
      "colIndex": $cmp.colIndex,
      "step": $cmp.resizeStep
    },
    key: 10
  }, []) : null])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-primitiveHeaderFactory_sortableHeader-host",
  shadowAttribute: "lightning-primitiveHeaderFactory_sortableHeader"
};
