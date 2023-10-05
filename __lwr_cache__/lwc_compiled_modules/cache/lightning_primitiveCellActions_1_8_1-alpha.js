import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./primitiveCellActions.html";
import labelLoadingActions from '@salesforce/label/LightningPrimitiveCellActions.loadingActions';
import labelShowActions from '@salesforce/label/LightningPrimitiveCellActions.showActions';
import { normalizeString } from 'lightning/utilsPrivate';
const DEFAULT_MENU_ALIGNMENT = 'auto-right';
const VALID_MENU_ALIGNMENT = ['auto-right', 'auto-left', 'auto', 'left', 'center', 'right', 'bottom-left', 'bottom-center', 'bottom-right'];
const i18n = {
  loadingActions: labelLoadingActions,
  showActions: labelShowActions
};
class PrimitiveCellActions extends LightningElement {
  constructor(...args) {
    super(...args);
    this.rowKeyValue = void 0;
    this.colKeyValue = void 0;
    this.rowActions = void 0;
    this.containerRect = void 0;
    this._isLoadingActions = void 0;
    this._actions = [];
    this._menuAlignment = DEFAULT_MENU_ALIGNMENT;
    this._internalTabIndex = false;
  }
  connectedCallback() {
    this._connected = true;
  }
  disconnectedCallback() {
    this._connected = false;
  }
  get menuAlignment() {
    return this._menuAlignment;
  }
  set menuAlignment(value) {
    this._menuAlignment = normalizeString(value, {
      fallbackValue: DEFAULT_MENU_ALIGNMENT,
      validValues: VALID_MENU_ALIGNMENT
    });
  }
  focus() {
    if (this._connected) {
      this.template.querySelector('lightning-button-menu').focus();
    }
  }
  click() {
    if (this._connected) {
      // focus/click without changing tabindex doesnt work W-6185168
      // eslint-disable-next-line @lwc/lwc/no-async-operation
      setTimeout(() => {
        this.template.querySelector('lightning-button-menu').click();
      }, 0);
    }
  }
  get computedMenuAlignment() {
    return this.menuAlignment;
  }
  get buttonAlternateText() {
    return `${i18n.showActions}`;
  }
  get spinnerAlternateText() {
    return `${i18n.loadingActions}`;
  }
  handleActionSelect(event) {
    this.dispatchEvent(new CustomEvent('privatecellactiontriggered', {
      composed: true,
      bubbles: true,
      cancelable: true,
      detail: {
        rowKeyValue: this.rowKeyValue,
        colKeyValue: this.colKeyValue,
        action: event.detail.value
      }
    }));
  }
  handleMenuOpen() {
    this.elementRect = this.template.querySelector('lightning-button-menu').getBoundingClientRect();
    const detail = {
      rowKeyValue: this.rowKeyValue,
      colKeyValue: this.colKeyValue,
      doneCallback: this.finishLoadingActions.bind(this),
      saveContainerPosition: containerRect => {
        this.containerRect = containerRect;
      }
    };
    if (typeof this.rowActions === 'function') {
      this._isLoadingActions = true;
      this._actions = [];
      detail.actionsProviderFunction = this.rowActions;
      // This callback should always be async
      Promise.resolve().then(() => {
        this.dispatchEvent(new CustomEvent('privatecellactionmenuopening', {
          composed: true,
          bubbles: true,
          cancelable: true,
          detail
        }));
      });
    } else {
      this._actions = this.rowActions;
    }
  }
  finishLoadingActions(actions) {
    this._isLoadingActions = false;
    this._actions = actions;
  }
}
PrimitiveCellActions.delegatesFocus = true;
_registerDecorators(PrimitiveCellActions, {
  publicProps: {
    rowKeyValue: {
      config: 0
    },
    colKeyValue: {
      config: 0
    },
    rowActions: {
      config: 0
    },
    menuAlignment: {
      config: 3
    }
  },
  publicMethods: ["focus", "click"],
  track: {
    containerRect: 1,
    _isLoadingActions: 1,
    _actions: 1,
    _menuAlignment: 1,
    _internalTabIndex: 1
  }
})
export default _registerComponent(PrimitiveCellActions, {
  tmpl: _tmpl
});