function add(...args) {
  // let sum = args.reduce((acc, curr) => acc + curr, 0);
  // function adder(...nextArgs) {
  //   sum += nextArgs.reduce((acc, curr) => acc + curr, 0);
  //   return adder;
  // }
  // adder.valueOf = () => sum;
  // return adder;

  // const fn = function (...nextArgs) {
  //   console.log('args',args);
  //   console.log("nextArgs", nextArgs);
  //   return add(...args, ...nextArgs);
  // };
  // fn.valueOf = function () {
  //   return args.reduce((a, b) => a + b, 0);
  // };
  // console.log('fn',fn);
  // return fn;
}

console.log(add(1,2,3).valueOf() )// 6
console.log(add(1,2)(3)(4,5).valueOf() )// 15
console.log(add(1)(2)(3)(4, 5, 6)(7).valueOf()); // 28

