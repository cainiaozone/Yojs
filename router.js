const router = require('koa-router')();
// 引入 controller
const templateController = require('./controller/template')

module.exports = (app) => {
  /**
   * 模板文件
   */
  router.get('/template', templateController.template)

    .get('/', templateController.template)

  app.use(router.routes())
    .use(router.allowedMethods())
}