(function(win) {
  win = win || window;
  var doc = win.document;
  var matches = navigator.userAgent.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
  var UCversion = navigator.userAgent.match(/U3\/((\d+|\.){5,})/i);
  var isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''),10) >= 80;
  var isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
  var dpr = win.devicePixelRatio || 1;
  var docEl = doc.documentElement;
  /* #* matches[1] > 534代表是Android4.4以上系统; *# */
  var content = '';
  /* #* 为了消除安卓dpr乱标的比例 *# */
  var rate = 1;
  var scale = 1 / dpr;
  if (isIos) {
    // IOS不需要做任何事情,
  } else if (matches && matches[1] > 534 || isUCHd) {
    /* #* 安卓4.4以上, 有的webview支持target-densitydpi=device-dpi, 有的支持scale, 但不会同时支持, 所以两个都写上. *# */
    if (!isUCHd) {
      /* #* UC内核不能设置target-densitydpi. 它是4.3的内核, 却支持viewport的scale. *# */
      content += 'target-densitydpi=device-dpi,';
    }

    // 米4这样奇葩的高端机, 乱标dpr; 导致1rem并非等于100px, 需要对viewPort强行缩放;
    var div = doc.createElement('div');
    div.setAttribute('style', 'width: 1rem;display:none');
    docEl.appendChild(div);
    var trueWidth = win.getComputedStyle(div).width;
    docEl.removeChild(div);
    // 这里我直接写100px, 因为页面上html的默认fontSize就是100px;
    if (trueWidth !== '100px') {
      var trueWidthVal = parseInt(trueWidth);
      rate = 100 / trueWidthVal;
      scale = scale * rate;
    }
  } else {
    /* #* 如果是在PC或者安卓4.3(会闪屏)以下, 则正常展现. *# */
    scale = 1;
  }


  doc.querySelector('meta[name="viewport"]').setAttribute('content', content + 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);
  /* #* width/640*100, 为了统一rem为0.01rem = 1px *# */
  docEl.style.fontSize = 0.15625 * docEl.clientWidth * rate + 'px';
  win.addEventListener('resize', function() {
    docEl.style.fontSize = 0.15625 * docEl.clientWidth * rate + 'px';
  });
})(window);
