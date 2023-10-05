function stylesheet(hostSelector, shadowSelector, nativeShadow) {
  return ["\n", (nativeShadow ? ":host {display: block;}" : [hostSelector, " {display: block;}"].join('')), "\n[dir=\"rtl\"] input[type=\"tel\"]", shadowSelector, " {direction: ltr;text-align: right;unicode-bidi: embed;}\n"].join('');
}
export default [stylesheet];