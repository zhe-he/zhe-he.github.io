$(function (){
	var Click = 'ontouchstart' in window?'touchstart':'click';

	var mySwiper;

	
	// 预加载
	function preLoad(){
		var now = 0;
		var allImgArr = ["images/eight/arrow.png","images/eight/point-1.jpg","images/eight/point-2.jpg","images/eight/point-3.jpg","images/eight/point-4.jpg","images/eight/point-5.jpg","images/eight/product.jpg","images/eight/star.png","images/eight/title.png","images/five/arrow.png","images/five/point-1.jpg","images/five/point-2.jpg","images/five/point-3.jpg","images/five/point-4.jpg","images/five/point-5.jpg","images/five/product.jpg","images/five/star.png","images/five/title.png","images/four/arrow.png","images/four/point-1.jpg","images/four/point-2.jpg","images/four/point-3.jpg","images/four/point-4.jpg","images/four/point-5.jpg","images/four/product.jpg","images/four/star.png","images/four/title.png","images/gray-star.png","images/nine/end.jpg","images/nine/small-1.jpg","images/nine/small-10.jpg","images/nine/small-11.jpg","images/nine/small-12.jpg","images/nine/small-2.jpg","images/nine/small-3.jpg","images/nine/small-4.jpg","images/nine/small-5.jpg","images/nine/small-6.jpg","images/nine/small-7.jpg","images/nine/small-8.jpg","images/nine/small-9.jpg","images/one/arrow.png","images/one/bg.jpg","images/one/title.png","images/point.png","images/seven/arrow.png","images/seven/point-1.jpg","images/seven/point-2.jpg","images/seven/point-3.jpg","images/seven/point-4.jpg","images/seven/point-5.jpg","images/seven/product.jpg","images/seven/star.png","images/seven/title.png","images/six/arrow.png","images/six/point-1.jpg","images/six/point-2.jpg","images/six/point-3.jpg","images/six/point-4.jpg","images/six/point-5.jpg","images/six/product.jpg","images/six/star.png","images/six/title.png","images/three/arrow.png","images/three/point-1.jpg","images/three/point-2.jpg","images/three/point-3.jpg","images/three/point-4.jpg","images/three/point-5.jpg","images/three/product.jpg","images/three/star.png","images/three/title.png","images/two/arrow.png","images/two/point-1.jpg","images/two/point-2.jpg","images/two/point-3.jpg","images/two/point-4.jpg","images/two/point-5.jpg","images/two/product.jpg","images/two/star.png","images/two/title.png"];
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

				var hash = Number(window.location.hash.substr(1));
				hash = isNaN(hash)?0:hash;
				createSlide(hash);
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

	// 创建html
	function createHtml(){
		var data = window.data.page;
		var data2 = window.data.footer.product;
		var $firstSlide = $('#wrapper .first-slide');
		var $lastSlide = $('#wrapper .last-slide');
		
		// 第一页
		$firstSlide.find('p').html(window.data.header.content);

		// 中间页面
		for (var i = 0; i < data.length; i++) {
			var str = '<div class="swiper-slide">\
				<h2></h2>\
				<aside></aside>\
				<div class="con">\
					<h4>'+data[i].title+'</h4>\
					<p><i>￥</i><i>'+data[i].price+'</i><i>×'+data[i].periods+'期</i></p>\
					<p>'+data[i].content+'</p>\
					<a href="'+data[i].href+'">立即购买</a>\
				</div>\
				<h3>用户点评</h3>';

			for (var j = 0; j < data[i].evaluate.length; j++) {
				var size = data[i].evaluate[j].star;
				var score = (size*5/100).toFixed(1);
				str += '<section class="item">\
					<div class="item-l"></div>\
					<div class="item-r">\
						<h5>'+data[i].evaluate[j].name+'</h5>\
						<p><span><i style="width:'+size+'%;"></i></span><span>'+score+'分</span><time datetime="'+data[i].evaluate[j].datetime+'">'+data[i].evaluate[j].datetime+'</time></p>\
						<p>'+data[i].evaluate[j].say+'</p>\
					</div>\
				</section>';
			};
			str += '<a class="more" href="javascript:;">展开全部点评</a>\
				<div class="arrow"></div>\
			</div>';

			$lastSlide.before(str);
		};

		// 最后一页
		str = '';
		for (var i = 0; i < data2.length; i++) {
			str += '<li>\
						<a href="'+data2[i].href+'">\
							<div class="img"></div>\
							<h5>'+data2[i].title+'</h5>\
							<p><i>￥</i><i>'+data2[i].price+'</i><i>×'+data2[i].periods+'期</i></p>\
						</a>\
					</li>';
		};
		$lastSlide.find('ul').html(str);
		$lastSlide.find('footer p').html(window.data.footer.content);
	}

	// 展开全部
	function showAll(){
		var $a = $('.more');

		$a.each(function (index,ele){
			$(ele).on(Click,function (){
				var $item = $(ele).siblings('.item');
				$item.css('display','block');
				$(ele).remove();
			});
		});
	}
	// 向右滑动置中
	function setCenter(){
		var $r = $('.arrow');
		var h = $(window).height()/2;
		$(window).on('scroll', function (){
			var t = $(window).scrollTop();
			$r.css('top',t+h+'px');
		});
	}


	function setHeight(swiper){
		var slides = swiper.slides;
		var height = $(window).height();
		var index = swiper.activeIndex;
		// 每次滑动完成让上一个高度归零，避免上一个滚动条的影响
		for (var i = 0; i < slides.length; i++) {
			slides[i].style.height = height + 'px';
		};
		slides[index].style.height = 'auto';
	}

	function createSlide(curIndex){
		curIndex = curIndex || 0;
		mySwiper = new Swiper('.swiper-container', {
			initialSlide: 	curIndex,
			onSlideChangeEnd: 	function (swiper){
				// window.scroll(0,0);
				document.documentElement.scrollTop = document.body.scrollTop = 0;
				window.location.hash = swiper.activeIndex;
				setHeight(swiper);
				/*if (swiper.activeIndex == swiper.slides.length-1) {
					swiper.slides[swiper.activeIndex].className = 'swiper-slide last-slide active';
				};*/
			},
			onInit: 			function (swiper){
				setHeight(swiper);
			}
		});
	}

	function init(){
		createHtml();
		preLoad();
		setCenter();
		showAll();
	}

	init();
});
