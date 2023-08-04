function concurrentControl(asyncFuncs, limit) {
  const results = []; // 存放执行结果的数组
  const executing = []; // 存放正在执行的 Promise 的数组
  let i = 0;
  const execute = async () => {
    if (i === asyncFuncs.length) {
      return;
    }
    // 执行 Promise，并将其加入正在执行的 Promise 数组中
    const promise = asyncFuncs[i]();
    executing.push(promise);
    // 执行下一个 Promise
    i++;
    // 等待 Promise 执行完成
    await promise;
    // 将执行结果存入结果数组中，并从正在执行的 Promise 数组中移除
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
    console.log('start task 1');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('end task 1');
    return 1;
  },
  async () => {
    console.log('start task 2');
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('end task 2');
    return 2;
  },
  async () => {
    console.log('start task 3');
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('end task 3');
    return 3;
  },
  async () => {
    console.log('start task 4');
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('end task 4');
    return 4;
  }
];
// 控制并发数量为 2，执行异步任务
concurrentControl(asyncFuncs, 2).then(results => {
  console.log('results:', results);
});