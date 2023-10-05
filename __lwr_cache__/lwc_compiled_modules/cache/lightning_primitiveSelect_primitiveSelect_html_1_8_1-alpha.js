import _implicitStylesheets from "./primitiveSelect.css";

import _lightningHelptext from "lightning/helptext";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    t: api_text,
    h: api_element,
    d: api_dynamic,
    gid: api_scoped_id,
    c: api_custom_element,
    k: api_key,
    i: api_iterator,
    ti: api_tab_index,
    b: api_bind
  } = $api;
  const {
    _m0,
    _m1,
    _m2
  } = $ctx;
  return [api_element("label", {
    className: $cmp.computedLabelClass,
    attrs: {
      "for": `${api_scoped_id("select")}`
    },
    key: 1
  }, [$cmp.required ? api_element("abbr", {
    classMap: {
      "slds-required": true
    },
    attrs: {
      "title": $cmp.i18n.required
    },
    key: 0
  }, [api_text("*")]) : null, api_dynamic($cmp.label)]), $cmp.fieldLevelHelp ? api_custom_element("lightning-helptext", _lightningHelptext, {
    props: {
      "content": $cmp.fieldLevelHelp
    },
    key: 2
  }, []) : null, api_element("div", {
    classMap: {
      "slds-form-element__control": true
    },
    key: 6
  }, [api_element("div", {
    classMap: {
      "slds-select_container": true
    },
    key: 5
  }, [api_element("select", {
    classMap: {
      "slds-select": true
    },
    attrs: {
      "id": api_scoped_id("select"),
      "name": $cmp.name,
      "size": $cmp.size,
      "accesskey": $cmp.accessKey,
      "tabindex": api_tab_index($cmp.tabIndex)
    },
    props: {
      "disabled": $cmp.disabled,
      "multiple": $cmp.multiple
    },
    key: 4,
    on: {
      "focus": _m0 || ($ctx._m0 = api_bind($cmp.handleFocus)),
      "blur": _m1 || ($ctx._m1 = api_bind($cmp.handleBlur)),
      "change": _m2 || ($ctx._m2 = api_bind($cmp.handleChange))
    }
  }, api_iterator($cmp.options, function (option) {
    return api_element("option", {
      attrs: {
        "value": option.value
      },
      key: api_key(3, option.value)
    }, [api_dynamic(option.label)]);
  }))])]), $cmp.errorMessage ? api_element("div", {
    classMap: {
      "slds-form-element__help": true
    },
    attrs: {
      "id": api_scoped_id("help-message"),
      "data-help-message": true,
      "aria-live": "assertive"
    },
    key: 7
  }, [api_dynamic($cmp.errorMessage)]) : null];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-primitiveSelect_primitiveSelect-host",
  shadowAttribute: "lightning-primitiveSelect_primitiveSelect"
};
