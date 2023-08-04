async function sleep(n, name = "test") {
  return new Promise(resolve => {
    console.log(n, name, "start");
    setTimeout(() => {
      console.log(n, name, "end---------");
      resolve({ n, name });
    }, n * 500);
  });
}

async function asyncPool({ limit, items }) {
  const promises = [];
  const pool = new Set();

  for (const item of items) {
    const fn = async item => await item();
    const promise = fn(item);
    promises.push(promise);
    pool.add(promise);
    const clear = () => pool.delete(promise);
    promise.then(clear, clear); //不论 resolve 还是 reject 都要执行 clear 删除已完成的 promise
    if (pool.size >= limit) {
      await Promise.race(pool);
    }
  }
  return Promise.all(promises);
}

 

/* function sleep2(n, name = "test", ms = 500) {
  return new Promise(resolve => {
    console.log(n, name, "start");
    setTimeout(function () {
      console.log(n, name, "end---------");
      resolve({ n, name });
      resolve;
    }, n * ms);
  });
}

async function asyncPool2({ limit, items }) {
  const promises = [],
    pool = new Set();
  for (const item of items) {
    const fn = async item => await item(); //将这里的一步函数同步化
    // const fn = item => item();
    const promise = fn(item); //fn返回的依然是 promise,代表任务激活在执行中!!!
    // const promise = item();
    pool.add(promise); //代表执行中的任务的数组,长度代表执行中任务数量
    promises.push(promise); //存储 items执行后的结果 promisede 数组
    const clear = () => pool.delete(promise); //删除pool 中已经完成任务
    promise.then(clear, clear); //无论成功还是失败都要 clear(promise)
    if (pool.size >= limit) {
      //循环暂停,等待 pool 中的任务(race方法指任意一个完成,则结束并且返回),然后继续执行
      await Promise.race(pool);
    }
  }

  return Promise.all(promises);
} */

async function start(limit = 2) {
  await asyncPool({
    limit: limit,
    items: [
      () => sleep(1, "aaa"),
      () => sleep(2, "bbb"),
      () => sleep(3, "ccc"),
      () => sleep(4, "ddd"),
      () => sleep(5, "eee"),
      () => sleep(6, "aaa"),
      () => sleep(7, "bbb"),
      () => sleep(8, "ccc"),
      () => sleep(9, "ddd"),
      () => sleep(10, "eee")
    ]
  });
  console.log("全部完成了......");
}

start(3);
