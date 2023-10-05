import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./primitiveCellButton.html";
import { normalizeBoolean } from 'lightning/utilsPrivate';
class PrivateCellButton extends LightningElement {
  constructor(...args) {
    super(...args);
    this.rowKeyValue = void 0;
    this.colKeyValue = void 0;
    this.variant = void 0;
    this.label = void 0;
    this.iconName = void 0;
    this.iconPosition = void 0;
    this.buttonName = void 0;
    this.buttonClass = void 0;
    this.buttonTitle = void 0;
    this.internalTabIndex = void 0;
    this.type = void 0;
    this.alternativeText = void 0;
    this.iconClass = void 0;
    this.initialRender = true;
    this.buttonHasFocus = false;
    this._connected = false;
    this._disabled = false;
  } // from type=button-icon
  // from type=button-icon
  get computedTitle() {
    return this.buttonTitle || this.label;
  }
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    const newValue = normalizeBoolean(value);
    const oldValue = this._disabled;
    if (oldValue === false && newValue === true && this.buttonHasFocus) {
      this.fireCellFalseBlurred();
    }
    this._disabled = newValue;
  }
  get isButtonIconType() {
    return this.type === 'button-icon';
  }
  renderedCallback() {
    if (this.initialRender) {
      this.addListeners();
    }
    this.initialRender = false;
  }
  connectedCallback() {
    this._connected = true;
  }
  disconnectedCallback() {
    this._connected = false;
  }
  get buttonCustomElement() {
    if (this._connected) {
      const qs = this.isButtonIconType ? 'lightning-button-icon' : 'lightning-button';
      return this.template.querySelector(qs);
    }
    return undefined;
  }
  addListeners() {
    const buttonCustomElement = this.buttonCustomElement;
    buttonCustomElement.addEventListener('focus', this.handleButtonFocused.bind(this));
    buttonCustomElement.addEventListener('blur', this.handleButtonBlurred.bind(this));
  }
  focus() {
    if (this.buttonCustomElement) {
      this.buttonCustomElement.focus();
    }
  }
  click() {
    if (this.buttonCustomElement) {
      this.buttonCustomElement.click();
    }
  }
  handleButtonFocused(event) {
    if (event.target.localName.indexOf('button') > -1) {
      this.buttonHasFocus = true;
    }
  }
  handleButtonBlurred(event) {
    if (event.target.localName.indexOf('button') > -1) {
      this.buttonHasFocus = false;
    }
  }
  fireCellFalseBlurred() {
    const {
      rowKeyValue,
      colKeyValue
    } = this;
    this.dispatchEvent(new CustomEvent('privatecellfalseblurred', {
      composed: true,
      bubbles: true,
      cancelable: true,
      detail: {
        rowKeyValue,
        colKeyValue
      }
    }));
  }
  handleButtonClick() {
    const {
      rowKeyValue,
      colKeyValue
    } = this;
    // fire this event in the next tick so that dt can do things it has to do for correct focus
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    setTimeout(() => {
      this.dispatchEvent(new CustomEvent('privatecellbuttonclicked', {
        composed: true,
        bubbles: true,
        cancelable: true,
        detail: {
          rowKeyValue,
          colKeyValue
        }
      }));
    }, 0);
  }
}
PrivateCellButton.delegatesFocus = true;
_registerDecorators(PrivateCellButton, {
  publicProps: {
    rowKeyValue: {
      config: 0
    },
    colKeyValue: {
      config: 0
    },
    variant: {
      config: 0
    },
    label: {
      config: 0
    },
    iconName: {
      config: 0
    },
    iconPosition: {
      config: 0
    },
    buttonName: {
      config: 0
    },
    buttonClass: {
      config: 0
    },
    buttonTitle: {
      config: 0
    },
    internalTabIndex: {
      config: 0
    },
    type: {
      config: 0
    },
    alternativeText: {
      config: 0
    },
    iconClass: {
      config: 0
    },
    disabled: {
      config: 3
    }
  },
  publicMethods: ["focus", "click"],
  track: {
    _disabled: 1
  },
  fields: ["initialRender", "buttonHasFocus", "_connected"]
})
export default _registerComponent(PrivateCellButton, {
  tmpl: _tmpl
});