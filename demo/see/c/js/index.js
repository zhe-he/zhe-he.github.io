var oBook = document.getElementById('book');
var aItem = document.querySelectorAll('#book .book-item');
var iNow = 0;
var zIndex = aItem.length+1;

// 设置zIndex
for (var i = 0; i < aItem.length; i++) {
	aItem[i].style.zIndex = aItem.length-i;
}

oBook.addEventListener('touchstart',_start, false);

function _start(ev){
	ev.preventDefault();
	var touch = ev.targetTouches[0];
	var startX = touch.pageX;
	var isFirst = true;
	var isNext = true;
	var cur;
	
	document.addEventListener('touchmove',_move, false);
	document.addEventListener('touchend',_end, false);
	
	function _move(ev){
		ev.preventDefault();
		var touch = ev.targetTouches[0];
		var disX = touch.pageX - startX;
		
		// 根据第一次滑动判断是上一页还是下一页
		isNext=(disX>0&&isFirst)?false:((disX<0&&isFirst)?true:isNext);
		isFirst = false;
		
		// 根据第一页和最后一页来强制`下一页`
		isNext=iNow===0?true:(iNow===aItem.length?false:isNext);
		
		if (isNext) {
			// 下一页
			if (disX >= 0) {
				disX = 0;
			}else if(disX <= -180){
				disX = -180;
			}
			aItem[iNow].style.WebkitTransform = 'rotateY('+disX+'deg)';
			aItem[iNow].style.transform = 'rotateY('+disX+'deg)';
			aItem[iNow].style.WebkitTransitionDuration = '0s';
			aItem[iNow].style.transitionDuration = '0s';
		}else{
			// 上一页
			if (disX <= 0) {
				disX = 0;
			}else if(disX >= 180){
				disX = 180;
			}
			disX = disX-180;
			aItem[iNow-1].style.WebkitTransform = 'rotateY('+disX+'deg)';
			aItem[iNow-1].style.transform = 'rotateY('+disX+'deg)';
			aItem[iNow-1].style.WebkitTransitionDuration = '0s';
			aItem[iNow-1].style.transitionDuration = '0s';
			aItem[iNow-1].style.zIndex = zIndex+1;
		}
		
	}
	
	function _end(ev){
		ev.preventDefault();
		document.removeEventListener('touchmove',_move,false);
		document.removeEventListener('touchend',_end,false);
		
		var touch = ev.changedTouches[0];
		
		var disX = touch.pageX - startX;
		var endX;
		
		if (isNext) {
			// 下一页
			if (disX>-30) {
				endX = 0;
			}else{
				endX = -180;
			}
			aItem[iNow].style.WebkitTransform = 'rotateY('+endX+'deg)';
			aItem[iNow].style.transform = 'rotateY('+endX+'deg)';
			aItem[iNow].style.WebkitTransitionDuration = '0.3s';
			aItem[iNow].style.transitionDuration = '0.3s';
			aItem[iNow].style.zIndex = zIndex++;
			endX===-180?iNow++:'';

			if (iNow === aItem.length) {
				setTimeout(function (){
					for (var i = 1; i < aPage.length; i++) {
						aPage[i].className = aPage[i].className + ' hide';
					}
					for (var i = 0; i < aItem.length; i++) {
						aItem[i].style.zIndex = aItem.length-i;
						aItem[i].style.WebkitTransform = 'rotateY(0deg)';
						aItem[i].style.transform = 'rotateY(0deg)';
					}
					zIndex = aItem.length+1;
					iNow = 0;
				},500);
				

			}
		}else{
			// 上一页
			if (disX<30) {
				endX = -180;
			}else{
				endX = 0;
			}
			aItem[iNow-1].style.WebkitTransform = 'rotateY('+endX+'deg)';
			aItem[iNow-1].style.transform = 'rotateY('+endX+'deg)';
			aItem[iNow-1].style.WebkitTransitionDuration = '0.3s';
			aItem[iNow-1].style.transitionDuration = '0.3s';
			aItem[iNow-1].style.zIndex = zIndex++;
			endX===0?iNow--:'';
		}
	}
}



var arrImg = ["images/music.png","images/bg1.jpg","images/bg2.jpg","images/bg3.jpg","images/book-b.jpg","images/box-t.png","images/book-b.png","images/book-f.png","images/book-l.png","images/book-r.png","images/hand.png","images/page1.png","images/page2.png","images/page3.png","images/page4.png","images/page5.png","images/page6.png","images/page7.png","images/page8.png","images/page9.png","images/page10.jpg"];

var aPage = document.getElementsByClassName('page');
var oNext = document.querySelector('.page-next');
var oCube = document.querySelector('.cube');
var oHelp = document.querySelector('.help');
var oBox = document.querySelector('.box2');

preLoad(arrImg,function (){
	aPage[0].className = 'page page1';
	document.getElementsByClassName('music')[0].style.display = 'block';
	document.getElementById('music').play();
});
oNext.onclick = function (){
	aPage[1].className = 'page page2';
	oCube.className = 'cube active';
	oBox.className = 'box2 active';
	oCube.addEventListener('WebkitAnimationEnd',_cubefn,false);
	oCube.addEventListener('animationend',_cubefn,false);
}

function _cubefn(){
	oCube.removeEventListener('WebkitAnimationEnd',_cubefn,false);
	oCube.removeEventListener('animationend',_cubefn,false);

	aPage[2].className = 'page page3';
	oHelp.className = 'help active';

	setTimeout(function (){
		oHelp.className = 'help';
	},3000);
}



function preLoad(arrImg,cb){
	arrImg = arrImg || [];
	var now = 0;
	var count = arrImg.length;

	var oLoad = document.getElementById('loading');
	var $loading = document.querySelector('#loading .load-x');
	var $text = document.querySelector('#loading .load-y');
	for (var i = 0; i < arrImg.length; i++) {
		imgLoad(arrImg[0],loading);
	};
	if (arrImg.length == 0) {
		oLoad.parentNode && oLoad.parentNode.removeChild(oLoad);
		cb && cb();
	}
	function loading(){
		now++;
		var t = Math.floor(now/count*100);
		$loading.style.width = t + '%';
		$text.innerHTML = t;
		if (now === count) {
			oLoad.parentNode && oLoad.parentNode.removeChild(oLoad);
			cb && cb();
		}
	}
	function imgLoad(src,callback){
		var img = new Image();
		img.onload = img.onerror = function (){
			this.onload = this.onerror = null;
			callback && callback(img);
		}
		img.src= src;
	}
}


// 音乐
fnMusic();
function fnMusic(){
	var music = document.getElementById('music');
	var musicBtn = document.getElementsByClassName('music')[0];
	musicBtn.onclick = function (){
		if (this.className === 'music') {
			this.className = 'music close';
			music.pause();

		}else{
			this.className = 'music';
			music.play();
		}
	}
}