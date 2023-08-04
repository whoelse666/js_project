function createoverload() {
  const callMap = new Map();
  function overload(...args) {
    const key = args.map(arg => typeof arg).join(",");
    const fn = callMap.get(key);
    if (fn) {
      return fn.apply(this, args);
    }
    throw new Error("no matching function");
  }

  overload.addImpl = function (...args) {
    const fn = args.pop();
    if (typeof fn != "function") {
      return;
    }
    const types = args;
    callMap.set(types.join(","), fn);
  };
  return overload;
}

const getUsers = createoverload();
getUsers.addImpl(() => console.log("查询所有用户"));

const searchPage = (page, size = 10) => {
  console.log("按照页码和数量查询用户");
};

getUsers.addImpl("number", searchPage);
getUsers.addImpl("number", "number", searchPage);
getUsers.addImpl("string", name => {
  console.log("按照姓名查询用户");
});
getUsers.addImpl("string", "string", name => {
  console.log("按照性别查询用户");
});
getUsers(1, 2);
getUsers(1);
getUsers("aaa");
getUsers();

/* type User = {
  id: number;
  name: string;
  age: number;
  grades: number | string;
};
const userList: User[] = [
  { id: 1, name: "小明", age: 20, grades: "98" },
  { id: 2, name: "小明", age: 20, grades: "98" },
  { id: 3, name: "小明", age: 20, grades: "98" },
  { id: 4, name: "小明", age: 20, grades: "98" }
];

function getUserInfo(value: number): User | undefined;
function getUserInfo(value: string, count: number): User[];
function getUserInfo(value: number | string, count: number = 1): User | User[] | undefined {
  if (typeof value === "number") {
    return userList.find(item => item.id === value);
  } else {
    return userList.filter(item => item.grades === value).slice(0, count);
  }
}
getUserInfo("98", 3); */
