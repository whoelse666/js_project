console.log("Reflect start --------------------------");


var obj = {
  // 定义一个名为name的属性，值为"张三"
  name: "张三",
  // 定义一个名为age的属性，值为18
  age: 18
};
// 获取obj对象中name属性的值
console.log(Reflect.has(obj, "age"));

console.log("Reflect end --------------------------");
