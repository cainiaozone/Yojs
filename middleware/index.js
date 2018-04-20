const path = require('path');
const bodyParser = require('koa-bodyparser');
const nunjucks = require('koa-nunjucks-2')

const koaStatic = require('koa-static');

const config = require('../config/default');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');

const miSend = require('./mi-send')
const miLog = require('./mi-log')
const miHttpError = require('./mi-http-error')

module.exports = (app) => {
  // HTTP 请求错误处理中间件
  app.use(miHttpError({
    errorPageFolder: path.join(__dirname, '../errorpage')
  }))
  // 配置静态资源加载中间件
  app.use(koaStatic(
    path.join(__dirname, '../public')
  ))

  // 配置服务器端模板渲染引擎中间件
  app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, '../views'), //指定视图目录
    nunjucksConfig: {
      trimBlocks: true, // 开启转义 防Xss
      noCache: true
    }
  }));

  // 使用表单解析中间件
  app.use(bodyParser())
  // 返回 json 数据中间件
  app.use(miSend())

  // 增加错误的监听处理
  app.on("error", (err, ctx) => {
    if (ctx && !ctx.headerSent && ctx.status < 500) {
      ctx.status = 500
    }
    if (ctx && ctx.log && ctx.log.error) {
      if (!ctx.state.logged) {
        ctx.log.error(err.stack)
      }
    }
  })
}