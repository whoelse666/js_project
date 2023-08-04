/*
 * @Author: RONGWEI PENG
 * @Date: 2023-01-01 15:38:43
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-01-01 17:08:03
 * @FilePath: /js_project/promise.js
 */
// const axios = require("axios");

const instance = axios.create({
  baseURL: "http://jsonplaceholder.typicode.com",
  timeout: 3000
  // headers: { "X-Custom-Header": "foobar" }
});

// 添加请求拦截器
const myInterceptor = instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

const controller = new AbortController();

// instance
//   .get("/posts/1", {
//     signal: controller.signal
//     // validateStatus: function (status) {
//     //   //使用 validateStatus 配置选项，可以自定义抛出错误的 HTTP code。
//     //   console.log("validateStatus", status);
//     //   return status < 500; // 处理状态码小于500的情况
//     // }
//   })
//   .then(function (response) {
//     // 处理成功情况
//     console.log(response);
//     instance.interceptors.request.eject(myInterceptor);
//     instance.interceptors.response.eject(myInterceptor);
//   })
//   .catch(function (error) {
//     // 处理错误情况
//     console.log(error);
//     console.log(error.toJSON());
//     if (error.response) {
//       // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//     } else if (error.request) {
//       // 请求已经成功发起，但没有收到响应
//       // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
//       // 而在node.js中是 http.ClientRequest 的实例
//       console.log(error.request);
//     } else {
//       // 发送请求时出了点问题
//       console.log("Error", error.message);
//     }
//     console.log(error.config);
//   })
//   .then(function () {
//     // 总是会执行
//   });

// 取消请求
// controller.abort();

function getUserAccount() {
  return instance.get("/posts/1");
}

function getUserPermissions() {
  return instance.post("/posts");
}
/* 
Promise.all([getUserAccount(), getUserPermissions()]).then(function (results) {
  const acct = results[0];
  const perm = results[1];
  console.time();
  console.table(results);
  console.timeEnd();
}); */


/* 
function getFoo() {
  return new Promise(function (resolve, reject) {
    resolve("foo");
  });
}
const g = function* () {
  try {
    const foo = yield getFoo();
    console.log(foo);
  } catch (e) {
    console.log(e);
  }
};
function run(generator) {
  const it = generator();
  function go(result) {
    if (result.done) return result.value;
    return result.value.then(
      function (value) {
        return go(it.next(value));
      },
      function (error) {
        return go(it.throw(error));
      }
    );
  }
  go(it.next());
}
run(g); */

/* 
function loadImageAsync(url) {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.onload = function () {
      resolve(image);
    };
    image.onerror = function () {
      reject(new Error("Could not load image at " + url));
    };
    image.src = url;
    console.log("url", url);
  });
}
// loadImageAsync("https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2023%2F0101%2F3949d7a8j00rnso37000qd000hs00dop.jpg&thumbnail=660x2147483647&quality=80&type=jpg");

const preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.src = path; //如果不能用的话，改成自己的位置

     image.onload = function () {
      resolve(image);
    };
    image.onerror = function () {
      reject(new Error("Could not load image at " + url));
    };
    function show() {
      console.log(image.width + " " + image.height);
    }
    window.onload = show;
    console.log("image.src==", image.src);
    // document.getElementById("one").appendChild(image);
  });
};
preloadImage("https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2023%2F0101%2F3949d7a8j00rnso37000qd000hs00dop.jpg&thumbnail=660x2147483647&quality=80&type=jpg")
  .then((res) => {
    console.log("res==", res);
  })
  .catch(err => {
    console.log("err=", err);
  }); */