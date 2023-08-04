/*
 * @Descripttion:
 * @version:
 * @Author: RONGWEI PENG
 * @Date: 2023-01-01 15:38:43
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-03-13 10:59:50
 * @FilePath: /js_project/promise.js
 */

console.info("Promise.js");

// var p1 = new Promise(function (resolve, reject) {
//   let a = 191919,
//     b = 222;
//   console.log("Promise");
//   //  reject(new Error("test"));
//   resolve(a);
//   // reject(b);
// });
// p1.then(function (comments) {
//   console.log("resolved: ", comments);
//   throw new Error("test");
// }).catch(function (error) {
//   console.log("发生错误！", error);
// });

// var resolved = Promise.resolve(42);
// var rejected = Promise.reject(-1);
// var alsoRejected = Promise.reject(Infinity);

// // Promise.any([resolved, rejected, alsoRejected]).then(function (result) {
// //   console.log(result); // 42
// // });

// class Model {asdsdad
//   constructor(p) {
//     this.p = p;
//   }
//   open() {
//     console.log("open Model");
//   }
//   close() {
//     console.log("close");
//     this.p.then(function () {
//       resolve("数据返回");
//     });
//   }
// }

// var m = null;
// async function open() {
//   const p = new Promise(function (resolve, reject) {
//     console.count();
//   });

//   function r() {
//     m = new Model(p);
//     m.open();
//     return p;
//   }
//   console.log("===1");
//   let res = await r();
//   console.log(
//     "===2",
//     res
//   );
// }

// open();

// function closeM() {
//   console.log("closeM");
//   m.close();
// }

/* 
promise1里的内容
 "promise1", promise1(pending) 
 "promise2", promise2(pending)


timer1
 throw new Error("error!!!");

 timer2
  "promise1", promise1(pending) success 
 "promise2", promise2(pending)  reject
*/

// const arr = [1, 2, 3];
// arr.reduce((p, x) => p.then(() => new Promise(r => setTimeout(() => r(console.log(x)), 1000))), Promise.resolve());

// const arr = [1, 2, 3];
// const result = arr.reduce((p, x) => p.then(new Promise(r => setTimeout(() => r(console.log(x)), 1000))), Promise.resolve());

// const p = Promise.resolve(1).then(console.log("我不关心结果"));
// console.log(p);
// p.then(res => console.log(res));

// url : https://juejin.cn/post/6844904077537574919#heading-52
/* function red() {
  console.log("red");
}
function green() {
  console.log("green");
}
function yellow() {
  console.log("yellow");
}
const light = function (timer, cb) {
  return new Promise(resolve => {
    setTimeout(() => {
      cb();
      resolve();
    }, timer);
  });
};
const step = function () {
  Promise.resolve()
    .then(() => {
      return light(1000, yellow);
    })
    .then(() => {
      light(1000, yellow);
      return light(1000, green);
    })
    .then(() => {
      light(1000, yellow);
      light(1000, green);
      return light(1000, red);
    })
    .then(() => {
      return step();
    });
};

step(); */

// const time = timer => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve();
//     }, timer);
//   });
// };
// const ajax1 = () =>
//   time(2000).then(() => {
//     console.log(1);
//     return 1;
//   });
// const ajax2 = () =>
//   time(1000).then(() => {
//     console.log(2);
//     return 2;
//   });
// const ajax3 = () =>
//   time(1000).then(() => {
//     console.log(3);
//     return 3;
//   });

// /* 实现mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中。 */
// function mergePromise(ajaxArray) {
//   const data = [];
//   let promise = Promise.resolve();
//   ajaxArray.forEach(ajax => {
//     // 第一次的then为了用来调用ajax
//     // 第二次的then是为了获取ajax的结果
//     promise = promise.then(ajax).then(res => {
//       data.push(res);
//       return data; // 把每次的结果返回
//     });
//   });
//   return promise;
// }

// mergePromise([ajax1, ajax2, ajax3]).then(data => {
//   console.log("done");
//   console.log(data); // data 为 [1, 2, 3]
// });

// // 要求分别输出
// // 1
// // 2
// // 3
// // done
// // [1, 2, 3]
var urls = [
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting1.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting2.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting3.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting4.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/AboutMe-painting5.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn6.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn7.png",
  "https://hexo-blog-1256114407.cos.ap-shenzhen-fsi.myqcloud.com/bpmn8.png"
];

function loadImg(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      console.log("一张图片加载完成", url.substr(-5, 5));
      resolve(img);
    };
    img.onerror = function () {
      reject(new Error("Could not load image at" + url));
    };
    img.src = url;
  });
}

function limitLoad(urls, handler, limit) {
  let sequence = [].concat(urls); // 复制urls
  // 这一步是为了初始化 promises 这个"容器"
  let promises = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      // 返回下标是为了知道数组中是哪一项最先完成
      return index;
    });
  });
  console.log("promises", promises, sequence);
  // 注意这里要将整个变量过程返回，这样得到的就是一个Promise，可以在外面链式调用
  return sequence
    .reduce((pCollect, url /* , currentIndex, array */) => {
      return pCollect
        .then(() => {
          return Promise.race(promises); // 返回已经完成的下标
        })
        .then(fastestIndex => {
          // 获取到已经完成的下标
          // 将"容器"内已经完成的那一项替换
          promises[fastestIndex] = handler(url).then(() => {
            return fastestIndex; // 要继续将这个下标返回，以便下一次变量
          });
        })
        .catch(err => {
          console.error(err);
        });
    }, Promise.resolve())
    .then(() => {
      console.log("promises", promises);
      console.log("sequence", sequence);
      // 最后三个用.all来调用
      return Promise.all(promises);
    });
}

// limitLoad(urls, loadImg, 3)
//   .then(res => {
//     console.log("图片全部加载完毕");
//     console.log(res);
//   })
//   .catch(err => {
//     console.error(err);
//   });


async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});

console.log("script end");