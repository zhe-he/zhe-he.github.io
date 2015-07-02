myWeb.fn.ready(function (){
	var H; 			//窗口可视区高度
	var aScreen = myWeb.fn.getByClassName('content')[0].children; 	//每一屏元素集合
	var nowIndex = 0; 			//当前滚动在第几屏
	var lastLi; 			//上一个悬浮菜单li
	var scrollTimer = null; 	//滚轮计时器
	var hashArr = ['#index','#personPresentation','#experience','#skill','#workDisplay','#callMe'] 			//hash
	//添加方法
	myWeb.fn.scrollFn = function (s,callBack){
		//判断是滚动还是点击
		var scrollTop = nowIndex * H;
		if (typeof s === 'string') {
			var tb = s - nowIndex;
			nowIndex = Number(s);
		}else{
			var tb = s > 0 ? 1: -1; 	//朝向,向下还是向上滚动
			nowIndex += tb;
			if (nowIndex === aScreen.length) {
				nowIndex--;
				callBack && callBack();
				return
			}else if(nowIndex === -1){
				nowIndex++;
				callBack && callBack();
				return
			};
			
		};
		
		//顶部彩色条
		myWeb.fn.getById('top').style.width = 100*nowIndex/(aScreen.length-1) + '%';


		var time = 700;
		var n = 0;
		var count = Math.floor(time / 30);
		//连续点击时scrollTop的bug,用nowIndex代替
		//var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		
		clearInterval(scrollTimer);

		myWeb.fn.removeClass(lastLi,'active');
		myWeb.fn.move(lastLi.children[0],{opacity:0});
		lastLi = lastLi.parentNode.children[nowIndex];
		myWeb.fn.addClass(lastLi,'active');
		myWeb.fn.move(lastLi.children[0],{opacity:100});

		scrollTimer = setInterval(function (){
			n++;
			var v = 1 - n / count;
			var cur = scrollTop + tb * H * (1 - v * v * v);
			document.documentElement.scrollTop = document.body.scrollTop = cur;

			if (n === count) {
				clearInterval(scrollTimer);
				callBack && callBack();
				//添加hash
				for (var i = nowIndex; i < aScreen.length; i++) {
					if(nowIndex === i){
						window.location.hash = hashArr[i];
						break;
					}	
				};
			}
		}, 30);
	};

	//动画
	myWeb.fn.animate = function (obj){

		var aItem = myWeb.fn.getByClassName(obj,'animate');
		for (var i = 0; i < aItem.length; i++) {
			myWeb.fn.addClass(aItem[i], 'active');
		};
	};

	//demo 方块
	myWeb.fn.hoverDir = function(obj, mouse) {
		var x = obj.offsetLeft + obj.offsetWidth / 2 - mouse.clientX;
		var y = obj.offsetTop + obj.offsetHeight / 2 - mouse.clientY;
		return Math.round((Math.atan2(y, x) * 180 / Math.PI + 180) / 90) % 4
	};


	myWeb.effect = {
		//预加载
		loading: 	function (){
			var _this = this;
			this.loading = null;
			var oContent = myWeb.fn.getById('content');
			var oBox = myWeb.fn.getById('load');
			var oSpan = myWeb.fn.getByTagName(oBox,'span')[0];
			var oP = myWeb.fn.getByTagName(oBox,'p')[0];
			var timer = null;	//加载时间过长，十秒必打开
			var imgArr = ["box.png","demo.png","dot1.png","email.png","face.png","face2.png","find.png","more.png","qq.png","skill.jpg","skill.png","tel.png","apple.jpg","block.jpg","clock.jpg","desktop.jpg","magnifier.jpg","photo.jpg","tab.jpg","waterfall.jpg"]; 	//需要加载的图片
			var iNow = 0;
			var count = imgArr.length; 			//100/length 有余数，仅为计算

			for (var i = 0; i < imgArr.length; i++) {
				var oImg = new Image();
				oImg.onload = function (){
					this.onload = null;
					//每张图大小不一，故用++，不用i
					iNow += Math.floor(100/imgArr.length);
					count--;
					oSpan.style.width = iNow + '%';
					oP.innerHTML = '加载中 '+iNow+'%';
					if (count === 0) {
						clearTimeout(timer)
						base();
					};
				};
				oImg.onerror = function (){
					this.onerror = null;
					count--;
					if (count === 0) {
						clearTimeout(timer)
						base();
					};
				}

				oImg.src = 'img/' + imgArr[i];
			};

			timer = setTimeout(function (){
				base();
			}, 10000);


			function base(){
				oBox.parentNode.removeChild(oBox);
				myWeb.fn.removeClass(oContent,'hide');
				_this.init(); 
			}
		},
		//悬浮菜单
		nav: 		function (){
			var aLi = myWeb.fn.getByClassName('nav_box')[0].children[0].children;
			lastLi = aLi[0];
			myWeb.fn.move(lastLi.children[0],{opacity:100});

			for (var i = 0; i < aLi.length; i++) {
				(function (index){
					myWeb.fn.on(aLi[index], 'click', function (){
						myWeb.fn.removeClass(lastLi, 'active');
						myWeb.fn.move(lastLi.children[0],{opacity:0},{end:function (){
							lastLi = aLi[index];
							myWeb.fn.addClass(lastLi, 'active');
							myWeb.fn.move(lastLi.children[0],{opacity:100});
						}});
						myWeb.fn.scrollFn(index+'', function (){
							myWeb.fn.animate(aScreen[nowIndex]); 	//执行动画
						});
					});
				})(i);
			};

		},
		//设置高度
		setHeight: 	function (){
			H = document.documentElement.clientHeight || document.body.clientHeight;
			for (var i = 0; i < aScreen.length; i++) {
				aScreen[i].style.height = H + 'px';
			};
		},
		//改变窗口大小
		resizeFn: 	function (){
			myWeb.fn.on(window,'resize',function (){
				myWeb.effect.setHeight();
				document.documentElement.scrollTop = document.body.scrollTop = nowIndex*H;
			})
		},
		//鼠标滚轮
		scroll: 		function (){
			var ready; 	//是否滚动完成
			myWeb.fn.addWheel(document.body,function (s){
				if (ready) {
					return;
				};
				ready = true;
				myWeb.fn.scrollFn(s, function (){
					ready = false;
					myWeb.fn.animate(aScreen[nowIndex]); 	//执行动画
				})
			});
		},
		//我的技能
		skill: 			function (){
			var aLi = myWeb.fn.getByClassName('skill')[0].children;
			for (var i = 0; i < aLi.length; i++) {
				aLi[i].style.WebkitTransitionDelay = i/2 + 's';
				aLi[i].style.MoztransitionDelay = i/2 + 's';
				aLi[i].style.OTransitionDelay = i/2 + 's';
				aLi[i].style.transitionDelay = i/2 + 's';
			};
		},
		//demo
		demo: 			function (){
			var oUl = myWeb.fn.getById('demo');
			var aLi = oUl.children;
			var aSpan = myWeb.fn.getByTagName(oUl, 'span');

			for (var i = 0; i < aLi.length; i++) { 
				(function(index) {
					aLi[i].onmouseover = function(ev) {
						var oEvent = ev || event;
						var oFrom = oEvent.fromElement || oEvent.relatedTarget;
						/*if (myWeb.fn.isChild(this, oFrom)) {
							return
						}*/
						if (this.contains(oFrom)) return;
						var num = myWeb.fn.hoverDir(this, oEvent);
						switch (num) {
						case 0:
							aSpan[index].style.left = "300px";
							aSpan[index].style.top = 0;
							myWeb.fn.move(aSpan[index], {
								left: 0
							});
							break;
						case 1:
							aSpan[index].style.top = "300px";
							aSpan[index].style.left = 0;
							myWeb.fn.move(aSpan[index], {
								top: 0
							});
							break;
						case 2:
							aSpan[index].style.left = "-300px";
							aSpan[index].style.top = 0;
							myWeb.fn.move(aSpan[index], {
								left: 0
							});
							break;
						case 3:
							aSpan[index].style.top = "-300px";
							aSpan[index].style.left = 0;
							myWeb.fn.move(aSpan[index], {
								top: 0
							});
							break
						}
					};
					aLi[i].onmouseout = function(ev) {
						var oEvent = ev || event;
						var oTo = oEvent.toElement || oEvent.relatedTarget;
						/*if (myWeb.fn.isChild(this, oTo)) {
							return
						}*/
						if (this.contains(oTo)) return;
						var num = myWeb.fn.hoverDir(this, oEvent);
						switch (num) {
						case 0:
							myWeb.fn.move(aSpan[index], {
								left: 300
							});
							break;
						case 1:
							myWeb.fn.move(aSpan[index], {
								top: 300
							});
							break;
						case 2:
							myWeb.fn.move(aSpan[index], {
								left: -300
							});
							break;
						case 3:
							myWeb.fn.move(aSpan[index], {
								top: -300
							});
							break
						}
					}
				})(i)
			}
		},
		//文字渐变不支持兼容处理
		font: 			function (){
			var oP = myWeb.fn.getByClassName(myWeb.fn.getByClassName('screen2')[0],'font')[0];
			if (!/AppleWebKit\/(\S+)/.test(window.navigator.userAgent)) {
				oP.style.color = '#fff';
			};
		},
		//hash 跳转
		hash: 			function (){
			function hashBase(){
				if (nowIndex === -1) {
					nowIndex = 0;
				};
				myWeb.fn.scrollFn(nowIndex+'',function (){
					myWeb.fn.animate(aScreen[nowIndex]);
				});
			}

			function hashFn(){
				var oHash = window.location.hash;
				if(Object.prototype.toString.call([].indexOf).indexOf('Function') !== -1){
					nowIndex = hashArr.indexOf(oHash);
					hashBase();
				}else{
					for (var i = 0; i < hashArr.length; i++) {
						if(hashArr[i] === oHash){
							nowIndex = i;
							break;
						}
					};
					hashBase();
				}
			}
			hashFn();
			myWeb.fn.on(window,'hashchange',hashFn);
			
		},
		init: 			function (){
			this.init = null;
			for (var name in this){
				if(Object.prototype.toString.call(this[name]).indexOf('Function') !== -1){
					this[name]();
				}
			}
		}

	};
	
	myWeb.effect.loading();
});