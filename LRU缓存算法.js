// LRU缓存算法

class LRUCache {
  #cache;
  constructor(capacity) {
    this.capacity = capacity;
    this.#cache = new Map();
  }
  has(key) {
    return this.#cache.has(key);
  }

  set(key) {
    if (this.#cache.has(key)) return;
    const value = this.#cache.get(key);
    this.#cache.delete(key);
    this.#cache.set(key, value);
    return value;
  }
  put(key, value) {
    if (this.#cache.has(key)) {
      this.#cache.delete(key);
    } else if (this.#cache.size >= this.capacity) {
      this.#cache.delete(this.#cache.keys().next().value);
    }
    this.#cache.set(key, value);
  }
}
