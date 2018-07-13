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
var oLists = document.querySelector('.nav-lists');
var oLi = document.querySelectorAll('.nav-lists li')

window.onload = function() {
  // 初始化导航条
  init();
}
window.onresize = function() {
  // 初始化导航条
  init();
}

// 获取页面宽度
function pageWidth() {
  return document.body.scrollWidth;
}

// 初始化
function init() {
  data.itemWidth = (pageWidth()) / 4;
  for (var i = 0; i < oLi.length; i++) {
    oLi[i].setAttribute('data-index', i)
    oLi[i].setAttribute('data-left', (i - 1) * data.itemWidth)
    oLi[i].style.width = data.itemWidth + 'px'
    data.num++;
  }
  data.boxWidth = data.num * data.itemWidth;
  oLists.style.width = data.boxWidth + 'px';
}

// 开始按下手机的起点坐标
var startPoint = null;
oLists.addEventListener("touchstart", function(e) {
  var e = e || window.event;
  startPoint = e.touches[0];
})
oLists.addEventListener("touchend", function(e) {
  var e = e || window.event;
  //e.changedTouches能找到离开手机的手指，返回的是一个数组
  var endPoint = e.changedTouches[0];
  //计算终点与起点的差值
  var x = endPoint.clientX - startPoint.clientX;
  var y = endPoint.clientY - startPoint.clientY;
  //设置滑动距离的参考值
  var d = 10;
  if (Math.abs(x) > d) {
    if (x < 0) {
      // 左滑
      data.scrollLfNum++;
      data.scrollRgNum--;
      data.toLeftDis = -(data.scrollLfNum * data.itemWidth);
      scroll(data.toLeftDis)
    } else if (x > 0) {
      // 右滑
      data.scrollRgNum++;
      data.scrollLfNum--;
      data.toRightDis = data.scrollRgNum * data.itemWidth;
      scroll(data.toRightDis)
    }
  }
})

// 左滑动效果
function scrollleft(obj) {
  var distance = obj.getAttribute('data-left')
  var currIndex = obj.getAttribute('data-index');
  data.currNum = currIndex;
  data.scrollLfNum = currIndex - 1;
  data.toLeftDis = -distance;

  data.scrollRgNum = -data.scrollLfNum;
  data.toRightDis = -data.toLeftDis;

  scroll(-distance)
}
// 渐变滚动效果
function scroll(distance) {
  oLists.style.transform = 'translate3d(' + distance + 'px, 0px, 0px)'
}

// 调用接口
function addData(currIndex) {
  var currId = '';
  for (var i = 0; i < oLi.length; i++) {
    if (currIndex == i) {
      currId = oLi[i].getAttribute('data-id')
    }
  }
  console.log('下标id：' + currId);

  // $.ajax({
  //
  // })
}