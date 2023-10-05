import _implicitStylesheets from "./primitiveHeaderActions.css";

import _lightningButtonMenu from "lightning/buttonMenu";
import _lightningMenuItem from "lightning/menuItem";
import _lightningMenuDivider from "lightning/menuDivider";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    k: api_key,
    c: api_custom_element,
    i: api_iterator,
    f: api_flatten,
    gid: api_scoped_id,
    b: api_bind
  } = $api;
  const {
    _m0,
    _m1
  } = $ctx;
  return [$cmp.hasActions ? api_custom_element("lightning-button-menu", _lightningButtonMenu, {
    classMap: {
      "slds-th__action-button": true
    },
    styleMap: {
      "zIndex": "1"
    },
    props: {
      "id": api_scoped_id("primitive-header-action-button-menu-id"),
      "iconSize": "x-small",
      "menuAlignment": $cmp._actionMenuAlignment,
      "alternativeText": $cmp.i18n.showActions,
      "variant": "bare",
      "iconName": "utility:chevrondown"
    },
    key: 3,
    on: {
      "open": _m0 || ($ctx._m0 = api_bind($cmp.handleMenuOpen)),
      "select": _m1 || ($ctx._m1 = api_bind($cmp.handleActionSelect))
    }
  }, api_flatten([api_iterator($cmp._internalActions, function (action, actionIndex) {
    return api_custom_element("lightning-menu-item", _lightningMenuItem, {
      props: {
        "value": action,
        "label": action.label,
        "iconName": action.iconName,
        "disabled": action.disabled,
        "checked": action.checked
      },
      key: api_key(0, action.label)
    }, []);
  }), $cmp.hasActionsDivider ? api_custom_element("lightning-menu-divider", _lightningMenuDivider, {
    key: 1
  }, []) : null, api_iterator($cmp._customerActions, function (action, actionIndex) {
    return api_custom_element("lightning-menu-item", _lightningMenuItem, {
      props: {
        "value": action,
        "label": action.label,
        "iconName": action.iconName,
        "disabled": action.disabled,
        "checked": action.checked
      },
      key: api_key(2, action.label)
    }, []);
  })])) : null];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-primitiveHeaderActions_primitiveHeaderActions-host",
  shadowAttribute: "lightning-primitiveHeaderActions_primitiveHeaderActions"
};
