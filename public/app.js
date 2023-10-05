/* proxy-compat-disable */
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function detect() {
  // Don't apply polyfill when ProxyCompat is enabled.
  if ('getKey' in Proxy) {
    return false;
  }
  const proxy = new Proxy([3, 4], {});
  const res = [1, 2].concat(proxy);
  return res.length !== 4;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const {
  isConcatSpreadable
} = Symbol;
const {
  isArray
} = Array;
const {
  slice: ArraySlice,
  unshift: ArrayUnshift,
  shift: ArrayShift
} = Array.prototype;
function isObject(O) {
  return typeof O === 'object' ? O !== null : typeof O === 'function';
}
// https://www.ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable
function isSpreadable(O) {
  if (!isObject(O)) {
    return false;
  }
  const spreadable = O[isConcatSpreadable];
  return spreadable !== undefined ? Boolean(spreadable) : isArray(O);
}
// https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.concat
function ArrayConcatPolyfill(..._args) {
  const O = Object(this);
  const A = [];
  let N = 0;
  const items = ArraySlice.call(arguments);
  ArrayUnshift.call(items, O);
  while (items.length) {
    const E = ArrayShift.call(items);
    if (isSpreadable(E)) {
      let k = 0;
      const length = E.length;
      for (k; k < length; k += 1, N += 1) {
        if (k in E) {
          const subElement = E[k];
          A[N] = subElement;
        }
      }
    } else {
      A[N] = E;
      N += 1;
    }
  }
  return A;
}
function apply() {
  // eslint-disable-next-line no-extend-native
  Array.prototype.concat = ArrayConcatPolyfill;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
if (detect()) {
  apply();
}

/**
 * Copyright (C) 2018 salesforce.com, inc.
 */
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function invariant(value, msg) {
  if (!value) {
    throw new Error(`Invariant Violation: ${msg}`);
  }
}
function isTrue(value, msg) {
  if (!value) {
    throw new Error(`Assert Violation: ${msg}`);
  }
}
function isFalse(value, msg) {
  if (value) {
    throw new Error(`Assert Violation: ${msg}`);
  }
}
function fail(msg) {
  throw new Error(msg);
}
var assert = /*#__PURE__*/Object.freeze({
  __proto__: null,
  invariant: invariant,
  isTrue: isTrue,
  isFalse: isFalse,
  fail: fail
});

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const {
  assign,
  create,
  defineProperties,
  defineProperty,
  freeze,
  getOwnPropertyDescriptor,
  getOwnPropertyNames,
  getPrototypeOf,
  hasOwnProperty,
  isFrozen,
  keys,
  seal,
  setPrototypeOf
} = Object;
const {
  isArray: isArray$1
} = Array;
const {
  filter: ArrayFilter,
  find: ArrayFind,
  indexOf: ArrayIndexOf,
  join: ArrayJoin,
  map: ArrayMap,
  push: ArrayPush,
  reduce: ArrayReduce,
  reverse: ArrayReverse,
  slice: ArraySlice$1,
  splice: ArraySplice,
  unshift: ArrayUnshift$1,
  forEach
} = Array.prototype;
const {
  charCodeAt: StringCharCodeAt,
  replace: StringReplace,
  slice: StringSlice,
  toLowerCase: StringToLowerCase
} = String.prototype;
function isUndefined(obj) {
  return obj === undefined;
}
function isNull(obj) {
  return obj === null;
}
function isFunction(obj) {
  return typeof obj === 'function';
}
function isObject$1(obj) {
  return typeof obj === 'object';
}
const OtS = {}.toString;
function toString(obj) {
  if (obj && obj.toString) {
    // Arrays might hold objects with "null" prototype So using
    // Array.prototype.toString directly will cause an error Iterate through
    // all the items and handle individually.
    if (isArray$1(obj)) {
      return ArrayJoin.call(ArrayMap.call(obj, toString), ',');
    }
    return obj.toString();
  } else if (typeof obj === 'object') {
    return OtS.call(obj);
  } else {
    return obj + emptyString;
  }
}
const emptyString = '';

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
/**
 * According to the following list, there are 48 aria attributes of which two (ariaDropEffect and
 * ariaGrabbed) are deprecated:
 * https://www.w3.org/TR/wai-aria-1.1/#x6-6-definitions-of-states-and-properties-all-aria-attributes
 *
 * The above list of 46 aria attributes is consistent with the following resources:
 * https://github.com/w3c/aria/pull/708/files#diff-eacf331f0ffc35d4b482f1d15a887d3bR11060
 * https://wicg.github.io/aom/spec/aria-reflection.html
 */
const AriaPropertyNames = ['ariaActiveDescendant', 'ariaAtomic', 'ariaAutoComplete', 'ariaBusy', 'ariaChecked', 'ariaColCount', 'ariaColIndex', 'ariaColSpan', 'ariaControls', 'ariaCurrent', 'ariaDescribedBy', 'ariaDetails', 'ariaDisabled', 'ariaErrorMessage', 'ariaExpanded', 'ariaFlowTo', 'ariaHasPopup', 'ariaHidden', 'ariaInvalid', 'ariaKeyShortcuts', 'ariaLabel', 'ariaLabelledBy', 'ariaLevel', 'ariaLive', 'ariaModal', 'ariaMultiLine', 'ariaMultiSelectable', 'ariaOrientation', 'ariaOwns', 'ariaPlaceholder', 'ariaPosInSet', 'ariaPressed', 'ariaReadOnly', 'ariaRelevant', 'ariaRequired', 'ariaRoleDescription', 'ariaRowCount', 'ariaRowIndex', 'ariaRowSpan', 'ariaSelected', 'ariaSetSize', 'ariaSort', 'ariaValueMax', 'ariaValueMin', 'ariaValueNow', 'ariaValueText', 'role'];
const AttrNameToPropNameMap = create(null);
const PropNameToAttrNameMap = create(null);
// Synthetic creation of all AOM property descriptors for Custom Elements
forEach.call(AriaPropertyNames, propName => {
  // Typescript infers the wrong function type for this particular overloaded method:
  // https://github.com/Microsoft/TypeScript/issues/27972
  // @ts-ignore type-mismatch
  const attrName = StringToLowerCase.call(StringReplace.call(propName, /^aria/, 'aria-'));
  AttrNameToPropNameMap[attrName] = propName;
  PropNameToAttrNameMap[propName] = attrName;
});

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// Inspired from: https://mathiasbynens.be/notes/globalthis
const _globalThis = function () {
  // On recent browsers, `globalThis` is already defined. In this case return it directly.
  if (typeof globalThis === 'object') {
    return globalThis;
  }
  let _globalThis;
  try {
    // eslint-disable-next-line no-extend-native
    Object.defineProperty(Object.prototype, '__magic__', {
      get: function () {
        return this;
      },
      configurable: true
    });
    // __magic__ is undefined in Safari 10 and IE10 and older.
    // @ts-ignore
    // eslint-disable-next-line no-undef
    _globalThis = __magic__;
    // @ts-ignore
    delete Object.prototype.__magic__;
  } catch (ex) {
    // In IE8, Object.defineProperty only works on DOM objects.
  } finally {
    // If the magic above fails for some reason we assume that we are in a legacy browser.
    // Assume `window` exists in this case.
    if (typeof _globalThis === 'undefined') {
      // @ts-ignore
      _globalThis = window;
    }
  }
  return _globalThis;
}();

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
/*
 * In IE11, symbols are expensive.
 * Due to the nature of the symbol polyfill. This method abstract the
 * creation of symbols, so we can fallback to string when native symbols
 * are not supported. Note that we can't use typeof since it will fail when transpiling.
 */
const hasNativeSymbolsSupport = Symbol('x').toString() === 'Symbol(x)';
function createHiddenField(key, namespace) {
  return hasNativeSymbolsSupport ? Symbol(key) : `$$lwc-${namespace}-${key}$$`;
}
const hiddenFieldsMap = new WeakMap();
function setHiddenField(o, field, value) {
  let valuesByField = hiddenFieldsMap.get(o);
  if (isUndefined(valuesByField)) {
    valuesByField = create(null);
    hiddenFieldsMap.set(o, valuesByField);
  }
  valuesByField[field] = value;
}
function getHiddenField(o, field) {
  const valuesByField = hiddenFieldsMap.get(o);
  if (!isUndefined(valuesByField)) {
    return valuesByField[field];
  }
}
const HTML_ATTRIBUTES_TO_PROPERTY = {
  accesskey: 'accessKey',
  readonly: 'readOnly',
  tabindex: 'tabIndex',
  bgcolor: 'bgColor',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  contenteditable: 'contentEditable',
  crossorigin: 'crossOrigin',
  datetime: 'dateTime',
  formaction: 'formAction',
  ismap: 'isMap',
  maxlength: 'maxLength',
  minlength: 'minLength',
  novalidate: 'noValidate',
  usemap: 'useMap',
  for: 'htmlFor'
};
keys(HTML_ATTRIBUTES_TO_PROPERTY).forEach(attrName => {});
/** version: 1.7.7 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function detect$1(propName) {
  return Object.getOwnPropertyDescriptor(Element.prototype, propName) === undefined;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const nodeToAriaPropertyValuesMap = new WeakMap();
function getAriaPropertyMap(elm) {
  let map = nodeToAriaPropertyValuesMap.get(elm);
  if (map === undefined) {
    map = {};
    nodeToAriaPropertyValuesMap.set(elm, map);
  }
  return map;
}
function getNormalizedAriaPropertyValue(value) {
  return value == null ? null : String(value);
}
function createAriaPropertyPropertyDescriptor(propName, attrName) {
  return {
    get() {
      const map = getAriaPropertyMap(this);
      if (hasOwnProperty.call(map, propName)) {
        return map[propName];
      }
      // otherwise just reflect what's in the attribute
      return this.hasAttribute(attrName) ? this.getAttribute(attrName) : null;
    },
    set(newValue) {
      const normalizedValue = getNormalizedAriaPropertyValue(newValue);
      const map = getAriaPropertyMap(this);
      map[propName] = normalizedValue;
      // reflect into the corresponding attribute
      if (newValue === null) {
        this.removeAttribute(attrName);
      } else {
        this.setAttribute(attrName, newValue);
      }
    },
    configurable: true,
    enumerable: true
  };
}
function patch(propName) {
  // Typescript is inferring the wrong function type for this particular
  // overloaded method: https://github.com/Microsoft/TypeScript/issues/27972
  // @ts-ignore type-mismatch
  const attrName = PropNameToAttrNameMap[propName];
  const descriptor = createAriaPropertyPropertyDescriptor(propName, attrName);
  Object.defineProperty(Element.prototype, propName, descriptor);
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const ElementPrototypeAriaPropertyNames = keys(PropNameToAttrNameMap);
for (let i = 0, len = ElementPrototypeAriaPropertyNames.length; i < len; i += 1) {
  const propName = ElementPrototypeAriaPropertyNames[i];
  if (detect$1(propName)) {
    patch(propName);
  }
}

/* proxy-compat-disable */
/**
 * Copyright (C) 2018 salesforce.com, inc.
 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function invariant$1(value, msg) {
  if (!value) {
    throw new Error(`Invariant Violation: ${msg}`);
  }
}
function isTrue$1(value, msg) {
  if (!value) {
    throw new Error(`Assert Violation: ${msg}`);
  }
}
function isFalse$2(value, msg) {
  if (value) {
    throw new Error(`Assert Violation: ${msg}`);
  }
}
function fail$1(msg) {
  throw new Error(msg);
}
var assert$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  invariant: invariant$1,
  isTrue: isTrue$1,
  isFalse: isFalse$2,
  fail: fail$1
});
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

const {
  assign: assign$1,
  create: create$1,
  defineProperties: defineProperties$1,
  defineProperty: defineProperty$1,
  freeze: freeze$1,
  getOwnPropertyDescriptor: getOwnPropertyDescriptor$1,
  getOwnPropertyNames: getOwnPropertyNames$1,
  getPrototypeOf: getPrototypeOf$1,
  hasOwnProperty: hasOwnProperty$1,
  isFrozen: isFrozen$1,
  keys: keys$1,
  seal: seal$1,
  setPrototypeOf: setPrototypeOf$1
} = Object;
const {
  isArray: isArray$2
} = Array;
const {
  filter: ArrayFilter$1,
  find: ArrayFind$1,
  indexOf: ArrayIndexOf$1,
  join: ArrayJoin$1,
  map: ArrayMap$1,
  push: ArrayPush$1,
  reduce: ArrayReduce$1,
  reverse: ArrayReverse$1,
  slice: ArraySlice$2,
  splice: ArraySplice$1,
  unshift: ArrayUnshift$2,
  forEach: forEach$1
} = Array.prototype;
const {
  charCodeAt: StringCharCodeAt$1,
  replace: StringReplace$1,
  slice: StringSlice$1,
  toLowerCase: StringToLowerCase$1
} = String.prototype;
function isUndefined$1(obj) {
  return obj === undefined;
}
function isNull$1(obj) {
  return obj === null;
}
function isTrue$1$1(obj) {
  return obj === true;
}
function isFalse$1$1(obj) {
  return obj === false;
}
function isFunction$1(obj) {
  return typeof obj === 'function';
}
function isObject$2(obj) {
  return typeof obj === 'object';
}
function isString(obj) {
  return typeof obj === 'string';
}
function isNumber(obj) {
  return typeof obj === 'number';
}
const OtS$1 = {}.toString;
function toString$1(obj) {
  if (obj && obj.toString) {
    // Arrays might hold objects with "null" prototype So using
    // Array.prototype.toString directly will cause an error Iterate through
    // all the items and handle individually.
    if (isArray$2(obj)) {
      return ArrayJoin$1.call(ArrayMap$1.call(obj, toString$1), ',');
    }
    return obj.toString();
  } else if (typeof obj === 'object') {
    return OtS$1.call(obj);
  } else {
    return obj + emptyString$1;
  }
}
function getPropertyDescriptor(o, p) {
  do {
    const d = getOwnPropertyDescriptor$1(o, p);
    if (!isUndefined$1(d)) {
      return d;
    }
    o = getPrototypeOf$1(o);
  } while (o !== null);
}
const emptyString$1 = '';
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

/**
 * According to the following list, there are 48 aria attributes of which two (ariaDropEffect and
 * ariaGrabbed) are deprecated:
 * https://www.w3.org/TR/wai-aria-1.1/#x6-6-definitions-of-states-and-properties-all-aria-attributes
 *
 * The above list of 46 aria attributes is consistent with the following resources:
 * https://github.com/w3c/aria/pull/708/files#diff-eacf331f0ffc35d4b482f1d15a887d3bR11060
 * https://wicg.github.io/aom/spec/aria-reflection.html
 */

const AriaPropertyNames$1 = ['ariaActiveDescendant', 'ariaAtomic', 'ariaAutoComplete', 'ariaBusy', 'ariaChecked', 'ariaColCount', 'ariaColIndex', 'ariaColSpan', 'ariaControls', 'ariaCurrent', 'ariaDescribedBy', 'ariaDetails', 'ariaDisabled', 'ariaErrorMessage', 'ariaExpanded', 'ariaFlowTo', 'ariaHasPopup', 'ariaHidden', 'ariaInvalid', 'ariaKeyShortcuts', 'ariaLabel', 'ariaLabelledBy', 'ariaLevel', 'ariaLive', 'ariaModal', 'ariaMultiLine', 'ariaMultiSelectable', 'ariaOrientation', 'ariaOwns', 'ariaPlaceholder', 'ariaPosInSet', 'ariaPressed', 'ariaReadOnly', 'ariaRelevant', 'ariaRequired', 'ariaRoleDescription', 'ariaRowCount', 'ariaRowIndex', 'ariaRowSpan', 'ariaSelected', 'ariaSetSize', 'ariaSort', 'ariaValueMax', 'ariaValueMin', 'ariaValueNow', 'ariaValueText', 'role'];
const AttrNameToPropNameMap$1 = create$1(null);
const PropNameToAttrNameMap$1 = create$1(null); // Synthetic creation of all AOM property descriptors for Custom Elements

forEach$1.call(AriaPropertyNames$1, propName => {
  // Typescript infers the wrong function type for this particular overloaded method:
  // https://github.com/Microsoft/TypeScript/issues/27972
  // @ts-ignore type-mismatch
  const attrName = StringToLowerCase$1.call(StringReplace$1.call(propName, /^aria/, 'aria-'));
  AttrNameToPropNameMap$1[attrName] = propName;
  PropNameToAttrNameMap$1[propName] = attrName;
});
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// Inspired from: https://mathiasbynens.be/notes/globalthis

const _globalThis$1 = function () {
  // On recent browsers, `globalThis` is already defined. In this case return it directly.
  if (typeof globalThis === 'object') {
    return globalThis;
  }
  let _globalThis;
  try {
    // eslint-disable-next-line no-extend-native
    Object.defineProperty(Object.prototype, '__magic__', {
      get: function () {
        return this;
      },
      configurable: true
    }); // __magic__ is undefined in Safari 10 and IE10 and older.
    // @ts-ignore
    // eslint-disable-next-line no-undef

    _globalThis = __magic__; // @ts-ignore

    delete Object.prototype.__magic__;
  } catch (ex) {// In IE8, Object.defineProperty only works on DOM objects.
  } finally {
    // If the magic above fails for some reason we assume that we are in a legacy browser.
    // Assume `window` exists in this case.
    if (typeof _globalThis === 'undefined') {
      // @ts-ignore
      _globalThis = window;
    }
  }
  return _globalThis;
}();
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

/*
 * In IE11, symbols are expensive.
 * Due to the nature of the symbol polyfill. This method abstract the
 * creation of symbols, so we can fallback to string when native symbols
 * are not supported. Note that we can't use typeof since it will fail when transpiling.
 */

const hasNativeSymbolsSupport$1 = Symbol('x').toString() === 'Symbol(x)';
function createHiddenField$1(key, namespace) {
  return hasNativeSymbolsSupport$1 ? Symbol(key) : `$$lwc-${namespace}-${key}$$`;
}
const hiddenFieldsMap$1 = new WeakMap();
function setHiddenField$1(o, field, value) {
  let valuesByField = hiddenFieldsMap$1.get(o);
  if (isUndefined$1(valuesByField)) {
    valuesByField = create$1(null);
    hiddenFieldsMap$1.set(o, valuesByField);
  }
  valuesByField[field] = value;
}
function getHiddenField$1(o, field) {
  const valuesByField = hiddenFieldsMap$1.get(o);
  if (!isUndefined$1(valuesByField)) {
    return valuesByField[field];
  }
}
const HTML_ATTRIBUTES_TO_PROPERTY$1 = {
  accesskey: 'accessKey',
  readonly: 'readOnly',
  tabindex: 'tabIndex',
  bgcolor: 'bgColor',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  contenteditable: 'contentEditable',
  crossorigin: 'crossOrigin',
  datetime: 'dateTime',
  formaction: 'formAction',
  ismap: 'isMap',
  maxlength: 'maxLength',
  minlength: 'minLength',
  novalidate: 'noValidate',
  usemap: 'useMap',
  for: 'htmlFor'
};
keys$1(HTML_ATTRIBUTES_TO_PROPERTY$1).forEach(attrName => {});
/** version: 1.7.7 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
let nextTickCallbackQueue = [];
const SPACE_CHAR = 32;
const EmptyObject = seal$1(create$1(null));
const EmptyArray = seal$1([]);
function flushCallbackQueue() {
  {
    if (nextTickCallbackQueue.length === 0) {
      throw new Error(`Internal Error: If callbackQueue is scheduled, it is because there must be at least one callback on this pending queue.`);
    }
  }
  const callbacks = nextTickCallbackQueue;
  nextTickCallbackQueue = []; // reset to a new queue

  for (let i = 0, len = callbacks.length; i < len; i += 1) {
    callbacks[i]();
  }
}
function addCallbackToNextTick(callback) {
  {
    if (!isFunction$1(callback)) {
      throw new Error(`Internal Error: addCallbackToNextTick() can only accept a function callback`);
    }
  }
  if (nextTickCallbackQueue.length === 0) {
    Promise.resolve().then(flushCallbackQueue);
  }
  ArrayPush$1.call(nextTickCallbackQueue, callback);
}

/*
 * Copyright (c) 2019, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const {
  create: create$1$1
} = Object;
const {
  splice: ArraySplice$1$1,
  indexOf: ArrayIndexOf$1$1,
  push: ArrayPush$1$1
} = Array.prototype;
const TargetToReactiveRecordMap = new WeakMap();
function isUndefined$1$1(obj) {
  return obj === undefined;
}
function getReactiveRecord(target) {
  let reactiveRecord = TargetToReactiveRecordMap.get(target);
  if (isUndefined$1$1(reactiveRecord)) {
    const newRecord = create$1$1(null);
    reactiveRecord = newRecord;
    TargetToReactiveRecordMap.set(target, newRecord);
  }
  return reactiveRecord;
}
let currentReactiveObserver = null;
function valueMutated(target, key) {
  const reactiveRecord = TargetToReactiveRecordMap.get(target);
  if (!isUndefined$1$1(reactiveRecord)) {
    const reactiveObservers = reactiveRecord[key];
    if (!isUndefined$1$1(reactiveObservers)) {
      for (let i = 0, len = reactiveObservers.length; i < len; i += 1) {
        const ro = reactiveObservers[i];
        ro.notify();
      }
    }
  }
}
function valueObserved(target, key) {
  // We should determine if an active Observing Record is present to track mutations.
  if (currentReactiveObserver === null) {
    return;
  }
  const ro = currentReactiveObserver;
  const reactiveRecord = getReactiveRecord(target);
  let reactiveObservers = reactiveRecord[key];
  if (isUndefined$1$1(reactiveObservers)) {
    reactiveObservers = [];
    reactiveRecord[key] = reactiveObservers;
  } else if (reactiveObservers[0] === ro) {
    return; // perf optimization considering that most subscriptions will come from the same record
  }

  if (ArrayIndexOf$1$1.call(reactiveObservers, ro) === -1) {
    ro.link(reactiveObservers);
  }
}
class ReactiveObserver {
  constructor(callback) {
    this.listeners = [];
    this.callback = callback;
  }
  observe(job) {
    const inceptionReactiveRecord = currentReactiveObserver;
    currentReactiveObserver = this;
    let error;
    try {
      job();
    } catch (e) {
      error = Object(e);
    } finally {
      currentReactiveObserver = inceptionReactiveRecord;
      if (error !== undefined) {
        throw error; // eslint-disable-line no-unsafe-finally
      }
    }
  }
  /**
   * This method is responsible for disconnecting the Reactive Observer
   * from any Reactive Record that has a reference to it, to prevent future
   * notifications about previously recorded access.
   */

  reset() {
    const {
      listeners
    } = this;
    const len = listeners.length;
    if (len > 0) {
      for (let i = 0; i < len; i += 1) {
        const set = listeners[i];
        const pos = ArrayIndexOf$1$1.call(listeners[i], this);
        ArraySplice$1$1.call(set, pos, 1);
      }
      listeners.length = 0;
    }
  } // friend methods

  notify() {
    this.callback.call(undefined, this);
  }
  link(reactiveObservers) {
    ArrayPush$1$1.call(reactiveObservers, this); // we keep track of observing records where the observing record was added to so we can do some clean up later on

    ArrayPush$1$1.call(this.listeners, reactiveObservers);
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function componentValueMutated(vm, key) {
  valueMutated(vm.component, key);
}
function componentValueObserved(vm, key) {
  valueObserved(vm.component, key);
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function getComponentTag(vm) {
  return `<${StringToLowerCase$1.call(vm.tagName)}>`;
} // TODO [#1695]: Unify getComponentStack and getErrorComponentStack

function getComponentStack(vm) {
  const stack = [];
  let prefix = '';
  while (!isNull$1(vm.owner)) {
    ArrayPush$1.call(stack, prefix + getComponentTag(vm));
    vm = vm.owner;
    prefix += '\t';
  }
  return ArrayJoin$1.call(stack, '\n');
}
function getErrorComponentStack(vm) {
  const wcStack = [];
  let currentVm = vm;
  while (!isNull$1(currentVm)) {
    ArrayPush$1.call(wcStack, getComponentTag(currentVm));
    currentVm = currentVm.owner;
  }
  return wcStack.reverse().join('\n\t');
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function logError(message, vm) {
  let msg = `[LWC error]: ${message}`;
  if (!isUndefined$1(vm)) {
    msg = `${msg}\n${getComponentStack(vm)}`;
  }
  try {
    throw new Error(msg);
  } catch (e) {
    /* eslint-disable-next-line no-console */
    console.error(e);
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

function handleEvent(event, vnode) {
  const {
    type
  } = event;
  const {
    data: {
      on
    }
  } = vnode;
  const handler = on && on[type]; // call event handler if exists

  if (handler) {
    handler.call(undefined, event);
  }
}
function createListener() {
  return function handler(event) {
    handleEvent(event, handler.vnode);
  };
}
function updateAllEventListeners(oldVnode, vnode) {
  if (isUndefined$1(oldVnode.listener)) {
    createAllEventListeners(vnode);
  } else {
    vnode.listener = oldVnode.listener;
    vnode.listener.vnode = vnode;
  }
}
function createAllEventListeners(vnode) {
  const {
    elm,
    data: {
      on
    },
    owner: {
      renderer
    }
  } = vnode;
  if (isUndefined$1(on)) {
    return;
  }
  const listener = vnode.listener = createListener();
  listener.vnode = vnode;
  let name;
  for (name in on) {
    renderer.addEventListener(elm, name, listener);
  }
}
var modEvents = {
  update: updateAllEventListeners,
  create: createAllEventListeners
};

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

const defaultDefHTMLPropertyNames = ['accessKey', 'dir', 'draggable', 'hidden', 'id', 'lang', 'spellcheck', 'tabIndex', 'title']; // Few more exceptions that are using the attribute name to match the property in lowercase.
// this list was compiled from https://msdn.microsoft.com/en-us/library/ms533062(v=vs.85).aspx
// and https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes
// Note: this list most be in sync with the compiler as well.

const HTMLPropertyNamesWithLowercasedReflectiveAttributes = ['accessKey', 'readOnly', 'tabIndex', 'bgColor', 'colSpan', 'rowSpan', 'contentEditable', 'dateTime', 'formAction', 'isMap', 'maxLength', 'useMap'];
function offsetPropertyErrorMessage(name) {
  return `Using the \`${name}\` property is an anti-pattern because it rounds the value to an integer. Instead, use the \`getBoundingClientRect\` method to obtain fractional values for the size of an element and its position relative to the viewport.`;
} // Global HTML Attributes & Properties
// https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement

const globalHTMLProperties = assign$1(create$1(null), {
  accessKey: {
    attribute: 'accesskey'
  },
  accessKeyLabel: {
    readOnly: true
  },
  className: {
    attribute: 'class',
    error: 'Using the `className` property is an anti-pattern because of slow runtime behavior and potential conflicts with classes provided by the owner element. Use the `classList` API instead.'
  },
  contentEditable: {
    attribute: 'contenteditable'
  },
  dataset: {
    readOnly: true,
    error: "Using the `dataset` property is an anti-pattern because it can't be statically analyzed. Expose each property individually using the `@api` decorator instead."
  },
  dir: {
    attribute: 'dir'
  },
  draggable: {
    attribute: 'draggable'
  },
  dropzone: {
    attribute: 'dropzone',
    readOnly: true
  },
  hidden: {
    attribute: 'hidden'
  },
  id: {
    attribute: 'id'
  },
  inputMode: {
    attribute: 'inputmode'
  },
  lang: {
    attribute: 'lang'
  },
  slot: {
    attribute: 'slot',
    error: 'Using the `slot` property is an anti-pattern.'
  },
  spellcheck: {
    attribute: 'spellcheck'
  },
  style: {
    attribute: 'style'
  },
  tabIndex: {
    attribute: 'tabindex'
  },
  title: {
    attribute: 'title'
  },
  translate: {
    attribute: 'translate'
  },
  // additional "global attributes" that are not present in the link above.
  isContentEditable: {
    readOnly: true
  },
  offsetHeight: {
    readOnly: true,
    error: offsetPropertyErrorMessage('offsetHeight')
  },
  offsetLeft: {
    readOnly: true,
    error: offsetPropertyErrorMessage('offsetLeft')
  },
  offsetParent: {
    readOnly: true
  },
  offsetTop: {
    readOnly: true,
    error: offsetPropertyErrorMessage('offsetTop')
  },
  offsetWidth: {
    readOnly: true,
    error: offsetPropertyErrorMessage('offsetWidth')
  },
  role: {
    attribute: 'role'
  }
});
const AttrNameToPropNameMap$1$1 = assign$1(create$1(null), AttrNameToPropNameMap$1);
const PropNameToAttrNameMap$1$1 = assign$1(create$1(null), PropNameToAttrNameMap$1);
forEach$1.call(defaultDefHTMLPropertyNames, propName => {
  const attrName = StringToLowerCase$1.call(propName);
  AttrNameToPropNameMap$1$1[attrName] = propName;
  PropNameToAttrNameMap$1$1[propName] = attrName;
});
forEach$1.call(HTMLPropertyNamesWithLowercasedReflectiveAttributes, propName => {
  const attrName = StringToLowerCase$1.call(propName);
  AttrNameToPropNameMap$1$1[attrName] = propName;
  PropNameToAttrNameMap$1$1[propName] = attrName;
});
const CAPS_REGEX = /[A-Z]/g;
/**
 * This method maps between property names
 * and the corresponding attribute name.
 */

function getAttrNameFromPropName(propName) {
  if (isUndefined$1(PropNameToAttrNameMap$1$1[propName])) {
    PropNameToAttrNameMap$1$1[propName] = StringReplace$1.call(propName, CAPS_REGEX, match => '-' + match.toLowerCase());
  }
  return PropNameToAttrNameMap$1$1[propName];
}
let controlledElement = null;
let controlledAttributeName;
function isAttributeLocked(elm, attrName) {
  return elm !== controlledElement || attrName !== controlledAttributeName;
}
function lockAttribute(_elm, _key) {
  controlledElement = null;
  controlledAttributeName = undefined;
}
function unlockAttribute(elm, key) {
  controlledElement = elm;
  controlledAttributeName = key;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const xlinkNS = 'http://www.w3.org/1999/xlink';
const xmlNS = 'http://www.w3.org/XML/1998/namespace';
const ColonCharCode = 58;
function updateAttrs(oldVnode, vnode) {
  const {
    data: {
      attrs
    },
    owner: {
      renderer
    }
  } = vnode;
  if (isUndefined$1(attrs)) {
    return;
  }
  let {
    data: {
      attrs: oldAttrs
    }
  } = oldVnode;
  if (oldAttrs === attrs) {
    return;
  }
  {
    assert$1.invariant(isUndefined$1(oldAttrs) || keys$1(oldAttrs).join(',') === keys$1(attrs).join(','), `vnode.data.attrs cannot change shape.`);
  }
  const elm = vnode.elm;
  const {
    setAttribute,
    removeAttribute
  } = renderer;
  let key;
  oldAttrs = isUndefined$1(oldAttrs) ? EmptyObject : oldAttrs; // update modified attributes, add new attributes
  // this routine is only useful for data-* attributes in all kind of elements
  // and aria-* in standard elements (custom elements will use props for these)

  for (key in attrs) {
    const cur = attrs[key];
    const old = oldAttrs[key];
    if (old !== cur) {
      unlockAttribute(elm, key);
      if (StringCharCodeAt$1.call(key, 3) === ColonCharCode) {
        // Assume xml namespace
        setAttribute(elm, key, cur, xmlNS);
      } else if (StringCharCodeAt$1.call(key, 5) === ColonCharCode) {
        // Assume xlink namespace
        setAttribute(elm, key, cur, xlinkNS);
      } else if (isNull$1(cur)) {
        removeAttribute(elm, key);
      } else {
        setAttribute(elm, key, cur);
      }
      lockAttribute();
    }
  }
}
const emptyVNode = {
  data: {}
};
var modAttrs = {
  create: vnode => updateAttrs(emptyVNode, vnode),
  update: updateAttrs
};

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

function isLiveBindingProp(sel, key) {
  // For properties with live bindings, we read values from the DOM element
  // instead of relying on internally tracked values.
  return sel === 'input' && (key === 'value' || key === 'checked');
}
function update(oldVnode, vnode) {
  const props = vnode.data.props;
  if (isUndefined$1(props)) {
    return;
  }
  const oldProps = oldVnode.data.props;
  if (oldProps === props) {
    return;
  }
  {
    assert$1.invariant(isUndefined$1(oldProps) || keys$1(oldProps).join(',') === keys$1(props).join(','), 'vnode.data.props cannot change shape.');
  }
  const isFirstPatch = isUndefined$1(oldProps);
  const {
    elm,
    sel,
    owner: {
      renderer
    }
  } = vnode;
  for (const key in props) {
    const cur = props[key]; // if it is the first time this element is patched, or the current value is different to the previous value...

    if (isFirstPatch || cur !== (isLiveBindingProp(sel, key) ? renderer.getProperty(elm, key) : oldProps[key])) {
      renderer.setProperty(elm, key, cur);
    }
  }
}
const emptyVNode$1 = {
  data: {}
};
var modProps = {
  create: vnode => update(emptyVNode$1, vnode),
  update
};

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const classNameToClassMap = create$1(null);
function getMapFromClassName(className) {
  // Intentionally using == to match undefined and null values from computed style attribute
  if (className == null) {
    return EmptyObject;
  } // computed class names must be string

  className = isString(className) ? className : className + '';
  let map = classNameToClassMap[className];
  if (map) {
    return map;
  }
  map = create$1(null);
  let start = 0;
  let o;
  const len = className.length;
  for (o = 0; o < len; o++) {
    if (StringCharCodeAt$1.call(className, o) === SPACE_CHAR) {
      if (o > start) {
        map[StringSlice$1.call(className, start, o)] = true;
      }
      start = o + 1;
    }
  }
  if (o > start) {
    map[StringSlice$1.call(className, start, o)] = true;
  }
  classNameToClassMap[className] = map;
  {
    // just to make sure that this object never changes as part of the diffing algo
    freeze$1(map);
  }
  return map;
}
function updateClassAttribute(oldVnode, vnode) {
  const {
    elm,
    data: {
      className: newClass
    },
    owner: {
      renderer
    }
  } = vnode;
  const {
    data: {
      className: oldClass
    }
  } = oldVnode;
  if (oldClass === newClass) {
    return;
  }
  const classList = renderer.getClassList(elm);
  const newClassMap = getMapFromClassName(newClass);
  const oldClassMap = getMapFromClassName(oldClass);
  let name;
  for (name in oldClassMap) {
    // remove only if it is not in the new class collection and it is not set from within the instance
    if (isUndefined$1(newClassMap[name])) {
      classList.remove(name);
    }
  }
  for (name in newClassMap) {
    if (isUndefined$1(oldClassMap[name])) {
      classList.add(name);
    }
  }
}
const emptyVNode$2 = {
  data: {}
};
var modComputedClassName = {
  create: vnode => updateClassAttribute(emptyVNode$2, vnode),
  update: updateClassAttribute
};

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

function updateStyleAttribute(oldVnode, vnode) {
  const {
    elm,
    data: {
      style: newStyle
    },
    owner: {
      renderer
    }
  } = vnode;
  const {
    getStyleDeclaration,
    removeAttribute
  } = renderer;
  if (oldVnode.data.style === newStyle) {
    return;
  }
  const style = getStyleDeclaration(elm);
  if (!isString(newStyle) || newStyle === '') {
    removeAttribute(elm, 'style');
  } else {
    style.cssText = newStyle;
  }
}
const emptyVNode$3 = {
  data: {}
};
var modComputedStyle = {
  create: vnode => updateStyleAttribute(emptyVNode$3, vnode),
  update: updateStyleAttribute
};

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// The compiler takes care of transforming the inline classnames into an object. It's faster to set the
// different classnames properties individually instead of via a string.

function createClassAttribute(vnode) {
  const {
    elm,
    data: {
      classMap
    },
    owner: {
      renderer
    }
  } = vnode;
  if (isUndefined$1(classMap)) {
    return;
  }
  const classList = renderer.getClassList(elm);
  for (const name in classMap) {
    classList.add(name);
  }
}
var modStaticClassName = {
  create: createClassAttribute
};

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// The compiler takes care of transforming the inline style into an object. It's faster to set the
// different style properties individually instead of via a string.

function createStyleAttribute(vnode) {
  const {
    elm,
    data: {
      styleMap
    },
    owner: {
      renderer
    }
  } = vnode;
  if (isUndefined$1(styleMap)) {
    return;
  }
  const style = renderer.getStyleDeclaration(elm);
  for (const name in styleMap) {
    style[name] = styleMap[name];
  }
}
var modStaticStyle = {
  create: createStyleAttribute
};

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

/**
@license
Copyright (c) 2015 Simon Friis Vindum.
This code may only be used under the MIT License found at
https://github.com/snabbdom/snabbdom/blob/master/LICENSE
Code distributed by Snabbdom as part of the Snabbdom project at
https://github.com/snabbdom/snabbdom/
*/
function isUndef(s) {
  return s === undefined;
}
function sameVnode(vnode1, vnode2) {
  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}
function isVNode(vnode) {
  return vnode != null;
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
  const map = {};
  let j, key, ch; // TODO [#1637]: simplify this by assuming that all vnodes has keys

  for (j = beginIdx; j <= endIdx; ++j) {
    ch = children[j];
    if (isVNode(ch)) {
      key = ch.key;
      if (key !== undefined) {
        map[key] = j;
      }
    }
  }
  return map;
}
function addVnodes(parentElm, before, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = vnodes[startIdx];
    if (isVNode(ch)) {
      ch.hook.create(ch);
      ch.hook.insert(ch, parentElm, before);
    }
  }
}
function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
  for (; startIdx <= endIdx; ++startIdx) {
    const ch = vnodes[startIdx]; // text nodes do not have logic associated to them

    if (isVNode(ch)) {
      ch.hook.remove(ch, parentElm);
    }
  }
}
function updateDynamicChildren(parentElm, oldCh, newCh) {
  let oldStartIdx = 0;
  let newStartIdx = 0;
  let oldEndIdx = oldCh.length - 1;
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newEndIdx = newCh.length - 1;
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
  let oldKeyToIdx;
  let idxInOld;
  let elmToMove;
  let before;
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (!isVNode(oldStartVnode)) {
      oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
    } else if (!isVNode(oldEndVnode)) {
      oldEndVnode = oldCh[--oldEndIdx];
    } else if (!isVNode(newStartVnode)) {
      newStartVnode = newCh[++newStartIdx];
    } else if (!isVNode(newEndVnode)) {
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldStartVnode, newEndVnode)) {
      // Vnode moved right
      patchVnode(oldStartVnode, newEndVnode);
      newEndVnode.hook.move(oldStartVnode, parentElm, oldEndVnode.owner.renderer.nextSibling(oldEndVnode.elm));
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    } else if (sameVnode(oldEndVnode, newStartVnode)) {
      // Vnode moved left
      patchVnode(oldEndVnode, newStartVnode);
      newStartVnode.hook.move(oldEndVnode, parentElm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    } else {
      if (oldKeyToIdx === undefined) {
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      }
      idxInOld = oldKeyToIdx[newStartVnode.key];
      if (isUndef(idxInOld)) {
        // New element
        newStartVnode.hook.create(newStartVnode);
        newStartVnode.hook.insert(newStartVnode, parentElm, oldStartVnode.elm);
        newStartVnode = newCh[++newStartIdx];
      } else {
        elmToMove = oldCh[idxInOld];
        if (isVNode(elmToMove)) {
          if (elmToMove.sel !== newStartVnode.sel) {
            // New element
            newStartVnode.hook.create(newStartVnode);
            newStartVnode.hook.insert(newStartVnode, parentElm, oldStartVnode.elm);
          } else {
            patchVnode(elmToMove, newStartVnode);
            oldCh[idxInOld] = undefined;
            newStartVnode.hook.move(elmToMove, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
  }
  if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
    if (oldStartIdx > oldEndIdx) {
      const n = newCh[newEndIdx + 1];
      before = isVNode(n) ? n.elm : null;
      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx);
    } else {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }
}
function updateStaticChildren(parentElm, oldCh, newCh) {
  const {
    length
  } = newCh;
  if (oldCh.length === 0) {
    // the old list is empty, we can directly insert anything new
    addVnodes(parentElm, null, newCh, 0, length);
    return;
  } // if the old list is not empty, the new list MUST have the same
  // amount of nodes, that's why we call this static children

  let referenceElm = null;
  for (let i = length - 1; i >= 0; i -= 1) {
    const vnode = newCh[i];
    const oldVNode = oldCh[i];
    if (vnode !== oldVNode) {
      if (isVNode(oldVNode)) {
        if (isVNode(vnode)) {
          // both vnodes must be equivalent, and se just need to patch them
          patchVnode(oldVNode, vnode);
          referenceElm = vnode.elm;
        } else {
          // removing the old vnode since the new one is null
          oldVNode.hook.remove(oldVNode, parentElm);
        }
      } else if (isVNode(vnode)) {
        // this condition is unnecessary
        vnode.hook.create(vnode); // insert the new node one since the old one is null

        vnode.hook.insert(vnode, parentElm, referenceElm);
        referenceElm = vnode.elm;
      }
    }
  }
}
function patchVnode(oldVnode, vnode) {
  if (oldVnode !== vnode) {
    vnode.elm = oldVnode.elm;
    vnode.hook.update(oldVnode, vnode);
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

function generateDataDescriptor(options) {
  return assign$1({
    configurable: true,
    enumerable: true,
    writable: true
  }, options);
}
function generateAccessorDescriptor(options) {
  return assign$1({
    configurable: true,
    enumerable: true
  }, options);
}
let isDomMutationAllowed = false;
function unlockDomMutation() {
  isDomMutationAllowed = true;
}
function lockDomMutation() {
  isDomMutationAllowed = false;
}
function logMissingPortalError(name, type) {
  return logError(`The \`${name}\` ${type} is available only on elements that use the \`lwc:dom="manual"\` directive.`);
}
function patchElementWithRestrictions(elm, options) {
  const originalOuterHTMLDescriptor = getPropertyDescriptor(elm, 'outerHTML');
  const descriptors = {
    outerHTML: generateAccessorDescriptor({
      get() {
        return originalOuterHTMLDescriptor.get.call(this);
      },
      set(_value) {
        throw new TypeError(`Invalid attempt to set outerHTML on Element.`);
      }
    })
  }; // Apply extra restriction related to DOM manipulation if the element is not a portal.

  if (isFalse$1$1(options.isPortal)) {
    const {
      appendChild,
      insertBefore,
      removeChild,
      replaceChild
    } = elm;
    const originalNodeValueDescriptor = getPropertyDescriptor(elm, 'nodeValue');
    const originalInnerHTMLDescriptor = getPropertyDescriptor(elm, 'innerHTML');
    const originalTextContentDescriptor = getPropertyDescriptor(elm, 'textContent');
    assign$1(descriptors, {
      appendChild: generateDataDescriptor({
        value(aChild) {
          logMissingPortalError('appendChild', 'method');
          return appendChild.call(this, aChild);
        }
      }),
      insertBefore: generateDataDescriptor({
        value(newNode, referenceNode) {
          if (!isDomMutationAllowed) {
            logMissingPortalError('insertBefore', 'method');
          }
          return insertBefore.call(this, newNode, referenceNode);
        }
      }),
      removeChild: generateDataDescriptor({
        value(aChild) {
          if (!isDomMutationAllowed) {
            logMissingPortalError('removeChild', 'method');
          }
          return removeChild.call(this, aChild);
        }
      }),
      replaceChild: generateDataDescriptor({
        value(newChild, oldChild) {
          logMissingPortalError('replaceChild', 'method');
          return replaceChild.call(this, newChild, oldChild);
        }
      }),
      nodeValue: generateAccessorDescriptor({
        get() {
          return originalNodeValueDescriptor.get.call(this);
        },
        set(value) {
          if (!isDomMutationAllowed) {
            logMissingPortalError('nodeValue', 'property');
          }
          originalNodeValueDescriptor.set.call(this, value);
        }
      }),
      textContent: generateAccessorDescriptor({
        get() {
          return originalTextContentDescriptor.get.call(this);
        },
        set(value) {
          logMissingPortalError('textContent', 'property');
          originalTextContentDescriptor.set.call(this, value);
        }
      }),
      innerHTML: generateAccessorDescriptor({
        get() {
          return originalInnerHTMLDescriptor.get.call(this);
        },
        set(value) {
          logMissingPortalError('innerHTML', 'property');
          return originalInnerHTMLDescriptor.set.call(this, value);
        }
      })
    });
  }
  defineProperties$1(elm, descriptors);
}
const BLOCKED_SHADOW_ROOT_METHODS = ['cloneNode', 'getElementById', 'getSelection', 'elementsFromPoint', 'dispatchEvent'];
function getShadowRootRestrictionsDescriptors(sr) {
  // thing when using the real shadow root, because if that's the case,
  // the component will not work when running with synthetic shadow.

  const originalAddEventListener = sr.addEventListener;
  const originalInnerHTMLDescriptor = getPropertyDescriptor(sr, 'innerHTML');
  const originalTextContentDescriptor = getPropertyDescriptor(sr, 'textContent');
  const descriptors = {
    innerHTML: generateAccessorDescriptor({
      get() {
        return originalInnerHTMLDescriptor.get.call(this);
      },
      set(_value) {
        throw new TypeError(`Invalid attempt to set innerHTML on ShadowRoot.`);
      }
    }),
    textContent: generateAccessorDescriptor({
      get() {
        return originalTextContentDescriptor.get.call(this);
      },
      set(_value) {
        throw new TypeError(`Invalid attempt to set textContent on ShadowRoot.`);
      }
    }),
    addEventListener: generateDataDescriptor({
      value(type, listener, options) {
        // TODO [#420]: this is triggered when the component author attempts to add a listener
        // programmatically into its Component's shadow root
        if (!isUndefined$1(options)) {
          logError('The `addEventListener` method in `LightningElement` does not support any options.', getAssociatedVMIfPresent(this));
        } // Typescript does not like it when you treat the `arguments` object as an array
        // @ts-ignore type-mismatch

        return originalAddEventListener.apply(this, arguments);
      }
    })
  };
  forEach$1.call(BLOCKED_SHADOW_ROOT_METHODS, methodName => {
    descriptors[methodName] = generateAccessorDescriptor({
      get() {
        throw new Error(`Disallowed method "${methodName}" in ShadowRoot.`);
      }
    });
  });
  return descriptors;
} // Custom Elements Restrictions:
// -----------------------------

function getCustomElementRestrictionsDescriptors(elm) {
  const originalAddEventListener = elm.addEventListener;
  const originalInnerHTMLDescriptor = getPropertyDescriptor(elm, 'innerHTML');
  const originalOuterHTMLDescriptor = getPropertyDescriptor(elm, 'outerHTML');
  const originalTextContentDescriptor = getPropertyDescriptor(elm, 'textContent');
  return {
    innerHTML: generateAccessorDescriptor({
      get() {
        return originalInnerHTMLDescriptor.get.call(this);
      },
      set(_value) {
        throw new TypeError(`Invalid attempt to set innerHTML on HTMLElement.`);
      }
    }),
    outerHTML: generateAccessorDescriptor({
      get() {
        return originalOuterHTMLDescriptor.get.call(this);
      },
      set(_value) {
        throw new TypeError(`Invalid attempt to set outerHTML on HTMLElement.`);
      }
    }),
    textContent: generateAccessorDescriptor({
      get() {
        return originalTextContentDescriptor.get.call(this);
      },
      set(_value) {
        throw new TypeError(`Invalid attempt to set textContent on HTMLElement.`);
      }
    }),
    addEventListener: generateDataDescriptor({
      value(type, listener, options) {
        // TODO [#420]: this is triggered when the component author attempts to add a listener
        // programmatically into a lighting element node
        if (!isUndefined$1(options)) {
          logError('The `addEventListener` method in `LightningElement` does not support any options.', getAssociatedVMIfPresent(this));
        } // Typescript does not like it when you treat the `arguments` object as an array
        // @ts-ignore type-mismatch

        return originalAddEventListener.apply(this, arguments);
      }
    })
  };
}
function getComponentRestrictionsDescriptors() {
  return {
    tagName: generateAccessorDescriptor({
      get() {
        throw new Error(`Usage of property \`tagName\` is disallowed because the component itself does` + ` not know which tagName will be used to create the element, therefore writing` + ` code that check for that value is error prone.`);
      },
      configurable: true,
      enumerable: false
    })
  };
}
function getLightningElementPrototypeRestrictionsDescriptors(proto) {
  const originalDispatchEvent = proto.dispatchEvent;
  const descriptors = {
    dispatchEvent: generateDataDescriptor({
      value(event) {
        const vm = getAssociatedVM(this);
        if (!isNull$1(event) && isObject$2(event)) {
          const {
            type
          } = event;
          if (!/^[a-z][a-z0-9_]*$/.test(type)) {
            logError(`Invalid event type "${type}" dispatched in element ${getComponentTag(vm)}.` + ` Event name must start with a lowercase letter and followed only lowercase` + ` letters, numbers, and underscores`, vm);
          }
        } // Typescript does not like it when you treat the `arguments` object as an array
        // @ts-ignore type-mismatch

        return originalDispatchEvent.apply(this, arguments);
      }
    })
  };
  forEach$1.call(getOwnPropertyNames$1(globalHTMLProperties), propName => {
    if (propName in proto) {
      return; // no need to redefine something that we are already exposing
    }

    descriptors[propName] = generateAccessorDescriptor({
      get() {
        const {
          error,
          attribute
        } = globalHTMLProperties[propName];
        const msg = [];
        msg.push(`Accessing the global HTML property "${propName}" is disabled.`);
        if (error) {
          msg.push(error);
        } else if (attribute) {
          msg.push(`Instead access it via \`this.getAttribute("${attribute}")\`.`);
        }
        logError(msg.join('\n'), getAssociatedVM(this));
      },
      set() {
        const {
          readOnly
        } = globalHTMLProperties[propName];
        if (readOnly) {
          logError(`The global HTML property \`${propName}\` is read-only.`, getAssociatedVM(this));
        }
      }
    });
  });
  return descriptors;
} // This routine will prevent access to certain properties on a shadow root instance to guarantee
// that all components will work fine in IE11 and other browsers without shadow dom support.

function patchShadowRootWithRestrictions(sr) {
  defineProperties$1(sr, getShadowRootRestrictionsDescriptors(sr));
}
function patchCustomElementWithRestrictions(elm) {
  const restrictionsDescriptors = getCustomElementRestrictionsDescriptors(elm);
  const elmProto = getPrototypeOf$1(elm);
  setPrototypeOf$1(elm, create$1(elmProto, restrictionsDescriptors));
}
function patchComponentWithRestrictions(cmp) {
  defineProperties$1(cmp, getComponentRestrictionsDescriptors());
}
function patchLightningElementPrototypeWithRestrictions(proto) {
  defineProperties$1(proto, getLightningElementPrototypeRestrictionsDescriptors(proto));
}

/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// This is a temporary workaround to get the @lwc/engine-server to evaluate in node without having
// to inject at runtime.
const HTMLElementConstructor = typeof HTMLElement !== 'undefined' ? HTMLElement : function () {};
const HTMLElementPrototype = HTMLElementConstructor.prototype;

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
/**
 * This is a descriptor map that contains
 * all standard properties that a Custom Element can support (including AOM properties), which
 * determines what kind of capabilities the Base HTML Element and
 * Base Lightning Element should support.
 */

const HTMLElementOriginalDescriptors = create$1(null);
forEach$1.call(keys$1(PropNameToAttrNameMap$1), propName => {
  // Note: intentionally using our in-house getPropertyDescriptor instead of getOwnPropertyDescriptor here because
  // in IE11, some properties are on Element.prototype instead of HTMLElement, just to be sure.
  const descriptor = getPropertyDescriptor(HTMLElementPrototype, propName);
  if (!isUndefined$1(descriptor)) {
    HTMLElementOriginalDescriptors[propName] = descriptor;
  }
});
forEach$1.call(defaultDefHTMLPropertyNames, propName => {
  // Note: intentionally using our in-house getPropertyDescriptor instead of getOwnPropertyDescriptor here because
  // in IE11, id property is on Element.prototype instead of HTMLElement, and we suspect that more will fall into
  // this category, so, better to be sure.
  const descriptor = getPropertyDescriptor(HTMLElementPrototype, propName);
  if (!isUndefined$1(descriptor)) {
    HTMLElementOriginalDescriptors[propName] = descriptor;
  }
});

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
/**
 * This operation is called with a descriptor of an standard html property
 * that a Custom Element can support (including AOM properties), which
 * determines what kind of capabilities the Base Lightning Element should support. When producing the new descriptors
 * for the Base Lightning Element, it also include the reactivity bit, so the standard property is reactive.
 */

function createBridgeToElementDescriptor(propName, descriptor) {
  const {
    get,
    set,
    enumerable,
    configurable
  } = descriptor;
  if (!isFunction$1(get)) {
    {
      assert$1.fail(`Detected invalid public property descriptor for HTMLElement.prototype.${propName} definition. Missing the standard getter.`);
    }
    throw new TypeError();
  }
  if (!isFunction$1(set)) {
    {
      assert$1.fail(`Detected invalid public property descriptor for HTMLElement.prototype.${propName} definition. Missing the standard setter.`);
    }
    throw new TypeError();
  }
  return {
    enumerable,
    configurable,
    get() {
      const vm = getAssociatedVM(this);
      if (isBeingConstructed(vm)) {
        {
          logError(`The value of property \`${propName}\` can't be read from the constructor because the owner component hasn't set the value yet. Instead, use the constructor to set a default value for the property.`, vm);
        }
        return;
      }
      componentValueObserved(vm, propName);
      return get.call(vm.elm);
    },
    set(newValue) {
      const vm = getAssociatedVM(this);
      {
        const vmBeingRendered = getVMBeingRendered();
        assert$1.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${propName}`);
        assert$1.invariant(!isUpdatingTemplate, `When updating the template of ${vmBeingRendered}, one of the accessors used by the template has side effects on the state of ${vm}.${propName}`);
        assert$1.isFalse(isBeingConstructed(vm), `Failed to construct '${getComponentTag(vm)}': The result must not have attributes.`);
        assert$1.invariant(!isObject$2(newValue) || isNull$1(newValue), `Invalid value "${newValue}" for "${propName}" of ${vm}. Value cannot be an object, must be a primitive value.`);
      }
      if (newValue !== vm.cmpProps[propName]) {
        vm.cmpProps[propName] = newValue;
        componentValueMutated(vm, propName);
      }
      return set.call(vm.elm, newValue);
    }
  };
}
/**
 * This class is the base class for any LWC element.
 * Some elements directly extends this class, others implement it via inheritance.
 **/

function BaseLightningElementConstructor() {
  var _a; // This should be as performant as possible, while any initialization should be done lazily

  if (isNull$1(vmBeingConstructed)) {
    throw new ReferenceError('Illegal constructor');
  }
  const vm = vmBeingConstructed;
  const {
    elm,
    mode,
    renderer,
    def: {
      ctor
    }
  } = vm;
  {
    (_a = renderer.assertInstanceOfHTMLElement) === null || _a === void 0 ? void 0 : _a.call(renderer, vm.elm, `Component creation requires a DOM element to be associated to ${vm}.`);
  }
  const component = this;
  const cmpRoot = renderer.attachShadow(elm, {
    mode,
    delegatesFocus: !!ctor.delegatesFocus,
    '$$lwc-synthetic-mode$$': true
  });
  vm.component = this;
  vm.cmpRoot = cmpRoot; // Locker hooks assignment. When the LWC engine run with Locker, Locker intercepts all the new
  // component creation and passes hooks to instrument all the component interactions with the
  // engine. We are intentionally hiding this argument from the formal API of LightningElement
  // because we don't want folks to know about it just yet.

  if (arguments.length === 1) {
    const {
      callHook,
      setHook,
      getHook
    } = arguments[0];
    vm.callHook = callHook;
    vm.setHook = setHook;
    vm.getHook = getHook;
  } // Linking elm, shadow root and component with the VM.

  associateVM(component, vm);
  associateVM(cmpRoot, vm);
  associateVM(elm, vm); // Adding extra guard rails in DEV mode.

  {
    patchCustomElementWithRestrictions(elm);
    patchComponentWithRestrictions(component);
    patchShadowRootWithRestrictions(cmpRoot);
  }
  return this;
}
BaseLightningElementConstructor.prototype = {
  constructor: BaseLightningElementConstructor,
  dispatchEvent(event) {
    const {
      elm,
      renderer: {
        dispatchEvent
      }
    } = getAssociatedVM(this);
    return dispatchEvent(elm, event);
  },
  addEventListener(type, listener, options) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        addEventListener
      }
    } = vm;
    {
      const vmBeingRendered = getVMBeingRendered();
      assert$1.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm} by adding an event listener for "${type}".`);
      assert$1.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${vm} by adding an event listener for "${type}".`);
      assert$1.invariant(isFunction$1(listener), `Invalid second argument for this.addEventListener() in ${vm} for event "${type}". Expected an EventListener but received ${listener}.`);
    }
    const wrappedListener = getWrappedComponentsListener(vm, listener);
    addEventListener(elm, type, wrappedListener, options);
  },
  removeEventListener(type, listener, options) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        removeEventListener
      }
    } = vm;
    const wrappedListener = getWrappedComponentsListener(vm, listener);
    removeEventListener(elm, type, wrappedListener, options);
  },
  hasAttribute(name) {
    const {
      elm,
      renderer: {
        getAttribute
      }
    } = getAssociatedVM(this);
    return !isNull$1(getAttribute(elm, name));
  },
  hasAttributeNS(namespace, name) {
    const {
      elm,
      renderer: {
        getAttribute
      }
    } = getAssociatedVM(this);
    return !isNull$1(getAttribute(elm, name, namespace));
  },
  removeAttribute(name) {
    const {
      elm,
      renderer: {
        removeAttribute
      }
    } = getAssociatedVM(this);
    unlockAttribute(elm, name);
    removeAttribute(elm, name);
    lockAttribute();
  },
  removeAttributeNS(namespace, name) {
    const {
      elm,
      renderer: {
        removeAttribute
      }
    } = getAssociatedVM(this);
    unlockAttribute(elm, name);
    removeAttribute(elm, name, namespace);
    lockAttribute();
  },
  getAttribute(name) {
    const {
      elm,
      renderer: {
        getAttribute
      }
    } = getAssociatedVM(this);
    return getAttribute(elm, name);
  },
  getAttributeNS(namespace, name) {
    const {
      elm,
      renderer: {
        getAttribute
      }
    } = getAssociatedVM(this);
    return getAttribute(elm, name, namespace);
  },
  setAttribute(name, value) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        setAttribute
      }
    } = vm;
    {
      assert$1.isFalse(isBeingConstructed(vm), `Failed to construct '${getComponentTag(vm)}': The result must not have attributes.`);
    }
    unlockAttribute(elm, name);
    setAttribute(elm, name, value);
    lockAttribute();
  },
  setAttributeNS(namespace, name, value) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        setAttribute
      }
    } = vm;
    {
      assert$1.isFalse(isBeingConstructed(vm), `Failed to construct '${getComponentTag(vm)}': The result must not have attributes.`);
    }
    unlockAttribute(elm, name);
    setAttribute(elm, name, value, namespace);
    lockAttribute();
  },
  getBoundingClientRect() {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        getBoundingClientRect
      }
    } = vm;
    {
      assert$1.isFalse(isBeingConstructed(vm), `this.getBoundingClientRect() should not be called during the construction of the custom element for ${getComponentTag(vm)} because the element is not yet in the DOM, instead, you can use it in one of the available life-cycle hooks.`);
    }
    return getBoundingClientRect(elm);
  },
  querySelector(selectors) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        querySelector
      }
    } = vm;
    {
      assert$1.isFalse(isBeingConstructed(vm), `this.querySelector() cannot be called during the construction of the custom element for ${getComponentTag(vm)} because no children has been added to this element yet.`);
    }
    return querySelector(elm, selectors);
  },
  querySelectorAll(selectors) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        querySelectorAll
      }
    } = vm;
    {
      assert$1.isFalse(isBeingConstructed(vm), `this.querySelectorAll() cannot be called during the construction of the custom element for ${getComponentTag(vm)} because no children has been added to this element yet.`);
    }
    return querySelectorAll(elm, selectors);
  },
  getElementsByTagName(tagNameOrWildCard) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        getElementsByTagName
      }
    } = vm;
    {
      assert$1.isFalse(isBeingConstructed(vm), `this.getElementsByTagName() cannot be called during the construction of the custom element for ${getComponentTag(vm)} because no children has been added to this element yet.`);
    }
    return getElementsByTagName(elm, tagNameOrWildCard);
  },
  getElementsByClassName(names) {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        getElementsByClassName
      }
    } = vm;
    {
      assert$1.isFalse(isBeingConstructed(vm), `this.getElementsByClassName() cannot be called during the construction of the custom element for ${getComponentTag(vm)} because no children has been added to this element yet.`);
    }
    return getElementsByClassName(elm, names);
  },
  get isConnected() {
    const {
      elm,
      renderer: {
        isConnected
      }
    } = getAssociatedVM(this);
    return isConnected(elm);
  },
  get classList() {
    const vm = getAssociatedVM(this);
    const {
      elm,
      renderer: {
        getClassList
      }
    } = vm;
    {
      // TODO [#1290]: this still fails in dev but works in production, eventually, we should
      // just throw in all modes
      assert$1.isFalse(isBeingConstructed(vm), `Failed to construct ${vm}: The result must not have attributes. Adding or tampering with classname in constructor is not allowed in a web component, use connectedCallback() instead.`);
    }
    return getClassList(elm);
  },
  get template() {
    const vm = getAssociatedVM(this);
    return vm.cmpRoot;
  },
  get shadowRoot() {
    // From within the component instance, the shadowRoot is always reported as "closed".
    // Authors should rely on this.template instead.
    return null;
  },
  render() {
    const vm = getAssociatedVM(this);
    return vm.def.template;
  },
  toString() {
    const vm = getAssociatedVM(this);
    return `[object ${vm.def.name}]`;
  }
};
const lightningBasedDescriptors = create$1(null);
for (const propName in HTMLElementOriginalDescriptors) {
  lightningBasedDescriptors[propName] = createBridgeToElementDescriptor(propName, HTMLElementOriginalDescriptors[propName]);
}
defineProperties$1(BaseLightningElementConstructor.prototype, lightningBasedDescriptors);
defineProperty$1(BaseLightningElementConstructor, 'CustomElementConstructor', {
  get() {
    // If required, a runtime-specific implementation must be defined.
    throw new ReferenceError('The current runtime does not support CustomElementConstructor.');
  },
  configurable: true
});
{
  patchLightningElementPrototypeWithRestrictions(BaseLightningElementConstructor.prototype);
} // @ts-ignore

const BaseLightningElement = BaseLightningElementConstructor;
function internalWireFieldDecorator(key) {
  return {
    get() {
      const vm = getAssociatedVM(this);
      componentValueObserved(vm, key);
      return vm.cmpFields[key];
    },
    set(value) {
      const vm = getAssociatedVM(this);
      /**
       * Reactivity for wired fields is provided in wiring.
       * We intentionally add reactivity here since this is just
       * letting the author to do the wrong thing, but it will keep our
       * system to be backward compatible.
       */

      if (value !== vm.cmpFields[key]) {
        vm.cmpFields[key] = value;
        componentValueMutated(vm, key);
      }
    },
    enumerable: true,
    configurable: true
  };
}

/**
 * Copyright (C) 2017 salesforce.com, inc.
 */
const {
  isArray: isArray$1$1
} = Array;
const {
  getPrototypeOf: getPrototypeOf$1$1,
  create: ObjectCreate,
  defineProperty: ObjectDefineProperty,
  defineProperties: ObjectDefineProperties,
  isExtensible,
  getOwnPropertyDescriptor: getOwnPropertyDescriptor$1$1,
  getOwnPropertyNames: getOwnPropertyNames$1$1,
  getOwnPropertySymbols,
  preventExtensions,
  hasOwnProperty: hasOwnProperty$1$1
} = Object;
const {
  push: ArrayPush$2,
  concat: ArrayConcat,
  map: ArrayMap$1$1
} = Array.prototype;
const OtS$1$1 = {}.toString;
function toString$1$1(obj) {
  if (obj && obj.toString) {
    return obj.toString();
  } else if (typeof obj === 'object') {
    return OtS$1$1.call(obj);
  } else {
    return obj + '';
  }
}
function isUndefined$2(obj) {
  return obj === undefined;
}
function isFunction$1$1(obj) {
  return typeof obj === 'function';
}
function isObject$1$1(obj) {
  return typeof obj === 'object';
}
const proxyToValueMap = new WeakMap();
function registerProxy(proxy, value) {
  proxyToValueMap.set(proxy, value);
}
const unwrap = replicaOrAny => proxyToValueMap.get(replicaOrAny) || replicaOrAny;
function wrapValue(membrane, value) {
  return membrane.valueIsObservable(value) ? membrane.getProxy(value) : value;
}
/**
 * Unwrap property descriptors will set value on original descriptor
 * We only need to unwrap if value is specified
 * @param descriptor external descrpitor provided to define new property on original value
 */

function unwrapDescriptor(descriptor) {
  if (hasOwnProperty$1$1.call(descriptor, 'value')) {
    descriptor.value = unwrap(descriptor.value);
  }
  return descriptor;
}
function lockShadowTarget(membrane, shadowTarget, originalTarget) {
  const targetKeys = ArrayConcat.call(getOwnPropertyNames$1$1(originalTarget), getOwnPropertySymbols(originalTarget));
  targetKeys.forEach(key => {
    let descriptor = getOwnPropertyDescriptor$1$1(originalTarget, key); // We do not need to wrap the descriptor if configurable
    // Because we can deal with wrapping it when user goes through
    // Get own property descriptor. There is also a chance that this descriptor
    // could change sometime in the future, so we can defer wrapping
    // until we need to

    if (!descriptor.configurable) {
      descriptor = wrapDescriptor(membrane, descriptor, wrapValue);
    }
    ObjectDefineProperty(shadowTarget, key, descriptor);
  });
  preventExtensions(shadowTarget);
}
class ReactiveProxyHandler {
  constructor(membrane, value) {
    this.originalTarget = value;
    this.membrane = membrane;
  }
  get(shadowTarget, key) {
    const {
      originalTarget,
      membrane
    } = this;
    const value = originalTarget[key];
    const {
      valueObserved
    } = membrane;
    valueObserved(originalTarget, key);
    return membrane.getProxy(value);
  }
  set(shadowTarget, key, value) {
    const {
      originalTarget,
      membrane: {
        valueMutated
      }
    } = this;
    const oldValue = originalTarget[key];
    if (oldValue !== value) {
      originalTarget[key] = value;
      valueMutated(originalTarget, key);
    } else if (key === 'length' && isArray$1$1(originalTarget)) {
      // fix for issue #236: push will add the new index, and by the time length
      // is updated, the internal length is already equal to the new length value
      // therefore, the oldValue is equal to the value. This is the forking logic
      // to support this use case.
      valueMutated(originalTarget, key);
    }
    return true;
  }
  deleteProperty(shadowTarget, key) {
    const {
      originalTarget,
      membrane: {
        valueMutated
      }
    } = this;
    delete originalTarget[key];
    valueMutated(originalTarget, key);
    return true;
  }
  apply(shadowTarget, thisArg, argArray) {
    /* No op */
  }
  construct(target, argArray, newTarget) {
    /* No op */
  }
  has(shadowTarget, key) {
    const {
      originalTarget,
      membrane: {
        valueObserved
      }
    } = this;
    valueObserved(originalTarget, key);
    return key in originalTarget;
  }
  ownKeys(shadowTarget) {
    const {
      originalTarget
    } = this;
    return ArrayConcat.call(getOwnPropertyNames$1$1(originalTarget), getOwnPropertySymbols(originalTarget));
  }
  isExtensible(shadowTarget) {
    const shadowIsExtensible = isExtensible(shadowTarget);
    if (!shadowIsExtensible) {
      return shadowIsExtensible;
    }
    const {
      originalTarget,
      membrane
    } = this;
    const targetIsExtensible = isExtensible(originalTarget);
    if (!targetIsExtensible) {
      lockShadowTarget(membrane, shadowTarget, originalTarget);
    }
    return targetIsExtensible;
  }
  setPrototypeOf(shadowTarget, prototype) {
    {
      throw new Error(`Invalid setPrototypeOf invocation for reactive proxy ${toString$1$1(this.originalTarget)}. Prototype of reactive objects cannot be changed.`);
    }
  }
  getPrototypeOf(shadowTarget) {
    const {
      originalTarget
    } = this;
    return getPrototypeOf$1$1(originalTarget);
  }
  getOwnPropertyDescriptor(shadowTarget, key) {
    const {
      originalTarget,
      membrane
    } = this;
    const {
      valueObserved
    } = this.membrane; // keys looked up via hasOwnProperty need to be reactive

    valueObserved(originalTarget, key);
    let desc = getOwnPropertyDescriptor$1$1(originalTarget, key);
    if (isUndefined$2(desc)) {
      return desc;
    }
    const shadowDescriptor = getOwnPropertyDescriptor$1$1(shadowTarget, key);
    if (!isUndefined$2(shadowDescriptor)) {
      return shadowDescriptor;
    } // Note: by accessing the descriptor, the key is marked as observed
    // but access to the value, setter or getter (if available) cannot observe
    // mutations, just like regular methods, in which case we just do nothing.

    desc = wrapDescriptor(membrane, desc, wrapValue);
    if (!desc.configurable) {
      // If descriptor from original target is not configurable,
      // We must copy the wrapped descriptor over to the shadow target.
      // Otherwise, proxy will throw an invariant error.
      // This is our last chance to lock the value.
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor#Invariants
      ObjectDefineProperty(shadowTarget, key, desc);
    }
    return desc;
  }
  preventExtensions(shadowTarget) {
    const {
      originalTarget,
      membrane
    } = this;
    lockShadowTarget(membrane, shadowTarget, originalTarget);
    preventExtensions(originalTarget);
    return true;
  }
  defineProperty(shadowTarget, key, descriptor) {
    const {
      originalTarget,
      membrane
    } = this;
    const {
      valueMutated
    } = membrane;
    const {
      configurable
    } = descriptor; // We have to check for value in descriptor
    // because Object.freeze(proxy) calls this method
    // with only { configurable: false, writeable: false }
    // Additionally, method will only be called with writeable:false
    // if the descriptor has a value, as opposed to getter/setter
    // So we can just check if writable is present and then see if
    // value is present. This eliminates getter and setter descriptors

    if (hasOwnProperty$1$1.call(descriptor, 'writable') && !hasOwnProperty$1$1.call(descriptor, 'value')) {
      const originalDescriptor = getOwnPropertyDescriptor$1$1(originalTarget, key);
      descriptor.value = originalDescriptor.value;
    }
    ObjectDefineProperty(originalTarget, key, unwrapDescriptor(descriptor));
    if (configurable === false) {
      ObjectDefineProperty(shadowTarget, key, wrapDescriptor(membrane, descriptor, wrapValue));
    }
    valueMutated(originalTarget, key);
    return true;
  }
}
function wrapReadOnlyValue(membrane, value) {
  return membrane.valueIsObservable(value) ? membrane.getReadOnlyProxy(value) : value;
}
class ReadOnlyHandler {
  constructor(membrane, value) {
    this.originalTarget = value;
    this.membrane = membrane;
  }
  get(shadowTarget, key) {
    const {
      membrane,
      originalTarget
    } = this;
    const value = originalTarget[key];
    const {
      valueObserved
    } = membrane;
    valueObserved(originalTarget, key);
    return membrane.getReadOnlyProxy(value);
  }
  set(shadowTarget, key, value) {
    {
      const {
        originalTarget
      } = this;
      throw new Error(`Invalid mutation: Cannot set "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`);
    }
  }
  deleteProperty(shadowTarget, key) {
    {
      const {
        originalTarget
      } = this;
      throw new Error(`Invalid mutation: Cannot delete "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`);
    }
  }
  apply(shadowTarget, thisArg, argArray) {
    /* No op */
  }
  construct(target, argArray, newTarget) {
    /* No op */
  }
  has(shadowTarget, key) {
    const {
      originalTarget,
      membrane: {
        valueObserved
      }
    } = this;
    valueObserved(originalTarget, key);
    return key in originalTarget;
  }
  ownKeys(shadowTarget) {
    const {
      originalTarget
    } = this;
    return ArrayConcat.call(getOwnPropertyNames$1$1(originalTarget), getOwnPropertySymbols(originalTarget));
  }
  setPrototypeOf(shadowTarget, prototype) {
    {
      const {
        originalTarget
      } = this;
      throw new Error(`Invalid prototype mutation: Cannot set prototype on "${originalTarget}". "${originalTarget}" prototype is read-only.`);
    }
  }
  getOwnPropertyDescriptor(shadowTarget, key) {
    const {
      originalTarget,
      membrane
    } = this;
    const {
      valueObserved
    } = membrane; // keys looked up via hasOwnProperty need to be reactive

    valueObserved(originalTarget, key);
    let desc = getOwnPropertyDescriptor$1$1(originalTarget, key);
    if (isUndefined$2(desc)) {
      return desc;
    }
    const shadowDescriptor = getOwnPropertyDescriptor$1$1(shadowTarget, key);
    if (!isUndefined$2(shadowDescriptor)) {
      return shadowDescriptor;
    } // Note: by accessing the descriptor, the key is marked as observed
    // but access to the value or getter (if available) cannot be observed,
    // just like regular methods, in which case we just do nothing.

    desc = wrapDescriptor(membrane, desc, wrapReadOnlyValue);
    if (hasOwnProperty$1$1.call(desc, 'set')) {
      desc.set = undefined; // readOnly membrane does not allow setters
    }

    if (!desc.configurable) {
      // If descriptor from original target is not configurable,
      // We must copy the wrapped descriptor over to the shadow target.
      // Otherwise, proxy will throw an invariant error.
      // This is our last chance to lock the value.
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor#Invariants
      ObjectDefineProperty(shadowTarget, key, desc);
    }
    return desc;
  }
  preventExtensions(shadowTarget) {
    {
      const {
        originalTarget
      } = this;
      throw new Error(`Invalid mutation: Cannot preventExtensions on ${originalTarget}". "${originalTarget} is read-only.`);
    }
  }
  defineProperty(shadowTarget, key, descriptor) {
    {
      const {
        originalTarget
      } = this;
      throw new Error(`Invalid mutation: Cannot defineProperty "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`);
    }
  }
}
function extract(objectOrArray) {
  if (isArray$1$1(objectOrArray)) {
    return objectOrArray.map(item => {
      const original = unwrap(item);
      if (original !== item) {
        return extract(original);
      }
      return item;
    });
  }
  const obj = ObjectCreate(getPrototypeOf$1$1(objectOrArray));
  const names = getOwnPropertyNames$1$1(objectOrArray);
  return ArrayConcat.call(names, getOwnPropertySymbols(objectOrArray)).reduce((seed, key) => {
    const item = objectOrArray[key];
    const original = unwrap(item);
    if (original !== item) {
      seed[key] = extract(original);
    } else {
      seed[key] = item;
    }
    return seed;
  }, obj);
}
const formatter = {
  header: plainOrProxy => {
    const originalTarget = unwrap(plainOrProxy); // if originalTarget is falsy or not unwrappable, exit

    if (!originalTarget || originalTarget === plainOrProxy) {
      return null;
    }
    const obj = extract(plainOrProxy);
    return ['object', {
      object: obj
    }];
  },
  hasBody: () => {
    return false;
  },
  body: () => {
    return null;
  }
}; // Inspired from paulmillr/es6-shim
// https://github.com/paulmillr/es6-shim/blob/master/es6-shim.js#L176-L185

function getGlobal() {
  // the only reliable means to get the global object is `Function('return this')()`
  // However, this causes CSP violations in Chrome apps.
  if (typeof globalThis !== 'undefined') {
    return globalThis;
  }
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  } // Gracefully degrade if not able to locate the global object

  return {};
}
function init() {
  const global = getGlobal(); // Custom Formatter for Dev Tools. To enable this, open Chrome Dev Tools
  //  - Go to Settings,
  //  - Under console, select "Enable custom formatters"
  // For more information, https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview

  const devtoolsFormatters = global.devtoolsFormatters || [];
  ArrayPush$2.call(devtoolsFormatters, formatter);
  global.devtoolsFormatters = devtoolsFormatters;
}
{
  init();
}
function createShadowTarget(value) {
  let shadowTarget = undefined;
  if (isArray$1$1(value)) {
    shadowTarget = [];
  } else if (isObject$1$1(value)) {
    shadowTarget = {};
  }
  return shadowTarget;
}
const ObjectDotPrototype = Object.prototype;
function defaultValueIsObservable(value) {
  // intentionally checking for null
  if (value === null) {
    return false;
  } // treat all non-object types, including undefined, as non-observable values

  if (typeof value !== 'object') {
    return false;
  }
  if (isArray$1$1(value)) {
    return true;
  }
  const proto = getPrototypeOf$1$1(value);
  return proto === ObjectDotPrototype || proto === null || getPrototypeOf$1$1(proto) === null;
}
const defaultValueObserved = (obj, key) => {
  /* do nothing */
};
const defaultValueMutated = (obj, key) => {
  /* do nothing */
};
const defaultValueDistortion = value => value;
function wrapDescriptor(membrane, descriptor, getValue) {
  const {
    set,
    get
  } = descriptor;
  if (hasOwnProperty$1$1.call(descriptor, 'value')) {
    descriptor.value = getValue(membrane, descriptor.value);
  } else {
    if (!isUndefined$2(get)) {
      descriptor.get = function () {
        // invoking the original getter with the original target
        return getValue(membrane, get.call(unwrap(this)));
      };
    }
    if (!isUndefined$2(set)) {
      descriptor.set = function (value) {
        // At this point we don't have a clear indication of whether
        // or not a valid mutation will occur, we don't have the key,
        // and we are not sure why and how they are invoking this setter.
        // Nevertheless we preserve the original semantics by invoking the
        // original setter with the original target and the unwrapped value
        set.call(unwrap(this), membrane.unwrapProxy(value));
      };
    }
  }
  return descriptor;
}
class ReactiveMembrane {
  constructor(options) {
    this.valueDistortion = defaultValueDistortion;
    this.valueMutated = defaultValueMutated;
    this.valueObserved = defaultValueObserved;
    this.valueIsObservable = defaultValueIsObservable;
    this.objectGraph = new WeakMap();
    if (!isUndefined$2(options)) {
      const {
        valueDistortion,
        valueMutated,
        valueObserved,
        valueIsObservable
      } = options;
      this.valueDistortion = isFunction$1$1(valueDistortion) ? valueDistortion : defaultValueDistortion;
      this.valueMutated = isFunction$1$1(valueMutated) ? valueMutated : defaultValueMutated;
      this.valueObserved = isFunction$1$1(valueObserved) ? valueObserved : defaultValueObserved;
      this.valueIsObservable = isFunction$1$1(valueIsObservable) ? valueIsObservable : defaultValueIsObservable;
    }
  }
  getProxy(value) {
    const unwrappedValue = unwrap(value);
    const distorted = this.valueDistortion(unwrappedValue);
    if (this.valueIsObservable(distorted)) {
      const o = this.getReactiveState(unwrappedValue, distorted); // when trying to extract the writable version of a readonly
      // we return the readonly.

      return o.readOnly === value ? value : o.reactive;
    }
    return distorted;
  }
  getReadOnlyProxy(value) {
    value = unwrap(value);
    const distorted = this.valueDistortion(value);
    if (this.valueIsObservable(distorted)) {
      return this.getReactiveState(value, distorted).readOnly;
    }
    return distorted;
  }
  unwrapProxy(p) {
    return unwrap(p);
  }
  getReactiveState(value, distortedValue) {
    const {
      objectGraph
    } = this;
    let reactiveState = objectGraph.get(distortedValue);
    if (reactiveState) {
      return reactiveState;
    }
    const membrane = this;
    reactiveState = {
      get reactive() {
        const reactiveHandler = new ReactiveProxyHandler(membrane, distortedValue); // caching the reactive proxy after the first time it is accessed

        const proxy = new Proxy(createShadowTarget(distortedValue), reactiveHandler);
        registerProxy(proxy, value);
        ObjectDefineProperty(this, 'reactive', {
          value: proxy
        });
        return proxy;
      },
      get readOnly() {
        const readOnlyHandler = new ReadOnlyHandler(membrane, distortedValue); // caching the readOnly proxy after the first time it is accessed

        const proxy = new Proxy(createShadowTarget(distortedValue), readOnlyHandler);
        registerProxy(proxy, value);
        ObjectDefineProperty(this, 'readOnly', {
          value: proxy
        });
        return proxy;
      }
    };
    objectGraph.set(distortedValue, reactiveState);
    return reactiveState;
  }
}
/** version: 0.26.0 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

function valueDistortion(value) {
  return value;
}
const reactiveMembrane = new ReactiveMembrane({
  valueObserved,
  valueMutated,
  valueDistortion
});
function internalTrackDecorator(key) {
  return {
    get() {
      const vm = getAssociatedVM(this);
      componentValueObserved(vm, key);
      return vm.cmpFields[key];
    },
    set(newValue) {
      const vm = getAssociatedVM(this);
      {
        const vmBeingRendered = getVMBeingRendered();
        assert$1.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${toString$1(key)}`);
        assert$1.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${vm}.${toString$1(key)}`);
      }
      const reactiveOrAnyValue = reactiveMembrane.getProxy(newValue);
      if (reactiveOrAnyValue !== vm.cmpFields[key]) {
        vm.cmpFields[key] = reactiveOrAnyValue;
        componentValueMutated(vm, key);
      }
    },
    enumerable: true,
    configurable: true
  };
}

/**
 * Copyright (C) 2018 salesforce.com, inc.
 */

/**
 * Copyright (C) 2018 salesforce.com, inc.
 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const {
  assign: assign$1$1,
  create: create$2,
  defineProperties: defineProperties$1$1,
  defineProperty: defineProperty$1$1,
  freeze: freeze$1$1,
  getOwnPropertyDescriptor: getOwnPropertyDescriptor$2,
  getOwnPropertyNames: getOwnPropertyNames$2,
  getPrototypeOf: getPrototypeOf$2,
  hasOwnProperty: hasOwnProperty$2,
  isFrozen: isFrozen$1$1,
  keys: keys$1$1,
  seal: seal$1$1,
  setPrototypeOf: setPrototypeOf$1$1
} = Object;
const {
  filter: ArrayFilter$1$1,
  find: ArrayFind$1$1,
  indexOf: ArrayIndexOf$2,
  join: ArrayJoin$1$1,
  map: ArrayMap$2,
  push: ArrayPush$3,
  reduce: ArrayReduce$1$1,
  reverse: ArrayReverse$1$1,
  slice: ArraySlice$1$1,
  splice: ArraySplice$2,
  unshift: ArrayUnshift$1$1,
  forEach: forEach$1$1
} = Array.prototype;
const {
  charCodeAt: StringCharCodeAt$1$1,
  replace: StringReplace$1$1,
  slice: StringSlice$1$1,
  toLowerCase: StringToLowerCase$1$1
} = String.prototype;
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

/**
 * According to the following list, there are 48 aria attributes of which two (ariaDropEffect and
 * ariaGrabbed) are deprecated:
 * https://www.w3.org/TR/wai-aria-1.1/#x6-6-definitions-of-states-and-properties-all-aria-attributes
 *
 * The above list of 46 aria attributes is consistent with the following resources:
 * https://github.com/w3c/aria/pull/708/files#diff-eacf331f0ffc35d4b482f1d15a887d3bR11060
 * https://wicg.github.io/aom/spec/aria-reflection.html
 */

const AriaPropertyNames$1$1 = ['ariaActiveDescendant', 'ariaAtomic', 'ariaAutoComplete', 'ariaBusy', 'ariaChecked', 'ariaColCount', 'ariaColIndex', 'ariaColSpan', 'ariaControls', 'ariaCurrent', 'ariaDescribedBy', 'ariaDetails', 'ariaDisabled', 'ariaErrorMessage', 'ariaExpanded', 'ariaFlowTo', 'ariaHasPopup', 'ariaHidden', 'ariaInvalid', 'ariaKeyShortcuts', 'ariaLabel', 'ariaLabelledBy', 'ariaLevel', 'ariaLive', 'ariaModal', 'ariaMultiLine', 'ariaMultiSelectable', 'ariaOrientation', 'ariaOwns', 'ariaPlaceholder', 'ariaPosInSet', 'ariaPressed', 'ariaReadOnly', 'ariaRelevant', 'ariaRequired', 'ariaRoleDescription', 'ariaRowCount', 'ariaRowIndex', 'ariaRowSpan', 'ariaSelected', 'ariaSetSize', 'ariaSort', 'ariaValueMax', 'ariaValueMin', 'ariaValueNow', 'ariaValueText', 'role'];
const AttrNameToPropNameMap$2 = create$2(null);
const PropNameToAttrNameMap$2 = create$2(null); // Synthetic creation of all AOM property descriptors for Custom Elements

forEach$1$1.call(AriaPropertyNames$1$1, propName => {
  // Typescript infers the wrong function type for this particular overloaded method:
  // https://github.com/Microsoft/TypeScript/issues/27972
  // @ts-ignore type-mismatch
  const attrName = StringToLowerCase$1$1.call(StringReplace$1$1.call(propName, /^aria/, 'aria-'));
  AttrNameToPropNameMap$2[attrName] = propName;
  PropNameToAttrNameMap$2[propName] = attrName;
});
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// Inspired from: https://mathiasbynens.be/notes/globalthis

const _globalThis$1$1 = function () {
  // On recent browsers, `globalThis` is already defined. In this case return it directly.
  if (typeof globalThis === 'object') {
    return globalThis;
  }
  let _globalThis;
  try {
    // eslint-disable-next-line no-extend-native
    Object.defineProperty(Object.prototype, '__magic__', {
      get: function () {
        return this;
      },
      configurable: true
    }); // __magic__ is undefined in Safari 10 and IE10 and older.
    // @ts-ignore
    // eslint-disable-next-line no-undef

    _globalThis = __magic__; // @ts-ignore

    delete Object.prototype.__magic__;
  } catch (ex) {// In IE8, Object.defineProperty only works on DOM objects.
  } finally {
    // If the magic above fails for some reason we assume that we are in a legacy browser.
    // Assume `window` exists in this case.
    if (typeof _globalThis === 'undefined') {
      // @ts-ignore
      _globalThis = window;
    }
  }
  return _globalThis;
}();
/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

/*
 * In IE11, symbols are expensive.
 * Due to the nature of the symbol polyfill. This method abstract the
 * creation of symbols, so we can fallback to string when native symbols
 * are not supported. Note that we can't use typeof since it will fail when transpiling.
 */

const hasNativeSymbolsSupport$1$1 = Symbol('x').toString() === 'Symbol(x)';
const HTML_ATTRIBUTES_TO_PROPERTY$1$1 = {
  accesskey: 'accessKey',
  readonly: 'readOnly',
  tabindex: 'tabIndex',
  bgcolor: 'bgColor',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  contenteditable: 'contentEditable',
  crossorigin: 'crossOrigin',
  datetime: 'dateTime',
  formaction: 'formAction',
  ismap: 'isMap',
  maxlength: 'maxLength',
  minlength: 'minLength',
  novalidate: 'noValidate',
  usemap: 'useMap',
  for: 'htmlFor'
};
keys$1$1(HTML_ATTRIBUTES_TO_PROPERTY$1$1).forEach(attrName => {});
/** version: 1.7.7 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

if (!_globalThis$1$1.lwcRuntimeFlags) {
  Object.defineProperty(_globalThis$1$1, 'lwcRuntimeFlags', {
    value: create$2(null)
  });
}
const runtimeFlags = _globalThis$1$1.lwcRuntimeFlags; // This function is not supported for use within components and is meant for
function createPublicPropertyDescriptor(key) {
  return {
    get() {
      const vm = getAssociatedVM(this);
      if (isBeingConstructed(vm)) {
        {
          logError(`Can’t read the value of property \`${toString$1(key)}\` from the constructor because the owner component hasn’t set the value yet. Instead, use the constructor to set a default value for the property.`, vm);
        }
        return;
      }
      componentValueObserved(vm, key);
      return vm.cmpProps[key];
    },
    set(newValue) {
      const vm = getAssociatedVM(this);
      {
        const vmBeingRendered = getVMBeingRendered();
        assert$1.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${toString$1(key)}`);
        assert$1.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${vm}.${toString$1(key)}`);
      }
      vm.cmpProps[key] = newValue;
      componentValueMutated(vm, key);
    },
    enumerable: true,
    configurable: true
  };
}
class AccessorReactiveObserver extends ReactiveObserver {
  constructor(vm, set) {
    super(() => {
      if (isFalse$1$1(this.debouncing)) {
        this.debouncing = true;
        addCallbackToNextTick(() => {
          if (isTrue$1$1(this.debouncing)) {
            const {
              value
            } = this;
            const {
              isDirty: dirtyStateBeforeSetterCall,
              component,
              idx
            } = vm;
            set.call(component, value); // de-bouncing after the call to the original setter to prevent
            // infinity loop if the setter itself is mutating things that
            // were accessed during the previous invocation.

            this.debouncing = false;
            if (isTrue$1$1(vm.isDirty) && isFalse$1$1(dirtyStateBeforeSetterCall) && idx > 0) {
              // immediate rehydration due to a setter driven mutation, otherwise
              // the component will get rendered on the second tick, which it is not
              // desirable.
              rerenderVM(vm);
            }
          }
        });
      }
    });
    this.debouncing = false;
  }
  reset(value) {
    super.reset();
    this.debouncing = false;
    if (arguments.length > 0) {
      this.value = value;
    }
  }
}
function createPublicAccessorDescriptor(key, descriptor) {
  const {
    get,
    set,
    enumerable,
    configurable
  } = descriptor;
  if (!isFunction$1(get)) {
    {
      assert$1.invariant(isFunction$1(get), `Invalid compiler output for public accessor ${toString$1(key)} decorated with @api`);
    }
    throw new Error();
  }
  return {
    get() {
      {
        // Assert that the this value is an actual Component with an associated VM.
        getAssociatedVM(this);
      }
      return get.call(this);
    },
    set(newValue) {
      const vm = getAssociatedVM(this);
      {
        const vmBeingRendered = getVMBeingRendered();
        assert$1.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${toString$1(key)}`);
        assert$1.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${vm}.${toString$1(key)}`);
      }
      if (set) {
        if (runtimeFlags.ENABLE_REACTIVE_SETTER) {
          let ro = vm.oar[key];
          if (isUndefined$1(ro)) {
            ro = vm.oar[key] = new AccessorReactiveObserver(vm, set);
          } // every time we invoke this setter from outside (through this wrapper setter)
          // we should reset the value and then debounce just in case there is a pending
          // invocation the next tick that is not longer relevant since the value is changing
          // from outside.

          ro.reset(newValue);
          ro.observe(() => {
            set.call(this, newValue);
          });
        } else {
          set.call(this, newValue);
        }
      } else {
        assert$1.fail(`Invalid attempt to set a new value for property ${toString$1(key)} of ${vm} that does not has a setter decorated with @api.`);
      }
    },
    enumerable,
    configurable
  };
}
function createObservedFieldPropertyDescriptor(key) {
  return {
    get() {
      const vm = getAssociatedVM(this);
      componentValueObserved(vm, key);
      return vm.cmpFields[key];
    },
    set(newValue) {
      const vm = getAssociatedVM(this);
      if (newValue !== vm.cmpFields[key]) {
        vm.cmpFields[key] = newValue;
        componentValueMutated(vm, key);
      }
    },
    enumerable: true,
    configurable: true
  };
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
var PropType;
(function (PropType) {
  PropType[PropType["Field"] = 0] = "Field";
  PropType[PropType["Set"] = 1] = "Set";
  PropType[PropType["Get"] = 2] = "Get";
  PropType[PropType["GetSet"] = 3] = "GetSet";
})(PropType || (PropType = {}));
function validateObservedField(Ctor, fieldName, descriptor) {
  {
    if (!isUndefined$1(descriptor)) {
      assert$1.fail(`Compiler Error: Invalid field ${fieldName} declaration.`);
    }
  }
}
function validateFieldDecoratedWithTrack(Ctor, fieldName, descriptor) {
  {
    if (!isUndefined$1(descriptor)) {
      assert$1.fail(`Compiler Error: Invalid @track ${fieldName} declaration.`);
    }
  }
}
function validateFieldDecoratedWithWire(Ctor, fieldName, descriptor) {
  {
    if (!isUndefined$1(descriptor)) {
      assert$1.fail(`Compiler Error: Invalid @wire(...) ${fieldName} field declaration.`);
    }
  }
}
function validateMethodDecoratedWithWire(Ctor, methodName, descriptor) {
  {
    if (isUndefined$1(descriptor) || !isFunction$1(descriptor.value) || isFalse$1$1(descriptor.writable)) {
      assert$1.fail(`Compiler Error: Invalid @wire(...) ${methodName} method declaration.`);
    }
  }
}
function validateFieldDecoratedWithApi(Ctor, fieldName, descriptor) {
  {
    if (!isUndefined$1(descriptor)) {
      assert$1.fail(`Compiler Error: Invalid @api ${fieldName} field declaration.`);
    }
  }
}
function validateAccessorDecoratedWithApi(Ctor, fieldName, descriptor) {
  {
    if (isUndefined$1(descriptor)) {
      assert$1.fail(`Compiler Error: Invalid @api get ${fieldName} accessor declaration.`);
    } else if (isFunction$1(descriptor.set)) {
      assert$1.isTrue(isFunction$1(descriptor.get), `Compiler Error: Missing getter for property ${toString$1(fieldName)} decorated with @api in ${Ctor}. You cannot have a setter without the corresponding getter.`);
    } else if (!isFunction$1(descriptor.get)) {
      assert$1.fail(`Compiler Error: Missing @api get ${fieldName} accessor declaration.`);
    }
  }
}
function validateMethodDecoratedWithApi(Ctor, methodName, descriptor) {
  {
    if (isUndefined$1(descriptor) || !isFunction$1(descriptor.value) || isFalse$1$1(descriptor.writable)) {
      assert$1.fail(`Compiler Error: Invalid @api ${methodName} method declaration.`);
    }
  }
}
/**
 * INTERNAL: This function can only be invoked by compiled code. The compiler
 * will prevent this function from being imported by user-land code.
 */

function registerDecorators(Ctor, meta) {
  const proto = Ctor.prototype;
  const {
    publicProps,
    publicMethods,
    wire,
    track,
    fields
  } = meta;
  const apiMethods = create$1(null);
  const apiFields = create$1(null);
  const wiredMethods = create$1(null);
  const wiredFields = create$1(null);
  const observedFields = create$1(null);
  const apiFieldsConfig = create$1(null);
  let descriptor;
  if (!isUndefined$1(publicProps)) {
    for (const fieldName in publicProps) {
      const propConfig = publicProps[fieldName];
      apiFieldsConfig[fieldName] = propConfig.config;
      descriptor = getOwnPropertyDescriptor$1(proto, fieldName);
      if (propConfig.config > 0) {
        // accessor declaration
        {
          validateAccessorDecoratedWithApi(Ctor, fieldName, descriptor);
        }
        if (isUndefined$1(descriptor)) {
          throw new Error();
        }
        descriptor = createPublicAccessorDescriptor(fieldName, descriptor);
      } else {
        // field declaration
        {
          validateFieldDecoratedWithApi(Ctor, fieldName, descriptor);
        }
        descriptor = createPublicPropertyDescriptor(fieldName);
      }
      apiFields[fieldName] = descriptor;
      defineProperty$1(proto, fieldName, descriptor);
    }
  }
  if (!isUndefined$1(publicMethods)) {
    forEach$1.call(publicMethods, methodName => {
      descriptor = getOwnPropertyDescriptor$1(proto, methodName);
      {
        validateMethodDecoratedWithApi(Ctor, methodName, descriptor);
      }
      if (isUndefined$1(descriptor)) {
        throw new Error();
      }
      apiMethods[methodName] = descriptor;
    });
  }
  if (!isUndefined$1(wire)) {
    for (const fieldOrMethodName in wire) {
      const {
        adapter,
        method,
        config: configCallback,
        dynamic = []
      } = wire[fieldOrMethodName];
      descriptor = getOwnPropertyDescriptor$1(proto, fieldOrMethodName);
      if (method === 1) {
        {
          assert$1.isTrue(adapter, `@wire on method "${fieldOrMethodName}": adapter id must be truthy.`);
          validateMethodDecoratedWithWire(Ctor, fieldOrMethodName, descriptor);
        }
        if (isUndefined$1(descriptor)) {
          throw new Error();
        }
        wiredMethods[fieldOrMethodName] = descriptor;
        storeWiredMethodMeta(descriptor, adapter, configCallback, dynamic);
      } else {
        {
          assert$1.isTrue(adapter, `@wire on field "${fieldOrMethodName}": adapter id must be truthy.`);
          validateFieldDecoratedWithWire(Ctor, fieldOrMethodName, descriptor);
        }
        descriptor = internalWireFieldDecorator(fieldOrMethodName);
        wiredFields[fieldOrMethodName] = descriptor;
        storeWiredFieldMeta(descriptor, adapter, configCallback, dynamic);
        defineProperty$1(proto, fieldOrMethodName, descriptor);
      }
    }
  }
  if (!isUndefined$1(track)) {
    for (const fieldName in track) {
      descriptor = getOwnPropertyDescriptor$1(proto, fieldName);
      {
        validateFieldDecoratedWithTrack(Ctor, fieldName, descriptor);
      }
      descriptor = internalTrackDecorator(fieldName);
      defineProperty$1(proto, fieldName, descriptor);
    }
  }
  if (!isUndefined$1(fields)) {
    for (let i = 0, n = fields.length; i < n; i++) {
      const fieldName = fields[i];
      descriptor = getOwnPropertyDescriptor$1(proto, fieldName);
      {
        validateObservedField(Ctor, fieldName, descriptor);
      }
      observedFields[fieldName] = createObservedFieldPropertyDescriptor(fieldName);
    }
  }
  setDecoratorsMeta(Ctor, {
    apiMethods,
    apiFields,
    apiFieldsConfig,
    wiredMethods,
    wiredFields,
    observedFields
  });
  return Ctor;
}
const signedDecoratorToMetaMap = new Map();
function setDecoratorsMeta(Ctor, meta) {
  signedDecoratorToMetaMap.set(Ctor, meta);
}
const defaultMeta = {
  apiMethods: EmptyObject,
  apiFields: EmptyObject,
  apiFieldsConfig: EmptyObject,
  wiredMethods: EmptyObject,
  wiredFields: EmptyObject,
  observedFields: EmptyObject
};
function getDecoratorsMeta(Ctor) {
  const meta = signedDecoratorToMetaMap.get(Ctor);
  return isUndefined$1(meta) ? defaultMeta : meta;
}
const signedTemplateSet = new Set();
function defaultEmptyTemplate() {
  return [];
}
signedTemplateSet.add(defaultEmptyTemplate);
function isTemplateRegistered(tpl) {
  return signedTemplateSet.has(tpl);
}
/**
 * INTERNAL: This function can only be invoked by compiled code. The compiler
 * will prevent this function from being imported by userland code.
 */

function registerTemplate(tpl) {
  signedTemplateSet.add(tpl); // chaining this method as a way to wrap existing
  // assignment of templates easily, without too much transformation

  return tpl;
}
/**
 * EXPERIMENTAL: This function acts like a hook for Lightning Locker
 * Service and other similar libraries to sanitize vulnerable attributes.
 * This API is subject to change or being removed.
 */

function sanitizeAttribute(tagName, namespaceUri, attrName, attrValue) {
  // locker-service patches this function during runtime to sanitize vulnerable attributes.
  // when ran off-core this function becomes a noop and returns the user authored value.
  return attrValue;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
// from the element instance, and get the value or set a new value on the component.
// This means that across different elements, similar names can get the exact same
// descriptor, so we can cache them:

const cachedGetterByKey = create$1(null);
const cachedSetterByKey = create$1(null);
function createGetter(key) {
  let fn = cachedGetterByKey[key];
  if (isUndefined$1(fn)) {
    fn = cachedGetterByKey[key] = function () {
      const vm = getAssociatedVM(this);
      const {
        getHook
      } = vm;
      return getHook(vm.component, key);
    };
  }
  return fn;
}
function createSetter(key) {
  let fn = cachedSetterByKey[key];
  if (isUndefined$1(fn)) {
    fn = cachedSetterByKey[key] = function (newValue) {
      const vm = getAssociatedVM(this);
      const {
        setHook
      } = vm;
      newValue = reactiveMembrane.getReadOnlyProxy(newValue);
      setHook(vm.component, key, newValue);
    };
  }
  return fn;
}
function createMethodCaller(methodName) {
  return function () {
    const vm = getAssociatedVM(this);
    const {
      callHook,
      component
    } = vm;
    const fn = component[methodName];
    return callHook(vm.component, fn, ArraySlice$2.call(arguments));
  };
}
function HTMLBridgeElementFactory(SuperClass, props, methods) {
  let HTMLBridgeElement;
  /**
   * Modern browsers will have all Native Constructors as regular Classes
   * and must be instantiated with the new keyword. In older browsers,
   * specifically IE11, those are objects with a prototype property defined,
   * since they are not supposed to be extended or instantiated with the
   * new keyword. This forking logic supports both cases, specifically because
   * wc.ts relies on the construction path of the bridges to create new
   * fully qualifying web components.
   */

  if (isFunction$1(SuperClass)) {
    HTMLBridgeElement = class extends SuperClass {};
  } else {
    HTMLBridgeElement = function () {
      // Bridge classes are not supposed to be instantiated directly in
      // browsers that do not support web components.
      throw new TypeError('Illegal constructor');
    }; // prototype inheritance dance

    setPrototypeOf$1(HTMLBridgeElement, SuperClass);
    setPrototypeOf$1(HTMLBridgeElement.prototype, SuperClass.prototype);
    defineProperty$1(HTMLBridgeElement.prototype, 'constructor', {
      writable: true,
      configurable: true,
      value: HTMLBridgeElement
    });
  }
  const descriptors = create$1(null); // expose getters and setters for each public props on the new Element Bridge

  for (let i = 0, len = props.length; i < len; i += 1) {
    const propName = props[i];
    descriptors[propName] = {
      get: createGetter(propName),
      set: createSetter(propName),
      enumerable: true,
      configurable: true
    };
  } // expose public methods as props on the new Element Bridge

  for (let i = 0, len = methods.length; i < len; i += 1) {
    const methodName = methods[i];
    descriptors[methodName] = {
      value: createMethodCaller(methodName),
      writable: true,
      configurable: true
    };
  }
  defineProperties$1(HTMLBridgeElement.prototype, descriptors);
  return HTMLBridgeElement;
}
const BaseBridgeElement = HTMLBridgeElementFactory(HTMLElementConstructor, getOwnPropertyNames$1(HTMLElementOriginalDescriptors), []);
freeze$1(BaseBridgeElement);
seal$1(BaseBridgeElement.prototype);

/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function resolveCircularModuleDependency(fn) {
  return fn();
}
function isCircularModuleDependency(obj) {
  return isFunction$1(obj) && hasOwnProperty$1.call(obj, '__circular__');
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const CtorToDefMap = new WeakMap();
function getCtorProto(Ctor) {
  let proto = getPrototypeOf$1(Ctor);
  if (isNull$1(proto)) {
    throw new ReferenceError(`Invalid prototype chain for ${Ctor.name}, you must extend LightningElement.`);
  } // covering the cases where the ref is circular in AMD

  if (isCircularModuleDependency(proto)) {
    const p = resolveCircularModuleDependency(proto);
    {
      if (isNull$1(p)) {
        throw new ReferenceError(`Circular module dependency for ${Ctor.name}, must resolve to a constructor that extends LightningElement.`);
      }
    } // escape hatch for Locker and other abstractions to provide their own base class instead
    // of our Base class without having to leak it to user-land. If the circular function returns
    // itself, that's the signal that we have hit the end of the proto chain, which must always
    // be base.

    proto = p === proto ? BaseLightningElement : p;
  }
  return proto;
}
function createComponentDef(Ctor) {
  {
    const ctorName = Ctor.name; // Removing the following assert until https://bugs.webkit.org/show_bug.cgi?id=190140 is fixed.
    // assert.isTrue(ctorName && isString(ctorName), `${toString(Ctor)} should have a "name" property with string value, but found ${ctorName}.`);

    assert$1.isTrue(Ctor.constructor, `Missing ${ctorName}.constructor, ${ctorName} should have a "constructor" property.`);
  }
  const decoratorsMeta = getDecoratorsMeta(Ctor);
  const {
    apiFields,
    apiFieldsConfig,
    apiMethods,
    wiredFields,
    wiredMethods,
    observedFields
  } = decoratorsMeta;
  const proto = Ctor.prototype;
  let {
    connectedCallback,
    disconnectedCallback,
    renderedCallback,
    errorCallback,
    render
  } = proto;
  const superProto = getCtorProto(Ctor);
  const superDef = superProto !== BaseLightningElement ? getComponentInternalDef(superProto) : lightingElementDef;
  const bridge = HTMLBridgeElementFactory(superDef.bridge, keys$1(apiFields), keys$1(apiMethods));
  const props = assign$1(create$1(null), superDef.props, apiFields);
  const propsConfig = assign$1(create$1(null), superDef.propsConfig, apiFieldsConfig);
  const methods = assign$1(create$1(null), superDef.methods, apiMethods);
  const wire = assign$1(create$1(null), superDef.wire, wiredFields, wiredMethods);
  connectedCallback = connectedCallback || superDef.connectedCallback;
  disconnectedCallback = disconnectedCallback || superDef.disconnectedCallback;
  renderedCallback = renderedCallback || superDef.renderedCallback;
  errorCallback = errorCallback || superDef.errorCallback;
  render = render || superDef.render;
  const template = getComponentRegisteredTemplate(Ctor) || superDef.template;
  const name = Ctor.name || superDef.name; // installing observed fields into the prototype.

  defineProperties$1(proto, observedFields);
  const def = {
    ctor: Ctor,
    name,
    wire,
    props,
    propsConfig,
    methods,
    bridge,
    template,
    connectedCallback,
    disconnectedCallback,
    renderedCallback,
    errorCallback,
    render
  };
  {
    freeze$1(Ctor.prototype);
  }
  return def;
}
/**
 * EXPERIMENTAL: This function allows for the identification of LWC constructors. This API is
 * subject to change or being removed.
 */

function isComponentConstructor(ctor) {
  if (!isFunction$1(ctor)) {
    return false;
  } // Fast path: LightningElement is part of the prototype chain of the constructor.

  if (ctor.prototype instanceof BaseLightningElement) {
    return true;
  } // Slow path: LightningElement is not part of the prototype chain of the constructor, we need
  // climb up the constructor prototype chain to check in case there are circular dependencies
  // to resolve.

  let current = ctor;
  do {
    if (isCircularModuleDependency(current)) {
      const circularResolved = resolveCircularModuleDependency(current); // If the circular function returns itself, that's the signal that we have hit the end
      // of the proto chain, which must always be a valid base constructor.

      if (circularResolved === current) {
        return true;
      }
      current = circularResolved;
    }
    if (current === BaseLightningElement) {
      return true;
    }
  } while (!isNull$1(current) && (current = getPrototypeOf$1(current))); // Finally return false if the LightningElement is not part of the prototype chain.

  return false;
}
function getComponentInternalDef(Ctor) {
  let def = CtorToDefMap.get(Ctor);
  if (isUndefined$1(def)) {
    if (isCircularModuleDependency(Ctor)) {
      const resolvedCtor = resolveCircularModuleDependency(Ctor);
      def = getComponentInternalDef(resolvedCtor); // Cache the unresolved component ctor too. The next time if the same unresolved ctor is used,
      // look up the definition in cache instead of re-resolving and recreating the def.

      CtorToDefMap.set(Ctor, def);
      return def;
    }
    if (!isComponentConstructor(Ctor)) {
      throw new TypeError(`${Ctor} is not a valid component, or does not extends LightningElement from "lwc". You probably forgot to add the extend clause on the class declaration.`);
    }
    def = createComponentDef(Ctor);
    CtorToDefMap.set(Ctor, def);
  }
  return def;
}
/** Set prototype for public methods and properties on the element. No DOM Patching occurs here. */

function setElementProto(elm, def) {
  setPrototypeOf$1(elm, def.bridge.prototype);
}
const lightingElementDef = {
  ctor: BaseLightningElement,
  name: BaseLightningElement.name,
  props: lightningBasedDescriptors,
  propsConfig: EmptyObject,
  methods: EmptyObject,
  wire: EmptyObject,
  bridge: BaseBridgeElement,
  template: defaultEmptyTemplate,
  render: BaseLightningElement.prototype.render
};
var PropDefType;
(function (PropDefType) {
  PropDefType["any"] = "any";
})(PropDefType || (PropDefType = {}));

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

const noop = () => void 0;
function observeElementChildNodes(elm) {
  elm.$domManual$ = true;
}
function setElementShadowToken(elm, token) {
  elm.$shadowToken$ = token;
}
function updateNodeHook(oldVnode, vnode) {
  const {
    elm,
    text,
    owner: {
      renderer
    }
  } = vnode;
  if (oldVnode.text !== text) {
    {
      unlockDomMutation();
    }
    renderer.setText(elm, text);
    {
      lockDomMutation();
    }
  }
}
function insertNodeHook(vnode, parentNode, referenceNode) {
  const {
    renderer
  } = vnode.owner;
  {
    unlockDomMutation();
  }
  renderer.insert(vnode.elm, parentNode, referenceNode);
  {
    lockDomMutation();
  }
}
function removeNodeHook(vnode, parentNode) {
  const {
    renderer
  } = vnode.owner;
  {
    unlockDomMutation();
  }
  renderer.remove(vnode.elm, parentNode);
  {
    lockDomMutation();
  }
}
function createElmHook(vnode) {
  modEvents.create(vnode); // Attrs need to be applied to element before props
  // IE11 will wipe out value on radio inputs if value
  // is set before type=radio.

  modAttrs.create(vnode);
  modProps.create(vnode);
  modStaticClassName.create(vnode);
  modStaticStyle.create(vnode);
  modComputedClassName.create(vnode);
  modComputedStyle.create(vnode);
}
var LWCDOMMode;
(function (LWCDOMMode) {
  LWCDOMMode["manual"] = "manual";
})(LWCDOMMode || (LWCDOMMode = {}));
function fallbackElmHook(elm, vnode) {
  const {
    owner
  } = vnode;
  if (isTrue$1$1(owner.renderer.syntheticShadow)) {
    const {
      data: {
        context
      }
    } = vnode;
    const {
      shadowAttribute
    } = owner.context;
    if (!isUndefined$1(context) && !isUndefined$1(context.lwc) && context.lwc.dom === LWCDOMMode.manual) {
      // this element will now accept any manual content inserted into it
      observeElementChildNodes(elm);
    } // when running in synthetic shadow mode, we need to set the shadowToken value
    // into each element from the template, so they can be styled accordingly.

    setElementShadowToken(elm, shadowAttribute);
  }
  {
    const {
      data: {
        context
      }
    } = vnode;
    const isPortal = !isUndefined$1(context) && !isUndefined$1(context.lwc) && context.lwc.dom === LWCDOMMode.manual;
    patchElementWithRestrictions(elm, {
      isPortal
    });
  }
}
function updateElmHook(oldVnode, vnode) {
  // Attrs need to be applied to element before props
  // IE11 will wipe out value on radio inputs if value
  // is set before type=radio.
  modAttrs.update(oldVnode, vnode);
  modProps.update(oldVnode, vnode);
  modComputedClassName.update(oldVnode, vnode);
  modComputedStyle.update(oldVnode, vnode);
}
function insertCustomElmHook(vnode) {
  const vm = getAssociatedVM(vnode.elm);
  appendVM(vm);
}
function updateChildrenHook(oldVnode, vnode) {
  const {
    children,
    owner
  } = vnode;
  const fn = hasDynamicChildren(children) ? updateDynamicChildren : updateStaticChildren;
  runWithBoundaryProtection(owner, owner.owner, noop, () => {
    fn(vnode.elm, oldVnode.children, children);
  }, noop);
}
function allocateChildrenHook(vnode) {
  const vm = getAssociatedVM(vnode.elm); // A component with slots will re-render because:
  // 1- There is a change of the internal state.
  // 2- There is a change on the external api (ex: slots)
  //
  // In case #1, the vnodes in the cmpSlots will be reused since they didn't changed. This routine emptied the
  // slotted children when those VCustomElement were rendered and therefore in subsequent calls to allocate children
  // in a reused VCustomElement, there won't be any slotted children.
  // For those cases, we will use the reference for allocated children stored when rendering the fresh VCustomElement.
  //
  // In case #2, we will always get a fresh VCustomElement.

  const children = vnode.aChildren || vnode.children;
  vm.aChildren = children;
  if (isTrue$1$1(vm.renderer.syntheticShadow)) {
    // slow path
    allocateInSlot(vm, children); // save the allocated children in case this vnode is reused.

    vnode.aChildren = children; // every child vnode is now allocated, and the host should receive none directly, it receives them via the shadow!

    vnode.children = EmptyArray;
  }
}
function createViewModelHook(elm, vnode) {
  if (!isUndefined$1(getAssociatedVMIfPresent(elm))) {
    // There is a possibility that a custom element is registered under tagName,
    // in which case, the initialization is already carry on, and there is nothing else
    // to do here since this hook is called right after invoking `document.createElement`.
    return;
  }
  const {
    sel,
    mode,
    ctor,
    owner
  } = vnode;
  const def = getComponentInternalDef(ctor);
  setElementProto(elm, def);
  if (isTrue$1$1(owner.renderer.syntheticShadow)) {
    const {
      shadowAttribute
    } = owner.context; // when running in synthetic shadow mode, we need to set the shadowToken value
    // into each element from the template, so they can be styled accordingly.

    setElementShadowToken(elm, shadowAttribute);
  }
  createVM(elm, def, {
    mode,
    owner,
    tagName: sel,
    renderer: owner.renderer
  });
  {
    assert$1.isTrue(isArray$2(vnode.children), `Invalid vnode for a custom element, it must have children defined.`);
  }
}
function createCustomElmHook(vnode) {
  modEvents.create(vnode); // Attrs need to be applied to element before props
  // IE11 will wipe out value on radio inputs if value
  // is set before type=radio.

  modAttrs.create(vnode);
  modProps.create(vnode);
  modStaticClassName.create(vnode);
  modStaticStyle.create(vnode);
  modComputedClassName.create(vnode);
  modComputedStyle.create(vnode);
}
function createChildrenHook(vnode) {
  const {
    elm,
    children
  } = vnode;
  for (let j = 0; j < children.length; ++j) {
    const ch = children[j];
    if (ch != null) {
      ch.hook.create(ch);
      ch.hook.insert(ch, elm, null);
    }
  }
}
function rerenderCustomElmHook(vnode) {
  const vm = getAssociatedVM(vnode.elm);
  {
    assert$1.isTrue(isArray$2(vnode.children), `Invalid vnode for a custom element, it must have children defined.`);
  }
  rerenderVM(vm);
}
function updateCustomElmHook(oldVnode, vnode) {
  // Attrs need to be applied to element before props
  // IE11 will wipe out value on radio inputs if value
  // is set before type=radio.
  modAttrs.update(oldVnode, vnode);
  modProps.update(oldVnode, vnode);
  modComputedClassName.update(oldVnode, vnode);
  modComputedStyle.update(oldVnode, vnode);
}
function removeElmHook(vnode) {
  // this method only needs to search on child vnodes from template
  // to trigger the remove hook just in case some of those children
  // are custom elements.
  const {
    children,
    elm
  } = vnode;
  for (let j = 0, len = children.length; j < len; ++j) {
    const ch = children[j];
    if (!isNull$1(ch)) {
      ch.hook.remove(ch, elm);
    }
  }
}
function removeCustomElmHook(vnode) {
  // for custom elements we don't have to go recursively because the removeVM routine
  // will take care of disconnecting any child VM attached to its shadow as well.
  removeVM(getAssociatedVM(vnode.elm));
} // Using a WeakMap instead of a WeakSet because this one works in IE11 :(

const FromIteration = new WeakMap(); // dynamic children means it was generated by an iteration
// in a template, and will require a more complex diffing algo.

function markAsDynamicChildren(children) {
  FromIteration.set(children, 1);
}
function hasDynamicChildren(children) {
  return FromIteration.has(children);
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const CHAR_S = 115;
const CHAR_V = 118;
const CHAR_G = 103;
const NamespaceAttributeForSVG = 'http://www.w3.org/2000/svg';
const SymbolIterator = Symbol.iterator;
const TextHook = {
  create: vnode => {
    const {
      renderer
    } = vnode.owner;
    const elm = renderer.createText(vnode.text);
    linkNodeToShadow(elm, vnode);
    vnode.elm = elm;
  },
  update: updateNodeHook,
  insert: insertNodeHook,
  move: insertNodeHook,
  remove: removeNodeHook
}; // insert is called after update, which is used somewhere else (via a module)
// to mark the vm as inserted, that means we cannot use update as the main channel
// to rehydrate when dirty, because sometimes the element is not inserted just yet,
// which breaks some invariants. For that reason, we have the following for any
// Custom Element that is inserted via a template.

const ElementHook = {
  create: vnode => {
    const {
      sel,
      data: {
        ns
      },
      owner: {
        renderer
      }
    } = vnode;
    const elm = renderer.createElement(sel, ns);
    linkNodeToShadow(elm, vnode);
    fallbackElmHook(elm, vnode);
    vnode.elm = elm;
    createElmHook(vnode);
  },
  update: (oldVnode, vnode) => {
    updateElmHook(oldVnode, vnode);
    updateChildrenHook(oldVnode, vnode);
  },
  insert: (vnode, parentNode, referenceNode) => {
    insertNodeHook(vnode, parentNode, referenceNode);
    createChildrenHook(vnode);
  },
  move: (vnode, parentNode, referenceNode) => {
    insertNodeHook(vnode, parentNode, referenceNode);
  },
  remove: (vnode, parentNode) => {
    removeNodeHook(vnode, parentNode);
    removeElmHook(vnode);
  }
};
const CustomElementHook = {
  create: vnode => {
    const {
      sel,
      owner: {
        renderer
      }
    } = vnode;
    const elm = renderer.createElement(sel);
    linkNodeToShadow(elm, vnode);
    createViewModelHook(elm, vnode);
    vnode.elm = elm;
    allocateChildrenHook(vnode);
    createCustomElmHook(vnode);
  },
  update: (oldVnode, vnode) => {
    updateCustomElmHook(oldVnode, vnode); // in fallback mode, the allocation will always set children to
    // empty and delegate the real allocation to the slot elements

    allocateChildrenHook(vnode); // in fallback mode, the children will be always empty, so, nothing
    // will happen, but in native, it does allocate the light dom

    updateChildrenHook(oldVnode, vnode); // this will update the shadowRoot

    rerenderCustomElmHook(vnode);
  },
  insert: (vnode, parentNode, referenceNode) => {
    insertNodeHook(vnode, parentNode, referenceNode);
    const vm = getAssociatedVM(vnode.elm);
    {
      assert$1.isTrue(vm.state === VMState.created, `${vm} cannot be recycled.`);
    }
    runConnectedCallback(vm);
    createChildrenHook(vnode);
    insertCustomElmHook(vnode);
  },
  move: (vnode, parentNode, referenceNode) => {
    insertNodeHook(vnode, parentNode, referenceNode);
  },
  remove: (vnode, parentNode) => {
    removeNodeHook(vnode, parentNode);
    removeCustomElmHook(vnode);
  }
};
function linkNodeToShadow(elm, vnode) {
  // TODO [#1164]: this should eventually be done by the polyfill directly
  elm.$shadowResolver$ = vnode.owner.cmpRoot.$shadowResolver$;
} // TODO [#1136]: this should be done by the compiler, adding ns to every sub-element

function addNS(vnode) {
  const {
    data,
    children,
    sel
  } = vnode;
  data.ns = NamespaceAttributeForSVG; // TODO [#1275]: review why `sel` equal `foreignObject` should get this `ns`

  if (isArray$2(children) && sel !== 'foreignObject') {
    for (let j = 0, n = children.length; j < n; ++j) {
      const childNode = children[j];
      if (childNode != null && childNode.hook === ElementHook) {
        addNS(childNode);
      }
    }
  }
}
function addVNodeToChildLWC(vnode) {
  ArrayPush$1.call(getVMBeingRendered().velements, vnode);
} // [h]tml node

function h(sel, data, children) {
  const vmBeingRendered = getVMBeingRendered();
  {
    assert$1.isTrue(isString(sel), `h() 1st argument sel must be a string.`);
    assert$1.isTrue(isObject$2(data), `h() 2nd argument data must be an object.`);
    assert$1.isTrue(isArray$2(children), `h() 3rd argument children must be an array.`);
    assert$1.isTrue('key' in data, ` <${sel}> "key" attribute is invalid or missing for ${vmBeingRendered}. Key inside iterator is either undefined or null.`); // checking reserved internal data properties

    assert$1.isFalse(data.className && data.classMap, `vnode.data.className and vnode.data.classMap ambiguous declaration.`);
    assert$1.isFalse(data.styleMap && data.style, `vnode.data.styleMap and vnode.data.style ambiguous declaration.`);
    if (data.style && !isString(data.style)) {
      logError(`Invalid 'style' attribute passed to <${sel}> is ignored. This attribute must be a string value.`, vmBeingRendered);
    }
    forEach$1.call(children, childVnode => {
      if (childVnode != null) {
        assert$1.isTrue(childVnode && 'sel' in childVnode && 'data' in childVnode && 'children' in childVnode && 'text' in childVnode && 'elm' in childVnode && 'key' in childVnode, `${childVnode} is not a vnode.`);
      }
    });
  }
  const {
    key
  } = data;
  let text, elm;
  const vnode = {
    sel,
    data,
    children,
    text,
    elm,
    key,
    hook: ElementHook,
    owner: vmBeingRendered
  };
  if (sel.length === 3 && StringCharCodeAt$1.call(sel, 0) === CHAR_S && StringCharCodeAt$1.call(sel, 1) === CHAR_V && StringCharCodeAt$1.call(sel, 2) === CHAR_G) {
    addNS(vnode);
  }
  return vnode;
} // [t]ab[i]ndex function

function ti(value) {
  // if value is greater than 0, we normalize to 0
  // If value is an invalid tabIndex value (null, undefined, string, etc), we let that value pass through
  // If value is less than -1, we don't care
  const shouldNormalize = value > 0 && !(isTrue$1$1(value) || isFalse$1$1(value));
  {
    const vmBeingRendered = getVMBeingRendered();
    if (shouldNormalize) {
      logError(`Invalid tabindex value \`${toString$1(value)}\` in template for ${vmBeingRendered}. This attribute must be set to 0 or -1.`, vmBeingRendered);
    }
  }
  return shouldNormalize ? 0 : value;
} // [s]lot element node

function s(slotName, data, children, slotset) {
  {
    assert$1.isTrue(isString(slotName), `s() 1st argument slotName must be a string.`);
    assert$1.isTrue(isObject$2(data), `s() 2nd argument data must be an object.`);
    assert$1.isTrue(isArray$2(children), `h() 3rd argument children must be an array.`);
  }
  if (!isUndefined$1(slotset) && !isUndefined$1(slotset[slotName]) && slotset[slotName].length !== 0) {
    children = slotset[slotName];
  }
  const vnode = h('slot', data, children);
  if (vnode.owner.renderer.syntheticShadow) {
    // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic
    sc(children);
  }
  return vnode;
} // [c]ustom element node

function c(sel, Ctor, data, children = EmptyArray) {
  const vmBeingRendered = getVMBeingRendered();
  {
    assert$1.isTrue(isString(sel), `c() 1st argument sel must be a string.`);
    assert$1.isTrue(isFunction$1(Ctor), `c() 2nd argument Ctor must be a function.`);
    assert$1.isTrue(isObject$2(data), `c() 3nd argument data must be an object.`);
    assert$1.isTrue(arguments.length === 3 || isArray$2(children), `c() 4nd argument data must be an array.`); // checking reserved internal data properties

    assert$1.isFalse(data.className && data.classMap, `vnode.data.className and vnode.data.classMap ambiguous declaration.`);
    assert$1.isFalse(data.styleMap && data.style, `vnode.data.styleMap and vnode.data.style ambiguous declaration.`);
    if (data.style && !isString(data.style)) {
      logError(`Invalid 'style' attribute passed to <${sel}> is ignored. This attribute must be a string value.`, vmBeingRendered);
    }
    if (arguments.length === 4) {
      forEach$1.call(children, childVnode => {
        if (childVnode != null) {
          assert$1.isTrue(childVnode && 'sel' in childVnode && 'data' in childVnode && 'children' in childVnode && 'text' in childVnode && 'elm' in childVnode && 'key' in childVnode, `${childVnode} is not a vnode.`);
        }
      });
    }
  }
  const {
    key
  } = data;
  let text, elm;
  const vnode = {
    sel,
    data,
    children,
    text,
    elm,
    key,
    hook: CustomElementHook,
    ctor: Ctor,
    owner: vmBeingRendered,
    mode: 'open'
  };
  addVNodeToChildLWC(vnode);
  return vnode;
} // [i]terable node

function i(iterable, factory) {
  const list = []; // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic

  sc(list);
  const vmBeingRendered = getVMBeingRendered();
  if (isUndefined$1(iterable) || iterable === null) {
    {
      logError(`Invalid template iteration for value "${toString$1(iterable)}" in ${vmBeingRendered}. It must be an Array or an iterable Object.`, vmBeingRendered);
    }
    return list;
  }
  {
    assert$1.isFalse(isUndefined$1(iterable[SymbolIterator]), `Invalid template iteration for value \`${toString$1(iterable)}\` in ${vmBeingRendered}. It must be an array-like object and not \`null\` nor \`undefined\`.`);
  }
  const iterator = iterable[SymbolIterator]();
  {
    assert$1.isTrue(iterator && isFunction$1(iterator.next), `Invalid iterator function for "${toString$1(iterable)}" in ${vmBeingRendered}.`);
  }
  let next = iterator.next();
  let j = 0;
  let {
    value,
    done: last
  } = next;
  let keyMap;
  let iterationError;
  {
    keyMap = create$1(null);
  }
  while (last === false) {
    // implementing a look-back-approach because we need to know if the element is the last
    next = iterator.next();
    last = next.done; // template factory logic based on the previous collected value

    const vnode = factory(value, j, j === 0, last);
    if (isArray$2(vnode)) {
      ArrayPush$1.apply(list, vnode);
    } else {
      ArrayPush$1.call(list, vnode);
    }
    {
      const vnodes = isArray$2(vnode) ? vnode : [vnode];
      forEach$1.call(vnodes, childVnode => {
        if (!isNull$1(childVnode) && isObject$2(childVnode) && !isUndefined$1(childVnode.sel)) {
          const {
            key
          } = childVnode;
          if (isString(key) || isNumber(key)) {
            if (keyMap[key] === 1 && isUndefined$1(iterationError)) {
              iterationError = `Duplicated "key" attribute value for "<${childVnode.sel}>" in ${vmBeingRendered} for item number ${j}. A key with value "${childVnode.key}" appears more than once in the iteration. Key values must be unique numbers or strings.`;
            }
            keyMap[key] = 1;
          } else if (isUndefined$1(iterationError)) {
            iterationError = `Invalid "key" attribute value in "<${childVnode.sel}>" in ${vmBeingRendered} for item number ${j}. Set a unique "key" value on all iterated child elements.`;
          }
        }
      });
    } // preparing next value

    j += 1;
    value = next.value;
  }
  {
    if (!isUndefined$1(iterationError)) {
      logError(iterationError, vmBeingRendered);
    }
  }
  return list;
}
/**
 * [f]lattening
 */

function f(items) {
  {
    assert$1.isTrue(isArray$2(items), 'flattening api can only work with arrays.');
  }
  const len = items.length;
  const flattened = []; // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic

  sc(flattened);
  for (let j = 0; j < len; j += 1) {
    const item = items[j];
    if (isArray$2(item)) {
      ArrayPush$1.apply(flattened, item);
    } else {
      ArrayPush$1.call(flattened, item);
    }
  }
  return flattened;
} // [t]ext node

function t(text) {
  const data = EmptyObject;
  let sel, children, key, elm;
  return {
    sel,
    data,
    children,
    text,
    elm,
    key,
    hook: TextHook,
    owner: getVMBeingRendered()
  };
} // [d]ynamic value to produce a text vnode

function d(value) {
  if (value == null) {
    return null;
  }
  return t(value);
} // [b]ind function

function b(fn) {
  const vmBeingRendered = getVMBeingRendered();
  if (isNull$1(vmBeingRendered)) {
    throw new Error();
  }
  const vm = vmBeingRendered;
  return function (event) {
    invokeEventListener(vm, fn, vm.component, event);
  };
} // [k]ey function

function k(compilerKey, obj) {
  switch (typeof obj) {
    case 'number':
    case 'string':
      return compilerKey + ':' + obj;
    case 'object':
      {
        assert$1.fail(`Invalid key value "${obj}" in ${getVMBeingRendered()}. Key must be a string or number.`);
      }
  }
} // [g]lobal [id] function

function gid(id) {
  const vmBeingRendered = getVMBeingRendered();
  if (isUndefined$1(id) || id === '') {
    {
      logError(`Invalid id value "${id}". The id attribute must contain a non-empty string.`, vmBeingRendered);
    }
    return id;
  } // We remove attributes when they are assigned a value of null

  if (isNull$1(id)) {
    return null;
  }
  return `${id}-${vmBeingRendered.idx}`;
} // [f]ragment [id] function

function fid(url) {
  const vmBeingRendered = getVMBeingRendered();
  if (isUndefined$1(url) || url === '') {
    {
      if (isUndefined$1(url)) {
        logError(`Undefined url value for "href" or "xlink:href" attribute. Expected a non-empty string.`, vmBeingRendered);
      }
    }
    return url;
  } // We remove attributes when they are assigned a value of null

  if (isNull$1(url)) {
    return null;
  } // Apply transformation only for fragment-only-urls

  if (/^#/.test(url)) {
    return `${url}-${vmBeingRendered.idx}`;
  }
  return url;
}
/**
 * Map to store an index value assigned to any dynamic component reference ingested
 * by dc() api. This allows us to generate a unique unique per template per dynamic
 * component reference to avoid diffing algo mismatches.
 */

const DynamicImportedComponentMap = new Map();
let dynamicImportedComponentCounter = 0;
/**
 * create a dynamic component via `<x-foo lwc:dynamic={Ctor}>`
 */

function dc(sel, Ctor, data, children) {
  {
    assert$1.isTrue(isString(sel), `dc() 1st argument sel must be a string.`);
    assert$1.isTrue(isObject$2(data), `dc() 3nd argument data must be an object.`);
    assert$1.isTrue(arguments.length === 3 || isArray$2(children), `dc() 4nd argument data must be an array.`);
  } // null or undefined values should produce a null value in the VNodes

  if (Ctor == null) {
    return null;
  }
  if (!isComponentConstructor(Ctor)) {
    throw new Error(`Invalid LWC Constructor ${toString$1(Ctor)} for custom element <${sel}>.`);
  }
  let idx = DynamicImportedComponentMap.get(Ctor);
  if (isUndefined$1(idx)) {
    idx = dynamicImportedComponentCounter++;
    DynamicImportedComponentMap.set(Ctor, idx);
  } // the new vnode key is a mix of idx and compiler key, this is required by the diffing algo
  // to identify different constructors as vnodes with different keys to avoid reusing the
  // element used for previous constructors.

  data.key = `dc:${idx}:${data.key}`;
  return c(sel, Ctor, data, children);
}
/**
 * slow children collection marking mechanism. this API allows the compiler to signal
 * to the engine that a particular collection of children must be diffed using the slow
 * algo based on keys due to the nature of the list. E.g.:
 *
 *   - slot element's children: the content of the slot has to be dynamic when in synthetic
 *                              shadow mode because the `vnode.children` might be the slotted
 *                              content vs default content, in which case the size and the
 *                              keys are not matching.
 *   - children that contain dynamic components
 *   - children that are produced by iteration
 *
 */

function sc(vnodes) {
  {
    assert$1.isTrue(isArray$2(vnodes), 'sc() api can only work with arrays.');
  } // We have to mark the vnodes collection as dynamic so we can later on
  // choose to use the snabbdom virtual dom diffing algo instead of our
  // static dummy algo.

  markAsDynamicChildren(vnodes);
  return vnodes;
}
var api$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  h: h,
  ti: ti,
  s: s,
  c: c,
  i: i,
  f: f,
  t: t,
  d: d,
  b: b,
  k: k,
  gid: gid,
  fid: fid,
  dc: dc,
  sc: sc
});

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */

function createShadowStyleVNode(content) {
  return h('style', {
    key: 'style',
    attrs: {
      type: 'text/css'
    }
  }, [t(content)]);
}
function updateSyntheticShadowAttributes(vm, template) {
  const {
    elm,
    context,
    renderer
  } = vm;
  const {
    stylesheets: newStylesheets,
    stylesheetTokens: newStylesheetTokens
  } = template;
  let newHostAttribute;
  let newShadowAttribute; // Reset the styling token applied to the host element.

  const oldHostAttribute = context.hostAttribute;
  if (!isUndefined$1(oldHostAttribute)) {
    renderer.removeAttribute(elm, oldHostAttribute);
  } // Apply the new template styling token to the host element, if the new template has any
  // associated stylesheets.

  if (!isUndefined$1(newStylesheetTokens) && !isUndefined$1(newStylesheets) && newStylesheets.length !== 0) {
    newHostAttribute = newStylesheetTokens.hostAttribute;
    newShadowAttribute = newStylesheetTokens.shadowAttribute;
    renderer.setAttribute(elm, newHostAttribute, '');
  } // Update the styling tokens present on the context object.

  context.hostAttribute = newHostAttribute;
  context.shadowAttribute = newShadowAttribute;
}
function evaluateStylesheetsContent(stylesheets, hostSelector, shadowSelector, nativeShadow) {
  const content = [];
  for (let i = 0; i < stylesheets.length; i++) {
    const stylesheet = stylesheets[i];
    if (isArray$2(stylesheet)) {
      ArrayPush$1.apply(content, evaluateStylesheetsContent(stylesheet, hostSelector, shadowSelector, nativeShadow));
    } else {
      ArrayPush$1.call(content, stylesheet(hostSelector, shadowSelector, nativeShadow));
    }
  }
  return content;
}
function getStylesheetsContent(vm, template) {
  const {
    stylesheets,
    stylesheetTokens: tokens
  } = template;
  const {
    syntheticShadow
  } = vm.renderer;
  let content = [];
  if (!isUndefined$1(stylesheets) && !isUndefined$1(tokens)) {
    const hostSelector = syntheticShadow ? `[${tokens.hostAttribute}]` : '';
    const shadowSelector = syntheticShadow ? `[${tokens.shadowAttribute}]` : '';
    content = evaluateStylesheetsContent(stylesheets, hostSelector, shadowSelector, !syntheticShadow);
  }
  return content;
}
function createStylesheet(vm, stylesheets) {
  const {
    renderer
  } = vm;
  if (renderer.syntheticShadow) {
    for (let i = 0; i < stylesheets.length; i++) {
      renderer.insertGlobalStylesheet(stylesheets[i]);
    }
    return null;
  } else {
    const shadowStyleSheetContent = ArrayJoin$1.call(stylesheets, '\n');
    return createShadowStyleVNode(shadowStyleSheetContent);
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
var GlobalMeasurementPhase;
(function (GlobalMeasurementPhase) {
  GlobalMeasurementPhase["REHYDRATE"] = "lwc-rehydrate";
  GlobalMeasurementPhase["HYDRATE"] = "lwc-hydrate";
})(GlobalMeasurementPhase || (GlobalMeasurementPhase = {})); // Even if all the browser the engine supports implements the UserTiming API, we need to guard the measure APIs.
// JSDom (used in Jest) for example doesn't implement the UserTiming APIs.

const isUserTimingSupported = typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.clearMarks === 'function' && typeof performance.measure === 'function' && typeof performance.clearMeasures === 'function';
function getMarkName(phase, vm) {
  // Adding the VM idx to the mark name creates a unique mark name component instance. This is necessary to produce
  // the right measures for components that are recursive.
  return `${getComponentTag(vm)} - ${phase} - ${vm.idx}`;
}
function getMeasureName(phase, vm) {
  return `${getComponentTag(vm)} - ${phase}`;
}
function start(markName) {
  performance.mark(markName);
}
function end(measureName, markName) {
  performance.measure(measureName, markName); // Clear the created marks and measure to avoid filling the performance entries buffer.
  // Note: Even if the entries get deleted, existing PerformanceObservers preserve a copy of those entries.

  performance.clearMarks(markName);
  performance.clearMarks(measureName);
}
function noop$1() {
  /* do nothing */
}
const startMeasure = !isUserTimingSupported ? noop$1 : function (phase, vm) {
  const markName = getMarkName(phase, vm);
  start(markName);
};
const endMeasure = !isUserTimingSupported ? noop$1 : function (phase, vm) {
  const markName = getMarkName(phase, vm);
  const measureName = getMeasureName(phase, vm);
  end(measureName, markName);
};
const startGlobalMeasure = !isUserTimingSupported ? noop$1 : function (phase, vm) {
  const markName = isUndefined$1(vm) ? phase : getMarkName(phase, vm);
  start(markName);
};
const endGlobalMeasure = !isUserTimingSupported ? noop$1 : function (phase, vm) {
  const markName = isUndefined$1(vm) ? phase : getMarkName(phase, vm);
  end(phase, markName);
};

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
let isUpdatingTemplate = false;
let vmBeingRendered = null;
function getVMBeingRendered() {
  return vmBeingRendered;
}
function setVMBeingRendered(vm) {
  vmBeingRendered = vm;
}
function validateSlots(vm, html) {
  const {
    cmpSlots
  } = vm;
  const {
    slots = EmptyArray
  } = html;
  for (const slotName in cmpSlots) {
    // eslint-disable-next-line lwc-internal/no-production-assert
    assert$1.isTrue(isArray$2(cmpSlots[slotName]), `Slots can only be set to an array, instead received ${toString$1(cmpSlots[slotName])} for slot "${slotName}" in ${vm}.`);
    if (slotName !== '' && ArrayIndexOf$1.call(slots, slotName) === -1) {
      // TODO [#1297]: this should never really happen because the compiler should always validate
      // eslint-disable-next-line lwc-internal/no-production-assert
      logError(`Ignoring unknown provided slot name "${slotName}" in ${vm}. Check for a typo on the slot attribute.`, vm);
    }
  }
}
function evaluateTemplate(vm, html) {
  {
    assert$1.isTrue(isFunction$1(html), `evaluateTemplate() second argument must be an imported template instead of ${toString$1(html)}`);
  }
  const isUpdatingTemplateInception = isUpdatingTemplate;
  const vmOfTemplateBeingUpdatedInception = vmBeingRendered;
  let vnodes = [];
  runWithBoundaryProtection(vm, vm.owner, () => {
    // pre
    vmBeingRendered = vm;
    {
      startMeasure('render', vm);
    }
  }, () => {
    // job
    const {
      component,
      context,
      cmpSlots,
      cmpTemplate,
      tro,
      renderer
    } = vm;
    tro.observe(() => {
      // Reset the cache memoizer for template when needed.
      if (html !== cmpTemplate) {
        // Perf opt: do not reset the shadow root during the first rendering (there is
        // nothing to reset).
        if (!isNull$1(cmpTemplate)) {
          // It is important to reset the content to avoid reusing similar elements
          // generated from a different template, because they could have similar IDs,
          // and snabbdom just rely on the IDs.
          resetShadowRoot(vm);
        } // Check that the template was built by the compiler.

        if (!isTemplateRegistered(html)) {
          throw new TypeError(`Invalid template returned by the render() method on ${vm}. It must return an imported template (e.g.: \`import html from "./${vm.def.name}.html"\`), instead, it has returned: ${toString$1(html)}.`);
        }
        vm.cmpTemplate = html; // Create a brand new template cache for the swapped templated.

        context.tplCache = create$1(null); // Update the synthetic shadow attributes on the host element if necessary.

        if (renderer.syntheticShadow) {
          updateSyntheticShadowAttributes(vm, html);
        } // Evaluate, create stylesheet and cache the produced VNode for future
        // re-rendering.

        const stylesheetsContent = getStylesheetsContent(vm, html);
        context.styleVNode = stylesheetsContent.length === 0 ? null : createStylesheet(vm, stylesheetsContent);
      }
      if (undefined !== 'production') {
        // validating slots in every rendering since the allocated content might change over time
        validateSlots(vm, html);
      } // right before producing the vnodes, we clear up all internal references
      // to custom elements from the template.

      vm.velements = []; // Set the global flag that template is being updated

      isUpdatingTemplate = true;
      vnodes = html.call(undefined, api$1, component, cmpSlots, context.tplCache);
      const {
        styleVNode
      } = context;
      if (!isNull$1(styleVNode)) {
        ArrayUnshift$2.call(vnodes, styleVNode);
      }
    });
  }, () => {
    // post
    isUpdatingTemplate = isUpdatingTemplateInception;
    vmBeingRendered = vmOfTemplateBeingUpdatedInception;
    {
      endMeasure('render', vm);
    }
  });
  {
    assert$1.invariant(isArray$2(vnodes), `Compiler should produce html functions that always return an array.`);
  }
  return vnodes;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
function addErrorComponentStack(vm, error) {
  if (!isFrozen$1(error) && isUndefined$1(error.wcStack)) {
    const wcStack = getErrorComponentStack(vm);
    defineProperty$1(error, 'wcStack', {
      get() {
        return wcStack;
      }
    });
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
let isInvokingRender = false;
let vmBeingConstructed = null;
function isBeingConstructed(vm) {
  return vmBeingConstructed === vm;
}
const noop$2 = () => void 0;
function invokeComponentCallback(vm, fn, args) {
  const {
    component,
    callHook,
    owner
  } = vm;
  let result;
  runWithBoundaryProtection(vm, owner, noop$2, () => {
    // job
    result = callHook(component, fn, args);
  }, noop$2);
  return result;
}
function invokeComponentConstructor(vm, Ctor) {
  const vmBeingConstructedInception = vmBeingConstructed;
  let error;
  {
    startMeasure('constructor', vm);
  }
  vmBeingConstructed = vm;
  /**
   * Constructors don't need to be wrapped with a boundary because for root elements
   * it should throw, while elements from template are already wrapped by a boundary
   * associated to the diffing algo.
   */

  try {
    // job
    const result = new Ctor(); // Check indirectly if the constructor result is an instance of LightningElement. Using
    // the "instanceof" operator would not work here since Locker Service provides its own
    // implementation of LightningElement, so we indirectly check if the base constructor is
    // invoked by accessing the component on the vm.

    if (vmBeingConstructed.component !== result) {
      throw new TypeError('Invalid component constructor, the class should extend LightningElement.');
    }
  } catch (e) {
    error = Object(e);
  } finally {
    {
      endMeasure('constructor', vm);
    }
    vmBeingConstructed = vmBeingConstructedInception;
    if (!isUndefined$1(error)) {
      addErrorComponentStack(vm, error); // re-throwing the original error annotated after restoring the context

      throw error; // eslint-disable-line no-unsafe-finally
    }
  }
}

function invokeComponentRenderMethod(vm) {
  const {
    def: {
      render
    },
    callHook,
    component,
    owner
  } = vm;
  const isRenderBeingInvokedInception = isInvokingRender;
  const vmBeingRenderedInception = getVMBeingRendered();
  let html;
  let renderInvocationSuccessful = false;
  runWithBoundaryProtection(vm, owner, () => {
    // pre
    isInvokingRender = true;
    setVMBeingRendered(vm);
  }, () => {
    // job
    vm.tro.observe(() => {
      html = callHook(component, render);
      renderInvocationSuccessful = true;
    });
  }, () => {
    // post
    isInvokingRender = isRenderBeingInvokedInception;
    setVMBeingRendered(vmBeingRenderedInception);
  }); // If render() invocation failed, process errorCallback in boundary and return an empty template

  return renderInvocationSuccessful ? evaluateTemplate(vm, html) : [];
}
function invokeComponentRenderedCallback(vm) {
  const {
    def: {
      renderedCallback
    },
    component,
    callHook,
    owner
  } = vm;
  if (!isUndefined$1(renderedCallback)) {
    runWithBoundaryProtection(vm, owner, () => {
      {
        startMeasure('renderedCallback', vm);
      }
    }, () => {
      // job
      callHook(component, renderedCallback);
    }, () => {
      // post
      {
        endMeasure('renderedCallback', vm);
      }
    });
  }
}
function invokeEventListener(vm, fn, thisValue, event) {
  const {
    callHook,
    owner
  } = vm;
  runWithBoundaryProtection(vm, owner, noop$2, () => {
    // job
    if (undefined !== 'production') {
      assert$1.isTrue(isFunction$1(fn), `Invalid event handler for event '${event.type}' on ${vm}.`);
    }
    callHook(thisValue, fn, [event]);
  }, noop$2);
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const signedTemplateMap = new Map();
/**
 * INTERNAL: This function can only be invoked by compiled code. The compiler
 * will prevent this function from being imported by userland code.
 */

function registerComponent(Ctor, {
  tmpl
}) {
  signedTemplateMap.set(Ctor, tmpl); // chaining this method as a way to wrap existing assignment of component constructor easily,
  // without too much transformation

  return Ctor;
}
function getComponentRegisteredTemplate(Ctor) {
  return signedTemplateMap.get(Ctor);
}
function createComponent(vm, Ctor) {
  // create the component instance
  invokeComponentConstructor(vm, Ctor);
  if (isUndefined$1(vm.component)) {
    throw new ReferenceError(`Invalid construction for ${Ctor}, you must extend LightningElement.`);
  }
}
function getTemplateReactiveObserver(vm) {
  return new ReactiveObserver(() => {
    const {
      isDirty
    } = vm;
    if (isFalse$1$1(isDirty)) {
      markComponentAsDirty(vm);
      scheduleRehydration(vm);
    }
  });
}
function renderComponent(vm) {
  {
    assert$1.invariant(vm.isDirty, `${vm} is not dirty.`);
  }
  vm.tro.reset();
  const vnodes = invokeComponentRenderMethod(vm);
  vm.isDirty = false;
  vm.isScheduled = false;
  {
    assert$1.invariant(isArray$2(vnodes), `${vm}.render() should always return an array of vnodes instead of ${vnodes}`);
  }
  return vnodes;
}
function markComponentAsDirty(vm) {
  {
    const vmBeingRendered = getVMBeingRendered();
    assert$1.isFalse(vm.isDirty, `markComponentAsDirty() for ${vm} should not be called when the component is already dirty.`);
    assert$1.isFalse(isInvokingRender, `markComponentAsDirty() for ${vm} cannot be called during rendering of ${vmBeingRendered}.`);
    assert$1.isFalse(isUpdatingTemplate, `markComponentAsDirty() for ${vm} cannot be called while updating template of ${vmBeingRendered}.`);
  }
  vm.isDirty = true;
}
const cmpEventListenerMap = new WeakMap();
function getWrappedComponentsListener(vm, listener) {
  if (!isFunction$1(listener)) {
    throw new TypeError(); // avoiding problems with non-valid listeners
  }

  let wrappedListener = cmpEventListenerMap.get(listener);
  if (isUndefined$1(wrappedListener)) {
    wrappedListener = function (event) {
      invokeEventListener(vm, listener, undefined, event);
    };
    cmpEventListenerMap.set(listener, wrappedListener);
  }
  return wrappedListener;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const Services = create$1(null);
function invokeServiceHook(vm, cbs) {
  {
    assert$1.isTrue(isArray$2(cbs) && cbs.length > 0, `Optimize invokeServiceHook() to be invoked only when needed`);
  }
  const {
    component,
    def,
    context
  } = vm;
  for (let i = 0, len = cbs.length; i < len; ++i) {
    cbs[i].call(undefined, component, {}, def, context);
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
var VMState;
(function (VMState) {
  VMState[VMState["created"] = 0] = "created";
  VMState[VMState["connected"] = 1] = "connected";
  VMState[VMState["disconnected"] = 2] = "disconnected";
})(VMState || (VMState = {}));
let idx = 0;
/** The internal slot used to associate different objects the engine manipulates with the VM */

const ViewModelReflection = createHiddenField$1('ViewModel', 'engine');
function callHook(cmp, fn, args = []) {
  return fn.apply(cmp, args);
}
function setHook(cmp, prop, newValue) {
  cmp[prop] = newValue;
}
function getHook(cmp, prop) {
  return cmp[prop];
}
function rerenderVM(vm) {
  rehydrate(vm);
}
function connectRootElement(elm) {
  const vm = getAssociatedVM(elm);
  startGlobalMeasure(GlobalMeasurementPhase.HYDRATE, vm); // Usually means moving the element from one place to another, which is observable via
  // life-cycle hooks.

  if (vm.state === VMState.connected) {
    disconnectRootElement(elm);
  }
  runConnectedCallback(vm);
  rehydrate(vm);
  endGlobalMeasure(GlobalMeasurementPhase.HYDRATE, vm);
}
function disconnectRootElement(elm) {
  const vm = getAssociatedVM(elm);
  resetComponentStateWhenRemoved(vm);
}
function appendVM(vm) {
  rehydrate(vm);
} // just in case the component comes back, with this we guarantee re-rendering it
// while preventing any attempt to rehydration until after reinsertion.

function resetComponentStateWhenRemoved(vm) {
  const {
    state
  } = vm;
  if (state !== VMState.disconnected) {
    const {
      oar,
      tro
    } = vm; // Making sure that any observing record will not trigger the rehydrated on this vm

    tro.reset(); // Making sure that any observing accessor record will not trigger the setter to be reinvoked

    for (const key in oar) {
      oar[key].reset();
    }
    runDisconnectedCallback(vm); // Spec: https://dom.spec.whatwg.org/#concept-node-remove (step 14-15)

    runShadowChildNodesDisconnectedCallback(vm);
    runLightChildNodesDisconnectedCallback(vm);
  }
} // this method is triggered by the diffing algo only when a vnode from the
// old vnode.children is removed from the DOM.

function removeVM(vm) {
  {
    assert$1.isTrue(vm.state === VMState.connected || vm.state === VMState.disconnected, `${vm} must have been connected.`);
  }
  resetComponentStateWhenRemoved(vm);
}
function createVM(elm, def, options) {
  const {
    mode,
    owner,
    renderer,
    tagName
  } = options;
  const vm = {
    elm,
    def,
    idx: idx++,
    state: VMState.created,
    isScheduled: false,
    isDirty: true,
    tagName,
    mode,
    owner,
    renderer,
    children: EmptyArray,
    aChildren: EmptyArray,
    velements: EmptyArray,
    cmpProps: create$1(null),
    cmpFields: create$1(null),
    cmpSlots: create$1(null),
    oar: create$1(null),
    cmpTemplate: null,
    context: {
      hostAttribute: undefined,
      shadowAttribute: undefined,
      styleVNode: null,
      tplCache: EmptyObject,
      wiredConnecting: EmptyArray,
      wiredDisconnecting: EmptyArray
    },
    tro: null,
    component: null,
    cmpRoot: null,
    callHook,
    setHook,
    getHook
  };
  vm.tro = getTemplateReactiveObserver(vm);
  {
    vm.toString = () => {
      return `[object:vm ${def.name} (${vm.idx})]`;
    };
  } // Create component instance associated to the vm and the element.

  createComponent(vm, def.ctor); // Initializing the wire decorator per instance only when really needed

  if (isFalse$1$1(renderer.ssr) && hasWireAdapters(vm)) {
    installWireAdapters(vm);
  }
  return vm;
}
function assertIsVM(obj) {
  if (isNull$1(obj) || !isObject$2(obj) || !('cmpRoot' in obj)) {
    throw new TypeError(`${obj} is not a VM.`);
  }
}
function associateVM(obj, vm) {
  setHiddenField$1(obj, ViewModelReflection, vm);
}
function getAssociatedVM(obj) {
  const vm = getHiddenField$1(obj, ViewModelReflection);
  {
    assertIsVM(vm);
  }
  return vm;
}
function getAssociatedVMIfPresent(obj) {
  const maybeVm = getHiddenField$1(obj, ViewModelReflection);
  {
    if (!isUndefined$1(maybeVm)) {
      assertIsVM(maybeVm);
    }
  }
  return maybeVm;
}
function rehydrate(vm) {
  if (isTrue$1$1(vm.isDirty)) {
    const children = renderComponent(vm);
    patchShadowRoot(vm, children);
  }
}
function patchShadowRoot(vm, newCh) {
  const {
    cmpRoot,
    children: oldCh
  } = vm; // caching the new children collection

  vm.children = newCh;
  if (newCh.length > 0 || oldCh.length > 0) {
    // patch function mutates vnodes by adding the element reference,
    // however, if patching fails it contains partial changes.
    if (oldCh !== newCh) {
      const fn = hasDynamicChildren(newCh) ? updateDynamicChildren : updateStaticChildren;
      runWithBoundaryProtection(vm, vm, () => {
        // pre
        {
          startMeasure('patch', vm);
        }
      }, () => {
        // job
        fn(cmpRoot, oldCh, newCh);
      }, () => {
        // post
        {
          endMeasure('patch', vm);
        }
      });
    }
  }
  if (vm.state === VMState.connected) {
    // If the element is connected, that means connectedCallback was already issued, and
    // any successive rendering should finish with the call to renderedCallback, otherwise
    // the connectedCallback will take care of calling it in the right order at the end of
    // the current rehydration process.
    runRenderedCallback(vm);
  }
}
function runRenderedCallback(vm) {
  if (isTrue$1$1(vm.renderer.ssr)) {
    return;
  }
  const {
    rendered
  } = Services;
  if (rendered) {
    invokeServiceHook(vm, rendered);
  }
  invokeComponentRenderedCallback(vm);
}
let rehydrateQueue = [];
function flushRehydrationQueue() {
  startGlobalMeasure(GlobalMeasurementPhase.REHYDRATE);
  {
    assert$1.invariant(rehydrateQueue.length, `If rehydrateQueue was scheduled, it is because there must be at least one VM on this pending queue instead of ${rehydrateQueue}.`);
  }
  const vms = rehydrateQueue.sort((a, b) => a.idx - b.idx);
  rehydrateQueue = []; // reset to a new queue

  for (let i = 0, len = vms.length; i < len; i += 1) {
    const vm = vms[i];
    try {
      rehydrate(vm);
    } catch (error) {
      if (i + 1 < len) {
        // pieces of the queue are still pending to be rehydrated, those should have priority
        if (rehydrateQueue.length === 0) {
          addCallbackToNextTick(flushRehydrationQueue);
        }
        ArrayUnshift$2.apply(rehydrateQueue, ArraySlice$2.call(vms, i + 1));
      } // we need to end the measure before throwing.

      endGlobalMeasure(GlobalMeasurementPhase.REHYDRATE); // re-throwing the original error will break the current tick, but since the next tick is
      // already scheduled, it should continue patching the rest.

      throw error; // eslint-disable-line no-unsafe-finally
    }
  }

  endGlobalMeasure(GlobalMeasurementPhase.REHYDRATE);
}
function runConnectedCallback(vm) {
  const {
    state
  } = vm;
  if (state === VMState.connected) {
    return; // nothing to do since it was already connected
  }

  vm.state = VMState.connected; // reporting connection

  const {
    connected
  } = Services;
  if (connected) {
    invokeServiceHook(vm, connected);
  }
  if (hasWireAdapters(vm)) {
    connectWireAdapters(vm);
  }
  const {
    connectedCallback
  } = vm.def;
  if (!isUndefined$1(connectedCallback)) {
    {
      startMeasure('connectedCallback', vm);
    }
    invokeComponentCallback(vm, connectedCallback);
    {
      endMeasure('connectedCallback', vm);
    }
  }
}
function hasWireAdapters(vm) {
  return getOwnPropertyNames$1(vm.def.wire).length > 0;
}
function runDisconnectedCallback(vm) {
  {
    assert$1.isTrue(vm.state !== VMState.disconnected, `${vm} must be inserted.`);
  }
  if (isFalse$1$1(vm.isDirty)) {
    // this guarantees that if the component is reused/reinserted,
    // it will be re-rendered because we are disconnecting the reactivity
    // linking, so mutations are not automatically reflected on the state
    // of disconnected components.
    vm.isDirty = true;
  }
  vm.state = VMState.disconnected; // reporting disconnection

  const {
    disconnected
  } = Services;
  if (disconnected) {
    invokeServiceHook(vm, disconnected);
  }
  if (hasWireAdapters(vm)) {
    disconnectWireAdapters(vm);
  }
  const {
    disconnectedCallback
  } = vm.def;
  if (!isUndefined$1(disconnectedCallback)) {
    {
      startMeasure('disconnectedCallback', vm);
    }
    invokeComponentCallback(vm, disconnectedCallback);
    {
      endMeasure('disconnectedCallback', vm);
    }
  }
}
function runShadowChildNodesDisconnectedCallback(vm) {
  const {
    velements: vCustomElementCollection
  } = vm; // Reporting disconnection for every child in inverse order since they are
  // inserted in reserved order.

  for (let i = vCustomElementCollection.length - 1; i >= 0; i -= 1) {
    const {
      elm
    } = vCustomElementCollection[i]; // There are two cases where the element could be undefined:
    // * when there is an error during the construction phase, and an error
    //   boundary picks it, there is a possibility that the VCustomElement
    //   is not properly initialized, and therefore is should be ignored.
    // * when slotted custom element is not used by the element where it is
    //   slotted into it, as  a result, the custom element was never
    //   initialized.

    if (!isUndefined$1(elm)) {
      const childVM = getAssociatedVMIfPresent(elm); // The VM associated with the element might be associated undefined
      // in the case where the VM failed in the middle of its creation,
      // eg: constructor throwing before invoking super().

      if (!isUndefined$1(childVM)) {
        resetComponentStateWhenRemoved(childVM);
      }
    }
  }
}
function runLightChildNodesDisconnectedCallback(vm) {
  const {
    aChildren: adoptedChildren
  } = vm;
  recursivelyDisconnectChildren(adoptedChildren);
}
/**
 * The recursion doesn't need to be a complete traversal of the vnode graph,
 * instead it can be partial, when a custom element vnode is found, we don't
 * need to continue into its children because by attempting to disconnect the
 * custom element itself will trigger the removal of anything slotted or anything
 * defined on its shadow.
 */

function recursivelyDisconnectChildren(vnodes) {
  for (let i = 0, len = vnodes.length; i < len; i += 1) {
    const vnode = vnodes[i];
    if (!isNull$1(vnode) && isArray$2(vnode.children) && !isUndefined$1(vnode.elm)) {
      // vnode is a VElement with children
      if (isUndefined$1(vnode.ctor)) {
        // it is a VElement, just keep looking (recursively)
        recursivelyDisconnectChildren(vnode.children);
      } else {
        // it is a VCustomElement, disconnect it and ignore its children
        resetComponentStateWhenRemoved(getAssociatedVM(vnode.elm));
      }
    }
  }
} // This is a super optimized mechanism to remove the content of the shadowRoot without having to go
// into snabbdom. Especially useful when the reset is a consequence of an error, in which case the
// children VNodes might not be representing the current state of the DOM.

function resetShadowRoot(vm) {
  const {
    children,
    cmpRoot,
    renderer
  } = vm;
  for (let i = 0, len = children.length; i < len; i++) {
    const child = children[i];
    if (!isNull$1(child) && !isUndefined$1(child.elm)) {
      renderer.remove(child.elm, cmpRoot);
    }
  }
  vm.children = EmptyArray;
  runShadowChildNodesDisconnectedCallback(vm);
  vm.velements = EmptyArray;
}
function scheduleRehydration(vm) {
  if (isTrue$1$1(vm.renderer.ssr) || isTrue$1$1(vm.isScheduled)) {
    return;
  }
  vm.isScheduled = true;
  if (rehydrateQueue.length === 0) {
    addCallbackToNextTick(flushRehydrationQueue);
  }
  ArrayPush$1.call(rehydrateQueue, vm);
}
function getErrorBoundaryVM(vm) {
  let currentVm = vm;
  while (!isNull$1(currentVm)) {
    if (!isUndefined$1(currentVm.def.errorCallback)) {
      return currentVm;
    }
    currentVm = currentVm.owner;
  }
} // slow path routine
// NOTE: we should probably more this routine to the synthetic shadow folder
// and get the allocation to be cached by in the elm instead of in the VM

function allocateInSlot(vm, children) {
  {
    assert$1.invariant(isObject$2(vm.cmpSlots), `When doing manual allocation, there must be a cmpSlots object available.`);
  }
  const {
    cmpSlots: oldSlots
  } = vm;
  const cmpSlots = vm.cmpSlots = create$1(null);
  for (let i = 0, len = children.length; i < len; i += 1) {
    const vnode = children[i];
    if (isNull$1(vnode)) {
      continue;
    }
    const {
      data
    } = vnode;
    const slotName = data.attrs && data.attrs.slot || '';
    const vnodes = cmpSlots[slotName] = cmpSlots[slotName] || []; // re-keying the vnodes is necessary to avoid conflicts with default content for the slot
    // which might have similar keys. Each vnode will always have a key that
    // starts with a numeric character from compiler. In this case, we add a unique
    // notation for slotted vnodes keys, e.g.: `@foo:1:1`

    if (!isUndefined$1(vnode.key)) {
      vnode.key = `@${slotName}:${vnode.key}`;
    }
    ArrayPush$1.call(vnodes, vnode);
  }
  if (isFalse$1$1(vm.isDirty)) {
    // We need to determine if the old allocation is really different from the new one
    // and mark the vm as dirty
    const oldKeys = keys$1(oldSlots);
    if (oldKeys.length !== keys$1(cmpSlots).length) {
      markComponentAsDirty(vm);
      return;
    }
    for (let i = 0, len = oldKeys.length; i < len; i += 1) {
      const key = oldKeys[i];
      if (isUndefined$1(cmpSlots[key]) || oldSlots[key].length !== cmpSlots[key].length) {
        markComponentAsDirty(vm);
        return;
      }
      const oldVNodes = oldSlots[key];
      const vnodes = cmpSlots[key];
      for (let j = 0, a = cmpSlots[key].length; j < a; j += 1) {
        if (oldVNodes[j] !== vnodes[j]) {
          markComponentAsDirty(vm);
          return;
        }
      }
    }
  }
}
function runWithBoundaryProtection(vm, owner, pre, job, post) {
  let error;
  pre();
  try {
    job();
  } catch (e) {
    error = Object(e);
  } finally {
    post();
    if (!isUndefined$1(error)) {
      addErrorComponentStack(vm, error);
      const errorBoundaryVm = isNull$1(owner) ? undefined : getErrorBoundaryVM(owner);
      if (isUndefined$1(errorBoundaryVm)) {
        throw error; // eslint-disable-line no-unsafe-finally
      }

      resetShadowRoot(vm); // remove offenders

      {
        startMeasure('errorCallback', errorBoundaryVm);
      } // error boundaries must have an ErrorCallback

      const errorCallback = errorBoundaryVm.def.errorCallback;
      invokeComponentCallback(errorBoundaryVm, errorCallback, [error, error.wcStack]);
      {
        endMeasure('errorCallback', errorBoundaryVm);
      }
    }
  }
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const DeprecatedWiredElementHost = '$$DeprecatedWiredElementHostKey$$';
const DeprecatedWiredParamsMeta = '$$DeprecatedWiredParamsMetaKey$$';
const WireMetaMap = new Map();
function noop$3() {}
class WireContextRegistrationEvent extends CustomEvent {
  constructor(adapterToken, {
    setNewContext,
    setDisconnectedCallback
  }) {
    super(adapterToken, {
      bubbles: true,
      composed: true
    });
    defineProperties$1(this, {
      setNewContext: {
        value: setNewContext
      },
      setDisconnectedCallback: {
        value: setDisconnectedCallback
      }
    });
  }
}
function createFieldDataCallback(vm, name) {
  const {
    cmpFields
  } = vm;
  return value => {
    if (value !== vm.cmpFields[name]) {
      // storing the value in the underlying storage
      cmpFields[name] = value;
      componentValueMutated(vm, name);
    }
  };
}
function createMethodDataCallback(vm, method) {
  return value => {
    // dispatching new value into the wired method
    invokeComponentCallback(vm, method, [value]);
  };
}
function createConfigWatcher(vm, wireDef, callbackWhenConfigIsReady) {
  const {
    component
  } = vm;
  const {
    configCallback
  } = wireDef;
  let hasPendingConfig = false; // creating the reactive observer for reactive params when needed

  const ro = new ReactiveObserver(() => {
    if (hasPendingConfig === false) {
      hasPendingConfig = true; // collect new config in the micro-task

      Promise.resolve().then(() => {
        hasPendingConfig = false; // resetting current reactive params

        ro.reset(); // dispatching a new config due to a change in the configuration

        callback();
      });
    }
  });
  const callback = () => {
    let config;
    ro.observe(() => config = configCallback(component)); // eslint-disable-next-line lwc-internal/no-invalid-todo
    // TODO: dev-mode validation of config based on the adapter.configSchema
    // @ts-ignore it is assigned in the observe() callback

    callbackWhenConfigIsReady(config);
  };
  return callback;
}
function createContextWatcher(vm, wireDef, callbackWhenContextIsReady) {
  const {
    adapter
  } = wireDef;
  const adapterContextToken = getAdapterToken(adapter);
  if (isUndefined$1(adapterContextToken)) {
    return; // no provider found, nothing to be done
  }

  const {
    elm,
    renderer,
    context: {
      wiredConnecting,
      wiredDisconnecting
    }
  } = vm; // waiting for the component to be connected to formally request the context via the token

  ArrayPush$1.call(wiredConnecting, () => {
    // This event is responsible for connecting the host element with another
    // element in the composed path that is providing contextual data. The provider
    // must be listening for a special dom event with the name corresponding to the value of
    // `adapterContextToken`, which will remain secret and internal to this file only to
    // guarantee that the linkage can be forged.
    const contextRegistrationEvent = new WireContextRegistrationEvent(adapterContextToken, {
      setNewContext(newContext) {
        // eslint-disable-next-line lwc-internal/no-invalid-todo
        // TODO: dev-mode validation of config based on the adapter.contextSchema
        callbackWhenContextIsReady(newContext);
      },
      setDisconnectedCallback(disconnectCallback) {
        // adds this callback into the disconnect bucket so it gets disconnected from parent
        // the the element hosting the wire is disconnected
        ArrayPush$1.call(wiredDisconnecting, disconnectCallback);
      }
    });
    renderer.dispatchEvent(elm, contextRegistrationEvent);
  });
}
function createConnector(vm, name, wireDef) {
  const {
    method,
    adapter,
    configCallback,
    dynamic
  } = wireDef;
  const hasDynamicParams = dynamic.length > 0;
  const {
    component
  } = vm;
  const dataCallback = isUndefined$1(method) ? createFieldDataCallback(vm, name) : createMethodDataCallback(vm, method);
  let context;
  let connector; // Workaround to pass the component element associated to this wire adapter instance.

  defineProperty$1(dataCallback, DeprecatedWiredElementHost, {
    value: vm.elm
  });
  defineProperty$1(dataCallback, DeprecatedWiredParamsMeta, {
    value: dynamic
  });
  runWithBoundaryProtection(vm, vm, noop$3, () => {
    // job
    connector = new adapter(dataCallback);
  }, noop$3);
  const updateConnectorConfig = config => {
    // every time the config is recomputed due to tracking,
    // this callback will be invoked with the new computed config
    runWithBoundaryProtection(vm, vm, noop$3, () => {
      // job
      connector.update(config, context);
    }, noop$3);
  }; // Computes the current wire config and calls the update method on the wire adapter.
  // This initial implementation may change depending on the specific wire instance, if it has params, we will need
  // to observe changes in the next tick.

  let computeConfigAndUpdate = () => {
    updateConnectorConfig(configCallback(component));
  };
  if (hasDynamicParams) {
    // This wire has dynamic parameters: we wait for the component instance is created and its values set
    // in order to call the update(config) method.
    Promise.resolve().then(() => {
      computeConfigAndUpdate = createConfigWatcher(vm, wireDef, updateConnectorConfig);
      computeConfigAndUpdate();
    });
  } else {
    computeConfigAndUpdate();
  } // if the adapter needs contextualization, we need to watch for new context and push it alongside the config

  if (!isUndefined$1(adapter.contextSchema)) {
    createContextWatcher(vm, wireDef, newContext => {
      // every time the context is pushed into this component,
      // this callback will be invoked with the new computed context
      if (context !== newContext) {
        context = newContext; // Note: when new context arrives, the config will be recomputed and pushed along side the new
        // context, this is to preserve the identity characteristics, config should not have identity
        // (ever), while context can have identity

        computeConfigAndUpdate();
      }
    });
  } // @ts-ignore the boundary protection executes sync, connector is always defined

  return connector;
}
const AdapterToTokenMap = new Map();
function getAdapterToken(adapter) {
  return AdapterToTokenMap.get(adapter);
}
function storeWiredMethodMeta(descriptor, adapter, configCallback, dynamic) {
  // support for callable adapters
  if (adapter.adapter) {
    adapter = adapter.adapter;
  }
  const method = descriptor.value;
  const def = {
    adapter,
    method,
    configCallback,
    dynamic
  };
  WireMetaMap.set(descriptor, def);
}
function storeWiredFieldMeta(descriptor, adapter, configCallback, dynamic) {
  // support for callable adapters
  if (adapter.adapter) {
    adapter = adapter.adapter;
  }
  const def = {
    adapter,
    configCallback,
    dynamic
  };
  WireMetaMap.set(descriptor, def);
}
function installWireAdapters(vm) {
  const {
    context,
    def: {
      wire
    }
  } = vm;
  const wiredConnecting = context.wiredConnecting = [];
  const wiredDisconnecting = context.wiredDisconnecting = [];
  for (const fieldNameOrMethod in wire) {
    const descriptor = wire[fieldNameOrMethod];
    const wireDef = WireMetaMap.get(descriptor);
    {
      assert$1.invariant(wireDef, `Internal Error: invalid wire definition found.`);
    }
    if (!isUndefined$1(wireDef)) {
      const adapterInstance = createConnector(vm, fieldNameOrMethod, wireDef);
      ArrayPush$1.call(wiredConnecting, () => adapterInstance.connect());
      ArrayPush$1.call(wiredDisconnecting, () => adapterInstance.disconnect());
    }
  }
}
function connectWireAdapters(vm) {
  const {
    wiredConnecting
  } = vm.context;
  for (let i = 0, len = wiredConnecting.length; i < len; i += 1) {
    wiredConnecting[i]();
  }
}
function disconnectWireAdapters(vm) {
  const {
    wiredDisconnecting
  } = vm.context;
  runWithBoundaryProtection(vm, vm, noop$3, () => {
    // job
    for (let i = 0, len = wiredDisconnecting.length; i < len; i += 1) {
      wiredDisconnecting[i]();
    }
  }, noop$3);
}
/* version: 1.7.7 */

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const globalStylesheets = create(null);
const globalStylesheetsParentElement = document.head || document.body || document;
// TODO [#0]: Evaluate how we can extract the `$shadowToken$` property name in a shared package
// to avoid having to synchronize it between the different modules.
const useSyntheticShadow = hasOwnProperty.call(Element.prototype, '$shadowToken$');
const renderer = {
  ssr: false,
  syntheticShadow: useSyntheticShadow,
  createElement(tagName, namespace) {
    return isUndefined(namespace) ? document.createElement(tagName) : document.createElementNS(namespace, tagName);
  },
  createText(content) {
    return document.createTextNode(content);
  },
  insert(node, parent, anchor) {
    parent.insertBefore(node, anchor);
  },
  remove(node, parent) {
    parent.removeChild(node);
  },
  nextSibling(node) {
    return node.nextSibling;
  },
  attachShadow(element, options) {
    return element.attachShadow(options);
  },
  setText(node, content) {
    node.nodeValue = content;
  },
  getProperty(node, key) {
    return node[key];
  },
  setProperty(node, key, value) {
    {
      if (node instanceof Element && !(key in node)) {
        // TODO [#1297]: Move this validation to the compiler
        assert.fail(`Unknown public property "${key}" of element <${node.tagName}>. This is likely a typo on the corresponding attribute "${getAttrNameFromPropName(key)}".`);
      }
    }
    node[key] = value;
  },
  getAttribute(element, name, namespace) {
    return isUndefined(namespace) ? element.getAttribute(name) : element.getAttributeNS(namespace, name);
  },
  setAttribute(element, name, value, namespace) {
    return isUndefined(namespace) ? element.setAttribute(name, value) : element.setAttributeNS(namespace, name, value);
  },
  removeAttribute(element, name, namespace) {
    if (isUndefined(namespace)) {
      element.removeAttribute(name);
    } else {
      element.removeAttributeNS(namespace, name);
    }
  },
  addEventListener(target, type, callback, options) {
    target.addEventListener(type, callback, options);
  },
  removeEventListener(target, type, callback, options) {
    target.removeEventListener(type, callback, options);
  },
  dispatchEvent(target, event) {
    return target.dispatchEvent(event);
  },
  getClassList(element) {
    return element.classList;
  },
  getStyleDeclaration(element) {
    // TODO [#0]: How to avoid this type casting? Shall we use a different type interface to
    // represent elements in the engine?
    return element.style;
  },
  getBoundingClientRect(element) {
    return element.getBoundingClientRect();
  },
  querySelector(element, selectors) {
    return element.querySelector(selectors);
  },
  querySelectorAll(element, selectors) {
    return element.querySelectorAll(selectors);
  },
  getElementsByTagName(element, tagNameOrWildCard) {
    return element.getElementsByTagName(tagNameOrWildCard);
  },
  getElementsByClassName(element, names) {
    return element.getElementsByClassName(names);
  },
  isConnected(node) {
    return node.isConnected;
  },
  insertGlobalStylesheet(content) {
    if (!isUndefined(globalStylesheets[content])) {
      return;
    }
    globalStylesheets[content] = true;
    const elm = document.createElement('style');
    elm.type = 'text/css';
    elm.textContent = content;
    globalStylesheetsParentElement.appendChild(elm);
  },
  assertInstanceOfHTMLElement(elm, msg) {
    assert.invariant(elm instanceof HTMLElement, msg);
  }
};
function buildCustomElementConstructor(Ctor) {
  var _a;
  const def = getComponentInternalDef(Ctor);
  // generating the hash table for attributes to avoid duplicate fields and facilitate validation
  // and false positives in case of inheritance.
  const attributeToPropMap = create(null);
  for (const propName in def.props) {
    attributeToPropMap[getAttrNameFromPropName(propName)] = propName;
  }
  return _a = class extends def.bridge {
    constructor() {
      super();
      createVM(this, def, {
        mode: 'open',
        owner: null,
        tagName: this.tagName,
        renderer
      });
    }
    connectedCallback() {
      connectRootElement(this);
    }
    disconnectedCallback() {
      disconnectRootElement(this);
    }
    attributeChangedCallback(attrName, oldValue, newValue) {
      if (oldValue === newValue) {
        // Ignore same values.
        return;
      }
      const propName = attributeToPropMap[attrName];
      if (isUndefined(propName)) {
        // Ignore unknown attributes.
        return;
      }
      if (!isAttributeLocked(this, attrName)) {
        // Ignore changes triggered by the engine itself during:
        // * diffing when public props are attempting to reflect to the DOM
        // * component via `this.setAttribute()`, should never update the prop
        // Both cases, the setAttribute call is always wrapped by the unlocking of the
        // attribute to be changed
        return;
      }
      // Reflect attribute change to the corresponding property when changed from outside.
      this[propName] = newValue;
    }
  },
  // Specify attributes for which we want to reflect changes back to their corresponding
  // properties via attributeChangedCallback.
  _a.observedAttributes = keys(attributeToPropMap), _a;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const ConnectingSlot = createHiddenField('connecting', 'engine');
const DisconnectingSlot = createHiddenField('disconnecting', 'engine');
function callNodeSlot(node, slot) {
  {
    assert.isTrue(node, `callNodeSlot() should not be called for a non-object`);
  }
  const fn = getHiddenField(node, slot);
  if (!isUndefined(fn)) {
    fn(node);
  }
  return node; // for convenience
}
// Monkey patching Node methods to be able to detect the insertions and removal of root elements
// created via createElement.
const {
  appendChild,
  insertBefore,
  removeChild,
  replaceChild
} = Node.prototype;
assign(Node.prototype, {
  appendChild(newChild) {
    const appendedNode = appendChild.call(this, newChild);
    return callNodeSlot(appendedNode, ConnectingSlot);
  },
  insertBefore(newChild, referenceNode) {
    const insertedNode = insertBefore.call(this, newChild, referenceNode);
    return callNodeSlot(insertedNode, ConnectingSlot);
  },
  removeChild(oldChild) {
    const removedNode = removeChild.call(this, oldChild);
    return callNodeSlot(removedNode, DisconnectingSlot);
  },
  replaceChild(newChild, oldChild) {
    const replacedNode = replaceChild.call(this, newChild, oldChild);
    callNodeSlot(replacedNode, DisconnectingSlot);
    callNodeSlot(newChild, ConnectingSlot);
    return replacedNode;
  }
});
/**
 * EXPERIMENTAL: This function is almost identical to document.createElement with the slightly
 * difference that in the options, you can pass the `is` property set to a Constructor instead of
 * just a string value. The intent is to allow the creation of an element controlled by LWC without
 * having to register the element as a custom element.
 *
 * @example
 * ```
 * const el = createElement('x-foo', { is: FooCtor });
 * ```
 */
function createElement(sel, options) {
  if (!isObject$1(options) || isNull(options)) {
    throw new TypeError(`"createElement" function expects an object as second parameter but received "${toString(options)}".`);
  }
  const Ctor = options.is;
  if (!isFunction(Ctor)) {
    throw new TypeError(`"createElement" function expects an "is" option with a valid component constructor.`);
  }
  const element = document.createElement(sel);
  // There is a possibility that a custom element is registered under tagName, in which case, the
  // initialization is already carry on, and there is nothing else to do here.
  if (!isUndefined(getAssociatedVMIfPresent(element))) {
    return element;
  }
  const def = getComponentInternalDef(Ctor);
  setElementProto(element, def);
  createVM(element, def, {
    tagName: sel,
    mode: options.mode !== 'closed' ? 'open' : 'closed',
    owner: null,
    renderer
  });
  setHiddenField(element, ConnectingSlot, connectRootElement);
  setHiddenField(element, DisconnectingSlot, disconnectRootElement);
  return element;
}

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
const ComponentConstructorToCustomElementConstructorMap = new Map();
function getCustomElementConstructor(Ctor) {
  if (Ctor === BaseLightningElement) {
    throw new TypeError(`Invalid Constructor. LightningElement base class can't be claimed as a custom element.`);
  }
  let ce = ComponentConstructorToCustomElementConstructorMap.get(Ctor);
  if (isUndefined(ce)) {
    ce = buildCustomElementConstructor(Ctor);
    ComponentConstructorToCustomElementConstructorMap.set(Ctor, ce);
  }
  return ce;
}
/**
 * This static getter builds a Web Component class from a LWC constructor so it can be registered
 * as a new element via customElements.define() at any given time. E.g.:
 *
 *      import Foo from 'ns/foo';
 *      customElements.define('x-foo', Foo.CustomElementConstructor);
 *      const elm = document.createElement('x-foo');
 *
 */
defineProperty(BaseLightningElement, 'CustomElementConstructor', {
  get() {
    return getCustomElementConstructor(this);
  }
});
freeze(BaseLightningElement);
seal(BaseLightningElement.prototype);
/* version: 1.7.7 */

/* proxy-compat-disable */
function invariant$2(value, msg) {
  if (!value) {
    throw new Error(`Invariant Violation: ${msg}`);
  }
}
function isTrue$2(value, msg) {
  if (!value) {
    throw new Error(`Assert Violation: ${msg}`);
  }
}
function isFalse$1(value, msg) {
  if (value) {
    throw new Error(`Assert Violation: ${msg}`);
  }
}
function fail$2(msg) {
  throw new Error(msg);
}
var assert$2 = Object.freeze({
  __proto__: null,
  invariant: invariant$2,
  isTrue: isTrue$2,
  isFalse: isFalse$1,
  fail: fail$2
});
const {
  assign: assign$2,
  create: create$3,
  defineProperties: defineProperties$2,
  defineProperty: defineProperty$2,
  freeze: freeze$2,
  getOwnPropertyDescriptor: getOwnPropertyDescriptor$3,
  getOwnPropertyNames: getOwnPropertyNames$3,
  getPrototypeOf: getPrototypeOf$3,
  hasOwnProperty: hasOwnProperty$3,
  isFrozen: isFrozen$2,
  keys: keys$2,
  seal: seal$2,
  setPrototypeOf: setPrototypeOf$2
} = Object;
const {
  isArray: isArray$3
} = Array;
const {
  filter: ArrayFilter$2,
  find: ArrayFind$2,
  indexOf: ArrayIndexOf$3,
  join: ArrayJoin$2,
  map: ArrayMap$3,
  push: ArrayPush$4,
  reduce: ArrayReduce$2,
  reverse: ArrayReverse$2,
  slice: ArraySlice$3,
  splice: ArraySplice$3,
  unshift: ArrayUnshift$3,
  forEach: forEach$2
} = Array.prototype;
const {
  charCodeAt: StringCharCodeAt$2,
  replace: StringReplace$2,
  slice: StringSlice$2,
  toLowerCase: StringToLowerCase$2
} = String.prototype;
function isUndefined$3(obj) {
  return obj === undefined;
}
function isNull$2(obj) {
  return obj === null;
}
function isTrue$1$2(obj) {
  return obj === true;
}
function isFalse$1$2(obj) {
  return obj === false;
}
function isFunction$2(obj) {
  return typeof obj === 'function';
}
function isObject$3(obj) {
  return typeof obj === 'object';
}
const OtS$2 = {}.toString;
function toString$2(obj) {
  if (obj && obj.toString) {
    if (isArray$3(obj)) {
      return ArrayJoin$2.call(ArrayMap$3.call(obj, toString$2), ',');
    }
    return obj.toString();
  } else if (typeof obj === 'object') {
    return OtS$2.call(obj);
  } else {
    return obj + emptyString$2;
  }
}
function getPropertyDescriptor$1(o, p) {
  do {
    const d = getOwnPropertyDescriptor$3(o, p);
    if (!isUndefined$3(d)) {
      return d;
    }
    o = getPrototypeOf$3(o);
  } while (o !== null);
}
const emptyString$2 = '';
const AriaPropertyNames$2 = ['ariaActiveDescendant', 'ariaAtomic', 'ariaAutoComplete', 'ariaBusy', 'ariaChecked', 'ariaColCount', 'ariaColIndex', 'ariaColSpan', 'ariaControls', 'ariaCurrent', 'ariaDescribedBy', 'ariaDetails', 'ariaDisabled', 'ariaErrorMessage', 'ariaExpanded', 'ariaFlowTo', 'ariaHasPopup', 'ariaHidden', 'ariaInvalid', 'ariaKeyShortcuts', 'ariaLabel', 'ariaLabelledBy', 'ariaLevel', 'ariaLive', 'ariaModal', 'ariaMultiLine', 'ariaMultiSelectable', 'ariaOrientation', 'ariaOwns', 'ariaPlaceholder', 'ariaPosInSet', 'ariaPressed', 'ariaReadOnly', 'ariaRelevant', 'ariaRequired', 'ariaRoleDescription', 'ariaRowCount', 'ariaRowIndex', 'ariaRowSpan', 'ariaSelected', 'ariaSetSize', 'ariaSort', 'ariaValueMax', 'ariaValueMin', 'ariaValueNow', 'ariaValueText', 'role'];
const AttrNameToPropNameMap$3 = create$3(null);
const PropNameToAttrNameMap$3 = create$3(null);
forEach$2.call(AriaPropertyNames$2, propName => {
  const attrName = StringToLowerCase$2.call(StringReplace$2.call(propName, /^aria/, 'aria-'));
  AttrNameToPropNameMap$3[attrName] = propName;
  PropNameToAttrNameMap$3[propName] = attrName;
});
const _globalThis$2 = function () {
  if (typeof globalThis === 'object') {
    return globalThis;
  }
  let _globalThis;
  try {
    Object.defineProperty(Object.prototype, '__magic__', {
      get: function () {
        return this;
      },
      configurable: true
    });
    _globalThis = __magic__;
    delete Object.prototype.__magic__;
  } catch (ex) {} finally {
    if (typeof _globalThis === 'undefined') {
      _globalThis = window;
    }
  }
  return _globalThis;
}();
const hasNativeSymbolsSupport$2 = Symbol('x').toString() === 'Symbol(x)';
function createHiddenField$2(key, namespace) {
  return hasNativeSymbolsSupport$2 ? Symbol(key) : `$$lwc-${namespace}-${key}$$`;
}
const hiddenFieldsMap$2 = new WeakMap();
function setHiddenField$2(o, field, value) {
  let valuesByField = hiddenFieldsMap$2.get(o);
  if (isUndefined$3(valuesByField)) {
    valuesByField = create$3(null);
    hiddenFieldsMap$2.set(o, valuesByField);
  }
  valuesByField[field] = value;
}
function getHiddenField$2(o, field) {
  const valuesByField = hiddenFieldsMap$2.get(o);
  if (!isUndefined$3(valuesByField)) {
    return valuesByField[field];
  }
}
const HTML_ATTRIBUTES_TO_PROPERTY$2 = {
  accesskey: 'accessKey',
  readonly: 'readOnly',
  tabindex: 'tabIndex',
  bgcolor: 'bgColor',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  contenteditable: 'contentEditable',
  crossorigin: 'crossOrigin',
  datetime: 'dateTime',
  formaction: 'formAction',
  ismap: 'isMap',
  maxlength: 'maxLength',
  minlength: 'minLength',
  novalidate: 'noValidate',
  usemap: 'useMap',
  for: 'htmlFor'
};
keys$2(HTML_ATTRIBUTES_TO_PROPERTY$2).forEach(attrName => {});
const {
  DOCUMENT_POSITION_CONTAINED_BY,
  DOCUMENT_POSITION_CONTAINS,
  DOCUMENT_POSITION_PRECEDING,
  DOCUMENT_POSITION_FOLLOWING,
  ELEMENT_NODE,
  TEXT_NODE,
  CDATA_SECTION_NODE,
  PROCESSING_INSTRUCTION_NODE,
  COMMENT_NODE,
  DOCUMENT_FRAGMENT_NODE
} = Node;
const {
  appendChild: appendChild$1,
  cloneNode,
  compareDocumentPosition,
  insertBefore: insertBefore$1,
  removeChild: removeChild$1,
  replaceChild: replaceChild$1,
  hasChildNodes
} = Node.prototype;
const {
  contains
} = HTMLElement.prototype;
const firstChildGetter = getOwnPropertyDescriptor$3(Node.prototype, 'firstChild').get;
const lastChildGetter = getOwnPropertyDescriptor$3(Node.prototype, 'lastChild').get;
const textContentGetter = getOwnPropertyDescriptor$3(Node.prototype, 'textContent').get;
const parentNodeGetter = getOwnPropertyDescriptor$3(Node.prototype, 'parentNode').get;
const ownerDocumentGetter = getOwnPropertyDescriptor$3(Node.prototype, 'ownerDocument').get;
const parentElementGetter = hasOwnProperty$3.call(Node.prototype, 'parentElement') ? getOwnPropertyDescriptor$3(Node.prototype, 'parentElement').get : getOwnPropertyDescriptor$3(HTMLElement.prototype, 'parentElement').get;
const textContextSetter = getOwnPropertyDescriptor$3(Node.prototype, 'textContent').set;
const childNodesGetter = hasOwnProperty$3.call(Node.prototype, 'childNodes') ? getOwnPropertyDescriptor$3(Node.prototype, 'childNodes').get : getOwnPropertyDescriptor$3(HTMLElement.prototype, 'childNodes').get;
const isConnected = hasOwnProperty$3.call(Node.prototype, 'isConnected') ? getOwnPropertyDescriptor$3(Node.prototype, 'isConnected').get : function () {
  const doc = ownerDocumentGetter.call(this);
  return doc === null || (compareDocumentPosition.call(doc, this) & DOCUMENT_POSITION_CONTAINED_BY) !== 0;
};
const {
  addEventListener,
  getAttribute,
  getBoundingClientRect,
  getElementsByTagName,
  getElementsByTagNameNS,
  hasAttribute,
  querySelector,
  querySelectorAll,
  removeAttribute,
  removeEventListener,
  setAttribute
} = Element.prototype;
const attachShadow = hasOwnProperty$3.call(Element.prototype, 'attachShadow') ? Element.prototype.attachShadow : () => {
  throw new TypeError('attachShadow() is not supported in current browser. Load the @lwc/synthetic-shadow polyfill and use Lightning Web Components');
};
const childElementCountGetter = getOwnPropertyDescriptor$3(Element.prototype, 'childElementCount').get;
const firstElementChildGetter = getOwnPropertyDescriptor$3(Element.prototype, 'firstElementChild').get;
const lastElementChildGetter = getOwnPropertyDescriptor$3(Element.prototype, 'lastElementChild').get;
const innerHTMLDescriptor = hasOwnProperty$3.call(Element.prototype, 'innerHTML') ? getOwnPropertyDescriptor$3(Element.prototype, 'innerHTML') : getOwnPropertyDescriptor$3(HTMLElement.prototype, 'innerHTML');
const innerHTMLGetter = innerHTMLDescriptor.get;
const innerHTMLSetter = innerHTMLDescriptor.set;
const outerHTMLDescriptor = hasOwnProperty$3.call(Element.prototype, 'outerHTML') ? getOwnPropertyDescriptor$3(Element.prototype, 'outerHTML') : getOwnPropertyDescriptor$3(HTMLElement.prototype, 'outerHTML');
const outerHTMLGetter = outerHTMLDescriptor.get;
const outerHTMLSetter = outerHTMLDescriptor.set;
const tagNameGetter = getOwnPropertyDescriptor$3(Element.prototype, 'tagName').get;
const tabIndexDescriptor = getOwnPropertyDescriptor$3(HTMLElement.prototype, 'tabIndex');
const tabIndexGetter = tabIndexDescriptor.get;
const tabIndexSetter = tabIndexDescriptor.set;
const matches = hasOwnProperty$3.call(Element.prototype, 'matches') ? Element.prototype.matches : Element.prototype.msMatchesSelector;
const childrenGetter = hasOwnProperty$3.call(Element.prototype, 'children') ? getOwnPropertyDescriptor$3(Element.prototype, 'children').get : getOwnPropertyDescriptor$3(HTMLElement.prototype, 'children').get;
const {
  getElementsByClassName
} = HTMLElement.prototype;
const shadowRootGetter = hasOwnProperty$3.call(Element.prototype, 'shadowRoot') ? getOwnPropertyDescriptor$3(Element.prototype, 'shadowRoot').get : () => null;
let assignedNodes, assignedElements;
if (typeof HTMLSlotElement !== 'undefined') {
  assignedNodes = HTMLSlotElement.prototype.assignedNodes;
  assignedElements = HTMLSlotElement.prototype.assignedElements;
} else {
  assignedNodes = () => {
    throw new TypeError("assignedNodes() is not supported in current browser. Load the @lwc/synthetic-shadow polyfill to start using <slot> elements in your Lightning Web Component's template");
  };
  assignedElements = () => {
    throw new TypeError("assignedElements() is not supported in current browser. Load the @lwc/synthetic-shadow polyfill to start using <slot> elements in your Lightning Web Component's template");
  };
}
const dispatchEvent = 'EventTarget' in window ? EventTarget.prototype.dispatchEvent : Node.prototype.dispatchEvent;
const eventTargetGetter = getOwnPropertyDescriptor$3(Event.prototype, 'target').get;
const eventCurrentTargetGetter = getOwnPropertyDescriptor$3(Event.prototype, 'currentTarget').get;
const focusEventRelatedTargetGetter = getOwnPropertyDescriptor$3(FocusEvent.prototype, 'relatedTarget').get;
const DocumentPrototypeActiveElement = getOwnPropertyDescriptor$3(Document.prototype, 'activeElement').get;
const elementFromPoint = hasOwnProperty$3.call(Document.prototype, 'elementFromPoint') ? Document.prototype.elementFromPoint : Document.prototype.msElementFromPoint;
const defaultViewGetter = getOwnPropertyDescriptor$3(Document.prototype, 'defaultView').get;
const {
  createComment,
  querySelectorAll: querySelectorAll$1,
  getElementById,
  getElementsByClassName: getElementsByClassName$1,
  getElementsByTagName: getElementsByTagName$1,
  getElementsByTagNameNS: getElementsByTagNameNS$1
} = Document.prototype;
const {
  getElementsByName
} = HTMLDocument.prototype;
const {
  addEventListener: windowAddEventListener,
  removeEventListener: windowRemoveEventListener
} = window;
const MO = MutationObserver;
const MutationObserverObserve = MO.prototype.observe;
function detect$2() {
  return typeof HTMLSlotElement === 'undefined';
}
const {
  createElement: createElement$1
} = Document.prototype;
const CHAR_S$1 = 115;
const CHAR_L = 108;
const CHAR_O = 111;
const CHAR_T = 116;
function apply$1() {
  class HTMLSlotElement {}
  setPrototypeOf$2(HTMLSlotElement, HTMLElement.constructor);
  setPrototypeOf$2(HTMLSlotElement.prototype, HTMLElement.prototype);
  Window.prototype.HTMLSlotElement = HTMLSlotElement;
  defineProperty$2(Document.prototype, 'createElement', {
    value: function (tagName, _options) {
      const elm = createElement$1.apply(this, ArraySlice$3.call(arguments));
      if (tagName.length === 4 && StringCharCodeAt$2.call(tagName, 0) === CHAR_S$1 && StringCharCodeAt$2.call(tagName, 1) === CHAR_L && StringCharCodeAt$2.call(tagName, 2) === CHAR_O && StringCharCodeAt$2.call(tagName, 3) === CHAR_T) {
        setPrototypeOf$2(elm, HTMLSlotElement.prototype);
      }
      return elm;
    }
  });
}
if (detect$2()) {
  apply$1();
}
const {
  assign: assign$1$2,
  create: create$1$2,
  defineProperties: defineProperties$1$2,
  defineProperty: defineProperty$1$2,
  freeze: freeze$1$2,
  getOwnPropertyDescriptor: getOwnPropertyDescriptor$1$2,
  getOwnPropertyNames: getOwnPropertyNames$1$2,
  getPrototypeOf: getPrototypeOf$1$2,
  hasOwnProperty: hasOwnProperty$1$2,
  isFrozen: isFrozen$1$2,
  keys: keys$1$2,
  seal: seal$1$2,
  setPrototypeOf: setPrototypeOf$1$2
} = Object;
const {
  filter: ArrayFilter$1$2,
  find: ArrayFind$1$2,
  indexOf: ArrayIndexOf$1$2,
  join: ArrayJoin$1$2,
  map: ArrayMap$1$2,
  push: ArrayPush$1$2,
  reduce: ArrayReduce$1$2,
  reverse: ArrayReverse$1$2,
  slice: ArraySlice$1$2,
  splice: ArraySplice$1$2,
  unshift: ArrayUnshift$1$2,
  forEach: forEach$1$2
} = Array.prototype;
const {
  charCodeAt: StringCharCodeAt$1$2,
  replace: StringReplace$1$2,
  slice: StringSlice$1$2,
  toLowerCase: StringToLowerCase$1$2
} = String.prototype;
const AriaPropertyNames$1$2 = ['ariaActiveDescendant', 'ariaAtomic', 'ariaAutoComplete', 'ariaBusy', 'ariaChecked', 'ariaColCount', 'ariaColIndex', 'ariaColSpan', 'ariaControls', 'ariaCurrent', 'ariaDescribedBy', 'ariaDetails', 'ariaDisabled', 'ariaErrorMessage', 'ariaExpanded', 'ariaFlowTo', 'ariaHasPopup', 'ariaHidden', 'ariaInvalid', 'ariaKeyShortcuts', 'ariaLabel', 'ariaLabelledBy', 'ariaLevel', 'ariaLive', 'ariaModal', 'ariaMultiLine', 'ariaMultiSelectable', 'ariaOrientation', 'ariaOwns', 'ariaPlaceholder', 'ariaPosInSet', 'ariaPressed', 'ariaReadOnly', 'ariaRelevant', 'ariaRequired', 'ariaRoleDescription', 'ariaRowCount', 'ariaRowIndex', 'ariaRowSpan', 'ariaSelected', 'ariaSetSize', 'ariaSort', 'ariaValueMax', 'ariaValueMin', 'ariaValueNow', 'ariaValueText', 'role'];
const AttrNameToPropNameMap$1$2 = create$1$2(null);
const PropNameToAttrNameMap$1$2 = create$1$2(null);
forEach$1$2.call(AriaPropertyNames$1$2, propName => {
  const attrName = StringToLowerCase$1$2.call(StringReplace$1$2.call(propName, /^aria/, 'aria-'));
  AttrNameToPropNameMap$1$2[attrName] = propName;
  PropNameToAttrNameMap$1$2[propName] = attrName;
});
const _globalThis$1$2 = function () {
  if (typeof globalThis === 'object') {
    return globalThis;
  }
  let _globalThis;
  try {
    Object.defineProperty(Object.prototype, '__magic__', {
      get: function () {
        return this;
      },
      configurable: true
    });
    _globalThis = __magic__;
    delete Object.prototype.__magic__;
  } catch (ex) {} finally {
    if (typeof _globalThis === 'undefined') {
      _globalThis = window;
    }
  }
  return _globalThis;
}();
const hasNativeSymbolsSupport$1$2 = Symbol('x').toString() === 'Symbol(x)';
const HTML_ATTRIBUTES_TO_PROPERTY$1$2 = {
  accesskey: 'accessKey',
  readonly: 'readOnly',
  tabindex: 'tabIndex',
  bgcolor: 'bgColor',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  contenteditable: 'contentEditable',
  crossorigin: 'crossOrigin',
  datetime: 'dateTime',
  formaction: 'formAction',
  ismap: 'isMap',
  maxlength: 'maxLength',
  minlength: 'minLength',
  novalidate: 'noValidate',
  usemap: 'useMap',
  for: 'htmlFor'
};
keys$1$2(HTML_ATTRIBUTES_TO_PROPERTY$1$2).forEach(attrName => {});
if (!_globalThis$1$2.lwcRuntimeFlags) {
  Object.defineProperty(_globalThis$1$2, 'lwcRuntimeFlags', {
    value: create$1$2(null)
  });
}
const runtimeFlags$1 = _globalThis$1$2.lwcRuntimeFlags;
function getOwnerDocument(node) {
  const doc = ownerDocumentGetter.call(node);
  return doc === null ? node : doc;
}
function getOwnerWindow(node) {
  const doc = getOwnerDocument(node);
  const win = defaultViewGetter.call(doc);
  if (win === null) {
    throw new TypeError();
  }
  return win;
}
let skipGlobalPatching;
function isGlobalPatchingSkipped(node) {
  if (isUndefined$3(skipGlobalPatching)) {
    const ownerDocument = getOwnerDocument(node);
    skipGlobalPatching = ownerDocument.body && getAttribute.call(ownerDocument.body, 'data-global-patching-bypass') === 'temporary-bypass';
  }
  return isTrue$1$2(skipGlobalPatching);
}
function arrayFromCollection(collection) {
  const size = collection.length;
  const cloned = [];
  if (size > 0) {
    for (let i = 0; i < size; i++) {
      cloned[i] = collection[i];
    }
  }
  return cloned;
}
function pathComposer(startNode, composed) {
  const composedPath = [];
  let current = startNode;
  const startRoot = startNode instanceof Window ? startNode : startNode.getRootNode();
  while (!isNull$2(current)) {
    composedPath.push(current);
    let assignedSlot = null;
    if (current instanceof Element) {
      assignedSlot = current.assignedSlot;
    }
    if (!isNull$2(assignedSlot)) {
      current = assignedSlot;
    } else if (current instanceof ShadowRoot && (composed || current !== startRoot)) {
      current = current.host;
    } else {
      current = current.parentNode;
    }
  }
  let doc;
  if (startNode instanceof Window) {
    doc = startNode.document;
  } else {
    doc = getOwnerDocument(startNode);
  }
  if (composedPath[composedPath.length - 1] === doc) {
    composedPath.push(window);
  }
  return composedPath;
}
function retarget(refNode, path) {
  if (isNull$2(refNode)) {
    return null;
  }
  const refNodePath = pathComposer(refNode, true);
  const p$ = path;
  for (let i = 0, ancestor, lastRoot, root, rootIdx; i < p$.length; i++) {
    ancestor = p$[i];
    root = ancestor instanceof Window ? ancestor : ancestor.getRootNode();
    if (root !== lastRoot) {
      rootIdx = refNodePath.indexOf(root);
      lastRoot = root;
    }
    if (!(root instanceof SyntheticShadowRoot) || !isUndefined$3(rootIdx) && rootIdx > -1) {
      return ancestor;
    }
  }
  return null;
}
var EventListenerContext;
(function (EventListenerContext) {
  EventListenerContext[EventListenerContext["CUSTOM_ELEMENT_LISTENER"] = 1] = "CUSTOM_ELEMENT_LISTENER";
  EventListenerContext[EventListenerContext["SHADOW_ROOT_LISTENER"] = 2] = "SHADOW_ROOT_LISTENER";
})(EventListenerContext || (EventListenerContext = {}));
const eventToContextMap = new WeakMap();
function isChildNode(root, node) {
  return !!(compareDocumentPosition.call(root, node) & DOCUMENT_POSITION_CONTAINED_BY);
}
const GET_ROOT_NODE_CONFIG_FALSE = {
  composed: false
};
function getRootNodeHost(node, options) {
  let rootNode = node.getRootNode(options);
  if ('mode' in rootNode && 'delegatesFocus' in rootNode) {
    rootNode = getHost(rootNode);
  }
  return rootNode;
}
function targetGetter() {
  const originalCurrentTarget = eventCurrentTargetGetter.call(this);
  const originalTarget = eventTargetGetter.call(this);
  const composedPath = pathComposer(originalTarget, this.composed);
  const doc = getOwnerDocument(originalTarget);
  if (!(originalCurrentTarget instanceof Node)) {
    if (isNull$2(originalCurrentTarget) && isUndefined$3(getNodeOwnerKey(originalTarget))) {
      return originalTarget;
    }
    return retarget(doc, composedPath);
  } else if (originalCurrentTarget === doc || originalCurrentTarget === doc.body) {
    if (isUndefined$3(getNodeOwnerKey(originalTarget))) {
      return originalTarget;
    }
    return retarget(doc, composedPath);
  }
  const eventContext = eventToContextMap.get(this);
  const currentTarget = eventContext === EventListenerContext.SHADOW_ROOT_LISTENER ? getShadowRoot(originalCurrentTarget) : originalCurrentTarget;
  return retarget(currentTarget, composedPath);
}
function composedPathValue() {
  const originalTarget = eventTargetGetter.call(this);
  const originalCurrentTarget = eventCurrentTargetGetter.call(this);
  return isNull$2(originalCurrentTarget) ? [] : pathComposer(originalTarget, this.composed);
}
function patchEvent(event) {
  if (eventToContextMap.has(event)) {
    return;
  }
  defineProperties$2(event, {
    target: {
      get: targetGetter,
      enumerable: true,
      configurable: true
    },
    composedPath: {
      value: composedPathValue,
      writable: true,
      enumerable: true,
      configurable: true
    },
    srcElement: {
      get: targetGetter,
      enumerable: true,
      configurable: true
    },
    path: {
      get: composedPathValue,
      enumerable: true,
      configurable: true
    }
  });
  const originalRelatedTargetDescriptor = getPropertyDescriptor$1(event, 'relatedTarget');
  if (!isUndefined$3(originalRelatedTargetDescriptor)) {
    const relatedTargetGetter = originalRelatedTargetDescriptor.get;
    defineProperty$2(event, 'relatedTarget', {
      get() {
        const eventContext = eventToContextMap.get(this);
        const originalCurrentTarget = eventCurrentTargetGetter.call(this);
        const relatedTarget = relatedTargetGetter.call(this);
        if (isNull$2(relatedTarget)) {
          return null;
        }
        const currentTarget = eventContext === EventListenerContext.SHADOW_ROOT_LISTENER ? getShadowRoot(originalCurrentTarget) : originalCurrentTarget;
        return retarget(currentTarget, pathComposer(relatedTarget, true));
      },
      enumerable: true,
      configurable: true
    });
  }
  eventToContextMap.set(event, 0);
}
const customElementToWrappedListeners = new WeakMap();
function getEventMap(elm) {
  let listenerInfo = customElementToWrappedListeners.get(elm);
  if (isUndefined$3(listenerInfo)) {
    listenerInfo = create$3(null);
    customElementToWrappedListeners.set(elm, listenerInfo);
  }
  return listenerInfo;
}
const shadowRootEventListenerMap = new WeakMap();
function getWrappedShadowRootListener(sr, listener) {
  if (!isFunction$2(listener)) {
    throw new TypeError();
  }
  let shadowRootWrappedListener = shadowRootEventListenerMap.get(listener);
  if (isUndefined$3(shadowRootWrappedListener)) {
    shadowRootWrappedListener = function (event) {
      const {
        composed
      } = event;
      const target = eventTargetGetter.call(event);
      const currentTarget = eventCurrentTargetGetter.call(event);
      if (target !== currentTarget) {
        const rootNode = getRootNodeHost(target, {
          composed
        });
        if (isChildNode(rootNode, currentTarget) || composed === false && rootNode === currentTarget) {
          listener.call(sr, event);
        }
      }
    };
    shadowRootWrappedListener.placement = EventListenerContext.SHADOW_ROOT_LISTENER;
    {
      shadowRootWrappedListener.original = listener;
    }
    shadowRootEventListenerMap.set(listener, shadowRootWrappedListener);
  }
  return shadowRootWrappedListener;
}
const customElementEventListenerMap = new WeakMap();
function getWrappedCustomElementListener(elm, listener) {
  if (!isFunction$2(listener)) {
    throw new TypeError();
  }
  let customElementWrappedListener = customElementEventListenerMap.get(listener);
  if (isUndefined$3(customElementWrappedListener)) {
    customElementWrappedListener = function (event) {
      if (isValidEventForCustomElement(event)) {
        listener.call(elm, event);
      }
    };
    customElementWrappedListener.placement = EventListenerContext.CUSTOM_ELEMENT_LISTENER;
    {
      customElementWrappedListener.original = listener;
    }
    customElementEventListenerMap.set(listener, customElementWrappedListener);
  }
  return customElementWrappedListener;
}
function domListener(evt) {
  patchEvent(evt);
  let immediatePropagationStopped = false;
  let propagationStopped = false;
  const {
    type,
    stopImmediatePropagation,
    stopPropagation
  } = evt;
  const currentTarget = eventCurrentTargetGetter.call(evt);
  const listenerMap = getEventMap(currentTarget);
  const listeners = listenerMap[type];
  defineProperty$2(evt, 'stopImmediatePropagation', {
    value() {
      immediatePropagationStopped = true;
      stopImmediatePropagation.call(evt);
    },
    writable: true,
    enumerable: true,
    configurable: true
  });
  defineProperty$2(evt, 'stopPropagation', {
    value() {
      propagationStopped = true;
      stopPropagation.call(evt);
    },
    writable: true,
    enumerable: true,
    configurable: true
  });
  const bookkeeping = ArraySlice$3.call(listeners);
  function invokeListenersByPlacement(placement) {
    forEach$2.call(bookkeeping, listener => {
      if (isFalse$1$2(immediatePropagationStopped) && listener.placement === placement) {
        if (ArrayIndexOf$3.call(listeners, listener) !== -1) {
          listener.call(undefined, evt);
        }
      }
    });
  }
  eventToContextMap.set(evt, EventListenerContext.SHADOW_ROOT_LISTENER);
  invokeListenersByPlacement(EventListenerContext.SHADOW_ROOT_LISTENER);
  if (isFalse$1$2(immediatePropagationStopped) && isFalse$1$2(propagationStopped)) {
    eventToContextMap.set(evt, EventListenerContext.CUSTOM_ELEMENT_LISTENER);
    invokeListenersByPlacement(EventListenerContext.CUSTOM_ELEMENT_LISTENER);
  }
  eventToContextMap.set(evt, 0);
}
function attachDOMListener(elm, type, wrappedListener) {
  const listenerMap = getEventMap(elm);
  let cmpEventHandlers = listenerMap[type];
  if (isUndefined$3(cmpEventHandlers)) {
    cmpEventHandlers = listenerMap[type] = [];
  }
  if (cmpEventHandlers.length === 0) {
    addEventListener.call(elm, type, domListener);
  }
  ArrayPush$4.call(cmpEventHandlers, wrappedListener);
}
function detachDOMListener(elm, type, wrappedListener) {
  const listenerMap = getEventMap(elm);
  let p;
  let listeners;
  if (!isUndefined$3(listeners = listenerMap[type]) && (p = ArrayIndexOf$3.call(listeners, wrappedListener)) !== -1) {
    ArraySplice$3.call(listeners, p, 1);
    if (listeners.length === 0) {
      removeEventListener.call(elm, type, domListener);
    }
  }
}
function isValidEventForCustomElement(event) {
  const target = eventTargetGetter.call(event);
  const currentTarget = eventCurrentTargetGetter.call(event);
  const {
    composed
  } = event;
  return composed === true || target === currentTarget || isChildNode(getRootNodeHost(target, GET_ROOT_NODE_CONFIG_FALSE), currentTarget);
}
function addCustomElementEventListener(elm, type, listener, _options) {
  {
    if (!isFunction$2(listener)) {
      throw new TypeError(`Invalid second argument for Element.addEventListener() in ${toString$2(elm)} for event "${type}". Expected an EventListener but received ${listener}.`);
    }
  }
  const wrappedListener = getWrappedCustomElementListener(elm, listener);
  attachDOMListener(elm, type, wrappedListener);
}
function removeCustomElementEventListener(elm, type, listener, _options) {
  const wrappedListener = getWrappedCustomElementListener(elm, listener);
  detachDOMListener(elm, type, wrappedListener);
}
function addShadowRootEventListener(sr, type, listener, _options) {
  {
    if (!isFunction$2(listener)) {
      throw new TypeError(`Invalid second argument for ShadowRoot.addEventListener() in ${toString$2(sr)} for event "${type}". Expected an EventListener but received ${listener}.`);
    }
  }
  const elm = getHost(sr);
  const wrappedListener = getWrappedShadowRootListener(sr, listener);
  attachDOMListener(elm, type, wrappedListener);
}
function removeShadowRootEventListener(sr, type, listener, _options) {
  const elm = getHost(sr);
  const wrappedListener = getWrappedShadowRootListener(sr, listener);
  detachDOMListener(elm, type, wrappedListener);
}
function getTextContent(node) {
  switch (node.nodeType) {
    case ELEMENT_NODE:
      {
        const childNodes = getFilteredChildNodes(node);
        let content = '';
        for (let i = 0, len = childNodes.length; i < len; i += 1) {
          const currentNode = childNodes[i];
          if (currentNode.nodeType !== COMMENT_NODE) {
            content += getTextContent(currentNode);
          }
        }
        return content;
      }
    default:
      return node.nodeValue;
  }
}
const Items = createHiddenField$2('StaticNodeListItems', 'synthetic-shadow');
function StaticNodeList() {
  throw new TypeError('Illegal constructor');
}
StaticNodeList.prototype = create$3(NodeList.prototype, {
  constructor: {
    writable: true,
    configurable: true,
    value: StaticNodeList
  },
  item: {
    writable: true,
    enumerable: true,
    configurable: true,
    value(index) {
      return this[index];
    }
  },
  length: {
    enumerable: true,
    configurable: true,
    get() {
      return getHiddenField$2(this, Items).length;
    }
  },
  forEach: {
    writable: true,
    enumerable: true,
    configurable: true,
    value(cb, thisArg) {
      forEach$2.call(getHiddenField$2(this, Items), cb, thisArg);
    }
  },
  entries: {
    writable: true,
    enumerable: true,
    configurable: true,
    value() {
      return ArrayMap$3.call(getHiddenField$2(this, Items), (v, i) => [i, v]);
    }
  },
  keys: {
    writable: true,
    enumerable: true,
    configurable: true,
    value() {
      return ArrayMap$3.call(getHiddenField$2(this, Items), (_v, i) => i);
    }
  },
  values: {
    writable: true,
    enumerable: true,
    configurable: true,
    value() {
      return getHiddenField$2(this, Items);
    }
  },
  [Symbol.iterator]: {
    writable: true,
    configurable: true,
    value() {
      let nextIndex = 0;
      return {
        next: () => {
          const items = getHiddenField$2(this, Items);
          return nextIndex < items.length ? {
            value: items[nextIndex++],
            done: false
          } : {
            done: true
          };
        }
      };
    }
  },
  [Symbol.toStringTag]: {
    configurable: true,
    get() {
      return 'NodeList';
    }
  },
  toString: {
    writable: true,
    configurable: true,
    value() {
      return '[object NodeList]';
    }
  }
});
setPrototypeOf$2(StaticNodeList, NodeList);
function createStaticNodeList(items) {
  const nodeList = create$3(StaticNodeList.prototype);
  setHiddenField$2(nodeList, Items, items);
  forEach$2.call(items, (item, index) => {
    defineProperty$2(nodeList, index, {
      value: item,
      enumerable: true,
      configurable: true
    });
  });
  return nodeList;
}
const Items$1 = createHiddenField$2('StaticHTMLCollectionItems', 'synthetic-shadow');
function StaticHTMLCollection() {
  throw new TypeError('Illegal constructor');
}
StaticHTMLCollection.prototype = create$3(HTMLCollection.prototype, {
  constructor: {
    writable: true,
    configurable: true,
    value: StaticHTMLCollection
  },
  item: {
    writable: true,
    enumerable: true,
    configurable: true,
    value(index) {
      return this[index];
    }
  },
  length: {
    enumerable: true,
    configurable: true,
    get() {
      return getHiddenField$2(this, Items$1).length;
    }
  },
  namedItem: {
    writable: true,
    enumerable: true,
    configurable: true,
    value(name) {
      if (name === '') {
        return null;
      }
      const items = getHiddenField$2(this, Items$1);
      for (let i = 0, len = items.length; i < len; i++) {
        const item = items[len];
        if (name === getAttribute.call(item, 'id') || name === getAttribute.call(item, 'name')) {
          return item;
        }
      }
      return null;
    }
  },
  forEach: {
    writable: true,
    enumerable: true,
    configurable: true,
    value(cb, thisArg) {
      forEach$2.call(getHiddenField$2(this, Items$1), cb, thisArg);
    }
  },
  entries: {
    writable: true,
    enumerable: true,
    configurable: true,
    value() {
      return ArrayMap$3.call(getHiddenField$2(this, Items$1), (v, i) => [i, v]);
    }
  },
  keys: {
    writable: true,
    enumerable: true,
    configurable: true,
    value() {
      return ArrayMap$3.call(getHiddenField$2(this, Items$1), (v, i) => i);
    }
  },
  values: {
    writable: true,
    enumerable: true,
    configurable: true,
    value() {
      return getHiddenField$2(this, Items$1);
    }
  },
  [Symbol.iterator]: {
    writable: true,
    configurable: true,
    value() {
      let nextIndex = 0;
      return {
        next: () => {
          const items = getHiddenField$2(this, Items$1);
          return nextIndex < items.length ? {
            value: items[nextIndex++],
            done: false
          } : {
            done: true
          };
        }
      };
    }
  },
  [Symbol.toStringTag]: {
    configurable: true,
    get() {
      return 'HTMLCollection';
    }
  },
  toString: {
    writable: true,
    configurable: true,
    value() {
      return '[object HTMLCollection]';
    }
  }
});
setPrototypeOf$2(StaticHTMLCollection, HTMLCollection);
function createStaticHTMLCollection(items) {
  const collection = create$3(StaticHTMLCollection.prototype);
  setHiddenField$2(collection, Items$1, items);
  forEach$2.call(items, (item, index) => {
    defineProperty$2(collection, index, {
      value: item,
      enumerable: true,
      configurable: true
    });
  });
  return collection;
}
function getInnerHTML(node) {
  let s = '';
  const childNodes = getFilteredChildNodes(node);
  for (let i = 0, len = childNodes.length; i < len; i += 1) {
    s += getOuterHTML(childNodes[i]);
  }
  return s;
}
const escapeAttrRegExp = /[&\u00A0"]/g;
const escapeDataRegExp = /[&\u00A0<>]/g;
const {
  replace,
  toLowerCase
} = String.prototype;
function escapeReplace(c) {
  switch (c) {
    case '&':
      return '&amp;';
    case '<':
      return '&lt;';
    case '>':
      return '&gt;';
    case '"':
      return '&quot;';
    case '\u00A0':
      return '&nbsp;';
    default:
      return '';
  }
}
function escapeAttr(s) {
  return replace.call(s, escapeAttrRegExp, escapeReplace);
}
function escapeData(s) {
  return replace.call(s, escapeDataRegExp, escapeReplace);
}
const voidElements = new Set(['AREA', 'BASE', 'BR', 'COL', 'COMMAND', 'EMBED', 'HR', 'IMG', 'INPUT', 'KEYGEN', 'LINK', 'META', 'PARAM', 'SOURCE', 'TRACK', 'WBR']);
const plaintextParents = new Set(['STYLE', 'SCRIPT', 'XMP', 'IFRAME', 'NOEMBED', 'NOFRAMES', 'PLAINTEXT', 'NOSCRIPT']);
function getOuterHTML(node) {
  switch (node.nodeType) {
    case ELEMENT_NODE:
      {
        const {
          attributes: attrs
        } = node;
        const tagName = tagNameGetter.call(node);
        let s = '<' + toLowerCase.call(tagName);
        for (let i = 0, attr; attr = attrs[i]; i++) {
          s += ' ' + attr.name + '="' + escapeAttr(attr.value) + '"';
        }
        s += '>';
        if (voidElements.has(tagName)) {
          return s;
        }
        return s + getInnerHTML(node) + '</' + toLowerCase.call(tagName) + '>';
      }
    case TEXT_NODE:
      {
        const {
          data,
          parentNode
        } = node;
        if (parentNode instanceof Element && plaintextParents.has(tagNameGetter.call(parentNode))) {
          return data;
        }
        return escapeData(data);
      }
    case CDATA_SECTION_NODE:
      {
        return `<!CDATA[[${node.data}]]>`;
      }
    case PROCESSING_INSTRUCTION_NODE:
      {
        return `<?${node.target} ${node.data}?>`;
      }
    case COMMENT_NODE:
      {
        return `<!--${node.data}-->`;
      }
    default:
      {
        return '';
      }
  }
}
const InternalSlot = createHiddenField$2('shadowRecord', 'synthetic-shadow');
const {
  createDocumentFragment
} = document;
function getInternalSlot(root) {
  const record = getHiddenField$2(root, InternalSlot);
  if (isUndefined$3(record)) {
    throw new TypeError();
  }
  return record;
}
const ShadowRootResolverKey = '$shadowResolver$';
const ShadowResolverPrivateKey = '$$ShadowResolverKey$$';
defineProperty$2(Node.prototype, ShadowRootResolverKey, {
  set(fn) {
    this[ShadowResolverPrivateKey] = fn;
    setNodeOwnerKey(this, fn.nodeKey);
  },
  get() {
    return this[ShadowResolverPrivateKey];
  },
  configurable: true,
  enumerable: true
});
function getShadowRootResolver(node) {
  return node[ShadowRootResolverKey];
}
function setShadowRootResolver(node, fn) {
  node[ShadowRootResolverKey] = fn;
}
function isDelegatingFocus(host) {
  return getInternalSlot(host).delegatesFocus;
}
function getHost(root) {
  return getInternalSlot(root).host;
}
function getShadowRoot(elm) {
  return getInternalSlot(elm).shadowRoot;
}
function isHostElement(elm) {
  return !isUndefined$3(getHiddenField$2(elm, InternalSlot));
}
let uid = 0;
function attachShadow$1(elm, options) {
  if (!isUndefined$3(getHiddenField$2(elm, InternalSlot))) {
    throw new Error(`Failed to execute 'attachShadow' on 'Element': Shadow root cannot be created on a host which already hosts a shadow tree.`);
  }
  const {
    mode,
    delegatesFocus
  } = options;
  const doc = getOwnerDocument(elm);
  const sr = createDocumentFragment.call(doc);
  const record = {
    mode,
    delegatesFocus: !!delegatesFocus,
    host: elm,
    shadowRoot: sr
  };
  setHiddenField$2(sr, InternalSlot, record);
  setHiddenField$2(elm, InternalSlot, record);
  const shadowResolver = () => sr;
  const x = shadowResolver.nodeKey = uid++;
  setNodeKey(elm, x);
  setShadowRootResolver(sr, shadowResolver);
  setPrototypeOf$2(sr, SyntheticShadowRoot.prototype);
  return sr;
}
const SyntheticShadowRootDescriptors = {
  constructor: {
    writable: true,
    configurable: true,
    value: SyntheticShadowRoot
  },
  toString: {
    writable: true,
    configurable: true,
    value() {
      return `[object ShadowRoot]`;
    }
  }
};
const ShadowRootDescriptors = {
  activeElement: {
    enumerable: true,
    configurable: true,
    get() {
      const host = getHost(this);
      const doc = getOwnerDocument(host);
      const activeElement = DocumentPrototypeActiveElement.call(doc);
      if (isNull$2(activeElement)) {
        return activeElement;
      }
      if ((compareDocumentPosition.call(host, activeElement) & DOCUMENT_POSITION_CONTAINED_BY) === 0) {
        return null;
      }
      let node = activeElement;
      while (!isNodeOwnedBy(host, node)) {
        node = parentElementGetter.call(node);
      }
      if (isSlotElement(node)) {
        return null;
      }
      return node;
    }
  },
  delegatesFocus: {
    configurable: true,
    get() {
      return getInternalSlot(this).delegatesFocus;
    }
  },
  elementFromPoint: {
    writable: true,
    enumerable: true,
    configurable: true,
    value(left, top) {
      const host = getHost(this);
      const doc = getOwnerDocument(host);
      const element = elementFromPoint.call(doc, left, top);
      if (isNull$2(element)) {
        return element;
      }
      return retarget(this, pathComposer(element, true));
    }
  },
  elementsFromPoint: {
    writable: true,
    enumerable: true,
    configurable: true,
    value(_left, _top) {
      throw new Error();
    }
  },
  getSelection: {
    writable: true,
    enumerable: true,
    configurable: true,
    value() {
      throw new Error();
    }
  },
  host: {
    enumerable: true,
    configurable: true,
    get() {
      return getHost(this);
    }
  },
  mode: {
    configurable: true,
    get() {
      return getInternalSlot(this).mode;
    }
  },
  styleSheets: {
    enumerable: true,
    configurable: true,
    get() {
      throw new Error();
    }
  }
};
const NodePatchDescriptors = {
  insertBefore: {
    writable: true,
    enumerable: true,
    configurable: true,
    value(newChild, refChild) {
      insertBefore$1.call(getHost(this), newChild, refChild);
      return newChild;
    }
  },
  removeChild: {
    writable: true,
    enumerable: true,
    configurable: true,
    value(oldChild) {
      removeChild$1.call(getHost(this), oldChild);
      return oldChild;
    }
  },
  appendChild: {
    writable: true,
    enumerable: true,
    configurable: true,
    value(newChild) {
      appendChild$1.call(getHost(this), newChild);
      return newChild;
    }
  },
  replaceChild: {
    writable: true,
    enumerable: true,
    configurable: true,
    value(newChild, oldChild) {
      replaceChild$1.call(getHost(this), newChild, oldChild);
      return oldChild;
    }
  },
  addEventListener: {
    writable: true,
    enumerable: true,
    configurable: true,
    value(type, listener, options) {
      addShadowRootEventListener(this, type, listener);
    }
  },
  removeEventListener: {
    writable: true,
    enumerable: true,
    configurable: true,
    value(type, listener, options) {
      removeShadowRootEventListener(this, type, listener);
    }
  },
  baseURI: {
    enumerable: true,
    configurable: true,
    get() {
      return getHost(this).baseURI;
    }
  },
  childNodes: {
    enumerable: true,
    configurable: true,
    get() {
      return createStaticNodeList(shadowRootChildNodes(this));
    }
  },
  compareDocumentPosition: {
    writable: true,
    enumerable: true,
    configurable: true,
    value(otherNode) {
      const host = getHost(this);
      if (this === otherNode) {
        return 0;
      } else if (this.contains(otherNode)) {
        return 20;
      } else if (compareDocumentPosition.call(host, otherNode) & DOCUMENT_POSITION_CONTAINED_BY) {
        return 37;
      } else {
        return 35;
      }
    }
  },
  contains: {
    writable: true,
    enumerable: true,
    configurable: true,
    value(otherNode) {
      if (this === otherNode) {
        return true;
      }
      const host = getHost(this);
      return (compareDocumentPosition.call(host, otherNode) & DOCUMENT_POSITION_CONTAINED_BY) !== 0 && isNodeOwnedBy(host, otherNode);
    }
  },
  firstChild: {
    enumerable: true,
    configurable: true,
    get() {
      const childNodes = getInternalChildNodes(this);
      return childNodes[0] || null;
    }
  },
  lastChild: {
    enumerable: true,
    configurable: true,
    get() {
      const childNodes = getInternalChildNodes(this);
      return childNodes[childNodes.length - 1] || null;
    }
  },
  hasChildNodes: {
    writable: true,
    enumerable: true,
    configurable: true,
    value() {
      const childNodes = getInternalChildNodes(this);
      return childNodes.length > 0;
    }
  },
  isConnected: {
    enumerable: true,
    configurable: true,
    get() {
      return isConnected.call(getHost(this));
    }
  },
  nextSibling: {
    enumerable: true,
    configurable: true,
    get() {
      return null;
    }
  },
  previousSibling: {
    enumerable: true,
    configurable: true,
    get() {
      return null;
    }
  },
  nodeName: {
    enumerable: true,
    configurable: true,
    get() {
      return '#document-fragment';
    }
  },
  nodeType: {
    enumerable: true,
    configurable: true,
    get() {
      return 11;
    }
  },
  nodeValue: {
    enumerable: true,
    configurable: true,
    get() {
      return null;
    }
  },
  ownerDocument: {
    enumerable: true,
    configurable: true,
    get() {
      return getHost(this).ownerDocument;
    }
  },
  parentElement: {
    enumerable: true,
    configurable: true,
    get() {
      return null;
    }
  },
  parentNode: {
    enumerable: true,
    configurable: true,
    get() {
      return null;
    }
  },
  textContent: {
    enumerable: true,
    configurable: true,
    get() {
      const childNodes = getInternalChildNodes(this);
      let textContent = '';
      for (let i = 0, len = childNodes.length; i < len; i += 1) {
        const currentNode = childNodes[i];
        if (currentNode.nodeType !== COMMENT_NODE) {
          textContent += getTextContent(currentNode);
        }
      }
      return textContent;
    },
    set(v) {
      const host = getHost(this);
      textContextSetter.call(host, v);
    }
  },
  getRootNode: {
    writable: true,
    enumerable: true,
    configurable: true,
    value(options) {
      return !isUndefined$3(options) && isTrue$1$2(options.composed) ? getHost(this).getRootNode(options) : this;
    }
  }
};
const ElementPatchDescriptors = {
  innerHTML: {
    enumerable: true,
    configurable: true,
    get() {
      const childNodes = getInternalChildNodes(this);
      let innerHTML = '';
      for (let i = 0, len = childNodes.length; i < len; i += 1) {
        innerHTML += getOuterHTML(childNodes[i]);
      }
      return innerHTML;
    },
    set(v) {
      const host = getHost(this);
      innerHTMLSetter.call(host, v);
    }
  }
};
const ParentNodePatchDescriptors = {
  childElementCount: {
    enumerable: true,
    configurable: true,
    get() {
      return this.children.length;
    }
  },
  children: {
    enumerable: true,
    configurable: true,
    get() {
      return createStaticHTMLCollection(ArrayFilter$2.call(shadowRootChildNodes(this), elm => elm instanceof Element));
    }
  },
  firstElementChild: {
    enumerable: true,
    configurable: true,
    get() {
      return this.children[0] || null;
    }
  },
  lastElementChild: {
    enumerable: true,
    configurable: true,
    get() {
      const {
        children
      } = this;
      return children.item(children.length - 1) || null;
    }
  },
  querySelector: {
    writable: true,
    enumerable: true,
    configurable: true,
    value(selectors) {
      return shadowRootQuerySelector(this, selectors);
    }
  },
  querySelectorAll: {
    writable: true,
    enumerable: true,
    configurable: true,
    value(selectors) {
      return createStaticNodeList(shadowRootQuerySelectorAll(this, selectors));
    }
  }
};
assign$2(SyntheticShadowRootDescriptors, NodePatchDescriptors, ParentNodePatchDescriptors, ElementPatchDescriptors, ShadowRootDescriptors);
function SyntheticShadowRoot() {
  throw new TypeError('Illegal constructor');
}
SyntheticShadowRoot.prototype = create$3(DocumentFragment.prototype, SyntheticShadowRootDescriptors);
function getIE11FakeShadowRootPlaceholder(host) {
  const shadowRoot = getShadowRoot(host);
  let c = shadowRoot.$$placeholder$$;
  if (!isUndefined$3(c)) {
    return c;
  }
  const doc = getOwnerDocument(host);
  c = shadowRoot.$$placeholder$$ = createComment.call(doc, '');
  defineProperties$2(c, {
    childNodes: {
      get() {
        return shadowRoot.childNodes;
      },
      enumerable: true,
      configurable: true
    },
    tagName: {
      get() {
        return `#shadow-root (${shadowRoot.mode})`;
      },
      enumerable: true,
      configurable: true
    }
  });
  return c;
}
function foldSlotElement(slot) {
  let parent = parentElementGetter.call(slot);
  while (!isNull$2(parent) && isSlotElement(parent)) {
    slot = parent;
    parent = parentElementGetter.call(slot);
  }
  return slot;
}
function isNodeSlotted(host, node) {
  {
    assert$2.invariant(host instanceof HTMLElement, `isNodeSlotted() should be called with a host as the first argument instead of ${host}`);
    assert$2.invariant(node instanceof Node, `isNodeSlotted() should be called with a node as the second argument instead of ${node}`);
    assert$2.invariant(compareDocumentPosition.call(node, host) & DOCUMENT_POSITION_CONTAINS, `isNodeSlotted() should never be called with a node that is not a child node of ${host}`);
  }
  const hostKey = getNodeKey(host);
  let currentElement = node instanceof Element ? node : parentElementGetter.call(node);
  while (!isNull$2(currentElement) && currentElement !== host) {
    const elmOwnerKey = getNodeNearestOwnerKey(currentElement);
    const parent = parentElementGetter.call(currentElement);
    if (elmOwnerKey === hostKey) {
      return isSlotElement(currentElement);
    } else if (parent === host) {
      return false;
    } else if (!isNull$2(parent) && getNodeNearestOwnerKey(parent) !== elmOwnerKey) {
      if (isSlotElement(parent)) {
        currentElement = getNodeOwner(foldSlotElement(parent));
        if (!isNull$2(currentElement)) {
          if (currentElement === host) {
            return true;
          } else if (getNodeNearestOwnerKey(currentElement) === hostKey) {
            return true;
          }
        }
      } else {
        return false;
      }
    } else {
      currentElement = parent;
    }
  }
  return false;
}
function getNodeOwner(node) {
  if (!(node instanceof Node)) {
    return null;
  }
  const ownerKey = getNodeNearestOwnerKey(node);
  if (isUndefined$3(ownerKey)) {
    return null;
  }
  let nodeOwner = node;
  while (!isNull$2(nodeOwner) && getNodeKey(nodeOwner) !== ownerKey) {
    nodeOwner = parentNodeGetter.call(nodeOwner);
  }
  if (isNull$2(nodeOwner)) {
    return null;
  }
  return nodeOwner;
}
function isSlotElement(node) {
  return node instanceof HTMLSlotElement;
}
function isNodeOwnedBy(owner, node) {
  {
    assert$2.invariant(owner instanceof HTMLElement, `isNodeOwnedBy() should be called with an element as the first argument instead of ${owner}`);
    assert$2.invariant(node instanceof Node, `isNodeOwnedBy() should be called with a node as the second argument instead of ${node}`);
    assert$2.invariant(compareDocumentPosition.call(node, owner) & DOCUMENT_POSITION_CONTAINS, `isNodeOwnedBy() should never be called with a node that is not a child node of ${owner}`);
  }
  const ownerKey = getNodeNearestOwnerKey(node);
  return isUndefined$3(ownerKey) || getNodeKey(owner) === ownerKey;
}
function shadowRootChildNodes(root) {
  const elm = getHost(root);
  return getAllMatches(elm, arrayFromCollection(childNodesGetter.call(elm)));
}
function getAllSlottedMatches(host, nodeList) {
  const filteredAndPatched = [];
  for (let i = 0, len = nodeList.length; i < len; i += 1) {
    const node = nodeList[i];
    if (!isNodeOwnedBy(host, node) && isNodeSlotted(host, node)) {
      ArrayPush$4.call(filteredAndPatched, node);
    }
  }
  return filteredAndPatched;
}
function getFirstSlottedMatch(host, nodeList) {
  for (let i = 0, len = nodeList.length; i < len; i += 1) {
    const node = nodeList[i];
    if (!isNodeOwnedBy(host, node) && isNodeSlotted(host, node)) {
      return node;
    }
  }
  return null;
}
function getAllMatches(owner, nodeList) {
  const filteredAndPatched = [];
  for (let i = 0, len = nodeList.length; i < len; i += 1) {
    const node = nodeList[i];
    const isOwned = isNodeOwnedBy(owner, node);
    if (isOwned) {
      ArrayPush$4.call(filteredAndPatched, node);
    }
  }
  return filteredAndPatched;
}
function getFirstMatch(owner, nodeList) {
  for (let i = 0, len = nodeList.length; i < len; i += 1) {
    if (isNodeOwnedBy(owner, nodeList[i])) {
      return nodeList[i];
    }
  }
  return null;
}
function shadowRootQuerySelector(root, selector) {
  const elm = getHost(root);
  const nodeList = arrayFromCollection(querySelectorAll.call(elm, selector));
  return getFirstMatch(elm, nodeList);
}
function shadowRootQuerySelectorAll(root, selector) {
  const elm = getHost(root);
  const nodeList = querySelectorAll.call(elm, selector);
  return getAllMatches(elm, arrayFromCollection(nodeList));
}
function getFilteredChildNodes(node) {
  let children;
  if (!isHostElement(node) && !isSlotElement(node)) {
    children = childNodesGetter.call(node);
    return arrayFromCollection(children);
  }
  if (isHostElement(node)) {
    const slots = arrayFromCollection(querySelectorAll.call(node, 'slot'));
    const resolver = getShadowRootResolver(getShadowRoot(node));
    return ArrayReduce$2.call(slots, (seed, slot) => {
      if (resolver === getShadowRootResolver(slot)) {
        ArrayPush$4.apply(seed, getFilteredSlotAssignedNodes(slot));
      }
      return seed;
    }, []);
  } else {
    children = arrayFromCollection(childNodesGetter.call(node));
    const resolver = getShadowRootResolver(node);
    return ArrayReduce$2.call(children, (seed, child) => {
      if (resolver === getShadowRootResolver(child)) {
        ArrayPush$4.call(seed, child);
      }
      return seed;
    }, []);
  }
}
function getFilteredSlotAssignedNodes(slot) {
  const owner = getNodeOwner(slot);
  if (isNull$2(owner)) {
    return [];
  }
  const childNodes = arrayFromCollection(childNodesGetter.call(slot));
  return ArrayReduce$2.call(childNodes, (seed, child) => {
    if (!isNodeOwnedBy(owner, child)) {
      ArrayPush$4.call(seed, child);
    }
    return seed;
  }, []);
}
const OwnKey = '$$OwnKey$$';
const OwnerKey = '$$OwnerKey$$';
const hasNativeSymbolsSupport$2$1 = Symbol('x').toString() === 'Symbol(x)';
function getNodeOwnerKey(node) {
  return node[OwnerKey];
}
function setNodeOwnerKey(node, value) {
  {
    defineProperty$2(node, OwnerKey, {
      value,
      configurable: true
    });
  }
}
function getNodeKey(node) {
  return node[OwnKey];
}
function setNodeKey(node, value) {
  {
    defineProperty$2(node, OwnKey, {
      value
    });
  }
}
function getNodeNearestOwnerKey(node) {
  let ownerNode = node;
  let ownerKey;
  while (!isNull$2(ownerNode)) {
    ownerKey = getNodeOwnerKey(ownerNode);
    if (!isUndefined$3(ownerKey)) {
      return ownerKey;
    }
    ownerNode = parentNodeGetter.call(ownerNode);
  }
}
function isNodeShadowed(node) {
  return !isUndefined$3(getNodeOwnerKey(node));
}
function isNodeDeepShadowed(node) {
  return !isUndefined$3(getNodeNearestOwnerKey(node));
}
function hasMountedChildren(node) {
  return isSlotElement(node) || isHostElement(node);
}
function getShadowParent(node, value) {
  const owner = getNodeOwner(node);
  if (value === owner) {
    return getShadowRoot(owner);
  } else if (value instanceof Element) {
    if (getNodeNearestOwnerKey(node) === getNodeNearestOwnerKey(value)) {
      return value;
    } else if (!isNull$2(owner) && isSlotElement(value)) {
      const slotOwner = getNodeOwner(value);
      if (!isNull$2(slotOwner) && isNodeOwnedBy(owner, slotOwner)) {
        return slotOwner;
      }
    }
  }
  return null;
}
function hasChildNodesPatched() {
  return getInternalChildNodes(this).length > 0;
}
function firstChildGetterPatched() {
  const childNodes = getInternalChildNodes(this);
  return childNodes[0] || null;
}
function lastChildGetterPatched() {
  const childNodes = getInternalChildNodes(this);
  return childNodes[childNodes.length - 1] || null;
}
function textContentGetterPatched() {
  return getTextContent(this);
}
function textContentSetterPatched(value) {
  textContextSetter.call(this, value);
}
function parentNodeGetterPatched() {
  const value = parentNodeGetter.call(this);
  if (isNull$2(value)) {
    return value;
  }
  return getShadowParent(this, value);
}
function parentElementGetterPatched() {
  const value = parentNodeGetter.call(this);
  if (isNull$2(value)) {
    return null;
  }
  const parentNode = getShadowParent(this, value);
  return parentNode instanceof Element ? parentNode : null;
}
function compareDocumentPositionPatched(otherNode) {
  if (this.getRootNode() === otherNode) {
    return 10;
  } else if (getNodeOwnerKey(this) !== getNodeOwnerKey(otherNode)) {
    return 35;
  }
  return compareDocumentPosition.call(this, otherNode);
}
function containsPatched(otherNode) {
  if (otherNode == null || getNodeOwnerKey(this) !== getNodeOwnerKey(otherNode)) {
    return false;
  }
  return (compareDocumentPosition.call(this, otherNode) & DOCUMENT_POSITION_CONTAINED_BY) !== 0;
}
function cloneNodePatched(deep) {
  const clone = cloneNode.call(this, false);
  if (!deep) {
    return clone;
  }
  const childNodes = getInternalChildNodes(this);
  for (let i = 0, len = childNodes.length; i < len; i += 1) {
    clone.appendChild(childNodes[i].cloneNode(true));
  }
  return clone;
}
function childNodesGetterPatched() {
  if (this instanceof Element && isHostElement(this)) {
    const owner = getNodeOwner(this);
    const childNodes = isNull$2(owner) ? [] : getAllMatches(owner, getFilteredChildNodes(this));
    if ( isFalse$1$2(hasNativeSymbolsSupport$2$1) && isExternalChildNodeAccessorFlagOn()) {
      ArrayUnshift$3.call(childNodes, getIE11FakeShadowRootPlaceholder(this));
    }
    return createStaticNodeList(childNodes);
  }
  return childNodesGetter.call(this);
}
const nativeGetRootNode = Node.prototype.getRootNode;
const getDocumentOrRootNode = !isUndefined$3(nativeGetRootNode) ? nativeGetRootNode : function () {
  let node = this;
  let nodeParent;
  while (!isNull$2(nodeParent = parentNodeGetter.call(node))) {
    node = nodeParent;
  }
  return node;
};
function getNearestRoot(node) {
  const ownerNode = getNodeOwner(node);
  if (isNull$2(ownerNode)) {
    return getDocumentOrRootNode.call(node);
  }
  return getShadowRoot(ownerNode);
}
function getRootNodePatched(options) {
  const composed = isUndefined$3(options) ? false : !!options.composed;
  return isTrue$1$2(composed) ? getDocumentOrRootNode.call(this, options) : getNearestRoot(this);
}
defineProperties$2(Node.prototype, {
  firstChild: {
    get() {
      if (hasMountedChildren(this)) {
        return firstChildGetterPatched.call(this);
      }
      return firstChildGetter.call(this);
    },
    enumerable: true,
    configurable: true
  },
  lastChild: {
    get() {
      if (hasMountedChildren(this)) {
        return lastChildGetterPatched.call(this);
      }
      return lastChildGetter.call(this);
    },
    enumerable: true,
    configurable: true
  },
  textContent: {
    get() {
      if (!runtimeFlags$1.ENABLE_NODE_PATCH) {
        if (isNodeShadowed(this) || isHostElement(this)) {
          return textContentGetterPatched.call(this);
        }
        return textContentGetter.call(this);
      }
      if (isGlobalPatchingSkipped(this)) {
        return textContentGetter.call(this);
      }
      return textContentGetterPatched.call(this);
    },
    set: textContentSetterPatched,
    enumerable: true,
    configurable: true
  },
  parentNode: {
    get() {
      if (isNodeShadowed(this)) {
        return parentNodeGetterPatched.call(this);
      }
      return parentNodeGetter.call(this);
    },
    enumerable: true,
    configurable: true
  },
  parentElement: {
    get() {
      if (isNodeShadowed(this)) {
        return parentElementGetterPatched.call(this);
      }
      return parentElementGetter.call(this);
    },
    enumerable: true,
    configurable: true
  },
  childNodes: {
    get() {
      if (hasMountedChildren(this)) {
        return childNodesGetterPatched.call(this);
      }
      return childNodesGetter.call(this);
    },
    enumerable: true,
    configurable: true
  },
  hasChildNodes: {
    value() {
      if (hasMountedChildren(this)) {
        return hasChildNodesPatched.call(this);
      }
      return hasChildNodes.call(this);
    },
    enumerable: true,
    writable: true,
    configurable: true
  },
  compareDocumentPosition: {
    value(otherNode) {
      if (isGlobalPatchingSkipped(this)) {
        return compareDocumentPosition.call(this, otherNode);
      }
      return compareDocumentPositionPatched.call(this, otherNode);
    },
    enumerable: true,
    writable: true,
    configurable: true
  },
  contains: {
    value(otherNode) {
      if (this === otherNode) {
        return true;
      }
      if (!runtimeFlags$1.ENABLE_NODE_PATCH) {
        if (otherNode == null) {
          return false;
        }
        if (isNodeShadowed(this) || isHostElement(this)) {
          return containsPatched.call(this, otherNode);
        }
        return contains.call(this, otherNode);
      }
      if (isGlobalPatchingSkipped(this)) {
        return contains.call(this, otherNode);
      }
      return containsPatched.call(this, otherNode);
    },
    enumerable: true,
    writable: true,
    configurable: true
  },
  cloneNode: {
    value(deep) {
      if (!runtimeFlags$1.ENABLE_NODE_PATCH) {
        if (isNodeShadowed(this) || isHostElement(this)) {
          return cloneNodePatched.call(this, deep);
        }
        return cloneNode.call(this, deep);
      }
      if (isTrue$1$2(deep)) {
        if (isGlobalPatchingSkipped(this)) {
          return cloneNode.call(this, deep);
        }
        return cloneNodePatched.call(this, deep);
      }
      return cloneNode.call(this, deep);
    },
    enumerable: true,
    writable: true,
    configurable: true
  },
  getRootNode: {
    value: getRootNodePatched,
    enumerable: true,
    configurable: true,
    writable: true
  },
  isConnected: {
    enumerable: true,
    configurable: true,
    get() {
      return isConnected.call(this);
    }
  }
});
let internalChildNodeAccessorFlag = false;
function isExternalChildNodeAccessorFlagOn() {
  return !internalChildNodeAccessorFlag;
}
const getInternalChildNodes =  isFalse$1$2(hasNativeSymbolsSupport$2$1) ? function (node) {
  internalChildNodeAccessorFlag = true;
  let childNodes;
  let error = null;
  try {
    childNodes = node.childNodes;
  } catch (e) {
    error = e;
  } finally {
    internalChildNodeAccessorFlag = false;
    if (!isNull$2(error)) {
      throw error;
    }
  }
  return childNodes;
} : function (node) {
  return node.childNodes;
};
if (hasOwnProperty$3.call(HTMLElement.prototype, 'contains')) {
  defineProperty$2(HTMLElement.prototype, 'contains', getOwnPropertyDescriptor$3(Node.prototype, 'contains'));
}
if (hasOwnProperty$3.call(HTMLElement.prototype, 'parentElement')) {
  defineProperty$2(HTMLElement.prototype, 'parentElement', getOwnPropertyDescriptor$3(Node.prototype, 'parentElement'));
}
function elemFromPoint(left, top) {
  const element = elementFromPoint.call(this, left, top);
  if (isNull$2(element)) {
    return element;
  }
  return retarget(this, pathComposer(element, true));
}
Document.prototype.elementFromPoint = elemFromPoint;
defineProperty$2(Document.prototype, 'activeElement', {
  get() {
    let node = DocumentPrototypeActiveElement.call(this);
    if (isNull$2(node)) {
      return node;
    }
    while (!isUndefined$3(getNodeOwnerKey(node))) {
      node = parentElementGetter.call(node);
      if (isNull$2(node)) {
        return null;
      }
    }
    if (node.tagName === 'HTML') {
      node = this.body;
    }
    return node;
  },
  enumerable: true,
  configurable: true
});
defineProperty$2(Document.prototype, 'getElementById', {
  value() {
    const elm = getElementById.apply(this, ArraySlice$3.call(arguments));
    if (isNull$2(elm)) {
      return null;
    }
    return isUndefined$3(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm) ? elm : null;
  },
  writable: true,
  enumerable: true,
  configurable: true
});
defineProperty$2(Document.prototype, 'querySelector', {
  value() {
    const elements = arrayFromCollection(querySelectorAll$1.apply(this, ArraySlice$3.call(arguments)));
    const filtered = ArrayFind$2.call(elements, elm => isUndefined$3(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm));
    return !isUndefined$3(filtered) ? filtered : null;
  },
  writable: true,
  enumerable: true,
  configurable: true
});
defineProperty$2(Document.prototype, 'querySelectorAll', {
  value() {
    const elements = arrayFromCollection(querySelectorAll$1.apply(this, ArraySlice$3.call(arguments)));
    const filtered = ArrayFilter$2.call(elements, elm => isUndefined$3(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm));
    return createStaticNodeList(filtered);
  },
  writable: true,
  enumerable: true,
  configurable: true
});
defineProperty$2(Document.prototype, 'getElementsByClassName', {
  value() {
    const elements = arrayFromCollection(getElementsByClassName$1.apply(this, ArraySlice$3.call(arguments)));
    const filtered = ArrayFilter$2.call(elements, elm => isUndefined$3(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm));
    return createStaticHTMLCollection(filtered);
  },
  writable: true,
  enumerable: true,
  configurable: true
});
defineProperty$2(Document.prototype, 'getElementsByTagName', {
  value() {
    const elements = arrayFromCollection(getElementsByTagName$1.apply(this, ArraySlice$3.call(arguments)));
    const filtered = ArrayFilter$2.call(elements, elm => isUndefined$3(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm));
    return createStaticHTMLCollection(filtered);
  },
  writable: true,
  enumerable: true,
  configurable: true
});
defineProperty$2(Document.prototype, 'getElementsByTagNameNS', {
  value() {
    const elements = arrayFromCollection(getElementsByTagNameNS$1.apply(this, ArraySlice$3.call(arguments)));
    const filtered = ArrayFilter$2.call(elements, elm => isUndefined$3(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm));
    return createStaticHTMLCollection(filtered);
  },
  writable: true,
  enumerable: true,
  configurable: true
});
defineProperty$2(getOwnPropertyDescriptor$3(HTMLDocument.prototype, 'getElementsByName') ? HTMLDocument.prototype : Document.prototype, 'getElementsByName', {
  value() {
    const elements = arrayFromCollection(getElementsByName.apply(this, ArraySlice$3.call(arguments)));
    const filtered = ArrayFilter$2.call(elements, elm => isUndefined$3(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(elm));
    return createStaticNodeList(filtered);
  },
  writable: true,
  enumerable: true,
  configurable: true
});
Object.defineProperty(window, 'ShadowRoot', {
  value: SyntheticShadowRoot,
  configurable: true,
  writable: true
});
function doesEventNeedsPatch(e) {
  const originalTarget = eventTargetGetter.call(e);
  return originalTarget instanceof Node && isNodeDeepShadowed(originalTarget);
}
function isValidEventListener(listener) {
  return isFunction$2(listener) || !isNull$2(listener) && isObject$3(listener) && isFunction$2(listener.handleEvent);
}
function getEventListenerWrapper(listener) {
  if ('$$lwcEventWrapper$$' in listener) {
    return listener.$$lwcEventWrapper$$;
  }
  const isHandlerFunction = isFunction$2(listener);
  const wrapperFn = listener.$$lwcEventWrapper$$ = function (e) {
    if (doesEventNeedsPatch(e)) {
      patchEvent(e);
    }
    return isHandlerFunction ? listener.call(this, e) : listener.handleEvent && listener.handleEvent(e);
  };
  return wrapperFn;
}
function windowAddEventListener$1(type, listener, optionsOrCapture) {
  if (!isValidEventListener(listener)) {
    return;
  }
  const wrapperFn = getEventListenerWrapper(listener);
  windowAddEventListener.call(this, type, wrapperFn, optionsOrCapture);
}
function windowRemoveEventListener$1(type, listener, optionsOrCapture) {
  if (!isValidEventListener(listener)) {
    return;
  }
  const wrapperFn = getEventListenerWrapper(listener);
  windowRemoveEventListener.call(this, type, wrapperFn || listener, optionsOrCapture);
}
function addEventListener$1(type, listener, optionsOrCapture) {
  if (!isValidEventListener(listener)) {
    return;
  }
  const wrapperFn = getEventListenerWrapper(listener);
  addEventListener.call(this, type, wrapperFn, optionsOrCapture);
}
function removeEventListener$1(type, listener, optionsOrCapture) {
  if (!isValidEventListener(listener)) {
    return;
  }
  const wrapperFn = getEventListenerWrapper(listener);
  removeEventListener.call(this, type, wrapperFn || listener, optionsOrCapture);
}
window.addEventListener = windowAddEventListener$1;
window.removeEventListener = windowRemoveEventListener$1;
const protoToBePatched = typeof EventTarget !== 'undefined' ? EventTarget.prototype : Node.prototype;
defineProperties$2(protoToBePatched, {
  addEventListener: {
    value: addEventListener$1,
    enumerable: true,
    writable: true,
    configurable: true
  },
  removeEventListener: {
    value: removeEventListener$1,
    enumerable: true,
    writable: true,
    configurable: true
  }
});
const composedDescriptor = Object.getOwnPropertyDescriptor(Event.prototype, 'composed');
function detect$1$1() {
  if (!composedDescriptor) {
    return false;
  }
  let clickEvent = new Event('click');
  const button = document.createElement('button');
  button.addEventListener('click', event => clickEvent = event);
  button.click();
  return !composedDescriptor.get.call(clickEvent);
}
const originalClickDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'click');
function handleClick(event) {
  Object.defineProperty(event, 'composed', {
    configurable: true,
    enumerable: true,
    get() {
      return true;
    }
  });
}
function apply$1$1() {
  HTMLElement.prototype.click = function () {
    addEventListener.call(this, 'click', handleClick);
    try {
      originalClickDescriptor.value.call(this);
    } finally {
      removeEventListener.call(this, 'click', handleClick);
    }
  };
}
if (detect$1$1()) {
  apply$1$1();
}
function detect$2$1() {
  return new Event('test', {
    composed: true
  }).composed !== true;
}
function apply$2() {
  const composedEvents = assign$2(create$3(null), {
    beforeinput: 1,
    blur: 1,
    click: 1,
    compositionend: 1,
    compositionstart: 1,
    compositionupdate: 1,
    copy: 1,
    cut: 1,
    dblclick: 1,
    DOMActivate: 1,
    DOMFocusIn: 1,
    DOMFocusOut: 1,
    drag: 1,
    dragend: 1,
    dragenter: 1,
    dragleave: 1,
    dragover: 1,
    dragstart: 1,
    drop: 1,
    focus: 1,
    focusin: 1,
    focusout: 1,
    gotpointercapture: 1,
    input: 1,
    keydown: 1,
    keypress: 1,
    keyup: 1,
    lostpointercapture: 1,
    mousedown: 1,
    mouseenter: 1,
    mouseleave: 1,
    mousemove: 1,
    mouseout: 1,
    mouseover: 1,
    mouseup: 1,
    paste: 1,
    pointercancel: 1,
    pointerdown: 1,
    pointerenter: 1,
    pointerleave: 1,
    pointermove: 1,
    pointerout: 1,
    pointerover: 1,
    pointerup: 1,
    touchcancel: 1,
    touchend: 1,
    touchmove: 1,
    touchstart: 1,
    wheel: 1
  });
  const EventConstructor = Event;
  function PatchedEvent(type, eventInitDict) {
    const event = new EventConstructor(type, eventInitDict);
    const isComposed = !!(eventInitDict && eventInitDict.composed);
    Object.defineProperties(event, {
      composed: {
        get() {
          return isComposed;
        },
        configurable: true,
        enumerable: true
      }
    });
    return event;
  }
  PatchedEvent.prototype = EventConstructor.prototype;
  PatchedEvent.AT_TARGET = EventConstructor.AT_TARGET;
  PatchedEvent.BUBBLING_PHASE = EventConstructor.BUBBLING_PHASE;
  PatchedEvent.CAPTURING_PHASE = EventConstructor.CAPTURING_PHASE;
  PatchedEvent.NONE = EventConstructor.NONE;
  window.Event = PatchedEvent;
  Object.defineProperties(Event.prototype, {
    composed: {
      get() {
        const {
          type
        } = this;
        return composedEvents[type] === 1;
      },
      configurable: true,
      enumerable: true
    }
  });
}
if (detect$2$1()) {
  apply$2();
}
const CustomEventConstructor = CustomEvent;
function PatchedCustomEvent(type, eventInitDict) {
  const event = new CustomEventConstructor(type, eventInitDict);
  const isComposed = !!(eventInitDict && eventInitDict.composed);
  Object.defineProperties(event, {
    composed: {
      get() {
        return isComposed;
      },
      configurable: true,
      enumerable: true
    }
  });
  return event;
}
PatchedCustomEvent.prototype = CustomEventConstructor.prototype;
window.CustomEvent = PatchedCustomEvent;
if (typeof ClipboardEvent !== 'undefined') {
  const isComposedType = assign$2(create$3(null), {
    copy: 1,
    cut: 1,
    paste: 1
  });
  defineProperties$2(ClipboardEvent.prototype, {
    composed: {
      get() {
        const {
          type
        } = this;
        return isComposedType[type] === 1;
      },
      configurable: true,
      enumerable: true
    }
  });
}
function detect$3() {
  return typeof HTMLIFrameElement !== 'undefined';
}
function apply$3() {
  const desc = getOwnPropertyDescriptor$3(HTMLIFrameElement.prototype, 'contentWindow');
  const {
    get: originalGetter
  } = desc;
  desc.get = function () {
    const original = originalGetter.call(this);
    if (isNull$2(original) || isUndefined$3(getNodeOwnerKey(this))) {
      return original;
    }
    return wrapIframeWindow(original);
  };
  defineProperty$2(HTMLIFrameElement.prototype, 'contentWindow', desc);
}
function wrapIframeWindow(win) {
  return {
    addEventListener() {
      return win.addEventListener.apply(win, arguments);
    },
    blur() {
      return win.blur.apply(win, arguments);
    },
    close() {
      return win.close.apply(win, arguments);
    },
    focus() {
      return win.focus.apply(win, arguments);
    },
    postMessage() {
      return win.postMessage.apply(win, arguments);
    },
    removeEventListener() {
      return win.removeEventListener.apply(win, arguments);
    },
    get closed() {
      return win.closed;
    },
    get frames() {
      return win.frames;
    },
    get length() {
      return win.length;
    },
    get location() {
      return win.location;
    },
    set location(value) {
      win.location = value;
    },
    get opener() {
      return win.opener;
    },
    get parent() {
      return win.parent;
    },
    get self() {
      return win.self;
    },
    get top() {
      return win.top;
    },
    get window() {
      return win.window;
    }
  };
}
if (detect$3()) {
  apply$3();
}
const OriginalMutationObserver = MutationObserver;
const {
  disconnect: originalDisconnect,
  observe: originalObserve,
  takeRecords: originalTakeRecords
} = OriginalMutationObserver.prototype;
const wrapperLookupField = '$$lwcObserverCallbackWrapper$$';
const observerLookupField = '$$lwcNodeObservers$$';
const observerToNodesMap = new WeakMap();
function getNodeObservers(node) {
  return node[observerLookupField];
}
function setNodeObservers(node, observers) {
  node[observerLookupField] = observers;
}
function retargetMutationRecord(originalRecord) {
  const {
    addedNodes,
    removedNodes,
    target,
    type
  } = originalRecord;
  const retargetedRecord = create$3(MutationRecord.prototype);
  defineProperties$2(retargetedRecord, {
    addedNodes: {
      get() {
        return addedNodes;
      },
      enumerable: true,
      configurable: true
    },
    removedNodes: {
      get() {
        return removedNodes;
      },
      enumerable: true,
      configurable: true
    },
    type: {
      get() {
        return type;
      },
      enumerable: true,
      configurable: true
    },
    target: {
      get() {
        return target.shadowRoot;
      },
      enumerable: true,
      configurable: true
    }
  });
  return retargetedRecord;
}
function isQualifiedObserver(observer, target) {
  let parentNode = target;
  while (!isNull$2(parentNode)) {
    const parentNodeObservers = getNodeObservers(parentNode);
    if (!isUndefined$3(parentNodeObservers) && (parentNodeObservers[0] === observer || ArrayIndexOf$3.call(parentNodeObservers, observer) !== -1)) {
      return true;
    }
    parentNode = parentNode.parentNode;
  }
  return false;
}
function filterMutationRecords(mutations, observer) {
  return ArrayReduce$2.call(mutations, (filteredSet, record) => {
    const {
      target,
      addedNodes,
      removedNodes,
      type
    } = record;
    if (type === 'childList' && !isUndefined$3(getNodeKey(target))) {
      if (addedNodes.length > 0) {
        const sampleNode = addedNodes[0];
        if (isQualifiedObserver(observer, sampleNode)) {
          const nodeObservers = getNodeObservers(target);
          if (nodeObservers && (nodeObservers[0] === observer || ArrayIndexOf$3.call(nodeObservers, observer) !== -1)) {
            ArrayPush$4.call(filteredSet, record);
          } else {
            ArrayPush$4.call(filteredSet, retargetMutationRecord(record));
          }
        }
      } else {
        const shadowRoot = target.shadowRoot;
        const sampleNode = removedNodes[0];
        if (getNodeNearestOwnerKey(target) === getNodeNearestOwnerKey(sampleNode) && isQualifiedObserver(observer, target)) {
          ArrayPush$4.call(filteredSet, record);
        } else if (shadowRoot) {
          const shadowRootObservers = getNodeObservers(shadowRoot);
          if (shadowRootObservers && (shadowRootObservers[0] === observer || ArrayIndexOf$3.call(shadowRootObservers, observer) !== -1)) {
            ArrayPush$4.call(filteredSet, retargetMutationRecord(record));
          }
        }
      }
    } else {
      if (isQualifiedObserver(observer, target)) {
        ArrayPush$4.call(filteredSet, record);
      }
    }
    return filteredSet;
  }, []);
}
function getWrappedCallback(callback) {
  let wrappedCallback = callback[wrapperLookupField];
  if (isUndefined$3(wrappedCallback)) {
    wrappedCallback = callback[wrapperLookupField] = (mutations, observer) => {
      const filteredRecords = filterMutationRecords(mutations, observer);
      if (filteredRecords.length === 0) {
        return;
      }
      callback.call(observer, filteredRecords, observer);
    };
  }
  return wrappedCallback;
}
function PatchedMutationObserver(callback) {
  const wrappedCallback = getWrappedCallback(callback);
  const observer = new OriginalMutationObserver(wrappedCallback);
  return observer;
}
function patchedDisconnect() {
  originalDisconnect.call(this);
  const observedNodes = observerToNodesMap.get(this);
  if (!isUndefined$3(observedNodes)) {
    forEach$2.call(observedNodes, observedNode => {
      const observers = observedNode[observerLookupField];
      if (!isUndefined$3(observers)) {
        const index = ArrayIndexOf$3.call(observers, this);
        if (index !== -1) {
          ArraySplice$3.call(observers, index, 1);
        }
      }
    });
    observedNodes.length = 0;
  }
}
function patchedObserve(target, options) {
  let targetObservers = getNodeObservers(target);
  if (isUndefined$3(targetObservers)) {
    targetObservers = [];
    setNodeObservers(target, targetObservers);
  }
  if (ArrayIndexOf$3.call(targetObservers, this) === -1) {
    ArrayPush$4.call(targetObservers, this);
  }
  if (target instanceof SyntheticShadowRoot) {
    target = target.host;
  }
  if (observerToNodesMap.has(this)) {
    const observedNodes = observerToNodesMap.get(this);
    if (ArrayIndexOf$3.call(observedNodes, target) === -1) {
      ArrayPush$4.call(observedNodes, target);
    }
  } else {
    observerToNodesMap.set(this, [target]);
  }
  return originalObserve.call(this, target, options);
}
function patchedTakeRecords() {
  return filterMutationRecords(originalTakeRecords.call(this), this);
}
PatchedMutationObserver.prototype = OriginalMutationObserver.prototype;
PatchedMutationObserver.prototype.disconnect = patchedDisconnect;
PatchedMutationObserver.prototype.observe = patchedObserve;
PatchedMutationObserver.prototype.takeRecords = patchedTakeRecords;
defineProperty$2(window, 'MutationObserver', {
  value: PatchedMutationObserver,
  configurable: true,
  writable: true
});
let observer;
const observerConfig = {
  childList: true
};
const SlotChangeKey = createHiddenField$2('slotchange', 'synthetic-shadow');
function initSlotObserver() {
  return new MO(mutations => {
    const slots = [];
    forEach$2.call(mutations, mutation => {
      {
        assert$2.invariant(mutation.type === 'childList', `Invalid mutation type: ${mutation.type}. This mutation handler for slots should only handle "childList" mutations.`);
      }
      const {
        target: slot
      } = mutation;
      if (ArrayIndexOf$3.call(slots, slot) === -1) {
        ArrayPush$4.call(slots, slot);
        dispatchEvent.call(slot, new CustomEvent('slotchange'));
      }
    });
  });
}
function getFilteredSlotFlattenNodes(slot) {
  const childNodes = arrayFromCollection(childNodesGetter.call(slot));
  return ArrayReduce$2.call(childNodes, (seed, child) => {
    if (child instanceof Element && isSlotElement(child)) {
      ArrayPush$4.apply(seed, getFilteredSlotFlattenNodes(child));
    } else {
      ArrayPush$4.call(seed, child);
    }
    return seed;
  }, []);
}
function assignedSlotGetterPatched() {
  const parentNode = parentNodeGetter.call(this);
  if (isNull$2(parentNode) || !isSlotElement(parentNode) || getNodeNearestOwnerKey(parentNode) === getNodeNearestOwnerKey(this)) {
    return null;
  }
  return parentNode;
}
defineProperties$2(HTMLSlotElement.prototype, {
  addEventListener: {
    value(type, listener, options) {
      HTMLElement.prototype.addEventListener.call(this, type, listener, options);
      if (type === 'slotchange' && !getHiddenField$2(this, SlotChangeKey)) {
        setHiddenField$2(this, SlotChangeKey, true);
        if (!observer) {
          observer = initSlotObserver();
        }
        MutationObserverObserve.call(observer, this, observerConfig);
      }
    },
    writable: true,
    enumerable: true,
    configurable: true
  },
  assignedElements: {
    value(options) {
      if (isNodeShadowed(this)) {
        const flatten = !isUndefined$3(options) && isTrue$1$2(options.flatten);
        const nodes = flatten ? getFilteredSlotFlattenNodes(this) : getFilteredSlotAssignedNodes(this);
        return ArrayFilter$2.call(nodes, node => node instanceof Element);
      } else {
        return assignedElements.apply(this, ArraySlice$3.call(arguments));
      }
    },
    writable: true,
    enumerable: true,
    configurable: true
  },
  assignedNodes: {
    value(options) {
      if (isNodeShadowed(this)) {
        const flatten = !isUndefined$3(options) && isTrue$1$2(options.flatten);
        return flatten ? getFilteredSlotFlattenNodes(this) : getFilteredSlotAssignedNodes(this);
      } else {
        return assignedNodes.apply(this, ArraySlice$3.call(arguments));
      }
    },
    writable: true,
    enumerable: true,
    configurable: true
  },
  name: {
    get() {
      const name = getAttribute.call(this, 'name');
      return isNull$2(name) ? '' : name;
    },
    set(value) {
      setAttribute.call(this, 'name', value);
    },
    enumerable: true,
    configurable: true
  },
  childNodes: {
    get() {
      if (isNodeShadowed(this)) {
        const owner = getNodeOwner(this);
        const childNodes = isNull$2(owner) ? [] : getAllMatches(owner, getFilteredChildNodes(this));
        return createStaticNodeList(childNodes);
      }
      return childNodesGetter.call(this);
    },
    enumerable: true,
    configurable: true
  }
});
defineProperties$2(Text.prototype, {
  assignedSlot: {
    get: assignedSlotGetterPatched,
    enumerable: true,
    configurable: true
  }
});
function getNonPatchedFilteredArrayOfNodes(context, unfilteredNodes) {
  let filtered;
  const ownerKey = getNodeOwnerKey(context);
  if (!isUndefined$3(ownerKey)) {
    if (isHostElement(context)) {
      const owner = getNodeOwner(context);
      if (isNull$2(owner)) {
        filtered = [];
      } else if (getNodeKey(context)) {
        filtered = getAllSlottedMatches(context, unfilteredNodes);
      } else {
        filtered = getAllMatches(owner, unfilteredNodes);
      }
    } else {
      filtered = ArrayFilter$2.call(unfilteredNodes, elm => getNodeNearestOwnerKey(elm) === ownerKey);
    }
  } else if (context instanceof HTMLBodyElement) {
    filtered = ArrayFilter$2.call(unfilteredNodes, elm => isUndefined$3(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(context));
  } else {
    filtered = ArraySlice$3.call(unfilteredNodes);
  }
  return filtered;
}
var ShadowDomSemantic;
(function (ShadowDomSemantic) {
  ShadowDomSemantic[ShadowDomSemantic["Disabled"] = 0] = "Disabled";
  ShadowDomSemantic[ShadowDomSemantic["Enabled"] = 1] = "Enabled";
})(ShadowDomSemantic || (ShadowDomSemantic = {}));
function innerHTMLGetterPatched() {
  const childNodes = getInternalChildNodes(this);
  let innerHTML = '';
  for (let i = 0, len = childNodes.length; i < len; i += 1) {
    innerHTML += getOuterHTML(childNodes[i]);
  }
  return innerHTML;
}
function outerHTMLGetterPatched() {
  return getOuterHTML(this);
}
function attachShadowPatched(options) {
  if (isTrue$1$2(options['$$lwc-synthetic-mode$$'])) {
    return attachShadow$1(this, options);
  } else {
    return attachShadow.call(this, options);
  }
}
function shadowRootGetterPatched() {
  if (isHostElement(this)) {
    const shadow = getShadowRoot(this);
    if (shadow.mode === 'open') {
      return shadow;
    }
  }
  return shadowRootGetter.call(this);
}
function childrenGetterPatched() {
  const owner = getNodeOwner(this);
  const childNodes = isNull$2(owner) ? [] : getAllMatches(owner, getFilteredChildNodes(this));
  return createStaticHTMLCollection(ArrayFilter$2.call(childNodes, node => node instanceof Element));
}
function childElementCountGetterPatched() {
  return this.children.length;
}
function firstElementChildGetterPatched() {
  return this.children[0] || null;
}
function lastElementChildGetterPatched() {
  const {
    children
  } = this;
  return children.item(children.length - 1) || null;
}
defineProperties$2(Element.prototype, {
  innerHTML: {
    get() {
      if (!runtimeFlags$1.ENABLE_ELEMENT_PATCH) {
        if (isNodeShadowed(this) || isHostElement(this)) {
          return innerHTMLGetterPatched.call(this);
        }
        return innerHTMLGetter.call(this);
      }
      if (isGlobalPatchingSkipped(this)) {
        return innerHTMLGetter.call(this);
      }
      return innerHTMLGetterPatched.call(this);
    },
    set(v) {
      innerHTMLSetter.call(this, v);
    },
    enumerable: true,
    configurable: true
  },
  outerHTML: {
    get() {
      if (!runtimeFlags$1.ENABLE_ELEMENT_PATCH) {
        if (isNodeShadowed(this) || isHostElement(this)) {
          return outerHTMLGetterPatched.call(this);
        }
        return outerHTMLGetter.call(this);
      }
      if (isGlobalPatchingSkipped(this)) {
        return outerHTMLGetter.call(this);
      }
      return outerHTMLGetterPatched.call(this);
    },
    set(v) {
      outerHTMLSetter.call(this, v);
    },
    enumerable: true,
    configurable: true
  },
  attachShadow: {
    value: attachShadowPatched,
    enumerable: true,
    writable: true,
    configurable: true
  },
  shadowRoot: {
    get: shadowRootGetterPatched,
    enumerable: true,
    configurable: true
  },
  children: {
    get() {
      if (hasMountedChildren(this)) {
        return childrenGetterPatched.call(this);
      }
      return childrenGetter.call(this);
    },
    enumerable: true,
    configurable: true
  },
  childElementCount: {
    get() {
      if (hasMountedChildren(this)) {
        return childElementCountGetterPatched.call(this);
      }
      return childElementCountGetter.call(this);
    },
    enumerable: true,
    configurable: true
  },
  firstElementChild: {
    get() {
      if (hasMountedChildren(this)) {
        return firstElementChildGetterPatched.call(this);
      }
      return firstElementChildGetter.call(this);
    },
    enumerable: true,
    configurable: true
  },
  lastElementChild: {
    get() {
      if (hasMountedChildren(this)) {
        return lastElementChildGetterPatched.call(this);
      }
      return lastElementChildGetter.call(this);
    },
    enumerable: true,
    configurable: true
  },
  assignedSlot: {
    get: assignedSlotGetterPatched,
    enumerable: true,
    configurable: true
  }
});
if (hasOwnProperty$3.call(HTMLElement.prototype, 'innerHTML')) {
  defineProperty$2(HTMLElement.prototype, 'innerHTML', getOwnPropertyDescriptor$3(Element.prototype, 'innerHTML'));
}
if (hasOwnProperty$3.call(HTMLElement.prototype, 'outerHTML')) {
  defineProperty$2(HTMLElement.prototype, 'outerHTML', getOwnPropertyDescriptor$3(Element.prototype, 'outerHTML'));
}
if (hasOwnProperty$3.call(HTMLElement.prototype, 'children')) {
  defineProperty$2(HTMLElement.prototype, 'children', getOwnPropertyDescriptor$3(Element.prototype, 'children'));
}
function querySelectorPatched() {
  const nodeList = arrayFromCollection(querySelectorAll.apply(this, ArraySlice$3.call(arguments)));
  if (isHostElement(this)) {
    const owner = getNodeOwner(this);
    if (isNull$2(owner)) {
      return null;
    } else if (getNodeKey(this)) {
      return getFirstSlottedMatch(this, nodeList);
    } else {
      return getFirstMatch(owner, nodeList);
    }
  } else if (isNodeShadowed(this)) {
    const ownerKey = getNodeOwnerKey(this);
    if (!isUndefined$3(ownerKey)) {
      const elm = ArrayFind$2.call(nodeList, elm => getNodeNearestOwnerKey(elm) === ownerKey);
      return isUndefined$3(elm) ? null : elm;
    } else {
      if (!runtimeFlags$1.ENABLE_NODE_LIST_PATCH) {
        return nodeList.length === 0 ? null : nodeList[0];
      }
      const contextNearestOwnerKey = getNodeNearestOwnerKey(this);
      const elm = ArrayFind$2.call(nodeList, elm => getNodeNearestOwnerKey(elm) === contextNearestOwnerKey);
      return isUndefined$3(elm) ? null : elm;
    }
  } else {
    if (!runtimeFlags$1.ENABLE_NODE_LIST_PATCH) {
      if (!(this instanceof HTMLBodyElement)) {
        const elm = nodeList[0];
        return isUndefined$3(elm) ? null : elm;
      }
    }
    const elm = ArrayFind$2.call(nodeList, elm => isUndefined$3(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(this));
    return isUndefined$3(elm) ? null : elm;
  }
}
function getFilteredArrayOfNodes(context, unfilteredNodes, shadowDomSemantic) {
  let filtered;
  if (isHostElement(context)) {
    const owner = getNodeOwner(context);
    if (isNull$2(owner)) {
      filtered = [];
    } else if (getNodeKey(context)) {
      filtered = getAllSlottedMatches(context, unfilteredNodes);
    } else {
      filtered = getAllMatches(owner, unfilteredNodes);
    }
  } else if (isNodeShadowed(context)) {
    const ownerKey = getNodeOwnerKey(context);
    if (!isUndefined$3(ownerKey)) {
      filtered = ArrayFilter$2.call(unfilteredNodes, elm => getNodeNearestOwnerKey(elm) === ownerKey);
    } else if (shadowDomSemantic === ShadowDomSemantic.Enabled) {
      const contextNearestOwnerKey = getNodeNearestOwnerKey(context);
      filtered = ArrayFilter$2.call(unfilteredNodes, elm => getNodeNearestOwnerKey(elm) === contextNearestOwnerKey);
    } else {
      filtered = ArraySlice$3.call(unfilteredNodes);
    }
  } else {
    if (context instanceof HTMLBodyElement || shadowDomSemantic === ShadowDomSemantic.Enabled) {
      filtered = ArrayFilter$2.call(unfilteredNodes, elm => isUndefined$3(getNodeOwnerKey(elm)) || isGlobalPatchingSkipped(context));
    } else {
      filtered = ArraySlice$3.call(unfilteredNodes);
    }
  }
  return filtered;
}
defineProperties$2(Element.prototype, {
  querySelector: {
    value: querySelectorPatched,
    writable: true,
    enumerable: true,
    configurable: true
  },
  querySelectorAll: {
    value() {
      const nodeList = arrayFromCollection(querySelectorAll.apply(this, ArraySlice$3.call(arguments)));
      if (!runtimeFlags$1.ENABLE_NODE_LIST_PATCH) {
        const filteredResults = getFilteredArrayOfNodes(this, nodeList, ShadowDomSemantic.Disabled);
        return createStaticNodeList(filteredResults);
      }
      return createStaticNodeList(getFilteredArrayOfNodes(this, nodeList, ShadowDomSemantic.Enabled));
    },
    writable: true,
    enumerable: true,
    configurable: true
  }
});
{
  defineProperties$2(Element.prototype, {
    getElementsByClassName: {
      value() {
        const elements = arrayFromCollection(getElementsByClassName.apply(this, ArraySlice$3.call(arguments)));
        if (!runtimeFlags$1.ENABLE_HTML_COLLECTIONS_PATCH) {
          return createStaticHTMLCollection(getNonPatchedFilteredArrayOfNodes(this, elements));
        }
        const filteredResults = getFilteredArrayOfNodes(this, elements, ShadowDomSemantic.Enabled);
        return createStaticHTMLCollection(filteredResults);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    getElementsByTagName: {
      value() {
        const elements = arrayFromCollection(getElementsByTagName.apply(this, ArraySlice$3.call(arguments)));
        if (!runtimeFlags$1.ENABLE_HTML_COLLECTIONS_PATCH) {
          return createStaticHTMLCollection(getNonPatchedFilteredArrayOfNodes(this, elements));
        }
        const filteredResults = getFilteredArrayOfNodes(this, elements, ShadowDomSemantic.Enabled);
        return createStaticHTMLCollection(filteredResults);
      },
      writable: true,
      enumerable: true,
      configurable: true
    },
    getElementsByTagNameNS: {
      value() {
        const elements = arrayFromCollection(getElementsByTagNameNS.apply(this, ArraySlice$3.call(arguments)));
        if (!runtimeFlags$1.ENABLE_HTML_COLLECTIONS_PATCH) {
          return createStaticHTMLCollection(getNonPatchedFilteredArrayOfNodes(this, elements));
        }
        const filteredResults = getFilteredArrayOfNodes(this, elements, ShadowDomSemantic.Enabled);
        return createStaticHTMLCollection(filteredResults);
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });
}
if (hasOwnProperty$3.call(HTMLElement.prototype, 'getElementsByClassName')) {
  defineProperty$2(HTMLElement.prototype, 'getElementsByClassName', getOwnPropertyDescriptor$3(Element.prototype, 'getElementsByClassName'));
}
const FocusableSelector = `
    [contenteditable],
    [tabindex],
    a[href],
    area[href],
    audio[controls],
    button,
    iframe,
    input,
    select,
    textarea,
    video[controls]
`;
const formElementTagNames = new Set(['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']);
function filterSequentiallyFocusableElements(elements) {
  return elements.filter(element => {
    if (hasAttribute.call(element, 'tabindex')) {
      return getAttribute.call(element, 'tabindex') === '0';
    }
    if (formElementTagNames.has(tagNameGetter.call(element))) {
      return !hasAttribute.call(element, 'disabled');
    }
    return true;
  });
}
const DidAddMouseDownListener = createHiddenField$2('DidAddMouseDownListener', 'synthetic-shadow');
function isVisible(element) {
  const {
    width,
    height
  } = getBoundingClientRect.call(element);
  const noZeroSize = width > 0 || height > 0;
  const isAreaElement = element.tagName === 'AREA';
  return (noZeroSize || isAreaElement) && getComputedStyle(element).visibility !== 'hidden';
}
function isTabbable(element) {
  if (isHostElement(element) && isDelegatingFocus(element)) {
    return false;
  }
  return matches.call(element, FocusableSelector) && isVisible(element);
}
function hostElementFocus() {
  const _rootNode = this.getRootNode();
  if (_rootNode === this) {
    const focusable = querySelector.call(this, FocusableSelector);
    if (!isNull$2(focusable)) {
      focusable.focus.apply(focusable, arguments);
    }
    return;
  }
  const rootNode = _rootNode;
  if (rootNode.activeElement === this) {
    return;
  }
  const focusables = arrayFromCollection(querySelectorAll.call(this, FocusableSelector));
  let didFocus = false;
  while (!didFocus && focusables.length !== 0) {
    const focusable = focusables.shift();
    focusable.focus.apply(focusable, arguments);
    const currentRootNode = focusable.getRootNode();
    didFocus = currentRootNode.activeElement === focusable;
  }
}
function getTabbableSegments(host) {
  const doc = getOwnerDocument(host);
  const all = filterSequentiallyFocusableElements(arrayFromCollection(querySelectorAll$1.call(doc, FocusableSelector)));
  const inner = filterSequentiallyFocusableElements(arrayFromCollection(querySelectorAll.call(host, FocusableSelector)));
  {
    assert$2.invariant(getAttribute.call(host, 'tabindex') === '-1' || isDelegatingFocus(host), `The focusin event is only relevant when the tabIndex property is -1 on the host.`);
  }
  const firstChild = inner[0];
  const lastChild = inner[inner.length - 1];
  const hostIndex = ArrayIndexOf$3.call(all, host);
  const firstChildIndex = hostIndex > -1 ? hostIndex : ArrayIndexOf$3.call(all, firstChild);
  const lastChildIndex = inner.length === 0 ? firstChildIndex + 1 : ArrayIndexOf$3.call(all, lastChild) + 1;
  const prev = ArraySlice$3.call(all, 0, firstChildIndex);
  const next = ArraySlice$3.call(all, lastChildIndex);
  return {
    prev,
    inner,
    next
  };
}
function getActiveElement(host) {
  const doc = getOwnerDocument(host);
  const activeElement = DocumentPrototypeActiveElement.call(doc);
  if (isNull$2(activeElement)) {
    return activeElement;
  }
  return (compareDocumentPosition.call(host, activeElement) & DOCUMENT_POSITION_CONTAINED_BY) !== 0 ? activeElement : null;
}
function relatedTargetPosition(host, relatedTarget) {
  const pos = compareDocumentPosition.call(host, relatedTarget);
  if (pos & DOCUMENT_POSITION_CONTAINED_BY) {
    return 0;
  } else if (pos & DOCUMENT_POSITION_PRECEDING) {
    return 1;
  } else if (pos & DOCUMENT_POSITION_FOLLOWING) {
    return 2;
  }
  return -1;
}
function muteEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}
function muteFocusEventsDuringExecution(win, func) {
  windowAddEventListener.call(win, 'focusin', muteEvent, true);
  windowAddEventListener.call(win, 'focusout', muteEvent, true);
  func();
  windowRemoveEventListener.call(win, 'focusin', muteEvent, true);
  windowRemoveEventListener.call(win, 'focusout', muteEvent, true);
}
function focusOnNextOrBlur(segment, target, relatedTarget) {
  const win = getOwnerWindow(relatedTarget);
  const next = getNextTabbable(segment, relatedTarget);
  if (isNull$2(next)) {
    muteFocusEventsDuringExecution(win, () => {
      target.blur();
    });
  } else {
    muteFocusEventsDuringExecution(win, () => {
      next.focus();
    });
  }
}
let letBrowserHandleFocus = false;
function disableKeyboardFocusNavigationRoutines() {
  letBrowserHandleFocus = true;
}
function enableKeyboardFocusNavigationRoutines() {
  letBrowserHandleFocus = false;
}
function skipHostHandler(event) {
  if (letBrowserHandleFocus) {
    enableKeyboardFocusNavigationRoutines();
    return;
  }
  const host = eventCurrentTargetGetter.call(event);
  const target = eventTargetGetter.call(event);
  if (host !== target) {
    return;
  }
  const relatedTarget = focusEventRelatedTargetGetter.call(event);
  if (isNull$2(relatedTarget)) {
    return;
  }
  const segments = getTabbableSegments(host);
  const position = relatedTargetPosition(host, relatedTarget);
  if (position === 1) {
    const findTabbableElms = isTabbableFrom.bind(null, host.getRootNode());
    const first = ArrayFind$2.call(segments.inner, findTabbableElms);
    if (!isUndefined$3(first)) {
      const win = getOwnerWindow(first);
      muteFocusEventsDuringExecution(win, () => {
        first.focus();
      });
    } else {
      focusOnNextOrBlur(segments.next, target, relatedTarget);
    }
  } else if (host === target) {
    focusOnNextOrBlur(ArrayReverse$2.call(segments.prev), target, relatedTarget);
  }
}
function skipShadowHandler(event) {
  if (letBrowserHandleFocus) {
    enableKeyboardFocusNavigationRoutines();
    return;
  }
  const relatedTarget = focusEventRelatedTargetGetter.call(event);
  if (isNull$2(relatedTarget)) {
    return;
  }
  const host = eventCurrentTargetGetter.call(event);
  const segments = getTabbableSegments(host);
  if (ArrayIndexOf$3.call(segments.inner, relatedTarget) !== -1) {
    return;
  }
  const target = eventTargetGetter.call(event);
  const position = relatedTargetPosition(host, relatedTarget);
  if (position === 1) {
    focusOnNextOrBlur(segments.next, target, relatedTarget);
  }
  if (position === 2) {
    focusOnNextOrBlur(ArrayReverse$2.call(segments.prev), target, relatedTarget);
  }
}
function isTabbableFrom(fromRoot, toElm) {
  if (!isTabbable(toElm)) {
    return false;
  }
  const ownerDocument = getOwnerDocument(toElm);
  let root = toElm.getRootNode();
  while (root !== ownerDocument && root !== fromRoot) {
    const sr = root;
    const host = sr.host;
    if (getAttribute.call(host, 'tabindex') === '-1') {
      return false;
    }
    root = host && host.getRootNode();
  }
  return true;
}
function getNextTabbable(tabbables, relatedTarget) {
  const len = tabbables.length;
  if (len > 0) {
    for (let i = 0; i < len; i += 1) {
      const next = tabbables[i];
      if (isTabbableFrom(relatedTarget.getRootNode(), next)) {
        return next;
      }
    }
  }
  return null;
}
function handleFocus(elm) {
  {
    assert$2.invariant(isDelegatingFocus(elm), `Invalid attempt to handle focus event for ${toString$2(elm)}. ${toString$2(elm)} should have delegates focus true, but is not delegating focus`);
  }
  bindDocumentMousedownMouseupHandlers(elm);
  ignoreFocusIn(elm);
  addEventListener.call(elm, 'focusin', skipHostHandler, true);
}
function ignoreFocus(elm) {
  removeEventListener.call(elm, 'focusin', skipHostHandler, true);
}
function bindDocumentMousedownMouseupHandlers(elm) {
  const ownerDocument = getOwnerDocument(elm);
  if (!getHiddenField$2(ownerDocument, DidAddMouseDownListener)) {
    setHiddenField$2(ownerDocument, DidAddMouseDownListener, true);
    addEventListener.call(ownerDocument, 'mousedown', disableKeyboardFocusNavigationRoutines, true);
    addEventListener.call(ownerDocument, 'mouseup', () => {
      setTimeout(enableKeyboardFocusNavigationRoutines);
    }, true);
  }
}
function handleFocusIn(elm) {
  {
    assert$2.invariant(tabIndexGetter.call(elm) === -1, `Invalid attempt to handle focus in  ${toString$2(elm)}. ${toString$2(elm)} should have tabIndex -1, but has tabIndex ${tabIndexGetter.call(elm)}`);
  }
  bindDocumentMousedownMouseupHandlers(elm);
  ignoreFocus(elm);
  addEventListener.call(elm, 'focusin', skipShadowHandler, true);
}
function ignoreFocusIn(elm) {
  removeEventListener.call(elm, 'focusin', skipShadowHandler, true);
}
const {
  blur,
  focus
} = HTMLElement.prototype;
function tabIndexGetterPatched() {
  if (isDelegatingFocus(this) && isFalse$1$2(hasAttribute.call(this, 'tabindex'))) {
    return 0;
  }
  return tabIndexGetter.call(this);
}
function tabIndexSetterPatched(value) {
  const delegatesFocus = isDelegatingFocus(this);
  const prevValue = tabIndexGetter.call(this);
  const prevHasAttr = hasAttribute.call(this, 'tabindex');
  tabIndexSetter.call(this, value);
  const currValue = tabIndexGetter.call(this);
  const currHasAttr = hasAttribute.call(this, 'tabindex');
  const didValueChange = prevValue !== currValue;
  if (prevHasAttr && (didValueChange || isFalse$1$2(currHasAttr))) {
    if (prevValue === -1) {
      ignoreFocusIn(this);
    }
    if (prevValue === 0 && delegatesFocus) {
      ignoreFocus(this);
    }
  }
  if (isFalse$1$2(currHasAttr)) {
    return;
  }
  if (prevHasAttr && currHasAttr && isFalse$1$2(didValueChange)) {
    return;
  }
  if (currValue === -1) {
    handleFocusIn(this);
  }
  if (currValue === 0 && delegatesFocus) {
    handleFocus(this);
  }
}
function blurPatched() {
  if (isDelegatingFocus(this)) {
    const currentActiveElement = getActiveElement(this);
    if (!isNull$2(currentActiveElement)) {
      currentActiveElement.blur();
      return;
    }
  }
  return blur.call(this);
}
function focusPatched() {
  disableKeyboardFocusNavigationRoutines();
  if (isHostElement(this) && isDelegatingFocus(this)) {
    hostElementFocus.call(this);
    return;
  }
  focus.apply(this, arguments);
  enableKeyboardFocusNavigationRoutines();
}
defineProperties$2(HTMLElement.prototype, {
  tabIndex: {
    get() {
      if (isHostElement(this)) {
        return tabIndexGetterPatched.call(this);
      }
      return tabIndexGetter.call(this);
    },
    set(v) {
      if (isHostElement(this)) {
        return tabIndexSetterPatched.call(this, v);
      }
      return tabIndexSetter.call(this, v);
    },
    enumerable: true,
    configurable: true
  },
  blur: {
    value() {
      if (isHostElement(this)) {
        return blurPatched.call(this);
      }
      blur.call(this);
    },
    enumerable: true,
    writable: true,
    configurable: true
  },
  focus: {
    value() {
      focusPatched.apply(this, arguments);
    },
    enumerable: true,
    writable: true,
    configurable: true
  }
});
const {
  addEventListener: superAddEventListener,
  removeEventListener: superRemoveEventListener
} = Node.prototype;
function addEventListenerPatched(type, listener, options) {
  if (isHostElement(this)) {
    addCustomElementEventListener(this, type, listener);
  } else {
    superAddEventListener.call(this, type, listener, options);
  }
}
function removeEventListenerPatched(type, listener, options) {
  if (isHostElement(this)) {
    removeCustomElementEventListener(this, type, listener);
  } else {
    superRemoveEventListener.call(this, type, listener, options);
  }
}
if (typeof EventTarget !== 'undefined') {
  defineProperties$2(EventTarget.prototype, {
    addEventListener: {
      value: addEventListenerPatched,
      enumerable: true,
      writable: true,
      configurable: true
    },
    removeEventListener: {
      value: removeEventListenerPatched,
      enumerable: true,
      writable: true,
      configurable: true
    }
  });
} else {
  defineProperties$2(Node.prototype, {
    addEventListener: {
      value: addEventListenerPatched,
      enumerable: true,
      writable: true,
      configurable: true
    },
    removeEventListener: {
      value: removeEventListenerPatched,
      enumerable: true,
      writable: true,
      configurable: true
    }
  });
}
const ShadowTokenKey = '$shadowToken$';
const ShadowTokenPrivateKey = '$$ShadowTokenKey$$';
function getShadowToken(node) {
  return node[ShadowTokenKey];
}
function setShadowToken(node, shadowToken) {
  node[ShadowTokenKey] = shadowToken;
}
defineProperty$2(Element.prototype, ShadowTokenKey, {
  set(shadowToken) {
    const oldShadowToken = this[ShadowTokenPrivateKey];
    if (!isUndefined$3(oldShadowToken) && oldShadowToken !== shadowToken) {
      removeAttribute.call(this, oldShadowToken);
    }
    if (!isUndefined$3(shadowToken)) {
      setAttribute.call(this, shadowToken, '');
    }
    this[ShadowTokenPrivateKey] = shadowToken;
  },
  get() {
    return this[ShadowTokenPrivateKey];
  },
  configurable: true
});
const DomManualPrivateKey = '$$DomManualKey$$';
const DocumentResolverFn = function () {};
let portalObserver;
const portalObserverConfig = {
  childList: true
};
function adoptChildNode(node, fn, shadowToken) {
  const previousNodeShadowResolver = getShadowRootResolver(node);
  if (previousNodeShadowResolver === fn) {
    return;
  }
  setShadowRootResolver(node, fn);
  if (node instanceof Element) {
    setShadowToken(node, shadowToken);
    if (isHostElement(node)) {
      return;
    }
    if (isUndefined$3(previousNodeShadowResolver)) {
      MutationObserverObserve.call(portalObserver, node, portalObserverConfig);
    }
    const childNodes = childNodesGetter.call(node);
    for (let i = 0, len = childNodes.length; i < len; i += 1) {
      adoptChildNode(childNodes[i], fn, shadowToken);
    }
  }
}
function initPortalObserver() {
  return new MO(mutations => {
    forEach$2.call(mutations, mutation => {
      const {
        target: elm,
        addedNodes,
        removedNodes
      } = mutation;
      const fn = getShadowRootResolver(elm);
      const shadowToken = getShadowToken(elm);
      for (let i = 0, len = removedNodes.length; i < len; i += 1) {
        const node = removedNodes[i];
        if (!(compareDocumentPosition.call(elm, node) & Node.DOCUMENT_POSITION_CONTAINED_BY)) {
          adoptChildNode(node, DocumentResolverFn, undefined);
        }
      }
      for (let i = 0, len = addedNodes.length; i < len; i += 1) {
        const node = addedNodes[i];
        if (compareDocumentPosition.call(elm, node) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
          adoptChildNode(node, fn, shadowToken);
        }
      }
    });
  });
}
function markElementAsPortal(elm) {
  if (isUndefined$3(portalObserver)) {
    portalObserver = initPortalObserver();
  }
  if (isUndefined$3(getShadowRootResolver(elm))) {
    throw new Error(`Invalid Element`);
  }
  MutationObserverObserve.call(portalObserver, elm, portalObserverConfig);
}
defineProperty$2(Element.prototype, '$domManual$', {
  set(v) {
    this[DomManualPrivateKey] = v;
    if (isTrue$1$2(v)) {
      markElementAsPortal(this);
    }
  },
  get() {
    return this[DomManualPrivateKey];
  },
  configurable: true
});
/** version: 1.7.7 */

function stylesheet(hostSelector, shadowSelector, nativeShadow) {
  return ["main", shadowSelector, " {margin: 30px;display: flex;flex-direction: column;align-items: center;}\nh1", shadowSelector, " {color: #1798c1;}\n"].join('');
}
var _implicitStylesheets = [stylesheet];

function stylesheet$1(hostSelector, shadowSelector, nativeShadow) {
  return ["_:-ms-lang(x)", shadowSelector, ", svg", shadowSelector, " {pointer-events: none;}\n"].join('');
}
var _implicitStylesheets$1 = [stylesheet$1];

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

var _tmpl = registerTemplate(tmpl);
tmpl.stylesheets = [];

if (_implicitStylesheets$1) {
  tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets$1);
}
tmpl.stylesheetTokens = {
  hostAttribute: "lightning-primitiveIcon_primitiveIcon-host",
  shadowAttribute: "lightning-primitiveIcon_primitiveIcon"
};

var dir = 'ltr';

const proto = {
  add(className) {
    if (typeof className === 'string') {
      this[className] = true;
    } else {
      Object.assign(this, className);
    }
    return this;
  },
  invert() {
    Object.keys(this).forEach(key => {
      this[key] = !this[key];
    });
    return this;
  },
  toString() {
    return Object.keys(this).filter(key => this[key]).join(' ');
  }
};
function classSet(config) {
  if (typeof config === 'string') {
    const key = config;
    config = {};
    config[key] = true;
  }
  return Object.assign(Object.create(proto), config);
}

/**
 * Takes label strings with placeholder params (`{0}`) and updates the label with given `args`
 * @param {string} str - any label string requiring injections of other strings/params (e.g., 'foo {0}')
 * @param  {string|array} arguments - string(s) to be injected into the `string` param
 * @returns {string} fully replaced string, e.g., '{0} is a {1}' -> 'Hal Jordan is a Green Lantern'
 */

function formatLabel(str) {
  const args = Array.prototype.slice.call(arguments, 1);
  let replacements = args;
  if (Array.isArray(args[0])) {
    [replacements] = args;
  }
  return str.replace(/{(\d+)}/g, (match, i) => {
    return replacements[i];
  });
}

function assert$3(condition, message) {
  {
    if (!condition) {
      throw new Error(message);
    }
  }
}

/**
 * Utility function to generate an unique guid.
 * used on state objects to provide a performance aid when iterating
 * through the items and marking them for render
 * @returns {String} an unique string ID
 */
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function classListMutation(classList, config) {
  Object.keys(config).forEach(key => {
    if (typeof key === 'string' && key.length) {
      if (config[key]) {
        classList.add(key);
      } else {
        classList.remove(key);
      }
    }
  });
}

/**
A string normalization utility for attributes.
@param {String} value - The value to normalize.
@param {Object} config - The optional configuration object.
@param {String} [config.fallbackValue] - The optional fallback value to use if the given value is not provided or invalid. Defaults to an empty string.
@param {Array} [config.validValues] - An optional array of valid values. Assumes all input is valid if not provided.
@return {String} - The normalized value.
**/
function normalizeString(value, config = {}) {
  const {
    fallbackValue = '',
    validValues,
    toLowerCase = true
  } = config;
  let normalized = typeof value === 'string' && value.trim() || '';
  normalized = toLowerCase ? normalized.toLowerCase() : normalized;
  if (validValues && validValues.indexOf(normalized) === -1) {
    normalized = fallbackValue;
  }
  return normalized;
}

/**
A boolean normalization utility for attributes.
@param {Any} value - The value to normalize.
@return {Boolean} - The normalized value.
**/
function normalizeBoolean(value) {
  return typeof value === 'string' || !!value;
}

/**
A aria attribute normalization utility.
@param {Any} value - A single aria value or an array of aria values
@return {String} - A space separated list of aria values
**/
function normalizeAriaAttribute(value) {
  let arias = Array.isArray(value) ? value : [value];
  arias = arias.map(ariaValue => {
    if (typeof ariaValue === 'string') {
      return ariaValue.replace(/\s+/g, ' ').trim();
    }
    return '';
  }).filter(ariaValue => !!ariaValue);
  return arias.length > 0 ? arias.join(' ') : null;
}

const keyCodes = {
  tab: 9,
  backspace: 8,
  enter: 13,
  escape: 27,
  space: 32,
  pageup: 33,
  pagedown: 34,
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  delete: 46,
  shift: 16
};
const buffer = {};

/**
 * Runs an action and passes the string of buffered keys typed within a short time period.
 * Use for type-ahead like functionality in menus, lists, comboboxes, and similar components.
 *
 * @param {CustomEvent} event A keyboard event
 * @param {Function} action function to run, it's passed the buffered text
 */
function runActionOnBufferedTypedCharacters(event, action) {
  const letter = event.key;
  if (letter.length > 1) {
    // Not an individual character/letter, but rather a special code (like Shift, Backspace, etc.)
    return;
  }

  // If we were going to clear what keys were typed, don't yet.
  if (buffer._clearBufferId) {
    clearTimeout(buffer._clearBufferId);
  }
  buffer._keyBuffer = buffer._keyBuffer || [];
  buffer._keyBuffer.push(letter);
  const matchText = buffer._keyBuffer.join('').toLowerCase();
  action(matchText);

  // eslint-disable-next-line @lwc/lwc/no-async-operation
  buffer._clearBufferId = setTimeout(() => {
    buffer._keyBuffer = [];
  }, 700);
}

const isIE11 = isIE11Test(navigator);
const isChrome = isChromeTest(navigator);
const isSafari = isSafariTest(navigator);

// The following functions are for tests only
function isIE11Test(navigator) {
  // https://stackoverflow.com/questions/17447373/how-can-i-target-only-internet-explorer-11-with-javascript
  return /Trident.*rv[ :]*11\./.test(navigator.userAgent);
}
function isChromeTest(navigator) {
  // https://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome
  return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
}
function isSafariTest(navigator) {
  // via https://stackoverflow.com/questions/49872111/detect-safari-and-stop-script
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

/**
 * Set an attribute on an element, if it's a normal element
 * it will use setAttribute, if it's an LWC component
 * it will use the public property
 *
 * @param {HTMLElement} element The element to act on
 * @param {String} attribute the attribute to set
 * @param {Any} value the value to set
 */
function smartSetAttribute(element, attribute, value) {
  if (element.tagName.match(/^LIGHTNING/i)) {
    attribute = attribute.replace(/-\w/g, m => m[1].toUpperCase());
    element[attribute] = value ? value : null;
  } else if (value) {
    element.setAttribute(attribute, value);
  } else {
    element.removeAttribute(attribute);
  }
}

// hide panel on scroll
const POSITION_CHANGE_THRESHOLD = 5;
function observePosition(target, threshold = POSITION_CHANGE_THRESHOLD, originalRect, callback) {
  // retrieve current bounding client rect of target element
  const newBoundingRect = target.getBoundingClientRect();
  const newLeft = newBoundingRect.left;
  const newTop = newBoundingRect.top;

  // old bounding rect values
  const oldLeft = originalRect.left;
  const oldTop = originalRect.top;

  // if we have a position change (horizontal or vertical) equal or greater to the threshold then execute the callback
  const horizontalShiftDelta = Math.abs(newLeft - oldLeft);
  const verticalShiftDelta = Math.abs(newTop - oldTop);
  if (horizontalShiftDelta >= threshold || verticalShiftDelta >= threshold) {
    callback();
  }
}

/**
 * @param {HTMLElement} element Element to act on
 * @param {Object} values values and attributes to set, if the value is
 *                        falsy it the attribute will be removed
 */
function synchronizeAttrs(element, values) {
  if (!element) {
    return;
  }
  const attributes = Object.keys(values);
  attributes.forEach(attribute => {
    smartSetAttribute(element, attribute, values[attribute]);
  });
}
const DEFAULT_ZINDEX_BASELINE = 9000;
/**
 * Returns the zIndex baseline from slds zIndex variable --lwc-zIndexModal.
 * @returns {Number} zIndex baseline
 */
function getZIndexBaseline() {
  const value = (window.getComputedStyle(document.documentElement) || document.documentElement.style).getPropertyValue('--lwc-zIndexModal');
  const base = parseInt(value, 10);
  return isNaN(base) ? DEFAULT_ZINDEX_BASELINE : base;
}
function timeout(interval) {
  return new Promise(resolve => {
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    setTimeout(resolve, interval);
  });
}
function animationFrame() {
  return new Promise(resolve => {
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    window.requestAnimationFrame(resolve);
  });
}

/*
 * Regex to test a string for an ISO8601 Date. The following formats are matched.
 * Note that if a time element is present (e.g. 'T'), the string should have a time zone designator (Z or +hh:mm or -hh:mm).
 *
 *  YYYY
 *  YYYY-MM
 *  YYYY-MM-DD
 *  YYYY-MM-DDThh:mmTZD
 *  YYYY-MM-DDThh:mm:ssTZD
 *  YYYY-MM-DDThh:mm:ss.STZD
 *
 *
 * @see: https://www.w3.org/TR/NOTE-datetime
 */
const ISO8601_STRICT_PATTERN = /^\d{4}(-\d\d(-\d\d(T\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z){1})?)?)?$/i;

/* Regex to test a string for an ISO8601 partial time or full time:
 * hh:mm
 * hh:mm:ss
 * hh:mm:ss.S
 * full time = partial time + TZD
 */
const ISO8601_TIME_PATTERN = /^\d\d:\d\d(:\d\d)?(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;
const STANDARD_TIME_FORMAT = 'HH:mm:ss.SSS';
const STANDARD_DATE_FORMAT = 'YYYY-MM-DD';
const TIME_SEPARATOR = 'T';
const TIMEZONE_INDICATOR = /(Z|([+-])(\d{2}):(\d{2}))$/;
function isValidISODateTimeString(dateTimeString) {
  return isValidISO8601String(dateTimeString) && isValidDate(dateTimeString);
}
function isValidISOTimeString(timeString) {
  if (!isValidISO8601TimeString(timeString)) {
    return false;
  }
  const timeOnly = removeTimeZoneSuffix(timeString);
  return isValidDate(`2018-09-09T${timeOnly}Z`);
}
function removeTimeZoneSuffix(dateTimeString) {
  if (typeof dateTimeString === 'string') {
    return dateTimeString.split(TIMEZONE_INDICATOR)[0];
  }
  return dateTimeString;
}
function isValidISO8601String(dateTimeString) {
  if (typeof dateTimeString !== 'string') {
    return false;
  }
  return ISO8601_STRICT_PATTERN.test(dateTimeString);
}
function isValidISO8601TimeString(timeString) {
  if (typeof timeString !== 'string') {
    return false;
  }
  return ISO8601_TIME_PATTERN.test(timeString);
}
function isValidDate(value) {
  // Date.parse returns NaN if the argument doesn't represent a valid date
  const timeStamp = Date.parse(value);
  return isFinite(timeStamp);
}

var _tmpl$1 = void 0;

var labelSecondsLater = 'in a few seconds';

var labelSecondsAgo = 'a few seconds ago';

// These labels will only be used as fallback in browsers that do not support Intl.RelativeTimeFormat
const fallbackFutureLabel = 'in {0} {1}'; // e.g. in 1 minute
const fallbackPastLabel = '{0} {1} ago'; // e.g. 1 minute ago
const fallbackPluralSuffix = 's'; // plural suffix for the units, e.g. in 10 minutes

// The threshold values come from moment.js
const units = {
  SECONDS: {
    name: 'second',
    threshold: 45
  },
  // a few seconds to minute
  MINUTES: {
    name: 'minute',
    threshold: 45
  },
  // minutes to hour
  HOURS: {
    name: 'hour',
    threshold: 22
  },
  // hours to day
  DAYS: {
    name: 'day',
    threshold: 26
  },
  // days to month
  MONTHS: {
    name: 'month',
    threshold: 11
  },
  // months to year
  YEARS: {
    name: 'year'
  }
};
const SECOND_TO_MILLISECONDS = 1000;
const MINUTE_TO_MILLISECONDS = 6e4; // 60 * SECOND_TO_MILLISECONDS;
const HOUR_TO_MILLISECONDS = 36e5; // 60 * MINUTE_TO_MILLISECONDS
const DAY_TO_MILLISECONDS = 864e5; // 24 * HOUR_TO_MILLISECONDS;

class Duration {
  constructor(milliseconds) {
    this.milliseconds = 0;
    if (typeof milliseconds !== 'number') {
      this.isValid = false;
      // eslint-disable-next-line no-console
      console.warn(`The value of milliseconds passed into Duration must be of type number,
                but we are getting the ${typeof milliseconds} value "${milliseconds}" instead.
                `);
      return;
    }
    this.isValid = true;
    this.milliseconds = milliseconds;
  }
  humanize(locale) {
    if (!this.isValid) {
      return '';
    }
    const unit = findBestUnitMatch(this);
    if (unit === units.SECONDS) {
      const isLater = this.milliseconds > 0;
      return isLater ? labelSecondsLater : labelSecondsAgo;
    }
    return format(locale, this.asIn(unit), unit.name);
  }
  asIn(unit) {
    switch (unit) {
      case units.SECONDS:
        return Math.round(this.milliseconds / SECOND_TO_MILLISECONDS);
      case units.MINUTES:
        return Math.round(this.milliseconds / MINUTE_TO_MILLISECONDS);
      case units.HOURS:
        return Math.round(this.milliseconds / HOUR_TO_MILLISECONDS);
      case units.DAYS:
        return Math.round(this.milliseconds / DAY_TO_MILLISECONDS);
      case units.MONTHS:
        return Math.round(daysToMonth(this.milliseconds / DAY_TO_MILLISECONDS));
      case units.YEARS:
      default:
        return Math.round(daysToMonth(this.milliseconds / DAY_TO_MILLISECONDS) / 12);
    }
  }
}
registerDecorators(Duration, {
  fields: ["milliseconds"]
});
var Duration$1 = registerComponent(Duration, {
  tmpl: _tmpl$1
});
function daysToMonth(days) {
  // 400 years have 146097 days (taking into account leap year rules)
  // 400 years have 12 months === 4800
  const daysToMonthRatio = 4800 / 146097;
  return days * daysToMonthRatio;
}
function findBestUnitMatch(duration) {
  // Traversing the object keys in order from Seconds to Years
  // http://exploringjs.com/es6/ch_oop-besides-classes.html#_traversal-order-of-properties
  const match = Object.keys(units).find(key => {
    const unit = units[key];
    // Year is the max and doesn't have a threshold
    return unit === units.YEARS || Math.abs(duration.asIn(unit)) < unit.threshold;
  });
  return units[match];
}
function format(locale, value, unit) {
  if ('Intl' in window && Intl.RelativeTimeFormat) {
    const formatter = new Intl.RelativeTimeFormat(locale, {
      style: 'long',
      numeric: 'always'
    });
    return formatter.format(value, unit);
  }
  return fallbackFormatter(value, unit);
}
function fallbackFormatter(value, unit) {
  // eslint-disable-next-line no-console
  console.warn(`The current environment does not support formatters for relative time.`);
  const absoluteValue = Math.abs(value);
  const unitString = absoluteValue !== 1 ? unit + fallbackPluralSuffix : unit;
  const label = value > 0 ? fallbackFutureLabel : fallbackPastLabel;
  return formatLabel(label, absoluteValue, unitString);
}

// default implementation of localization service for en-US locale. This covers the current usage of the localizationService in the code base.
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DATE_FORMAT = {
  short: 'M/d/yyyy',
  medium: 'MMM d, yyyy',
  long: 'MMMM d, yyyy'
};
const TIME_FORMAT = {
  short: 'h:mm a',
  medium: 'h:mm:ss a',
  long: 'h:mm:ss a'
};

// The parseTime method normalizes the time format so that minor deviations are accepted
const TIME_FORMAT_SIMPLE = {
  short: 'h:m a',
  medium: 'h:m:s a',
  long: 'h:m:s a'
};

// Only works with dates and iso strings
// formats the date object by ignoring the timezone offset
// e.g. assume date is Mar 11 2019 00:00:00 GMT+1100:
// formatDate(date, 'YYYY-MM-DD') -> 2019-03-11
function formatDate(value, format) {
  let isUTC = false;
  let dateString = value;
  if (typeof value === 'string') {
    dateString = value.split(TIME_SEPARATOR)[0];
    isUTC = true;
  }
  return formatDateInternal(dateString, format, isUTC);
}

// Only works with date objects.
// formats the date object according to UTC.
// e.g. assume date is Mar 11 2019 00:00:00 GMT+1100:
// formatDateUTC(date, 'YYYY-MM-DD') -> 2019-03-10
function formatDateUTC(value, format) {
  return formatDateInternal(value, format, true);
}

// Only works with a date object
function formatTime(date, format) {
  if (!isDate(date)) {
    return new Date('');
  }
  const hours = (date.getHours() + 11) % 12 + 1;
  const suffix = date.getHours() >= 12 ? 'PM' : 'AM';
  switch (format) {
    case STANDARD_TIME_FORMAT:
      // 16:12:32.000
      return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${doublePad(date.getMilliseconds())}`;
    case TIME_FORMAT.short:
      // 4:12 PM;
      return `${hours}:${pad(date.getMinutes())} ${suffix}`;
    case TIME_FORMAT.medium:
    case TIME_FORMAT.long:
    default:
      // 4:12:32 PM;
      return `${hours}:${pad(date.getMinutes())}:${pad(date.getSeconds())} ${suffix}`;
  }
}

// Only works with a date object
// formats the date object according to UTC.
// e.g. assume date is Mar 11 2019 00:00:00 GMT+1100:
// formatDateTimeUTC(date) -> 2019-03-10  1:00:00 PM
function formatDateTimeUTC(value) {
  if (!isDate(value)) {
    return new Date('');
  }
  const date = new Date(value.getTime());
  return `${formatDateUTC(date)}, ${formatTime(addTimezoneOffset(date))}`;
}

// parses ISO8601 date/time strings. Currently only used to parse ISO time strings without a TZD. Some examples:
// 20:00:00.000             -> Feb 26 2019 20:00:00 GMT-0500
// 2019-03-11               -> Mar 11 2019 00:00:00 GMT-0400
// 2019-03-11T00:00:00.000Z -> Mar 10 2019 20:00:00 GMT-0400
function parseDateTimeISO8601(value) {
  let isoString = null;
  let shouldAddOffset = true;
  if (isValidISOTimeString(value)) {
    isoString = `${getTodayInISO()}T${addTimezoneSuffix(value)}`;
  } else if (isValidISODateTimeString(value)) {
    if (value.indexOf(TIME_SEPARATOR) > 0) {
      isoString = addTimezoneSuffix(value);
      shouldAddOffset = false;
    } else {
      isoString = `${value}T00:00:00.000Z`;
    }
  }
  if (isoString) {
    // Browsers differ on how they treat iso strings without a timezone offset (local vs utc time)
    const parsedDate = new Date(isoString);
    if (shouldAddOffset) {
      addTimezoneOffset(parsedDate);
    }
    return parsedDate;
  }
  return null;
}

// called by the datepicker and calendar for parsing iso and formatted date strings
// called by the timepicker to parse the formatted time string
function parseDateTime(value, format) {
  if (format === STANDARD_DATE_FORMAT && isValidISODateTimeString(value)) {
    return parseDateTimeISO8601(value);
  }
  if (Object.values(DATE_FORMAT).includes(format)) {
    return parseFormattedDate(value, format);
  }
  if (Object.values(TIME_FORMAT_SIMPLE).includes(format)) {
    return parseFormattedTime(value);
  }
  return null;
}

// The input to this method is always an ISO string with timezone offset.
function parseDateTimeUTC(value) {
  return parseDateTimeISO8601(addTimezoneSuffix(value));
}
function isBefore(date1, date2, unit) {
  const normalizedDate1 = getDate(date1);
  const normalizedDate2 = getDate(date2);
  if (!normalizedDate1 || !normalizedDate2) {
    return false;
  }
  return startOf(normalizedDate1, unit).getTime() < startOf(normalizedDate2, unit).getTime();
}

// unit can be millisecond, minute, day
function isAfter(date1, date2, unit) {
  const normalizedDate1 = getDate(date1);
  const normalizedDate2 = getDate(date2);
  if (!normalizedDate1 || !normalizedDate2) {
    return false;
  }
  return startOf(normalizedDate1, unit).getTime() > startOf(normalizedDate2, unit).getTime();
}

// We're not doing timezone conversion in the default config. Only converting from UTC to system timezone
function UTCToWallTime(date, timezone, callback) {
  const utcDate = new Date(date.getTime());
  callback(subtractTimezoneOffset(utcDate));
}

// We're not doing timezone conversion in the default config. Only converting from system timezone to UTC
function WallTimeToUTC(date, timezone, callback) {
  const localDate = new Date(date.getTime());
  callback(addTimezoneOffset(localDate));
}

// We're assuming en-US locale so we don't need translation between calendar systems
function translateToOtherCalendar(date) {
  return date;
}

// We're assuming en-US locale so we don't need translation between calendar systems
function translateFromOtherCalendar(date) {
  return date;
}

// We're assuming en-US locale so we don't need translation of digits
function translateToLocalizedDigits(input) {
  return input;
}

// We're assuming en-US locale so we don't need translation of digits
function translateFromLocalizedDigits(input) {
  return input;
}

// This is called from the numberFormat library when the value exceeds the safe length.
// We currently rely on aura to format large numbers
function getNumberFormat() {
  return {
    format: value => {
      // eslint-disable-next-line no-console
      console.warn(`The current environment does not support large numbers and the original value of ${value} will be returned.`);
      return value;
    }
  };
}

// relativeDateTime (currently the only user of duration) uses unit="minutes"
// The default implementation here assumes the unit is always minutes.
function duration(minutes) {
  return new Duration$1(minutes * 60 * 1000);
}
function displayDuration(value) {
  return value.humanize('en');
}

// parses a time string formatted in en-US locale i.e. h:mm:ss a
function parseFormattedTime(value) {
  // for time strings it's easier to just split on :.\s
  const values = value.trim().split(/[:.\s*]/);
  // at least two parts i.e. 12 PM, and at most 5 parts i.e. 12:34:21.432 PM
  const length = values.length;
  if (!values || length < 2 || length > 5) {
    return null;
  }
  const ampm = values[length - 1];
  const isBeforeNoon = ampm.toLowerCase() === 'am';
  const isAfternoon = ampm.toLowerCase() === 'pm';
  // remove ampm
  values.splice(-1, 1);
  const allNumbers = values.every(item => !isNaN(item));
  if (!isAfternoon && !isBeforeNoon || !allNumbers) {
    return null;
  }
  const hours = values[0];
  const hour24 = pad(isAfternoon ? hours % 12 + 12 : hours % 12);
  const minutes = length >= 3 && values[1] || '0';
  const seconds = length >= 4 && values[2] || '0';
  const milliseconds = length === 5 && values[3] || '0';
  const newDate = new Date(getTodayInISO());
  newDate.setHours(hour24, minutes, seconds, milliseconds);
  return isDate(newDate) ? newDate : null;
}

// parses a date string formatted in en-US locale, i.e. MMM d, yyyy
function parseFormattedDate(value, format) {
  // default to medium style pattern
  let pattern = /^([a-zA-Z]{3})\s*(\d{1,2}),\s*(\d{4})$/;
  switch (format) {
    case DATE_FORMAT.short:
      pattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
      break;
    case DATE_FORMAT.long:
      pattern = /^([a-zA-Z]+)\s*(\d{1,2}),\s*(\d{4})$/;
      break;
  }

  // matches[1]: month, matches[2]: day, matches[3]: year
  const match = pattern.exec(value.trim());
  if (!match) {
    return null;
  }
  let month = match[1];
  const day = match[2];
  const year = match[3];

  // for long and medium style formats, we need to find the month index
  if (format !== DATE_FORMAT.short) {
    month = MONTH_NAMES.findIndex(item => item.toLowerCase().includes(month.toLowerCase()));
    // the actual month for the ISO string is 1 more than the index
    month += 1;
  }
  const isoValue = `${year}-${pad(month)}-${pad(day)}`;
  const newDate = new Date(`${isoValue}T00:00:00.000Z`);
  return isDate(newDate) ? addTimezoneOffset(newDate) : null;
}
function formatDateInternal(value, format, isUTC) {
  const date = getDate(value);
  if (!date) {
    // return Invalid Date
    return new Date('');
  }
  if (isUTC && isDate(value)) {
    // if value is an ISO string, we already add the timezone offset when parsing the date string.
    addTimezoneOffset(date);
  }
  switch (format) {
    case STANDARD_DATE_FORMAT:
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    case DATE_FORMAT.short:
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    case DATE_FORMAT.long:
      return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    case DATE_FORMAT.medium:
    default:
      {
        const shortMonthName = MONTH_NAMES[date.getMonth()].substring(0, 3);
        return `${shortMonthName} ${date.getDate()}, ${date.getFullYear()}`;
      }
  }
}

// unit can be 'day' or 'minute', otherwise will default to milliseconds. These are the only units that are currently used in the codebase.
function startOf(date, unit) {
  switch (unit) {
    case 'day':
      date.setHours(0);
      date.setMinutes(0);
    // falls through
    case 'minute':
      date.setSeconds(0);
      date.setMilliseconds(0);
      break;
  }
  return date;
}
function isDate(value) {
  return Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime());
}
function addTimezoneSuffix(value) {
  // first remove TZD if the string has one, and then add Z
  return removeTimeZoneSuffix(value) + 'Z';
}
function addTimezoneOffset(date) {
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  return date;
}
function subtractTimezoneOffset(date) {
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date;
}
function getDate(value) {
  if (!value) {
    return null;
  }
  if (isDate(value)) {
    return new Date(value.getTime());
  }
  if (isFinite(value) && (typeof value === 'number' || typeof value === 'string')) {
    return new Date(parseInt(value, 10));
  }
  if (typeof value === 'string') {
    return parseDateTimeISO8601(value);
  }
  return null;
}
function getTodayInISO() {
  return new Date().toISOString().split('T')[0];
}
function pad(n) {
  return Number(n) < 10 ? '0' + n : n;
}
function doublePad(n) {
  return Number(n) < 10 ? '00' + n : Number(n) < 100 ? '0' + n : n;
}
var localizationService = {
  formatDate,
  formatDateUTC,
  formatTime,
  formatDateTimeUTC,
  parseDateTimeISO8601,
  parseDateTime,
  parseDateTimeUTC,
  isBefore,
  isAfter,
  UTCToWallTime,
  WallTimeToUTC,
  translateToOtherCalendar,
  translateFromOtherCalendar,
  translateToLocalizedDigits,
  translateFromLocalizedDigits,
  getNumberFormat,
  duration,
  displayDuration
};

function getConfigFromAura($A) {
  return {
    getLocalizationService() {
      return $A.localizationService;
    },
    getPathPrefix() {
      return $A.getContext().getPathPrefix();
    },
    getToken(name) {
      return $A.getToken(name);
    }
  };
}
function createStandAloneConfig() {
  return {
    getLocalizationService() {
      return localizationService;
    },
    getPathPrefix() {
      return ''; // @sfdc.playground path-prefix DO-NOT-REMOVE-COMMENT
    },

    getToken(name) {
      return name; // @sfdc.playground token DO-NOT-REMOVE-COMMENT
    },

    getOneConfig() {
      return {
        densitySetting: ''
      };
    }
  };
}
function getDefaultConfig() {
  return window.$A !== undefined && window.$A.localizationService ? getConfigFromAura(window.$A) : createStandAloneConfig();
}

let PROVIDED_IMPL = getDefaultConfig();
function getPathPrefix() {
  return PROVIDED_IMPL && PROVIDED_IMPL.getPathPrefix && PROVIDED_IMPL.getPathPrefix() || '';
}
function getToken(name) {
  return PROVIDED_IMPL && PROVIDED_IMPL.getToken && PROVIDED_IMPL.getToken(name);
}
function getIconSvgTemplates() {
  return PROVIDED_IMPL && PROVIDED_IMPL.iconSvgTemplates;
}

// Taken from https://github.com/jonathantneal/svg4everybody/pull/139
// Remove this iframe-in-edge check once the following is resolved https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8323875/
const isEdgeUA = /\bEdge\/.(\d+)\b/.test(navigator.userAgent);
const inIframe = window.top !== window.self;
const isIframeInEdge = isEdgeUA && inIframe;
var isIframeInEdge$1 = registerComponent(isIframeInEdge, {
  tmpl: _tmpl$1
});

// Taken from https://git.soma.salesforce.com/aura/lightning-global/blob/999dc35f948246181510df6e56f45ad4955032c2/src/main/components/lightning/SVGLibrary/stamper.js#L38-L60
function fetchSvg(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(xhr);
        }
      }
    };
  });
}

// Taken from https://git.soma.salesforce.com/aura/lightning-global/blob/999dc35f948246181510df6e56f45ad4955032c2/src/main/components/lightning/SVGLibrary/stamper.js#L89-L98
// Which looks like it was inspired by https://github.com/jonathantneal/svg4everybody/blob/377d27208fcad3671ed466e9511556cb9c8b5bd8/lib/svg4everybody.js#L92-L107
// Modify at your own risk!
const newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/;
const webkitUA = /\bAppleWebKit\/(\d+)\b/;
const olderEdgeUA = /\bEdge\/12\.(\d+)\b/;
const isIE = newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537;
const supportsSvg = !isIE && !isIframeInEdge$1;
var supportsSvg$1 = registerComponent(supportsSvg, {
  tmpl: _tmpl$1
});

/**
This polyfill injects SVG sprites into the document for clients that don't
fully support SVG. We do this globally at the document level for performance
reasons. This causes us to lose namespacing of IDs across sprites. For example,
if both #image from utility sprite and #image from doctype sprite need to be
rendered on the page, both end up as #image from the doctype sprite (last one
wins). SLDS cannot change their image IDs due to backwards-compatibility
reasons so we take care of this issue at runtime by adding namespacing as we
polyfill SVG elements.

For example, given "/assets/icons/action-sprite/svg/symbols.svg#approval", we
replace the "#approval" id with "#${namespace}-approval" and a similar
operation is done on the corresponding symbol element.
**/
const svgTagName = /svg/i;
const isSvgElement = el => el && svgTagName.test(el.nodeName);
const requestCache = {};
const symbolEls = {};
const svgFragments = {};
const spritesContainerId = 'slds-svg-sprites';
let spritesEl;
function polyfill(el) {
  if (!supportsSvg$1 && isSvgElement(el)) {
    if (!spritesEl) {
      spritesEl = document.createElement('svg');
      spritesEl.xmlns = 'http://www.w3.org/2000/svg';
      spritesEl['xmlns:xlink'] = 'http://www.w3.org/1999/xlink';
      spritesEl.style.display = 'none';
      spritesEl.id = spritesContainerId;
      document.body.insertBefore(spritesEl, document.body.childNodes[0]);
    }
    Array.from(el.getElementsByTagName('use')).forEach(use => {
      // We access the href differently in raptor and in aura, probably
      // due to difference in the way the svg is constructed.
      const src = use.getAttribute('xlink:href') || use.getAttribute('href');
      console.log('inside-polyfil');
      console.log(src);
      if (src) {
        // "/assets/icons/action-sprite/svg/symbols.svg#approval" =>
        // ["/assets/icons/action-sprite/svg/symbols.svg", "approval"]
        const parts = src.split('#');
        const url = parts[0];
        const id = parts[1];
        const namespace = url.replace(/[^\w]/g, '-');
        const href = `#${namespace}-${id}`;
        console.log('inside-polyfil');
        console.log(href);
        if (url.length) {
          // set the HREF value to no longer be an external reference
          if (use.getAttribute('xlink:href')) {
            use.setAttribute('xlink:href', href);
          } else {
            use.setAttribute('href', href);
          }

          // only insert SVG content if it hasn't already been retrieved
          if (!requestCache[url]) {
            requestCache[url] = fetchSvg(url);
          }
          requestCache[url].then(svgContent => {
            // create a document fragment from the svgContent returned (is parsed by HTML parser)
            if (!svgFragments[url]) {
              const svgFragment = document.createRange().createContextualFragment(svgContent);
              svgFragments[url] = svgFragment;
            }
            if (!symbolEls[href]) {
              const svgFragment = svgFragments[url];
              const symbolEl = svgFragment.querySelector(`#${id}`);
              symbolEls[href] = true;
              symbolEl.id = `${namespace}-${id}`;
              spritesEl.appendChild(symbolEl);
            }
          });
        }
      }
    });
  }
}

const validNameRe = /^([a-zA-Z]+):([a-zA-Z]\w*)$/;
const underscoreRe = /_/g;
let pathPrefix;
const tokenNameMap = Object.assign(Object.create(null), {
  action: 'lightning.actionSprite',
  custom: 'lightning.customSprite',
  doctype: 'lightning.doctypeSprite',
  standard: 'lightning.standardSprite',
  utility: 'lightning.utilitySprite'
});
const tokenNameMapRtl = Object.assign(Object.create(null), {
  action: 'lightning.actionSpriteRtl',
  custom: 'lightning.customSpriteRtl',
  doctype: 'lightning.doctypeSpriteRtl',
  standard: 'lightning.standardSpriteRtl',
  utility: 'lightning.utilitySpriteRtl'
});
const defaultTokenValueMap = Object.assign(Object.create(null), {
  'lightning.actionSprite': './assets/icons/action-sprite/svg/symbols.svg',
  'lightning.actionSpriteRtl': './assets/icons/action-sprite/svg/symbols.svg',
  'lightning.customSprite': './assets/icons/custom-sprite/svg/symbols.svg',
  'lightning.customSpriteRtl': './assets/icons/custom-sprite/svg/symbols.svg',
  'lightning.doctypeSprite': './assets/icons/doctype-sprite/svg/symbols.svg',
  'lightning.doctypeSpriteRtl': '/assets/icons/doctype-sprite/svg/symbols.svg',
  'lightning.standardSprite': './assets/icons/standard-sprite/svg/symbols.svg',
  'lightning.standardSpriteRtl': '/assets/icons/standard-sprite/svg/symbols.svg',
  'lightning.utilitySprite': './assets/icons/utility-sprite/svg/symbols.svg',
  'lightning.utilitySpriteRtl': './assets/icons/utility-sprite/svg/symbols.svg'
});
const getDefaultBaseIconPath = (category, nameMap) => defaultTokenValueMap[nameMap[category]];
const getBaseIconPath = (category, direction) => {
  const nameMap = direction === 'rtl' ? tokenNameMapRtl : tokenNameMap;
  console.log('getBaseIconPath');
  console.log(getToken(nameMap[category]));
  console.log(getDefaultBaseIconPath(category, nameMap));
  return getToken(nameMap[category]) || getDefaultBaseIconPath(category, nameMap);
};
const getMatchAtIndex = index => iconName => {
  const result = validNameRe.exec(iconName);
  return result ? result[index] : '';
};
const getCategory = getMatchAtIndex(1);
const getName = getMatchAtIndex(2);
const isValidName = iconName => validNameRe.test(iconName);
const getIconPath = (iconName, direction = 'ltr') => {
  pathPrefix = pathPrefix !== undefined ? pathPrefix : getPathPrefix();
  console.log('pathPrefix');
  console.log(pathPrefix);
  if (isValidName(iconName)) {
    const baseIconPath = getBaseIconPath(getCategory(iconName), direction);
    if (baseIconPath) {
      // This check was introduced the following MS-Edge issue:
      // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/9655192/
      // If and when this get fixed, we can safely remove this block of code.
      if (isIframeInEdge$1) {
        // protocol => 'https:' or 'http:'
        // host => hostname + port
        const origin = `${window.location.protocol}//${window.location.host}`;
        return `${origin}${pathPrefix}${baseIconPath}#${getName(iconName)}`;
      }
      console.log('inside- baseicon path');
      console.log(`${pathPrefix}${baseIconPath}#${getName(iconName)}`);
      return `${pathPrefix}${baseIconPath}#${getName(iconName)}`;
    }
  }
  return '';
};
const computeSldsClass = iconName => {
  if (isValidName(iconName)) {
    const category = getCategory(iconName);
    const name = getName(iconName).replace(underscoreRe, '-');
    return `slds-icon-${category}-${name}`;
  }
  return '';
};

class LightningPrimitiveIcon extends BaseLightningElement {
  constructor(...args) {
    super(...args);
    this.iconName = void 0;
    this.src = void 0;
    this.svgClass = void 0;
    this.size = 'medium';
    this.variant = void 0;
    this.privateIconSvgTemplates = getIconSvgTemplates();
  }
  get inlineSvgProvided() {
    return !!this.privateIconSvgTemplates;
  }
  renderedCallback() {
    if (this.iconName !== this.prevIconName && !this.inlineSvgProvided) {
      this.prevIconName = this.iconName;
      const svgElement = this.template.querySelector('svg');
      polyfill(svgElement);
    }
  }
  get href() {
    console.log('ppicon', getIconPath(this.iconName, dir));
    let iconPathLightning = getIconPath(this.iconName, dir);
    //  lightning.actionSprite#approval
    //  /assets/icons/action-sprite/svg/symbols.svg#approval

    const defaultTokenValueMap = Object.assign(Object.create(null), {
      'lightning.actionSprite': '/assets/icons/action-sprite/svg/symbols.svg',
      'lightning.actionSpriteRtl': '/assets/icons/action-sprite/svg/symbols.svg',
      'lightning.customSprite': '/assets/icons/custom-sprite/svg/symbols.svg',
      'lightning.customSpriteRtl': '/assets/icons/custom-sprite/svg/symbols.svg',
      'lightning.doctypeSprite': '/assets/icons/doctype-sprite/svg/symbols.svg',
      'lightning.doctypeSpriteRtl': '/assets/icons/doctype-sprite/svg/symbols.svg',
      'lightning.standardSprite': '/assets/icons/standard-sprite/svg/symbols.svg',
      'lightning.standardSpriteRtl': '/assets/icons/standard-sprite/svg/symbols.svg',
      'lightning.utilitySprite': '/assets/icons/utility-sprite/svg/symbols.svg',
      'lightning.utilitySpriteRtl': '/assets/icons/utility-sprite/svg/symbols.svg'
    });
    const parts = iconPathLightning.split('#');
    const url = defaultTokenValueMap[parts[0]] + '#' + parts[1];

    //return this.src || iconUtils.getIconPath(this.iconName, dir);
    return url;
  }
  get name() {
    return getName(this.iconName);
  }
  get normalizedSize() {
    return normalizeString(this.size, {
      fallbackValue: 'medium',
      validValues: ['xx-small', 'x-small', 'small', 'medium', 'large']
    });
  }
  get normalizedVariant() {
    // NOTE: Leaving a note here because I just wasted a bunch of time
    // investigating why both 'bare' and 'inverse' are supported in
    // lightning-primitive-icon. lightning-icon also has a deprecated
    // 'bare', but that one is synonymous to 'inverse'. This 'bare' means
    // that no classes should be applied. So this component needs to
    // support both 'bare' and 'inverse' while lightning-icon only needs to
    // support 'inverse'.
    return normalizeString(this.variant, {
      fallbackValue: '',
      validValues: ['bare', 'error', 'inverse', 'warning', 'success']
    });
  }
  get computedClass() {
    const {
      normalizedSize,
      normalizedVariant
    } = this;
    const classes = classSet(this.svgClass);
    if (normalizedVariant !== 'bare') {
      classes.add('slds-icon');
    }
    switch (normalizedVariant) {
      case 'error':
        classes.add('slds-icon-text-error');
        break;
      case 'warning':
        classes.add('slds-icon-text-warning');
        break;
      case 'success':
        classes.add('slds-icon-text-success');
        break;
      case 'inverse':
      case 'bare':
        break;
      default:
        // if custom icon is set, we don't want to set
        // the text-default class
        if (!this.src) {
          classes.add('slds-icon-text-default');
        }
    }
    if (normalizedSize !== 'medium') {
      classes.add(`slds-icon_${normalizedSize}`);
    }
    return classes.toString();
  }
  resolveTemplate() {
    const name = this.iconName;
    if (isValidName(name)) {
      const [spriteName, iconName] = name.split(':');
      const template = this.privateIconSvgTemplates[`${spriteName}_${iconName}`];
      if (template) {
        return template;
      }
    }
    return _tmpl;
  }
  render() {
    if (this.inlineSvgProvided) {
      return this.resolveTemplate();
    }
    return _tmpl;
  }
}
registerDecorators(LightningPrimitiveIcon, {
  publicProps: {
    iconName: {
      config: 0
    },
    src: {
      config: 0
    },
    svgClass: {
      config: 0
    },
    size: {
      config: 0
    },
    variant: {
      config: 0
    }
  },
  fields: ["privateIconSvgTemplates"]
});
var _lightningPrimitiveIcon = registerComponent(LightningPrimitiveIcon, {
  tmpl: _tmpl
});

function tmpl$1($api, $cmp, $slotset, $ctx) {
  const {
    c: api_custom_element,
    d: api_dynamic,
    h: api_element
  } = $api;
  return [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": $cmp.state.iconName,
      "size": $cmp.size,
      "variant": $cmp.variant,
      "src": $cmp.state.src
    },
    key: 0
  }, []), $cmp.alternativeText ? api_element("span", {
    classMap: {
      "slds-assistive-text": true
    },
    key: 1
  }, [api_dynamic($cmp.alternativeText)]) : null];
}

var _tmpl$2 = registerTemplate(tmpl$1);
tmpl$1.stylesheets = [];
tmpl$1.stylesheetTokens = {
  hostAttribute: "lightning-icon_icon-host",
  shadowAttribute: "lightning-icon_icon"
};

/**
 * Represents a visual element that provides context and enhances usability.
 */
class LightningIcon extends BaseLightningElement {
  constructor(...args) {
    super(...args);
    this.state = {};
    this.alternativeText = void 0;
  }
  /**
   * The alternative text used to describe the icon.
   * This text should describe what happens when you click the button,
   * for example 'Upload File', not what the icon looks like, 'Paperclip'.
   * @type {string}
   */
  /**
   * A uri path to a custom svg sprite, including the name of the resouce,
   * for example: /assets/icons/standard-sprite/svg/test.svg#icon-heart
   * @type {string}
   */
  get src() {
    return this.privateSrc;
  }
  set src(value) {
    this.privateSrc = value;

    // if value is not present, then we set the state back
    // to the original iconName that was passed
    // this might happen if the user sets a custom icon, then
    // decides to revert back to SLDS by removing the src attribute
    if (!value) {
      this.state.iconName = this.iconName;
      this.classList.remove('slds-icon-standard-default');
    }

    // if isIE11 and the src is set
    // we'd like to show the 'standard:default' icon instead
    // for performance reasons.
    if (value && isIE11) {
      this.setDefault();
      return;
    }
    this.state.src = value;
  }

  /**
   * The Lightning Design System name of the icon.
   * Names are written in the format 'utility:down' where 'utility' is the category,
   * and 'down' is the specific icon to be displayed.
   * @type {string}
   * @required
   */
  get iconName() {
    return this.privateIconName;
  }
  set iconName(value) {
    this.privateIconName = value;

    // if src is set, we don't need to validate
    // iconName
    if (this.src) {
      return;
    }
    if (isValidName(value)) {
      const isAction = getCategory(value) === 'action';

      // update classlist only if new iconName is different than state.iconName
      // otherwise classListMutation receives class:true and class: false and removes slds class
      if (value !== this.state.iconName) {
        classListMutation(this.classList, {
          'slds-icon_container_circle': isAction,
          [computeSldsClass(value)]: true,
          [computeSldsClass(this.state.iconName)]: false
        });
      }
      this.state.iconName = value;
    } else {
      console.warn(`<lightning-icon> Invalid icon name ${value}`); // eslint-disable-line no-console

      // Invalid icon names should render a blank icon. Remove any
      // classes that might have been previously added.
      classListMutation(this.classList, {
        'slds-icon_container_circle': false,
        [computeSldsClass(this.state.iconName)]: false
      });
      this.state.iconName = undefined;
    }
  }

  /**
   * The size of the icon. Options include xx-small, x-small, small, medium, or large.
   * The default is medium.
   * @type {string}
   * @default medium
   */
  get size() {
    return normalizeString(this.state.size, {
      fallbackValue: 'medium',
      validValues: ['xx-small', 'x-small', 'small', 'medium', 'large']
    });
  }
  set size(value) {
    this.state.size = value;
  }

  /**
   * The variant changes the appearance of a utility icon.
   * Accepted variants include inverse, success, warning, and error.
   * Use the inverse variant to implement a white fill in utility icons on dark backgrounds.
   * @type {string}
   */
  get variant() {
    return normalizeVariant(this.state.variant, this.state.iconName);
  }
  set variant(value) {
    this.state.variant = value;
  }
  connectedCallback() {
    this.classList.add('slds-icon_container');
  }
  setDefault() {
    this.state.src = undefined;
    this.state.iconName = 'standard:default';
    this.classList.add('slds-icon-standard-default');
  }
}
registerDecorators(LightningIcon, {
  publicProps: {
    alternativeText: {
      config: 0
    },
    src: {
      config: 3
    },
    iconName: {
      config: 3
    },
    size: {
      config: 3
    },
    variant: {
      config: 3
    }
  },
  track: {
    state: 1
  }
});
var _lightningIcon = registerComponent(LightningIcon, {
  tmpl: _tmpl$2
});
function normalizeVariant(variant, iconName) {
  // Unfortunately, the `bare` variant was implemented to do what the
  // `inverse` variant should have done. Keep this logic for as long as
  // we support the `bare` variant.
  if (variant === 'bare') {
    // TODO: Deprecation warning using strippable assertion
    variant = 'inverse';
  }
  if (getCategory(iconName) === 'utility') {
    return normalizeString(variant, {
      fallbackValue: '',
      validValues: ['error', 'inverse', 'warning', 'success']
    });
  }
  return 'inverse';
}

function tmpl$2($api, $cmp, $slotset, $ctx) {
  const {
    c: api_custom_element,
    d: api_dynamic,
    b: api_bind,
    h: api_element
  } = $api;
  const {
    _m0,
    _m1
  } = $ctx;
  return [api_element("button", {
    className: $cmp.computedButtonClass,
    attrs: {
      "name": $cmp.name,
      "accesskey": $cmp.computedAccessKey,
      "title": $cmp.computedTitle,
      "type": $cmp.normalizedType,
      "value": $cmp.value,
      "aria-label": $cmp.computedAriaLabel,
      "aria-expanded": $cmp.computedAriaExpanded,
      "aria-live": $cmp.computedAriaLive,
      "aria-atomic": $cmp.computedAriaAtomic
    },
    props: {
      "disabled": $cmp.disabled
    },
    key: 2,
    on: {
      "focus": _m0 || ($ctx._m0 = api_bind($cmp.handleButtonFocus)),
      "blur": _m1 || ($ctx._m1 = api_bind($cmp.handleButtonBlur))
    }
  }, [$cmp.showIconLeft ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": $cmp.iconName,
      "svgClass": $cmp.computedIconClass,
      "variant": "bare"
    },
    key: 0
  }, []) : null, api_dynamic($cmp.label), $cmp.showIconRight ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": $cmp.iconName,
      "svgClass": $cmp.computedIconClass,
      "variant": "bare"
    },
    key: 1
  }, []) : null])];
}

var _tmpl$3 = registerTemplate(tmpl$2);
tmpl$2.stylesheets = [];
tmpl$2.stylesheetTokens = {
  hostAttribute: "lightning-button_button-host",
  shadowAttribute: "lightning-button_button"
};

function tmpl$3($api, $cmp, $slotset, $ctx) {
  return [];
}

var _tmpl$4 = registerTemplate(tmpl$3);
tmpl$3.stylesheets = [];
tmpl$3.stylesheetTokens = {
  hostAttribute: "lightning-primitiveButton_primitiveButton-host",
  shadowAttribute: "lightning-primitiveButton_primitiveButton"
};

const ARIA_DESCRIBEDBY = 'aria-describedby';
const ARIA_CONTROLS = 'aria-controls';

/**
 * Primitive for button, buttonIcon and buttonIconStateful
 */
class LightningPrimitiveButton extends BaseLightningElement {
  /**
   * Specifies whether this button should be displayed in a disabled state.
   * Disabled buttons can't be clicked. This value defaults to false.
   *
   * @type {boolean}
   * @default false
   */
  get disabled() {
    return this.state.disabled;
  }
  set disabled(value) {
    this.state.disabled = normalizeBoolean(value);
  }
  set accessKey(value) {
    this.state.accesskey = value;
  }

  /**
   * Specifies a shortcut key to activate or focus an element.
   *
   * @type {string}
   */
  get accessKey() {
    return this.state.accesskey;
  }
  get computedAccessKey() {
    return this.state.accesskey;
  }

  /**
   * Displays tooltip text when the mouse cursor moves over the element.
   *
   * @type {string}
   */
  get title() {
    return this.state.title;
  }
  set title(value) {
    this.state.title = value;
  }

  /**
   * Label describing the button to assistive technologies.
   *
   * @type {string}
   */
  get ariaLabel() {
    return this.state.ariaLabel;
  }
  set ariaLabel(value) {
    this.state.ariaLabel = value;
  }
  get computedAriaLabel() {
    return this.state.ariaLabel;
  }

  /**
   * A space-separated list of element IDs that provide descriptive labels for the button.
   *
   * @type {string}
   */
  get ariaDescribedBy() {
    return this.state.ariaDescribedBy;
  }
  set ariaDescribedBy(value) {
    this.state.ariaDescribedBy = value;
    const button = this.template.querySelector('button');
    synchronizeAttrs(button, {
      [ARIA_DESCRIBEDBY]: value
    });
  }

  /**
   * A space-separated list of element IDs whose presence or content is controlled by this button.
   *
   * @type {string}
   */
  get ariaControls() {
    return this.state.ariaControls;
  }
  set ariaControls(value) {
    this.state.ariaControls = value;
    const button = this.template.querySelector('button');
    synchronizeAttrs(button, {
      [ARIA_CONTROLS]: value
    });
  }

  /**
   * Indicates whether an element that the button controls is expanded or collapsed.
   * Valid values are 'true' or 'false'. The default value is undefined.
   *
   * @type {string}
   * @default undefined
   */
  get ariaExpanded() {
    return this.state.ariaExpanded;
  }
  set ariaExpanded(value) {
    this.state.ariaExpanded = normalizeString(value, {
      fallbackValue: undefined,
      validValues: ['true', 'false']
    });
  }
  get computedAriaExpanded() {
    return this.state.ariaExpanded || null;
  }
  set ariaLive(value) {
    this.state.ariaLive = value;
  }
  /**
   * Indicates that the button can be updated when it doesn't have focus.
   * Valid values are 'polite', 'assertive', or 'off'. The polite value causes assistive
   * technologies to notify users of updates at a low priority, generally without interrupting.
   * The assertive value causes assistive technologies to notify users immediately,
   * potentially clearing queued speech updates.
   *
   * @type {string}
   */
  get ariaLive() {
    return this.state.ariaLive;
  }
  get computedAriaLive() {
    return this.state.ariaLive;
  }

  /**
   * Indicates whether assistive technologies present all, or only parts of,
   * the changed region. Valid values are 'true' or 'false'.
   *
   * @type {string}
   */
  get ariaAtomic() {
    return this.state.ariaAtomic || null;
  }
  set ariaAtomic(value) {
    this.state.ariaAtomic = normalizeString(value, {
      fallbackValue: undefined,
      validValues: ['true', 'false']
    });
  }
  get computedAriaAtomic() {
    return this.state.ariaAtomic || null;
  }

  /**
   * Sets focus on the element.
   */
  focus() {}
  constructor() {
    super();

    // Workaround for an IE11 bug where click handlers on button ancestors
    // receive the click event even if the button element has the `disabled`
    // attribute set.
    this._initialized = false;
    this.state = {
      accesskey: null,
      ariaAtomic: null,
      ariaControls: null,
      ariaDescribedBy: null,
      ariaExpanded: null,
      ariaLabel: null,
      ariaLive: null,
      disabled: false
    };
    if (isIE11) {
      this.template.addEventListener('click', event => {
        if (this.disabled) {
          event.stopImmediatePropagation();
        }
      });
    }
  }
  renderedCallback() {
    if (!this._initialized) {
      const button = this.template.querySelector('button');
      synchronizeAttrs(button, {
        [ARIA_CONTROLS]: this.state.ariaControls,
        [ARIA_DESCRIBEDBY]: this.state.ariaDescribedBy
      });
      this._initialized = true;
    }
  }
}
registerDecorators(LightningPrimitiveButton, {
  publicProps: {
    disabled: {
      config: 3
    },
    accessKey: {
      config: 3
    },
    title: {
      config: 3
    },
    ariaLabel: {
      config: 3
    },
    ariaDescribedBy: {
      config: 3
    },
    ariaControls: {
      config: 3
    },
    ariaExpanded: {
      config: 3
    },
    ariaLive: {
      config: 3
    },
    ariaAtomic: {
      config: 3
    }
  },
  publicMethods: ["focus"],
  track: {
    state: 1
  },
  fields: ["_initialized"]
});
var LightningPrimitiveButton$1 = registerComponent(LightningPrimitiveButton, {
  tmpl: _tmpl$4
});

/**
 * A clickable element used to perform an action.
 */
class LightningButton extends LightningPrimitiveButton$1 {
  constructor(...args) {
    super(...args);
    this.name = void 0;
    this.value = void 0;
    this.label = void 0;
    this.variant = 'neutral';
    this.iconName = void 0;
    this.iconPosition = 'left';
    this.type = 'button';
    this.title = null;
    this._order = null;
  }
  /**
   * The name for the button element.
   * This value is optional and can be used to identify the button in a callback.
   *
   * @type {string}
   */
  /**
   * The value for the button element.
   * This value is optional and can be used when submitting a form.
   *
   * @type {string}
   */
  /**
   * The text to be displayed inside the button.
   *
   * @type {string}
   */
  /**
   * The variant changes the appearance of the button.
   * Accepted variants include base, neutral, brand, brand-outline, destructive, destructive-text, inverse, and success.
   * This value defaults to neutral.
   *
   * @type {string}
   * @default neutral
   */
  /**
   * The Lightning Design System name of the icon.
   * Names are written in the format 'utility:down' where 'utility' is the category,
   * and 'down' is the specific icon to be displayed.
   *
   * @type {string}
   */
  /**
   * Describes the position of the icon with respect to the button label.
   * Options include left and right.
   * This value defaults to left.
   *
   * @type {string}
   * @default left
   */
  /**
   * Specifies the type of button.
   * Valid values are button, reset, and submit.
   * This value defaults to button.
   *
   * @type {string}
   * @default button
   */
  render() {
    return _tmpl$3;
  }
  get computedButtonClass() {
    return classSet('slds-button').add({
      'slds-button_neutral': this.normalizedVariant === 'neutral',
      'slds-button_brand': this.normalizedVariant === 'brand',
      'slds-button_outline-brand': this.normalizedVariant === 'brand-outline',
      'slds-button_destructive': this.normalizedVariant === 'destructive',
      'slds-button_text-destructive': this.normalizedVariant === 'destructive-text',
      'slds-button_inverse': this.normalizedVariant === 'inverse',
      'slds-button_success': this.normalizedVariant === 'success',
      'slds-button_first': this._order === 'first',
      'slds-button_middle': this._order === 'middle',
      'slds-button_last': this._order === 'last'
    }).toString();
  }
  get computedTitle() {
    return this.title;
  }
  get normalizedVariant() {
    return normalizeString(this.variant, {
      fallbackValue: 'neutral',
      validValues: ['base', 'neutral', 'brand', 'brand-outline', 'destructive', 'destructive-text', 'inverse', 'success']
    });
  }
  get normalizedType() {
    return normalizeString(this.type, {
      fallbackValue: 'button',
      validValues: ['button', 'reset', 'submit']
    });
  }
  get normalizedIconPosition() {
    return normalizeString(this.iconPosition, {
      fallbackValue: 'left',
      validValues: ['left', 'right']
    });
  }
  get showIconLeft() {
    return this.iconName && this.normalizedIconPosition === 'left';
  }
  get showIconRight() {
    return this.iconName && this.normalizedIconPosition === 'right';
  }
  get computedIconClass() {
    return classSet('slds-button__icon').add({
      'slds-button__icon_left': this.normalizedIconPosition === 'left',
      'slds-button__icon_right': this.normalizedIconPosition === 'right'
    }).toString();
  }
  handleButtonFocus() {
    this.dispatchEvent(new CustomEvent('focus'));
  }
  handleButtonBlur() {
    this.dispatchEvent(new CustomEvent('blur'));
  }

  /**
   * Sets focus on the button.
   */
  focus() {
    if (this._connected) {
      this.template.querySelector('button').focus();
    }
  }

  /**
   * Clicks the button.
   */
  click() {
    if (this._connected) {
      this.template.querySelector('button').click();
    }
  }

  /**
   * {Function} setOrder - Sets the order value of the button when in the context of a button-group or other ordered component
   * @param {String} order -  The order string (first, middle, last)
   */
  setOrder(order) {
    this._order = order;
  }

  /**
   * Once we are connected, we fire a register event so the button-group (or other) component can register
   * the buttons.
   */
  connectedCallback() {
    this._connected = true;
    const privatebuttonregister = new CustomEvent('privatebuttonregister', {
      bubbles: true,
      detail: {
        callbacks: {
          setOrder: this.setOrder.bind(this),
          setDeRegistrationCallback: deRegistrationCallback => {
            this._deRegistrationCallback = deRegistrationCallback;
          }
        }
      }
    });
    this.dispatchEvent(privatebuttonregister);
  }
  renderedCallback() {
    // initialize aria attributes in primitiveButton
    super.renderedCallback();
    // button is inherit from primitiveButton, button.css not working in this case.
    // change host style to disable pointer event.
    this.template.host.style.pointerEvents = this.disabled ? 'none' : '';
  }
  disconnectedCallback() {
    this._connected = false;
    if (this._deRegistrationCallback) {
      this._deRegistrationCallback();
    }
  }
}
LightningButton.delegatesFocus = true;
registerDecorators(LightningButton, {
  publicProps: {
    name: {
      config: 0
    },
    value: {
      config: 0
    },
    label: {
      config: 0
    },
    variant: {
      config: 0
    },
    iconName: {
      config: 0
    },
    iconPosition: {
      config: 0
    },
    type: {
      config: 0
    }
  },
  publicMethods: ["focus", "click"],
  track: {
    title: 1,
    _order: 1
  }
});
var _lightningButton = registerComponent(LightningButton, {
  tmpl: _tmpl$3
});
LightningButton.interopMap = {
  exposeNativeEvent: {
    click: true,
    focus: true,
    blur: true
  }
};

function tmpl$4($api, $cmp, $slotset, $ctx) {
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

var _tmpl$5 = registerTemplate(tmpl$4);
tmpl$4.stylesheets = [];
tmpl$4.stylesheetTokens = {
  hostAttribute: "lightning-spinner_spinner-host",
  shadowAttribute: "lightning-spinner_spinner"
};

/**
 * Displays an animated spinner.
 */
class LightningSpinner extends BaseLightningElement {
  constructor(...args) {
    super(...args);
    this.alternativeText = void 0;
    this.size = 'medium';
    this.variant = void 0;
  }
  /**
   * The alternative text used to describe the reason for the wait and need for a spinner.
   * @type {string}
   */
  /**
   * The size of the spinner. Accepted sizes are small, medium, and large. This value defaults to medium.
   * @type {string}
   * @default medium
   */
  /**
   * The variant changes the appearance of the spinner.
   * Accepted variants include base, brand, and inverse. The default is base.
   * @type {string}
   * @default base
   */
  connectedCallback() {
    this.classList.add('slds-spinner_container');
    this.template.addEventListener('mousewheel', this.stopScrolling);
    this.template.addEventListener('touchmove', this.stopScrolling);
  }
  get normalizedVariant() {
    return normalizeString(this.variant, {
      fallbackValue: 'base',
      validValues: ['base', 'brand', 'inverse']
    });
  }
  get normalizedSize() {
    return normalizeString(this.size, {
      fallbackValue: 'medium',
      validValues: ['small', 'medium', 'large']
    });
  }
  get computedClass() {
    const {
      normalizedVariant,
      normalizedSize
    } = this;
    const classes = classSet('slds-spinner');

    // add variant-specific class
    if (normalizedVariant !== 'base') {
      classes.add(`slds-spinner_${normalizedVariant}`);
    }
    // add size-specific class
    classes.add(`slds-spinner_${normalizedSize}`);
    return classes.toString();
  }

  // alternativeText validation
  get validAlternativeText() {
    const hasAlternativeText = !!this.alternativeText;

    // if we have an empty value output a console warning
    if (!hasAlternativeText) {
      // eslint-disable-next-line no-console
      console.warn(`<lightning-spinner> The alternativeText attribute should not be empty. Please add a description of what is causing the wait.`);
    }
    return hasAlternativeText;
  }

  // prevent scrolling
  stopScrolling(event) {
    event.preventDefault();
  }
}
registerDecorators(LightningSpinner, {
  publicProps: {
    alternativeText: {
      config: 0
    },
    size: {
      config: 0
    },
    variant: {
      config: 0
    }
  }
});
var _lightningSpinner = registerComponent(LightningSpinner, {
  tmpl: _tmpl$5
});

function tmpl$5($api, $cmp, $slotset, $ctx) {
  const {
    t: api_text,
    h: api_element,
    d: api_dynamic,
    c: api_custom_element,
    b: api_bind,
    s: api_slot
  } = $api;
  const {
    _m0,
    _m1,
    _m2,
    _m3,
    _m4,
    _m5,
    _m6,
    _m7,
    _m8,
    _m9,
    _m10,
    _m11,
    _m12,
    _m13,
    _m14
  } = $ctx;
  return [api_element("button", {
    className: $cmp.computedButtonClass,
    attrs: {
      "aria-expanded": $cmp.computedAriaExpanded,
      "title": $cmp.computedTitle,
      "accesskey": $cmp.computedAccessKey,
      "value": $cmp.value,
      "aria-haspopup": "true",
      "type": "button"
    },
    props: {
      "disabled": $cmp.disabled
    },
    key: 4,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.handleButtonClick)),
      "keydown": _m1 || ($ctx._m1 = api_bind($cmp.handleButtonKeyDown)),
      "blur": _m2 || ($ctx._m2 = api_bind($cmp.handleBlur)),
      "focus": _m3 || ($ctx._m3 = api_bind($cmp.handleFocus)),
      "mousedown": _m4 || ($ctx._m4 = api_bind($cmp.handleButtonMouseDown))
    }
  }, [$cmp.isDraft ? api_element("abbr", {
    classMap: {
      "slds-indicator_unsaved": true,
      "slds-p-right_xx-small": true
    },
    attrs: {
      "title": $cmp.draftAlternativeText
    },
    key: 0
  }, [api_text("*")]) : null, api_dynamic($cmp.label), api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": $cmp.iconName,
      "svgClass": "slds-button__icon",
      "variant": "bare"
    },
    key: 1
  }, []), $cmp.computedShowDownIcon ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": "utility:down",
      "svgClass": "slds-button__icon slds-button__icon_x-small slds-m-left_xx-small",
      "variant": "bare"
    },
    key: 2
  }, []) : null, api_element("span", {
    classMap: {
      "slds-assistive-text": true
    },
    key: 3
  }, [api_dynamic($cmp.computedAlternativeText)])]), $cmp._dropdownOpened ? api_element("div", {
    className: $cmp.computedDropdownClass,
    key: 8,
    on: {
      "mousedown": _m11 || ($ctx._m11 = api_bind($cmp.handleDropdownMouseDown)),
      "mouseup": _m12 || ($ctx._m12 = api_bind($cmp.handleDropdownMouseUp)),
      "mouseleave": _m13 || ($ctx._m13 = api_bind($cmp.handleDropdownMouseLeave)),
      "scroll": _m14 || ($ctx._m14 = api_bind($cmp.handleDropdownScroll))
    }
  }, [$cmp.isLoading ? api_custom_element("lightning-spinner", _lightningSpinner, {
    props: {
      "size": "small",
      "alternativeText": $cmp.computedLoadingStateAlternativeText
    },
    key: 5
  }, []) : null, !$cmp.isLoading ? api_element("div", {
    classMap: {
      "slds-dropdown__list": true,
      "slds-dropdown_length-with-icon-10": true
    },
    attrs: {
      "role": "menu"
    },
    key: 7,
    on: {
      "privateselect": _m5 || ($ctx._m5 = api_bind($cmp.handleMenuItemPrivateSelect)),
      "privateblur": _m6 || ($ctx._m6 = api_bind($cmp.handlePrivateBlur)),
      "privatefocus": _m7 || ($ctx._m7 = api_bind($cmp.handlePrivateFocus)),
      "mouseover": _m8 || ($ctx._m8 = api_bind($cmp.handleMouseOverOnMenuItem)),
      "mouseout": _m9 || ($ctx._m9 = api_bind($cmp.allowBlur)),
      "keydown": _m10 || ($ctx._m10 = api_bind($cmp.handleKeyOnMenuItem))
    }
  }, [api_slot("", {
    key: 6
  }, [], $slotset)]) : null]) : null];
}

var _tmpl$6 = registerTemplate(tmpl$5);
tmpl$5.slots = [""];
tmpl$5.stylesheets = [];
tmpl$5.stylesheetTokens = {
  hostAttribute: "lightning-buttonMenu_buttonMenu-host",
  shadowAttribute: "lightning-buttonMenu_buttonMenu"
};

var labelLoading = 'Loading menu items...';

var labelShowMenu = 'Show menu';

/*
 * This is following the practices listed in
 *
 * https://www.w3.org/TR/wai-aria-practices/#menu
 *
 * and
 *
 * https://www.w3.org/TR/wai-aria-practices/#menubutton
 */
function preventDefaultAndStopPropagation(event) {
  event.preventDefault();
  event.stopPropagation();
}
function moveFocusToTypedCharacters(event, menuInterface) {
  runActionOnBufferedTypedCharacters(event, menuInterface.focusMenuItemWithText);
}
function handleKeyDownOnMenuItem(event, menuItemIndex, menuInterface) {
  switch (event.keyCode) {
    // W3: Down Arrow and Up Arrow: move focus to the next and previous items, respectively, optionally
    // wrapping from last to first and vice versa.
    case keyCodes.down:
    case keyCodes.up:
      {
        preventDefaultAndStopPropagation(event);
        let nextIndex = event.keyCode === keyCodes.up ? menuItemIndex - 1 : menuItemIndex + 1;
        const totalMenuItems = menuInterface.getTotalMenuItems();
        if (nextIndex >= totalMenuItems) {
          nextIndex = 0;
        } else if (nextIndex < 0) {
          nextIndex = totalMenuItems - 1;
        }
        menuInterface.focusOnIndex(nextIndex);
        break;
      }
    // W3: Home and End: If arrow key wrapping is not supported, move focus to first and last item
    // Note: We do support wrapping, but it doesn't hurt to support these keys anyway.
    case keyCodes.home:
      {
        preventDefaultAndStopPropagation(event);
        menuInterface.focusOnIndex(0);
        break;
      }
    case keyCodes.end:
      {
        preventDefaultAndStopPropagation(event);
        menuInterface.focusOnIndex(menuInterface.getTotalMenuItems() - 1);
        break;
      }
    // W3: Escape: Close the menu and return focus to the element or context, e.g., menu button or
    // parent menu item, from which the menu was opened
    // Tab: Close the menu and all open parent menus and move focus to the next element in the tab sequence.
    // Note: We don't have to do anything special for Tab because we're not stopping the event, we'll first
    // return the focus and the browser will then handle the tab key default event and will move the focus
    // appropriately. It's handy to return focus for 'Tab' anyway for cases where the menu is in a detached
    // popup (one that's using a panel attached directly to the body).
    case keyCodes.escape:
    case keyCodes.tab:
      {
        // hide menu item list if it is visible
        if (menuInterface.isMenuVisible()) {
          // prevent default escape key action only when menu is visible
          if (event.keyCode === keyCodes.escape) {
            preventDefaultAndStopPropagation(event);
          }
          menuInterface.toggleMenuVisibility();
        }
        menuInterface.returnFocus();
        break;
      }
    default:
      // W3: Any key that corresponds to a printable character: Move focus to the next menu item in the
      // current menu whose label begins with that printable character.
      // Note: we actually support a buffer, and in the current implementation it would jump to
      // the first menu item that matches not next.
      moveFocusToTypedCharacters(event, menuInterface);
  }
}
function handleKeyDownOnMenuTrigger(event, menuInterface) {
  const isVisible = menuInterface.isMenuVisible();
  switch (event.keyCode) {
    // W3 suggests that opening a menu should place the focus on the first item (as we do with Up/Down),
    // but we're not doing that because it would differ from most of the native menus behaviour.
    case keyCodes.enter:
    case keyCodes.space:
      preventDefaultAndStopPropagation(event);
      menuInterface.toggleMenuVisibility();
      break;
    case keyCodes.down:
    case keyCodes.up:
      preventDefaultAndStopPropagation(event);
      if (!isVisible) {
        // default to first menu item
        let focusNextIndex = 0;

        // if key was up-arrow then set to last menu item
        if (event.keyCode === keyCodes.up) {
          focusNextIndex = 'LAST';
        }
        menuInterface.setNextFocusIndex(focusNextIndex);
        menuInterface.toggleMenuVisibility();
      }
      break;
    // W3: Home and End: If arrow key wrapping is not supported, move focus to first and last item
    // Note: We do support wrapping, but it doesn't hurt to support these keys anyway.
    case keyCodes.home:
      preventDefaultAndStopPropagation(event);
      menuInterface.focusOnIndex(0);
      break;
    case keyCodes.end:
      preventDefaultAndStopPropagation(event);
      menuInterface.focusOnIndex(menuInterface.getTotalMenuItems() - 1);
      break;
    // W3: Escape: Close the menu and return focus to the element or context, e.g., menu button or
    // parent menu item, from which the menu was opened
    case keyCodes.escape:
    case keyCodes.tab:
      if (isVisible) {
        preventDefaultAndStopPropagation(event);
        menuInterface.toggleMenuVisibility();
      }
      break;
    default:
      if (!isVisible && menuInterface.showDropdownWhenTypingCharacters) {
        preventDefaultAndStopPropagation(event);
        menuInterface.toggleMenuVisibility();
      } else if (!isVisible) {
        break;
      }
      // eslint-disable-next-line @lwc/lwc/no-async-operation
      window.requestAnimationFrame(() => {
        moveFocusToTypedCharacters(event, menuInterface);
      });
  }
}

const POSITION_ATTR_NAME = 'data-position-id';
class BrowserWindow {
  get window() {
    if (!this._window) {
      this._window = window;

      // JTEST/Ingtegration: getComputedStyle may be null
      if (!this.window.getComputedStyle) {
        this.window.getComputedStyle = node => {
          return node.style;
        };
      }
    }
    return this._window;
  }
  mockWindow(value) {
    // For test, allow mock window.
    this._window = value;
  }
  get documentElement() {
    assert$3(this.window.document, 'Missing window.document');
    return this.window.document.documentElement;
  }
  get MutationObserver() {
    return this.window.MutationObserver;
  }
  isWindow(element) {
    return element && element.toString() === '[object Window]';
  }
}
const WindowManager = new BrowserWindow();
function isShadowRoot(node) {
  return node && node.nodeType === 11;
}
function enumerateParent(elem, stopEl, checker) {
  // document.body is not necessarily a body tag, because of the (very rare)
  // case of a frameset.
  if (!elem || elem === stopEl || elem === document.body) {
    return null;
  }
  // if overflow is auto and overflow-y is also auto,
  // however in firefox the opposite is not true
  try {
    // getComputedStyle throws an exception
    // if elem is not an element
    // (can happen during unrender)
    const computedStyle = WindowManager.window.getComputedStyle(elem);
    if (!computedStyle) {
      return null;
    }
    if (checker(computedStyle)) {
      return elem;
    }
    return enumerateParent(isShadowRoot(elem.parentNode) ? elem.parentNode.host : elem.parentNode, stopEl, checker);
  } catch (e) {
    return null;
  }
}
function getScrollableParent(elem, stopEl) {
  return enumerateParent(elem, stopEl, computedStyle => {
    const overflow = computedStyle['overflow-y'];
    return overflow === 'auto' || overflow === 'scroll';
  });
}
function queryOverflowHiddenParent(elem, stopEl) {
  return enumerateParent(elem, stopEl, computedStyle => {
    return computedStyle['overflow-x'] === 'hidden' || computedStyle['overflow-y'] === 'hidden';
  });
}
function isInDom(el) {
  if (el === WindowManager.window) {
    return true;
  }
  if (!isShadowRoot(el.parentNode) && el.parentNode && el.parentNode.tagName && el.parentNode.tagName.toUpperCase() === 'BODY') {
    return true;
  }
  if (isShadowRoot(el.parentNode) && el.parentNode.host) {
    return isInDom(el.parentNode.host);
  }
  if (el.parentNode) {
    return isInDom(el.parentNode);
  }
  return false;
}
function isDomNode(obj) {
  return obj.nodeType && (obj.nodeType === 1 || obj.nodeType === 11);
}
function timeout$1(time) {
  return new Promise(resolve => {
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    setTimeout(() => {
      resolve();
    }, time);
  });
}
function getPositionTarget(element) {
  return element.tagName === 'TEXTAREA' ? isShadowRoot(element.parentNode) ? element.parentNode.host : element.parentNode : element;
}
let lastId = 1000000;
function generateUniqueSelector() {
  return `lgcp-${lastId++}`;
}
function normalizeElement(element) {
  const selector = generateUniqueSelector();
  element.setAttribute(POSITION_ATTR_NAME, selector);
  element =
  // eslint-disable-next-line @lwc/lwc/no-document-query
  document.querySelector(`[${POSITION_ATTR_NAME}="${selector}"]`) || element;
  return element;
}
function isInsideOverlay(element, modalOnly) {
  if (!element) {
    return {
      isInside: false,
      overlay: null
    };
  }
  if (element.classList && (element.classList.contains('uiModal') || element.localName === 'lightning-dialog' || !modalOnly && element.classList.contains('uiPanel'))) {
    return {
      isInside: true,
      overlay: element
    };
  }
  if (!element.parentNode) {
    return {
      isInside: false,
      overlay: null
    };
  }
  return isInsideOverlay(isShadowRoot(element.parentNode) ? element.parentNode.host : element.parentNode, modalOnly);
}
function isInsideModal(element) {
  return isInsideOverlay(element, true);
}
function normalizePosition(element, nextIndex, target, alignWidth) {
  // Set element position to fixed
  // 1. element is inside overlay
  // or 2. When element isn't align with target's width, and target's parent has overflow-x:hidden setting.
  const isFixed = isInsideOverlay(element).isInside || !alignWidth && queryOverflowHiddenParent(target, WindowManager.window);
  element.style.position = isFixed ? 'fixed' : 'absolute';
  element.style.zIndex = nextIndex || 0;
  element.style.left = '-9999px'; // Avoid flicker
  // we always position from the left, but in RTL mode Omakase swaps left and right properties.
  // To always allow positioning from the left we set right to auto so position library can do its work.
  element.style.right = 'auto';
  element.style.top = '0px'; // Avoid flicker

  return element;
}
function requestAnimationFrameAsPromise() {
  return new Promise(resolve => {
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    requestAnimationFrame(() => resolve());
  });
}

const Direction = {
  Center: 'center',
  Middle: 'middle',
  Right: 'right',
  Left: 'left',
  Bottom: 'bottom',
  Top: 'top',
  Default: 'default'
};
const VerticalMap = {
  top: Direction.Top,
  bottom: Direction.Bottom,
  center: Direction.Middle
};
const HorizontalMap = {
  left: Direction.Left,
  right: Direction.Right,
  center: Direction.Center
};
const FlipMap = {
  left: Direction.Right,
  right: Direction.Left,
  top: Direction.Bottom,
  bottom: Direction.Top,
  center: Direction.Center,
  default: Direction.Right
};
function getWindowSize() {
  return {
    width: WindowManager.window.innerWidth || document.body.clientWidth || 0,
    height: WindowManager.window.innerHeight || document.body.clientHeight || 0
  };
}
function normalizeDirection(direction, defaultValue) {
  return normalizeString(direction, {
    fallbackValue: defaultValue || Direction.Default,
    validValues: [Direction.Center, Direction.Right, Direction.Left, Direction.Bottom, Direction.Top, Direction.Middle, Direction.Default]
  });
}
function mapToHorizontal(value) {
  value = normalizeDirection(value, Direction.Left);
  return HorizontalMap[value];
}
function mapToVertical(value) {
  value = normalizeDirection(value, Direction.Left);
  return VerticalMap[value];
}
function flipDirection(value) {
  value = normalizeDirection(value, Direction.Left);
  return FlipMap[value];
}
function checkFlipPossibility(element, target, leftAsBoundary) {
  const viewPort = getWindowSize();
  const elemRect = element.getBoundingClientRect();
  const referenceElemRect = target.getBoundingClientRect();
  const height = typeof elemRect.height !== 'undefined' ? elemRect.height : elemRect.bottom - elemRect.top;
  const width = typeof elemRect.width !== 'undefined' ? elemRect.width : elemRect.right - elemRect.left;

  // TODO: We'll need to revisit the leftAsBoundary config property. Either we'll need a better
  // name to cover the RTL language cases and maybe open up the possibility of bounding the
  // element to the target in both the horizontal and vertical directions.

  // The boundary shrinks the available area to the edge of the target rather than the viewport.
  let rightAsBoundary = false;
  if (document.dir === 'rtl') {
    rightAsBoundary = leftAsBoundary;
    leftAsBoundary = false;
  }
  const aboveSpace = referenceElemRect.top - height;
  const belowSpace = viewPort.height - referenceElemRect.bottom - height;
  const hasSpaceAbove = aboveSpace >= 0 || belowSpace < 0 && aboveSpace > belowSpace;
  const hasSpaceBelow = belowSpace >= 0 || aboveSpace < 0 && belowSpace > aboveSpace;

  // Assuming left alignment is specified this tests if:
  // - there's room to accommodate the element with right alignment
  // - there's not enough room to accommodate the element with left alignment
  const shouldAlignToRight = referenceElemRect.right >= width && referenceElemRect.left + width > (rightAsBoundary ? referenceElemRect.right : viewPort.width);

  // Assuming right alignment is specified this tests if:
  // - there's room to accommodate the element with left alignment
  // - there's not enough room to accommodate the element with right alignment
  const shouldAlignToLeft = referenceElemRect.left + width <= viewPort.width && referenceElemRect.right - width < (leftAsBoundary ? referenceElemRect.left : 0);

  // Assuming center alignment, does the viewport have space to fit half of the element around
  // the target?
  const centerOverflow = {
    left: referenceElemRect.left - width * 0.5 < 0,
    right: referenceElemRect.right + width * 0.5 > viewPort.width,
    top: referenceElemRect.top - height * 0.5 < 0,
    bottom: referenceElemRect.bottom + height * 0.5 > viewPort.height
  };
  return {
    shouldAlignToLeft,
    shouldAlignToRight,
    hasSpaceAbove,
    hasSpaceBelow,
    centerOverflow
  };
}

class Transformer {
  constructor(pad, boxDirections, transformX, transformY) {
    this.pad = pad || 0;
    this.boxDirections = boxDirections || {
      left: true,
      right: true
    };
    this.transformX = transformX || function () {};
    this.transformY = transformY || function () {};
  }
  transform() {
    // no-op
  }
}
class TopTransformer extends Transformer {
  transform(targetBox, elementBox) {
    return {
      top: Math.floor(this.transformY(targetBox.top, targetBox, elementBox) + this.pad)
    };
  }
}
class BottomTransFormer extends Transformer {
  transform(targetBox, elementBox) {
    return {
      top: Math.floor(this.transformY(targetBox.top, targetBox, elementBox) - elementBox.height - this.pad)
    };
  }
}
class CenterTransformer extends Transformer {
  transform(targetBox, elementBox) {
    return {
      left: Math.floor(this.transformX(targetBox.left, targetBox, elementBox) - 0.5 * elementBox.width)
    };
  }
}
class MiddleTransformer extends Transformer {
  transform(targetBox, elementBox) {
    return {
      top: Math.floor(0.5 * (2 * targetBox.top + targetBox.height - elementBox.height))
    };
  }
}
class LeftTransformer extends Transformer {
  transform(targetBox, elementBox) {
    return {
      left: Math.floor(this.transformX(targetBox.left, targetBox, elementBox) + this.pad)
    };
  }
}
class RightTransformer extends Transformer {
  transform(targetBox, elementBox) {
    return {
      left: Math.floor(this.transformX(targetBox.left, targetBox, elementBox) - elementBox.width - this.pad)
    };
  }
}
class BelowTransformer extends Transformer {
  transform(targetBox, elementBox) {
    const top = targetBox.top + targetBox.height + this.pad;
    return elementBox.top < top ? {
      top
    } : {};
  }
}
const MIN_HEIGHT = 36; // Minimum Line Height
const MIN_WIDTH = 36;
class ShrinkingBoxTransformer extends Transformer {
  transform(targetBox, elementBox) {
    const retBox = {};
    if (this.boxDirections.top && elementBox.top < targetBox.top + this.pad) {
      retBox.top = targetBox.top + this.pad;
      retBox.height = Math.max(elementBox.height - (retBox.top - elementBox.top), MIN_HEIGHT);
    }
    if (this.boxDirections.left && elementBox.left < targetBox.left + this.pad) {
      retBox.left = targetBox.left + this.pad;
      retBox.width = Math.max(elementBox.width - (retBox.left - elementBox.left), MIN_WIDTH);
    }
    if (this.boxDirections.right && elementBox.left + elementBox.width > targetBox.left + targetBox.width - this.pad) {
      retBox.right = targetBox.left + targetBox.width - this.pad;
      retBox.width = Math.max(retBox.right - (retBox.left || elementBox.left), MIN_WIDTH);
    }
    if (this.boxDirections.bottom && elementBox.top + elementBox.height > targetBox.top + targetBox.height - this.pad) {
      retBox.bottom = targetBox.top + targetBox.height - this.pad;
      retBox.height = Math.max(retBox.bottom - (retBox.top || elementBox.top), MIN_HEIGHT);
    }
    return retBox;
  }
}
class BoundingBoxTransformer extends Transformer {
  transform(targetBox, elementBox) {
    const retBox = {};
    if (this.boxDirections.top && elementBox.top < targetBox.top + this.pad) {
      retBox.top = targetBox.top + this.pad;
    }
    if (this.boxDirections.left && elementBox.left < targetBox.left + this.pad) {
      retBox.left = targetBox.left + this.pad;
    }
    if (this.boxDirections.right && elementBox.left + elementBox.width > targetBox.left + targetBox.width - this.pad) {
      retBox.left = targetBox.left + targetBox.width - elementBox.width - this.pad;
    }
    if (this.boxDirections.bottom && elementBox.top + elementBox.height > targetBox.top + targetBox.height - this.pad) {
      retBox.top = targetBox.top + targetBox.height - elementBox.height - this.pad;
    }
    return retBox;
  }
}
class InverseBoundingBoxTransformer extends Transformer {
  transform(targetBox, elementBox) {
    const retBox = {};
    if (this.boxDirections.left && targetBox.left - this.pad < elementBox.left) {
      retBox.left = targetBox.left - this.pad;
    }
    if (this.boxDirections.right && elementBox.left + elementBox.width < targetBox.left + targetBox.width + this.pad) {
      retBox.left = targetBox.width + this.pad - elementBox.width + targetBox.left;
    }
    if (this.boxDirections.top && targetBox.top < elementBox.top + this.pad) {
      retBox.top = targetBox.top - this.pad;
    }
    if (this.boxDirections.bottom && elementBox.top + elementBox.height < targetBox.top + targetBox.height + this.pad) {
      retBox.top = targetBox.height + this.pad - elementBox.height + targetBox.top;
    }
    return retBox;
  }
}
const TransformFunctions = {
  center(input, targetBox) {
    return Math.floor(input + 0.5 * targetBox.width);
  },
  right(input, targetBox) {
    return input + targetBox.width;
  },
  left(input) {
    return input;
  },
  bottom(input, targetBox) {
    return input + targetBox.height;
  }
};
const Transformers = {
  top: TopTransformer,
  bottom: BottomTransFormer,
  center: CenterTransformer,
  middle: MiddleTransformer,
  left: LeftTransformer,
  right: RightTransformer,
  below: BelowTransformer,
  'bounding box': BoundingBoxTransformer,
  'shrinking box': ShrinkingBoxTransformer,
  'inverse bounding box': InverseBoundingBoxTransformer,
  default: Transformer
};
function toTransformFunctions(value) {
  return TransformFunctions[value] || TransformFunctions.left;
}

class TransformBuilder {
  type(value) {
    this._type = value;
    return this;
  }
  align(horizontal, vertical) {
    this._transformX = toTransformFunctions(horizontal);
    this._transformY = toTransformFunctions(vertical);
    return this;
  }
  pad(value) {
    this._pad = parseInt(value, 10);
    return this;
  }
  boxDirections(value) {
    this._boxDirections = value;
    return this;
  }
  build() {
    const AConstructor = Transformers[this._type] ? Transformers[this._type] : Transformers[Direction.Default];
    return new AConstructor(this._pad || 0, this._boxDirections || {}, this._transformX || toTransformFunctions(Direction.left), this._transformY || toTransformFunctions(Direction.left));
  }
}

class Constraint {
  constructor(type, config) {
    const {
      target,
      element,
      pad,
      boxDirections
    } = config;
    const {
      horizontal,
      vertical
    } = config.targetAlign;
    this._element = element;
    this._targetElement = target;
    this.destroyed = false;
    this._transformer = new TransformBuilder().type(type).align(horizontal, vertical).pad(pad).boxDirections(boxDirections).build();
  }
  detach() {
    this._disabled = true;
  }
  attach() {
    this._disabled = false;
  }
  computeDisplacement() {
    if (!this._disabled) {
      this._targetElement.refresh();
      this._element.refresh();
      this._pendingBox = this._transformer.transform(this._targetElement, this._element);
    }
    return this;
  }
  computePosition() {
    const el = this._element;
    if (!this._disabled) {
      Object.keys(this._pendingBox).forEach(key => {
        el.setDirection(key, this._pendingBox[key]);
      });
    }
    return this;
  }
  destroy() {
    this._element.release();
    this._targetElement.release();
    this._disabled = true;
    this.destroyed = true;
  }
}

class ElementProxy {
  constructor(el, id) {
    this.id = id;
    this.width = 0;
    this.height = 0;
    this.left = 0;
    this.top = 0;
    this.right = 0;
    this.bottom = 0;
    this._dirty = false;
    this._node = null;
    this._releaseCb = null;
    if (!el) {
      throw new Error('Element missing');
    }

    // W-3262919
    // for some reason I cannot figure out sometimes the
    // window, which clearly a window object, is not the window object
    // this will correct that. It might be related to locker
    if (WindowManager.isWindow(el)) {
      el = WindowManager.window;
    }
    this._node = el;
    this.setupObserver();
    this.refresh();
  }
  setupObserver() {
    // this check is because phantomjs does not support
    // mutation observers. The consqeuence here
    // is that any browser without mutation observers will
    // fail to update dimensions if they changwe after the proxy
    // is created and the proxy is not not refreshed
    if (WindowManager.MutationObserver && !this._node.isObserved) {
      // Use mutation observers to invalidate cache. It's magic!
      this._observer = new WindowManager.MutationObserver(this.refresh.bind(this));

      // do not observe the window
      if (!WindowManager.isWindow(this._node)) {
        this._observer.observe(this._node, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
        this._node.isObserved = true;
      }
    }
  }
  setReleaseCallback(cb, scope) {
    const scopeObj = scope || this;
    this._releaseCb = cb.bind(scopeObj);
  }
  checkNodeIsInDom() {
    // if underlying DOM node is gone,
    // this proxy should be released
    if (!isInDom(this._node)) {
      return false;
    }
    return true;
  }
  refresh() {
    const w = WindowManager.window;
    if (!this.isDirty()) {
      if (!this.checkNodeIsInDom()) {
        return this.release();
      }
      let box, x, scrollTop, scrollLeft;
      if (typeof w.pageYOffset !== 'undefined') {
        scrollTop = w.pageYOffset;
        scrollLeft = w.pageXOffset;
      } else {
        scrollTop = w.scrollY;
        scrollLeft = w.scrollX;
      }
      if (!WindowManager.isWindow(this._node)) {
        // force paint
        // eslint-disable-next-line no-unused-vars
        const offsetHeight = this._node.offsetHeight;
        box = this._node.getBoundingClientRect();

        // not using integers causes weird rounding errors
        // eslint-disable-next-line guard-for-in
        for (x in box) {
          this[x] = Math.floor(box[x]);
        }
        this.top = Math.floor(this.top + scrollTop);
        this.bottom = Math.floor(this.top + box.height);
        this.left = Math.floor(this.left + scrollLeft);
        this.right = Math.floor(this.left + box.width);
      } else {
        box = {};
        this.width = WindowManager.documentElement.clientWidth;
        this.height = WindowManager.documentElement.clientHeight;
        this.left = scrollLeft;
        this.top = scrollTop;
        this.right = WindowManager.documentElement.clientWidth + scrollLeft;
        this.bottom = WindowManager.documentElement.clientHeight;
      }
      this._dirty = false;
    }
    return this._dirty;
  }
  getNode() {
    return this._node;
  }
  isDirty() {
    return this._dirty;
  }
  bake() {
    const w = WindowManager.window;
    const absPos = this._node.getBoundingClientRect();
    const style = w.getComputedStyle(this._node) || this._node.style;
    const hasPageOffset = typeof w.pageYOffset !== 'undefined';
    const scrollTop = hasPageOffset ? w.pageYOffset : w.scrollY;
    const scrollLeft = hasPageOffset ? w.pageXOffset : w.scrollX;
    const originalLeft = style.left.match(/auto|fixed/) ? '0' : parseInt(style.left.replace('px', ''), 10);
    const originalTop = style.top.match(/auto|fixed/) ? '0' : parseInt(style.top.replace('px', ''), 10);
    const leftDif = Math.round(this.left - (absPos.left + scrollLeft));
    const topDif = this.top - (absPos.top + scrollTop);
    this._node.style.left = `${originalLeft + leftDif}px`;
    this._node.style.top = `${originalTop + topDif}px`;
    if (this._restoreSize) {
      // Only store the first height/width which is the original height/width.
      if (this.originalHeight === undefined) {
        this.originalHeight = this._node.style.height;
      }
      if (this.originalWidth === undefined) {
        this.originalWidth = this._node.style.width;
      }
      this._node.style.width = `${this.width}px`;
      this._node.style.height = `${this.height}px`;
    }
    this._dirty = false;
  }
  setDirection(direction, val) {
    this[direction] = val;
    this._dirty = true;
    // if size is changed, should restore the original size.
    if (direction === 'height' || direction === 'width') {
      this._restoreSize = true;
    }
  }
  release() {
    if (this._restoreSize) {
      this._node.style.width = this.originalWidth;
      this._node.style.height = this.originalHeight;
      if (this._removeMinHeight) {
        this._node.style.minHeight = '';
      }
    }
    if (this._releaseCb) {
      this._releaseCb(this);
    }

    // Due to https://github.com/salesforce/lwc/pull/1423
    // require to call disconnect explicitly.
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
  }
  querySelectorAll(selector) {
    return this._node.querySelectorAll(selector);
  }
}

class ProxyCache {
  constructor() {
    this.proxyCache = {};
  }
  get count() {
    return Object.keys(this.proxyCache).length;
  }
  releaseOrphanProxies() {
    for (const proxy in this.proxyCache) {
      if (!this.proxyCache[proxy].el.checkNodeIsInDom()) {
        this.proxyCache[proxy].el.release();
      }
    }
  }
  bakeOff() {
    for (const proxy in this.proxyCache) {
      if (this.proxyCache[proxy].el.isDirty()) {
        this.proxyCache[proxy].el.bake();
      }
    }
  }
  getReferenceCount(proxy) {
    const id = proxy.id;
    if (!id || !this.proxyCache[id]) {
      return 0;
    }
    return this.proxyCache[id].refCount;
  }
  release(proxy) {
    const proxyInstance = this.proxyCache[proxy.id];
    if (proxyInstance) {
      --proxyInstance.refCount;
    }
    if (proxyInstance && proxyInstance.refCount <= 0) {
      delete this.proxyCache[proxy.id];
    }
  }
  reset() {
    this.proxyCache = {};
  }
  create(element) {
    let key = 'window';
    if (!WindowManager.isWindow(element)) {
      key = element ? element.getAttribute(POSITION_ATTR_NAME) : null;
      // 1 - Node.ELEMENT_NODE, 11 - Node.DOCUMENT_FRAGMENT_NODE
      assert$3(key && element.nodeType && (element.nodeType !== 1 || element.nodeType !== 11), `Element Proxy requires an element and has property ${POSITION_ATTR_NAME}`);
    }
    if (this.proxyCache[key]) {
      this.proxyCache[key].refCount++;
      return this.proxyCache[key].el;
    }
    const newProxy = new ElementProxy(element, key);
    newProxy.setReleaseCallback(release, newProxy);
    this.proxyCache[key] = {
      el: newProxy,
      refCount: 1
    };

    // run GC
    timeout$1(0).then(() => {
      this.releaseOrphanProxies();
    });
    return this.proxyCache[key].el;
  }
}
registerDecorators(ProxyCache, {
  fields: ["proxyCache"]
});
const elementProxyCache = new ProxyCache();
function bakeOff() {
  elementProxyCache.bakeOff();
}
function release(proxy) {
  return elementProxyCache.release(proxy);
}
function createProxy(element) {
  return elementProxyCache.create(element);
}

class RepositionQueue {
  constructor() {
    this.callbacks = [];
    this.repositionScheduled = false;
    this._constraints = [];
    this.timeoutId = 0;
    this.lastIndex = getZIndexBaseline();
    this.eventsBound = false;
  }
  get nextIndex() {
    return this.lastIndex++;
  }
  get constraints() {
    return this._constraints;
  }
  set constraints(value) {
    this._constraints = this._constraints.concat(value);
  }
  dispatchRepositionCallbacks() {
    while (this.callbacks.length > 0) {
      this.callbacks.shift()();
    }
  }
  add(callback) {
    if (typeof callback === 'function') {
      this.callbacks.push(callback);
      return true;
    }
    return false;
  }
  scheduleReposition(callback) {
    if (this.timeoutId === 0) {
      // eslint-disable-next-line @lwc/lwc/no-async-operation
      this.timeoutId = setTimeout(() => {
        this.reposition(callback);
      }, 10);
    }
  }
  reposition(callback) {
    // all the callbacks will be called
    if (typeof callback === 'function') {
      this.callbacks.push(callback);
    }
    // this is for throttling
    clearTimeout(this.timeoutId);
    this.timeoutId = 0;

    // this semaphore is to make sure
    // if reposition is called twice within one frame
    // we only run this once
    if (!this.repositionScheduled) {
      // eslint-disable-next-line @lwc/lwc/no-async-operation
      requestAnimationFrame(() => {
        this.repositionScheduled = false;
        // this must be executed in order or constraints
        // will behave oddly
        this._constraints = this._constraints.filter(constraint => {
          if (!constraint.destroyed) {
            constraint.computeDisplacement().computePosition();
            return true;
          }
          return false;
        });
        bakeOff();
        this.dispatchRepositionCallbacks();
      });
      this.repositionScheduled = true;
    }
  }
  get repositioning() {
    if (!this._reposition) {
      this._reposition = this.scheduleReposition.bind(this);
    }
    return this._reposition;
  }
  bindEvents() {
    if (!this.eventsBound) {
      window.addEventListener('resize', this.repositioning);
      window.addEventListener('scroll', this.repositioning);
      this.eventsBound = true;
    }
  }
  detachEvents() {
    window.removeEventListener('resize', this.repositioning);
    window.removeEventListener('scroll', this.repositioning);
    this.eventsBound = false;
  }
  rebase(index) {
    if (this.lastIndex <= index) {
      this.lastIndex = index + 1;
    }
  }
}
registerDecorators(RepositionQueue, {
  fields: ["callbacks", "repositionScheduled", "_constraints", "timeoutId", "lastIndex", "eventsBound"]
});
const positionQueue = new RepositionQueue();
function scheduleReposition(callback) {
  positionQueue.scheduleReposition(callback);
}
function bindEvents() {
  positionQueue.bindEvents();
}
function addConstraints(list) {
  positionQueue.constraints = list;
}
function reposition(callback) {
  positionQueue.reposition(callback);
}
function nextIndex() {
  return positionQueue.nextIndex;
}
function rebaseIndex(index) {
  return positionQueue.rebase(index);
}

class Relationship {
  constructor(config, constraintList, scrollableParent, observer) {
    this.config = config;
    this.constraintList = constraintList;
    this.scrollableParent = scrollableParent;
    this.observer = observer;
  }
  disable() {
    this.constraintList.forEach(constraintToDisable => {
      constraintToDisable.detach();
    });
  }
  enable() {
    this.constraintList.forEach(constraintToEnable => {
      constraintToEnable.attach();
    });
  }
  destroy() {
    if (this.config.removeListeners) {
      this.config.removeListeners();
      this.config.removeListeners = undefined;
    }
    while (this.constraintList.length > 0) {
      this.constraintList.pop().destroy();
    }

    // Clean up node appended to body of dom
    if (this.config.appendToBody && this.config.element) {
      // eslint-disable-next-line @lwc/lwc/no-document-query
      const nodeToRemove = document.querySelector(`[${POSITION_ATTR_NAME}="${this.config.element.getAttribute(POSITION_ATTR_NAME)}"]`);
      if (nodeToRemove) {
        nodeToRemove.parentNode.removeChild(nodeToRemove);
      }
    }

    // Due to https://github.com/salesforce/lwc/pull/1423
    // require to call disconnect explicitly.
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
  reposition() {
    return new Promise(resolve => {
      reposition(() => {
        resolve();
      });
    });
  }
}

const DEFAULT_MIN_HEIGHT = '1.875rem';
function setupObserver(config, scrollableParent) {
  const observedElement = config.element;
  let observer = null;
  if (WindowManager.MutationObserver && !observedElement.isObserved) {
    observer = new WindowManager.MutationObserver(() => {});
    observer.observe(observedElement, {
      attributes: true,
      subtree: true,
      childList: true
    });
    observedElement.isObserved = true;
  }
  if (scrollableParent) {
    scrollableParent.addEventListener('scroll', scheduleReposition);
    config.removeListeners = () => {
      scrollableParent.removeEventListener('scroll', scheduleReposition);
    };
  }
  return observer;
}
function validateConfig(config) {
  assert$3(config.element && isDomNode(config.element), 'Element is undefined or missing, or not a Dom Node');
  assert$3(config.target && (WindowManager.isWindow(config.target) || isDomNode(config.target)), 'Target is undefined or missing');
}
function createRelationship(config, disableReposition) {
  bindEvents();
  if (config.alignWidth && config.element.style.position === 'fixed') {
    config.element.style.width = config.target.getBoundingClientRect().width + 'px';
  }
  const constraintList = [];
  const scrollableParent = getScrollableParent(getPositionTarget(config.target), WindowManager.window);

  // This observer and the test for scrolling children
  // is so that if a panel contains a scroll we do not
  // proxy the events to the "parent"  (actually the target's parent)
  const observer = setupObserver(config, scrollableParent);
  if (config.appendToBody) {
    document.body.appendChild(config.element);
  }
  config.element = createProxy(config.element);
  config.target = createProxy(config.target);

  // Add horizontal constraint.
  const horizontalConfig = Object.assign({}, config);
  if (horizontalConfig.padLeft !== undefined) {
    horizontalConfig.pad = horizontalConfig.padLeft;
  }

  // Add vertical constraint.
  const verticalConfig = Object.assign({}, config);
  if (verticalConfig.padTop !== undefined) {
    verticalConfig.pad = verticalConfig.padTop;
  }
  constraintList.push(new Constraint(mapToHorizontal(config.align.horizontal), horizontalConfig));
  constraintList.push(new Constraint(mapToVertical(config.align.vertical), verticalConfig));
  const autoShrink = config.autoShrink.height || config.autoShrink.width;
  if (config.scrollableParentBound && scrollableParent) {
    const parent = normalizeElement(scrollableParent);
    const boxConfig = {
      element: config.element,
      enabled: config.enabled,
      target: createProxy(parent),
      align: {},
      targetAlign: {},
      pad: 3,
      boxDirections: {
        top: true,
        bottom: true,
        left: true,
        right: true
      }
    };
    if (autoShrink) {
      const style = boxConfig.element.getNode().style;
      if (!style.minHeight) {
        style.minHeight = config.minHeight;
        boxConfig.element._removeMinHeight = true;
      }
      boxConfig.boxDirections = {
        top: !!config.autoShrink.height,
        bottom: !!config.autoShrink.height,
        left: !!config.autoShrink.width,
        right: !!config.autoShrink.width
      };
      constraintList.push(new Constraint('shrinking box', boxConfig));
    } else {
      constraintList.push(new Constraint('bounding box', boxConfig));
    }
  }
  if (config.keepInViewport) {
    constraintList.push(new Constraint('bounding box', {
      element: config.element,
      enabled: config.enabled,
      target: createProxy(window),
      align: {},
      targetAlign: {},
      pad: 3,
      boxDirections: {
        top: true,
        bottom: true,
        left: true,
        right: true
      }
    }));
  }
  addConstraints(constraintList);
  if (!disableReposition) {
    reposition();
  }
  return new Relationship(config, constraintList, scrollableParent, observer);
}
function isAutoFlipHorizontal(config) {
  return config.autoFlip || config.autoFlipHorizontal;
}
function isAutoFlipVertical(config) {
  return config.autoFlip || config.autoFlipVertical;
}
function normalizeAlignments(config, flipConfig) {
  const align = {
    horizontal: config.align.horizontal,
    vertical: config.align.vertical
  };
  const targetAlign = {
    horizontal: config.targetAlign.horizontal,
    vertical: config.targetAlign.vertical
  };

  // Horizontal alignments flip for RTL languages.
  if (document.dir === 'rtl') {
    align.horizontal = flipDirection(align.horizontal);
    targetAlign.horizontal = flipDirection(targetAlign.horizontal);
  }

  // When using the autoFlip flags with center alignment, we change the element alignment to fit
  // within the viewport when it's detected that it overflows the edge of the viewport.

  let vFlip = false;
  if (isAutoFlipVertical(config)) {
    if (align.vertical === Direction.Bottom) {
      vFlip = !flipConfig.hasSpaceAbove && flipConfig.hasSpaceBelow;
    } else if (align.vertical === Direction.Top) {
      vFlip = flipConfig.hasSpaceAbove && !flipConfig.hasSpaceBelow;
    } else if (align.vertical === Direction.Center) {
      if (flipConfig.centerOverflow.top && !flipConfig.centerOverflow.bottom) {
        align.vertical = targetAlign.vertical = Direction.Top;
      } else if (flipConfig.centerOverflow.bottom && !flipConfig.centerOverflow.top) {
        align.vertical = targetAlign.vertical = Direction.Bottom;
      }
    }
  }
  let hFlip = false;
  if (isAutoFlipHorizontal(config)) {
    if (align.horizontal === Direction.Left) {
      hFlip = flipConfig.shouldAlignToRight;
    } else if (align.horizontal === Direction.Right) {
      hFlip = flipConfig.shouldAlignToLeft;
    } else if (align.horizontal === Direction.Center) {
      if (flipConfig.centerOverflow.left && !flipConfig.centerOverflow.right) {
        align.horizontal = targetAlign.horizontal = Direction.Left;
      } else if (flipConfig.centerOverflow.right && !flipConfig.centerOverflow.left) {
        align.horizontal = targetAlign.horizontal = Direction.Right;
      }
    }
  }
  return {
    align: {
      horizontal: hFlip ? flipDirection(align.horizontal) : normalizeDirection(align.horizontal, Direction.Left),
      vertical: vFlip ? flipDirection(align.vertical) : normalizeDirection(align.vertical, Direction.Top)
    },
    targetAlign: {
      horizontal: hFlip ? flipDirection(targetAlign.horizontal) : normalizeDirection(targetAlign.horizontal, Direction.Left),
      vertical: vFlip ? flipDirection(targetAlign.vertical) : normalizeDirection(targetAlign.vertical, Direction.Bottom)
    }
  };
}
function normalizeConfig(config) {
  config.align = config.align || {};
  config.targetAlign = config.targetAlign || {};
  const flipConfig = checkFlipPossibility(config.element, config.target, config.leftAsBoundary);
  const {
    align,
    targetAlign
  } = normalizeAlignments(config, flipConfig);

  // When inside modal, element may expand out of the viewport and be cut off.
  // So if inside modal, and don't have enough space above or below, will add bounding box rule.
  if (config.isInsideModal && !flipConfig.hasSpaceAbove && !flipConfig.hasSpaceBelow) {
    config.scrollableParentBound = true;
  }
  return {
    target: config.target,
    element: config.element,
    align,
    targetAlign,
    alignWidth: config.alignWidth,
    scrollableParentBound: config.scrollableParentBound,
    keepInViewport: config.keepInViewport,
    pad: config.pad,
    padTop: config.padTop,
    padLeft: config.padLeft,
    autoShrink: {
      height: config.autoShrink || config.autoShrinkHeight,
      width: config.autoShrink || config.autoShrinkWidth
    },
    minHeight: config.minHeight || DEFAULT_MIN_HEIGHT
  };
}
function toElement(root, target) {
  if (target && typeof target === 'string') {
    return root.querySelector(target);
  } else if (target && typeof target === 'function') {
    return target();
  }
  return target;
}
function startPositioning(root, config, disableReposition) {
  assert$3(root, 'Root is undefined or missing');
  assert$3(config, 'Config is undefined or missing');
  const node = normalizeElement(root);
  const target = toElement(node, config.target);
  const element = toElement(node, config.element);

  // when target/element is selector, there is chance, dom isn't present anymore.
  if (!target || !element) {
    return null;
  }
  config.target = normalizeElement(target);
  config.element = normalizeElement(element);
  const result = isInsideModal(config.element);
  config.isInsideModal = result.isInside;

  // stackManager will increase the zIndex too.
  // if detect inside modal, read modal zindex and rebase to it.
  if (config.isInsideModal && result.overlay) {
    const index = parseInt(result.overlay.style.zIndex, 10);
    rebaseIndex(index);
  }

  // Also should check if target inside modal too.
  const targetResult = isInsideModal(config.target);
  config.isInsideModal = targetResult.isInside;

  // if detect inside modal, read modal zindex and rebase to it.
  if (config.isInsideModal && targetResult.overlay) {
    const index = parseInt(targetResult.overlay.style.zIndex, 10);
    rebaseIndex(index);
  }

  // Element absolute / fixed must be set prior to getBoundingClientRect call or
  // the scrollable parent (usually due to uiModal/uiPanel) will push the page down.
  config.element = normalizePosition(config.element, nextIndex(), config.target, config.alignWidth);
  validateConfig(config);
  return createRelationship(normalizeConfig(config), disableReposition);
}
function stopPositioning(relationship) {
  if (relationship) {
    relationship.destroy();
  }
}
class AutoPosition {
  constructor(root) {
    this._autoPositionUpdater = null;
    this._root = root;
  }
  start(config) {
    return requestAnimationFrameAsPromise().then(() => {
      let promise = Promise.resolve();
      if (!this._autoPositionUpdater) {
        this._autoPositionUpdater = startPositioning(this._root, config);
      } else {
        promise = promise.then(() => {
          return this._autoPositionUpdater.reposition();
        });
      }
      return promise.then(() => {
        return this._autoPositionUpdater;
      });
    });
  }
  stop() {
    if (this._autoPositionUpdater) {
      stopPositioning(this._autoPositionUpdater);
      this._autoPositionUpdater = null;
    }
    return Promise.resolve();
  }
}
registerDecorators(AutoPosition, {
  fields: ["_autoPositionUpdater"]
});

function tmpl$6($api, $cmp, $slotset, $ctx) {
  const {
    b: api_bind,
    h: api_element
  } = $api;
  const {
    _m0
  } = $ctx;
  return [api_element("div", {
    classMap: {
      "slds-popover__body": true
    },
    context: {
      lwc: {
        dom: "manual"
      }
    },
    key: 0,
    on: {
      "mouseleave": _m0 || ($ctx._m0 = api_bind($cmp.handleMouseLeave))
    }
  }, [])];
}

var _tmpl$7 = registerTemplate(tmpl$6);
tmpl$6.stylesheets = [];
tmpl$6.stylesheetTokens = {
  hostAttribute: "lightning-primitiveBubble_primitiveBubble-host",
  shadowAttribute: "lightning-primitiveBubble_primitiveBubble"
};

const DEFAULT_ALIGN = {
  horizontal: 'left',
  vertical: 'bottom'
};
class LightningPrimitiveBubble extends BaseLightningElement {
  constructor(...args) {
    super(...args);
    this.state = {
      visible: false,
      contentId: ''
    };
    this.divElement = void 0;
  }
  get contentId() {
    return this.state.contentId;
  }
  set contentId(value) {
    this.state.contentId = value;
    if (this.state.inDOM) {
      this.divEl.setAttribute('id', this.state.contentId);
    }
  }
  connectedCallback() {
    this.updateClassList();
    this.state.inDOM = true;
  }
  disconnectedCallback() {
    this.state.inDOM = false;
  }
  renderedCallback() {
    // set content manually once rendered
    // - this is required to avoid the content update being in the wrong 'tick'
    this.setContentManually();
    this.setIdManually();
  }
  set content(value) {
    this.state.content = value;
    if (this.state.inDOM) {
      this.setContentManually();
    }
  }
  get content() {
    return this.state.content || '';
  }
  get align() {
    return this.state.align || DEFAULT_ALIGN;
  }
  set align(value) {
    this.state.align = value;
    this.updateClassList();
  }
  get visible() {
    return this.state.visible;
  }
  set visible(value) {
    this.state.visible = value;
    this.updateClassList();
  }
  setIdManually() {
    this.divElement = this.divElement ? this.divElement : this.template.querySelector('div');
    this.divElement.setAttribute('id', this.state.contentId);
  }

  // manually set the content value
  setContentManually() {
    /* manipulate DOM directly */
    this.template.querySelector('.slds-popover__body').textContent = this.state.content;
  }

  // compute class value for this bubble
  updateClassList() {
    const classes = classSet('slds-popover').add('slds-popover_tooltip');

    // show or hide bubble
    classes.add({
      'slds-rise-from-ground': this.visible,
      'slds-fall-into-ground': !this.visible
    });

    // apply the proper nubbin CSS class
    const {
      horizontal,
      vertical
    } = this.align;
    classes.add({
      'slds-nubbin_top-left': horizontal === 'left' && vertical === 'top',
      'slds-nubbin_top-right': horizontal === 'right' && vertical === 'top',
      'slds-nubbin_bottom-left': horizontal === 'left' && vertical === 'bottom',
      'slds-nubbin_bottom-right': horizontal === 'right' && vertical === 'bottom',
      'slds-nubbin_bottom': horizontal === 'center' && vertical === 'bottom',
      'slds-nubbin_top': horizontal === 'center' && vertical === 'top',
      'slds-nubbin_left': horizontal === 'left' && vertical === 'center',
      'slds-nubbin_right': horizontal === 'right' && vertical === 'center'
    });
    classListMutation(this.classList, classes);
  }
  handleMouseLeave() {
    this.visible = false;
  }
}
registerDecorators(LightningPrimitiveBubble, {
  publicProps: {
    contentId: {
      config: 3
    },
    content: {
      config: 3
    },
    align: {
      config: 3
    },
    visible: {
      config: 3
    }
  },
  track: {
    state: 1
  },
  fields: ["divElement"]
});
var LightningPrimitiveBubble$1 = registerComponent(LightningPrimitiveBubble, {
  tmpl: _tmpl$7
});

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys.push.apply(ownKeys, Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const BUBBLE_ID = `salesforce-lightning-tooltip-bubble_${guid()}`;
function isResizeObserverSupported() {
  return window.ResizeObserver != null;
}
function buildResizeObserver(callback) {
  if (isResizeObserverSupported()) {
    return new ResizeObserver(callback);
  }
  return {
    observe() {},
    unobserve() {}
  };
}
/**
 * Shared instance of a primitive bubble used as a tooltip by most components. This was originally
 * defined in the helptext component which is where the minWidth style came from.
 * TODO: We may want to revisit the minWidth style with the PO and/or UX.
 */
let CACHED_BUBBLE_ELEMENT;
function getCachedBubbleElement() {
  if (!CACHED_BUBBLE_ELEMENT) {
    CACHED_BUBBLE_ELEMENT = createElement('lightning-primitive-bubble', {
      is: LightningPrimitiveBubble$1
    });
    CACHED_BUBBLE_ELEMENT.contentId = BUBBLE_ID;
    CACHED_BUBBLE_ELEMENT.style.position = 'absolute';
    CACHED_BUBBLE_ELEMENT.style.minWidth = '75px';
    // hide bubble element on create
    CACHED_BUBBLE_ELEMENT.classList.add('slds-hide');
    CACHED_BUBBLE_ELEMENT.addEventListener('transitionend', () => {
      // W-7201022 https://gus.lightning.force.com/lightning/r/ADM_Work__c/a07B00000079kNjIAI/view
      // The tooltip uses absolute positioning and visibility gets set to hidden to
      // hide it from view which means it's still part of the document layout.
      // If we don't hide the bubble it could stay on the page and accidentally scroll pages
      // in the console app after a tab switch, especially when the tab content lengths differ.
      if (!CACHED_BUBBLE_ELEMENT.visible) {
        CACHED_BUBBLE_ELEMENT.classList.add('slds-hide');
      }
    });
  }
  return CACHED_BUBBLE_ELEMENT;
}
const ARIA_DESCRIBEDBY$1 = 'aria-describedby';

/**
 * Used as a position offset to compensate for the nubbin. The dimensions of the nubbin are not
 * included in the position library bounding box calculations. This is the size in pixels of the
 * nubbin.
 * TODO: We may want to measure this instead in cases it changes.
 */
const NUBBIN_SIZE = 16;

/**
 * Used in the calculation that moves the tooltip to a location that places the nubbin at the
 * center of the target element. This is the nubbin offset from the edge of the bubble in pixels
 * when using slds-nubbin_bottom-left or slds-nubbin_bottom-right.
 * TODO: We may want to measure this instead in case it changes.
 */
const NUBBIN_OFFSET = 24;

/**
 * Known tooltip types:
 * - info: used in cases where target already has click handlers such as button-icon
 * - toggle: used in cases where target only shows a tooltip such as helptext
 */
const TooltipType = {
  Info: 'info',
  Toggle: 'toggle'
};

/**
 * Allows us to attach a tooltip to components. Typical usage is as follows:
 * - Create an instance of Tooltip
 * - Call Tooltip.initialize() to add the appropriate listeners to the element that needs a tooltip
 * See buttonIcon and buttonMenu for example usage.
 */
class Tooltip {
  /**
   * A shared instance of primitiveBubble is used when an element is not specified in the config
   * object.
   * @param {string} value the content of the tooltip
   * @param {object} config specifies the root component, target element of the tooltip
   */
  constructor(value, config) {
    this._autoPosition = null;
    this._disabled = true;
    this._initialized = false;
    this._visible = false;
    this._config = {};
    assert$3(config.target, 'target for tooltip is undefined or missing');
    this.value = value;
    this._root = config.root;
    this._target = config.target;
    this._config = _objectSpread({}, config);
    this._config.align = config.align || {};
    this._config.targetAlign = config.targetAlign || {};
    this._type = normalizeString(config.type, {
      fallbackValue: TooltipType.Info,
      validValues: Object.values(TooltipType)
    });

    // If a tooltip element is not given, fall back on the globally shared instance.
    this._element = config.element;
    if (!this._element) {
      this._element = getCachedBubbleElement;
      const bubbleElement = getCachedBubbleElement();
      if (bubbleElement.parentNode === null) {
        document.body.appendChild(bubbleElement);
      }
    }
    this.handleDocumentTouch = this.handleDocumentTouch.bind(this);
  }

  /**
   * Disables the tooltip.
   */
  detach() {
    this._disabled = true;
  }

  /**
   * Enables the tooltip.
   */
  attach() {
    this._disabled = false;
  }

  /**
   * Adds the appropriate event listeners to the target element to make the tooltip appear. Also
   * links the tooltip and target element via the aria-describedby attribute for screen readers.
   */
  initialize() {
    const target = this._target();
    if (!this._initialized && target) {
      switch (this._type) {
        case TooltipType.Toggle:
          this.addToggleListeners();
          break;
        case TooltipType.Info:
        default:
          this.addInfoListeners();
          break;
      }
      const ariaDescribedBy = normalizeAriaAttribute([target.getAttribute(ARIA_DESCRIBEDBY$1), this._element().contentId]);
      target.setAttribute(ARIA_DESCRIBEDBY$1, ariaDescribedBy);
      this._initialized = true;
    }
  }
  addInfoListeners() {
    const target = this._target();
    if (!this._initialized && target) {
      ['mouseenter', 'focus'].forEach(name => target.addEventListener(name, () => this.show()));
      // Unlike the tooltip in Aura, we want clicks and keys to dismiss the tooltip.
      ['mouseleave', 'blur', 'click', 'keydown'].forEach(name => target.addEventListener(name, event => this.hideIfNotSelfCover(event)));
    }
  }
  hideIfNotSelfCover(event) {
    if (event.type === 'mouseleave' && event.clientX && event.clientY) {
      // In any chance, if mouseleave is caused by tooltip itself, it would means
      // tooltip cover the target which mostly caused by dynamic resize of tooltip by CSS or JS.
      try {
        const elementMouseIsOver = document.elementFromPoint ? document.elementFromPoint(event.clientX, event.clientY) : null;
        if (elementMouseIsOver === this._element()) {
          if (!isResizeObserverSupported()) {
            this.startPositioning();
          }
          return;
        }
      } catch (ex) {
        // Jest Throw Exception
      }
    }
    this.hide();
  }
  handleDocumentTouch() {
    if (this._visible) {
      this.hide();
    }
  }
  addToggleListeners() {
    const target = this._target();
    if (!this._initialized && target) {
      target.addEventListener('touchstart', e => {
        e.stopPropagation();
        this.toggle();
      });
      ['mouseenter', 'focus'].forEach(name => target.addEventListener(name, () => this.show()));
      ['mouseleave', 'blur'].forEach(name => target.addEventListener(name, event => this.hideIfNotSelfCover(event)));
    }
  }
  get resizeObserver() {
    if (!this._resizeObserver) {
      this._resizeObserver = buildResizeObserver(() => {
        if (this._visible && this._autoPosition) {
          this.startPositioning();
        }
      });
    }
    return this._resizeObserver;
  }
  show() {
    if (this._disabled) {
      return;
    }
    this._visible = true;
    const tooltip = this._element();

    /* We only change the visibility of the cached bubble element here,
       for custom bubble elements, we expect them to react to `visible`
       property change */
    if (CACHED_BUBBLE_ELEMENT) {
      // Show cached bubble element
      CACHED_BUBBLE_ELEMENT.classList.remove('slds-hide');
    }
    tooltip.content = this._value;
    this.startPositioning();
    document.addEventListener('touchstart', this.handleDocumentTouch);
    this.resizeObserver.observe(tooltip);
  }
  hide() {
    this._visible = false;
    const tooltip = this._element();
    tooltip.visible = this._visible;
    this.stopPositioning();
    document.removeEventListener('touchstart', this.handleDocumentTouch);
    this.resizeObserver.unobserve(tooltip);
  }
  toggle() {
    if (this._visible) {
      this.hide();
    } else {
      this.show();
    }
  }
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
    this._disabled = !value;
  }
  get initialized() {
    return this._initialized;
  }
  get visible() {
    return this._visible;
  }
  startPositioning() {
    if (!this._autoPosition) {
      this._autoPosition = new AutoPosition(this._root);
    }

    // The lightning-helptext component was originally left aligned.
    const align = {
      horizontal: this._config.align.horizontal || Direction.Left,
      vertical: this._config.align.vertical || Direction.Bottom
    };
    const targetAlign = {
      horizontal: this._config.targetAlign.horizontal || Direction.Left,
      vertical: this._config.targetAlign.vertical || Direction.Top
    };

    // Pads the tooltip so its nubbin is at the center of the target element.
    const targetBox = this._target().getBoundingClientRect();
    const padLeft = targetBox.width * 0.5 - NUBBIN_OFFSET;
    this._autoPosition.start({
      target: this._target,
      element: this._element,
      align,
      targetAlign,
      autoFlip: true,
      padTop: NUBBIN_SIZE,
      padLeft
    }).then(autoPositionUpdater => {
      // The calculation above may have flipped the alignment of the tooltip. When the
      // tooltip changes alignment we need to update the nubbin class to have it draw in
      // the appropriate place.
      if (autoPositionUpdater) {
        const tooltip = this._element();
        tooltip.align = autoPositionUpdater.config.align;
        tooltip.visible = this._visible;
      }
    });
  }
  stopPositioning() {
    if (this._autoPosition) {
      this._autoPosition.stop();
    }
  }
}
registerDecorators(Tooltip, {
  fields: ["_autoPosition", "_disabled", "_initialized", "_visible", "_config"]
});

const i18n = {
  loading: labelLoading,
  showMenu: labelShowMenu
};

// CSS class and selectors for menu items
const menuItemCSSClassName = 'slds-dropdown__item';
const menuItemCSSSelector = `.slds-dropdown__list .${menuItemCSSClassName}`;
const validMenuAlignments = ['left', 'center', 'right', 'bottom-left', 'bottom-center', 'bottom-right'];

// remove-next-line-for-c-namespace
validMenuAlignments.push(...['auto', 'auto-right', 'auto-left']);

/**
 * Represents a dropdown menu with a list of actions or functions.
 * @slot default Placeholder for menu-item
 */
class LightningButtonMenu extends BaseLightningElement {
  constructor(...args) {
    super(...args);
    this.displayDropdown = false;
    this.iconSize = 'medium';
    this.iconName = 'utility:down';
    this.value = '';
    this.alternativeText = i18n.showMenu;
    this.loadingStateAlternativeText = i18n.loading;
    this.label = void 0;
    this.draftAlternativeText = void 0;
    this._accesskey = null;
    this._disabled = false;
    this._dropdownVisible = false;
    this._dropdownOpened = false;
    this._nubbin = false;
    this._title = null;
    this._isDraft = false;
    this._isLoading = false;
    this._focusOnIndexDuringRenderedCallback = null;
    this._tabindex = 0;
    this._order = null;
    this._variant = 'border';
    this._positioning = false;
    this._menuAlignment = 'left';
    this._boundingRect = {};
    this._tooltip = null;
    this._needsFocusAfterRender = false;
  }
  /**
   * The size of the icon.
   * Options include xx-small, x-small, small, medium, or large.
   * This value defaults to medium.
   *
   * @type {string}
   * @default medium
   */
  /**
   * The name of the icon to be used in the format 'utility:down'.
   * If an icon other than 'utility:down' or 'utility:chevrondown' is used,
   * a utility:down icon is appended to the right of that icon.
   * This value defaults to utility:down.
   *
   * @type {string}
   * @default utility:down
   */
  /**
   * The value for the button element.
   * This value is optional and can be used when submitting a form.
   *
   * @type {string}
   */
  /**
   * The assistive text for the button.
   *
   * @type {string}
   */
  /**
   * Message displayed while the menu is in the loading state.
   *
   * @type {string}
   */
  /**
   * Optional text to be shown on the button.
   *
   * @type {string}
   */
  /**
   * Describes the reason for showing the draft indicator.
   * This is required when is-draft is true.
   *
   * @type {string}
   */
  // remove-next-line-for-c-namespace
  connectedCallback() {
    this._connected = true;
    this.keyboardInterface = this.menuKeyboardInterface();
    this.classList.add('slds-dropdown-trigger', 'slds-dropdown-trigger_click');
    if (this.isDraft) {
      this.classList.add('slds-is-unsaved');
    }

    // button-group necessities
    const privatebuttonregister = new CustomEvent('privatebuttonregister', {
      bubbles: true,
      detail: {
        callbacks: {
          setOrder: this.setOrder.bind(this),
          setDeRegistrationCallback: deRegistrationCallback => {
            this._deRegistrationCallback = deRegistrationCallback;
          }
        }
      }
    });
    this.dispatchEvent(privatebuttonregister);
  }
  disconnectedCallback() {
    this._connected = false;
    if (this._deRegistrationCallback) {
      this._deRegistrationCallback();
    }
  }
  renderedCallback() {
    // remove-next-line-for-c-namespace
    this.initTooltip();

    // if we are using autopositioning focus happens in its own cycle
    if (!this._positioning && this._dropdownVisible) {
      // logic to focus on first menu item after render
      this.focusOnMenuItemAfterRender();
    }
  }

  /**
   * The variant changes the look of the button.
   * Accepted variants include bare, container, border, border-filled, bare-inverse, and border-inverse.
   * This value defaults to border.
   *
   * @type {string}
   * @default border
   */
  get variant() {
    return this._variant;
  }
  set variant(variant) {
    this._variant = normalizeString(variant, {
      fallbackValue: 'border',
      validValues: ['border', 'border-inverse', 'border-filled', 'bare', 'bare-inverse', 'container']
    });
  }

  /**
   * Determines the alignment of the menu relative to the button.
   * Available options are: auto, left, center, right, bottom-left, bottom-center, bottom-right.
   * The auto option aligns the dropdown menu based on available space.
   * This value defaults to left.
   *
   * @type {string}
   * @default left
   */
  get menuAlignment() {
    return this._menuAlignment;
  }
  set menuAlignment(value) {
    this._menuAlignment = normalizeString(value, {
      fallbackValue: 'left',
      validValues: validMenuAlignments
    });
  }

  /**
   * If present, the menu can be opened by users.
   * @type {boolean}
   * @default false
   */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = normalizeBoolean(value);
  }

  /**
   * If present, a nubbin is present on the menu.
   * A nubbin is a stub that protrudes from the menu item towards the button menu.
   * The nubbin position is based on the menu-alignment.
   * @type {boolean}
   * @default false
   */
  get nubbin() {
    return this._nubbin;
  }
  set nubbin(value) {
    this._nubbin = normalizeBoolean(value);
  }

  /**
   * Displays tooltip text when the mouse moves over the button menu.
   * @type {string}
   */
  get title() {
    return this._title;
  }
  set title(newValue) {
    this._title = newValue;
  }

  /**
   * If present, the menu trigger shows a draft indicator.
   * @type {boolean}
   * @default false
   */
  get isDraft() {
    return this._isDraft;
  }
  set isDraft(value) {
    this._isDraft = normalizeBoolean(value);
  }

  /**
   * If present, the menu is in a loading state and shows a spinner.
   * @type {boolean}
   * @default false
   */
  get isLoading() {
    return this._isLoading;
  }
  set isLoading(value) {
    const normalizedValue = normalizeBoolean(value);
    if (this.isAutoAlignment()) {
      // stop previous positioning if any as it maintains old position relationship
      this.stopPositioning();
      if (this._isLoading && !normalizedValue) {
        // was loading before and now is not, we need to reposition
        // remove-next-line-for-c-namespace
        this.startPositioning();
      }
    }
    this._isLoading = normalizedValue;
  }

  /**
   * The keyboard shortcut for the button menu.
   * @type {string}
   */
  get accessKey() {
    return this._accesskey;
  }
  set accessKey(newValue) {
    this._accesskey = newValue;
  }

  // remove-next-line-for-c-namespace
  /**
   * Text to display when the user mouses over or focuses on the button.
   * The tooltip is auto-positioned relative to the button and screen space.
   * @type {string}
   */
  get tooltip() {
    return this._tooltip ? this._tooltip.value : undefined;
  }

  // remove-next-line-for-c-namespace
  set tooltip(value) {
    if (this._tooltip) {
      this._tooltip.value = value;
    } else if (value) {
      // Note that because the tooltip target is a child element it may not be present in the
      // dom during initial rendering.
      this._tooltip = new Tooltip(value, {
        root: this,
        target: () => this.template.querySelector('button')
      });
      this._tooltip.initialize();
    }
  }

  /**
   * Sets focus on the button.
   */
  focus() {
    if (this._connected) {
      this.focusOnButton();
    }
  }

  /**
   * Clicks the button.
   */
  click() {
    if (this._connected) {
      this.template.querySelector('button').click();
    }
  }
  get computedAriaExpanded() {
    return String(this._dropdownVisible); // default value must be a string for the attribute to always be present with a string value
  }

  // remove-next-line-for-c-namespace
  initTooltip() {
    if (this._tooltip && !this._tooltip.initialized) {
      this._tooltip.initialize();
    }
  }
  focusOnMenuItemAfterRender() {
    // if no menu items are focused then set focus on the first or last one once registered
    // :: this can occur if there's a delay in loading the menu items (loading from server for example)
    // :: revealing the menu in an empty state to later have menu items loaded
    let focusOnIndex = this._focusOnIndexDuringRenderedCallback || 0;

    // if focus index is greater than the size of the list,
    // or next focus should be on LAST,
    // set to the last item
    const menuItems = this.getMenuItems();

    // if specified as 'LAST' set it to a valid numeric value instead
    if (focusOnIndex === 'LAST') {
      focusOnIndex = menuItems.length - 1;

      // maintain 'LAST' value if menu items aren't available yet
      if (focusOnIndex < 0) {
        focusOnIndex = 'LAST';
      }
    }

    // only perform operations when we have a valid numeric index
    if (focusOnIndex !== 'LAST') {
      if (focusOnIndex > menuItems.length - 1 && menuItems.length > 0) {
        focusOnIndex = menuItems.length - 1;
      }

      // set the focus
      this.focusOnMenuItem(focusOnIndex);

      // reset tracker value
      this._focusOnIndexDuringRenderedCallback = null;
    }
  }
  get computedAccessKey() {
    return this._accesskey;
  }
  get computedTitle() {
    return this._title;
  }
  get computedAlternativeText() {
    return this.alternativeText || i18n.showMenu;
  }
  get computedLoadingStateAlternativeText() {
    return this.loadingStateAlternativeText || i18n.loading;
  }
  get computedButtonClass() {
    const isDropdownIcon = !this.computedShowDownIcon;
    const isBare = this.variant === 'bare' || this.variant === 'bare-inverse';
    const classes = classSet('slds-button');
    if (this.label) {
      classes.add({
        'slds-button_neutral': this.variant === 'border',
        'slds-button_inverse': this.variant === 'border-inverse'
      });
    } else {
      // The inverse check is to allow for a combination of a non-default icon and an -inverse variant
      const useMoreContainer = this.variant === 'container' || this.variant === 'bare-inverse' || this.variant === 'border-inverse';
      classes.add({
        'slds-button_icon': !isDropdownIcon,
        'slds-button_icon-bare': isBare,
        'slds-button_icon-more': !useMoreContainer && !isDropdownIcon,
        'slds-button_icon-container-more': useMoreContainer && !isDropdownIcon,
        'slds-button_icon-container': this.variant === 'container' && isDropdownIcon,
        'slds-button_icon-border': this.variant === 'border' && isDropdownIcon,
        'slds-button_icon-border-filled': this.variant === 'border-filled',
        'slds-button_icon-border-inverse': this.variant === 'border-inverse',
        'slds-button_icon-inverse': this.variant === 'bare-inverse',
        'slds-button_icon-xx-small': this.iconSize === 'xx-small' && !isBare,
        'slds-button_icon-x-small': this.iconSize === 'x-small' && !isBare,
        'slds-button_icon-small': this.iconSize === 'small' && !isBare,
        'slds-button_icon-large': this.iconSize === 'large' && !isBare
      });
    }
    return classes.add({
      // order classes when part of a button-group
      'slds-button_first': this._order === 'first',
      'slds-button_middle': this._order === 'middle',
      'slds-button_last': this._order === 'last'
    }).toString();
  }
  get computedShowDownIcon() {
    return !(this.iconName === 'utility:down' || this.iconName === 'utility:chevrondown');
  }
  get computedDropdownClass() {
    return classSet('slds-dropdown').add({
      'slds-dropdown_left': this.menuAlignment === 'left' || this.isAutoAlignment(),
      'slds-dropdown_center': this.menuAlignment === 'center',
      'slds-dropdown_right': this.menuAlignment === 'right',
      'slds-dropdown_bottom': this.menuAlignment === 'bottom-center',
      'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right': this.menuAlignment === 'bottom-right',
      'slds-dropdown_bottom slds-dropdown_left slds-dropdown_bottom-left': this.menuAlignment === 'bottom-left',
      'slds-nubbin_top-left': this.nubbin && this.menuAlignment === 'left',
      'slds-nubbin_top-right': this.nubbin && this.menuAlignment === 'right',
      'slds-nubbin_top': this.nubbin && this.menuAlignment === 'center',
      'slds-nubbin_bottom-left': this.nubbin && this.menuAlignment === 'bottom-left',
      'slds-nubbin_bottom-right': this.nubbin && this.menuAlignment === 'bottom-right',
      'slds-nubbin_bottom': this.nubbin && this.menuAlignment === 'bottom-center',
      'slds-p-vertical_large': this.isLoading
    }).toString();
  }
  handleMenuItemPrivateSelect(event) {
    if (this._dropdownVisible) {
      this.toggleMenuVisibility();
      this.focusOnButton();
    }
    event.stopPropagation();
    this.dispatchSelect(event);
  }
  dispatchSelect(event) {
    this.dispatchEvent(new CustomEvent('select', {
      cancelable: true,
      detail: {
        value: event.detail.value // pass value through from original private event
      }
    }));
  }

  handleButtonClick() {
    this.allowBlur();
    this.toggleMenuVisibility();

    // Focus on the button even if the browser doesn't do it by default
    // (the behaviour differs between Chrome, Safari, Firefox)
    this.focusOnButton();
  }
  handleButtonKeyDown(event) {
    handleKeyDownOnMenuTrigger(event, this.keyboardInterface);
  }
  handleButtonMouseDown(event) {
    const mainButton = 0;
    if (event.button === mainButton) {
      this.cancelBlur();
    }
  }
  handleDropdownMouseDown(event) {
    // if the menu contais a scrollbar due to large number of menu-items
    // this is needed so that menu doesnt close on dragging the scrollbar with the mouse
    const mainButton = 0;
    if (event.button === mainButton) {
      this.cancelBlur();
    }
  }
  handleDropdownMouseUp() {
    // We need this to make sure that if a scrollbar is being dragged with the mouse, upon release
    // of the drag we allow blur, otherwise the dropdown would not close on blur since we'd have cancel blur
    // set
    this.allowBlur();
  }
  handleDropdownMouseLeave() {
    // this is to close the menu after mousedown happens on scrollbar
    // in this case we close immediately if no menu-items were hovered/focused
    // without this the menu would remain open since the blur on the menuitems has happened already
    // when clicking the scrollbar
    if (!this._menuHasFocus) {
      this.close();
    }
  }
  handleDropdownScroll(event) {
    // We don't want this to bubble up to the modal which due to event retargeting wouldn't be able
    // to know what is actually being scrolled and thus may lead to the scrolling of the modal
    event.stopPropagation();
  }
  focusOnButton() {
    this.template.querySelector('button').focus();
  }
  focusOnMenuItem(itemIndex) {
    if (this._dropdownVisible) {
      const menuItem = this.getMenuItemByIndex(itemIndex);
      this.cancelBlurAndFocusOnMenuItem(menuItem);
    }
  }
  isAutoAlignment() {
    return this.menuAlignment.startsWith('auto');
  }

  // remove-next-line-for-c-namespace
  startPositioning() {
    if (!this.isAutoAlignment()) {
      return Promise.resolve();
    }
    this._positioning = true;
    const align = {
      horizontal: Direction.Left,
      vertical: Direction.Top
    };
    const targetAlign = {
      horizontal: Direction.Left,
      vertical: Direction.Bottom
    };
    let autoFlip = true;
    let autoFlipVertical;
    if (this.menuAlignment === 'auto-right') {
      align.horizontal = Direction.Right;
      targetAlign.horizontal = Direction.Right;
    }
    if (this.menuAlignment === 'auto-right' || this.menuAlignment === 'auto-left') {
      autoFlip = false;
      autoFlipVertical = true;
    }
    return animationFrame().then(() => {
      this.stopPositioning();
      this._autoPosition = startPositioning(this, {
        target: () => this.template.querySelector('button'),
        element: () => this.template.querySelector('.slds-dropdown'),
        align,
        targetAlign,
        autoFlip,
        autoFlipVertical,
        scrollableParentBound: true,
        keepInViewport: true
      }, true);
      // Edge case: W-7460656
      if (this._autoPosition) {
        return this._autoPosition.reposition();
      }
      return Promise.reject();
    }).then(() => {
      this._needsFocusAfterRender = true;
      return timeout(0);
    }).then(() => {
      // focus on the first item in next cycle
      // Use a flag to prevent this async function from executing multiple times in a single lifecycle
      // TODO: add reason why we need to dedupe
      this._positioning = false;
      if (this._needsFocusAfterRender) {
        this.focusOnMenuItemAfterRender();
        this._needsFocusAfterRender = false;
      }
    });
  }

  // remove-next-line-for-c-namespace
  stopPositioning() {
    if (this._autoPosition) {
      stopPositioning(this._autoPosition);
      this._autoPosition = null;
    }
    this._positioning = false;
  }
  toggleMenuVisibility() {
    if (!this.disabled) {
      this._dropdownVisible = !this._dropdownVisible;
      if (!this._dropdownOpened && this._dropdownVisible) {
        this._dropdownOpened = true;
      }
      if (this._dropdownVisible) {
        // remove-next-line-for-c-namespace
        this.startPositioning();
        this.dispatchEvent(new CustomEvent('open'));

        // update the bounding rect when the menu is toggled
        this._boundingRect = this.getBoundingClientRect();
        this.pollBoundingRect();
      } else {
        // remove-next-line-for-c-namespace
        this.stopPositioning();
      }
      this.classList.toggle('slds-is-open');
    }
  }
  getMenuItems() {
    return Array.from(this.querySelectorAll(menuItemCSSSelector));
  }
  getMenuItemByIndex(index) {
    return this.getMenuItems()[index];
  }
  findMenuItemIndex(menuItemElement) {
    return this.getMenuItems().indexOf(menuItemElement);
  }
  findMenuItemFromEventTarget(element) {
    let currentNode = element;
    const stopAtElement = this.template.querySelector("[role='menu']");
    while (currentNode !== stopAtElement) {
      if (currentNode.classList && currentNode.classList.contains(menuItemCSSClassName)) {
        return currentNode;
      }
      if (currentNode.parentNode) {
        currentNode = currentNode.parentNode;
      } else {
        return null;
      }
    }
    return null;
  }
  handleKeyOnMenuItem(event) {
    const menuItem = this.findMenuItemFromEventTarget(event.target);
    if (menuItem) {
      handleKeyDownOnMenuItem(event, this.findMenuItemIndex(menuItem), this.keyboardInterface);
    }
  }
  handleMouseOverOnMenuItem(event) {
    const menuItem = this.findMenuItemFromEventTarget(event.target);
    if (menuItem) {
      const menuItemIndex = this.findMenuItemIndex(menuItem);
      this.focusOnMenuItem(menuItemIndex);
    }
  }
  cancelBlurAndFocusOnMenuItem(menuItem) {
    if (menuItem) {
      // prevent blur during a non-blurring focus change
      // set lock so that while focusing on menutitem, menu doesnt close
      this.cancelBlur();
      menuItem.focus();
    }
    // allowBlur is called when the menu items receives focus
  }

  handleFocus() {
    this.dispatchEvent(new CustomEvent('focus'));
  }
  handlePrivateBlur(event) {
    // The event may be synthetic from the menu items
    event.stopPropagation();

    // perform common blurring behavior
    this.handleBlur();
    this._menuHasFocus = false;
  }
  handlePrivateFocus(event) {
    // synthetic from the menu items
    event.stopPropagation();
    // reset the cancelBlur so any clicks outside the menu can now close the menu
    this.allowBlur();
    this._menuHasFocus = true;
  }
  handleBlur() {
    // Don't handle the blur event if the focus events are inside the menu (see the cancelBlur/allowBlur functions)
    if (this._cancelBlur) {
      return;
    }
    // Hide only when the focus moved away from the container
    if (this._dropdownVisible) {
      this.toggleMenuVisibility();
    }

    // dispatch standard blur event
    this.dispatchEvent(new CustomEvent('blur'));
  }
  allowBlur() {
    this._cancelBlur = false;
  }
  cancelBlur() {
    this._cancelBlur = true;
  }
  menuKeyboardInterface() {
    const that = this;
    return {
      getTotalMenuItems() {
        return that.getMenuItems().length;
      },
      focusOnIndex(index) {
        that.focusOnMenuItem(index);
      },
      setNextFocusIndex(index) {
        that._focusOnIndexDuringRenderedCallback = index;
      },
      returnFocus() {
        that.focusOnButton();
      },
      isMenuVisible() {
        return that._dropdownVisible;
      },
      toggleMenuVisibility() {
        that.toggleMenuVisibility();
      },
      focusMenuItemWithText(text) {
        const match = [...that.getMenuItems()].filter(menuItem => {
          const label = menuItem.label;
          return label && label.toLowerCase().indexOf(text) === 0;
        });
        if (match.length > 0) {
          that.focusOnMenuItem(match[0]);
        }
      }
    };
  }

  /**
   * {Function} setOrder - Sets the order value of the button when in the context of a button-group or other ordered component
   * @param {String} order -  The order string (first, middle, last)
   */
  setOrder(order) {
    this._order = order;
  }

  /**
   * {Function} close - Closes the dropdown if it's open
   */
  close() {
    // should only do something if dropdown is visible
    if (this._dropdownVisible) {
      this.toggleMenuVisibility();
    }
  }

  /**
   * Poll for change in bounding rectangle
   * only if it is menuAlignment=auto since that is
   * position:fixed and is opened
   */
  pollBoundingRect() {
    // only poll if the dropdown is auto aligned
    if (this.isAutoAlignment() && this._dropdownVisible) {
      // eslint-disable-next-line @lwc/lwc/no-async-operation
      setTimeout(() => {
        if (this._connected) {
          observePosition(this, 300, this._boundingRect, () => {
            this.close();
          });

          // continue polling
          this.pollBoundingRect();
        }
      }, 250 // check every 0.25 second
      );
    }
  }
}
LightningButtonMenu.delegatesFocus = true;
registerDecorators(LightningButtonMenu, {
  publicProps: {
    iconSize: {
      config: 0
    },
    iconName: {
      config: 0
    },
    value: {
      config: 0
    },
    alternativeText: {
      config: 0
    },
    loadingStateAlternativeText: {
      config: 0
    },
    label: {
      config: 0
    },
    draftAlternativeText: {
      config: 0
    },
    variant: {
      config: 3
    },
    menuAlignment: {
      config: 3
    },
    disabled: {
      config: 3
    },
    nubbin: {
      config: 3
    },
    title: {
      config: 3
    },
    isDraft: {
      config: 3
    },
    isLoading: {
      config: 3
    },
    accessKey: {
      config: 3
    },
    tooltip: {
      config: 3
    }
  },
  publicMethods: ["focus", "click"],
  track: {
    _accesskey: 1,
    _disabled: 1,
    _dropdownVisible: 1,
    _dropdownOpened: 1,
    _nubbin: 1,
    _title: 1,
    _isDraft: 1,
    _isLoading: 1,
    _focusOnIndexDuringRenderedCallback: 1,
    _tabindex: 1,
    _order: 1,
    _variant: 1
  },
  fields: ["displayDropdown", "_positioning", "_menuAlignment", "_boundingRect", "_tooltip", "_needsFocusAfterRender"]
});
var _lightningButtonMenu = registerComponent(LightningButtonMenu, {
  tmpl: _tmpl$6
});

function stylesheet$2(hostSelector, shadowSelector, nativeShadow) {
  return ["\n", (nativeShadow ? ":host {display: block;}" : [hostSelector, " {display: block;}"].join('')), "\n"].join('');
}
var _implicitStylesheets$2 = [stylesheet$2];

function tmpl$7($api, $cmp, $slotset, $ctx) {
  const {
    c: api_custom_element,
    t: api_text,
    h: api_element,
    d: api_dynamic,
    ti: api_tab_index,
    b: api_bind
  } = $api;
  const {
    _m0,
    _m1,
    _m2,
    _m3
  } = $ctx;
  return [api_element("a", {
    attrs: {
      "href": $cmp.computedHref,
      "target": $cmp._target,
      "role": $cmp.computedRole,
      "tabindex": api_tab_index($cmp.computedTabIndex),
      "accesskey": $cmp.computedAccessKey,
      "aria-checked": $cmp.computedAriaChecked,
      "aria-disabled": $cmp.computedAriaDisabled,
      "download": $cmp.download
    },
    key: 5,
    on: {
      "click": _m0 || ($ctx._m0 = api_bind($cmp.handleClick)),
      "focus": _m1 || ($ctx._m1 = api_bind($cmp.handleFocus)),
      "keydown": _m2 || ($ctx._m2 = api_bind($cmp.handleKeyDown)),
      "blur": _m3 || ($ctx._m3 = api_bind($cmp.handleBlur))
    }
  }, [api_element("span", {
    classMap: {
      "slds-truncate": true
    },
    key: 3
  }, [$cmp.isMenuItemCheckbox ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": "utility:check",
      "size": "x-small",
      "svgClass": $cmp.computedCheckedIconClass,
      "variant": "bare"
    },
    key: 0
  }, []) : null, $cmp.isDraft ? api_element("abbr", {
    classMap: {
      "slds-indicator_unsaved": true
    },
    attrs: {
      "title": $cmp.draftAlternativeText
    },
    key: 1
  }, [api_text("*")]) : null, $cmp.prefixIconName ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": $cmp.prefixIconName,
      "size": "x-small",
      "svgClass": "slds-icon slds-icon_x-small slds-icon-text-default slds-m-right_x-small",
      "variant": "bare"
    },
    key: 2
  }, []) : null, api_dynamic($cmp.label)]), $cmp.iconName ? api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": $cmp.iconName,
      "size": "x-small",
      "svgClass": "slds-icon-text-default slds-m-left_small slds-shrink-none",
      "variant": "bare"
    },
    key: 4
  }, []) : null])];
}

var _tmpl$8 = registerTemplate(tmpl$7);
tmpl$7.stylesheets = [];

if (_implicitStylesheets$2) {
  tmpl$7.stylesheets.push.apply(tmpl$7.stylesheets, _implicitStylesheets$2);
}
tmpl$7.stylesheetTokens = {
  hostAttribute: "lightning-menuItem_menuItem-host",
  shadowAttribute: "lightning-menuItem_menuItem"
};

/**
 * Represents a list item in a menu.
 */
class LightningMenuItem extends BaseLightningElement {
  constructor(...args) {
    super(...args);
    this.value = void 0;
    this.label = void 0;
    this.iconName = void 0;
    this.download = void 0;
    this._accesskey = null;
    this._disabled = false;
    this._tabindex = '-1';
    this._checked = undefined;
    this._isDraft = false;
    this._target = null;
    this.prefixIconName = void 0;
    this.href = void 0;
    this.draftAlternativeText = void 0;
  }
  /**
   * A value associated with the menu item.
   * @type {string}
   */
  /**
   * Text of the menu item.
   * @type {string}
   */
  /**
   * The name of an icon to display after the text of the menu item.
   * @type {string}
   */
  /**
   * The name of a file that's downloaded when clicking a link in the menu item. Used with the href attribute.
   * @type {string}
   */
  /**
   * The name of an icon to display before the text of the menu item.
   * @type {string}
   */
  /**
   * URL for a link to use for the menu item.
   * @type {string}
   */
  /**
   * Describes the reason for showing the draft indicator.
   * This is required when is-draft is present on the lightning-menu-item tag.
   * @type {string}
   */
  connectedCallback() {
    this.classList.add('slds-dropdown__item');
    this.setAttribute('role', 'presentation');
  }

  /**
   * If present, a draft indicator is shown on the menu item.
   * A draft indicator is denoted by blue asterisk on the left of the menu item.
   * When you use a draft indicator, include alternative text for accessibility using draft-alternative-text.
   * @type {boolean}
   * @default false
   */
  get isDraft() {
    return this._isDraft;
  }
  set isDraft(value) {
    this._isDraft = normalizeBoolean(value);
  }

  /**
   * The keyboard shortcut for the menu item.
   * @type {string}
   */
  get accessKey() {
    return this._accesskey;
  }
  set accessKey(newValue) {
    this._accesskey = newValue;
    this.handleAccessKeyChange(newValue);
  }

  /**
   * Reserved for internal use. Use tabindex instead to indicate if an element should be focusable.
   * tabindex can be set to 0 or -1.
   * The default tabindex value is 0, which means that the menu item is focusable and
   * participates in sequential keyboard navigation. The value -1 means
   * that the menu item is focusable but does not participate in keyboard navigation.
   * @type {number}
   */
  get tabIndex() {
    return this._tabindex;
  }
  set tabIndex(newValue) {
    this._tabindex = newValue;
    this.handleTabIndexChange(newValue);
  }

  /**
   * Determines how a link in the href attribute is opened. Valid values include '_self' and '_blank'.
   * The default is '_self', which opens the link in the current browser tab.
   * '_blank' opens the link in a new browser tab.
   * @type {string}
   * @default undefined
   */
  get target() {
    return this._target;
  }
  set target(newValue) {
    this._target = normalizeString(newValue, {
      fallbackValue: null,
      validValues: ['_self', '_blank']
    });
  }
  handleAccessKeyChange(value) {
    this._accesskey = value;
  }
  handleTabIndexChange(value) {
    this._tabindex = value;
  }
  get computedAccessKey() {
    return this._accesskey;
  }
  get computedTabIndex() {
    return this._tabindex;
  }

  /**
   * If present, the menu item is disabled and users cannot interact with it.
   * @type {boolean}
   * @default false
   */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = normalizeBoolean(value);
  }

  /**
   * If present, a check mark displays on the left of the menu item if it's selected.
   * @type {boolean}
   * @default false
   */
  get checked() {
    return this._checked;
  }
  set checked(value) {
    if (typeof value === 'string') {
      // handle string
      value = normalizeString(value, {
        fallbackValue: undefined,
        validValues: ['true', 'false']
      });
      if (value !== undefined) {
        value = value === 'true';
      }
    }
    if (value !== undefined) {
      // handle boolean which is from above or user
      value = normalizeBoolean(value);
    }
    this._checked = value;
    this.classList.toggle('slds-is-selected', this.checked === true);
  }
  get computedCheckedIconClass() {
    // note that what .slds-icon_selected does is to hide the checked icon
    return classSet('slds-icon slds-icon_x-small slds-icon-text-default slds-m-right_x-small').add({
      'slds-icon_selected': !this.checked
    }).toString();
  }
  get computedHref() {
    // eslint-disable-next-line no-script-url
    return this.href ? this.href : 'javascript:void(0)';
  }
  get computedAriaChecked() {
    return this.isMenuItemCheckbox ? this.checked + '' : null;
  }
  get computedAriaDisabled() {
    // Note: Needed to explicitly set aria-disabled="true"
    return this.disabled ? 'true' : 'false';
  }
  get isMenuItemCheckbox() {
    return this.checked !== undefined;
  }
  get computedRole() {
    return this.isMenuItemCheckbox ? 'menuitemcheckbox' : 'menuitem';
  }
  handleBlur() {
    this.dispatchEvent(new CustomEvent('blur'));

    // we need to trigger a private blur to make it bubble and be handled by parent button-menu
    this.dispatchEvent(new CustomEvent('privateblur', {
      composed: true,
      bubbles: true,
      cancelable: true
    }));
  }
  handleFocus() {
    // trigger a private focus to make it bubble and be handled by parent button-menu
    // this is used for resetting cancelBlur in button-menu
    this.dispatchEvent(new CustomEvent('privatefocus', {
      bubbles: true,
      cancelable: true
    }));
  }
  handleClick(event) {
    // no action needed when item is disabled
    if (this.disabled) {
      event.preventDefault();
      // do nothing and return
      return;
    }

    // allow HREF to be followed
    if (this.href) ; else {
      event.preventDefault();
      this.dispatchSelect();
    }
  }
  handleKeyDown(event) {
    // no action needed when item is disabled
    if (this.disabled) {
      // do nothing and return
      return;
    }
    if (event.keyCode === keyCodes.space) {
      // follow HREF if a value was provided
      if (this.href) {
        // trigger click behavior
        this.template.querySelector('a').click();
      } else {
        // if no HREF is provided follow usual select behavior
        this.dispatchSelect();
      }
    }
  }

  /**
   *
   * The select event is a non-navigational event.
   * The purpose of the event is to toggle the selected state of a menu item.
   * It will not be dispatched if a menu item has an HREF value to navigate to (other than the default).
   * This event will be handled by the parent button-menu component.
   *
   **/
  dispatchSelect() {
    if (!this.disabled) {
      this.dispatchEvent(new CustomEvent('privateselect', {
        bubbles: true,
        cancelable: true,
        detail: {
          value: this.value
        }
      }));
    }
  }

  /**
   * Sets focus on the anchor element in the menu item.
   */
  focus() {
    // set the focus on the anchor element
    this.template.querySelector('a').focus();
    // dispatch a focus event for the menu item component
    this.dispatchEvent(new CustomEvent('focus'));
  }

  /**
   * Clicks the anchor.
   */
  click() {
    const anchor = this.template.querySelector('a');
    if (anchor) {
      anchor.click();
    }
  }
}
registerDecorators(LightningMenuItem, {
  publicProps: {
    value: {
      config: 0
    },
    label: {
      config: 0
    },
    iconName: {
      config: 0
    },
    download: {
      config: 0
    },
    prefixIconName: {
      config: 0
    },
    href: {
      config: 0
    },
    draftAlternativeText: {
      config: 0
    },
    isDraft: {
      config: 3
    },
    accessKey: {
      config: 3
    },
    tabIndex: {
      config: 3
    },
    target: {
      config: 3
    },
    disabled: {
      config: 3
    },
    checked: {
      config: 3
    }
  },
  publicMethods: ["focus", "click"],
  track: {
    _accesskey: 1,
    _disabled: 1,
    _tabindex: 1,
    _checked: 1,
    _isDraft: 1,
    _target: 1
  }
});
var _lightningMenuItem = registerComponent(LightningMenuItem, {
  tmpl: _tmpl$8
});

function tmpl$8($api, $cmp, $slotset, $ctx) {
  const {
    b: api_bind,
    h: api_element,
    d: api_dynamic,
    c: api_custom_element
  } = $api;
  const {
    _m0
  } = $ctx;
  return [$cmp._src ? api_element("img", {
    attrs: {
      "src": $cmp._src,
      "alt": $cmp.alternativeText,
      "title": $cmp.alternativeText
    },
    key: 0,
    on: {
      "error": _m0 || ($ctx._m0 = api_bind($cmp.handleImageError))
    }
  }, []) : null, $cmp.showInitials ? api_element("abbr", {
    className: $cmp.computedInitialsClass,
    attrs: {
      "title": $cmp.alternativeText
    },
    key: 1
  }, [api_dynamic($cmp.initials)]) : null, $cmp.showIcon ? api_custom_element("lightning-icon", _lightningIcon, {
    props: {
      "iconName": $cmp.fallbackIconName,
      "alternativeText": $cmp.alternativeText,
      "title": $cmp.alternativeText
    },
    key: 2
  }, []) : null];
}

var _tmpl$9 = registerTemplate(tmpl$8);
tmpl$8.stylesheets = [];
tmpl$8.stylesheetTokens = {
  hostAttribute: "lightning-avatar_avatar-host",
  shadowAttribute: "lightning-avatar_avatar"
};

const DEFAULT_SIZE = 'medium';
const DEFAULT_VARIANT = 'square';

/**
 * A visual representation of an object.
 */
class LightningAvatar extends BaseLightningElement {
  constructor(...args) {
    super(...args);
    this.alternativeText = '';
    this.fallbackIconName = void 0;
    this.initials = void 0;
    this._size = DEFAULT_SIZE;
    this._src = '';
    this._variant = DEFAULT_VARIANT;
  }
  /**
   * The alternative text used to describe the avatar, which is displayed as
   * hover text on the image.
   *
   * @type {string}
   * @required
   */
  /**
   * The Lightning Design System name of the icon used as a fallback when the
   * image fails to load. The initials fallback relies on this for its
   * background color. Names are written in the format 'standard:account'
   * where 'standard' is the category, and 'account' is the specific icon to
   * be displayed. Only icons from the standard and custom categories are
   * allowed.
   *
   * @type {string}
   */
  /**
   * If the record name contains two words, like first and last name, use the
   * first capitalized letter of each. For records that only have a single
   * word name, use the first two letters of that word using one capital and
   * one lower case letter.
   *
   * @type {string}
   */
  /**
   * The size of the avatar. Valid values are x-small, small, medium, and large. This value defaults to medium.
   *
   * @type {string}
   * @default medium
   */
  get size() {
    return this._size;
  }
  set size(value) {
    this._size = normalizeString(value, {
      fallbackValue: DEFAULT_SIZE,
      validValues: ['x-small', 'small', 'medium', 'large']
    });
    this.updateClassList();
  }

  /**
   * The URL for the image.
   *
   * @type {string}
   * @required
   */
  get src() {
    return this._src;
  }
  set src(value) {
    this._src = typeof value === 'string' && value.trim() || '';
  }

  /**
   * The variant changes the shape of the avatar. Valid values are empty,
   * circle, and square. This value defaults to square.
   *
   * @type {string}
   * @default square
   */
  get variant() {
    return this._variant;
  }
  set variant(value) {
    this._variant = normalizeString(value, {
      fallbackValue: DEFAULT_VARIANT,
      validValues: ['circle', 'square']
    });
    this.updateClassList();
  }
  connectedCallback() {
    this.updateClassList();
  }

  // update custom element's classList
  updateClassList() {
    const size = this._size;
    const variant = this._variant;
    const classes = classSet('slds-avatar').add({
      'slds-avatar_x-small': size === 'x-small',
      'slds-avatar_small': size === 'small',
      'slds-avatar_medium': size === 'medium',
      'slds-avatar_large': size === 'large'
    }).add({
      'slds-avatar_circle': variant === 'circle'
    });
    classListMutation(this.classList, classes);
  }
  get computedInitialsClass() {
    return classSet('slds-avatar__initials').add(computeSldsClass(this.fallbackIconName)).toString();
  }
  get showInitials() {
    return !this._src && this.initials;
  }
  get showIcon() {
    return !this._src && !this.initials;
  }
  handleImageError(event) {
    // eslint-disable-next-line no-console
    console.warn(`<lightning-avatar> Image with src="${event.target.src}" failed to load.`);
    this._src = '';
  }
}
registerDecorators(LightningAvatar, {
  publicProps: {
    alternativeText: {
      config: 0
    },
    fallbackIconName: {
      config: 0
    },
    initials: {
      config: 0
    },
    size: {
      config: 3
    },
    src: {
      config: 3
    },
    variant: {
      config: 3
    }
  },
  track: {
    _size: 1,
    _src: 1,
    _variant: 1
  }
});
var _lightningAvatar = registerComponent(LightningAvatar, {
  tmpl: _tmpl$9
});

function tmpl$9($api, $cmp, $slotset, $ctx) {
  const {
    d: api_dynamic,
    c: api_custom_element,
    h: api_element
  } = $api;
  return [!$cmp.isIconBeforeLabel ? api_dynamic($cmp.label) : null, $cmp.iconName ? api_element("span", {
    className: $cmp.computedClass,
    key: 2
  }, [api_element("span", {
    classMap: {
      "slds-icon_container": true,
      "slds-current-color": true
    },
    attrs: {
      "title": $cmp.iconAlternativeText
    },
    key: 1
  }, [api_custom_element("lightning-primitive-icon", _lightningPrimitiveIcon, {
    props: {
      "iconName": $cmp.iconName,
      "size": "xx-small"
    },
    key: 0
  }, [])])]) : null, $cmp.isIconBeforeLabel ? api_dynamic($cmp.label) : null];
}

var _tmpl$a = registerTemplate(tmpl$9);
tmpl$9.stylesheets = [];
tmpl$9.stylesheetTokens = {
  hostAttribute: "lightning-badge_badge-host",
  shadowAttribute: "lightning-badge_badge"
};

const DEFAULT_POSITION = 'start';

/**
 * Represents a label which holds a small amount of information, such as the
 * number of unread notifications.
 */
class LightningBadge extends BaseLightningElement {
  constructor(...args) {
    super(...args);
    this._iconPosition = DEFAULT_POSITION;
    this.label = void 0;
    this.iconName = void 0;
    this.iconAlternativeText = void 0;
  }
  /**
   * Normalized icon position
   */
  /**
   * The text to be displayed inside the badge.
   * @type {string}
   * @required
   */
  /**
   * The Lightning Design System name of the icon to be displayed inside the badge.
   * Names are written in the format 'utility:down' where 'utility' is the category,
   * and 'down' is the specific icon to be displayed.
   * @type {string}
   */
  /**
   * The alternative text used to describe the icon,
   * which is displayed as tooltip text.
   * @type {string}
   */
  /**
   * The position for the icon.
   * Possible values: 'start' (displayed before the text) and 'end' (displayed after the text)
   * @default start
   * @type {string}
   */
  get iconPosition() {
    return this._iconPosition;
  }
  set iconPosition(value) {
    this._iconPosition = normalizeString(value, {
      fallbackValue: DEFAULT_POSITION,
      validValues: ['start', 'end']
    });
  }
  connectedCallback() {
    this.classList.add('slds-badge');
  }

  /**
   * Computes the icon container class based on the icon positioning
   */
  get computedClass() {
    let iconClass = classSet('slds-badge__icon');
    iconClass.add(this.isIconBeforeLabel ? 'slds-badge__icon_left' : 'slds-badge__icon_right');
    return iconClass.toString();
  }

  /**
   * Whether the icon comes before the label
   */
  get isIconBeforeLabel() {
    return this._iconPosition !== 'end';
  }
}
registerDecorators(LightningBadge, {
  publicProps: {
    label: {
      config: 0
    },
    iconName: {
      config: 0
    },
    iconAlternativeText: {
      config: 0
    },
    iconPosition: {
      config: 3
    }
  },
  fields: ["_iconPosition"]
});
var _lightningBadge = registerComponent(LightningBadge, {
  tmpl: _tmpl$a
});

function tmpl$a($api, $cmp, $slotset, $ctx) {
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
    _m6
  } = $ctx;
  return [api_element("main", {
    key: 1
  }, [api_element("img", {
    attrs: {
      "src": "./assets/images/welcome-mat/bg-info@2x.png",
      "alt": "logo"
    },
    key: 0
  }, [])]), api_element("p", {
    classMap: {
      "slds-box": true,
      "slds-text-heading_small": true
    },
    attrs: {
      "id": api_scoped_id("action")
    },
    key: 8
  }, [api_text("Action icons represent actions a user can take. The default size of action icons are larger than the others. "), api_element("br", {
    key: 2
  }, []), api_element("br", {
    key: 3
  }, []), api_custom_element("lightning-icon", _lightningIcon, {
    classMap: {
      "slds-m-left_x-small": true
    },
    props: {
      "iconName": "action:approval",
      "alternativeText": "Approved",
      "title": "Approved"
    },
    key: 4
  }, []), api_custom_element("lightning-icon", _lightningIcon, {
    classMap: {
      "slds-m-left_x-small": true
    },
    props: {
      "iconName": "action:delete",
      "alternativeText": "Delete",
      "title": "Delete"
    },
    key: 5
  }, []), api_custom_element("lightning-icon", _lightningIcon, {
    classMap: {
      "slds-m-left_x-small": true
    },
    props: {
      "iconName": "action:new_note",
      "alternativeText": "New note",
      "title": "New note"
    },
    key: 6
  }, []), api_custom_element("lightning-icon", _lightningIcon, {
    classMap: {
      "slds-m-left_x-small": true
    },
    props: {
      "iconName": "action:preview",
      "alternativeText": "Preview",
      "title": "Preview"
    },
    key: 7
  }, [])]), api_custom_element("lightning-button", _lightningButton, {
    classMap: {
      "slds-m-left_x-small": true
    },
    props: {
      "variant": "base",
      "label": "Base",
      "title": "Looks like a link"
    },
    key: 9,
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
    key: 10,
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
    key: 11,
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
    key: 12,
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
    key: 13,
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
    key: 14,
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
    key: 15,
    on: {
      "click": _m6 || ($ctx._m6 = api_bind($cmp.handleClick))
    }
  }, []), api_custom_element("lightning-button-menu", _lightningButtonMenu, {
    key: 18
  }, [api_custom_element("lightning-menu-item", _lightningMenuItem, {
    props: {
      "prefixIconName": "utility:user",
      "label": "Menu item"
    },
    key: 16
  }, []), api_custom_element("lightning-menu-item", _lightningMenuItem, {
    props: {
      "label": "Another menu item"
    },
    key: 17
  }, [])]), api_element("div", {
    classMap: {
      "slds-m-vertical_medium": true
    },
    key: 21
  }, [api_element("p", {
    key: 20
  }, [api_text("The label of the button that was clicked is:"), api_element("span", {
    classMap: {
      "slds-text-heading_small": true
    },
    key: 19
  }, [api_dynamic($cmp.clickedButtonLabel)])])]), api_custom_element("lightning-avatar", _lightningAvatar, {
    props: {
      "src": "./assets/images/avatar1.jpg"
    },
    key: 22
  }, []), api_custom_element("lightning-avatar", _lightningAvatar, {
    classMap: {
      "slds-m-right_small": true
    },
    props: {
      "size": "x-small",
      "src": "./assets/images/avatar2.jpg",
      "initials": "JD",
      "fallbackIconName": "standard:person_account",
      "alternativeText": "Jane Doe"
    },
    key: 23
  }, []), api_custom_element("lightning-avatar", _lightningAvatar, {
    classMap: {
      "slds-m-right_small": true
    },
    props: {
      "size": "small",
      "src": ".assets/images/avatar3.jpg",
      "initials": "TP",
      "fallbackIconName": "standard:person_account",
      "alternativeText": "Tony Price"
    },
    key: 24
  }, []), api_custom_element("lightning-avatar", _lightningAvatar, {
    classMap: {
      "slds-m-right_small": true
    },
    props: {
      "size": "medium",
      "src": ".assets/images/avatar1.jpg",
      "initials": "RE",
      "fallbackIconName": "standard:person_account",
      "alternativeText": "Ryan Eddie"
    },
    key: 25
  }, []), api_custom_element("lightning-avatar", _lightningAvatar, {
    classMap: {
      "slds-m-right_small": true
    },
    props: {
      "size": "large",
      "src": "./assets/images/avatar2.jpg",
      "initials": "CR",
      "fallbackIconName": "standard:person_account",
      "alternativeText": "Cindy Rice"
    },
    key: 26
  }, []), api_custom_element("lightning-badge", _lightningBadge, {
    props: {
      "label": "Alpha",
      "iconName": "standard:event"
    },
    key: 27
  }, []), api_custom_element("lightning-badge", _lightningBadge, {
    props: {
      "label": "Beta",
      "iconName": "standard:email",
      "iconPosition": "end"
    },
    key: 28
  }, []), api_custom_element("lightning-badge", _lightningBadge, {
    props: {
      "label": "Gamma",
      "iconName": "custom:custom11"
    },
    key: 29
  }, []), api_element("h1", {
    key: 30
  }, [api_text("badge-complete")])];
}

var _tmpl$b = registerTemplate(tmpl$a);
tmpl$a.stylesheets = [];

if (_implicitStylesheets) {
  tmpl$a.stylesheets.push.apply(tmpl$a.stylesheets, _implicitStylesheets);
}
tmpl$a.stylesheetTokens = {
  hostAttribute: "example-app_app-host",
  shadowAttribute: "example-app_app"
};

//import dir from '@salesforce/i18n/dir';
/*
const columns = [
    { label: 'Label', fieldName: 'name' },
    { label: 'Website', fieldName: 'website', type: 'url' },
    { label: 'Phone', fieldName: 'phone', type: 'phone' },
    { label: 'Balance', fieldName: 'amount', type: 'currency' },
    { label: 'CloseAt', fieldName: 'closeAt', type: 'date' },
];*/
const data = [{
  id: 1,
  name: 'Billy Simonns',
  age: 40,
  email: 'billy@salesforce.com'
}, {
  id: 2,
  name: 'Kelsey Denesik',
  age: 35,
  email: 'kelsey@salesforce.com'
}, {
  id: 3,
  name: 'Kyle Ruecker',
  age: 50,
  email: 'kyle@salesforce.com'
}, {
  id: 4,
  name: 'Krystina Kerluke',
  age: 37,
  email: 'krystina@salesforce.com'
}];
const columns = [{
  label: 'Name',
  fieldName: 'name'
}, {
  label: 'Age',
  fieldName: 'age',
  type: 'number',
  sortable: true,
  cellAttributes: {
    alignment: 'left'
  }
}, {
  label: 'Email',
  fieldName: 'email',
  type: 'email'
}];
class HelloWorldApp extends BaseLightningElement {
  constructor(...args) {
    super(...args);
    this.data = data;
    this.columns = columns;
    this.defaultSortDirection = 'asc';
    this.sortDirection = 'asc';
    this.sortedBy = void 0;
    this.clickedButtonLabel = void 0;
    this.activeSectionMessage = '';
  }
  handleClick(event) {
    this.clickedButtonLabel = event.target.label;
  }
  connectedCallback() {
    /*
    const data = this.generateData({ amountOfRecords: 100 });
    this.data = data;*/
    //console.log(dir);
  }
  /*
      generateData({ amountOfRecords }) {
          return [...Array(amountOfRecords)].map((_, index) => {
              return {
                  name: `Name (${index})`,
                  website: 'www.salesforce.com',
                  amount: Math.floor(Math.random() * 100),
                  phone: `${Math.floor(Math.random() * 9000000000) + 1000000000}`,
                  closeAt: new Date(
                      Date.now() + 86400000 * Math.ceil(Math.random() * 20)
                  ),
              };
          });
      }
  
      */

  // Used to sort the 'Age' column
  sortBy(field, reverse, primer) {
    const key = primer ? function (x) {
      return primer(x[field]);
    } : function (x) {
      return x[field];
    };
    return function (a, b) {
      a = key(a);
      b = key(b);
      return reverse * ((a > b) - (b > a));
    };
  }
  onHandleSort(event) {
    const {
      fieldName: sortedBy,
      sortDirection
    } = event.detail;
    const cloneData = [...this.data];
    cloneData.sort(this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1));
    this.data = cloneData;
    this.sortDirection = sortDirection;
    this.sortedBy = sortedBy;
  }
  handleToggleSection(event) {
    this.activeSectionMessage = 'Open section name:  ' + event.detail.openSections;
  }
  handleSetActiveSectionC() {
    const accordion = this.template.querySelector('.example-accordion');
    accordion.activeSectionName = 'C';
  }
}
registerDecorators(HelloWorldApp, {
  fields: ["data", "columns", "defaultSortDirection", "sortDirection", "sortedBy", "clickedButtonLabel", "activeSectionMessage"]
});
var App = registerComponent(HelloWorldApp, {
  tmpl: _tmpl$b
});

document.querySelector('#main').appendChild(createElement('example-app', {
  is: App
}));
