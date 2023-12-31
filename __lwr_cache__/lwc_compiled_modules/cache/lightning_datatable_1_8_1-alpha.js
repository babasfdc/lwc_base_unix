import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement, unwrap } from "lwc";
import _tmpl from "./datatable.html";
import datatableTpl from './datatable.html';
import { classSet } from 'lightning/utils';
import { normalizeBoolean, normalizeString, isSafari } from 'lightning/utilsPrivate';
import { LightningDatatableResizeObserver } from './datatableResizeObserver';
import { ColumnWidthManager } from './columnWidthManager';
import { generateHeaderIndexes, getDefaultState } from './normalizer';
import { setData, getData, updateRowsAndCellIndexes, setKeyField, getKeyField, hasValidKeyField } from './rows';
import { isResizeColumnDisabled, setResizeColumnDisabled, getResizeStep, setResizeStep, getMinColumnWidth, setMinColumnWidth, getMaxColumnWidth, setMaxColumnWidth, getColumnsWidths, resizeColumnWithDelta, getCustomerColumnWidths, getTableWidthStyle, updateColumnWidthsMetadata, getResizerDefaultState } from './resizer';
import { syncSelectedRowsKeys, handleRowSelectionChange, updateSelectionState, getMaxRowSelection, setMaxRowSelection, getSelectedRowsKeys, setSelectedRowsKeys, handleSelectAllRows, handleDeselectAllRows, handleSelectRow, handleDeselectRow, getHideSelectAllCheckbox, getCurrentSelectionLength } from './selector';
import { syncActiveCell, handleCellKeydown, updateActiveCell, setBlurActiveCell, setFocusActiveCell, isActiveCell, updateTabIndex, getIndexesByKeys, updateTabIndexActiveCell, updateTabIndexActiveRow, unsetRowNavigationMode, updateRowNavigationMode, handleDatatableLosedFocus, handleDatatableFocusIn, updateTabIndexRow, getIndexesActiveCell, reactToKeyboardOnRow, setCellToFocusFromPrev, updateCellToFocusFromPrev, resetCellToFocusFromPrev, datatableHasFocus, setCellClickedForFocus, handleKeyDown, addFocusStylesToActiveCell, refocusCellElement } from './keyboard';
import { getRowNumberOffset, setRowNumberOffset, hasRowNumberColumn, setShowRowNumberColumn } from './rowNumber';
import { getColumns, normalizeColumns } from './columns';
import { handleLoadMoreCheck, isInfiniteLoadingEnabled, setInfiniteLoading, getLoadMoreOffset, setLoadMoreOffset, isLoading, setLoading, handlePrefetch } from './infiniteLoading';
import { handleRowActionTriggered, handleLoadDynamicActions, handleCellButtonClick } from './rowLevelActions';
import { getSortedBy, setSortedBy, getSortedDirection, setSortedDirection, getDefaultSortDirection, setDefaultSortDirection, updateSorting } from './sort';
import { updateHeaderActions, handleHeaderActionTriggered, handleHeaderActionMenuOpening } from './headerActions';
import { setWrapTextMaxLines } from './wrapText';
import { isInlineEditTriggered, cancelInlineEdit, handleEditCell, handleInlineEditFinish, handleMassCheckboxChange, handleInlineEditPanelScroll, getDirtyValues, setDirtyValues, closeInlineEdit } from './inlineEdit';
import { hasTreeDataType } from './tree';
import { setErrors, getTableError, getErrors } from './errors';
import { generateUniqueId } from 'lightning/inputUtils';
import DatatableTypes from './types';
import labelAriaLiveNavigationMode from '@salesforce/label/LightningDatatable.ariaLiveNavigationMode';
import labelAriaLiveActionMode from '@salesforce/label/LightningDatatable.ariaLiveActionMode';
const typesMap = new WeakMap();
const i18n = {
  ariaLiveNavigationMode: labelAriaLiveNavigationMode,
  ariaLiveActionMode: labelAriaLiveActionMode
};

/**
 * A table that displays rows and columns of data.
 */
class LightningDatatable extends LightningElement {
  // Whether resizing is in progress

