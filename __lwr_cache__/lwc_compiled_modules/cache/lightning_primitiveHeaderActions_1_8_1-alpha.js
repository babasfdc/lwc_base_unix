import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./primitiveHeaderActions.html";
import labelClipText from '@salesforce/label/LightningDatatable.clipText';
import labelShowActions from '@salesforce/label/LightningDatatable.showActions';
import labelWrapText from '@salesforce/label/LightningDatatable.wrapText';
import { deepCopy } from 'lightning/utilsPrivate';
const i18n = {
  clipText: labelClipText,
  showActions: labelShowActions,
  wrapText: labelWrapText
};
class PrimitiveHeaderActions extends LightningElement {
  constructor(...args) {
    super(...args);
    this.colKeyValue = void 0;
    this.containerRect = void 0;
    this._internalActions = [];
    this._customerActions = [];
    this._actionMenuAlignment = void 0;
  }
  focus() {
    const btnMenu = this.template.querySelector('lightning-button-menu');
    if (btnMenu) {
      btnMenu.focus();
    }
  }
  get actions() {
    return this._actions;
  }
  set actions(value) {
    this._actions = value;
    this.updateActions();
  }
  get i18n() {
    return i18n;
  }
  updateActions() {
    const actionTypeReducer = type => (actions, action) => {
      const overrides = {
        _type: type,
        _action: action
      };
      actions.push(Object.assign({}, action, overrides));
      return actions;
    };
    this._internalActions = this.getActionsByType('internalActions').reduce(actionTypeReducer('internal'), []);
    this._customerActions = this.getActionsByType('customerActions').reduce(actionTypeReducer('customer'), []);
    this._actionMenuAlignment = this._actions.menuAlignment;
  }
  get hasActions() {
    return this._internalActions.length > 0 || this._customerActions.length > 0;
  }
  get hasActionsDivider() {
    return this._internalActions.length > 0 && this._customerActions.length > 0;
  }
  getActionsByType(type) {
    return Array.isArray(this._actions[type]) ? this._actions[type] : [];
  }
  handleMenuOpen(event) {
    event.preventDefault();
    event.stopPropagation();
    this.elementRect = this.template.querySelector('lightning-button-menu').getBoundingClientRect();
    this.dispatchEvent(new CustomEvent('privatecellheaderactionmenuopening', {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {
        saveContainerPosition: containerRect => {
          this.containerRect = containerRect;
        }
      }
    }));
  }
  handleActionSelect(evt) {
    const action = evt.detail.value;
    this.dispatchEvent(new CustomEvent('privatecellheaderactiontriggered', {
      composed: true,
      bubbles: true,
      cancelable: true,
      detail: {
        action: deepCopy(action._action),
        actionType: action._type,
        colKeyValue: this.colKeyValue
      }
    }));
  }
}
PrimitiveHeaderActions.delegatesFocus = true;
_registerDecorators(PrimitiveHeaderActions, {
  publicProps: {
    colKeyValue: {
      config: 0
    },
    actions: {
      config: 3
    }
  },
  publicMethods: ["focus"],
  track: {
    containerRect: 1,
    _internalActions: 1,
    _customerActions: 1,
    _actionMenuAlignment: 1
  }
})
export default _registerComponent(PrimitiveHeaderActions, {
  tmpl: _tmpl
});