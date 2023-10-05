import _implicitStylesheets from "./primitiveIcon.css";

import { registerTemplate, sanitizeAttribute } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    fid: api_scoped_frag_id,
    h: api_element
  } = $api;
  return [api_element("svg", {
    className: $cmp.computedClass,
    attrs: {
      "focusable": "false",
      "data-key": $cmp.name,
      "aria-hidden": "true"
    },
    key: 1
  }, [api_element("use", {
    attrs: {
      "xlink:href": sanitizeAttribute("use", "http://www.w3.org/2000/svg", "xlink:href", api_scoped_frag_id($cmp.href))
    },
    key: 0
  }, [])])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-primitiveIcon_primitiveIcon-host",
  shadowAttribute: "lightning-primitiveIcon_primitiveIcon"
};
