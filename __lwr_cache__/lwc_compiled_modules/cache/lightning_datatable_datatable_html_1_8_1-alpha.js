import _implicitStylesheets from "./datatable.css";

import _lightningPrimitiveDatatableIeditPanel from "lightning/primitiveDatatableIeditPanel";
import _lightningPrimitiveHeaderFactory from "lightning/primitiveHeaderFactory";
import _lightningPrimitiveCellCheckbox from "lightning/primitiveCellCheckbox";
import _lightningPrimitiveCellFactory from "lightning/primitiveCellFactory";
import _lightningPrimitiveDatatableLoadingIndicator from "lightning/primitiveDatatableLoadingIndicator";
import _lightningPrimitiveDatatableStatusBar from "lightning/primitiveDatatableStatusBar";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    d: api_dynamic,
    h: api_element,
    b: api_bind,
    c: api_custom_element,
    k: api_key,
    ti: api_tab_index,
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
    _m12
  } = $ctx;
  return [api_element("span", {
    attrs: {
      "aria-live": "assertive"
    },
    key: 2
  }, [api_element("span", {
    className: $cmp.computedAriaLiveClassForNavMode,
    key: 0
  }, [api_dynamic($cmp.ariaLiveNavigationModeText)]), api_element("span", {
    className: $cmp.computedAriaLiveClassForActionMode,
    key: 1
  }, [api_dynamic($cmp.ariaLiveActionModeText)])]), api_element("div", {
    classMap: {
      "dt-width-observer": true
    },
    styleMap: {
      "width": "100%",
      "height": "0px"
    },
    context: {
      lwc: {
        dom: "manual"
      }
    },
    key: 3
  }, []), api_element("div", {
    styleMap: {
      "height": "100%",
      "position": "relative"
    },
    key: 26
  }, [api_custom_element("lightning-primitive-datatable-iedit-panel", _lightningPrimitiveDatatableIeditPanel, {
    attrs: {
      "data-iedit-panel": "true"
    },
    props: {
      "visible": $cmp.state.inlineEdit.isPanelVisible,
      "rowKeyValue": $cmp.state.inlineEdit.rowKeyValue,
      "colKeyValue": $cmp.state.inlineEdit.colKeyValue,
      "editedValue": $cmp.state.inlineEdit.editedValue,
      "columnDef": $cmp.state.inlineEdit.columnDef,
      "isMassEditEnabled": $cmp.state.inlineEdit.massEditEnabled,
      "numberOfSelectedRows": $cmp.state.inlineEdit.massEditSelectedRows
    },
    key: 4,
    on: {
      "ieditfinished": _m0 || ($ctx._m0 = api_bind($cmp.handleInlineEditFinish)),
      "masscheckboxchange": _m1 || ($ctx._m1 = api_bind($cmp.handleMassCheckboxChange))
    }
  }, []), api_element("div", {
    className: $cmp.computedTableContainerClass,
    style: $cmp.scrollerXStyles,
    key: 24,
    on: {
      "scroll": _m10 || ($ctx._m10 = api_bind($cmp.handleHorizontalScroll))
    }
  }, [api_element("div", {
    classMap: {
      "slds-scrollable_y": true
    },
    style: $cmp.computedScrollerStyle,
    key: 23,
    on: {
      "scroll": _m9 || ($ctx._m9 = api_bind($cmp.handleVerticalScroll))
    }
  }, [api_element("div", {
    key: 22
  }, [api_element("table", {
    className: $cmp.computedTableClass,
    style: $cmp.computedTableStyle,
    attrs: {
      "role": $cmp.computedTableRole
    },
    key: 21,
    on: {
      "keydown": _m5 || ($ctx._m5 = api_bind($cmp.handleTableKeydown)),
      "click": _m6 || ($ctx._m6 = api_bind($cmp.handleCellClick)),
      "focusin": _m7 || ($ctx._m7 = api_bind($cmp.handleTableFocusIn)),
      "focusout": _m8 || ($ctx._m8 = api_bind($cmp.handleTableFocusOut))
    }
  }, [$cmp.hasValidKeyField ? api_element("thead", {
    className: $cmp.computedTableHeaderClass,
    key: 9
  }, [api_element("tr", {
    classMap: {
      "slds-line-height_reset": true
    },
    key: 8,
    on: {
      "privateresizestart": _m2 || ($ctx._m2 = api_bind($cmp.handleResizeStart)),
      "privateresizeend": _m3 || ($ctx._m3 = api_bind($cmp.handleResizeEnd))
    }
  }, api_iterator($cmp.state.columns, function (def, colIndex) {
    return api_element("th", {
      style: def.style,
      attrs: {
        "scope": "col",
        "tabindex": api_tab_index(def.tabIndex),
        "aria-label": def.ariaLabel,
        "aria-sort": def.sortAriaLabel
      },
      key: api_key(7, def.colKeyValue)
    }, [def.fixedWidth ? api_custom_element("lightning-primitive-header-factory", _lightningPrimitiveHeaderFactory, {
      style: def.style,
      props: {
        "def": def,
        "dtContextId": $cmp.privateDatatableId,
        "rowKeyValue": "HEADER",
        "colKeyValue": def.colKeyValue,
        "hasFocus": def.hasFocus,
        "columnWidth": def.columnWidth,
        "colIndex": colIndex,
        "sortable": def.sortable,
        "sorted": def.sorted,
        "sortedDirection": def.sortedDirection,
        "showCheckbox": $cmp.showSelectAllCheckbox,
        "actions": def.actions
      },
      key: api_key(5, def.colKeyValue)
    }, []) : null, !def.fixedWidth ? api_custom_element("lightning-primitive-header-factory", _lightningPrimitiveHeaderFactory, {
      style: def.style,
      props: {
        "def": def,
        "dtContextId": $cmp.privateDatatableId,
        "rowKeyValue": "HEADER",
        "colKeyValue": def.colKeyValue,
        "colIndex": colIndex,
        "resizable": $cmp.hasResizebleColumns,
        "sortable": def.sortable,
        "sorted": def.sorted,
        "sortedDirection": def.sortedDirection,
        "hasFocus": def.hasFocus,
        "columnWidth": def.columnWidth,
        "resizestep": $cmp.state.resizeStep,
        "actions": def.actions
      },
      key: api_key(6, def.colKeyValue)
    }, []) : null]);
  }))]) : null, $cmp.hasValidKeyField ? api_element("tbody", {
    style: $cmp.computedTbodyStyle,
    key: 20
  }, api_flatten([api_iterator($cmp.state.rows, function (row, rowIndex) {
    return api_element("tr", {
      className: row.classnames,
      attrs: {
        "data-row-key-value": row.key,
        "aria-selected": row.ariaSelected,
        "aria-level": row.level,
        "aria-expanded": row.isExpanded,
        "aria-setsize": row.setSize,
        "aria-posinset": row.posInSet,
        "tabindex": api_tab_index(row.tabIndex)
      },
      key: api_key(16, row.key),
      on: {
        "keydown": _m4 || ($ctx._m4 = api_bind($cmp.handleTrRowKeyDown))
      }
    }, api_iterator(row.cells, function (cell) {
      return [cell.isCheckbox ? api_element("td", {
        className: cell.class,
        attrs: {
          "role": "gridcell",
          "tabindex": api_tab_index(cell.tabIndex),
          "data-label": cell.dataLabel
        },
        key: api_key(11, cell.colKeyValue)
      }, [api_custom_element("lightning-primitive-cell-checkbox", _lightningPrimitiveCellCheckbox, {
        attrs: {
          "data-label": cell.dataLabel
        },
        props: {
          "dtContextId": $cmp.privateDatatableId,
          "hasFocus": cell.hasFocus,
          "rowKeyValue": row.key,
          "colKeyValue": cell.colKeyValue,
          "rowIndex": rowIndex,
          "type": row.inputType,
          "isSelected": row.isSelected,
          "isDisabled": row.isDisabled
        },
        key: api_key(10, cell.key)
      }, [])]) : null, cell.isDataTypeScope ? api_element("th", {
        className: cell.class,
        style: cell.paddingStyle,
        attrs: {
          "aria-selected": cell.ariaSelected,
          "scope": "row",
          "tabindex": api_tab_index(cell.tabIndex),
          "data-label": cell.dataLabel
        },
        key: api_key(13, cell.colKeyValue)
      }, [api_custom_element("lightning-primitive-cell-factory", _lightningPrimitiveCellFactory, {
        attrs: {
          "data-label": cell.dataLabel
        },
        props: {
          "types": $cmp.privateTypes,
          "ariaSelected": cell.ariaSelected,
          "alignment": cell.alignment,
          "hasError": cell.hasError,
          "hasFocus": cell.hasFocus,
          "columnLabel": cell.dataLabel,
          "columnType": cell.columnType,
          "columnSubType": cell.columnSubType,
          "wrapText": cell.wrapText,
          "wrapTextMaxLines": cell.wrapTextMaxLines,
          "rowKeyValue": row.key,
          "colKeyValue": cell.colKeyValue,
          "value": cell.value,
          "iconName": cell.iconName,
          "iconLabel": cell.iconLabel,
          "iconPosition": cell.iconPosition,
          "iconAlternativeText": cell.iconAlternativeText,
          "editable": cell.editable,
          "typeAttribute0": cell.typeAttribute0,
          "typeAttribute1": cell.typeAttribute1,
          "typeAttribute2": cell.typeAttribute2,
          "typeAttribute3": cell.typeAttribute3,
          "typeAttribute4": cell.typeAttribute4,
          "typeAttribute5": cell.typeAttribute5,
          "typeAttribute6": cell.typeAttribute6,
          "typeAttribute7": cell.typeAttribute7,
          "typeAttribute8": cell.typeAttribute8,
          "typeAttribute9": cell.typeAttribute9,
          "typeAttribute10": cell.typeAttribute10,
          "typeAttribute21": cell.typeAttribute21,
          "typeAttribute22": cell.typeAttribute22
        },
        key: api_key(12, cell.columnType)
      }, [])]) : null, cell.isDataType ? api_element("td", {
        className: cell.class,
        style: cell.paddingStyle,
        attrs: {
          "aria-selected": cell.ariaSelected,
          "role": "gridcell",
          "tabindex": api_tab_index(cell.tabIndex),
          "data-label": cell.dataLabel
        },
        key: api_key(15, cell.colKeyValue)
      }, [api_custom_element("lightning-primitive-cell-factory", _lightningPrimitiveCellFactory, {
        attrs: {
          "data-label": cell.dataLabel
        },
        props: {
          "types": $cmp.privateTypes,
          "ariaSelected": cell.ariaSelected,
          "role": "gridcell",
          "alignment": cell.alignment,
          "hasFocus": cell.hasFocus,
          "hasError": cell.hasError,
          "columnLabel": cell.dataLabel,
          "columnType": cell.columnType,
          "columnSubType": cell.columnSubType,
          "wrapText": cell.wrapText,
          "wrapTextMaxLines": cell.wrapTextMaxLines,
          "rowKeyValue": row.key,
          "colKeyValue": cell.colKeyValue,
          "value": cell.value,
          "iconName": cell.iconName,
          "iconLabel": cell.iconLabel,
          "iconPosition": cell.iconPosition,
          "iconAlternativeText": cell.iconAlternativeText,
          "editable": cell.editable,
          "typeAttribute0": cell.typeAttribute0,
          "typeAttribute1": cell.typeAttribute1,
          "typeAttribute2": cell.typeAttribute2,
          "typeAttribute3": cell.typeAttribute3,
          "typeAttribute4": cell.typeAttribute4,
          "typeAttribute5": cell.typeAttribute5,
          "typeAttribute6": cell.typeAttribute6,
          "typeAttribute7": cell.typeAttribute7,
          "typeAttribute8": cell.typeAttribute8,
          "typeAttribute9": cell.typeAttribute9,
          "typeAttribute10": cell.typeAttribute10,
          "typeAttribute21": cell.typeAttribute21,
          "typeAttribute22": cell.typeAttribute22
        },
        key: api_key(14, cell.columnType)
      }, [])]) : null];
    }));
  }), $cmp.isLoading ? api_element("tr", {
    key: 19
  }, [api_element("td", {
    classMap: {
      "slds-is-relative": true
    },
    attrs: {
      "colspan": $cmp.numberOfColumns
    },
    key: 18
  }, [api_custom_element("lightning-primitive-datatable-loading-indicator", _lightningPrimitiveDatatableLoadingIndicator, {
    key: 17
  }, [])])]) : null])) : null])])])]), $cmp.showStatusBar ? api_custom_element("lightning-primitive-datatable-status-bar", _lightningPrimitiveDatatableStatusBar, {
    props: {
      "error": $cmp.tableError
    },
    key: 25,
    on: {
      "privatesave": _m11 || ($ctx._m11 = api_bind($cmp.handleInlineEditSave)),
      "privatecancel": _m12 || ($ctx._m12 = api_bind($cmp.handleInlineEditCancel))
    }
  }, []) : null])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-datatable_datatable-host",
  shadowAttribute: "lightning-datatable_datatable"
};
