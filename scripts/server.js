var serve = require("koa-static");
var router = require("koa-router")();
var koa = require("koa");
var proxy = require("koa-proxy");
var app = koa();
// var querystring = require("querystring");

/**
 * ture为开启本地mock，否则走服务器
 */
var mock = !false;

// 获取本地mock列表
// 此处接口地址对应其他组建内请求的真实接口地址！！！
if (mock) {
  console.log('mock')
  router.post("/v1/main/list", function*(next) {
    const data = require("./../mock/entryData/list");
    this.body = data;
  });
  router.post("/datagdw/user/login", function*(next) {
    const data = require("./../mock/entryData/list");
    this.body = data;
  });
  // other post 
  // router.post("/v1/table/list2", function*(next) {
  //   const data = require("./../mock/entryData/list");
  //   this.body = data;
  // });
}

app.use(serve("build"));
app.use(router.routes());
app.use(router.allowedMethods());

app.use(function*(next) {
  // this.query.debug = true;
  
  // // mock某公司的信息
  // this.query.mockUserId = '0434324346539122932566287';
  // this.query.corpId = '82332bac8d9264b69135c2f4657eb6378f';

  console.log(
    "使用 用户ID=" +
    this.query.mockUserId +
    " 公司ID=" +
    this.query.corpId +
    " 公司名称=" +
    this.mockName || "请补充"
  );

  // this.querystring = querystring.stringify(this.query);

  yield proxy({
    // host: 'http://192.168.0.96:8095/',
    host: 'http://192.168.0.177:8080/',
    // match: /^(\/admin\/|\/app\/|\/overtime\/|\/calculator\/)/
  });

});

var callback = app.callback();

var server = require("http").createServer(function(req, res) {
  // 如果走本地开发直接访问线上环境服务器，就需要设定cookie;
  // 走本地mock不需要理会一下设置
  // var cookie = 'the website‘s cookie';  // 关键点

  // req.headers['cookie'] =  cookie;
  // req.rawHeaders['cookie'] = cookie;
  console.log('cb')
  callback(req, res);
});
server.listen(3001, function() {
  console.log("Server running on port %s", server.address().port);
});
