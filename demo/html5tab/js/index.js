/*
by： hezhe
@email: 460013464@qq.com
轮播图
*/

;(function (){
	boxFn();
	//轮播图
	function boxFn(){
		var oBox = document.getElementById('box');
		var aLi = oBox.querySelectorAll('.boxUl li');
		var aLi2 = oBox.querySelectorAll('.boxTab li');
		var oEffect = oBox.getElementsByClassName('boxEffect')[0];
		var oTab = oBox.getElementsByClassName('boxArrow')[0]
		var oLeft = oTab.children[0];
		var oRight = oTab.children[1];
		var oOther = oBox.getElementsByClassName('boxOther')[0];
		var lastImgSrc = aLi[0].querySelector('img').src;
		var nowImgSrc,Ready,timer;
		var iNow = 0;
		createSpan();

		//下方小点选项
		for (var i = 0; i < aLi2.length; i++) {
			aLi2[i].index = i;
			aLi[i].style.zIndex = aLi.length - i;
			aLi2[i].onclick = function (){
				if (Ready || this.className == 'active') {return};
				Ready = true;
				iNow = this.index;
				resetLi();
				spanEffect();
			};
		}

		//左、右
		oLeft.onclick = function (){
			if (Ready) {return};
			Ready = true;
			iNow--;
			if (iNow == -1) {
				iNow = aLi.length - 1;
			};
			resetLi();
			spanEffect();
		}
		oRight.onclick = function (){
			if (Ready) {return};
			Ready = true;
			iNow++;
			if (iNow == aLi.length) {
				iNow = 0;
			};
			resetLi();
			spanEffect();
		}

		//自动播放
		clearInterval(timer);
		timer = setInterval(autoFn, 3000);
		function autoFn(){
			otherFn(function (){
				oRight.click();
			})
		}

		//关闭、开启定时器
		oBox.onmouseover = function (){
			clearInterval(timer);
		}
		oBox.onmouseout = function (){
			clearInterval(timer);
			timer = setInterval(autoFn, 2000);
		}

		//重置li
		function resetLi(){
			for (var i = 0; i < aLi2.length; i++) {
				aLi2[i].className = '';
				aLi[i].style.zIndex = -1;
			};
			aLi2[iNow].className = 'active';
			aLi[iNow].style.zIndex = 10;
			nowImgSrc = aLi[iNow].querySelector('img').src;
		}

		//创建 span
		function createSpan(){
			var y = 3, x = 6;
			var w = oBox.offsetWidth/x, h = oBox.offsetHeight/y;
			for (var i = 0; i < x; i++) {
				for (var j = 0; j < y; j++) {
					var oSpan = document.createElement('span');
					oSpan.style.position = 'absolute';
					oSpan.style.width = w + 'px';
					oSpan.style.height = h + 'px';
					oSpan.style.top = j*h + 'px';
					oSpan.style.left = i*w + 'px';
					oSpan.style.backgroundPosition = -i*w + 'px ' + -j*h + 'px';
					oEffect.appendChild(oSpan);
				};
			};
		}

		//span 效果
		function spanEffect(){
			var aSpan = oEffect.children;
			for (var i = 0; i < aSpan.length; i++) {
				var spanX = aSpan[i].offsetWidth/2 + aSpan[i].offsetLeft;
				var spanY = aSpan[i].offsetHeight/2 + aSpan[i].offsetTop;
				var boxX = oBox.offsetWidth/2;
				var boxY = oBox.offsetHeight/2;
				aSpan[i].style.zIndex = 100;
				
				getComputedStyle(aSpan[i],null)['zIndex'];
				aSpan[i].style.transition='.6s all ease';
				aSpan[i].style.backgroundImage = 'url(' + lastImgSrc + ')';


				
				aSpan[i].style.transform = 'perspective(800px) rotateX(' + rnd(0,180) + 'deg) rotateY(' + rnd(0,180) + 'deg) translateX(' + (spanX - boxX) + 'px) ' + 'translateY(' + (spanY - boxY) + 'px) translateZ(100px)';
				aSpan[i].style.opacity = 0;
				aSpan[i].addEventListener('transitionend', spanEnd, false);
			};

			//span 动画结束事件
			function spanEnd(){
				this.removeEventListener('transitionend', spanEnd, false);
				lastImgSrc = nowImgSrc;
				this.style.backgroundImage = 'url(' + lastImgSrc + ')';
				this.style.transition = 'none';
				this.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px) translateZ(0px)';
				this.style.opacity = 1;
				this.style.zIndex = -1;
				Ready = false;
			}
		}

		//上方进度条
		function otherFn(callback){
			oOther.className = 'boxOther active';
			oOther.addEventListener('transitionend', otherEnd, false);

			//进度条结束事件
			function otherEnd(){
				this.removeEventListener('transitionend', otherEnd, false);
				this.className = 'boxOther';
				
				callback && callback();
			}
		}
	}

	//随机数
	function rnd(m,n){
		return parseInt(Math.random()*(n-m+1),10) + m;
	}

	function startMove(obj, json, options) {
		options = options || {};
		options.time = options.time || 700;
		options.type = options.type || "ease-out";

		clearInterval(obj.timer);
		var start = {};
		var dis = {};

		for (var name in json) {
			if (name == "opacity") {
				start[name] = Math.round(parseFloat(getStyle(obj, name)) * 100)
			} else {
				start[name] = parseInt(getStyle(obj, name))
			}
			dis[name] = json[name] - start[name];
		}

		var n = 0;
		var count = Math.floor(options.time / 30);
		obj.timer = setInterval(function() {
			n++;
			for (var name in json) {
				switch (options.type) {
				case "linear":
					var v = n / count;
					var cur = start[name] + dis[name] * v;
					break;
				case "ease-in":
					var v = n / count;
					var cur = start[name] + dis[name] * v * v * v;
					break;
				case "ease-out":
					var v = 1 - n / count;
					var cur = start[name] + dis[name] * (1 - v * v * v);
					break;
				}
				if (name == "opacity") {
					obj.style.opacity = cur / 100;
					obj.style.filter = "alpha(opacity:" + cur + ")";
				} else {
					obj.style[name] = cur + "px";
				}
			}
			if (n == count) {
				clearInterval(obj.timer);
				options.end && options.end()
			}
		},30)
	}

	function getStyle(obj, attr){
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
	}
})();