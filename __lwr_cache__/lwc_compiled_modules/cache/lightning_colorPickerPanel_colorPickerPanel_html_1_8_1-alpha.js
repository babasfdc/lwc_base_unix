import _implicitStylesheets from "./colorPickerPanel.css";

import _lightningColorPickerCustom from "lightning/colorPickerCustom";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    c: api_custom_element,
    gid: api_scoped_id,
    h: api_element,
    d: api_dynamic,
    b: api_bind
  } = $api;
  const {
    _m0,
    _m1,
    _m2,
    _m3
  } = $ctx;
  return [api_element("section", {
    classMap: {
      "slds-popover": true,
      "slds-color-picker__selector": true,
      "slds-show": true,
      "slds-is-absolute": true
    },
    attrs: {
      "role": "dialog",
      "aria-label": "Choose a color",
      "aria-describedby": `${api_scoped_id("dialog-body-id")}`
    },
    key: 6,
    on: {
      "updateselectedcolor": _m2 || ($ctx._m2 = api_bind($cmp.handleUpdateSelectedColor)),
      "keydown": _m3 || ($ctx._m3 = api_bind($cmp.handleKeydown))
    }
  }, [api_element("div", {
    classMap: {
      "slds-popover__body": true
    },
    attrs: {
      "id": api_scoped_id("dialog-body-id")
    },
    key: 1
  }, [api_custom_element("lightning-color-picker-custom", _lightningColorPickerCustom, {
    props: {
      "currentColor": $cmp.currentColor
    },
    key: 0
  }, [])]), api_element("footer", {
    classMap: {
      "slds-popover__footer": true
    },
    key: 5
  }, [api_element("div", {
    classMap: {
      "slds-color-picker__selector-footer": true
    },
    key: 4
  }, [api_element("button", {
    classMap: {
      "slds-button": true,
      "slds-button_neutral": true
    },
    attrs: {
      "name": "cancel"
    },
    key: 2,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.handleCancelClick))
    }
  }, [api_dynamic($cmp.i18n.cancelButton)]), api_element("button", {
    classMap: {
      "slds-button": true,
      "slds-button_brand": true
    },
    attrs: {
      "name": "done"
    },
    key: 3,
    on: {
      "click": _m1 || ($ctx._m1 = api_bind($cmp.handleDoneClick))
    }
  }, [api_dynamic($cmp.i18n.doneButton)])])])])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-colorPickerPanel_colorPickerPanel-host",
  shadowAttribute: "lightning-colorPickerPanel_colorPickerPanel"
};
