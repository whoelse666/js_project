/*
 * @Author: RONGWEI PENG
 * @Date: 2022-08-02 15:26:13
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-08-02 15:34:11
 * @FilePath: \testProject\st\test\debounce.js
 */
document.getElementById("debounce").addEventListener("click", debounce(submit, 1000, true));
let ix = 0;
function debounce(fn, wait = 1000, ime) {
  let timer;
  const that = this;
  return function () {
    if (ime) {
      fn.apply(that, arguments)
      ix++;
    } else {
      if (timer) { clearInterval(timer); }
      timer = setTimeout(function () {
        fn.apply(that, arguments)
        ix++;
        timer = null;
      }, wait)
    }


  }
}

function submit() {
  console.log('console', ix);
}
