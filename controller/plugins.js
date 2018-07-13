/**
 * plugins 实例
 */
module.exports = {
  // scroll_nav  原生js版
  scrollNav: async (ctx, next) => {
    await ctx.render('plugins/scroll_nav')
  },
  // scroll_nav_jq jquery版
  scrollNavJq: async (ctx, next) => {
    await ctx.render('plugins/scroll_nav_jq')
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
  },
  // yo_rotate_prizes 旋转抽奖
  yoRotatePrizes: async (ctx, next) => {
    await ctx.render('plugins/yo_rotate_prizes')
  }

}