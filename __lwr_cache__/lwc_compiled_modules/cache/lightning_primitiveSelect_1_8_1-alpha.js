import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./primitiveSelect.html";
import labelRequired from '@salesforce/label/LightningControl.required';
import { classSet } from 'lightning/utils';
import { normalizeBoolean, getRealDOMId, classListMutation } from 'lightning/utilsPrivate';
import { InteractingState, getErrorMessage, buildSyntheticValidity, normalizeVariant, VARIANT } from 'lightning/inputUtils';
const i18n = {
  required: labelRequired
};
const {
  reduce: ArrayReduce
} = Array.prototype;
class LightningPrimitiveSelect extends LightningElement {
  constructor(...args) {
    super(...args);
    this._errorMessage = '';
    this._options = [];
    this._selectedValue = void 0;
    this._variant = void 0;
    this._required = false;
    this._disabled = false;
    this._multiple = false;
    this._fieldLevelHelp = void 0;
    this._size = void 0;
    this._ariaDescribedBy = void 0;
    this._tabIndex = void 0;
    this.label = void 0;
    this.name = void 0;
    this.messageWhenValueMissing = void 0;
    this.accessKey = void 0;
  }
  set fieldLevelHelp(value) {
    this._fieldLevelHelp = value;
  }
  get fieldLevelHelp() {
    return this._fieldLevelHelp;
  }
  set variant(value) {
    this._variant = normalizeVariant(value);
    this.updateClassList();
  }
  get variant() {
    return this._variant || VARIANT.STANDARD;
  }
  set multiple(value) {
    this._multiple = normalizeBoolean(value);
  }
  get multiple() {
    return this._multiple;
  }
  set size(newValue) {
    this._size = newValue;
  }
  get size() {
    if (!this.multiple) {
      return null;
    }
    if (this._size === undefined) {
      return '4';
    }
    return this._size;
  }
  set required(value) {
    this._required = normalizeBoolean(value);
  }
  get required() {
    return this._required;
  }
  set disabled(value) {
    this._disabled = normalizeBoolean(value);
  }
  get disabled() {
    return this._disabled;
  }
  set value(newValue) {
    this._selectedValue = newValue;
    if (this.connected && newValue) {
      this.selectOptionsByValue(newValue);
    }
  }
  get value() {
    return this._selectedValue;
  }
  set options(newValue) {
    this._options = newValue;
    if (this.connected && newValue) {
      this.selectOptionsByValue(this._selectedValue);
    }
  }
  get options() {
    return this._options;
  }
  get tabIndex() {
    return this._tabIndex;
  }
  set tabIndex(newValue) {
    this._tabIndex = newValue;
  }
  connectedCallback() {
    this.classList.add('slds-form-element');
    this.updateClassList();
    this.interactingState = new InteractingState();
    this.interactingState.onleave(() => this.showHelpMessageIfInvalid());
    this.connected = true;
  }
  updateClassList() {
    classListMutation(this.classList, {
      'slds-form-element_stacked': this.variant === VARIANT.LABEL_STACKED,
      'slds-form-element_horizontal': this.variant === VARIANT.LABEL_INLINE
    });
  }
  renderedCallback() {
    if (this.options && this._selectedValue !== undefined) {
      this.selectOptionsByValue(this._selectedValue);
    }
  }
  disconnectedCallback() {
    this.connected = false;
  }
  focus() {
    if (this.connected) {
      this.getElement.focus();
    }
  }
  blur() {
    if (this.connected) {
      this.getElement.blur();
    }
  }
  get validity() {
    const missing = !this.disabled && this.required && (this._selectedValue == null || this._selectedValue === '' || this._selectedValue.length === 0);
    return buildSyntheticValidity({
      valueMissing: missing,
      customError: this.customErrorMessage != null && this.customErrorMessage !== ''
    });
  }
  checkValidity() {
    const isValid = this.validity.valid;
    if (!isValid) {
      this.dispatchEvent(new CustomEvent('invalid', {
        cancellable: true
      }));
    }
    return isValid;
  }
  reportValidity() {
    this.showHelpMessageIfInvalid();
    return this.checkValidity();
  }
  setCustomValidity(message) {
    this.customErrorMessage = message;
  }
  showHelpMessageIfInvalid() {
    const validity = this.validity;
    if (validity.valid) {
      this._errorMessage = '';
      this.classList.remove('slds-has-error');
      this.removeAriaDescribedBy();
    } else {
      this.classList.add('slds-has-error');
      this._errorMessage = getErrorMessage(validity, {
        valueMissing: this.messageWhenValueMissing,
        customError: this.customErrorMessage
      });
      this.setAriaDescribedBy(this.computedUniqueErrorMessageElementId);
    }
  }
  get i18n() {
    return i18n;
  }
  get errorMessage() {
    return this._errorMessage;
  }
  get getElement() {
    return this.template.querySelector('select');
  }
  get computedUniqueErrorMessageElementId() {
    return getRealDOMId(this.template.querySelector('[data-help-message]'));
  }
  get isLabelHidden() {
    return this.variant === VARIANT.LABEL_HIDDEN;
  }
  get computedLabelClass() {
    return classSet('slds-form-element__label').add({
      'slds-assistive-text': this.isLabelHidden
    }).toString();
  }
  get computedAriaDescribedBy() {
    return this._ariaDescribedBy;
  }
  handleChange(event) {
    event.preventDefault();
    event.stopPropagation();
    this._selectedValue = this.getSelectedOptionValues();
    this.dispatchChangeEvent();
  }
  handleFocus() {
    this.interactingState.enter();
    this.dispatchEvent(new CustomEvent('focus'));
  }
  handleBlur() {
    this.interactingState.leave();
    this.dispatchEvent(new CustomEvent('blur'));
  }
  dispatchChangeEvent() {
    this.dispatchEvent(new CustomEvent('change', {
      composed: true,
      bubbles: true,
      detail: {
        value: this._selectedValue
      }
    }));
  }
  selectOptionsByValue(optionValue) {
    if (this.multiple) {
      if (Array.isArray(optionValue)) {
        const options = this.template.querySelectorAll('option');
        options.forEach(option => {
          option.selected = optionValue.includes(option.value);
        });
      }
    } else {
      this.getElement.value = optionValue;
    }
  }
  getSelectedOptionValues() {
    if (this.multiple) {
      const options = this.template.querySelectorAll('option');
      return ArrayReduce.call(options, (selectedValues, option) => {
        if (option.selected) {
          selectedValues.push(option.value);
        }
        return selectedValues;
      }, []);
    }
    return this.getElement.value;
  }
  setAriaDescribedBy(val) {
    this.getElement.setAttribute('aria-describedby', val);
  }
  removeAriaDescribedBy() {
    this.getElement.removeAttribute('aria-describedby');
  }
}
_registerDecorators(LightningPrimitiveSelect, {
  publicProps: {
    label: {
      config: 0
    },
    name: {
      config: 0
    },
    messageWhenValueMissing: {
      config: 0
    },
    accessKey: {
      config: 0
    },
    fieldLevelHelp: {
      config: 3
    },
    variant: {
      config: 3
    },
    multiple: {
      config: 3
    },
    size: {
      config: 3
    },
    required: {
      config: 3
    },
    disabled: {
      config: 3
    },
    value: {
      config: 3
    },
    options: {
      config: 3
    },
    tabIndex: {
      config: 3
    },
    validity: {
      config: 1
    }
  },
  publicMethods: ["focus", "blur", "checkValidity", "reportValidity", "setCustomValidity", "showHelpMessageIfInvalid"],
  track: {
    _errorMessage: 1,
    _options: 1,
    _selectedValue: 1,
    _variant: 1,
    _required: 1,
    _disabled: 1,
    _multiple: 1,
    _fieldLevelHelp: 1,
    _size: 1,
    _ariaDescribedBy: 1,
    _tabIndex: 1
  }
})
export default _registerComponent(LightningPrimitiveSelect, {
  tmpl: _tmpl
});