const reg = /^(?=.*\d+)(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[$,-.]+)[\da-zA-Z$@,-.]*$/;
const str = "234.3A24asdf";
console.log(reg.test(str)); // true