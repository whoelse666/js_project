// [1,2,3] instanceof Array ---- true

// L instanceof R
// 变量R的原型 存在于 变量L的原型链上
function instance_of(L = null, R) {
  // 对于左侧参数如果是非对象直接返回false
  if (Object(L) !== L) return false;
  // 对于右侧参数可以认为只能为函数且不能没有Prototype属性
  if (typeof R !== "function" || !R.prototype) throw new TypeError("Right-hand side of " instanceof " is not an object");
  // 声明一个变量获取对象的__proto__
  let link = (L && L.__proto__) || null;
  // 做循环（当link最终指向null，如果指向null的情况下都找不到那就返回false）
  while (link !== null) {
    // 如果找到说明R.prototype在L的原型链上，即返回true
    if (link === R.prototype) return true;
    // 逐级向下
    link = link.__proto__;
  }
  return false;
}

var simpleStr = "This is a simple string";
var myString = new String();
var newStr = new String("String created with constructor");
var myDate = new Date();
var myObj = {};
var myNonObj = Object.create(null);

simpleStr instanceof String; // 返回 false，非对象实例，因此返回 false
myString instanceof String; // 返回 true
newStr instanceof String; // 返回 true
myString instanceof Object; // 返回 true

myObj instanceof Object; // 返回 true，尽管原型没有定义
({}) instanceof Object; // 返回 true，同上
myNonObj instanceof Object; // 返回 false，一种创建非 Object 实例的对象的方法

myString instanceof Date; //返回 false

myDate instanceof Date; // 返回 true
myDate instanceof Object; // 返回 true
myDate instanceof String; // 返回 false

var obj = { a: 1 };
console.log("object instanceof constructor", instance_of(simpleStr, String));
console.log("object instanceof constructor", instance_of(myString, String));
console.log("object instanceof constructor", instance_of(newStr, String));
console.log("object instanceof constructor", instance_of(myDate, Date));
console.log("object instanceof constructor", instance_of(myObj, Object));
console.log("object instanceof constructor", instance_of(myNonObj, Object));

let aaa = { a: 1 },
  str = [1, 12],
  d = new Date();
console.log("Object(aaa)", Object(aaa) === aaa, Object(str) === str, Object(d) === d);
console.log("myInstanceof", myInstanceof(myNonObj, Object));
function myInstanceof(L = null, R) {
  if (Object(L) !== L) return false;
  if (typeof R !== "function" || !R.prototype) throw new TypeError("Right-hand side of " instanceof " is not an object");
  while (L) {
    if (L.__proto__ === R.prototype) return true;
    L = L.__proto__;
  }

  return false;
}
