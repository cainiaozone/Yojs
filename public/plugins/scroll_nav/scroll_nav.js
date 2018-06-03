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

$(function() {
  // 初始化导航条
  init();
  $(window).resize(function() {
    init();
  })

})
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
// 左滑动效果
function scrollleft(obj) {
  var distance = obj.getAttribute('data-left')
  scroll(-distance)
}
// 渐变滚动效果
function scroll(distance) {
  oLists.style.transform = 'translate3d(' + distance + 'px, 0px, 0px)'
}