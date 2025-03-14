const arr = [
  { a: 1, b: 2 },
  { a: 1, b: 2 },
  { a: 1, b: 2, c: { a: 1, b: 2 } },
  { b: 2, a: 1, c: { b: 2, a: 1 } }
];

// 对象数组去重,置只要对象的所有属性值相同,则表示相同对象

// 使用reduce方法
const uniqueArr = arr.reduce((acc, curr) => {
  const key = JSON.stringify(curr);
  if (!acc.includes(key)) {
    acc.push(key);
  }
  return acc;
}, []);
console.log(uniqueArr);

// 使用map方法
const uniqueArr2 = arr.map(item => JSON.stringify(item)).filter((item, index, self) => self.indexOf(item) === index);
console.log(uniqueArr2);

// 使用递归方法  最严谨的方式
const uniqueArr3 = [];
const isObject = val => typeof val === "object" && val !== null;
function equals(val1, val2) {
  if (!isObject(val1) || !isObject(val2)) {
    return Object.is(val1, val2);
  }

  const keys1 = Object.keys(val1);
  const keys2 = Object.keys(val2);
  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key)) {
      return false;
    }
    if (!equals(val1[key], val2[key])) {
      return false;
    }
  }
  return true;

  // if (isObject(val1) && isObject(val2)) {
  //   return JSON.stringify(val1) === JSON.stringify(val2);
  // }
  // return val1 === val2;
}

for (const item of arr) {
  let isFind = false;
  for (const r of uniqueArr3) {
    if (equals(item, r)) {
      isFind = true;
      break;
    }
  }

  if (!isFind) {
    uniqueArr3.push(item);
  }
}

console.log(uniqueArr3);
