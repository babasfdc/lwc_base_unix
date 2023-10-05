import _implicitStylesheets from "./selectableHeader.css";

import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    gid: api_scoped_id,
    ti: api_tab_index,
    b: api_bind,
    h: api_element,
    d: api_dynamic
  } = $api;
  const {
    _m0
  } = $ctx;
  return [api_element("div", {
    classMap: {
      "slds-th__action": true,
      "slds-th__action_form": true,
      "slds-cell-fixed": true
    },
    style: $cmp.columnStyles,
    key: 6
  }, [$cmp.showCheckbox ? api_element("span", {
    classMap: {
      "slds-checkbox": true
    },
    key: 4
  }, [api_element("input", {
    classMap: {
      "datatable-select-all": true
    },
    attrs: {
      "type": "checkbox",
      "name": $cmp.computedOptionName,
      "id": api_scoped_id("lgt-dt-header-factory-id"),
      "tabindex": api_tab_index($cmp.internalTabIndex),
      "data-navigation": "enable"
    },
    props: {
      "disabled": $cmp.def.isBulkSelectionDisabled
    },
    key: 0,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.handleSelectAllRows))
    }
  }, []), api_element("label", {
    classMap: {
      "slds-checkbox__label": true
    },
    attrs: {
      "for": `${api_scoped_id("lgt-dt-header-factory-id")}`
    },
    key: 3
  }, [api_element("span", {
    classMap: {
      "slds-checkbox_faux": true
    },
    key: 1
  }, []), api_element("span", {
    classMap: {
      "slds-form-element__label": true,
      "slds-assistive-text": true
    },
    key: 2
  }, [api_dynamic($cmp.i18n.selectAll)])])]) : null, !$cmp.showCheckbox ? api_element("span", {
    classMap: {
      "slds-assistive-text": true
    },
    key: 5
  }, [api_dynamic($cmp.i18n.chooseARow)]) : null])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-primitiveHeaderFactory_selectableHeader-host",
  shadowAttribute: "lightning-primitiveHeaderFactory_selectableHeader"
};
