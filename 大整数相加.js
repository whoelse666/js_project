

let x = 9007199254740991;
let y = 1234567899999995;

function add(a, b) {
  a = a.toString();
  b = b.toString();
  //取两个数字中最大长度， b 比 a 长，maxLength 就是 b 的 length
  let maxLength = Math.max(a.length, b.length);
  //padStart(targetLength,padString)
  //targetLength 即补齐后的目标长度，padString 即填充字符串
  //用 0 去补齐长度
  a = a.padStart(maxLength, 0); //结果 "0009007199254740991"
  b = b.padStart(maxLength, 0); //结果 "1234567899999999999"
  //声明加法过程中需要用到的变量
  let t = 0;
  let f = 0; //"进位"
  let sum = ""; // sum 声明为空字符串
  // 从个位数开始遍历数字
  for (let i = maxLength - 1; i >= 0; i--) {
    t = parseInt(a[i]) + parseInt(b[i]) + f;
    // 取地板数，比如 9/10 取 0， 11/10 取 1
    f = Math.floor(t / 10);
    // 取模，个位数与 10 取模为它本身，即余数
    // 因为 sum 声明为空字符串，所以数字会被转换成字符串
    // 比如 8 + "9" 输出为字符串 "89"
    sum = (t % 10) + sum;
  }
  //最后得到的 sum 时， f 为 1 即在前加 1
  //假设此时 sum 为 "xxx", f 为 1，则返回"1xxx"
  if (f == 1) {
    sum = "1" + sum;
  }
  console.log(sum);

  return sum;
}
// function addLargeNumbers(num1, num2) {
//   num1 = num1.toString();
//   num2 = num2.toString();
//   let result = "";
//   let carry = 0;
//   let maxLength = Math.max(num1.length, num2.length);
//   for (let i = 1; i <= maxLength; i++) {
//     const digit1 = parseInt(num1[num1.length - i] || 0);
//     const digit2 = parseInt(num2[num2.length - i] || 0);
//     const sum = digit1 + digit2 + carry;
//     carry = Math.floor(sum / 10);
//     result = (sum % 10) + result;
//   }
//   if (carry > 0) {
//     result = carry + result;
//   }
//   console.log(result);
//   return result;
// }
// 验证
add(x, y); 
// addLargeNumbers(x, y);