  constructor() {
    super();
    this.privateSuppressBottomBar = false;
    this.state = getDefaultState();
    this._columns = [];
    this._hideCheckboxColumn = false;
    this._draftValues = [];
    this.customerSelectedRows = null;
    this.privateDatatableId = generateUniqueId('lgt-datatable');
    this._columnWidthsMode = 'fixed';
    this.widthsData = getResizerDefaultState();
    this._isResizing = false;
    if (!typesMap.has(this.constructor)) {
      const privateTypes = new DatatableTypes(this.constructor.customTypes);
      typesMap.set(this.constructor, privateTypes);
    }
    this._columnWidthManager = new ColumnWidthManager(this.widthsData);
    this.updateRowsAndCellIndexes = updateRowsAndCellIndexes.bind(this);
  }
  get privateTypes() {
    return typesMap.get(this.constructor);
  }
  set columns(value) {
    this._columns = Array.isArray(value) ? value : [];
    this.updateColumns(this._columns);
    this._columnWidthManager.handleColumnsChange(getColumns(this.state));
  }

  /**
   * Array of the columns object that's used to define the data types.
   * Required properties include 'label', 'fieldName', and 'type'. The default type is 'text'.
   * See the Documentation tab for more information.
   * @type {array}
   */
  get columns() {
    return this._columns;
  }

  /**
   * This value specifies the number of lines after which the
   * content will be cut off and hidden. It must be at least 1 or more.
   * The text in the last line is truncated and shown with an ellipsis.
   * @type {integer}
   */
  get wrapTextMaxLines() {
    return this.state.wrapTextMaxLines;
  }
  set wrapTextMaxLines(value) {
    const {
      state
    } = this;
    setWrapTextMaxLines(state, value);
    this._columnWidthManager.wrapTextMaxLines = state.wrapTextMaxLines;
    this.updateRowsAndCellIndexes(this.state);
  }
  set data(value) {
    const data = Array.isArray(value) ? value : [];
    const previousData = getData(this.state);
    const columns = getColumns(this.state);
    this._columnWidthManager.handleDataChange(previousData, data, columns);

    // set data in state
    setData(this.state, value);

    // do necessary updates since rows have changed
    if (hasValidKeyField(this.state)) {
      this.updateRowsState();
    }
    if (this.customerSelectedRows) {
      this.setSelectedRows(this.customerSelectedRows);
    }
  }

  /**
   * The array of data to be displayed.
   * @type {array}
   */
  get data() {
    return getData(this.state);
  }
  set keyField(value) {
    setKeyField(this.state, value);
    setDirtyValues(this.state, this._draftValues);
    this.updateRowsState();
  }

  /**
   * Required for better performance.
   * Associates each row with a unique ID.
   * @type {string}
   * @required
   */
  get keyField() {
    return getKeyField(this.state);
  }
  set hideCheckboxColumn(value) {
    const {
      state
    } = this;
    const normalizedValue = normalizeBoolean(value);
    this._hideCheckboxColumn = normalizedValue;
    this._columnWidthManager.handleCheckboxColumnChange(state.hideCheckboxColumn, normalizedValue, getColumns(state));
    this.state.hideCheckboxColumn = normalizeBoolean(value);
    // update the columns metadata again to update the status.
    this.updateColumns(this._columns);
  }

  /**
   * If present, the checkbox column for row selection is hidden.
   * @type {boolean}
   * @default false
   */
  get hideCheckboxColumn() {
    return this._hideCheckboxColumn;
  }
  set showRowNumberColumn(value) {
    const {
      state
    } = this;
    this._columnWidthManager.handleRowNumberColumnChange(getRowNumberOffset(state), value, getColumns(state));
    setShowRowNumberColumn(state, value);
    this.updateColumns(this._columns);
  }

  /**
   * If present, the row numbers are shown in the first column.
   * @type {boolean}
   * @default false
   */
  get showRowNumberColumn() {
    return hasRowNumberColumn(this.state);
  }
  set rowNumberOffset(value) {
    const {
      state,
      widthsData
    } = this;
    setRowNumberOffset(state, value);
    this._columnWidthManager.handleRowNumberOffsetChange(state, widthsData);
  }

  /**
   * Determines where to start counting the row number.
   * The default is 0.
   * @type {number}
   * @default 0
   */
  get rowNumberOffset() {
    return getRowNumberOffset(this.state);
  }
  set resizeColumnDisabled(value) {
    setResizeColumnDisabled(this.widthsData, value);
  }

