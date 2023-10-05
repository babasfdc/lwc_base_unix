import _implicitStylesheets from "./spinner.css";

import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    d: api_dynamic,
    h: api_element
  } = $api;
  return [api_element("div", {
    className: $cmp.computedClass,
    attrs: {
      "role": "status"
    },
    key: 3
  }, [$cmp.validAlternativeText ? api_element("span", {
    classMap: {
      "slds-assistive-text": true
    },
    key: 0
  }, [api_dynamic($cmp.alternativeText)]) : null, api_element("div", {
    classMap: {
      "slds-spinner__dot-a": true
    },
    key: 1
  }, []), api_element("div", {
    classMap: {
      "slds-spinner__dot-b": true
    },
    key: 2
  }, [])])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-spinner_spinner-host",
  shadowAttribute: "lightning-spinner_spinner"
};
