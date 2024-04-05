/* 
缺点：
会忽略undefined
会忽略symbol
不能序列化函数
不能解决循环引用的对象
*/

function deepClone(obj) {
  return new Promise(resolve => {
    const { port1, port2 } = new MessageChannel();
    port1.postMessage(obj);
    port2.onmessage = msg => {
      resolve(msg.data);
    };
  });
}
const o = {
  a: 1,
  b: { name: 999, b: { name: 999 } }
};

const p = deepClone(o).then(data => {
  data.b.name = 1000;
  console.log("data", data);
  console.log("o", o);
})
// console.log(" deepClone(o)", deepClone(o));