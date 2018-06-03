$(function() {

  $("#tasks").infinitescroll({
    navSelector: "#navigation", //页面分页元素--成功后自动隐藏
    nextSelector: "#navigation a",
    itemSelector: ".item",
    animate: true,
    debug: false, //调试的时候，可以打开
    maxPage: 100, //加载次数
    extraScrollPx: 200,
    loading: {
      msgText: "",
      finished: function() {
        //加载完成后执行
      },
      finishedMsg: '', //最后加载完成后的提示语
    },
    behavior: 'local',
    binder: $('#tasks')
  });
})