  /**
   * If present, column resizing is disabled.
   * @type {boolean}
   * @default false
   */
  get resizeColumnDisabled() {
    return isResizeColumnDisabled(this.widthsData);
  }
  set minColumnWidth(value) {
    const {
      state,
      widthsData
    } = this;
    setMinColumnWidth(state, widthsData, value);
    this._columnWidthManager.minColumnWidth = this.minColumnWidth;
  }

  /**
   * The minimum width for all columns.
   * The default is 50px.
   * @type {number}
   * @default 50px
   */
  get minColumnWidth() {
    return getMinColumnWidth(this.widthsData);
  }
  set maxColumnWidth(value) {
    const {
      state,
      widthsData
    } = this;
    setMaxColumnWidth(state, widthsData, value);
    this._columnWidthManager.maxColumnWidth = this.maxColumnWidth;
  }

  /**
   * The maximum width for all columns.
   * The default is 1000px.
   * @type {number}
   * @default 1000px
   */
  get maxColumnWidth() {
    return getMaxColumnWidth(this.widthsData);
  }
  set resizeStep(value) {
    setResizeStep(this.widthsData, value);
  }

  /**
   * The width to resize the column when a user presses left or right arrow.
   * The default is 10px.
   * @type {number}
   * @default 10px
   */
  get resizeStep() {
    return getResizeStep(this.widthsData);
  }
  set sortedBy(value) {
    setSortedBy(this.state, value);
    updateSorting(this.state);
  }

  /**
   * The column fieldName that controls the sorting order.
   * Sort the data using the onsort event handler.
   * @type {string}
   */
  get sortedBy() {
    return getSortedBy(this.state);
  }
  set sortedDirection(value) {
    setSortedDirection(this.state, value);
    updateSorting(this.state);
  }

  /**
   * Specifies the sorting direction.
   * Sort the data using the onsort event handler.
   * Valid options include 'asc' and 'desc'.
   * @type {string}
   */
  get sortedDirection() {
    return getSortedDirection(this.state);
  }
  set defaultSortDirection(value) {
    setDefaultSortDirection(this.state, value);
    updateSorting(this.state);
  }

  /**
   * Specifies the default sorting direction on an unsorted column.
   * Valid options include 'asc' and 'desc'.
   * The default is 'asc' for sorting in ascending order.
   * @type {string}
   * @default asc
   */
  get defaultSortDirection() {
    return getDefaultSortDirection(this.state);
  }
  set enableInfiniteLoading(value) {
    setInfiniteLoading(this.state, value);
  }

  /**
   * If present, you can load a subset of data and then display more
   * when users scroll to the end of the table.
   * Use with the onloadmore event handler to retrieve more data.
   * @type {boolean}
   * @default false
   */
  get enableInfiniteLoading() {
    return isInfiniteLoadingEnabled(this.state);
  }
  set loadMoreOffset(value) {
    setLoadMoreOffset(this.state, value);
  }

  /**
   * Determines when to trigger infinite loading based on
   * how many pixels the table's scroll position is from the bottom of the table.
   * The default is 20.
   * @type {number}
   * @default 20
   */
  get loadMoreOffset() {
    return getLoadMoreOffset(this.state);
  }
  set isLoading(value) {
    setLoading(this.state, value);
  }

  /**
   * If present, a spinner is shown to indicate that more data is loading.
   * @type {boolean}
   * @default false
   */
  get isLoading() {
    return isLoading(this.state);
  }
  set maxRowSelection(value) {
    const previousSelectionLenght = getCurrentSelectionLength(this.state);
    setMaxRowSelection(this.state, value);
    if (previousSelectionLenght > 0) {
      this.fireSelectedRowsChange(this.getSelectedRows());
    }
  }

  /**
   * The maximum number of rows that can be selected.
   * Checkboxes are used for selection by default,
   * and radio buttons are used when maxRowSelection is 1.
   * @type {number}
   */
  get maxRowSelection() {
    return getMaxRowSelection(this.state);
  }
  set selectedRows(value) {
    this.customerSelectedRows = value;
    this.setSelectedRows(value);
  }

