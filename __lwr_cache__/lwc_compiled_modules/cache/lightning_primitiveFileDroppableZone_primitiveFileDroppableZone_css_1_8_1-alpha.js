function stylesheet(hostSelector, shadowSelector, nativeShadow) {
  return ["slot", shadowSelector, " {display: inline-block;}\n"].join('');
}
export default [stylesheet];