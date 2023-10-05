import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./helptext.html";
import labelButtonAlternativeText from '@salesforce/label/LightningHelptext.buttonAlternativeText';
import { isValidName } from 'lightning/iconUtils';
import { normalizeString } from 'lightning/utilsPrivate';
import { classSet } from 'lightning/utils';
import { Tooltip, TooltipType } from 'lightning/tooltipLibrary';
const i18n = {
  buttonAlternativeText: labelButtonAlternativeText
};
const DEFAULT_ICON_NAME = 'utility:info';
const DEFAULT_ICON_VARIANT = 'bare';

/**
 * An icon with a text popover used for tooltips.
 */
class LightningHelptext extends LightningElement {
  constructor(...args) {
    super(...args);
    this.state = {
      iconName: DEFAULT_ICON_NAME,
      iconVariant: DEFAULT_ICON_VARIANT
    };
    this._tooltip = null;
  }
  /**
   * Text to be shown in the popover.
   * @type {string}
   * @param {string} value - The plain text string for the tooltip
   */
  set content(value) {
    if (this._tooltip) {
      this._tooltip.value = value;
    } else if (value) {
      // Note that because the tooltip target is a child element it may not be present in the
      // dom during initial rendering.
      this._tooltip = new Tooltip(value, {
        root: this,
        target: () => this.template.querySelector('button'),
        type: TooltipType.Toggle
      });
      this._tooltip.initialize();
    }
  }
  get content() {
    return this._tooltip ? this._tooltip.value : undefined;
  }

  /**
   * The Lightning Design System name of the icon used as the visible element.
   * Names are written in the format 'utility:info' where 'utility' is the category,
   * and 'info' is the specific icon to be displayed.
   * The default is 'utility:info'.
   * @type {string}
   * @param {string} value the icon name to use
   * @default utility:info
   */
  set iconName(value) {
    this.state.iconName = value;
  }
  get iconName() {
    if (isValidName(this.state.iconName)) {
      return this.state.iconName;
    }
    return DEFAULT_ICON_NAME;
  }

  /**
   * Changes the appearance of the icon.
   * Accepted variants include inverse, warning, error.
   * @type {string}
   * @param {string} value the icon variant to use
   * @default bare
   */
  set iconVariant(value) {
    this.state.iconVariant = value;
  }
  get iconVariant() {
    // NOTE: Leaving a note here because I just wasted a bunch of time
    // investigating why both 'bare' and 'inverse' are supported in
    // lightning-primitive-icon. lightning-icon also has a deprecated
    // 'bare', but that one is synonymous to 'inverse'. This 'bare' means
    // that no classes should be applied. So this component needs to
    // support both 'bare' and 'inverse' while lightning-icon only needs to
    // support 'inverse'.
    return normalizeString(this.state.iconVariant, {
      fallbackValue: DEFAULT_ICON_VARIANT,
      validValues: ['bare', 'error', 'inverse', 'warning']
    });
  }
  disconnectedCallback() {
    // W-6441609 helptext maybe destroyed first, and tooltip won't receive events to hide.
    if (this._tooltip && !this._tooltip.initialized) {
      this._tooltip.hide();
    }
    this._tooltip = null;
  }
  renderedCallback() {
    if (this._tooltip && !this._tooltip.initialized) {
      this._tooltip.initialize();
    }
  }
  get i18n() {
    return i18n;
  }

  // compute SVG CSS classes to apply to the icon
  get computedSvgClass() {
    const classes = classSet('slds-button__icon');
    switch (this.iconVariant) {
      case 'error':
        classes.add('slds-icon-text-error');
        break;
      case 'warning':
        classes.add('slds-icon-text-warning');
        break;
      case 'inverse':
      case 'bare':
        break;
      default:
        // if custom icon is set, we don't want to set
        // the text-default class
        classes.add('slds-icon-text-default');
    }
    return classes.toString();
  }
}
_registerDecorators(LightningHelptext, {
  publicProps: {
    content: {
      config: 3
    },
    iconName: {
      config: 3
    },
    iconVariant: {
      config: 3
    }
  },
  track: {
    state: 1
  },
  fields: ["_tooltip"]
})
export default _registerComponent(LightningHelptext, {
  tmpl: _tmpl
});