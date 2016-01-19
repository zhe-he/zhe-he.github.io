//window.addEventListener('DOMContentLoaded', function (){
(function (){ 	//
	var shuping = 'onorientationchange' in window ? 'orientationchange' : 'resize';
	var isAndorid = /(Android)/i.test(navigator.userAgent);
	var timer = null;

	//设置字体
	function setFontSize(){
		var w = document.documentElement.clientWidth || document.body.clientWidth;
		//设计图 宽度是640  --------------------> 对应/1036, 1rem = 100px;(css已设置)
		document.documentElement.style.fontSize = 100*w/1036 + 'px';
	}
	setFontSize();

	//手机横竖屏时 改变大小，Andorid手机切换有延迟 故开定时器
	window.addEventListener(shuping, function (){
		clearTimeout(timer);
		timer = setTimeout(setFontSize, isAndorid?300:0);
	}, false);
})(); 	//
//}, false);
