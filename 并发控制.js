function concurrentControl(asyncFuncs, limit) {
  const results = []; // 存放执行结果的数组
  const executing = []; // 存放正在执行的 Promise 的数组
  let i = 0;
  const execute = async () => {
    if (i === asyncFuncs.length) {
      return;
    }
    // 执行 Promise,并将其加入正在执行的 Promise 数组中
    const promise = asyncFuncs[i]();
    executing.push(promise);
    // 执行下一个 Promise
    i++;
    // 等待 Promise 执行完成
    await promise;
    // 将执行结果存入结果数组中,并从正在执行的 Promise 数组中移除
    results.push(await promise);
    executing.splice(executing.indexOf(promise), 1);
    // 递归执行下一个 Promise
    await execute();
  };
  // 使用 Promise.race() 来控制并发数量
  const promises = asyncFuncs.map(asyncFunc => {
    const executingCount = executing.length;
    if (executingCount >= limit) {
      Promise.race(executing);
    }
    return execute();
  });
  return Promise.all(promises).then(() => results);
}

// 定义需要执行的异步函数
const asyncFuncs = [
  async () => {
    console.log("start task 1");
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("end task 1");
    return 1;
  },
  async () => {
    console.log("start task 2");
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("end task 2");
    return 2;
  },
  async () => {
    console.log("start task 3");
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log("end task 3");
    return 3;
  },
  async () => {
    console.log("start task 4");
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("end task 4");
    return 4;
  }
];
// 控制并发数量为 2,执行异步任务
/* concurrentControl(asyncFuncs, 2).then(results => {
  console.log("results:", results);
}); */



// 并发任务控制  url: https://www.douyin.com/user/self?modal_id=7382882026799615259&showSubTab=video&showTab=favorite_collection
class SuperTask {
  constructor(parallelCount = 2) {
    this.parallelCount = parallelCount;
    this.tasks = [];
    this.runningCount = 0; //正在运行的任务数
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push({ task, resolve, reject });
      this._run();
    });
  }

  _run() {
    while (this.runningCount < this.parallelCount && this.tasks.length) {
      const { task, resolve, reject } = this.tasks.shift();
      this.runningCount++;
      Promise.resolve(task())
        .then(resolve, reject)
        .finally(() => {
          this.runningCount--;
          this._run();
        });
    }
  }
}
function timeout(time) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time);
  });
}

const superTask = new SuperTask();
function addTask(time, name) {
  superTask
    .add(() => timeout(time))
    .then(() => {
      console.log(`任务${name}完成`);
    });
}

addTask(10000, 1);
addTask(5000, 2);
addTask(3000, 3);
addTask(4000, 4);
addTask(5000, 5);
