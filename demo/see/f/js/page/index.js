require('../../css/index.scss');
import $ from 'zepto';
import Swiper from 'swiper';
$(function (){
	var autoplay = true;
	var mySwiper = null;

	function createSwiper(){
		mySwiper = new Swiper('.page_swiper', {
			effect : 'fade',
			direction: 'vertical',
			initialSlide: 0,
			onSlideChangeEnd: function(swiper){
				anim(swiper);
			},
			onInit: function (swiper){
				anim(swiper);
			},
			onTouchStart: function (swiper){
				if(swiper.activeIndex > 0)
				autoplay = false;
				$('.arrow').addClass('active');
			}
		});
	}
	function anim(swiper){
		if (swiper.activeIndex == swiper.slides.length -1) {
			swiper.slideTo(0);
			swiper.slides.eq(0).addClass('active');
			return;
		}


		swiper.slides.removeClass('active');
		swiper.slides.eq(swiper.activeIndex).addClass('active');

		if (swiper.activeIndex == 1) {
			swiper.lockSwipeToPrev();
		}else{
			swiper.unlockSwipeToPrev();
		}
		
		if (swiper.activeIndex == 0) {
			swiper.lockSwipes();
			autoplay = true;
			$('.arrow').removeClass('active');
			$('.page_box').one('click',function (){
				var $x_white = $(this).find('.x_white');
				var $after = $(this).find('.after');

				$x_white.addClass('x_white_end');
				$x_white.on('animationend webkitAnimationEnd',_fnend);
				$after.on('animationend webkitAnimationEnd',_fnend2);

				function _fnend(){
					$x_white.off('animationend',_fnend);
					$x_white.off('webkitAnimationEnd',_fnend);
					$after.addClass('active');
				}
				function _fnend2(){
					$after.off('animationend',_fnend2);
					$after.off('webkitAnimationEnd',_fnend2);
					mySwiper.unlockSwipes();
					mySwiper.lockSwipeToPrev();
					mySwiper.slideTo(1);
					mySwiper.slides.eq(1).addClass('active');
				}
			});
		}else{
			$('.page_box .x_white').removeClass('x_white_end');
			$('.page_box .after').removeClass('active');
		}
	}
	$('.box_end').on('animationend webkitAnimationEnd',function (){
		if (autoplay) {
			setTimeout(function (){
				mySwiper.slideNext();
			},300);
		}
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
	var arrImg = ['./assets/images/bg1.jpg','./assets/images/just_4.png','./assets/images/just_5.png','./assets/images/just_6.png','./assets/images/just_7.png','./assets/images/just_8.png','./assets/images/l_end.png','./assets/images/p_end.png','./assets/images/p_p2.png','./assets/images/p_t.png','./assets/images/p2_1_2.png','./assets/images/p2_2_2.png','./assets/images/p2_2_3.png','./assets/images/p2_3.png','./assets/images/p2_4_3.png','./assets/images/p2_5.png','./assets/images/p2_5_2.png','./assets/images/p2_5_3.png','./assets/images/p2_6_3.png','./assets/images/p2_7_1.png','./assets/images/p2_7_2.png','./assets/images/p2_8.png','./assets/images/p3_2.png','./assets/images/p3_4.png','./assets/images/p3_5.png','./assets/images/p3_6.png','./assets/images/p3_7.png','./assets/images/xinfeng.png'];
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