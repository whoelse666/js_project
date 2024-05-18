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

// console.log(add(1,2,3).valueOf() )// 6
// console.log(add(1,2)(3)(4,5).valueOf() )// 15
// console.log(add(1)(2)(3)(4, 5, 6)(7).valueOf()); // 28

// Promise.resolve()
//   .then(() => {
//     console.log(0);
//     // return 4
//     return Promise.resolve(4);
//   })
//   .then(res => {
//     console.log(res);
//   });
// Promise.resolve()
//   .then(() => {
//     return 4;
//   })
//   .then()
//   .then()
//   .then(res => {
//     console.log(res);
//   });
// Promise.resolve()
//   .then(() => {
//     console.log(1);
//   })
//   .then(() => {
//     console.log(2);
//   })
//   .then(() => {
//     console.log(3);
//   })
//   .then(() => {
//     console.log(5);
//   });

console.log("++++++++++++++++++++");
function p(num) {
  return Promise.resolve(num * 2);
}

function* generator() {
  const value1 = yield p(1);
  const value2 = yield p(value1);
  return value2;
}

const gen = generator();

const next1 = gen.next();
next1.value.then(res1 => {
  console.log(res1);

  const next2 = gen.next(res1);
  next2.value.then(res2 => {
    console.log(res2);
  });
});

// 2 4
