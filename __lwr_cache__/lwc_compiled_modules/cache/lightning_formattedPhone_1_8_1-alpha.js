import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./formattedPhone.html";
import { toNorthAmericanPhoneNumber } from 'lightning/utilsPrivate';

/**
 * Displays a phone number as a hyperlink with the tel: URL scheme.
 */
class LightningFormattedPhone extends LightningElement {
  constructor(...args) {
    super(...args);
    this.value = void 0;
    this.tabIndex = void 0;
    this._connected = false;
  }
  /**
   * Sets the phone number to display.
   * @type {number}
   *
   */
  /**
   * Reserved for internal use. Use tabindex instead to indicate if an element should be focusable.
   * A value of 0 means that the element is focusable and
   * participates in sequential keyboard navigation. A value of -1 means
   * that the element is focusable but does not participate in keyboard navigation.
   * @type {number}
   *
   */
  connectedCallback() {
    this._connected = true;
  }
  disconnectedCallback() {
    this._connected = false;
  }

  /**
   * Sets focus on the element.
   */
  focus() {
    if (this.phoneAnchor) {
      this.phoneAnchor.focus();
    }
  }

  /**
   * Removes keyboard focus from the element.
   */
  blur() {
    if (this.phoneAnchor) {
      this.phoneAnchor.blur();
    }
  }

  /**
   * Clicks the phone number and opens the default phone app.
   */
  click() {
    const anchor = this.phoneAnchor;
    if (anchor && anchor.click) {
      anchor.click();
    }
  }
  get phoneAnchor() {
    if (this._connected && this.showLink) {
      return this.template.querySelector('a');
    }
    return undefined;
  }
  get showLink() {
    return this.value != null && this.value !== '';
  }
  get formattedPhoneNumber() {
    return toNorthAmericanPhoneNumber(this.value);
  }
  get link() {
    return `tel:${this.value}`;
  }
}
_registerDecorators(LightningFormattedPhone, {
  publicProps: {
    value: {
      config: 0
    },
    tabIndex: {
      config: 0
    }
  },
  publicMethods: ["focus", "blur", "click"],
  fields: ["_connected"]
})
export default _registerComponent(LightningFormattedPhone, {
  tmpl: _tmpl
});