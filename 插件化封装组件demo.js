class Calcute {
  constructor() {
    this.result = 0;

    this.rules = new Map();
  }

  registerRule(name, fn) {
    this.rules.set(name, fn);
  }

  invoke(name, ...args) {
    return this.rules.get(name)(...args);
  }
}

const calcute = new Calcute();

const addRule = (a, b) => a + b;

calcute.registerRule("add", addRule);

console.log(calcute.invoke("add", 1, 2));
