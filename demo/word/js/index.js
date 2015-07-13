/*
* by zhe-he
* e-mail: luanhong_feiguo@sina.com
* updata time: 2015-7-13
* version: 1.0
*/

'use strict';
myWeb.fn.ready(function (){
	function TypingGame(){
		var _this = this;
		this.main = myWeb.fn.getById('main');
		this.box = myWeb.fn.getByClassName(this.main,'box')[0];
		//开始游戏
		this.startBtn = myWeb.fn.getByClassName(this.main,'start')[0];
		//游戏结束
		this.endBtn = myWeb.fn.getByClassName(this.main,'end')[0];
		//玩家姓名
		this.usename = myWeb.fn.getByClassName(this.main,'usename')[0];
		//关卡数
		this.gates = myWeb.fn.getByClassName(this.main,'gates')[0];
		//分数
		this.score = myWeb.fn.getByClassName(this.main,'score')[0];
		//错过
		this.miss = myWeb.fn.getByClassName(this.main,'miss')[0];
		//过关
		this.pass = myWeb.fn.getByClassName(this.main,'pass')[0];
		
		//可以出现的字母
		this.letter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

		this.startBtn.onclick = function (){
			this.parentNode.removeChild(_this.endBtn);
			this.parentNode.removeChild(this);
			
			_this.usenameVal = prompt('请输入姓名') || '';
			if (_this.usenameVal.trim()==='') {
				_this.usenameVal = '猴子派来的逗比';
			};
			_this.init();
		}
		_this.endBtn.onclick = function (){
			this.parentNode.appendChild(_this.startBtn);
			//this.parentNode.removeChild(this);
			
		};
	};
	TypingGame.prototype = {
		constructor: 	TypingGame,
		//keyCode对应的字母的方法
		getKeyCode: function (){
			delete this.getKeyCode; 	//仅运行一次
			var len = this.letter.length;
			var center = len/2;
			var i,name1,name2;
			for (i = 0; i < center; i++) {
				//小写字母
				name1 = 65 + i + '';
				//大写字母
				name2 = 65 + i + 'C';
				this.keyCode[name1] = this.letter.charAt(i);
				this.keyCode[name2] = this.letter.charAt(i+center);
			};
		},
		//随机字母
		rndLetter: 	function (){
			return this.letter.charAt(parseInt(Math.random()*this.letter.length,10));	
		},
		//随机距离
		rndDistance: function (){
			return parseInt(Math.random()*(this.box.offsetWidth-20),10);
		},
		//创建开始标志
		createStart: 	function (callback){
			
			if (this.ready) {
				myWeb.fn.removeClass(this.ready, 'active');
			}else{
				this.ready = document.createElement('span');
				this.ready.style.left = '0';
				//this.ready.innerHTML = 'startSign';
				this.ready.style.transition = 'transform ' + this.letterTime + 's linear 0s';
				myWeb.fn.on(this.ready,'transitionend',function (){
					callback && callback();
				});
			};
			
			return this.box.appendChild(this.ready);
		},
		//新建字母
		createSpan: 	function (){
			var letter = this.rndLetter();
			var _this = this;
			if (this.allSpan.length === this.letter.length) {
				return false;
			};
			//存在已有字母,重新选择
			if (this.allSpan[letter]) {
				letter = this.rndLetter();
			};
			
			this.allSpan[letter] = document.createElement('span');
			this.allSpan[letter].innerHTML = letter;
			this.allSpan[letter].style.left = this.rndDistance() + 'px';
			this.allSpan[letter].style.transition = 'transform ' + this.letterTime + 's linear ' + this.allSpan.length*this.interval + 's';
			this.allSpan.length++;

			//到底部移除字母
			myWeb.fn.on(this.allSpan[letter],'transitionend', function (){
				var num = parseInt(_this.miss.innerHTML,10) + 1;

				this.parentNode.removeChild(this);
				_this.allSpan[letter] = null;
				delete _this.allSpan[letter];
				_this.miss.innerHTML = num
				_this.allSpan.length--;

				if (num >= 10) {
					_this.box.appendChild(_this.endBtn);
					_this.gameOver();
				};

			});

			return this.box.appendChild(this.allSpan[letter]);
		},

		//移除字母
		removeSpan: 	function (letter){
			if (this.allSpan[letter]) {
				var num = parseInt(this.score.innerHTML,10) + this.addCount;
				
				this.allSpan[letter].parentNode.removeChild(this.allSpan[letter]);
				this.allSpan[letter] = null;
				delete this.allSpan[letter];

				this.allSpan.length--;
				this.score.innerHTML = num;
				if (num >= this.Pass) {
					this.gameOver();
					alert('恭喜过关！');
					this.userInit();
				};
				
			};
			
		},
		//字母检测
		checkLetter: 	function (ev){
			var ev = ev || window.event;
			var code = ev.keyCode;
			var letter;

			if (code >= 65 && code <= 90) {
				if (ev.shiftKey) {
					//大写
					letter = this.keyCode[code+'C'];
				}else{
					//小写
					letter = this.keyCode[code+''];
				};
				this.removeSpan(letter);
			};
			
		},
		//游戏开始
		gameStart: 		function (){
			var _this = this;
			var len = this.letterTime/this.interval;

			var startSign = this.createStart(function (){
				_this.gameStart();
			});

			getComputedStyle(startSign,null)['top'];
			myWeb.fn.addClass(startSign,'active');
			//startSign.classList.toggle('active');

			for (var i = 0; i < len; i++) {
				var oSpan = this.createSpan();
				if(oSpan){
					getComputedStyle(oSpan,null)['top'];
					myWeb.fn.addClass(oSpan,'active');
				};
			};
			
		},
		//清空屏幕
		gameOver: 	function (){
			this.ready.parentNode && this.ready.parentNode.removeChild(this.ready);
			this.ready = null;

			//循环删除防止内存泄露
			var name;
			for(name in this.allSpan){
				this.allSpan[name].parentNode && this.allSpan[name].parentNode.removeChild(this.allSpan[name]);
				this.allSpan[name] = null;
				delete this.allSpan[name];
			}

			this.allSpan = {};
			this.allSpan.length = 0;

		},
		//关卡初始化
		userInit: 		function (){
			this.usename.innerHTML = this.usenameVal;
			this.gates.innerHTML = ++this.Gates;
			this.score.innerHTML = '0';
			this.miss.innerHTML = '0';
			this.pass.innerHTML = this.Pass*=2;


			this.letterTime-=(this.letterTime/3);
			this.interval-=(this.interval/4);
			this.addCount*=2;

			this.gameStart();
		},
		//初始化
		init:　	function (){
			var _this = this;
			this.ready = null;
			//字母下落到底部的时间s
			this.letterTime = 15;
			//字母间隔的时间s
			this.interval = 1.5;
			//keyCode对应的字母
			this.keyCode = {};

			//关卡设置
			//创建的字母集合
			this.allSpan = {};
			this.allSpan.length = 0;
			this.Gates = 0;
			this.Pass = 50;
			this.addCount = 5;

			this.getKeyCode();
			this.userInit();
			myWeb.fn.on(document,'keydown',function (ev){
				_this.checkLetter(ev);
			});
		}
	};

	window.a = new TypingGame();
});