import _implicitStylesheets from "./calendar.css";

import _lightningFocusTrap from "lightning/focusTrap";
import _lightningButtonIcon from "lightning/buttonIcon";
import _lightningPrimitiveSelect from "lightning/primitiveSelect";
import { registerTemplate } from "lwc";

function tmpl($api, $cmp, $slotset, $ctx) {
  const {
    b: api_bind,
    c: api_custom_element,
    h: api_element,
    d: api_dynamic,
    gid: api_scoped_id,
    k: api_key,
    i: api_iterator,
    ti: api_tab_index
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
  return [api_element("div", {
    classMap: {
      "slds-datepicker": true,
      "slds-dropdown": true,
      "slds-dropdown_left": true
    },
    attrs: {
      "aria-hidden": "false",
      "aria-label": $cmp.computedAriaLabel,
      "role": "dialog",
      "tabindex": "-1"
    },
    key: 20
  }, [api_custom_element("lightning-focus-trap", _lightningFocusTrap, {
    key: 19
  }, [api_element("div", {
    classMap: {
      "slds-datepicker__filter": true,
      "slds-grid": true
    },
    key: 8
  }, [api_element("div", {
    classMap: {
      "slds-datepicker__filter_month": true,
      "slds-grid": true,
      "slds-grid_align-spread": true,
      "slds-grow": true
    },
    key: 5
  }, [api_element("div", {
    classMap: {
      "slds-align-middle": true
    },
    key: 1
  }, [api_custom_element("lightning-button-icon", _lightningButtonIcon, {
    props: {
      "iconName": "utility:left",
      "variant": "container",
      "alternativeText": $cmp.i18n.previousMonth
    },
    key: 0,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.goToPreviousMonth))
    }
  }, [])]), api_element("h2", {
    classMap: {
      "slds-align-middle": true
    },
    attrs: {
      "aria-atomic": "true",
      "aria-live": "assertive",
      "id": api_scoped_id("month-title"),
      "data-index": $cmp.monthIndex
    },
    key: 2
  }, [api_dynamic($cmp.computedMonthTitle)]), api_element("div", {
    classMap: {
      "slds-align-middle": true
    },
    key: 4
  }, [api_custom_element("lightning-button-icon", _lightningButtonIcon, {
    props: {
      "iconName": "utility:right",
      "variant": "container",
      "alternativeText": $cmp.i18n.nextMonth
    },
    key: 3,
    on: {
      "click": _m1 || ($ctx._m1 = api_bind($cmp.goToNextMonth))
    }
  }, [])])]), api_element("div", {
    classMap: {
      "slds-shrink-none": true
    },
    key: 7
  }, [api_custom_element("lightning-primitive-select", _lightningPrimitiveSelect, {
    props: {
      "value": $cmp.calendarYear,
      "label": $cmp.i18n.yearSelector,
      "variant": "label-hidden",
      "options": $cmp.computedYearList
    },
    key: 6,
    on: {
      "change": _m2 || ($ctx._m2 = api_bind($cmp.handleYearChange)),
      "click": _m3 || ($ctx._m3 = api_bind($cmp.handleYearSelectClick))
    }
  }, [])])]), api_element("table", {
    classMap: {
      "slds-datepicker__month": true
    },
    attrs: {
      "aria-labelledby": `${api_scoped_id("month-title")}`,
      "role": "grid"
    },
    key: 17
  }, [api_element("thead", {
    key: 12
  }, [api_element("tr", {
    attrs: {
      "id": api_scoped_id("weekdays-element")
    },
    key: 11
  }, api_iterator($cmp.computedWeekdayLabels, function (weekday) {
    return api_element("th", {
      attrs: {
        "id": api_scoped_id(weekday.fullName),
        "scope": "col"
      },
      key: api_key(10, weekday.fullName)
    }, [api_element("abbr", {
      attrs: {
        "title": weekday.fullName
      },
      key: 9
    }, [api_dynamic(weekday.shortName)])]);
  }))]), api_element("tbody", {
    key: 16,
    on: {
      "keydown": _m5 || ($ctx._m5 = api_bind($cmp.handleCalendarKeyDown))
    }
  }, api_iterator($cmp.computedMonth, function (week, index) {
    return api_element("tr", {
      key: api_key(15, week.id)
    }, api_iterator(week.days, function (day) {
      return api_element("td", {
        className: day.className,
        attrs: {
          "role": "gridcell",
          "aria-selected": day.isSelected,
          "aria-current": day.ariaCurrent,
          "tabindex": api_tab_index(day.tabIndex),
          "data-value": day.dateValue
        },
        key: api_key(14, day.dateValue)
      }, [api_element("span", {
        classMap: {
          "slds-day": true
        },
        key: 13,
        on: {
          "click": _m4 || ($ctx._m4 = api_bind($cmp.handleDateClick))
        }
      }, [api_dynamic(day.dayInMonth)])]);
    }));
  }))]), api_element("button", {
    classMap: {
      "slds-button": true,
      "slds-align_absolute-center": true,
      "slds-text-link": true
    },
    attrs: {
      "name": "today",
      "type": "button"
    },
    key: 18,
    on: {
      "click": _m6 || ($ctx._m6 = api_bind($cmp.handleTodayClick))
    }
  }, [api_dynamic($cmp.i18n.today)])])])];
}

export default registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets)
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-calendar_calendar-host",
  shadowAttribute: "lightning-calendar_calendar"
};