  /**
   * Enables programmatic row selection with a list of key-field values.
   * @type {list}
   */
  get selectedRows() {
    return getSelectedRowsKeys(this.state);
  }
  set errors(value) {
    setErrors(this.state, value);
    this.updateRowsState();
  }

  /**
   * Specifies an object containing information about cell level, row level, and table level errors.
   * When it's set, error messages are displayed on the table accordingly.
   * @type {object}
   */
  get errors() {
    return getErrors(this.state);
  }

  /**
   * The current values per row that are provided during inline edit.
   * @type {object}
   */
  get draftValues() {
    return getDirtyValues(this.state);
  }
  set draftValues(value) {
    this._draftValues = value;
    setDirtyValues(this.state, value);
    if (hasValidKeyField(this.state)) {
      this.updateRowsAndCellIndexes(this.state);
    }
  }

  /**
   * If present, the table header is hidden.
   * @type {boolean}
   * @default false
   */
  get hideTableHeader() {
    return this.state.hideTableHeader;
  }
  set hideTableHeader(value) {
    this.state.hideTableHeader = !!value;
  }
  get hasValidKeyField() {
    if (hasValidKeyField(this.state)) {
      return true;
    }
    // eslint-disable-next-line no-console
    console.error(`The "keyField" is a required attribute of lightning:datatable.`);
    return false;
  }
  get showSelectAllCheckbox() {
    return !getHideSelectAllCheckbox(this.state);
  }

  /**
   * If present, the footer that displays the Save and Cancel buttons is hidden during inline editing.
   * @type {boolean}
   * @default false
   */
  get suppressBottomBar() {
    return this.privateSuppressBottomBar;
  }
  set suppressBottomBar(value) {
    this.privateSuppressBottomBar = !!value;
  }

