```js
// js文档注释.md
/**
* 函数防抖
* @param {Function} func 防抖的目标函数
* @param {Number} duration 函数执行前等待的时间
* @return {Function}防抖函数
 */
function debounce (func, duration = 1000){

}

/**
 * Returns the sum of a and b
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function sum(a, b) {
    return a + b;
}

/**
 * 函数描述
 *
 * @param {string} p1 参数1的说明
 * @param {string} p2 参数2的说明,比较长
 *     那就换行了.
 * @param {number=} p3 参数3的说明(可选)
 * @return {Object} 返回值描述
 */
function foo(p1, p2, p3) {
    var p3 = p3 || 10;
    return {
        p1: p1,
        p2: p2,
        p3: p3
    };
}
```
