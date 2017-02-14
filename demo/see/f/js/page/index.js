require('../../css/index.scss');
import $ from 'zepto';
import Swiper from 'swiper';
$(function (){
	var mySwiper = null;

	function createSwiper(){
		mySwiper = new Swiper('.page_swiper', {
			initialSlide: 0,
			direction: 'vertical',
			onSlideChangeEnd: function(swiper){
				fnTab(swiper);
			},
			onInit: function (swiper){
				fnTab(swiper);
			},
			onTouchStart: function (swiper){
				
			}
		});
	}

	function fnTab(swiper){
		var ac = swiper.activeIndex;

		swiper.slides.removeClass('active');
		swiper.slides.eq(ac).addClass('active');


		if(ac==0 || ac==1 || ac ==10){
			swiper.lockSwipes();
		}else if(ac==2){
			swiper.unlockSwipes();
			swiper.lockSwipeToPrev();
		}else if(ac>2 && ac<9){
			swiper.unlockSwipes();
		}else if(ac==11){
			swiper.unlockSwipes();
			swiper.lockSwipeToPrev();
		}

		if (swiper.activeIndex == 12) {
			$('#xinfeng2').removeClass('end');
			$('#xinfeng3').addClass('end');
			swiper.unlockSwipes();
			swiper.slideTo(0,0);
		}

		if (swiper.activeIndex == 10) {
			setTimeout(function (){
				$('#xinfeng3').removeClass('end');
			},500);
		}
	}

	$('#xinfeng').on('animationend webkitAnimationEnd',function (){
		mySwiper.unlockSwipes();
		$(this).one('click',function (){
			// mySwiper.slides.eq(0).addClass('fadeout');
			// mySwiper.slides.eq(1).removeClass('fadein');
			// setTimeout(function (){
			// 	mySwiper.slides.eq(0).removeClass('fadeout');
			// 	mySwiper.slides.eq(1).addClass('fadein');
			mySwiper.slideTo(1,0);
			// },1000);
		});
	});
	$('#xinfeng2').on('animationend webkitAnimationEnd',function (){
		setTimeout(function (){
			$('#xinfeng2').addClass('end');
			mySwiper.unlockSwipes();
			mySwiper.slides.eq(1).addClass('fadeout');
			mySwiper.slides.eq(2).removeClass('fadein');
			setTimeout(function (){
				mySwiper.slideTo(2,0);
				mySwiper.slides.eq(2).addClass('fadein');
				mySwiper.slides.eq(1).removeClass('fadeout');
			},2000);
		},1000);
	});
	$('#xinfeng3').on('animationend webkitAnimationEnd',function (){
		mySwiper.unlockSwipes();
		mySwiper.slideTo(11,0);
	});

	// 音乐
	var music = document.getElementById('music');
	var musicBtn = document.getElementsByClassName('music')[0];
	music.play();
	fnMusic();
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

	// 预加载
	var arrImg = ['./assets/images/l_end.png','./assets/images/bg0.jpg','./assets/images/bg1.jpg','./assets/images/bg2.jpg','./assets/images/font1.png','./assets/images/font2.png','./assets/images/font3.png','./assets/images/font4.png','./assets/images/font5.png','./assets/images/font6.png','./assets/images/font7.png','./assets/images/font8.png','./assets/images/font_end.png','./assets/images/xinfeng1.png','./assets/images/xinfeng2.png','./assets/images/xinfeng3.png'];
	// arrImg = [];
	preLoad(arrImg,function (){
		createSwiper();
	});

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

});