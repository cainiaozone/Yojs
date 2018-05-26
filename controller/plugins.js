/**
 * plugins 实例
 */
 module.exports={
   // scroll_nav
   scrollNav:async(ctx,next)=>{
     await ctx.render('plugins/scroll_nav')
   }
 }
