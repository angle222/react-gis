const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    createProxyMiddleware("/datagdw", {
      target: "http://192.168.0.177:8080/",
      // target: "http://192.168.0.96:8095/",
      changeOrigin: true
    })
  );
};
