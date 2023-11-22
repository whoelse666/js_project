// fetch添加超时功能
function createRequestwithTimeout(timeout = 5000) {
  return function (url, options) {
    return new Promise((resolve, reject) => {
      const controller = new AbortController();
      options = options || {};
      if (options.signal) {
        const signa = options.signal;
        signal.addEventListener('abort', () => {
          controller.abort();
        });
      }
      options.signal = controller.signal;
      fetch(url, options).then(resolve => {
        setTimeout(function () {
          reject(new Error('请求超时'));
          controller.abort();
        }, timeout);
      });
    });
  };
}
