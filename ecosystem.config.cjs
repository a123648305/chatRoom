module.exports = {
  apps: [
    {
      name: "chatRoom_Server",
      script: "./index.js",
      args: "--attach",
      error_file: "./log/err.log", // 错误日志
      out_file: "./log/out.log", // 输出日志
      log_date_format: "YYYY/MM/DD HH:mm:ss", // 日志日期格式
    },
    {
      name: "chatRoom_Client",
    //   cwd: "./antd-chat",
      script: "serve", // 启动静态服务器
      env: {
        PM2_SERVE_PATH: './static',
        PM2_SERVE_PORT: 8080,
        PM2_SERVE_SPA: 'true',
        PM2_SERVE_HOMEPAGE: '/index.html'
      }
    },
  ],
};
