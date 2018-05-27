/**
 * Name: yo_carousel plugin
 * Author: Bruce
 * Time: 2018-05-26
 */

var data = {
  itemNum: 0, // yo-item 数量
  itemWidth: 0, // yo-item 宽度
  boxWidth: 0, // yo-box 宽度
  dotHtml: '', // yo-dot 圆点 Html
  currIndex: 0, // 当前节点
  scrollDis: 0, //滚动距离
  scrollLfNum: 0, //向左移动次数
  scrollRgNum: 0, //向右移动次数
  toLeftDis: 0, // 向左移动的距离
  toRightDis: 0, //向右移动的距离
  currNum: 0, //当前子项目下标
  dragx: 0
}
$(function() {
  // 初始化
  init();

  dragPanelMove('.yo-carousel', '.yo-box', '.yo-box')
  //点击圆点切换
  $('.yo-dots .yo-dot').on('click', function() {
    data.currIndex = Number($(this).attr('data-index'))
    console.log(data.currIndex);
    data.scrollLfNum = data.currIndex;
    data.scrollRgNum = -data.currIndex;
    data.scrollDis = $(this).attr('data-left');

    // $(this).addClass('active').siblings().removeClass('active')
    changeDot(data.currIndex)
    // 切换
    scroll(data.scrollDis)

  })

})
// 切换当前 dot 状态
function changeDot(num) {
  $('.yo-dot').removeClass('active')
  $('.yo-dot:nth-child(' + (num + 1) + ')').addClass('active')
}
// 初始化
function init() {
  data.itemWidth = $('.yo-item').width();
  $('.yo-box .yo-item').each(function(index, ele) {
    var leftDis = -index * data.itemWidth
    $(this).attr('data-index', index).attr('data-left', leftDis)
    var currClass = '';
    if (data.currIndex == index) {
      currClass = 'active'
    }
    data.dotHtml = '<span class="yo-dot ' + currClass + '" data-index="' + index + '" data-left="' + leftDis + '"></span>'
    $('.yo-dots').append(data.dotHtml);
    data.itemNum++;
  })
  data.boxWidth = data.itemWidth * data.itemNum;
  $('.yo-box').width(data.boxWidth)
}



// 渐变滚动效果
function scroll(distance) {
  $('.yo-box').animate({
    textIndent: 0
  }, {
    step: function(now, fx) {
      $(this).stop().css('transform', 'translate3d(' + distance + 'px, 0px, 0px)');
    },
    duration: 'fast'
  }, 'swing');
}
// 拖拽效果
var isMove;
var dragx;
var nn = 1;

function dragPanelMove(outDiv, downDiv, moveDiv) {
  // 禁止图片拖拽
  $('img').on('mousedown', function(e) {
    e.preventDefault()
  })
  $(downDiv).mousedown(function(e) {
    console.log('点击');
    isMove = true;
    var outboxlf = $(outDiv).offset().left;
    var movelf = $(moveDiv).offset().left;
    var scrollx = e.pageX - movelf;

    $(downDiv).mousemove(function(e) {
      console.log('拖拽');
      if (isMove) {
        var obj = $(moveDiv);
        var dragx = e.pageX - scrollx - outboxlf;
        console.log(dragx);
        var num = Math.floor(-dragx / 1200)
        // console.log(num);
        if (num == 3) {
          num = -1
        }

        if (dragx > 20) {
          // 右滑动
          console.log('右滑动');
          // distance = -Number((num + 1) * 1200);
          // scroll(distance)
          // data.scrollRgNum++;
          // data.scrollLfNum--;
          // data.toRightDis = data.scrollRgNum * data.itemWidth;
          // console.log('左滑：' + data.scrollLfNum);
          // console.log('右滑：' + data.scrollRgNum);
          // console.log('向右滑距离' + data.toRightDis);
          // scroll(data.toRightDis)
          // isMove = false
        } else if (dragx < -20) {
          // console.log(isMove);
          // 左滑动
          console.log('左滑动');
          data.scrollLfNum++;
          data.scrollRgNum--;
          data.toLeftDis = -(data.scrollLfNum * data.itemWidth);
          console.log('左滑：' + data.scrollLfNum);
          console.log('右滑：' + data.scrollRgNum);
          console.log('向左滑距离' + data.toLeftDis);
          scroll(data.toLeftDis)
          isMove = false
        }

        // obj.css({
        //   "margin-left": e.pageX - scrollx - outboxlf
        // });
      }
    })

  });
  $(downDiv).mouseup(function() {
    console.log('离开');
    isMove = false;
  });
}