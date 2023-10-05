import { registerDecorators as _registerDecorators, registerComponent as _registerComponent, LightningElement } from "lwc";
import _tmpl from "./primitiveCustomCell.html";
import { queryFocusable } from 'lightning/utils';
class PrimitiveCustomCell extends LightningElement {
  constructor(...args) {
    super(...args);
    this.types = void 0;
    this.columnType = void 0;
    this.value = void 0;
    this.columnLabel = void 0;
    this.rowKeyValue = void 0;
    this.colKeyValue = void 0;
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
    this.internalTabIndex = void 0;
    this.keyboardMode = void 0;
    this.wrapText = void 0;
    this.alignment = void 0;
  } // typeAttribute21 and typeAttribute21 used by treegrid
  get type() {
    const type = this.types.getType(this.columnType);
    return type.template;
  }
  render() {
    return this.type;
  }
  get typeAttributes() {
    const typeAttributes = this.types.getType(this.columnType).typeAttributes;
    if (Array.isArray(typeAttributes)) {
      return typeAttributes.reduce((seed, attrName, index) => {
        seed[attrName] = this[`typeAttribute${index}`];
        return seed;
      }, {});
    }
    return {};
  }
  getActionableElements() {
    return queryFocusable(this.template);
  }
}
_registerDecorators(PrimitiveCustomCell, {
  publicProps: {
    types: {
      config: 0
    },
    columnType: {
      config: 0
    },
    value: {
      config: 0
    },
    columnLabel: {
      config: 0
    },
    rowKeyValue: {
      config: 0
    },
    colKeyValue: {
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
    internalTabIndex: {
      config: 0
    },
    keyboardMode: {
      config: 0
    },
    wrapText: {
      config: 0
    },
    alignment: {
      config: 0
    }
  },
  publicMethods: ["getActionableElements"]
})
export default _registerComponent(PrimitiveCustomCell, {
  tmpl: _tmpl
});