import _implicitStylesheets from "./nonsortableHeader.css";

import _lightningIcon from "lightning/icon";
import _lightningPrimitiveHeaderActions from "lightning/primitiveHeaderActions";
import _lightningPrimitiveResizeHandler from "lightning/primitiveResizeHandler";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    c: api_custom_element,
    d: api_dynamic,
    h: api_element,
    ti: api_tab_index
  } = $api;
  return [api_element("div", {
    className: $cmp.computedClass,
    style: $cmp.columnStyles,
    key: 8
  }, [api_element("span", {
    classMap: {
      "slds-th__action": true
    },
    key: 7
  }, [$cmp.def.iconName ? api_element("div", {
    classMap: {
      "slds-grid": true,
      "slds-grid_vertical-align-center": true,
      "slds-has-flexi-truncate": true
    },
    key: 2
  }, [api_custom_element("lightning-icon", _lightningIcon, {
    classMap: {
      "slds-icon_container": true,
      "slds-m-right_xx-small": true
    },
    props: {
      "iconName": $cmp.def.iconName,
      "size": "x-small"
    },
    key: 0
  }, []), api_element("span", {
    classMap: {
      "slds-truncate": true
    },
    attrs: {
      "title": $cmp.def.label
    },
    key: 1
  }, [api_dynamic($cmp.def.label)])]) : null, !$cmp.def.iconName ? $cmp.def.label ? api_element("span", {
    classMap: {
      "slds-truncate": true
    },
    attrs: {
      "title": $cmp.def.label
    },
    key: 3
  }, [api_dynamic($cmp.def.label)]) : null : null, !$cmp.def.iconName ? !$cmp.def.label ? api_element("span", {
    classMap: {
      "slds-truncate": true
    },
    attrs: {
      "title": $cmp.def.ariaLabel
    },
    key: 4
  }, []) : null : null, $cmp.hasActions ? api_custom_element("lightning-primitive-header-actions", _lightningPrimitiveHeaderActions, {
    attrs: {
      "data-navigation": "enable"
    },
    props: {
      "colKeyValue": $cmp.def.colKeyValue,
      "actions": $cmp.actions,
      "tabIndex": api_tab_index($cmp.internalTabIndex)
    },
    key: 5
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
    key: 6
  }, []) : null])])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-primitiveHeaderFactory_nonsortableHeader-host",
  shadowAttribute: "lightning-primitiveHeaderFactory_nonsortableHeader"
};
