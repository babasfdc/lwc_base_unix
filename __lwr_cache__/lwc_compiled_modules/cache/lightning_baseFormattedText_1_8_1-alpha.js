import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./baseFormattedText.html";
import { normalizeBoolean, parseToFormattedLinkifiedParts } from 'lightning/utilsPrivate';

/**
 * Displays text and linkifies if requested.
 * It doesnt convert new lines to line breaks.
 * This component is meant for internal use by lightning components
 * where preserving new lines is needed so that truncation works as
 * expected for multiline text. To show new lines, parent component
 * should set style white-space:pre-line
 */
class BaseFormattedText extends LightningElement {
  constructor(...args) {
    super(...args);
    this.value = '';
    this._linkify = false;
  }
  /**
   * Sets the text to display.
   * @type {string}
   *
   */
  /**
   * If present, URLs and email addresses are displayed in anchor tags.
   * They are displayed in plain text by default.
   * @type {boolean}
   * @default false
   */
  get linkify() {
    return this._linkify;
  }
  set linkify(value) {
    this._linkify = normalizeBoolean(value);
  }
  get shouldFormat() {
    return this.linkify && this.isString;
  }
  get isString() {
    return this.value && typeof this.value === 'string';
  }
  get isObject() {
    return typeof this.value === 'object';
  }
  get normalizedValue() {
    // W-7860598 some team rely on text column support for primitive type.
    // W-7752316 customer use compound field for text column, to avoid [object Object]
    // Check if value is object, return '';
    if (this.isObject) {
      return '';
    }
    return this.value;
  }
  get formattedParts() {
    if (!this.isString) {
      return [];
    }
    return parseToFormattedLinkifiedParts(this.value, true);
  }
}
_registerDecorators(BaseFormattedText, {
  publicProps: {
    value: {
      config: 0
    },
    linkify: {
      config: 3
    }
  },
  track: {
    _linkify: 1
  }
})
export default _registerComponent(BaseFormattedText, {
  tmpl: _tmpl
});