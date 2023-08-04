/*
 * @Author: RONGWEI PENG
 * @Date: 2023-01-02 15:25:30
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-01-02 15:56:57
 * @FilePath: /js_project/SetAndMap.js
 */
/* 
Set
WeakSet
Map
WeakMap
*/
var s = new Set()
s.add(1).add(2).add(2);
// 注意2被加入了两次
console.log("console", s.size, s.has(1), s.has(2), s.has(3), s.delete(2), s.has(2), s.delete(6));
console.log("iterator", Set.prototype[Symbol.iterator] === Set.prototype.values);

/* 
WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。
首先，WeakSet 的成员只能是对象，而不能是其他类型的值。
其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。
*/



const data = {};
const element = document.getElementById('myDiv');
data[element] = 'metadata';
data['[object HTMLDivElement]'] // "metadata"