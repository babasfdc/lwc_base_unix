import _implicitStylesheets from "./baseComboboxFormattedText.css";

import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    d: api_dynamic,
    k: api_key,
    h: api_element,
    i: api_iterator,
    f: api_flatten
  } = $api;
  return api_flatten([$cmp.hasParts ? api_iterator($cmp.text, function (item) {
    return [item.part.highlight ? api_element("strong", {
      key: api_key(0, item.key)
    }, [api_dynamic(item.part.text)]) : null, !item.part.highlight ? api_dynamic(item.part.text) : null];
  }) : [], !$cmp.hasParts ? api_dynamic($cmp.text) : null]);
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-baseComboboxFormattedText_baseComboboxFormattedText-host",
  shadowAttribute: "lightning-baseComboboxFormattedText_baseComboboxFormattedText"
};
