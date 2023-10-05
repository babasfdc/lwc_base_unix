import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./primitiveDatatableTooltipBubble.html";
import { classListMutation, keyCodes } from 'lightning/utilsPrivate';
import { classSet } from 'lightning/utils';
import labelCloseButtonAssistiveText from '@salesforce/label/LightningDatatable.closeButtonAssistiveText';
const i18n = {
  closeButtonAssistiveText: labelCloseButtonAssistiveText
};
const DEFAULT_ALIGN = {
  horizontal: 'left',
  vertical: 'bottom'
};
class LightningPrimitiveDatatableTooltipBubble extends LightningElement {
  constructor(...args) {
    super(...args);
    this._inDom = false;
    this._visible = false;
    this._align = DEFAULT_ALIGN;
    this.anchor = void 0;
    this.header = '';
    this.content = '';
    this.variant = 'bare';
    this.hideCloseButton = false;
    this.handleBlur = evt => {
      // A valid blur is when the focus goes to an element outside the bubble.
      // If the element with the focus is inside the bubble, then the component as a whole was not blurred.
      const isValidBlur = evt.relatedTarget === null || !this.template.contains(evt.relatedTarget);
      if (isValidBlur) {
        this.handleBubbleFocusLost();
      }
    };
    this.handleBubbleFocusLost = () => {
      this.dispatchCloseButtonEvent('bubbleLoseFocus');
    };
    this.handleBubbleKey = event => {
      if (keyCodes.escape === event.keyCode) {
        this.dispatchCloseButtonEvent();
      }
      if (keyCodes.tab === event.keyCode) {
        event.preventDefault();
        event.stopPropagation();
        this.focus();
      }
    };
    this.handleCloseButtonClick = () => {
      this.dispatchCloseButtonEvent();
    };
    this.handleCloseButtonKey = event => {
      // block tab and all other keys to keep focus
      event.preventDefault();
      event.stopPropagation();
      const keysToClose = [keyCodes.enter, keyCodes.space, keyCodes.escape];
      if (keysToClose.includes(event.keyCode)) {
        this.dispatchCloseButtonEvent();
      }
    };
  } // bare, error, warning
  connectedCallback() {
    this._inDOM = true;
    this.updateClassList();
  }
  disconnectedCallback() {
    this._inDOM = false;
  }
  get align() {
    return this._align;
  }
  set align(value) {
    this._align = value;
    if (this._inDOM) {
      this.updateClassList();
    }
  }
  get visible() {
    return this._visible;
  }
  set visible(value) {
    this._visible = value;
    if (this._inDOM) {
      this.updateClassList();
    }
  }
  focus() {
    this.closeButton.focus();
  }
  get i18n() {
    return i18n;
  }
  get isContentList() {
    return Array.isArray(this.content);
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
  get closeButton() {
    return this.template.querySelector('[data-close="true"]');
  }
  updateClassList() {
    const classes = classSet('slds-popover');
    classes.add({
      'slds-popover_error': this.variant === 'error',
      'slds-popover_warning': this.variant === 'warning'
    });

    // apply fading effect
    classes.add({
      'slds-rise-from-ground': this._visible === true,
      'slds-fall-into-ground': this._visible === false
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
      'slds-nubbin_bottom-right': horizontal === 'right' && vertical === 'bottom'
    });
    classListMutation(this.classList, classes);
  }
  dispatchCloseButtonEvent(reason) {
    this.dispatchEvent(new CustomEvent('close', {
      detail: {
        reason: reason || 'userCloseBubble',
        anchor: this.anchor
      }
    }));
  }
}
_registerDecorators(LightningPrimitiveDatatableTooltipBubble, {
  publicProps: {
    anchor: {
      config: 0
    },
    header: {
      config: 0
    },
    content: {
      config: 0
    },
    variant: {
      config: 0
    },
    hideCloseButton: {
      config: 0
    },
    align: {
      config: 3
    },
    visible: {
      config: 3
    }
  },
  publicMethods: ["focus"],
  track: {
    _inDom: 1,
    _visible: 1,
    _align: 1
  },
  fields: ["handleBlur", "handleBubbleFocusLost", "handleBubbleKey", "handleCloseButtonClick", "handleCloseButtonKey"]
})
export default _registerComponent(LightningPrimitiveDatatableTooltipBubble, {
  tmpl: _tmpl
});