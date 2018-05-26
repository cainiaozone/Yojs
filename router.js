const router = require('koa-router')();
// 引入 controller
const templateController = require('./controller/template')
const pluginsController = require('./controller/plugins')

module.exports = (app) => {
  /**
   * 模板文件
   */
  router.get('/template', templateController.template)

    .get('/', templateController.template)
    .get('/scrollnav',pluginsController.scrollNav)


  app.use(router.routes())
    .use(router.allowedMethods())
}
