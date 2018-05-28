const router = require('koa-router')();
// 引入 controller
const templateController = require('./controller/template')

module.exports = (app) => {
  /**
   * 模板文件
   */
  router.get('/', templateController.template)
    .get('/template', templateController.template)

  app.use(router.routes())
    .use(router.allowedMethods())
}