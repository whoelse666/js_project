/* 
  请求性能优化
  1. API请求封装优化
  2. 安全性优化
  3. 性能监控
  4. 代码结构优化
*/



// 1. API请求封装优化
const api = {
  // 添加请求缓存
  cache: new Map(),

  // 添加请求合并
  pendingRequests: new Map(),

  // 统一请求方法
  async request(config: RequestConfig) {
    // 请求缓存
    const cacheKey = `${config.url}${config.params ? JSON.stringify(config.params) : ""}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // 请求合并
    if (this.pendingRequests.has(cacheKey)) {
      return this.pendingRequests.get(cacheKey);
    }

    // 添加请求
    const promise = fetch(config.url, {
      method: config.method,
      headers: {
        "Content-Type": "application/json",
        accessToken: window.token
      },
      body: config.body
    });

    this.pendingRequests.set(cacheKey, promise);

    try {
      const response = await promise;
      const data = await response.json();

      // 缓存结果
      this.cache.set(cacheKey, data);

      return data;
    } finally {
      this.pendingRequests.delete(cacheKey);
    }
  }
};




// 2. 安全性优化
const security = {
  // token刷新机制
  async refreshToken() {
    try {
      const response = await api.request({
        url: `${window.assetauditserverPath}/api/v2/dataos/userManager/refreshToken`,
        method: 'POST',
        body: JSON.stringify({ token: window.token })
      });
      
      if (response.success) {
        window.token = response.data.token;
        // 更新所有缓存的请求
        this.updateAllRequests();
      }
    } catch (error) {
      console.error('Token刷新失败:', error);
      // 处理token失效情况
      this.handleTokenInvalid();
    }
  },
  
  // 错误处理
  handleError(error: any) {
    if (error.status === 401) {
      this.handleTokenInvalid();
    } else if (error.status === 403) {
      this.handlePermissionDenied();
    } else {
      this.handleGeneralError(error);
    }
  }
};




// 3. 性能监控
const performanceMonitor = {
  // API性能监控
  monitorApiPerformance() {
    performance.mark('api-start');
    
    // API请求完成后
    performance.mark('api-end');
    const measure = performance.measure('API Performance', 'api-start', 'api-end');
    
    if (measure.duration > 2000) {
      console.warn('API响应时间过长:', measure.duration);
      // 可以发送性能监控数据到服务器
      this.reportPerformance(measure);
    }
  },
  
  // 报告性能数据
  async reportPerformance(data: PerformanceMeasure) {
    await api.request({
      url: `${window.assetauditserverPath}/api/v2/performance`,
      method: 'POST',
      body: JSON.stringify({
        duration: data.duration,
        timestamp: new Date().toISOString()
      })
    });
  }
};





// 4. 代码结构优化
// 创建统一的API服务类
class ApiService {
  private static instance: ApiService;
  private constructor() {}
  
  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }
  
  // 统一的API请求方法
  async request<T>(config: RequestConfig): Promise<T> {
    // 实现统一的请求处理逻辑
  }
}

// 创建统一的错误处理类
class ErrorHandler {
  static handle(error: any) {
    // 统一的错误处理逻辑
  }
}