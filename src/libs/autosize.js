/* 
 * by zhe-he
 * 特别说明 1rem = 100px
 */
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth || doc.body.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 750) {
                clientWidth = 750;
            }
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    recalc();
})(document, window);