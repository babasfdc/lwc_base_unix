import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./primitiveDatatableIeditPanel.html";
import labelUpdateSelectedItems from '@salesforce/label/LightningDatatable.updateSelectedItems';
import labelCancel from '@salesforce/label/LightningDatatable.cancel';
import labelApply from '@salesforce/label/LightningDatatable.apply';
import { InteractingState } from 'lightning/inputUtils';
import { formatLabel } from 'lightning/utils';
const i18n = {
  updateSelectedItems: labelUpdateSelectedItems,
  cancel: labelCancel,
  apply: labelApply
};
class PrimitiveDatatableIeditPanel extends LightningElement {
  constructor(...args) {
    super(...args);
    this.visible = void 0;
    this.rowKeyValue = void 0;
    this.colKeyValue = void 0;
    this.editedValue = void 0;
    this.columnDef = void 0;
    this.isMassEditEnabled = false;
    this.numberOfSelectedRows = void 0;
  }
  connectedCallback() {
    this.interactingState = new InteractingState({
      duration: 10,
      debounceInteraction: true
    });
    this.interactingState.onleave(() => this.handlePanelLoosedFocus());
  }
  get computedStyle() {
    const styleHash = {
      'z-index': 1000,
      'background-color': 'white',
      'margin-top': '1px'
    };
    styleHash.display = this.visible ? 'block' : 'none';
    return Object.keys(styleHash).map(styleProp => `${styleProp}:${styleHash[styleProp]}`).join(';');
  }
  get inputKey() {
    return this.rowKeyValue + this.colKeyValue;
  }
  get massEditCheckboxLabel() {
    return formatLabel(i18n.updateSelectedItems, this.numberOfSelectedRows);
  }
  get applyLabel() {
    return i18n.apply;
  }
  get cancelLabel() {
    return i18n.cancel;
  }
  get required() {
    return this.columnDef.typeAttributes && this.columnDef.typeAttributes.required;
  }
  handleFormStartFocus() {
    this.interactingState.enter();
    if (this.isMassEditEnabled) {
      // on mass edit the panel dont loses the focus with the keyboard.
      this.focusLastElement();
    } else {
      this.triggerEditFinished({
        reason: 'tab-pressed-prev'
      });
    }
  }
  handleFormEndsFocus() {
    this.interactingState.enter();
    if (this.isMassEditEnabled) {
      // on mass edit the panel dont loses the focus with the keyboard.
      this.focus();
    } else {
      this.triggerEditFinished({
        reason: 'tab-pressed-next'
      });
    }
  }
  triggerEditFinished(detail) {
    detail.rowKeyValue = detail.rowKeyValue || this.rowKeyValue;
    detail.colKeyValue = detail.colKeyValue || this.colKeyValue;
    const event = new CustomEvent('ieditfinished', {
      detail
    });
    this.dispatchEvent(event);
  }
  focus() {
    const elem = this.inputableElement;
    this.interactingState.enter();
    if (elem) {
      elem.focus();
    }
  }
  get inputableElement() {
    return this.template.querySelector('.dt-type-edit-factory');
  }
  get value() {
    return this.inputableElement.value;
  }
  get validity() {
    return this.inputableElement.validity;
  }
  get isMassEditChecked() {
    return this.isMassEditEnabled && this.template.querySelector('[data-mass-selection="true"]').checked;
  }
  getPositionedElement() {
    return this.template.querySelector('section');
  }
  handleTypeElemBlur() {
    if (this.visible && !this.template.activeElement) {
      this.interactingState.leave();
    }
  }
  handleTypeElemFocus() {
    this.interactingState.enter();
  }
  handleEditFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.isMassEditEnabled) {
      this.processSubmission();
    }
    return false;
  }
  handleCellKeydown(event) {
    const {
      keyCode
    } = event;
    if (keyCode === 27) {
      // Esc key
      event.stopPropagation();
      this.cancelEdition();
    }
  }
  handlePanelLoosedFocus() {
    if (this.visible) {
      this.triggerEditFinished({
        reason: 'loosed-focus'
      });
    }
  }
  focusLastElement() {
    this.template.querySelector('[data-form-last-element="true"]').focus();
  }
  processSubmission() {
    if (this.validity.valid) {
      this.triggerEditFinished({
        reason: 'submit-action'
      });
    } else {
      this.inputableElement.showHelpMessageIfInvalid();
    }
  }
  cancelEdition() {
    this.triggerEditFinished({
      reason: 'edit-canceled'
    });
  }
  handleMassCheckboxChange(event) {
    const customEvent = new CustomEvent('masscheckboxchange', {
      detail: {
        checked: event.detail.checked
      }
    });
    this.dispatchEvent(customEvent);
  }
}
_registerDecorators(PrimitiveDatatableIeditPanel, {
  publicProps: {
    visible: {
      config: 0
    },
    rowKeyValue: {
      config: 0
    },
    colKeyValue: {
      config: 0
    },
    editedValue: {
      config: 0
    },
    columnDef: {
      config: 0
    },
    isMassEditEnabled: {
      config: 0
    },
    numberOfSelectedRows: {
      config: 0
    },
    value: {
      config: 1
    },
    validity: {
      config: 1
    },
    isMassEditChecked: {
      config: 1
    }
  },
  publicMethods: ["focus", "getPositionedElement"]
})
export default _registerComponent(PrimitiveDatatableIeditPanel, {
  tmpl: _tmpl
});