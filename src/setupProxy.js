const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    createProxyMiddleware("/JXGISServer", {
    //   target: "http://m.kugou.com?json=true",
      target: "http://192.168.0.96:8095/",
      changeOrigin: true
    })
  );
};
