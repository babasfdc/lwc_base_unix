import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./primitiveButton.html";
import { isIE11, normalizeBoolean, normalizeString, synchronizeAttrs } from 'lightning/utilsPrivate';
const ARIA_DESCRIBEDBY = 'aria-describedby';
const ARIA_CONTROLS = 'aria-controls';

/**
 * Primitive for button, buttonIcon and buttonIconStateful
 */
class LightningPrimitiveButton extends LightningElement {
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
_registerDecorators(LightningPrimitiveButton, {
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
})
export default _registerComponent(LightningPrimitiveButton, {
  tmpl: _tmpl
});