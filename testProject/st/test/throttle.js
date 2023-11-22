/*
 * @Author: RONGWEI PENG
 * @Date: 2022-08-02 10:18:42
 * @LastEditors: Do not edit
 * @LastEditTime: 2022-08-02 15:28:03
 * @FilePath: \testProject\st\test\throttle.js
 */
 document.getElementById("throttle").addEventListener("click", throttle(submit));

let i = 0
function throttle(fn) {
  let flag = true;
  const that = this;
  return function () {
      if (!flag) return;
      flag = false;
    setTimeout(function () {
      fn.apply(that, arguments);
      flag = true; i++;
    }, 1000);
  };
}
function submit() {
  console.log('console', i);
}



