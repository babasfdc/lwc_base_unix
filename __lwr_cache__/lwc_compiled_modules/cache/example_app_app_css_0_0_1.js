function stylesheet(hostSelector, shadowSelector, nativeShadow) {
  return ["main", shadowSelector, " {margin: 30px;display: flex;flex-direction: column;align-items: center;}\nh1", shadowSelector, " {color: #1798c1;}\n"].join('');
}
export default [stylesheet];