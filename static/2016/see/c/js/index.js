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
			aItem[iNow].style.WebkitTransitionDuration = '1s';
			aItem[iNow].style.transitionDuration = '1s';
			aItem[iNow].style.zIndex = zIndex++;
			endX===-180?iNow++:'';

			if (iNow === aItem.length) {
				setTimeout(function (){
					for (var i = aItem.length - 1; i >= 0; i--) {
						
						aItem[i].style.WebkitTransitionDuration = '0.25s';
						aItem[i].style.transitionDuration = '0.25s';

						(function (i){
							var t = (aItem.length-1-i)*0.15;
							setTimeout(function (){
								aItem[i].style.WebkitTransform = 'rotateY(0deg)';
								aItem[i].style.transform = 'rotateY(0deg)';
								aItem[i].style.zIndex = zIndex++;

								if(i===0){
									oBook.addEventListener('touchstart',_start, false);
								}
							},t*1000)
						})(i);
					}

					oBook.removeEventListener('touchstart',_start, false);
					iNow = 0;
				},1300);
				

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
			aItem[iNow-1].style.WebkitTransitionDuration = '1s';
			aItem[iNow-1].style.transitionDuration = '1s';
			aItem[iNow-1].style.zIndex = zIndex++;
			endX===0?iNow--:'';
		}
	}
}

// 音乐
var music = document.getElementById('music');
var musicBtn = document.getElementsByClassName('music')[0];
fnMusic();
music.play();
function fnMusic(){
	
	musicBtn.addEventListener('click',_fn,false);
	
	function _fn(){
		if (musicBtn.className === 'music') {
			musicBtn.className = 'music close';
			music.pause();				
		}else{
			musicBtn.className = 'music';
			music.play();			
		}
	}
}


var arrImg = ["images/b-logo.png","images/music.png","images/bg1.jpg","images/bg2.jpg","images/bg3.jpg","images/box-b.png","images/book-b.jpg","images/box-t.png","images/book-b.png","images/book-f.jpg","images/book-l.png","images/book-r.png","images/hand.png","images/page1.png","images/page2.png","images/page3.png","images/page4.png","images/page5.png","images/page6.png","images/page7.png","images/page8.png","images/page9.png","images/page10.png","images/page10.jpg","images/page-next.png","images/page-title.png"];

var aPage = document.getElementsByClassName('page');
var oNext = document.querySelector('.page-next');
var oCube = document.querySelector('.cube');
var oHelp = document.querySelector('.help');
var oBox = document.querySelector('.box2');
var oBg2 = document.querySelector('.bg2');

preLoad(arrImg,function (){
	aPage[0].className = 'page page1';
	document.getElementsByClassName('music')[0].style.display = 'block';
	setTimeout(function (){
		document.getElementsByClassName('page-title')[0].className = 'page-title on';
	},30);
});
oNext.onclick = function (){
	aPage[1].className = 'page page2';
	oCube.className = 'cube active';
	oBox.className = 'box2 active';

	oCube.addEventListener('webkitAnimationEnd',_cubefn,false);
	oCube.addEventListener('animationend',_cubefn,false);
}

function _cubefn(){
	oCube.removeEventListener('webkitAnimationEnd',_cubefn,false);
	oCube.removeEventListener('animationend',_cubefn,false);

	oBg2.className = 'bg2 on';	
	oBg2.addEventListener('webkitTransitionEnd',_fnbg2,false);
	oBg2.addEventListener('transitionend',_fnbg2,false);
}

function _fnbg2(){
	oBg2.removeEventListener('webkitTransitionEnd',_fnbg2,false);
	oBg2.removeEventListener('transitionend',_fnbg2,false);

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
	var $text = document.querySelector('#loading .load-y');
	var $loadImg = document.querySelector('#loading .load-img div');
	for (var i = 0; i < arrImg.length; i++) {
		imgLoad(arrImg[i],loading);
	};
	if (arrImg.length == 0) {
		oLoad.parentNode && oLoad.parentNode.removeChild(oLoad);
		cb && cb();
	}
	function loading(){
		now++;
		var t = Math.floor(now/count*100);
		$text.innerHTML = t;
		$loadImg.style.height = 100 - t + '%';
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


document.addEventListener("WeixinJSBridgeReady", function () {  
    music.play();
}, false);
