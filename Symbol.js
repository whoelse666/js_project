/*
 * @Author: RONGWEI PENG
 * @Date: 2023-01-02 15:18:27
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-01-02 15:40:16
 * @FilePath: /js_project/Symbol.js
 */

var a = Symbol();
var b = Symbol("1");
var c = Symbol("2");
var d = Symbol("3");
var obj = {
  name:1,
  a,
  b,
  c,
  [d]:d
};

let s1 = Symbol.for("foo");
let s2 = Symbol.for("foo");
let s3 = Symbol("foo");
// console.log("Symbol.for", s1 === s2, Symbol.keyFor(s1), Symbol.keyFor(s3));

console.log("1", obj);
console.log("2", Object.keys(obj));
console.log("3", Object.getOwnPropertySymbols(obj));
console.log("4", Reflect.ownKeys(obj))