  /**
   * Specifies how column widths are calculated. Set to 'fixed" for columns with equal widths.
   * Set to 'auto' for column widths based on the width of the column content and the table width. The default is 'fixed'.
   * @type {string}
   * @default fixed
   */
  set columnWidthsMode(value) {
    const normalizedValue = normalizeString(value, {
      fallbackValue: 'fixed',
      validValues: ['fixed', 'auto']
    });
    this._columnWidthManager.columnWidthMode = normalizedValue;
    const {
      state,
      widthsData
    } = this;
    if (widthsData.columnWidthsMode !== normalizedValue) {
      this._columnWidthManager.handleWidthModeChange(getColumns(state));
    }
    widthsData.columnWidthsMode = normalizedValue;
  }
  get columnWidthsMode() {
    return this.widthsData.columnWidthsMode;
  }
  connectedCallback() {
    const {
      handleResizeColumn,
      handleUpdateColumnSort,
      handleCellFocusByClick,
      handleFalseCellBlur,
      handleSelectionCellClick
    } = this;
    this.template.addEventListener('selectallrows', handleSelectionCellClick.bind(this));
    this.template.addEventListener('deselectallrows', handleSelectionCellClick.bind(this));
    this.template.addEventListener('selectrow', handleSelectionCellClick.bind(this));
    this.template.addEventListener('deselectrow', handleSelectionCellClick.bind(this));
    this.addEventListener('rowselection', handleRowSelectionChange.bind(this));
    this.template.addEventListener('resizecol', handleResizeColumn.bind(this));
    this.template.addEventListener('privateupdatecolsort', handleUpdateColumnSort.bind(this));
    this.template.addEventListener('privatecellkeydown', handleCellKeydown.bind(this));
    this.template.addEventListener('privatecellfocusedbyclick', handleCellFocusByClick.bind(this));
    this.template.addEventListener('privatecellfalseblurred', handleFalseCellBlur.bind(this));

    // row-level-actions
    this.template.addEventListener('privatecellactiontriggered', handleRowActionTriggered.bind(this));
    this.template.addEventListener('privatecellactionmenuopening', handleLoadDynamicActions.bind(this));
    this.template.addEventListener('privatecellbuttonclicked', handleCellButtonClick.bind(this));

    // header-actions
    this.template.addEventListener('privatecellheaderactionmenuopening', handleHeaderActionMenuOpening.bind(this));
    this.template.addEventListener('privatecellheaderactiontriggered', handleHeaderActionTriggered.bind(this));

    // inline-edit
    this.template.addEventListener('privateeditcell', handleEditCell.bind(this));
  }
  render() {
    return datatableTpl;
  }
  handleTrRowKeyDown(event) {
    // we probably should not be doing this unless we actually are interested in it
    if (this.state.keyboardMode === 'NAVIGATION' && this.state.rowMode === true) {
      event.stopPropagation();
      const tr = event.currentTarget;
      const rowKeyValue = tr.getAttribute('data-row-key-value');
      const keyCode = event.keyCode;
      const rowHasChildren = !!tr.getAttribute('aria-expanded');
      const rowExpanded = tr.getAttribute('aria-expanded') === 'true';
      const rowLevel = tr.getAttribute('aria-level');
      const evt = {
        target: tr,
        detail: {
          rowKeyValue,
          keyCode,
          rowHasChildren,
          rowExpanded,
          rowLevel,
          keyEvent: event
        }
      };
      reactToKeyboardOnRow(this, this.state, evt);
    }
  }
  disconnectedCallback() {
    if (this.privateWidthObserver) {
      this.privateWidthObserver.disconnect();
    }
  }
  renderedCallback() {
    const {
      state,
      template,
      widthsData
    } = this;
    if (!this.privateWidthObserver) {
      this.privateWidthObserver = new LightningDatatableResizeObserver(template, state, widthsData, this._columnWidthManager);
    } else if (!this.privateWidthObserver.isConnected()) {
      this.privateWidthObserver.observe(template);
    }
    if (this._columnWidthManager.isResizingUpdateQueued()) {
      const fireResizeEvent = this._columnWidthManager.shouldFireResizeEvent(widthsData, getColumns(state));
      this._columnWidthManager.adjustColumnsSize(template, getColumns(state), widthsData);
      if (fireResizeEvent) {
        this.fireOnResize(false);
      }
    }
    handlePrefetch.call(this, template, state);
    // customerSelectedRows is only valid till render, after it, the one used should be the one from the state.
    this.customerSelectedRows = null;
    // set the previous focused cell to null after render is done
    resetCellToFocusFromPrev(state);
  }
  setSelectedRows(value) {
    setSelectedRowsKeys(this.state, value);
    handleRowSelectionChange.call(this);
  }
  updateRowsState() {
    const {
      state,
      widthsData,
      template
    } = this;
    // calculate cell to focus next before indexes are updated
    setCellToFocusFromPrev(state, template);
    this.updateRowsAndCellIndexes(state);
    this._columnWidthManager.handleRowNumberOffsetChange(state, widthsData);
    // update celltofocus next to null if the row still exists after indexes calculation
    updateCellToFocusFromPrev(state);
    syncSelectedRowsKeys(state, this.getSelectedRows()).ifChanged(() => {
      // Only trigger row selection event once after all the setters have executed
      // Otherwise, event can be fired with stale data if not all setters have been triggered
      if (!this._rowSelectionEventPending) {
        this._rowSelectionEventPending = true;
        Promise.resolve().then(() => {
          if (this._rowSelectionEventPending) {
            this.fireSelectedRowsChange(this.getSelectedRows());
            this._rowSelectionEventPending = false;
          }
        });
      }
    });
    syncActiveCell(state);
    if (state.keyboardMode === 'NAVIGATION') {
      updateTabIndexActiveCell(state);
      updateTabIndexActiveRow(state);
    }
    // if there is previously focused cell which was deleted set focus from celltofocus next
    if (state.cellToFocusNext && state.activeCell) {
      setFocusActiveCell(this.template, this.state);
    }
  }
  updateColumns(columns) {
    const {
      state,
      widthsData,
      template
    } = this;
    const hadTreeDataTypePreviously = hasTreeDataType(state);
    // calculate cell to focus next before indexes are updated
    setCellToFocusFromPrev(state, template);
    normalizeColumns(state, columns, this.privateTypes);
    setDirtyValues(state, this._draftValues);
    updateRowNavigationMode(hadTreeDataTypePreviously, state);
    state.headerIndexes = generateHeaderIndexes(getColumns(state));
    // Updates wrapText value in state and checked value in header action dropdown
    updateHeaderActions(state);
    this.updateRowsAndCellIndexes(state);
    updateSelectionState(state);
    this._columnWidthManager.handleRowNumberOffsetChange(state, widthsData);
    updateColumnWidthsMetadata(state, widthsData);
    // set the celltofocus next to null if the column still exists after indexes calculation
    updateCellToFocusFromPrev(state);
    if (getColumns(state).length !== getColumnsWidths(widthsData).length) {
      if (getData(state).length > 0) {
        // when there are column changes, update the active cell
        syncActiveCell(state);
      }
    }
    if (state.keyboardMode === 'NAVIGATION') {
      updateTabIndexActiveCell(state);
      updateTabIndexActiveRow(state);
    }
    // if there is previously focused cell which was deleted set focus from celltofocus next
    if (state.cellToFocusNext && state.activeCell) {
      setFocusActiveCell(this.template, this.state);
    }
  }
  get computedTableHeaderClass() {
    if (this.state.hideTableHeader) {
      return 'slds-assistive-text';
    }
    return undefined;
  }
  get computedScrollerStyle() {
    if (this._columnWidthManager.isAutoResizingUpdateQueued()) {
      return 'overflow-x:auto';
    }
    return getTableWidthStyle(this.widthsData);
  }
  get computedTableContainerClass() {
    return classSet('slds-table_header-fixed_container').add({
      'slds-scrollable_x': !this._isResizing
    }).toString();
  }
  get computedTableClass() {
    return classSet('slds-table slds-table_header-fixed slds-table_bordered slds-table_edit').add({
      'slds-table_resizable-cols': this.hasResizebleColumns
    }).add({
      'slds-tree slds-table_tree': hasTreeDataType(this.state)
    }).toString();
  }
  get computedTableRole() {
    return hasTreeDataType(this.state) ? 'treegrid' : 'grid';
  }
  get computedTableStyle() {
    if (this._columnWidthManager.isAutoResizingUpdateQueued()) {
      return ['table-layout:auto'].join(';');
    }
    return ['table-layout:fixed', getTableWidthStyle(this.widthsData)].join(';');
  }
  get computedAriaLiveClassForNavMode() {
    return classSet().add({
      'slds-hide': this.state.keyboardMode !== 'NAVIGATION'
    }).add({
      'slds-assistive-text': this.state.keyboardMode === 'NAVIGATION'
    }).toString();
  }
  get computedAriaLiveClassForActionMode() {
    return classSet().add({
      'slds-hide': this.state.keyboardMode !== 'ACTION'
    }).add({
      'slds-assistive-text': this.state.keyboardMode === 'ACTION'
    }).toString();
  }
  get ariaLiveNavigationModeText() {
    return `${i18n.ariaLiveNavigationMode}`;
  }
  get ariaLiveActionModeText() {
    return `${i18n.ariaLiveActionMode}`;
  }
  get computedTbodyStyle() {
    if (hasRowNumberColumn(this.state) && getRowNumberOffset(this.state) >= 0) {
      return 'counter-reset: row-number ' + getRowNumberOffset(this.state);
    }
    return '';
  }
  get hasSelectableRows() {
    return !this.state.hideCheckboxColumn;
  }
  get hasResizebleColumns() {
    return !isResizeColumnDisabled(this.widthsData);
  }
  get numberOfColumns() {
    return getColumns(this.state).length;
  }
  get showLoadingIndicator() {
    return isLoading(this.state);
  }
  get scrollerXStyles() {
    const styles = {
      height: '100%'
    };
    if (this.showStatusBar) {
      styles['padding-bottom'] = '3rem';
    }
    if (this._columnWidthManager.isAutoResizingUpdateQueued()) {
      styles['overflow-x'] = 'auto';
    }
    return Object.entries(styles).map(([key, value]) => key + ':' + value).join(';');
  }
  get showStatusBar() {
    return isInlineEditTriggered(this.state) && !this.suppressBottomBar;
  }
  get tableError() {
    return getTableError(this.state);
  }
  handleUpdateColumnSort(event) {
    event.stopPropagation();
    const {
      fieldName,
      sortDirection
    } = event.detail;
    this.fireSortedColumnChange(fieldName, sortDirection);
  }
  handleHorizontalScroll(event) {
    handleInlineEditPanelScroll.call(this, event);
  }
  handleVerticalScroll(event) {
    if (this.enableInfiniteLoading) {
      handleLoadMoreCheck.call(this, event);
    }
    handleInlineEditPanelScroll.call(this, event);
  }
  fireSelectedRowsChange(selectedRows) {
    const event = new CustomEvent('rowselection', {
      detail: {
        selectedRows
      }
    });
    this.dispatchEvent(event);
  }
  fireSortedColumnChange(fieldName, sortDirection) {
    const event = new CustomEvent('sort', {
      detail: {
        fieldName,
        sortDirection
      }
    });
    this.dispatchEvent(event);
  }
  fireOnResize(isUserTriggered) {
    const {
      state,
      widthsData
    } = this;
    const event = new CustomEvent('resize', {
      detail: {
        columnWidths: getCustomerColumnWidths(state, widthsData),
        isUserTriggered: !!isUserTriggered
      }
    });
    this.dispatchEvent(event);
  }
  safariHeaderFix() {
    // W-6363867, W-7143375 Safari Refresh Bug
    if (isSafari) {
      const thead = this.template.querySelector('thead');
      if (thead) {
        /* Safari hack: hide and show the table head to force a browser repaint */
        thead.style.display = 'none';

        // eslint-disable-next-line @lwc/lwc/no-async-operation
        requestAnimationFrame(() => {
          thead.style.display = '';
        });
      }
    }
  }
  handleResizeColumn(event) {
    event.stopPropagation();
    const {
      state,
      widthsData
    } = this;
    const {
      colIndex,
      widthDelta
    } = event.detail;
    if (widthDelta !== 0) {
      resizeColumnWithDelta(state, widthsData, colIndex, widthDelta);
      this.fireOnResize(true);
      this.safariHeaderFix();
    }
  }
  get tableTabIndex() {
    return this.state.focusIsInside ? '-1' : '0';
  }
  handleSelectionCellClick(event) {
    this.handleCellFocusByClick(event);
    if (event.type === 'selectrow') {
      handleSelectRow.call(this, event);
    } else if (event.type === 'deselectrow') {
      handleDeselectRow.call(this, event);
    } else if (event.type === 'selectallrows') {
      handleSelectAllRows.call(this, event);
    } else if (event.type === 'deselectallrows') {
      handleDeselectAllRows.call(this, event);
    }
  }
  handleCellFocusByClick(event) {
    event.stopPropagation();
    const {
      rowKeyValue,
      colKeyValue,
      needsRefocusOnCellElement
    } = event.detail;
    const {
      state
    } = this;
    if (!isActiveCell(state, rowKeyValue, colKeyValue)) {
      if (state.rowMode && state.activeCell) {
        unsetRowNavigationMode(state);
        const {
          rowIndex
        } = getIndexesActiveCell(state);
        updateTabIndexRow(state, rowIndex, -1);
      }
      this.setActiveCell(rowKeyValue, colKeyValue);
      refocusCellElement(this.template, state, needsRefocusOnCellElement);
    }
  }
  handleCellClick(event) {
    // handles the case when clicking on the margin/pading of the td/th
    const targetTagName = event.target.tagName.toLowerCase();
    if (targetTagName === 'td' || targetTagName === 'th') {
      // get the row/col key value from the primitive cell.
      const {
        rowKeyValue,
        colKeyValue
      } = event.target.querySelector(':first-child');
      const {
        state,
        template
      } = this;
      if (state.rowMode || !isActiveCell(state, rowKeyValue, colKeyValue)) {
        if (state.rowMode && state.activeCell) {
          unsetRowNavigationMode(state);
          const {
            rowIndex
          } = getIndexesActiveCell(state);
          updateTabIndexRow(state, rowIndex, -1);
        }
        this.setActiveCell(rowKeyValue, colKeyValue);
      }
      if (!datatableHasFocus(state, template)) {
        setCellClickedForFocus(state);
      }
    }
  }
  setActiveCell(rowKeyValue, colKeyValue) {
    const {
      template,
      state
    } = this;
    const {
      rowIndex,
      colIndex
    } = getIndexesByKeys(state, rowKeyValue, colKeyValue);
    setBlurActiveCell(template, state);
    updateActiveCell(state, rowKeyValue, colKeyValue);
    addFocusStylesToActiveCell(template, state);
    updateTabIndex(state, rowIndex, colIndex, 0);
  }
  handleFalseCellBlur(event) {
    event.stopPropagation();
    const {
      template,
      state
    } = this;
    const {
      rowKeyValue,
      colKeyValue
    } = event.detail;
    if (!isActiveCell(state, rowKeyValue, colKeyValue)) {
      this.setActiveCell(rowKeyValue, colKeyValue);
    }
    setFocusActiveCell(template, state);
  }

