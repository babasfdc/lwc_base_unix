import _implicitStylesheets from "./primitiveDatatableLoadingIndicator.css";

import _lightningSpinner from "lightning/spinner";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    c: api_custom_element
  } = $api;
  return [api_custom_element("lightning-spinner", _lightningSpinner, {
    styleMap: {
      "height": "40px"
    },
    props: {
      "variant": "brand",
      "alternativeText": $cmp.i18n.loading
    },
    key: 0
  }, [])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-primitiveDatatableLoadingIndicator_primitiveDatatableLoadingIndicator-host",
  shadowAttribute: "lightning-primitiveDatatableLoadingIndicator_primitiveDatatableLoadingIndicator"
};
