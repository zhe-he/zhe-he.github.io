/* 打地鼠 mole.js
 * by : zhe-he
 * e-mail: luanhong_feiguo@sina.com
 * veision: 1.1
 */


(function (){

	function Mole(id){
		if (!id) {
			throw Error('请输入canvans的id');
		};
		this.canvas = document.getElementById(id);
		this.ctx = this.canvas.getContext('2d');

		this.shuping = 'onorientationchange' in window ? 'orientationchange' : 'resize';
		this.resizeTimer = null;
		this.loadNum = 0; 		// 加载图片数
		this.img = ["images/bg_canvas.png","images/hammer.png","images/help.png","images/mouse.png"];
		this.mouse = {}; 		// 地鼠对象
		
		this._click = 'ontouchstart' in window ? 'touchstart' : 'click';
		this.countTimer = null; // 倒计时对象
		this.baseTimer = null; 	// 刷新时间对象
		this.scale = 1; 		// 缩放倍数
		this.scalebase = { 		// 缩放位移
			x: 		0,
			y: 		0
		};
		this.mousehole = [{
			l: 195,
			t: 266,
			r: false
		},{
			l: 385,
			t: 266,
			r: false
		},{
			l: 584,
			t: 270,
			r: false
		},{
			l: 168,
			t: 363,
			r: false
		},{
			l: 385,
			t: 363,
			r: false
		},{
			l: 585,
			t: 363,
			r: false
		},{
			l: 161,
			t: 462,
			r: false
		},{
			l: 388,
			t: 462,
			r: false
		},{
			l: 606,
			t: 462,
			r: false
		}]; 	//鼠洞
		this._init();
	}

	Mole.prototype = {
		constructor:　	Mole,
		init: 				function(){
			var _this = this;
			this.setClientRect();
			this.loadImg();
			// this.canvas.style.cursor = 'url("' + this.img[1] + '"),auto'; 	// 锥子定位不行
		},
		_init: 				function (key){
			
			this.ready = false; 	// 准备阶段
			this.pass = key || 1; 			// 关卡
			this.needScore = 1500 + 500*this.pass; 	//过关分数
			this.score = 0; 		// 分数
			this.count = 30; 		// 倒计时
			this.scoreScale = 1; 	// 得分倍数
			this.timeSpan = 10; 		// 时间间隔
			this.timeControl = 1; 		// 控制器
			this.diff = 0.04 + 0.01*this.pass; 		// 难度系数
			this.allMouse = []; 	// 已出现的mouse对象
			this.hammerArr = []; 	// 锤子集合

			for (var i = 0; i < this.mousehole.length; i++) {
				this.mousehole[i].r = false;
			};
		},
		setClientRect: 		function (){
			var w = document.documentElement.clientWidth || document.body.clientWidth;
			var h = document.documentElement.clientHeight || document.body.clientHeight;
			this.canvas.width = w;
			this.canvas.height = h;
		},
		resize: 			function (){
			var _this = this;
			this.resizeTimer = setTimeout(function (){
				_this.setClientRect();
				cancelAnimationFrame(_this.baseTimer);
				clearInterval(_this.countTimer);
				_this.clearMap();
				_this.drawBg();
				_this.drawHelp();
				_this._init();
			},300);
		},
		loadImg: 			function (){
			var _this = this;
			
			_this.loading();
			(function next(i){
				if (i<_this.img.length) {
					var newImg = new Image();
					newImg.onload = newImg.onerror = function (){
						this.onload = this.onerror = null;
						_this.loading();
					}
					newImg.src = _this.img[i];
					next(i+1);
				}
			})(0);
		},
		loading: 			function (){
			var text = '加载中 ' + Math.floor(this.loadNum++/this.img.length*100) + '%';
			this.clearMap();
			this.ctx.font="50px Microsoft Yahei 微软雅黑";
			this.ctx.fillText(text,this.canvas.width/2-100,this.canvas.height/2);
			if (this.loadNum === this.img.length+1) {
				this.clearMap();
				this.draw();
			};
		},
		clearMap: 			function (){
			this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		},
		fnScale: 			function (imgObject){
			var w = imgObject.width;
			var h = imgObject.height;
			if(w>this.canvas.width){
				this.scale = this.canvas.width/w;
				
				h = this.canvas.width/w*h;
				w = this.canvas.width;
			}
			if (h>this.canvas.height) {
				this.scale = this.canvas.height/h;

				w = this.canvas.height/h*w;
				h = this.canvas.height;
			}
			this.scalebase = {
				x: 	this.canvas.width/2-w/2,
				y: 	this.canvas.height/2-h/2
			}
			this.ctx.drawImage(imgObject,this.canvas.width/2-w/2,this.canvas.height/2-h/2,w,h);
		},
		drawBg: 			function (){
			if (!this.bg) {
				this.bg = new Image();
				this.bg.src = this.img[0];
			};
			this.fnScale(this.bg);
		},
		drawHelp: 			function (){
			if (!this.help) {
				this.help = new Image();
				this.help.src = this.img[2];
			};
			var w = this.help.width*this.scale;
			var h = this.help.height*this.scale;
			this.ctx.drawImage(this.help,this.canvas.width/2-w/2,this.canvas.height/2-h/2,w,h);
		},
		drawHammer: 		function (x,y,scale){
			if (!this.hammer) {
				this.hammer = new Image();
				this.hammer.src = this.img[1];
			};
			var w = this.hammer.width*this.scale;
			var h = this.hammer.height*this.scale;

			
			var a = (-30+scale*90)*Math.PI/180;
			this.ctx.save();
			this.ctx.translate(x+w*79/98,y+h*66/77);
			this.ctx.rotate(a); // -30~60
			
			this.ctx.translate(-x-w*79/98,-y-h*66/77);

			this.ctx.drawImage(this.hammer,x-w*19/98,y-h*11/77,w,h);
			
			this.ctx.restore();
		},
		drawMouse: 			function (type,status,x,y,index){
			if (!this.mouse[type]) {
				this.mouse[type] = new Image();
				this.mouse[type].src = this.img[3];
			};
			var bounds = this.mouseFormImg(type,status);

			this.ctx.drawImage(this.mouse[type],bounds.x,bounds.y,bounds.w,bounds.h,x-bounds.w/2,y-bounds.h,bounds.w,bounds.h);
			this.updataHole(index,x,y-bounds.h/2,Math.max(bounds.w,bounds.h)/2);
		},
		updataHole: 		function (index,x,y,r){
			this.mousehole[index].x = x;
			this.mousehole[index].y = y;
			this.mousehole[index].R = r;
		},
		clearHole: 			function (index){
			delete this.mousehole[index].x;
			delete this.mousehole[index].y;
			delete this.mousehole[index].R;
		},
		mouseFormImg:  		function (type,status){
			var x = 0, y = 0, w = 130, h = 0;
			var _this = this;
			x = 17 + status*w;
			switch(type){
				case "crazeMouse":
				case 1:
					h = 101;
					y = 128;
					break;
				case "kingMouse":
				case 2:
					h = 102;
					y = 240;
					break;
				case "cat":
				case 3:
					h = 118;
					y = 349;
					break;
				case "fairy":
				case 0:
					h = 104;
					y = 12;
					break;
				case "rabbit":
				case 4:
					y = 471;
					h = 120;
					break;
			}
			return {x:x,y:y,w:w*_this.scale,h:h*_this.scale};
		},
		draw: 				function (){
			var _this = this;
			this.drawBg();
			this.drawHelp();
			
			this.canvas.addEventListener(this._click,function (ev){
				_this.start(ev);
			},false);
			window.addEventListener(_this.shuping, function (){
				_this.resize();
			}, false);
		},
		drawCount: 			function (){
			var pass = '第 ' + this.pass + ' 关';
			var count = '时间：'+this.count;
			var score = '分数：'+this.score;
			var scoreScale = '得分倍数 X'+this.scoreScale;
			this.ctx.font="28px Microsoft Yahei 微软雅黑";
			this.ctx.fillStyle = "#9aee40";
			this.ctx.fillText(count,this.scalebase.x+this.bg.width*this.scale-150,this.scalebase.y+100);
			this.ctx.fillText(score,this.scalebase.x+20,this.scalebase.y+100);
			this.ctx.fillStyle = "red";
			this.ctx.fillText(scoreScale,this.scalebase.x+20,this.scalebase.y+60);
			this.ctx.fillText(pass,this.scalebase.x+this.bg.width*this.scale-150,this.scalebase.y+60);
		},
		start: 				function (ev){
			var _this = this;
			if (!this.ready) {
				this.ready = true;
				this.clearMap();
				this.drawBg();
				this.drawCount();
				cancelAnimationFrame(_this.baseTimer);
				this.baseTimer = requestAnimationFrame(function (){
					_this.base();
				});

				clearInterval(_this.countTimer);
				this.countTimer = setInterval(function (){
					_this.count--;

					if (_this.count > 27) {
						_this.timeControl = 1;
					}else if(_this.count > 25){
						_this.timeControl = 2;
					}else if(_this.count > 5){
						_this.timeControl = 5;
					}else if(_this.count > 3){
						_this.timeControl = 2;
					}else{
						_this.timeControl = 1;
					};

					if (_this.count === 0) {
						clearInterval(_this.countTimer);
						_this.gameOver();
					};
				},1000);
			}else{
				var pageX = ev.pageX;
				var pageY = ev.pageY;
				if (this._click === 'touchstart') {
					pageX = ev.targetTouches[0].pageX;
					pageY = ev.targetTouches[0].pageY;
				};
				var index = this.isKnock(ev.pageX,ev.pageY);
				
				if (index != -1) {
					var i = this.findMouse(index);
					if (i != -1) {
						this.allMouse[i].status = 50;
						this.allMouse[i].die = true;
						this.addScore(this.allMouse[i].type);
					};
				};
				this.hammerArr.push({t:20,time:20,x:pageX,y:pageY});				
			};
		},
		findMouse: 			function (index){
			for (var i = 0; i < this.allMouse.length; i++) {
				if(this.allMouse[i].index == index && !this.allMouse[i].die){
					return i;
				}
			};
			return -1;
		},
		isKnock: 			function (x,y){
			for (var i = 0; i < this.mousehole.length; i++) {
				if(this.mousehole[i].x && this.findXY(x,y,this.mousehole[i].x,this.mousehole[i].y,this.mousehole[i].R)){
					return i;
				}
			};
			return -1;
		},
		findXY: 			function (x,y,X,Y,R){
			if (Math.abs(x-X)<R && Math.abs(y-Y)<R) {
				return true;
			};
			return false;
		},
		addScore: 			function (type){
			switch(type){
				case "crazeMouse":
				case 1:
					this.score += 100*this.scoreScale;
					break;
				case "kingMouse":
				case 2:
					this.score += 500*this.scoreScale;
					break;
				case "cat":
				case 3:
					this.score -= 100*this.scoreScale;
					break;
				case "fairy":
				case 0:
					this.scoreScale*=1.2;
					break;
				case "rabbit":
				case 4:
					this.scoreScale/=2;
					break;
			}
			this.score = Math.round(this.score);
			this.scoreScale = Math.max(Math.floor(this.scoreScale*10)/10,0.1);

			// 下一关
			if (this.score >= this.needScore) {
				this.gameMap();
				this.ctx.fillText('恭喜过关，点击任意位置进入下一关！',this.canvas.width/2-200,this.canvas.height/2);
				this._init(this.pass+1);
			};
		},
		canCreateMouse: 	function (){
			for (var i = 0; i < this.mousehole.length; i++) {
				if(!this.mousehole[i].r){
					return true;
				}
			};
			return false;
		},
		createMouse: 		function (){
			while(true){
				var index = this.mousehole.length*Math.random()|0;
				if (!this.mousehole[index].r) {
					this.mousehole[index].r = true;
					break;
				};
			}
			return index;
		},
		mouseOut: 			function (){
			if (this.canCreateMouse()) {
				var index = this.createMouse();
				var _this = this;
				this.allMouse.push({
					index: 		index,
					status: 	Math.max(200-(this.diff-0.05)*2000,50), 	// 50~200
					type: 		_this.radType()
				});
				
				this.drawAllMouse();
			}
		},
		radType:　			function (){
			var rnd = Math.random();
			if(rnd < 0.4){
				return "crazeMouse"; //1
			}else if(rnd < 0.8){
				return "cat"; //3
			}else if(rnd < 0.9){
				return "kingMouse"; //2
			}else if(rnd < 0.95){
				return "rabbit"; //4
			}else{
				return "fairy"; //0
			}
		},
		drawAllMouse: 		function (){
			for (var i = 0; i < this.allMouse.length; i++) {
				var type = this.allMouse[i].type;
				var status = --this.allMouse[i].status;
				var index = this.allMouse[i].index;
				var die = this.allMouse[i].die;

				if (die) {
					var s = 3;
				}else{
					var s = parseInt(status/10)%3;
				};

				if (status === 0) {
					this.mousehole[index].r = false;
					this.allMouse.splice(i,1);
					i--;

					this.clearHole(index);
					continue;
				};
				
				
				var x = this.scalebase.x+this.mousehole[index].l*this.scale;
				var y = this.scalebase.y+this.mousehole[index].t*this.scale;
				this.drawMouse(type,s,x,y,index);
			};
		},
		drawAllHammer: 		function (){
			for (var i = 0; i < this.hammerArr.length; i++) {
				var x = this.hammerArr[i].x;
				var y = this.hammerArr[i].y;
				var t = --this.hammerArr[i].time;
				var T = this.hammerArr[i].t;

				if (t<=0) {
					this.hammerArr.splice(i,1);
					i--;
					continue;
				};
				this.drawHammer(x,y,t/T);
			};
		},
		base:　				function (){
			var _this = this;
			this.clearMap();
			this.drawBg();
			this.drawCount();

			this.drawAllMouse();
			this.drawAllHammer();
			this.timeSpan-=this.diff;
			if (this.timeSpan<=0) {
				this.timeSpan = 10/this.timeControl;
				this.mouseOut();
			};

			this.baseTimer = requestAnimationFrame(function (){
				_this.base();
			});
		},
		gameMap: 			function (){
			var _this = this;
			cancelAnimationFrame(_this.baseTimer);
			clearInterval(_this.countTimer);
			this.clearMap();
			this.drawBg();
			this.drawCount();
		},
		gameOver: 			function (){
			this.gameMap();
			this.ctx.fillText('GameOver! 您的得分是：'+this.score+'。',this.canvas.width/2-185,this.canvas.height/2);
			this.ctx.fillText('真遗憾! 还差 '+(this.needScore-this.score)+'分，你就可以到达下一关了。',this.canvas.width/2-300,this.canvas.height/2+50);
			
			this._init();
		}
	}

	window.Mole = Mole;
})();


/*兼容 requestAnimation */
window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame 
|| window.oRequestAnimationFrame || window.msRequestAnimationFrame || 
function(callback) { 
	return window.setTimeout(function() { 
		return callback(+new Date()); 
	}, 1000 / 60);
});
window.cancelAnimationFrame || (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || 
function(timeid) {
	return clearTimeout(timeid); 
});