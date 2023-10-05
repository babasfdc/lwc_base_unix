import _implicitStylesheets from "./primitiveDatatableIeditPanel.css";

import _lightningPrimitiveDatatableIeditInputWrapper from "lightning/primitiveDatatableIeditInputWrapper";
import _lightningPrimitiveDatatableIeditTypeFactory from "lightning/primitiveDatatableIeditTypeFactory";
import _lightningInput from "lightning/input";
import _lightningButton from "lightning/button";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    b: api_bind,
    h: api_element,
    k: api_key,
    c: api_custom_element
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
    _m16
  } = $ctx;
  return [$cmp.visible ? api_element("section", {
    classMap: {
      "slds-popover": true,
      "slds-popover_edit": true
    },
    style: $cmp.computedStyle,
    attrs: {
      "role": "dialog",
      "tabindex": "-1"
    },
    key: 12,
    on: {
      "blur": _m14 || ($ctx._m14 = api_bind($cmp.handleTypeElemBlur)),
      "focus": _m15 || ($ctx._m15 = api_bind($cmp.handleTypeElemFocus)),
      "keydown": _m16 || ($ctx._m16 = api_bind($cmp.handleCellKeydown))
    }
  }, [api_element("span", {
    classMap: {
      "inline-edit-form-start": true
    },
    attrs: {
      "tabindex": "0"
    },
    key: 0,
    on: {
      "focus": _m0 || ($ctx._m0 = api_bind($cmp.handleFormStartFocus))
    }
  }, []), api_element("div", {
    classMap: {
      "slds-popover__body": true
    },
    key: 6
  }, [api_element("form", {
    props: {
      "noValidate": true
    },
    key: 5,
    on: {
      "submit": _m6 || ($ctx._m6 = api_bind($cmp.handleEditFormSubmit))
    }
  }, [api_custom_element("lightning-primitive-datatable-iedit-input-wrapper", _lightningPrimitiveDatatableIeditInputWrapper, {
    classMap: {
      "slds-grid": true,
      "slds-p-left_xx-small": true
    },
    props: {
      "required": $cmp.required
    },
    key: 2
  }, [api_custom_element("lightning-primitive-datatable-iedit-type-factory", _lightningPrimitiveDatatableIeditTypeFactory, {
    classMap: {
      "dt-type-edit-factory": true,
      "slds-col": true
    },
    props: {
      "required": $cmp.required,
      "columnDef": $cmp.columnDef,
      "editedValue": $cmp.editedValue
    },
    key: api_key(1, $cmp.inputKey),
    on: {
      "blur": _m1 || ($ctx._m1 = api_bind($cmp.handleTypeElemBlur)),
      "focus": _m2 || ($ctx._m2 = api_bind($cmp.handleTypeElemFocus))
    }
  }, [])]), $cmp.isMassEditEnabled ? api_custom_element("lightning-input", _lightningInput, {
    attrs: {
      "data-mass-selection": "true"
    },
    props: {
      "type": "checkbox",
      "name": "dt-iedit-mass-edit",
      "label": $cmp.massEditCheckboxLabel
    },
    key: 3,
    on: {
      "change": _m3 || ($ctx._m3 = api_bind($cmp.handleMassCheckboxChange)),
      "blur": _m4 || ($ctx._m4 = api_bind($cmp.handleTypeElemBlur)),
      "focus": _m5 || ($ctx._m5 = api_bind($cmp.handleTypeElemFocus))
    }
  }, []) : null, !$cmp.isMassEditEnabled ? api_element("button", {
    classMap: {
      "slds-hide": true
    },
    attrs: {
      "type": "submit",
      "aria-hidden": "true",
      "tabindex": "-1",
      "value": "save"
    },
    key: 4
  }, []) : null])]), $cmp.isMassEditEnabled ? api_element("div", {
    classMap: {
      "slds-popover__footer": true
    },
    key: 10
  }, [api_element("div", {
    classMap: {
      "slds-grid": true,
      "slds-grid_align-end": true
    },
    key: 9
  }, [api_custom_element("lightning-button", _lightningButton, {
    props: {
      "label": $cmp.cancelLabel
    },
    key: 7,
    on: {
      "blur": _m7 || ($ctx._m7 = api_bind($cmp.handleTypeElemBlur)),
      "focus": _m8 || ($ctx._m8 = api_bind($cmp.handleTypeElemFocus)),
      "click": _m9 || ($ctx._m9 = api_bind($cmp.cancelEdition))
    }
  }, []), api_custom_element("lightning-button", _lightningButton, {
    styleMap: {
      "marginLeft": ".25rem"
    },
    attrs: {
      "data-form-last-element": "true"
    },
    props: {
      "label": $cmp.applyLabel,
      "variant": "brand"
    },
    key: 8,
    on: {
      "blur": _m10 || ($ctx._m10 = api_bind($cmp.handleTypeElemBlur)),
      "focus": _m11 || ($ctx._m11 = api_bind($cmp.handleTypeElemFocus)),
      "click": _m12 || ($ctx._m12 = api_bind($cmp.processSubmission))
    }
  }, [])])]) : null, api_element("div", {
    classMap: {
      "inline-edit-form-end": true
    },
    attrs: {
      "tabindex": "0"
    },
    key: 11,
    on: {
      "focus": _m13 || ($ctx._m13 = api_bind($cmp.handleFormEndsFocus))
    }
  }, [])]) : null];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-primitiveDatatableIeditPanel_primitiveDatatableIeditPanel-host",
  shadowAttribute: "lightning-primitiveDatatableIeditPanel_primitiveDatatableIeditPanel"
};
