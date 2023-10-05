import _implicitStylesheets from "./primitiveCellActions.css";

import _lightningButtonMenu from "lightning/buttonMenu";
import _lightningMenuItem from "lightning/menuItem";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    k: api_key,
    c: api_custom_element,
    i: api_iterator,
    b: api_bind
  } = $api;
  const {
    _m0,
    _m1
  } = $ctx;
  return [api_custom_element("lightning-button-menu", _lightningButtonMenu, {
    props: {
      "iconSize": "x-small",
      "alternativeText": $cmp.buttonAlternateText,
      "menuAlignment": $cmp.computedMenuAlignment,
      "isLoading": $cmp._isLoadingActions,
      "loadingStateAlternativeText": $cmp.spinnerAlternateText
    },
    key: 1,
    on: {
      "select": _m0 || ($ctx._m0 = api_bind($cmp.handleActionSelect)),
      "open": _m1 || ($ctx._m1 = api_bind($cmp.handleMenuOpen))
    }
  }, api_iterator($cmp._actions, function (action) {
    return api_custom_element("lightning-menu-item", _lightningMenuItem, {
      props: {
        "value": action,
        "label": action.label,
        "iconName": action.iconName,
        "disabled": action.disabled
      },
      key: api_key(0, action.label)
    }, []);
  }))];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-primitiveCellActions_primitiveCellActions-host",
  shadowAttribute: "lightning-primitiveCellActions_primitiveCellActions"
};
