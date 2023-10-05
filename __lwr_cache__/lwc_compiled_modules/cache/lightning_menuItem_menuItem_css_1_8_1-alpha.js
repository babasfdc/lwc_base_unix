function stylesheet(hostSelector, shadowSelector, nativeShadow) {
  return ["\n", (nativeShadow ? ":host {display: block;}" : [hostSelector, " {display: block;}"].join('')), "\n"].join('');
}
export default [stylesheet];