(function () {
  localStorage.setItem = function (key, value, time = Infinity) {
    const payload = Number.isFinite(time)
      ? {
          __data: value,
          __expiresTime: Date.now() + time
        }
      : value;
    Storage.prototype.setItem.call(localStorage, key, JSON.stringify(payload));
  };
  localStorage.getItem = function (key) {
    const value = Storage.prototype.getItem.call(localStorage, key);
    try {
      const jsonVal = JSON.parse(value);
      if (jsonVal.__expiresTime) {
        return jsonVal.__expiresTime >= Date.now() ? JSON.stringify(jsonVal.__data) : void 0;
      }
      return value;
    } catch (error) {
      return value;
    }
  };
})();
