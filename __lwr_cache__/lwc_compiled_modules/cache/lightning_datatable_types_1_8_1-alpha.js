import { registerDecorators as _registerDecorators, registerComponent as _registerComponent } from "lwc";
import _tmpl from "./types.html";
import { assert } from 'lightning/utilsPrivate';
const STANDARD_TYPES = {
  text: ['linkify'],
  boolean: true,
  number: ['minimumIntegerDigits', 'minimumFractionDigits', 'maximumFractionDigits', 'minimumSignificantDigits', 'maximumSignificantDigits'],
  currency: ['currencyCode', 'currencyDisplayAs', 'minimumIntegerDigits', 'minimumFractionDigits', 'maximumFractionDigits', 'minimumSignificantDigits', 'maximumSignificantDigits'],
  percent: ['minimumIntegerDigits', 'minimumFractionDigits', 'maximumFractionDigits', 'minimumSignificantDigits', 'maximumSignificantDigits'],
  email: true,
  date: ['day', 'era', 'hour', 'hour12', 'minute', 'month', 'second', 'timeZone', 'timeZoneName', 'weekday', 'year'],
  'date-local': ['day', 'month', 'year'],
  phone: true,
  url: ['label', 'target', 'tooltip'],
  location: true,
  rowNumber: ['error'],
  action: ['menuAlignment', 'rowActions'],
  button: ['variant', 'label', 'iconName', 'iconPosition', 'disabled', 'name', 'class', 'title'],
  'button-icon': ['variant', 'alternativeText', 'iconName', 'iconClass', 'disabled', 'name', 'class', 'title'],
  tree: ['hasChildren', 'isExpanded', 'level', 'setSize', 'posInSet', 'subType']
};
const TREE_SUPPORTED_TYPES = {
  text: true,
  url: true,
  date: true,
  number: true,
  currency: true,
  percent: true,
  button: true,
  'button-icon': true
};
export function isValidType(typeName) {
  return !!STANDARD_TYPES[typeName];
}
export function isTreeType(typeName) {
  return typeName === 'tree';
}
export function getAttributesNames(typeName) {
  assert(isValidType(typeName), `your are trying to access an invalid type (${typeName})`);
  return Array.isArray(STANDARD_TYPES[typeName]) ? STANDARD_TYPES[typeName] : [];
}
export function isValidTypeForTree(dataType) {
  return !!TREE_SUPPORTED_TYPES[dataType];
}
function getStandardTypeAttributesNames(typeName) {
  return Array.isArray(STANDARD_TYPES[typeName]) ? STANDARD_TYPES[typeName] : [];
}
class DatatableTypes {
  constructor(types) {
    this.privateCustomTypes = {};
    this.isValidTypeForTree = isValidTypeForTree;
    if (typeof types === 'object' && types !== null) {
      Object.keys(types).reduce((seed, key) => {
        const {
          template,
          typeAttributes = [],
          standardCellLayout = false
        } = types[key];
        seed[key] = {
          template,
          typeAttributes,
          standardCellLayout: standardCellLayout === true,
          type: 'custom'
        };
        return seed;
      }, this.privateCustomTypes);
    }
  }
  getType(typeName) {
    if (this.privateCustomTypes[typeName]) {
      return this.privateCustomTypes[typeName];
    }
    if (STANDARD_TYPES[typeName]) {
      return {
        typeAttributes: getStandardTypeAttributesNames(typeName),
        type: 'standard'
      };
    }
    return undefined;
  }
  isValidType(typeName) {
    return !!this.getType(typeName);
  }
  isCustomType(typeName) {
    return this.getType(typeName) && this.getType(typeName).type === 'custom';
  }
  standardCellLayoutForCustomType(typeName) {
    return this.isCustomType(typeName) && this.getType(typeName).standardCellLayout;
  }
}
_registerDecorators(DatatableTypes, {
  fields: ["privateCustomTypes", "isValidTypeForTree"]
})
export default _registerComponent(DatatableTypes, {
  tmpl: _tmpl
});