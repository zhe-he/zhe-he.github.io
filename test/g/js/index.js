$(function (){
	var slideH = ["12.18rem", "21.79rem", "23.19rem", "22.65rem", "19.37rem", "21.52rem", "21.31rem", "12.2rem"];
	var lastX = 0;
	var isChange = false;

	function setHeight(swiper){
		var h = $(window).height();
		swiper.slides.height(h+'px');
		swiper.slides.eq(swiper.activeIndex).height(slideH[swiper.activeIndex]);
	}
	function fixArrow(){
		var t = $(window).scrollTop();
		var h = $(window).height();
		$('.arrow').css('top', t+h/2+'px');
	}

	function getTransformX(swiper){
		 var reNum = /matrix\((-?\d+),\s?(-?\d+),\s?(-?\d+),\s?(-?\d+),\s?(-?\d+),\s?(-?\d+)\)/g;
		 var str = getComputedStyle(swiper.wrapper[0],null)['transform'];
		 if (reNum.test(str)) {
		 	return RegExp.$5; 
		 }else{
		 	return 0;
		 };
	}

	function init(){
		$('.swiper-container').removeClass('hide');
		new Swiper('.swiper-container', {
			hashnav: 				true,
			onInit: 				function(swiper){
				swiper.slides.removeClass('active').eq(swiper.activeIndex).addClass('active visited');
				setHeight(swiper);

				lastX = getTransformX(swiper);
			},
			onSlideChangeEnd: 		function(swiper){
				document.documentElement.scrollTop = document.body.scrollTop = 0;
				swiper.slides.removeClass('active').eq(swiper.activeIndex).addClass('active visited');
				setHeight(swiper);
			},
			onTransitionEnd: 		function (swiper){
				isChange = false;
				lastX = getTransformX(swiper);
				setHeight(swiper);
			},
			onTouchMove: 			function(swiper){
				var nowX = getTransformX(swiper);
				if (nowX != lastX && !isChange) {
					isChange = true;
					for (var i = 0; i < swiper.slides.length; i++) {
						swiper.slides[i].style.height = slideH[i];
					};
				};
			}
		});
		fixArrow();
		$(window).on('scroll', fixArrow);
	}

	// 预加载
	function preLoad(){
		var now = 0;
		var allImgArr = ["images/arrow.png","images/bg1-base.jpg","images/bg2-base.jpg","images/bg3-base.jpg","images/bg4-base.jpg","images/bg5-base.jpg","images/bg6-base.jpg","images/bg7-base.jpg","images/bg8-base.jpg"];
		var count = allImgArr.length;
		var $loading = $('#loading p').eq(0).find('span');
		var $text = $('#loading p').eq(1).find('span');

		for (var i = 0; i < allImgArr.length; i++) {
			imgLoad(allImgArr[i],function (){
				loading();
			});
		};

		function loading(){
			now++;
			var t = Math.floor(now/count*100);
			$loading.css('width',t+'%');
			$text.text(t);
			if (now === count) {
				$('#loading').remove();

				init();
			};

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

	preLoad();
});