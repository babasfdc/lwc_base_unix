function stylesheet(hostSelector, shadowSelector, nativeShadow) {
  return ["[dir=\"rtl\"] .slds-dropdown_left", shadowSelector, " {left: 0;right: auto;}\n"].join('');
}
export default [stylesheet];