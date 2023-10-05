function stylesheet(hostSelector, shadowSelector, nativeShadow) {
  return ["\n", (nativeShadow ? "[dir=\"rtl\"] :host {direction: ltr;unicode-bidi: embed;}" : ["[dir=\"rtl\"] ", hostSelector, " {direction: ltr;unicode-bidi: embed;}"].join('')), "\n"].join('');
}
export default [stylesheet];