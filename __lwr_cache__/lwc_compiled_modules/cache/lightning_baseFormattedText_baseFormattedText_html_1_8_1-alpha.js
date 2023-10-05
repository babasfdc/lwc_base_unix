import _implicitStylesheets from "./baseFormattedText.css";

import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    d: api_dynamic,
    k: api_key,
    h: api_element,
    i: api_iterator,
    f: api_flatten
  } = $api;
  return api_flatten([!$cmp.shouldFormat ? api_dynamic($cmp.normalizedValue) : null, api_iterator($cmp.formattedParts, function (part) {
    return [$cmp.shouldFormat ? part.isLink ? api_element("a", {
      attrs: {
        "target": "_blank",
        "href": part.href,
        "rel": "noopener"
      },
      key: api_key(0, part.key)
    }, [api_dynamic(part.value)]) : null : null, $cmp.shouldFormat ? part.isText ? api_dynamic(part.value) : null : null];
  })]);
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-baseFormattedText_baseFormattedText-host",
  shadowAttribute: "lightning-baseFormattedText_baseFormattedText"
};
