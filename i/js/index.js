$(function (){
	// 全局变量
	var lastX = 0; 															// 第三屏 上一次的x距离
	var maxWidth = 0;														// 第三屏 最大距离
	var windowWidth = 0; 													// 窗口宽度,后续无缝添加

	var $cell3 = $('.cell3');
	var $cell4 = $('.cell4');
	var $musicBtn = $('.music');

	// 点赞
	function iLoveYou(){
		var $aLove = $cell4.find('.bottom .love');

		// 传入后台的参数，写中文只是为了方便更改
		var data = ["圆方","维尚工厂","维意定制","新居网","尚品宅配"]

		$aLove.each(function (index,ele){
			$(this).on('click', function (){
				var _this = this;
				var con = $(_this).next().find('.count');

				if (_this.isLove) {return false}; // 是否已经点击过一次
				_this.isLove = true;

				if(_this.isGoing){return false;} // 是否在请求中
				_this.isGoing = true;


				/*$.ajax({
					url: 	'',
					data: 	data[index],
					dataType: 	'json',
					success: 	function (){
						_this.isGoing = false;
						con.text(con.text()-0+1);
					},
					error: 		function (a,b){
						_this.isGoing = false;
						console.log(a,b);
					}
				})*/
				_this.isGoing = false; //待删除
				con.text(con.text()-0+1); //待删除
				// 注释的部分 替换 以上二行

			});
		});
	}

	// 设置
	function setHeight(){
		var w = $(window).width();
		var h = $(window).height();
		var W = h/818*4662;
		if (w>640) {
			w=640;
		};

		maxWidth = W - w;
		lastX = -maxWidth*0.48275;
		windowWidth = w;
		$('.cell').css({
			"width": 	w + "px",
			"height": h + "px"
		});
		$cell3.find('.contain').css({
			"width": 	W + "px",
			"height": 	h +"px",
			"-webkit-transform": 	"translate3d(" + lastX + "px,0px,0px)",
			"transform": 	"translate3d(" + lastX + "px,0px,0px)"
		});
		$cell3.find('.leftImg').css({
			"width": 	W/3 + "px",
			"height": 	h + "px",
			"left": 	-W/3+1 + "px"
		});
		$cell3.find('.rightImg').css({
			"width": 	W/3 + "px",
			"height": 	h + "px",
			"right": 	-W/3+1 + "px"
		});
	}

	// 第一屏
	function oneScreen(){
		var $cell1 = $('.cell1');
		var $man2 = $cell1.find('.man2');

		$cell1.one('touchstart',function (){
			$(this).addClass('active');
		});

		$man2.on('webkitAnimationEnd animationend', function (){
			$cell1.on('click', function (){
				
				$(this).addClass('stop rotate').on('webkitAnimationEnd animationend', function (){
					$(this).remove();
					twoScreen();
				});
			});

		});

	}
	// 第二屏
	function twoScreen(){
		var $cell2 = $('.cell2');
		$cell2.addClass('center active').on('click', function(){
			$(this).addClass('stop');
			threeScreen();
		})
		$musicBtn.css('display','block');
		document.getElementById('music').play();
	}
	// 第三屏 
	function threeScreen(){
		var $aBall = $cell3.find('.ball');
		var $aAddBall = $cell3.find('.addBall');

		$cell3.removeClass('hide').addClass('center active');

		$aBall.each(function (index,ele){
			$(ele).on('click', function (){
				$cell3.addClass('stop');

				fourScreen(index);
			});
		});
		$aAddBall.on('click',function (){
			var index = $(this).attr('data-index');
			$cell3.addClass('stop');
			fourScreen(index);
		})



		var isMobile = 'ontouchstart' in window ? true : false;
		var touchStart = isMobile ? 'touchstart' : 'mousedown';
		var touchMove = isMobile ? 'touchmove' : 'mousemove';
		var touchEnd = isMobile ? 'touchend' : 'mouseup';

		var oBox = document.getElementById('contain');
		oBox.addEventListener(touchStart, startFn, false);
		function startFn(ev){
			var touch = ev.targetTouches ? ev.targetTouches[0] : ev;

			var startX = touch.pageX;
			var disX = 0, endX = 0;

			
			function moveFn(ev){
				var touch = ev.targetTouches ? ev.targetTouches[0] : ev;

				disX = touch.pageX - startX + lastX;
				
				if (disX >= windowWidth) {
					disX = windowWidth;
				};
				if (disX <= -(maxWidth+windowWidth)) {
					disX = -(maxWidth+windowWidth);
				};

				oBox.style.WebkitTransform = 'translate3d(' + disX + 'px, 0px, 0px)';
				oBox.style.transform = 'translate3d(' + disX + 'px, 0px, 0px)';
				ev.preventDefault();
			}
			function endFn(ev){
				oBox.removeEventListener(touchMove,moveFn,false);
				oBox.removeEventListener(touchEnd,endFn,false);

				
				if (disX > 0) {
					disX = -maxWidth + disX - windowWidth;
				};
				if (disX < -maxWidth) {
					disX = windowWidth-(-maxWidth - disX);
				};

				if (disX !==0) {
					lastX = disX;
				};

				oBox.style.WebkitTransform = 'translate3d(' + lastX + 'px, 0px, 0px)';
				oBox.style.transform = 'translate3d(' + lastX + 'px, 0px, 0px)';
			}

			oBox.addEventListener(touchMove, moveFn, false);
			oBox.addEventListener(touchEnd, endFn, false);

			ev.preventDefault();
		}
	}

	// 第四屏
	function fourScreen(who){
		var $aItem = $cell4.find('.item');

		$cell4.removeClass('hide').addClass('center');
		$aItem.eq(who).addClass('active');

		fourFn && fourFn();
		
	}

	function fourFn(){
		fourFn = null;
		var $aItem = $cell4.find('.item');
		$cell4.on('click', function (ev){
			var target = ev.target || ev.scrElement;
			
			/*此处做点赞处理*/
			while(target && target.className !== "love"){
				target = target.parentNode;
			}
			if (target && target.className === "love") {
				return false;
			};
			/*此处做点赞处理*/

			/*此处回到上一页*/
			$cell4.addClass('hide').removeClass('center');
			$aItem.removeClass('active');
			$cell3.removeClass('stop');
			/*此处回到上一页*/
		});
	}

	// 音乐
	function fnMusic(){
		var music = document.getElementById('music');
		$musicBtn.on('click',function (){
			if ($(this).hasClass('close')) {
				$musicBtn.removeClass('close');
				music.play();
			}else{
				$musicBtn.addClass('close');
				music.pause();
			};
		});
	}


	function init(){
		setHeight();
		oneScreen();
		// twoScreen();
		iLoveYou();
		fnMusic();
	}

	init();
});