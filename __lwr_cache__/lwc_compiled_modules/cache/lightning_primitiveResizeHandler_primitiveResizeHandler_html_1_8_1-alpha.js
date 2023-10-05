import _implicitStylesheets from "./primitiveResizeHandler.css";

import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    b: api_bind,
    h: api_element
  } = $api;
  const {
    _m0,
    _m1,
    _m2,
    _m3,
    _m4,
    _m5,
    _m6
  } = $ctx;
  return [api_element("input", {
    classMap: {
      "slds-resizable__input": true,
      "slds-assistive-text": true
    },
    attrs: {
      "type": "range",
      "min": $cmp.minWidth,
      "max": $cmp.maxWidth,
      "aria-label": $cmp.resizerLabel
    },
    props: {
      "value": $cmp.value
    },
    key: 0,
    on: {
      "keydown": _m0 || ($ctx._m0 = api_bind($cmp.handleKeydown))
    }
  }, []), api_element("span", {
    classMap: {
      "slds-resizable__handle": true
    },
    styleMap: {
      "willChange": "transform"
    },
    key: 2,
    on: {
      "mousedown": _m1 || ($ctx._m1 = api_bind($cmp.onMouseDown)),
      "touchstart": _m2 || ($ctx._m2 = api_bind($cmp.onTouchStart)),
      "touchmove": _m3 || ($ctx._m3 = api_bind($cmp.onTouchMove)),
      "touchend": _m4 || ($ctx._m4 = api_bind($cmp.onTouchEnd)),
      "touchcancel": _m5 || ($ctx._m5 = api_bind($cmp.onTouchEnd)),
      "click": _m6 || ($ctx._m6 = api_bind($cmp.onClick))
    }
  }, [api_element("span", {
    classMap: {
      "slds-resizable__divider": true
    },
    key: 1
  }, [])])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-primitiveResizeHandler_primitiveResizeHandler-host",
  shadowAttribute: "lightning-primitiveResizeHandler_primitiveResizeHandler"
};
