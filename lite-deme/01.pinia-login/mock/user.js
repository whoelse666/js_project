export default [
  // 用户登录
  {
    url: "/api/user/login",
    method: "post",
    response: res => {
      return {
        code: 0,
        message: "success",
        data: {
          token: "Token",
          username: "昆吾kw"
        }
      };
    }
  },
  {
    url: "/api/user", // 模拟的 API 路径
    method: "get", // 请求方法
    response: () => {
      // 返回的模拟数据
      return {
        code: 0,
        message: "success",
        data: {
          name: "John Doe",
          age: 25
        }
      };
    }
  }
];
