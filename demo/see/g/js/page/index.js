require('../../css/index.scss');
import $ from 'zepto';
import Swiper from 'swiper';
import Vue from 'vue';



$(function (){
	var mySwiper;
	var myVue;
	var $music,musicBtn;
	var CURNOW = 0;
	var timex = 30; // 因为想更快，而不是为了快，用户感觉快比实际快更重要，故开定时让用户看见快的过程而不是快的结果
	function createVue(){
		

		myVue = new Vue({
			el: '#main',
			data: {
				your: '',
				zhufu: '',
				my: '',
				date: '',
				music: 0
			},
			computed: {
				fontsize: function (){
					var max = 16;
					var min = 6;
					var f;
					var l = this.zhufu.length;
					if (l >= max) {
						f = 0.3;
					}else if(l <= min){
						f = 0.76;
					}else{
						f = 0.76 - (l-min)/(max-min)*(0.76-0.3);
					}
					return f;
				}
			},
			mounted: function (){
				this.$nextTick(()=>{
					effect();
					// CURNOW
					var x = window.location.hash.substr(1);
					if (x) {

						var arr = decodeURIComponent(x).split('--||--');
						this.your = arr[0] || '';
						this.zhufu = arr[1] || '';
						this.my = arr[2] || '';
						this.date = arr[3] || '';
						this.music = arr[4] || '';
						$('.page5').removeClass('hide');
						setTitle('你有一封来自'+this.my+'的祝福');

						CURNOW = arr[4]-0+1;
						$music.get(CURNOW).play();
					}else{
						$('.page1').removeClass('hide').addClass('active');

						$music.get(0).play();
					}



				});
			},
			methods: {
				
			}
		});

	}


	function fnLoop(swiper){
		myVue.music = swiper.activeIndex%3;
		CURNOW = myVue.music+1;
		if (swiper.activeIndex==0) {
			swiper.slideTo(3,0);
		}else if(swiper.activeIndex==5){
			swiper.slideTo(2,0);
		}
	}

	function effect(){
		$('.js-shownext').on('click',function (){
			setTimeout(function (){
				page2();
			},timex);
		});

		$('.anniu').on('click',function (){
			$('.page2').addClass('page3');
		});
		var $ap = $('#main3 > p');
		var $aInput = $('#main3 > input');
		$ap.each(function (index){
			$(this).on('click',function (){
				$(this).addClass('hide');
				$aInput.get(index).focus();

			});

			$aInput.eq(index).on('blur',function (){
				if(!this.value.trim()){
					$ap.eq(index).removeClass('hide');
				}
			});
		});
		$('.end').on('click',function (){
			setTimeout(function (){
				var t1 = myVue.your.trim();
				var t2 = myVue.zhufu.trim();
				var t3 = myVue.my.trim();
				var t4 = myVue.date.trim();
				if (!t1) {
					alert('请填写您的祝福对象');
					return ;
				}
				if(!t2){
					alert('请填写您的祝福语');
					return ;
				}
				if(!t3){
					alert('请签上您的大名');
					return ;
				}
				if(!t4){
					alert('请填写祝福的日期');
					return ;
				}
				$('.page2').removeClass('page3').addClass('hide');
				$('.page4').removeClass('hide');

				document.title = '你有一封来自'+t3+'的祝福';
				window.location.hash = '#'+encodeURIComponent(t1+'--||--'+t2+'--||--'+t3+'--||--'+t4+'--||--'+myVue.music);
			},timex);
		});

		$('.back').on('click',function (){
			setTimeout(function (){
				$('.page4').addClass('hide');
				$('.page2').removeClass('hide');

			},timex);
		});
		$('.jingxi').on('click',function (){
			setTimeout(function (){

				$('.page1').removeClass('hide').addClass('active');
				$('.page5').remove();

				window.location.hash = '#';
				myVue.your = '';
				myVue.zhufu = '';
				myVue.my = '';
				myVue.date = '';
				myVue.music = 0;
				CURNOW = 0;
				setMusic(CURNOW);

				setTitle('为Ta设计生日惊喜');

			},timex);
		});
		$('.fenxiang').on('click',function (){
			setTimeout(function (){
				alert('点击右上角，发送给微信好友吧~');
			},timex);
		});


		// 音乐
		$music = $('.js-music');
		musicBtn = document.getElementsByClassName('music')[0];
		fnMusic();
		function fnMusic(){
			musicBtn.addEventListener('click',_fn,false);
			function _fn(){
				if (musicBtn.className === 'music') {
					musicBtn.className = 'music close';

					setMusic();				
				}else{
					musicBtn.className = 'music';
					
					setMusic(CURNOW);		
				}
			}
		}
	}
	function setMusic(now,end){
		$music.each(function (index,ele){
			ele.pause();
		});
		if (!end && now > -1) {
			$music.get(now).play();
		}
	}

	function page2(){
		$('.page1').addClass('hide');
		$('.page2').removeClass('hide');
		$('.js-touch').addClass('show');

		
		setMusic(CURNOW);
		musicBtn.className = 'music';
		mySwiper = new Swiper('.pan', {
			initialSlide: 3,
			onTouchStart: function (swiper){
				fnLoop(swiper);
			},
			onSlideChangeEnd: function (swiper){
				fnLoop(swiper);

				if (musicBtn.className == 'music') {
					setMusic(CURNOW);
				}
				
			}
		});
	}


	// 预加载
	var arrImg = ['./assets/images/anniu.png','./assets/images/bg.jpg','./assets/images/button.jpg','./assets/images/cangpian1.png','./assets/images/cangpian2.png','./assets/images/cangpian3.png','./assets/images/e_1.png','./assets/images/end.png','./assets/images/f_1.png','./assets/images/f_3.png','./assets/images/f_5.png','./assets/images/f_7.png','./assets/images/happy.png','./assets/images/jingxi.png','./assets/images/l_end.png','./assets/images/logo_b.png','./assets/images/main-bg.png','./assets/images/white-b.png','./assets/images/yinyue2.png','./assets/images/zuo_jian.png','./assets/images/share_btn.png'];
	preLoad(arrImg,function (){
		createVue();
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

	
	function setTitle(t) {
		document.title = t;
		var i = document.createElement('iframe');
		i.src = '//m.baidu.com/favicon.ico';
		i.style.display = 'none';
		i.onload = function() {
			setTimeout(function(){
				i && i.parentNode && i.parentNode.removeChild(i);
			}, 16.7)
		}
		document.body.appendChild(i);
	}

	
	document.addEventListener('touchstart',oncefn,false);
	function oncefn(){
		document.removeEventListener('touchstart',oncefn,false);
		basefn();
	}
	function basefn(){
		var x = window.location.hash.substr(1);
		var curnow = 0;
		if (x) {
			var arr = decodeURIComponent(x).split('--||--');
			curnow = arr[4]-0+1;
		}
		var $music = $('.js-music');
		$music.get(curnow).play();
		for (var i = 0; i < 4; i++) {
			if (i!==curnow) {
				$music.get(i).load();
			}
		}
	}
	document.addEventListener("WeixinJSBridgeReady",function(){
		basefn();
	});
});