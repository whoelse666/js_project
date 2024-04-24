const memoize = function (func, content) {
  let cache = Object.create(null);
  content = content || this;
  return (...key) => {
    if (!cache[key]) {
      console.log('key',key);
      cache[key] = func.apply(content, key);
    }
    return cache[key];
  };
};

var add = function (x, y) {
  return x + y;
};
// // 函数柯里化
// var add = function (x) {
//     //**返回函数**
//     return function (y) {
//         return x+y;
//     }
// }
const calc = memoize(add);
const num1 = calc(100,200)
// const num2 = calc(100,200) // 缓存得到的结果

// console.log('num1,num2',num1,num2);