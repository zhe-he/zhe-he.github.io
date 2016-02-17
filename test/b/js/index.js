$(function (){
	var mySwiper = new Swiper('.swiper-container', {
		direction : 'vertical',
		onSlideChangeEnd: 	function (swiper){
			window.location.hash = swiper.activeIndex;
		}
	});

	// 预加载
	preLoad();
	function preLoad(){
		var now = 0;
		var allImgArr = ["images/arrow-b.png","images/arrow-w.png","images/bg-blank.png","images/bg1.jpg","images/bg2.jpg","images/bg3.jpg","images/bg4.jpg","images/h1.png","images/p1.jpg","images/p2.jpg","images/p3.jpg","images/p4.jpg"];
		var count = allImgArr.length;
		
		var $loading = $('#loading p').eq(0).find('span');
		var $text = $('#loading p').eq(1).find('span');

		for (var i = 0; i < allImgArr.length; i++) {
			imgLoad(allImgArr[i],function (){
				loading();

				var hash = Number(window.location.hash.substr(1));
				hash = isNaN(hash)?0:hash;
				mySwiper.slideTo(hash, 0, false);
			});
			
		};

		function loading(){
			now++;
			var t = Math.floor(now/count*100);
			$loading.css('width',t+'%');
			$text.text(t);
			if (now === count) {
				$('#loading').remove();
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
});