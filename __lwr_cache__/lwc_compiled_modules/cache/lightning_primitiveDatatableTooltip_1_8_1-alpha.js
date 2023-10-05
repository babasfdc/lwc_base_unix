import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement, createElement } from "lwc";
import _tmpl from "./primitiveDatatableTooltip.html";
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? Object(arguments[i]) : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys.push.apply(ownKeys, Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { raf, guid } from 'lightning/utilsPrivate';
import LightningPrimitiveDatatableTooltipBubble from 'lightning/primitiveDatatableTooltipBubble';
import { getNubbinShiftAmount, getBubbleAlignAndPosition } from './utils';
import { classSet } from 'lightning/utils';
const CACHED_BUBBLE_ELEMENT = createElement('lightning-primitive-datatable-tooltip-bubble', {
  is: LightningPrimitiveDatatableTooltipBubble
});
CACHED_BUBBLE_ELEMENT.style.position = 'absolute';
CACHED_BUBBLE_ELEMENT.style.minWidth = '75px';
const DEFAULT_ANCHORING = {
  trigger: {
    horizontal: 'left',
    vertical: 'top'
  },
  bubble: {
    horizontal: 'left',
    vertical: 'bottom'
  }
};
const ZERO_OFFSET = {
  horizontal: 0,
  // right if > 0, left if < 0
  vertical: 0 // down if > 0, up if < 0
};

class LightningPrimitiveDatatableTooltip extends LightningElement {
  constructor(...args) {
    super(...args);
    this.header = '';
    this.content = [];
    this.size = 'medium';
    this.trigger = 'click';
    this.hideCloseButton = false;
    this.variant = 'bare';
    this.alternativeText = void 0;
    this.internalTabIndex = void 0;
    this._uniqueId = `primitive-datatable-tooltip_${guid()}`;
    this._showErrorButton = false;
    this._offset = ZERO_OFFSET;
    this.handleBrowserEvent = raf(() => {
      // only perform changes for the currently focused/active trigger
      if (this._showErrorBubble && this.isBubbleAttachedToTrigger()) {
        this.setBubblePosition();
      }
    });
    this.handleBubbleClose = event => {
      // only keep 1 listener at a time and always turn off this._showErrorBubble
      // on close
      const bubbleEl = CACHED_BUBBLE_ELEMENT;
      bubbleEl.removeEventListener('close', this.handleBubbleClose);
      if (event.detail.anchor === this._uniqueId) {
        this.hideBubble();
        if (event.detail.reason !== 'bubbleLoseFocus') {
          this.triggerElement.focus();
        }
      }
    };
  } // hover, click
  // bare, warning, error
  connectedCallback() {
    // watch for resize & scroll events to recalculate when needed
    window.addEventListener('resize', this.handleBrowserEvent, false);
    window.addEventListener('scroll', this.handleBrowserEvent, true);
  }
  disconnectedCallback() {
    // remove event listeners
    window.removeEventListener('resize', this.handleBrowserEvent, false);
    window.removeEventListener('scroll', this.handleBrowserEvent, true);
    const bubbleEl = CACHED_BUBBLE_ELEMENT;
    bubbleEl.removeEventListener('close', this.handleBubbleClose);
  }
  get offset() {
    return this._offset;
  }
  set offset(value) {
    this._offset = _objectSpread({}, ZERO_OFFSET, value);
  }
  focus() {
    this.triggerElement.focus();
  }
  get computedButtonClass() {
    const classes = classSet('slds-button').add('slds-button_icon');
    classes.add({
      'slds-button_icon-error': this.variant === 'error'
    });
    return classes.toString();
  }
  get computedHeaderIconName() {
    switch (this.variant) {
      case 'error':
        return 'utility:ban';
      case 'warning':
        return 'utility:warning';
      case 'bare':
      default:
        return 'utility:info';
    }
  }
  get triggerElement() {
    return this.template.querySelector('[data-trigger="true"]');
  }
  handleMouseOver() {
    if (this.trigger === 'hover') {
      this.showBubble();
    }
  }
  handleMouseOut() {
    if (this.trigger === 'hover') {
      this.hideBubble();
      this.triggerElement.focus();
    }
  }
  handleClick(event) {
    event.preventDefault();
    if (this.trigger === 'click') {
      // since we share bubble element with other tooltip triggers,
      // we need to keep it open if bubble is not attached to the trigger
      if (this._showErrorBubble && this.isBubbleAttachedToTrigger()) {
        this.hideBubble();
      } else {
        this.showBubble();
      }
    }
  }
  showBubble() {
    this._showErrorBubble = true;
    const bubbleEl = CACHED_BUBBLE_ELEMENT;
    this.initBubble();
    this.setBubblePosition();
    bubbleEl.visible = true;

    // 100ms for bubble to fade in before becoming focusable
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    setTimeout(() => {
      bubbleEl.focus();
    }, 100);
  }
  hideBubble() {
    this._showErrorBubble = false;
    const bubbleEl = CACHED_BUBBLE_ELEMENT;
    bubbleEl.visible = false;

    // 25ms for bubble to fade out before trigger becoming focusable
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    setTimeout(() => {
      this.focus();
    }, 25);
  }
  isBubbleAttachedToTrigger() {
    return CACHED_BUBBLE_ELEMENT.anchor === this._uniqueId;
  }
  getTriggerBoundingRect() {
    return this.triggerElement ? this.triggerElement.getBoundingClientRect() : null;
  }
  calculateShiftAmounts() {
    // only calculate once
    if (typeof this.shiftAmounts === 'undefined') {
      const bubbleEl = CACHED_BUBBLE_ELEMENT;

      // initialize position in top left corner
      bubbleEl.style.top = 0;
      bubbleEl.style.left = 0;
      bubbleEl.style.bottom = null;
      bubbleEl.style.right = null;

      // calculate initial position of trigger element
      const triggerElRect = this.getTriggerBoundingRect();

      // calculate shift to align nubbin
      const nubbinComputedStyles = window.getComputedStyle(bubbleEl, ':before') || bubbleEl.style;
      this.shiftAmounts = getNubbinShiftAmount(nubbinComputedStyles, triggerElRect.width);
    }
  }
  initBubble() {
    const bubbleEl = CACHED_BUBBLE_ELEMENT;
    bubbleEl.anchor = this._uniqueId;
    bubbleEl.content = this.content;
    bubbleEl.header = this.header;
    bubbleEl.variant = this.variant;
    bubbleEl.hideCloseButton = this.hideCloseButton;
    bubbleEl.addEventListener('close', this.handleBubbleClose);
    if (bubbleEl.parentNode === null) {
      document.body.appendChild(bubbleEl);
    }
    this.calculateShiftAmounts();
  }
  setBubblePosition() {
    const rootEl = document.documentElement;
    const bubbleEl = CACHED_BUBBLE_ELEMENT;
    const result = getBubbleAlignAndPosition(this.getTriggerBoundingRect(), bubbleEl.getBoundingClientRect(), DEFAULT_ANCHORING.bubble, this.shiftAmounts, rootEl.clientHeight || window.innerHeight, rootEl.clientWidth || window.innerWidth, window.pageXOffset + this.offset.horizontal, window.pageYOffset + this.offset.vertical);
    bubbleEl.align = result.align;
    bubbleEl.style.top = result.top;
    bubbleEl.style.right = result.right;
    bubbleEl.style.bottom = result.bottom;
    bubbleEl.style.left = result.left;
  }
}
_registerDecorators(LightningPrimitiveDatatableTooltip, {
  publicProps: {
    header: {
      config: 0
    },
    content: {
      config: 0
    },
    size: {
      config: 0
    },
    trigger: {
      config: 0
    },
    hideCloseButton: {
      config: 0
    },
    variant: {
      config: 0
    },
    alternativeText: {
      config: 0
    },
    internalTabIndex: {
      config: 0
    },
    offset: {
      config: 3
    }
  },
  publicMethods: ["focus"],
  track: {
    _showErrorButton: 1,
    _offset: 1
  },
  fields: ["_uniqueId", "handleBrowserEvent", "handleBubbleClose"]
})
export default _registerComponent(LightningPrimitiveDatatableTooltip, {
  tmpl: _tmpl
});