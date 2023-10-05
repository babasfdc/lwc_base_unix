import _implicitStylesheets from "./primitiveDatatableTooltipBubble.css";

import _lightningButtonIcon from "lightning/buttonIcon";
import _lightningPrimitiveIcon from "lightning/primitiveIcon";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    b: api_bind,
    c: api_custom_element,
    h: api_element,
    d: api_dynamic,
    gid: api_scoped_id,
    k: api_key,
    i: api_iterator
  } = $api;
  const {
    _m0,
    _m1,
    _m2,
    _m3
  } = $ctx;
  return [api_element("section", {
    styleMap: {
      "outline": "none"
    },
    attrs: {
      "role": "dialog",
      "aria-describedby": `${api_scoped_id("primitive-datatable-tooltip-bubble-body-id")}`,
      "aria-labelledby": `${api_scoped_id("primitive-datatable-tooltip-bubble-header-id")}`,
      "tabindex": "0"
    },
    key: 11,
    on: {
      "focusout": _m2 || ($ctx._m2 = api_bind($cmp.handleBlur)),
      "keydown": _m3 || ($ctx._m3 = api_bind($cmp.handleBubbleKey))
    }
  }, [!$cmp.hideCloseButton ? api_custom_element("lightning-button-icon", _lightningButtonIcon, {
    classMap: {
      "slds-float_right": true,
      "slds-popover__close": true
    },
    attrs: {
      "data-close": "true"
    },
    props: {
      "iconName": "utility:close",
      "variant": "bare-inverse",
      "size": "small",
      "alternativeText": $cmp.i18n.closeButtonAssistiveText
    },
    key: 0,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.handleCloseButtonClick)),
      "keydown": _m1 || ($ctx._m1 = api_bind($cmp.handleCloseButtonKey))
    }
  }, []) : null, api_element("header", {
    classMap: {
      "slds-popover__header": true
    },
    key: 7
  }, [api_element("div", {
    classMap: {
      "slds-media": true,
      "slds-media_center": true,
      "slds-has-flexi-truncate": true
    },
    key: 6
  }, [api_element("div", {
    classMap: {
      "slds-media__figure": true
    },
    key: 3
  }, [api_element("span", {
    classMap: {
      "slds-icon_container": true,
      "slds-icon-utility-ban": true
    },
    key: 2
  }, [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": $cmp.computedHeaderIconName,
      "size": "x-small",
      "variant": "inverse"
    },
    key: 1
  }, [])])]), api_element("div", {
    classMap: {
      "slds-media__body": true
    },
    key: 5
  }, [api_element("h2", {
    classMap: {
      "slds-truncate": true,
      "slds-text-heading_medium": true
    },
    attrs: {
      "id": api_scoped_id("primitive-datatable-tooltip-bubble-header-id"),
      "title": $cmp.header
    },
    key: 4
  }, [api_dynamic($cmp.header)])])])]), api_element("div", {
    classMap: {
      "slds-popover__body": true
    },
    attrs: {
      "id": api_scoped_id("primitive-datatable-tooltip-bubble-body-id")
    },
    key: 10
  }, [$cmp.isContentList ? api_element("ul", {
    styleMap: {
      "listStyle": "disc",
      "marginLeft": "1.5rem"
    },
    key: 9
  }, api_iterator($cmp.content, function (item, index) {
    return api_element("li", {
      key: api_key(8, item)
    }, [api_dynamic(item)]);
  })) : null, !$cmp.isContentList ? api_dynamic($cmp.content) : null])])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-primitiveDatatableTooltipBubble_primitiveDatatableTooltipBubble-host",
  shadowAttribute: "lightning-primitiveDatatableTooltipBubble_primitiveDatatableTooltipBubble"
};
