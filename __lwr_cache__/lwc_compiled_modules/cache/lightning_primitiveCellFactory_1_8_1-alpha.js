import { registerDecorators as _registerDecorators, registerComponent as _registerComponent } from "lwc";
import _tmpl from "./primitiveCellFactory.html";
import PrimitiveDatatableCell from 'lightning/primitiveDatatableCell';
import { classSet } from 'lightning/utils';
import cellWithStandardLayout from './cellWithStandardLayout.html';
import bareCustomCell from './bareCustomCell.html';
import labelEdit from '@salesforce/label/LightningDatatable.edit';
import labelEditHasError from '@salesforce/label/LightningDatatable.editHasError';
const i18n = {
  edit: labelEdit,
  editHasError: labelEditHasError
};
function isNumberedBasedType(cellType) {
  return cellType === 'currency' || cellType === 'number' || cellType === 'percent';
}
function isTypeCenteredByDefault(cellType) {
  return cellType === 'button-icon';
}
class PrivateCellFactory extends PrimitiveDatatableCell {
  constructor(...args) {
    super(...args);
    this.types = void 0;
    this.alignment = void 0;
    this.value = void 0;
    this.iconName = void 0;
    this.iconLabel = void 0;
    this.iconPosition = void 0;
    this.iconAlternativeText = void 0;
    this.editable = void 0;
    this.hasError = void 0;
    this.columnLabel = void 0;
    this.columnSubType = void 0;
    this.typeAttribute0 = void 0;
    this.typeAttribute1 = void 0;
    this.typeAttribute2 = void 0;
    this.typeAttribute3 = void 0;
    this.typeAttribute4 = void 0;
    this.typeAttribute5 = void 0;
    this.typeAttribute6 = void 0;
    this.typeAttribute7 = void 0;
    this.typeAttribute8 = void 0;
    this.typeAttribute9 = void 0;
    this.typeAttribute10 = void 0;
    this.typeAttribute21 = void 0;
    this.typeAttribute22 = void 0;
    this.wrapTextMaxLines = void 0;
    this._wrapText = false;
  } // typeAttribute21 and typeAttribute21 used by treegrid
  get wrapText() {
    return this._wrapText;
  }
  set wrapText(value) {
    if (value) {
      this.classList.add('slds-cell-wrap');
    } else {
      this.classList.remove('slds-cell-wrap');
    }
    this._wrapText = value;
  }
  get columnType() {
    return this._columnType;
  }
  set columnType(value) {
    if (value === 'tree') {
      this.classList.add('slds-no-space');
    }
    this._columnType = value;
  }
  getActionableElements() {
    const result = Array.prototype.slice.call(this.template.querySelectorAll('[data-navigation="enable"]'));
    const customType = this.template.querySelector('lightning-primitive-custom-cell');
    if (customType) {
      const wrapperActionableElements = customType.getActionableElements();
      wrapperActionableElements.forEach(elem => result.push(elem));
    }
    return result;
  }

  /**
   *  Getters for each type used in the template to include the correct formatted component.
   *  When any new type is added, getter should be added here to be used in the template
   */

  isType(typeName) {
    return typeName === this.columnType || typeName === this.columnSubType;
  }
  get isText() {
    return this.isType('text');
  }
  get isNumber() {
    return this.isType('number');
  }
  get isCurrency() {
    return this.isType('currency');
  }
  get isPercent() {
    return this.isType('percent');
  }
  get isEmail() {
    return this.isType('email');
  }
  get isDateTime() {
    return this.isType('date');
  }
  get isPhone() {
    return this.isType('phone');
  }
  get isUrl() {
    return this.isType('url');
  }
  get isLocation() {
    return this.isType('location');
  }
  get isRowNumber() {
    return this.isType('rowNumber');
  }
  get isAction() {
    return this.isType('action');
  }
  get isButton() {
    return this.isType('button');
  }
  get isButtonIcon() {
    return this.isType('button-icon');
  }
  get isBoolean() {
    return this.isType('boolean');
  }
  get isDateLocal() {
    return this.isType('date-local');
  }
  isLtrType() {
    return this.columnType === 'url' || this.columnType === 'email' || this.columnType === 'phone';
  }
  get hasTreeData() {
    return this.columnType === 'tree';
  }
  get isCustomType() {
    return this.types && this.types.isCustomType(this.columnType);
  }
  get isEditable() {
    // return true only for standard cells with editable true
    // TODO 226 custom cells with standardCellLayout should return true if editable is true
    return this.editable && !this.isCustomType;
  }
  render() {
    if (this.isCustomType && !this.types.standardCellLayoutForCustomType(this.columnType)) {
      return bareCustomCell;
    }
    return cellWithStandardLayout;
  }

  /**
   *  Getters related to styling of the wrapper or the types.
   */

  get isSpreadAlignment() {
    const alignment = this.computedAlignment;
    return !alignment || alignment === 'left' || alignment !== 'center' && alignment !== 'right';
  }

