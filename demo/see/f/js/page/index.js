require('../../css/index.scss');
import $ from 'zepto';
import Swiper from 'swiper';
$(function (){
	var mySwiper = null;
	var timer = null;
	var timer2 = null;
	var iNow = 0;
	var iNow2 = 0;
	var sbox = $('.main-box').get(0);
	var disH = sbox.scrollHeight - sbox.offsetHeight;
	var $item = $('.box > *');

	$('#page_box').one('click',function (){
		$('.x_white').remove();
		$('#page_box .after').addClass('active');

		setTimeout(function (){
			$('.page_index').animate({opacity:0},{complete:function (){
				$('.page_index').remove();
				page2();
			}});
		},600);
	});

	function page2(){
		timer = setInterval(_fnTimer,16.7);

		sbox.addEventListener('touchstart',function (){
			clearInterval(timer);
		},false);
		sbox.addEventListener('touchend',function (){

		},false);
	}

	function page3(){
		music2.play();
		var s = '在这个家园^我们珍视每个人、每件小事^每个特别的日子^每一片温柔的晨光、夕辉^每一滴闪光的雨水^^但以我美好的光阴^和用心陈酿的幸福^去爱你';
		clearInterval(timer2);

		timer2 = setInterval(function (){

			iNow2++;
			var text = s.substr(0,iNow2).replace(/\^/g,'<br/>');
			if (iNow2 == s.length) {
				iNow2 = 0;
				clearInterval(timer2);
				$('.js-page3-end').addClass('active');
				music2.pause();
			}else{
				text = s.substr(0,iNow2).replace(/\^/g,'<br/>') + '|';
			}
			$('#page3').html(text);
		},100+Math.random()*100);
	}

	sbox.addEventListener('scroll',function (){
		$item.each(function (index,ele){
			var h = $(window).height();
			var t = $(this).offset().top;
			if (t<=h*2/3) {
				$(this).addClass('active');
			}
		});

		if (sbox.scrollTop>=disH-1) {
			if (!mySwiper) {
				mySwiper = new Swiper('.page_swiper', {
					direction: 'vertical',

					onSlideChangeEnd: function(swiper){
						if (swiper.activeIndex==1) {
							page3();
						}else if(swiper.activeIndex==2){
							sbox.scrollTop = 0;
							swiper.slideTo(0,0);
							swiper.disableTouchControl();

							$item.removeClass('active');
							iNow = 0;
							clearInterval(timer);
							timer = setInterval(_fnTimer,16.7);
						}else if(swiper.activeIndex==0){

							music2.pause();
							iNow2 = 0;
							$('.js-page3-end').removeClass('active');
							$('#page3').html('');

							swiper.disableTouchControl();
						}
					},
					onTouchStart: function (swiper){
						if(swiper.activeIndex==2){
							sbox.scrollTop = 0;
							swiper.slideTo(0,0);
							swiper.disableTouchControl();
						}
					}
				});
			}
			mySwiper.enableTouchControl();
		}

	});

	$item.eq($item.length-1).on('animationend webkitAnimationEnd',function (){
		$('.end').addClass('active');
	});

	function _fnTimer(){
		iNow++;
		if (iNow>=disH) {
			clearInterval(timer);
			$item.addClass('active');

			mySwiper.slideNext();
		}
		sbox.scrollTop = iNow;
	}

	function rnd(m,n){
		return (Math.random()*(n-m)+m+1)|0;
	}




	// 音乐
	var music = document.getElementById('music');
	var music2 = document.getElementById('music2');
	var musicBtn = document.getElementsByClassName('music')[0];

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
	var arrImg = ['assets/images/bg1.jpg','assets/images/b-logo.png','assets/images/just_4.png','assets/images/just_5.png','assets/images/just_6.png','assets/images/just_7.png','assets/images/just_8.png','assets/images/l_end.png','assets/images/p_end.png','assets/images/p_p2.png','assets/images/p_t.png','assets/images/xinfeng.png'];
	preLoad(arrImg,function (){
		$('.js-pre').addClass('active');
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
	    music2.load();
	}, false);

});