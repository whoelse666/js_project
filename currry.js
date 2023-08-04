function curry(fn) {
  // 首先确定的是会返回一个函数
  return function curried(...args) {
    if (args.length >= fn.length) {
      // 如果传入参数的个数大于等于需要柯里化函数所需参数个数,则直接执行
      return fn.apply(this, args);
    } else {
      // 如果传入参数的个数少于需要柯里化函数所需参数个数,则继续返回当前函数curried,继续接受参数
      return function (...moreArgs) {
        // console.log("1:", arguments.callee);
        // arguments.callee是一个指向当前正在执行的函数的引用，它是一个内部属性，用于在匿名函数或递归函数中引用函数本身
        // args 是上一次传入参数,moreArgs是本次传入参数;合并参数
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}

function add(x, y, z) {
  return x + y + z;
}

const curriedAdd = curry(add);
const _curriedAdd = _curry(add);

/* console.log("打印:", curriedAdd(2)(3));
console.log("打印:", curriedAdd(2, 3));
console.log("打印:", curriedAdd(2, 3, 5));
console.log('%c 打印:','font-size: 15px; color: blue','----------') */
console.log("打印_curriedAdd:", _curriedAdd(5)(5)(100));
console.log("----------");
console.log("打印_curriedAdd:", _curriedAdd(3, 3)(99));

function _curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function (...nextArgs) {
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}
