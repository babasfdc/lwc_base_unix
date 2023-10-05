import _implicitStylesheets from "./cellWithStandardLayout.css";

import _lightningPrimitiveTreegridCellToggle from "lightning/primitiveTreegridCellToggle";
import _lightningIcon from "lightning/icon";
import _lightningPrimitiveCellActions from "lightning/primitiveCellActions";
import _lightningPrimitiveCellButton from "lightning/primitiveCellButton";
import _lightningPrimitiveIcon from "lightning/primitiveIcon";
import _lightningFormattedNumber from "lightning/formattedNumber";
import _lightningPrimitiveCustomCell from "lightning/primitiveCustomCell";
import _lightningFormattedDateTime from "lightning/formattedDateTime";
import _lightningFormattedEmail from "lightning/formattedEmail";
import _lightningFormattedLocation from "lightning/formattedLocation";
import _lightningFormattedPhone from "lightning/formattedPhone";
import _lightningPrimitiveDatatableTooltip from "lightning/primitiveDatatableTooltip";
import _lightningBaseFormattedText from "lightning/baseFormattedText";
import _lightningFormattedUrl from "lightning/formattedUrl";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    ti: api_tab_index,
    c: api_custom_element,
    t: api_text,
    d: api_dynamic,
    h: api_element,
    b: api_bind
  } = $api;
  const {
    _m0
  } = $ctx;
  return [api_element("span", {
    className: $cmp.computedWrapperClass,
    key: 24
  }, [api_element("div", {
    className: $cmp.computedCellDivClass,
    style: $cmp.computedCssStyles,
    key: 20
  }, [$cmp.hasTreeData ? api_custom_element("lightning-primitive-treegrid-cell-toggle", _lightningPrimitiveTreegridCellToggle, {
    attrs: {
      "data-navigation": "enable"
    },
    props: {
      "rowKeyValue": $cmp.rowKeyValue,
      "colKeyValue": $cmp.colKeyValue,
      "value": $cmp.value,
      "hasChildren": $cmp.typeAttribute21,
      "isExpanded": $cmp.typeAttribute22,
      "tabIndex": api_tab_index($cmp.internalTabIndex)
    },
    key: 0
  }, []) : null, $cmp.hasLeftIcon ? api_custom_element("lightning-icon", _lightningIcon, {
    props: {
      "iconName": $cmp.iconName,
      "size": "x-small",
      "alternativeText": $cmp.iconAlternativeText
    },
    key: 1
  }, []) : null, $cmp.hasLeftIcon ? api_text("\xA0 ") : null, $cmp.hasLeftIcon ? api_dynamic($cmp.iconLabel) : null, $cmp.hasLeftIcon ? api_text(" \xA0") : null, $cmp.isAction ? api_custom_element("lightning-primitive-cell-actions", _lightningPrimitiveCellActions, {
    attrs: {
      "data-navigation": "enable",
      "data-action-triggers": "enter,space"
    },
    props: {
      "rowKeyValue": $cmp.rowKeyValue,
      "colKeyValue": $cmp.colKeyValue,
      "tabIndex": api_tab_index($cmp.internalTabIndex),
      "menuAlignment": $cmp.typeAttribute0,
      "rowActions": $cmp.typeAttribute1
    },
    key: 2
  }, []) : null, $cmp.isButton ? api_custom_element("lightning-primitive-cell-button", _lightningPrimitiveCellButton, {
    attrs: {
      "data-navigation": "enable",
      "data-action-triggers": "enter,space"
    },
    props: {
      "rowKeyValue": $cmp.rowKeyValue,
      "colKeyValue": $cmp.colKeyValue,
      "variant": $cmp.typeAttribute0,
      "label": $cmp.typeAttribute1,
      "iconName": $cmp.typeAttribute2,
      "iconPosition": $cmp.typeAttribute3,
      "disabled": $cmp.typeAttribute4,
      "buttonName": $cmp.typeAttribute5,
      "buttonClass": $cmp.typeAttribute6,
      "buttonTitle": $cmp.typeAttribute7,
      "tabIndex": api_tab_index($cmp.internalTabIndex),
      "internalTabIndex": $cmp.internalTabIndex
    },
    key: 3
  }, []) : null, $cmp.isButtonIcon ? api_custom_element("lightning-primitive-cell-button", _lightningPrimitiveCellButton, {
    attrs: {
      "data-navigation": "enable",
      "data-action-triggers": "enter,space"
    },
    props: {
      "type": "button-icon",
      "rowKeyValue": $cmp.rowKeyValue,
      "colKeyValue": $cmp.colKeyValue,
      "variant": $cmp.typeAttribute0,
      "alternativeText": $cmp.typeAttribute1,
      "iconName": $cmp.typeAttribute2,
      "iconClass": $cmp.typeAttribute3,
      "disabled": $cmp.typeAttribute4,
      "buttonName": $cmp.typeAttribute5,
      "buttonClass": $cmp.typeAttribute6,
      "buttonTitle": $cmp.typeAttribute7,
      "tabIndex": api_tab_index($cmp.internalTabIndex),
      "internalTabIndex": $cmp.internalTabIndex
    },
    key: 4
  }, []) : null, $cmp.isBoolean ? $cmp.isChecked ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "size": "x-small",
      "iconName": "utility:check"
    },
    key: 5
  }, []) : null : null, $cmp.isCurrency ? api_custom_element("lightning-formatted-number", _lightningFormattedNumber, {
    props: {
      "value": $cmp.value,
      "formatStyle": "currency",
      "currencyCode": $cmp.typeAttribute0,
      "currencyDisplayAs": $cmp.typeAttribute1,
      "minimumIntegerDigits": $cmp.typeAttribute2,
      "minimumFractionDigits": $cmp.typeAttribute3,
      "maximumFractionDigits": $cmp.typeAttribute4,
      "minimumSignificantDigits": $cmp.typeAttribute5,
      "maximumSignificantDigits": $cmp.typeAttribute6
    },
    key: 6
  }, []) : null, $cmp.isCustomType ? api_custom_element("lightning-primitive-custom-cell", _lightningPrimitiveCustomCell, {
    props: {
      "types": $cmp.types,
      "keyboardMode": $cmp.keyboardMode,
      "columnType": $cmp.columnType,
      "columnSubType": $cmp.columnSubType,
      "value": $cmp.value,
      "internalTabIndex": $cmp.internalTabIndex,
      "rowKeyValue": $cmp.rowKeyValue,
      "colKeyValue": $cmp.colKeyValue,
      "wrapText": $cmp.wrapText,
      "alignment": $cmp.alignment,
      "typeAttribute0": $cmp.typeAttribute0,
      "typeAttribute1": $cmp.typeAttribute1,
      "typeAttribute2": $cmp.typeAttribute2,
      "typeAttribute3": $cmp.typeAttribute3,
      "typeAttribute4": $cmp.typeAttribute4,
      "typeAttribute5": $cmp.typeAttribute5,
      "typeAttribute6": $cmp.typeAttribute6,
      "typeAttribute7": $cmp.typeAttribute7,
      "typeAttribute8": $cmp.typeAttribute8,
      "typeAttribute9": $cmp.typeAttribute9,
      "typeAttribute10": $cmp.typeAttribute10
    },
    key: 7
  }, []) : null, $cmp.isDateTime ? api_custom_element("lightning-formatted-date-time", _lightningFormattedDateTime, {
    props: {
      "value": $cmp.dateValue,
      "day": $cmp.typeAttribute0,
      "era": $cmp.typeAttribute1,
      "hour": $cmp.typeAttribute2,
      "hour12": $cmp.typeAttribute3,
      "minute": $cmp.typeAttribute4,
      "month": $cmp.typeAttribute5,
      "second": $cmp.typeAttribute6,
      "timeZone": $cmp.typeAttribute7,
      "timeZoneName": $cmp.typeAttribute8,
      "weekday": $cmp.typeAttribute9,
      "year": $cmp.typeAttribute10
    },
    key: 8
  }, []) : null, $cmp.isDateLocal ? api_custom_element("lightning-formatted-date-time", _lightningFormattedDateTime, {
    props: {
      "value": $cmp.value,
      "day": $cmp.computedDateLocalDay,
      "month": $cmp.computedDateLocalMonth,
      "year": $cmp.computedDateLocalYear,
      "timeZone": "UTC"
    },
    key: 9
  }, []) : null, $cmp.isEmail ? api_custom_element("lightning-formatted-email", _lightningFormattedEmail, {
    attrs: {
      "data-navigation": "enable",
      "data-action-triggers": "enter"
    },
    props: {
      "value": $cmp.value,
      "tabIndex": api_tab_index($cmp.internalTabIndex)
    },
    key: 10
  }, []) : null, $cmp.isLocation ? api_custom_element("lightning-formatted-location", _lightningFormattedLocation, {
    props: {
      "latitude": $cmp.value.latitude,
      "longitude": $cmp.value.longitude
    },
    key: 11
  }, []) : null, $cmp.isNumber ? api_custom_element("lightning-formatted-number", _lightningFormattedNumber, {
    props: {
      "value": $cmp.value,
      "minimumIntegerDigits": $cmp.typeAttribute0,
      "minimumFractionDigits": $cmp.typeAttribute1,
      "maximumFractionDigits": $cmp.typeAttribute2,
      "minimumSignificantDigits": $cmp.typeAttribute3,
      "maximumSignificantDigits": $cmp.typeAttribute4
    },
    key: 12
  }, []) : null, $cmp.isPercent ? api_custom_element("lightning-formatted-number", _lightningFormattedNumber, {
    props: {
      "value": $cmp.value,
      "formatStyle": "percent",
      "minimumIntegerDigits": $cmp.typeAttribute0,
      "minimumFractionDigits": $cmp.typeAttribute1,
      "maximumFractionDigits": $cmp.typeAttribute2,
      "minimumSignificantDigits": $cmp.typeAttribute3,
      "maximumSignificantDigits": $cmp.typeAttribute4
    },
    key: 13
  }, []) : null, $cmp.isPhone ? api_custom_element("lightning-formatted-phone", _lightningFormattedPhone, {
    attrs: {
      "data-navigation": "enable",
      "data-action-triggers": "enter"
    },
    props: {
      "value": $cmp.value,
      "tabIndex": api_tab_index($cmp.internalTabIndex)
    },
    key: 14
  }, []) : null, $cmp.isRowNumber ? api_custom_element("lightning-primitive-datatable-tooltip", _lightningPrimitiveDatatableTooltip, {
    className: $cmp.rowNumberErrorClass,
    attrs: {
      "data-navigation": "enable",
      "data-action-triggers": "enter,space"
    },
    props: {
      "size": "xx-small",
      "header": $cmp.typeAttribute0.title,
      "content": $cmp.typeAttribute0.messages,
      "variant": "error",
      "internalTabIndex": $cmp.internalTabIndex,
      "alternativeText": $cmp.typeAttribute0.alternativeText
    },
    key: 15
  }, []) : null, $cmp.isRowNumber ? api_element("span", {
    classMap: {
      "slds-row-number": true,
      "slds-text-body_small": true,
      "slds-text-color_weak": true
    },
    key: 16
  }, []) : null, $cmp.isText ? api_custom_element("lightning-base-formatted-text", _lightningBaseFormattedText, {
    props: {
      "value": $cmp.value,
      "linkify": $cmp.typeAttribute0
    },
    key: 17
  }, []) : null, $cmp.isUrl ? api_custom_element("lightning-formatted-url", _lightningFormattedUrl, {
    attrs: {
      "data-navigation": "enable",
      "data-action-triggers": "enter"
    },
    props: {
      "value": $cmp.value,
      "tooltip": $cmp.urlTooltip,
      "tabIndex": api_tab_index($cmp.internalTabIndex),
      "label": $cmp.typeAttribute0,
      "target": $cmp.urlTarget
    },
    key: 18
  }, []) : null, $cmp.hasRightIcon ? api_text("\xA0") : null, $cmp.hasRightIcon ? api_custom_element("lightning-icon", _lightningIcon, {
    props: {
      "iconName": $cmp.iconName,
      "size": "x-small",
      "alternativeText": $cmp.iconAlternativeText
    },
    key: 19
  }, []) : null, $cmp.hasRightIcon ? api_text("\xA0 ") : null, $cmp.hasRightIcon ? api_dynamic($cmp.iconLabel) : null]), $cmp.isEditable ? api_element("button", {
    classMap: {
      "slds-button": true,
      "slds-button_icon": true,
      "slds-cell-edit__button": true,
      "slds-m-left_x-small": true
    },
    attrs: {
      "tabindex": api_tab_index($cmp.internalTabIndex),
      "data-navigation": "enable",
      "data-action-triggers": "enter,space",
      "data-action-edit": "true"
    },
    key: 23,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.handleEditButtonClick))
    }
  }, [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": "utility:edit",
      "size": "xx-small",
      "svgClass": "slds-button__icon slds-button__icon_hint slds-button__icon_lock slds-button__icon_small slds-button__icon_edit"
    },
    key: 21
  }, []), api_element("span", {
    classMap: {
      "slds-assistive-text": true
    },
    key: 22
  }, [api_dynamic($cmp.editIconAssistiveText)])]) : null])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-primitiveCellFactory_cellWithStandardLayout-host",
  shadowAttribute: "lightning-primitiveCellFactory_cellWithStandardLayout"
};
