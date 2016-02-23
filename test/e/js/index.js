$(function (){
	var mySwiper; 	// 介绍页面弹窗
	var $bookBox = $('#book-box'); 	// 书单盒子
	var $container = $('#container'); // 弹窗盒子
	var Click = 'ontouchstart' in window?'touchstart':'click';
	var offsetArr = []; 	// 书单单元的位置信息

	// 创建弹窗
	function createSwiper(){
		mySwiper = new Swiper('.swiper-container', {
			prevButton:'.button-prev',
			nextButton:'.button-next',
			onSlideChangeEnd: 	function (swiper){
				var index = swiper.activeIndex;
				var H = $(window).height();
				document.documentElement.scrollTop = document.body.scrollTop = offsetArr[index].top + offsetArr[index].height/2 - H/2;
			}
		});
		closeSwiper();
	}
	// 显示弹窗
	function showSwiper(index){
		$container.addClass('active');
		mySwiper.slideTo(index,0);

		$('body').on('touchstart',preventDefaultFn);

	}
	// 关闭弹窗
	function closeSwiper(){
		var $a = $container.find('.button-close');
		$a.on(Click, function (){
			$container.removeClass('active');

			$('body').off('touchstart',preventDefaultFn);
		});
	}
	function preventDefaultFn(ev){
		ev.preventDefault();
	}

	// 创建html,填充数据
	function createHtml(){
		var $content = $('#content'); 
		var $wrapper = $container.find('.swiper-wrapper');
		var str = '',str2 = '',data = window.kindleData.bookMenu;
		for (var i = 0; i < data.length; i++) {
			data[i].index = i+1;
			str += bookHtml(data[i]);
			str2 += slideHtml(data[i]);
		};
		
		$content.html(contentHtml(window.kindleData));
		$bookBox.html(str);
		$wrapper.html(str2);
	}

	// 模板内容
	function contentHtml(data){
		var html = '<p>${title}</p>\
					<a href="${href}"></a>\
					<p>Kindle Paperwhite 3</p>\
					<p><i>￥</i><i>79</i><i>×12期</i></p>\
					<a href="${href}">立即购买</a>\
					<p>${explain}</p>';
		return tempFn(html,data);
	}
	function bookHtml(data){
		var html = '<div class="book-item">\
						<h3><span>${index}.${title}·</span><span>${address}</span></h3>\
						<div class="con">\
							<div class="con-fl js-detail"></div>\
							<div class="con-fr">\
								<h5>推荐理由：</h5>\
								<p>${reason}<a class="js-detail" href="javascript:;">【点击查看简介】</a></p>\
							</div>\
						</div>\
					</div>';
		return tempFn(html,data);
	}
	function slideHtml(data){
		var html = '<section class="swiper-slide">\
						<header>\
							<em></em>\
							<i></i>\
							<h3>${title}</h3>\
						</header>\
						<footer>\
							<h2>简介：</h2>\
							<p>${content}</p>\
						</footer>\
					</section>';
		return tempFn(html,data);;
	}

	// 模板函数
	function tempFn(html,data){
		for(var name in data){
			var re = new RegExp('\\$\\{'+name+'\\}','g');
			html = html.replace(re,data[name]);
		}
		return html;
	}

	// 点击查看简介
	function findDetail(){
		var $item = $bookBox.find('.book-item');
		$item.each(function (index,ele){
			// 存储当前item的位置信息
			offsetArr[index] = $(this).offset(); 

			var $a = $(this).find('.js-detail');
			$a.on(Click, function (){
				showSwiper(index);
			});
		});
	}

	function init(){
		createHtml();
		createSwiper();
		findDetail();
		console.log(offsetArr);
	}

	init();
});

