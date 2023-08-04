// call、apply、bind
/* 
- 不传入第一个参数，那么默认为 `window`
- 改变了 `this` 指向，让新的对象可以执行该函数，那么思路是否可以变成新的对象添加一个函数，然后再执行完成后删除
*/
// " use strict";
function myApply(context) {
  var context = context || window;
  context.fn = this; //这里的 this 指向调用myApply 的 函数本身:例子;getValue.myApply(target, "myCall", "66"),则 this 指向 getValue
  var result;
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }

  delete context.fn;
  return result;
}

function myCall(context) {
  var context = context || window;
  // 给 context 添加一个属性
  // getValue.call(a, 'yck', '24') => a.fn = gatValue
  context.fn = this;
  var args = [...arguments].slice(1);
  // getValue.call(a, 'yck', '24') => a.fn('yck', '24')
  var result = context.fn(...args);
  delete context.fn;
  return result;
}

function myBind(context) {
  if (typeof this !== "function") {
    throw new TypeError("error");
  }

  var context = context || window;
  const _this = this;
  var args = [...arguments].slice(1);
  /* bind和 call 的区别在于，call是返回函数执行结果,在内部执行函数,所以 this 的指向调用者是确定的,bind 返回的是函数 Fun,然后在外部再去执行,那么 this指向不确定需要再次判断一下,并且 bind 的参数可以是在外部调用时在传递参数 */
  return function Fun() {
    if (this instanceof Fun) {
      return new _this(...args, ...arguments);
    }
    return _this.call(context, ...args, ...arguments);
  };
}

// function myBind(context) {
//   if (typeof this !== "function") {
//     throw new TypeError("error");
//   }
//   var context = context || window;
//   var args = [...arguments].slice(1);
//   context.fn = this;
//   return function () {
//     var bindArgs = [...arguments];
//     var result = context.fn.call(context, ...args.concat(bindArgs));
//     delete context.fn;
//     return result;
//   };
// }

Function.prototype.bind_ = function (obj) {
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }
  var args = Array.prototype.slice.call(arguments, 1);
  var fn = this;
  //创建中介函数
  var fn_ = function () {};
  var bound = function () {
    var params = Array.prototype.slice.call(arguments);
    //通过constructor判断调用方式，为true this指向实例，否则为obj
    fn.apply(this.constructor === fn ? this : obj, args.concat(params));
    console.log(this);
  };
  fn_.prototype = fn.prototype;
  bound.prototype = new fn_();
  //原型链继承
  // bound.prototype = fn.prototype;
  return bound;
};
Function.prototype.myCall = myCall;
Function.prototype.myApply = myApply;
Function.prototype.myBind = myBind;

var value = "window value";
let a = {
  value: 1
};
function getValue(name, age) {
  console.log(name);
  console.log(age);
  console.log(this.value);
  // console.trace();
}
// getValue.call(a, "call", "24");
// getValue.myCall(a, "myCall", "66");

// getValue.apply(a, ["apply", "24"]);
// getValue.myApply(a, ["myApply", "66"]);

// getValue.bind(a, "bind", "24")();
// getValue.myBind(a, "myBind", "66")();
// var bound = getValue.myBind(a, 2);
// var person = new bound(3); //undefined 2 3

var fn = getValue.myBind(a, "myBind99");
var z = 0;
var obj = {
  z: 1
};

function fn(x, y) {
  this.name = "听风是风";
  console.log(this.z);
  console.log(this.age);
  console.log(x);
  console.log(y);
}
fn.prototype.age = 26;
// fn(99);

// var bound = fn.bind_(obj, 2);
// var person = new bound(3); //undefined 2 3
