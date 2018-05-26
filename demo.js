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
  // 初始化
  data.itemWidth = (utils.pageWidth()) / 4;
  $('.nav-lists li').each(function(index, ele) {
    $(this).attr('data-index', index).attr('data-left', (index - 1) * data.itemWidth)
    data.num++;
  })
  data.boxWidth = data.num * data.itemWidth;
  $('.nav-lists').css('width', data.boxWidth)
  $('.nav-lists li').css('width', data.itemWidth)

  // 点击事件
  $('.nav-lists li').click(function() {
    console.log(222);
    // var distance = $(this).attr('data-left');
    // 点击呈现的效果
    // scroll(-distance);

    // var currIndex = $(this).attr('data-index');
    // 获取数据
    // addData(currIndex);
  })

  // 手势左右滑动事件
  $(".nav-lists").on("touchstart", function(e) {
    // 判断默认行为是否可以被禁用
    if (e.cancelable) {
      // 判断默认行为是否已经被禁用
      if (!e.defaultPrevented) {
        e.preventDefault();
      }
    }
    startX = e.originalEvent.changedTouches[0].pageX,
      startY = e.originalEvent.changedTouches[0].pageY;
  });
  $(".nav-lists").on("touchend", function(e) {
    // 判断默认行为是否可以被禁用
    if (e.cancelable) {
      // 判断默认行为是否已经被禁用
      if (!e.defaultPrevented) {
        e.preventDefault();
      }
    }
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

        scroll(data.toLeftDis)
      }
    } else if (X > 0) {
      //右滑
      if (data.scrollRgNum < data.scrollLfNum) {
        data.scrollRgNum++;
        data.scrollLfNum--;
        data.toRightDis = data.scrollRgNum * data.itemWidth;

        scroll(data.toRightDis)
      }
    }
    // 当前子项目的下标号
    data.currNum = data.scrollLfNum + 1;
    // console.log("当前子项目的下标号:" + data.currNum);
    // 加载数据
    addData(data.currNum);

  });

})
// 调用接口
function addData(currIndex) {
  // console.log(currIndex);
  // var currId = '';
  // $('.nav-lists li').each(function(index, ele) {
  //   if (currIndex == index) {
  //     currId = $(this).attr('data-id')
  //   }
  // })
  // console.log(currId);

  // $.ajax({
  //
  // })
}

// 渐变滚动
function scroll(distance) {
  // console.log(distance);
  $('.nav-lists').animate({
    textIndent: 0
  }, {
    step: function(now, fx) {
      $(this).css('transform', 'translate3d(' + distance + 'px, 0px, 0px)');
    },
    duration: 'fast'
  }, 'swing');
}