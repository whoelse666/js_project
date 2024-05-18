// deepClone

/* 
奇技淫巧
MessageChannel  方式
缺点：
会忽略undefined
会忽略symbol
不能序列化函数
不能解决循环引用的对象
*/

/* function deepClone(obj) {
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
});*/
// console.log(" deepClone(o)", deepClone(o));

// 利用 WeakMap 解决循环引用
let map = new WeakMap();
// prettier-ignore
function deepClone(obj) {
  if (obj instanceof Object) {
    // 防止循环应用
    if (map.has(obj)) {
      return map.get(obj);
    }
    let newObj;
    if (obj instanceof Array) {
      newObj = [];
    } else if (obj instanceof Function) {
      newObj = function () {
        return obj.apply(this, arguments);
      };
    } else if (obj instanceof RegExp) {
      // 拼接正则
      newobj = new RegExp(obj.source, obj.flags);
    } else if (obj instanceof Date) {
      newobj = new Date(obj);
    } else {
      newObj = {};
    }
    // 克隆一份对象出来
    // Object.getOwnPropertyDescriptors() 静态方法返回给定对象的所有自有属性描述符。
    let desc = Object.getOwnPropertyDescriptors(obj); //
    // Object.getPrototypeOf() 静态方法返回指定对象的原型（即内部 [[Prototype]] 属性的值）。
    let clone = Object.create(Object.getPrototypeOf(obj), desc);
    // let clone = Object.create(obj, desc);
    map.set(obj, clone);
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = deepClone(obj[key]);
      }
    }
    return newObj;
  }
  return obj
}

// function deepClone1(obj) {
//   const objectMap = new Map();
//   const _deepClone = value => {
//     const type = typeof value;
//     if (type !== "object" || type === null) {
//       return value;
//     }
//     if (objectMap.has(value)) {
//       return objectMap.get(value);
//     }

//     const result = Array.isArray(value) ? [] : {};
//     objectMap.set(value, result);
//     for (const key in value) {
//       result[key] = _deepClone(value[ker]);
//     }
//     return result;
//   };
//   return _deepClone(obj);
// }


var obj1 = {
  a: 1,
  c: undefined,
  fn: function () { console.log('123',123);},
  b: { name: 999, b: { name: 888 } }
};
var obj2 = deepClone(obj1);
var val = deepClone(123);
console.log('obj2',obj2);
obj2.b.name = 1000;
obj2.b.b.name = 111111;
obj1.b.name = 0;
obj1.b.b.name =6;


console.log("obj2", obj2,obj1);
console.log("val", val);




var aaa = new Object()
var bbb = Object.create(null)
console.log('aaa,bbb',aaa,bbb);