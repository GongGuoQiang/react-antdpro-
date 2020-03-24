const configs = {
    // 测试环境
    test: {
      API_SERVER: 'http://myy-adminapi-test.moerlong.com/v1',
    },
  
    // 开发环境
    development: {
      API_SERVER: 'http://myy-adminapi-test.moerlong.com/v1',
    },
  
    // 本地
    local: {
      API_SERVER: 'http://myy-adminapi-test.moerlong.com/v1',
    },
  };
  
  console.log("process.env",process.env);
  
  export default configs;