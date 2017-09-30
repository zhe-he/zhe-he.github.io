/* 
 *同fontsize.js,因设计图变为750,故新增,此后都用此函数,旧版保留
 *特别说明 1rem = 100px
 */
(function (doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function () {
			var clientWidth = docEl.clientWidth || doc.body.clientWidth;
			if (!clientWidth) return;
			if (clientWidth >= 640) {
				clientWidth = 640;
			}
			docEl.style.fontSize = 100 * (clientWidth / 1036) + 'px';
		};
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	recalc();
})(document, window);