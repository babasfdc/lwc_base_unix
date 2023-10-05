import _implicitStylesheets from "./app.css";

import _lightningIcon from "lightning/icon";
import _lightningButton from "lightning/button";
import _lightningDatatable from "lightning/datatable";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    h: api_element,
    t: api_text,
    c: api_custom_element,
    gid: api_scoped_id,
    b: api_bind,
    d: api_dynamic
  } = $api;
  const {
    _m0,
    _m1,
    _m2,
    _m3,
    _m4,
    _m5,
    _m6,
    _m7
  } = $ctx;
  return [api_element("main", {
    key: 2
  }, [api_element("img", {
    attrs: {
      "src": "/public/assets/images/avatar1.jpg",
      "alt": "logo"
    },
    key: 0
  }, []), api_element("h1", {
    key: 1
  }, [api_text("Hello World!")])]), api_element("p", {
    classMap: {
      "slds-box": true,
      "slds-text-heading_small": true
    },
    attrs: {
      "id": api_scoped_id("action")
    },
    key: 9
  }, [api_text("Action icons represent actions a user can take. The default size of action icons are larger than the others. "), api_element("br", {
    key: 3
  }, []), api_element("br", {
    key: 4
  }, []), api_custom_element("lightning-icon", _lightningIcon, {
    props: {
      "iconName": "action:approval",
      "alternativeText": "Approved",
      "title": "Approved"
    },
    key: 5
  }, []), api_custom_element("lightning-icon", _lightningIcon, {
    props: {
      "iconName": "action:delete",
      "alternativeText": "Delete",
      "title": "Delete"
    },
    key: 6
  }, []), api_custom_element("lightning-icon", _lightningIcon, {
    props: {
      "iconName": "action:new_note",
      "alternativeText": "New note",
      "title": "New note"
    },
    key: 7
  }, []), api_custom_element("lightning-icon", _lightningIcon, {
    props: {
      "iconName": "action:preview",
      "alternativeText": "Preview",
      "title": "Preview"
    },
    key: 8
  }, [])]), api_custom_element("lightning-button", _lightningButton, {
    classMap: {
      "slds-m-left_x-small": true
    },
    props: {
      "variant": "base",
      "label": "Base",
      "title": "Looks like a link"
    },
    key: 10,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.handleClick))
    }
  }, []), api_custom_element("lightning-button", _lightningButton, {
    classMap: {
      "slds-m-left_x-small": true
    },
    props: {
      "label": "Neutral",
      "title": "Non-primary action"
    },
    key: 11,
    on: {
      "click": _m1 || ($ctx._m1 = api_bind($cmp.handleClick))
    }
  }, []), api_custom_element("lightning-button", _lightningButton, {
    classMap: {
      "slds-m-left_x-small": true
    },
    props: {
      "variant": "brand",
      "label": "Brand",
      "title": "Primary action"
    },
    key: 12,
    on: {
      "click": _m2 || ($ctx._m2 = api_bind($cmp.handleClick))
    }
  }, []), api_custom_element("lightning-button", _lightningButton, {
    classMap: {
      "slds-m-left_x-small": true
    },
    props: {
      "variant": "brand-outline",
      "label": "Brand Outline",
      "title": "Primary action with lighter look"
    },
    key: 13,
    on: {
      "click": _m3 || ($ctx._m3 = api_bind($cmp.handleClick))
    }
  }, []), api_custom_element("lightning-button", _lightningButton, {
    classMap: {
      "slds-m-left_x-small": true
    },
    props: {
      "variant": "destructive",
      "label": "Destructive",
      "title": "Destructive action"
    },
    key: 14,
    on: {
      "click": _m4 || ($ctx._m4 = api_bind($cmp.handleClick))
    }
  }, []), api_custom_element("lightning-button", _lightningButton, {
    classMap: {
      "slds-m-left_x-small": true
    },
    props: {
      "variant": "destructive-text",
      "label": "Destructive Text",
      "title": "Destructive action with a lighter look"
    },
    key: 15,
    on: {
      "click": _m5 || ($ctx._m5 = api_bind($cmp.handleClick))
    }
  }, []), api_custom_element("lightning-button", _lightningButton, {
    classMap: {
      "slds-m-left_x-small": true
    },
    props: {
      "variant": "success",
      "label": "Success",
      "iconName": "utility:down",
      "title": "Successful action"
    },
    key: 16,
    on: {
      "click": _m6 || ($ctx._m6 = api_bind($cmp.handleClick))
    }
  }, []), api_element("div", {
    classMap: {
      "slds-m-vertical_medium": true
    },
    key: 19
  }, [api_element("p", {
    key: 18
  }, [api_text("The label of the button that was clicked is:"), api_element("span", {
    classMap: {
      "slds-text-heading_small": true
    },
    key: 17
  }, [api_dynamic($cmp.clickedButtonLabel)])])]), api_custom_element("lightning-datatable", _lightningDatatable, {
    props: {
      "keyField": "id",
      "columns": $cmp.columns,
      "data": $cmp.data,
      "hideCheckboxColumn": true,
      "defaultSortDirection": $cmp.defaultSortDirection,
      "sortedDirection": $cmp.sortDirection,
      "sortedBy": $cmp.sortedBy
    },
    key: 20,
    on: {
      "sort": _m7 || ($ctx._m7 = api_bind($cmp.onHandleSort))
    }
  }, [])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "example-app_app-host",
  shadowAttribute: "example-app_app"
};