  /**
   * Returns data in each selected row.
   * @returns {array} An array of data in each selected row.
   */
  getSelectedRows() {
    const data = unwrap(getData(this.state));
    return this.state.rows.reduce((prev, row, index) => {
      if (row.isSelected) {
        prev.push(data[index]);
      }
      return prev;
    }, []);
  }
  handleTableFocusIn(event) {
    handleDatatableFocusIn.call(this, event);
  }
  handleTableFocusOut(event) {
    handleDatatableLosedFocus.call(this, event);
  }

  /**
   * @return {Object} containing the visible dimensions of the table { left, right, top, bottom, }
   */
  getViewableRect() {
    const scrollerX = this.template.querySelector('.slds-scrollable_x').getBoundingClientRect();
    const scrollerY = this.template.querySelector('.slds-scrollable_y').getBoundingClientRect();
    return {
      left: scrollerX.left,
      right: scrollerX.right,
      top: scrollerY.top,
      bottom: scrollerY.bottom
    };
  }
  handleInlineEditFinish(event) {
    handleInlineEditFinish.call(this, event);
  }
  handleMassCheckboxChange(event) {
    handleMassCheckboxChange.call(this, event);
  }
  handleInlineEditSave(event) {
    event.stopPropagation();
    event.preventDefault();
    closeInlineEdit(this);
    const draftValues = this.draftValues;
    this.dispatchEvent(new CustomEvent('save', {
      detail: {
        draftValues
      }
    }));
  }
  handleInlineEditCancel(event) {
    event.stopPropagation();
    event.preventDefault();
    closeInlineEdit(this);
    const customerEvent = new CustomEvent('cancel', {
      cancelable: true
    });
    this.dispatchEvent(customerEvent);
    if (!customerEvent.defaultPrevented) {
      cancelInlineEdit(this);
    }
  }
  handleTableKeydown(event) {
    handleKeyDown.call(this, event);
  }
  handleResizeStart(event) {
    event.stopPropagation();
    this._isResizing = true;
  }
  handleResizeEnd(event) {
    event.stopPropagation();
    this._isResizing = false;
  }
}
_registerDecorators(LightningDatatable, {
  publicProps: {
    columns: {
      config: 3
    },
    wrapTextMaxLines: {
      config: 3
    },
    data: {
      config: 3
    },
    keyField: {
      config: 3
    },
    hideCheckboxColumn: {
      config: 3
    },
    showRowNumberColumn: {
      config: 3
    },
    rowNumberOffset: {
      config: 3
    },
    resizeColumnDisabled: {
      config: 3
    },
    minColumnWidth: {
      config: 3
    },
    maxColumnWidth: {
      config: 3
    },
    resizeStep: {
      config: 3
    },
    sortedBy: {
      config: 3
    },
    sortedDirection: {
      config: 3
    },
    defaultSortDirection: {
      config: 3
    },
    enableInfiniteLoading: {
      config: 3
    },
    loadMoreOffset: {
      config: 3
    },
    isLoading: {
      config: 3
    },
    maxRowSelection: {
      config: 3
    },
    selectedRows: {
      config: 3
    },
    errors: {
      config: 3
    },
    draftValues: {
      config: 3
    },
    hideTableHeader: {
      config: 3
    },
    suppressBottomBar: {
      config: 3
    },
    columnWidthsMode: {
      config: 3
    }
  },
  publicMethods: ["getSelectedRows"],
  track: {
    privateSuppressBottomBar: 1,
    state: 1,
    _columnWidthsMode: 1,
    widthsData: 1
  },
  fields: ["_columns", "_hideCheckboxColumn", "_draftValues", "customerSelectedRows", "privateDatatableId", "_isResizing"]
})
export default _registerComponent(LightningDatatable, {
  tmpl: _tmpl
});