  // Note: this should be passed from above, but we dont have a defined architecture that lets customize / provide defaults
  // on cell attributes per type.
  get computedAlignment() {
    if (!this.alignment && isNumberedBasedType(this.columnType)) {
      return 'right';
    }
    if (!this.alignment && isTypeCenteredByDefault(this.columnType)) {
      return 'center';
    }
    return this.alignment;
  }
  get hasLeftIcon() {
    return this.iconName && (!this.iconPosition || this.iconPosition === 'left');
  }
  get hasRightIcon() {
    return this.iconName && this.iconPosition === 'right';
  }
  get computedCellDivClass() {
    return classSet().add({
      'slds-truncate': !this.isAction && this.columnType !== 'button-icon' && !this.wrapText
    }).add({
      'slds-hyphenate': this.wrapText
    }).add({
      'slds-line-clamp': this.wrapText && this.wrapTextMaxLines
    }).add({
      'ltr-content-in-rtl': document.dir === 'rtl' && this.isLtrType()
    }).toString();
  }
  get computedWrapperClass() {
    const alignment = this.computedAlignment;
    return classSet('slds-grid').add({
      'slds-no-space': this.hasTreeData,
      'slds-align_absolute-center': this.isAction,
      'slds-grid_align-end': alignment === 'right',
      'slds-grid_align-center': alignment === 'center',
      'slds-grid_align-spread': this.isSpreadAlignment
    }).toString();
  }
  get rowNumberErrorClass() {
    const classes = classSet('slds-m-horizontal_xxx-small');
    const error = this.typeAttribute0;
    if (error) {
      classes.add({
        'slds-hidden': !error.title && !error.messages
      });
    }
    return classes.toString();
  }
  get editIconAssistiveText() {
    const suffix = this.hasError ? ` ${i18n.editHasError}` : '';
    return `${i18n.edit} ${this.columnLabel}${suffix}`;
  }

  /**
   *  Getters related to manipulating value or attributes of any type go here.
   *  When any new type is added, getter should be added here if there is need.
   */

  get urlTarget() {
    return this.typeAttribute1 || '_self';
  }
  get urlTooltip() {
    if (this.typeAttribute2 === '') {
      return '';
    }
    return this.typeAttribute2 || this.value;
  }
  get isChecked() {
    return !!this.value;
  }
  get dateValue() {
    // new Date(null) returns new Date(0), which is not expected.
    // for undefined, '', or any other invalid values, formatted-date-time
    // just displays ''
    if (this.value === null) {
      return '';
    }

    // this is temporary, formatted-date-time should accept
    // date time string formats like '2017-03-01 08:45:12Z'
    // it's accepting only timestamp and Date objects
    return new Date(this.value);
  }
  get computedDateLocalDay() {
    return this.typeAttribute0 || 'numeric';
  }
  get computedDateLocalMonth() {
    return this.typeAttribute1 || 'short';
  }
  get computedDateLocalYear() {
    return this.typeAttribute2 || 'numeric';
  }
  get computedCssStyles() {
    if (this.wrapText && this.wrapTextMaxLines) {
      return `${'--lwc-lineClamp'}: ${this.wrapTextMaxLines}`;
    }
    return null;
  }

  /**
   *  Event handlers below this.
   *  If listening to any event on the wrapper or any type add the handler here
   */

  // Inline edit button
  handleEditButtonClick() {
    const {
      rowKeyValue,
      colKeyValue
    } = this;
    const event = new CustomEvent('privateeditcell', {
      bubbles: true,
      composed: true,
      detail: {
        rowKeyValue,
        colKeyValue
      }
    });
    this.dispatchEvent(event);
  }

  // Overridden click handler from the datatable-cell.
  handleClick() {
    if (!this.classList.contains('slds-has-focus')) {
      this.addFocusStyles();
      this.fireCellFocusByClickEvent();
    }
  }
  fireCellFocusByClickEvent() {
    let needsRefocusOnCellElement = false;
    const wrapperDiv = this.template.querySelector('div:first-child');
    const wrapperSpan = this.template.querySelector('span.slds-grid:first-child');
    const activeElement = this.template.activeElement;
    // pass a flag for IE11 to refocus on the cell element if the activeElement is not
    // something focusable in the cell or the cell td/th itself
    if (activeElement && (activeElement === wrapperDiv || activeElement === wrapperSpan)) {
      needsRefocusOnCellElement = true;
    }
    const {
      rowKeyValue,
      colKeyValue
    } = this;
    const event = new CustomEvent('privatecellfocusedbyclick', {
      bubbles: true,
      composed: true,
      detail: {
        rowKeyValue,
        colKeyValue,
        needsRefocusOnCellElement
      }
    });
    this.dispatchEvent(event);
  }
}
_registerDecorators(PrivateCellFactory, {
  publicProps: {
    types: {
      config: 0
    },
    alignment: {
      config: 0
    },
    value: {
      config: 0
    },
    iconName: {
      config: 0
    },
    iconLabel: {
      config: 0
    },
    iconPosition: {
      config: 0
    },
    iconAlternativeText: {
      config: 0
    },
    editable: {
      config: 0
    },
    hasError: {
      config: 0
    },
    columnLabel: {
      config: 0
    },
    columnSubType: {
      config: 0
    },
    typeAttribute0: {
      config: 0
    },
    typeAttribute1: {
      config: 0
    },
    typeAttribute2: {
      config: 0
    },
    typeAttribute3: {
      config: 0
    },
    typeAttribute4: {
      config: 0
    },
    typeAttribute5: {
      config: 0
    },
    typeAttribute6: {
      config: 0
    },
    typeAttribute7: {
      config: 0
    },
    typeAttribute8: {
      config: 0
    },
    typeAttribute9: {
      config: 0
    },
    typeAttribute10: {
      config: 0
    },
    typeAttribute21: {
      config: 0
    },
    typeAttribute22: {
      config: 0
    },
    wrapTextMaxLines: {
      config: 0
    },
    wrapText: {
      config: 3
    },
    columnType: {
      config: 3
    }
  },
  fields: ["_wrapText"]
})
export default _registerComponent(PrivateCellFactory, {
  tmpl: _tmpl
});