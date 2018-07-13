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
    .get('/scrollnav', pluginsController.scrollNav)
    .get('/scrollnavjq', pluginsController.scrollNavJq)
    .get('/yocarousel', pluginsController.yoCarousel)
    .get('/waterfall', pluginsController.waterfall)
    .get('/watermore', pluginsController.watermore)
    .get('/rotateprize', pluginsController.yoRotatePrizes)

  app.use(router.routes())
    .use(router.allowedMethods())
}