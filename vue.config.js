module.exports = {
  devServer: {
    host:'localhost',
    port: 8081, // 默认端口
    open: true, // 默认打开浏览器 自动打开默认的浏览器
    hotOnly: true,
    proxy: {
      // 反向代理
    //   前面代表要拦截的接口，处理跨域
      '': {
        target: "http://localhost:3000/",
        changeOrigin: true,
      },
    },
  },
};
