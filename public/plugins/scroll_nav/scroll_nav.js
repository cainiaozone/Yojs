/**
 * Name: yo_carousel plugin
 * Author: Bruce
 * Time: 2018-05-26
 */
var data = {
  num: 0, // 子项目个数
  itemWidth: 0, // 子项目宽度
  boxWidth: 0, // 子项目总宽度
  scrollLfNum: 0, // 向左移动 次数
  scrollRgNum: 0, // 向右移动 次数
  toLeftDis: 0, // 向左移动的距离
  toRightDis: 0, //向右移动的距离
  currNum: 0 //当前子项目下标
}

$(function() {
  // 初始化导航条
  init();
  $(window).resize(function() {
    init();
  })

  // 手势左右滑动事件
  $(".nav-lists li").on("touchstart", function(e) {
    startX = e.originalEvent.changedTouches[0].pageX,
      startY = e.originalEvent.changedTouches[0].pageY;
  });
  $(".nav-lists li").on("touchend", function(e) {
    moveEndX = e.originalEvent.changedTouches[0].pageX,
      moveEndY = e.originalEvent.changedTouches[0].pageY,
      X = moveEndX - startX,
      Y = moveEndY - startY;
    if (X < 0) {
      //左滑
      if (data.scrollLfNum < data.num) {
        data.scrollLfNum++;
        data.scrollRgNum--;
        data.toLeftDis = -(data.scrollLfNum * data.itemWidth);
        console.log('左滑：' + data.scrollLfNum);
        console.log('右滑：' + data.scrollRgNum);
        console.log('向左滑距离' + data.toLeftDis);
        scroll(data.toLeftDis)
        // 当前子项目的下标号
        data.currNum = data.scrollLfNum + 1;
        // console.log("当前子项目的下标号:" + data.currNum);
        // 加载数据
        addData(data.currNum);

      }
    } else if (X > 0) {
      //右滑
      if (data.scrollRgNum < data.scrollLfNum) {
        data.scrollRgNum++;
        data.scrollLfNum--;
        data.toRightDis = data.scrollRgNum * data.itemWidth;
        console.log('左滑：' + data.scrollLfNum);
        console.log('右滑：' + data.scrollRgNum);
        console.log('向右滑距离' + data.toRightDis);
        scroll(data.toRightDis)
        // 当前子项目的下标号
        data.currNum = data.scrollLfNum + 1;
        // console.log("当前子项目的下标号:" + data.currNum);
        // 加载数据
        addData(data.currNum);

      }
    }

    // 点击 滚动效果
    if (X == 0 && Y == 0) {
      var distance = $(this).attr('data-left');
      console.log('点击滑动距离：' + distance);
      // 点击呈现的效果
      scroll(-distance);

      var currIndex = $(this).attr('data-index');
      data.currNum = currIndex;
      console.log('左滑数量：' + data.scrollLfNum);
      console.log('左滑距离：' + data.toLeftDis);
      data.scrollLfNum = currIndex - 1;
      data.toLeftDis = -distance;

      data.scrollRgNum = -data.scrollLfNum;
      data.toRightDis = -data.toLeftDis;

      console.log('点击的下标：' + currIndex);
      // 获取数据
      addData(currIndex);
    }

  });

})
// 获取页面宽度
function pageWidth() {
  return document.body.scrollWidth;
}
// 初始化
function init() {
  data.itemWidth = (pageWidth()) / 4;
  $('.nav-lists li').each(function(index, ele) {
    $(this).attr('data-index', index).attr('data-left', (index - 1) * data.itemWidth)
    data.num++;
  })
  data.boxWidth = data.num * data.itemWidth;
  $('.nav-lists').css('width', data.boxWidth)
  $('.nav-lists li').css('width', data.itemWidth)
}
// 调用接口
function addData(currIndex) {
  console.log(data.currNum);
  // console.log('下标：' + currIndex);
  var currId = '';
  $('.nav-lists li').each(function(index, ele) {
    if (currIndex == index) {
      currId = $(this).attr('data-id')
    }
  })
  // console.log('下标id：' + currId);

  // $.ajax({
  //
  // })
}

// 渐变滚动效果
function scroll(distance) {
  $('.nav-lists').animate({
    textIndent: 0
  }, {
    step: function(now, fx) {
      $(this).css('transform', 'translate3d(' + distance + 'px, 0px, 0px)');
    },
    duration: 'fast'
  }, 'swing');
}