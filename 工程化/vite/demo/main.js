// 目录结构转到对象结构


const moduleMap = import.meta.glob(["./bar/**/*.js", "./foo/**/*.js"], {
  eager: true,
  import: "default"
});
// console.log(moduleMap);

const result = {};

/* for (const path in moduleMap) {
  const module = moduleMap[path];
  const moduleName = path.replace(/^\.\/(.*)\.\w+$/, "$1");
  result[moduleName] = module;
  
} */

for (const path in moduleMap) {
  const moduleDefault = moduleMap[path];
  const matches = path.match(/[^\.\/]+/g).slice(0, -1);
  let current = result;
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    current[match] = current[match] || {};
    if (i === matches.length - 1) {
      current[match] = moduleDefault;
    }
    current = current[match];
  }
}
console.log("result", result);

export default result;