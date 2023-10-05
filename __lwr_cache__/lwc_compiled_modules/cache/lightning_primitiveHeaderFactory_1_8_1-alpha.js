import { registerDecorators as _registerDecorators, registerComponent as _registerComponent } from "lwc";
import _tmpl from "./primitiveHeaderFactory.html";
import labelChooseARow from '@salesforce/label/LightningDatatable.chooseARow';
import labelSelectAll from '@salesforce/label/LightningDatatable.selectAll';
import labelSort from '@salesforce/label/LightningDatatable.sort';
import labelSortAsc from '@salesforce/label/LightningDatatable.sortAsc';
import labelSortDesc from '@salesforce/label/LightningDatatable.sortDesc';
import labelSortNone from '@salesforce/label/LightningDatatable.sortNone';
import PrimitiveDatatableCell from 'lightning/primitiveDatatableCell';
import { classSet } from 'lightning/utils';
import { classListMutation } from 'lightning/utilsPrivate';
import selectable from './selectableHeader.html';
import sortable from './sortableHeader.html';
import nonsortable from './nonsortableHeader.html';
const i18n = {
  chooseARow: labelChooseARow,
  selectAll: labelSelectAll,
  sort: labelSort,
  sortAsc: labelSortAsc,
  sortDesc: labelSortDesc,
  sortNone: labelSortNone
};
function preventDefaultAndStopPropagation(event) {
  event.preventDefault();
  event.stopPropagation();
}
class PrimitiveHeaderFactory extends PrimitiveDatatableCell {
  constructor(...args) {
    super(...args);
    this.colIndex = void 0;
    this.sorted = void 0;
    this.sortedDirection = void 0;
    this.resizestep = void 0;
    this.columnWidth = void 0;
    this.actions = void 0;
    this.showCheckbox = false;
    this.dtContextId = void 0;
    this._resizable = void 0;
    this._def = {};
    this._sortable = false;
  }
  get resizable() {
    return this._resizable;
  }
  set resizable(value) {
    this._resizable = value;
    this.updateElementClasses();
  }
  get def() {
    return this._def;
  }
  set def(value) {
    this._def = value;
    this.updateElementClasses();
  }
  get sortable() {
    return this._sortable;
  }
  getDomWidth() {
    const child = this.template.querySelector('.slds-cell-fixed');
    if (child) {
      return child.offsetWidth;
    }
    return '';
  }
  set sortable(value) {
    this._sortable = value;
    this.updateElementClasses();
  }
  render() {
    if (this.isSelectableHeader) {
      return selectable;
    } else if (this.sortable) {
      return sortable;
    }
    return nonsortable;
  }
  renderedCallback() {
    if (this.isSelectableHeader && this.showCheckbox) {
      this.updateBulkSelectionCheckbox();
    }
  }
  updateElementClasses() {
    classListMutation(this.classList, {
      'slds-is-sortable': this.isSortable,
      'slds-is-resizable': this.isResizable
    });
  }
  get columnStyles() {
    const outlineStyle = this.isSortable ? '' : 'outline:none;';
    return `
            width: ${this.columnWidth}px;
            ${outlineStyle}
        `;
  }
  get computedClass() {
    return classSet('slds-cell-fixed').add({
      'slds-has-button-menu': this.hasActions
    }).toString();
  }
  get computedSortClass() {
    return classSet('slds-th__action slds-text-link_reset').add({
      'slds-is-sorted': this.sorted
    }).add({
      'slds-is-sorted_asc': this.isAscSorting
    }).add({
      'slds-is-sorted_desc': this.isDescSorting
    }).toString();
  }
  get isAscSorting() {
    return this.sortedDirection === 'asc';
  }
  get isDescSorting() {
    return this.sortedDirection === 'desc';
  }
  get sortedOrderLabel() {
    if (this.sorted) {
      return this.sortedDirection === 'desc' ? i18n.sortDesc : i18n.sortAsc;
    }
    return i18n.sortNone;
  }
  get isSelectableHeader() {
    return this.def.type === 'SELECTABLE_CHECKBOX';
  }
  get isRegularHeader() {
    return this.def.type !== 'SELECTABLE_CHECKBOX';
  }
  get isResizable() {
    return this.resizable && this.def.resizable !== false;
  }
  get isSortable() {
    return this.sortable;
  }
  get i18n() {
    return i18n;
  }
  get headerRole() {
    return this.isResizable || this.sortable ? 'button' : false;
  }
  get resizeStep() {
    return this.resizestep;
  }
  get computedOptionName() {
    return `${this.dtContextId}-options`;
  }
  handleSelectAllRows() {
    const {
      rowKeyValue,
      colKeyValue
    } = this;
    const actionName = this.def.bulkSelection === 'none' ? 'selectallrows' : 'deselectallrows';
    // eslint-disable-next-line lightning-global/no-custom-event-identifier-arguments
    const actionEvent = new CustomEvent(actionName, {
      bubbles: true,
      composed: true,
      detail: {
        rowKeyValue,
        colKeyValue
      }
    });
    this.dispatchEvent(actionEvent);
  }
  handleSortingClick(event) {
    event.preventDefault();
    if (this.isSortable) {
      preventDefaultAndStopPropagation(event);
      this.fireSortedColumn(this.def.fieldName, this.getTargetSortDirection());
      this.fireCellFocusByClickEvent();
    }
  }
  getTargetSortDirection() {
    if (this.sorted) {
      return this.sortedDirection === 'desc' ? 'asc' : 'desc';
    }
    return this.sortedDirection;
  }
  fireSortedColumn(fieldName, sortDirection) {
    const event = new CustomEvent('privateupdatecolsort', {
      bubbles: true,
      composed: true,
      detail: {
        fieldName,
        sortDirection
      }
    });
    this.dispatchEvent(event);
  }
  get hasActions() {
    return this.actions.customerActions.length > 0 || this.actions.internalActions.length > 0;
  }
  updateBulkSelectionCheckbox() {
    const allCheckbox = this.template.querySelector('.datatable-select-all');
    allCheckbox.indeterminate = this.def.bulkSelection === 'some';

    // Note: since we have to handle the indeterminate state,
    //       this is to remove a raptor warning `Unneccessary update of property "checked"`
    allCheckbox.checked = !(this.def.bulkSelection === 'none');
  }
}
_registerDecorators(PrimitiveHeaderFactory, {
  publicProps: {
    colIndex: {
      config: 0
    },
    sorted: {
      config: 0
    },
    sortedDirection: {
      config: 0
    },
    resizestep: {
      config: 0
    },
    columnWidth: {
      config: 0
    },
    actions: {
      config: 0
    },
    showCheckbox: {
      config: 0
    },
    dtContextId: {
      config: 0
    },
    resizable: {
      config: 3
    },
    def: {
      config: 3
    },
    sortable: {
      config: 3
    }
  },
  publicMethods: ["getDomWidth"],
  track: {
    _resizable: 1,
    _def: 1,
    _sortable: 1
  }
})
export default _registerComponent(PrimitiveHeaderFactory, {
  tmpl: _tmpl
});