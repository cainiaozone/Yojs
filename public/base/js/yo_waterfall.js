/**
 * Name: waterfall
 * Date：2018-05-28
 * Author： Bruce
 */
var listData = {
  itemRightDis: 20, // item右边距
  itemBottomDis: 20, // item 下边距
  storyTimer: '', //定时器
  storyFlag: '', // 状态位
  pageSize: 10, // 每页item个数
  pageNum: 1, //当前页码
  dataNum: 0, //返回的数量
  queryNum: 0, //ajax请求成功的数量
  itemTotal: 0, //item总数
  hasMore: true, //是否还有更多数据，默认有
  "data": [{
    "src": 'http://web.honor.cn/wp-content/uploads/2018/06/photo-item-img.png'
  }, {
    "src": 'http://web.honor.cn/wp-content/uploads/2018/06/photo-item-img2.png'
  }, {
    "src": 'http://web.honor.cn/wp-content/uploads/2018/06/photo-item-img.png'
  }, {
    "src": 'http://web.honor.cn/wp-content/uploads/2018/06/photo-item-img2.png'
  }, {
    "src": 'http://web.honor.cn/wp-content/uploads/2018/06/photo-item-img.png'
  }, {
    "src": 'http://web.honor.cn/wp-content/uploads/2018/06/photo-item-img.png'
  }, {
    "src": 'http://web.honor.cn/wp-content/uploads/2018/06/photo-item-img2.png'
  }]
}


// getFeaturedPhotos();
// 判断是否需要持续加载 直到出现滚动条

window.onload = function() {
  // 初始化获取数据
  // addStoryData()
  $('.grid').masonry({
    columnWidth: '.grid-item',
    horizontalOrder: true,
    percentPosition: true,
    itemSelector: '.grid-item'
  });
  // 滚动加载
  $('.box').scroll(function() {
    console.log('滚动了');
    var $this = $(this);
    var $item = $(this).find('.grid-item');
    // 判断只有出现最后一个元素的时候  才允许加载
    getFeaturedPhotos();
    // var isScroll = checkScrollSlide($this, $item);
    // if (isScroll) {
    //   console.log("加载");
    // }
  })

}


// 判断是否需要持续加载 直到出现滚动条
function addStoryData() {
  listData.storyFlag = checkScrollSlide($('.box'), $('.box .grid-item'));
  if (listData.storyFlag) {
    //每10s请求一次
    listData.storyTimer = window.setTimeout(function() {
      getFeaturedPhotos();
      window.onload = function() {
        listData.storyFlag = checkScrollSlide($('.box'), $('.box .grid-item'));
      }
      addStoryData();
    }, 3000)
  } else {
    clearInterval(listData.storyTimer);
  }
}

/** 检测是否具备了滚动条加载数据块的条件
 * @param $scrollBox 滚动区域
 * @param $scrollItem  滚动区域内item 子元素
 */
function checkScrollSlide($scrollBox, $scrollItem) {
  // 滚动区域
  var boxScroll = $scrollBox.scrollTop();
  // console.log("boxScroll:" + boxScroll);
  var boxH = $scrollBox.outerHeight();

  // 当item最后一个元素中间位置 进入可视化区域
  var itemNum = $scrollItem.length;
  // console.log("itemNum:" + itemNum);
  var lastBoxTop;
  if (itemNum == 0) {
    lastBoxTop = 0;
  } else {
    var lastIndex = itemNum - 1;
    // console.log("最后元素下标:" + lastIndex);
    var currTop = $scrollItem.eq(lastIndex).css('top');
    currTop = currTop.replace('px', '')
    lastBoxTop = Number(currTop);
    console.log("最后元素距离父元素的高度:" + lastBoxTop);
  }
  var lastBoxH = $scrollItem.eq(lastIndex).outerHeight();
  var scrollViewH = boxScroll + boxH;
  // var lastMidH = lastBoxTop + lastBoxH
  var lastMidH = lastBoxTop + Math.floor(lastBoxH)

  return (lastMidH < scrollViewH) ? true : false;
}


// 获取Featured Photos数据接口调用并加载数据
var hArr = [];


function getFeaturedPhotos() {
  var $box = $('.box .grid-item');
  for (var i = 0; i < $box.length; i++) {
    if (i < cols) {
      hArr.push($box.eq(i).outerHeight() + 10)
    } else {
      var minH = Math.min.apply(null, hArr)
      var minIndex = getMinIndex(hArr, minH);
      // 将图片放在上一行最矮的item下
      $box.eq(i).css('position', 'absolute')
        .css('top', minH + 'px')
        .css('left', itemW * minIndex + 'px')
      // 改变数组
      hArr[minIndex] += $box.eq(i).outerHeight() + listData.itemBottomDis;
    }
  }
  var listStr = '';
  // for (var i = 0; i < listData.data.length; i++) {
  //   listStr += '<li class="grid-item">';
  //   listStr += '<a href="/global/photocontestdesc">';
  //   listStr += '<img src="' + listData.data[i].src + '"';
  //   listStr += 'class="item-img" alt="">';
  //   listStr += '<div class="img-info">';
  //   listStr += '<div class="user-img">';
  //   listStr += '<img src="http://web.honor.cn/wp-content/uploads/2018/06/photo-icon-avatar.png" alt="">';
  //   listStr += '</div>';
  //   listStr += '<h1 class="user-name">Julie Finch</h1>';
  //   listStr += '<p class="desc">Change your Lifestyle with iPhone App Development</p>';
  //   listStr += '<p>Crocodille Sanwich Website Storyboard</p>';
  //   listStr += '</div>';
  //   listStr += '</a>';
  //   listStr += '</li>';
  // }
  // $('.floor2 .waterfall-lists').append(listStr)
  var styT =
    listStr += '<div class="grid-item grid-item--width2" style="'++'"></div>';
  listStr += '<div class="grid-item grid-item--height2"></div>';
  listStr += '<div class="grid-item"></div>';
  listStr += '<div class="grid-item grid-item--width2"></div>';
}