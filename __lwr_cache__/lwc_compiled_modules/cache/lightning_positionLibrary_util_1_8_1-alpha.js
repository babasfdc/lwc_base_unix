import { assert } from 'lightning/utilsPrivate';
export const POSITION_ATTR_NAME = 'data-position-id';
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
    assert(this.window.document, 'Missing window.document');
    return this.window.document.documentElement;
  }
  get MutationObserver() {
    return this.window.MutationObserver;
  }
  isWindow(element) {
    return element && element.toString() === '[object Window]';
  }
}
export const WindowManager = new BrowserWindow();
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
export function getScrollableParent(elem, stopEl) {
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
export function isInDom(el) {
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
export function isScrolling(elem) {
  return elem.scrollHeight > elem.clientHeight;
}
export function isDomNode(obj) {
  return obj.nodeType && (obj.nodeType === 1 || obj.nodeType === 11);
}
export function computeAbsPos(target) {
  const val = {
    top: target.offsetTop,
    left: target.offsetLeft
  };
  if (target.offsetParent) {
    const val2 = computeAbsPos(target.offsetParent);
    val.top += val2.top;
    val.left += val2.left;
  }
  return val;
}
export function timeout(time) {
  return new Promise(resolve => {
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    setTimeout(() => {
      resolve();
    }, time);
  });
}
export function containsScrollingElement(list) {
  const len = list.length;
  if (!len) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    if (isScrolling(list[i])) {
      return true;
    }
  }
  return false;
}
export function queryScrollableChildren(element) {
  return element.querySelectorAll('[data-scoped-scroll="true"]');
}
export function getPositionTarget(element) {
  return element.tagName === 'TEXTAREA' ? isShadowRoot(element.parentNode) ? element.parentNode.host : element.parentNode : element;
}
let lastId = 1000000;
export function generateUniqueSelector() {
  return `lgcp-${lastId++}`;
}
export function normalizeElement(element) {
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
export function isInsideModal(element) {
  return isInsideOverlay(element, true);
}
export function normalizePosition(element, nextIndex, target, alignWidth) {
  // Set element position to fixed
  // 1. element is inside overlay
  // or 2. When element isn't align with target's width, and target's parent has overflow-x:hidden setting.
  const isFixed = isInsideOverlay(element).isInside || !alignWidth && queryOverflowHiddenParent(target, WindowManager.window, true);
  element.style.position = isFixed ? 'fixed' : 'absolute';
  element.style.zIndex = nextIndex || 0;
  element.style.left = '-9999px'; // Avoid flicker
  // we always position from the left, but in RTL mode Omakase swaps left and right properties.
  // To always allow positioning from the left we set right to auto so position library can do its work.
  element.style.right = 'auto';
  element.style.top = '0px'; // Avoid flicker

  return element;
}
export function requestAnimationFrameAsPromise() {
  return new Promise(resolve => {
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    requestAnimationFrame(() => resolve());
  });
}