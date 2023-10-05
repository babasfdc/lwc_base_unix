function stylesheet(hostSelector, shadowSelector, nativeShadow) {
  return ["_:-ms-lang(x)", shadowSelector, ", svg", shadowSelector, " {pointer-events: none;}\n"].join('');
}
export default [stylesheet];