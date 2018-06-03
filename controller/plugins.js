/**
 * plugins 实例
 */
module.exports = {
  // scroll_nav
  scrollNav: async (ctx, next) => {
    await ctx.render('plugins/scroll_nav')
  },
  waterfall: async (ctx, next) => {
    await ctx.render('plugins/waterfall')
  },
  watermore: async (ctx, next) => {
    await ctx.render('plugins/watermore')
  },
  // yo_carousel
  yoCarousel: async (ctx, next) => {
    await ctx.render('plugins/yo_carousel')
  }
}