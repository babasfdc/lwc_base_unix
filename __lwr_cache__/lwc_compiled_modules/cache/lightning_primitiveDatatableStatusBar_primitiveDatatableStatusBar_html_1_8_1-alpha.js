import _implicitStylesheets from "./primitiveDatatableStatusBar.css";

import _lightningPrimitiveDatatableTooltip from "lightning/primitiveDatatableTooltip";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    c: api_custom_element,
    d: api_dynamic,
    b: api_bind,
    h: api_element
  } = $api;
  const {
    _m0,
    _m1
  } = $ctx;
  return [api_element("div", {
    classMap: {
      "slds-docked-form-footer": true,
      "slds-is-absolute": true
    },
    key: 4
  }, [api_element("div", {
    classMap: {
      "slds-grid": true,
      "slds-grid_align-center": true
    },
    key: 3
  }, [$cmp.showError ? api_custom_element("lightning-primitive-datatable-tooltip", _lightningPrimitiveDatatableTooltip, {
    classMap: {
      "slds-button": true
    },
    props: {
      "size": "small",
      "variant": "error",
      "header": $cmp.error.title,
      "content": $cmp.error.messages,
      "alternativeText": $cmp.i18n.error,
      "offset": $cmp.bubbleOffset
    },
    key: 0
  }, []) : null, api_element("button", {
    classMap: {
      "slds-button": true,
      "slds-button_neutral": true
    },
    attrs: {
      "type": "button"
    },
    key: 1,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.handleCancelButtonClick))
    }
  }, [api_dynamic($cmp.i18n.cancel)]), api_element("button", {
    classMap: {
      "slds-button": true,
      "slds-button_brand": true,
      "save-btn": true
    },
    attrs: {
      "type": "button"
    },
    key: 2,
    on: {
      "click": _m1 || ($ctx._m1 = api_bind($cmp.handleSaveButtonClick))
    }
  }, [api_dynamic($cmp.i18n.save)])])])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-primitiveDatatableStatusBar_primitiveDatatableStatusBar-host",
  shadowAttribute: "lightning-primitiveDatatableStatusBar_primitiveDatatableStatusBar"
};
