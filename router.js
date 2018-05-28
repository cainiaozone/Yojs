const router = require('koa-router')();
// 引入 controller
const templateController = require('./controller/template')
const pluginsController = require('./controller/plugins')

module.exports = (app) => {
  /**
   * 模板文件
   */
<<<<<<< HEAD
  router.get('/', templateController.template)
    .get('/template', templateController.template)
=======
  router.get('/template', templateController.template)

    .get('/', templateController.template)
    .get('/scrollnav', pluginsController.scrollNav)
    .get('/yocarousel', pluginsController.yoCarousel)

>>>>>>> b7c5d51c1b208293aa24a11a70baeddc953ea2ef

  app.use(router.routes())
    .use(router.allowedMethods())
}