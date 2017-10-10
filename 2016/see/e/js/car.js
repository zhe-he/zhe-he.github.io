


function Game(id){
	if (!id) {throw Error('请输入canvans的id');}
	this._init();
}

Game.prototype = {
	constructor: Game,
	version: "1.0.5",
	_init: function (){
		this._init = null;

		this.box = document.getElementById('myGame');
		this.ctx = this.box.getContext('2d');
		this.touch = {startX: 0} // 移动指令集合
		
		this.MAP = {l: 71,w: 166,r: 569}; // 赛道
		this.iFont = 0; 

		this.setView();
		this.setImgObj();

		

		this.isEnd = false;
		this.gameTimer = null; 	// 游戏进程
		this.curTimeTimer = null; 	// 游戏进行的时间
		this.iCurTime = 0; 	// 游戏进行的时间
		this.stepVelocity= 140; // 游戏速度
		this.obMin = 9;
		this.obVelocity = 9; 	// 障碍物速度
		this.step = this.stepVelocity; // 游戏渲染帧
		// 每出现7个障碍物 出现地标
		this.iSign = {
			max: 6,
			cur: 6,
			now: 0,
			arr: []
		};

		this.roadStep = 0; 	// 路中间的文字

		this.preLoad();
	},
	setImgObj: function (){
		// 头部
		this.topImg = {};
		this.topImg.status = {car:3};
		this.topImg.aSrc = [
			{src:"images/top/guang_mini.png",name: "guang",x:350,y:10},
			{src:"images/top/guang_mini2.png",name:"guang2",x:350,y:10},
			{src:"images/top/mycar.png",name:"mycar",x:[416,467,517],y:0},
			{src:"images/top/shidai_mini.png",name:"shidai",x:196,y:10},
			{src:"images/top/shidai_mini2.png",name:"shidai2",x:196,y:10},
			{src:"images/top/top.png",name:"top",x:0,y:0},
			{src:"images/top/weixing_mini.png",name:"weixing",x:101,y:10},
			{src:"images/top/weixing_mini2.png",name:"weixing2",x:101,y:10},
			{src:"images/top/zhi_mini.png",name:"zhi",x:296,y:10},
			{src:"images/top/zhi_mini2.png",name:"zhi2",x:296,y:10}
		];
		// 道路
		this.bg = {src:"images/road.jpg",img:null,last:0};
		// 自己
		this.me = {x: this.MAP.l+1.5*this.MAP.w,y: 0,src:"images/me.png",img:null,t:0,b:10};
		// 路标
		this.signImg = {};
		this.signImg.aSrc = [
			{src:"images/sign/sign1.png",name:"sign1"},
			{src:"images/sign/sign2.png",name:"sign2"},
			{src:"images/sign/sign3.png",name:"sign3"},
			{src:"images/sign/sign4.png",name:"sign4"},
			{src:"images/sign/sign5.png",name:"sign5"},
			{src:"images/sign/sign6.png",name:"sign6"}
		];

		// 障碍物集合
		this.obstacle = []; 
		this.aObType = [
			{"t":"box1","k": -1},
			{"t":"box2","k":-1},
			{"t":"langan","k":-1},
			{"t":"stop1","k":-1},
			{"t":"stop2","k":-1},
			{"t":"car2","k":-1},
			{"t":"weixing","k":10},
			{"t":"shidai","k":20},
			{"t":"zhi","k":30},
			{"t":"guang","k":40}
		]; 
		this.roadImg = {};
		this.roadImg.aSrc = [
			{src:"images/road/box1.png",name:"box1"},
			{src:"images/road/box2.png",name:"box2"},
			{src:"images/road/langan.png",name:"langan"},
			{src:"images/road/stop1.png",name:"stop1"},
			{src:"images/road/stop2.png",name:"stop2"},
			{src:"images/road/car2.png",name:"car2"},
			{src:"images/road/weixing.png",name:"weixing"},
			{src:"images/road/shidai.png",name:"shidai"},
			{src:"images/road/guang.png",name:"guang"},
			{src:"images/road/zhi.png",name:"zhi"}
		];
	},
	preLoad: function (cb){
		var _this = this;
		this.loadStep = 0;
		this.loadImg(this.bg.src,function(img){
			_this.loadStep++;
			_this.bg.img = img;
		});
		this.loadImg(this.me.src,function(img){
			_this.loadStep++;
			_this.me.img = img;
		});
		
		for (var i = 0; i < this.topImg.aSrc.length; i++) {
			(function (i){

				_this.loadImg(_this.topImg.aSrc[i].src,function (img){
					_this.loadStep++;
					_this.topImg[_this.topImg.aSrc[i].name] = img;
				});
			})(i);
		}
		for (var i = 0; i < this.signImg.aSrc.length; i++) {
			(function (i){
				_this.loadImg(_this.signImg.aSrc[i].src,function (img){
					_this.loadStep++;
					_this.signImg[_this.signImg.aSrc[i].name] = img;
				});
			})(i);
		}
		for (var i = 0; i < this.roadImg.aSrc.length; i++) {
			(function (i){
				_this.loadImg(_this.roadImg.aSrc[i].src,function (img){
					_this.loadStep++;
					_this.roadImg[_this.roadImg.aSrc[i].name] = img;
				});
			})(i);
		}

		var max = this.topImg.aSrc.length+1+1+this.signImg.aSrc.length+this.roadImg.aSrc.length;

		var timer = setInterval(function (){
			if (_this.loadStep === max) {
				clearInterval(timer);
				requestAnimationFrame(removeAd);
				_this.init();
			}
		},30);

	},
	loadImg: function(src,success,error){
		var img = new Image();
		img.onload = function (){
			this.onload = this.onerror = null;
			success && success(img);
		}
		img.onerror = function (){
			this.onload = this.onerror = null;
			error && error();
		}
		img.src = src;
	},
	setView: function (){
		var W = Math.min(window.innerWidth,640);
		var H = window.innerHeight;
		var w = 640;
		var h = w/W*H|0;
		this.box.width = w;
		this.box.height = h;
		this.box.style.width = W + 'px';
		this.box.style.height = H + 'px';
	},
	clearMap: function (){
		this.ctx.clearRect(0,0,this.box.width,this.box.height);
	},
	// 随机
	rnd: function (s,e){
		if (e==undefined) {e=s,s=0}
		return (Math.random()*(e-s+1) + s)|0;
	},
	// 创建障碍物
	// x 为中心点 y为上点，类似小车
	createOb: function (){
		var ob;
		var mt = Math.random();
		if (mt<0.8) {
			ob = this.clone(this.aObType[this.rnd(5)]);
		}else if(mt<0.98){
			ob = this.clone(this.aObType[this.rnd(this.aObType.length-2)]);
		}else{
			ob = this.clone(this.aObType[this.rnd(this.aObType.length-1)]);
		}
		

		ob.img = this.roadImg[ob.t];
		ob.w = ob.img.width;
		ob.h = ob.img.height;

		var min = this.MAP.l+ob.w/2;
		var max = this.MAP.r-ob.w/2;

		ob.x = this.rnd(min,max);
		ob.y = -ob.h;
		
		this.obstacle.push(ob);
	},
	clone: function (obj){
		return JSON.parse(JSON.stringify(obj));
	},
	drawMe: function (){
		var w = this.me.w = this.me.img.width;
		var h = this.me.h = this.me.img.height;

		this.me.y = this.box.height - h - 35;
		
		if (this.me.t) {
			this.me.t--;
			if(this.me.b--==0){
				this.me.b = 20;
			}
			if (this.me.b<10) {
				this.ctx.drawImage(this.me.img,this.me.x-w/2,this.me.y);
			}
		}else{
			this.ctx.drawImage(this.me.img,this.me.x-w/2,this.me.y);
		}
		
	},
	drawOb: function (){

		for (var i = 0; i < this.obstacle.length; i++) {
			if(this.obstacle[i].t=='car2'){
				this.obstacle[i].y += this.obVelocity/2;
			}else{
				this.obstacle[i].y += this.obVelocity;
			}

			

			this.ctx.drawImage(this.obstacle[i].img,this.obstacle[i].x-this.obstacle[i].w/2,this.obstacle[i].y);
			
			if(this.obstacle[i].y>=this.box.height){
				this.obstacle.splice(i,1);
				i--;
				continue;
			}
			var isCollision = this.isCollision(this.obstacle[i],this.me);

			if (isCollision) {
				this.addScore(this.obstacle[i].k);
				this.obstacle.splice(i,1);
				
			}
		}
	},
	addScore: function (type){
		switch(type){
			case 10:
				hasMusic && gameMusic.play();
				this.obMin += 2;
				this.topImg.status.isWX = true;
				break;
			case 20:
				hasMusic && gameMusic.play();
				this.obMin += 2;
				this.topImg.status.isSD = true;
				break;
			case 30:
				hasMusic && gameMusic.play();
				this.obMin += 2;
				this.topImg.status.isZHI = true;
				break;
			case 40:
				hasMusic && gameMusic.play();
				this.obMin += 2;
				this.topImg.status.isG = true;
				break;
			default:
				hasMusic && gameMusic2.play();
				if (this.me.t) {return ;}
				this.topImg.status.car--;
				if (this.topImg.status.car<=0) {
					this.end();
				}else{
					// 无敌
					this.me.t = 150;
					this.me.b = 10;
				}
				break;
		}
	},
	end: function (){
		this.createSign(true);
		this.isEnd = true;
		// cancelAnimationFrame(this.gameTimer);
		clearInterval(this.curTimeTimer);

		this.iFont = !!this.topImg.status.isWX+!!this.topImg.status.isSD+!!this.topImg.status.isZHI+!!this.topImg.status.isG;
		showContinue();

	},
	createSign: function (isend){
		if(isend){
			var sign = {img:this.signImg['sign'+ (this.iSign.now+1)]};
			sign.x = 23;
			sign.y = this.box.height - sign.img.height - 250;
		}else{
			var sign = {img:this.signImg['sign'+ (++this.iSign.now)]};
			sign.x = Math.random()<0.5?23:441;
			sign.y = -sign.img.height;
		}
		

		this.iSign.arr.push(sign);
		if (this.iSign.now >= this.signImg.aSrc.length) {
			this.iSign.now = 0;

		}
	},
	drawSign: function (){
		var aSign = this.iSign.arr;
		for (var i = 0; i < aSign.length; i++) {
			aSign[i].y += this.obVelocity;
			this.ctx.drawImage(aSign[i].img,aSign[i].x,aSign[i].y);
			if(aSign[i].y>=this.box.height){
				this.iSign.arr.splice(i,1);
				i--;
				continue;
			}

		}
	},

	isCollision: function (obj1,obj2){
		var x1 = obj1.x;
		var y1 = obj1.y;
		var w1 = obj1.w;
		var h1 = obj1.h;

		var x2 = obj2.x;
		var y2 = obj2.y;
		var w2 = obj2.w;
		var h2 = obj2.h;

		var dis = 5; // 肉眼偏移量,看着要死就是没死的样子,玩的就是心跳

		if (x1+w1>=x2+dis && x2+w2>=x1+dis && y1+h1>=y2+dis && y2+h2>=y1+dis) {
			return true;
		}else{
			return false;
		}
	},
	drawMap: function (){
		this.drawBg();
		this.drawRoad();
		this.drawOb();
		this.drawSign();
		this.drawTop();
	},
	drawBg: function (){
		// 防止道路露出
		this.ctx.drawImage(this.bg.img,0,this.bg.last+this.bg.img.height);
		this.ctx.drawImage(this.bg.img,0,this.bg.last);
		this.ctx.drawImage(this.bg.img,0,this.bg.last-this.bg.img.height);
		this.ctx.drawImage(this.bg.img,0,this.bg.last-this.bg.img.height*2);
		
		this.bg.last += this.obVelocity;
		if (this.bg.last >= this.bg.img.height) {
			// 防止抖动赋予差值
			this.bg.last = this.bg.last-this.bg.img.height;
		}
	},
	drawTop: function (){
		this.ctx.drawImage(this.topImg.top,0,0);
		if (this.topImg.status.isWX) {
			this.ctx.drawImage(this.topImg.weixing2,101,10);
		}else{
			this.ctx.drawImage(this.topImg.weixing,101,10);
		}
		if (this.topImg.status.isSD) {
			this.ctx.drawImage(this.topImg.shidai2,196,10);
		}else{
			this.ctx.drawImage(this.topImg.shidai,196,10);
		}
		if (this.topImg.status.isZHI) {
			this.ctx.drawImage(this.topImg.zhi2,296,10);
		}else{
			this.ctx.drawImage(this.topImg.zhi,296,10);
		}
		if (this.topImg.status.isG) {
			this.ctx.drawImage(this.topImg.guang2,350,10);
		}else{
			this.ctx.drawImage(this.topImg.guang,350,10);
		}
		this.drawCar(this.topImg.status.car);
	},
	drawRoad: function (){
		this.ctx.save();

		this.ctx.font = "70px/70px sans-serif";
		this.ctx.fillStyle = "#ffffff";
		var aFont = ["北","京","中","路"];
		var cw = 700;

		if(this.roadStep-cw*2 >= 0){
			this.roadStep -= cw*2;
		}
		this.roadStep += this.obVelocity;
		for (var i = 0; i < aFont.length; i++) {
			this.ctx.fillText(aFont[i],this.box.width/2-40,this.roadStep-cw*2+75*i);
			this.ctx.fillText(aFont[i],this.box.width/2-40,this.roadStep-cw+75*i);
			this.ctx.fillText(aFont[i],this.box.width/2-40,this.roadStep+75*i);
			this.ctx.fillText(aFont[i],this.box.width/2-40,this.roadStep+cw+75*i);
			this.ctx.fillText(aFont[i],this.box.width/2-40,this.roadStep+cw*2+75*i);
		}

		this.ctx.restore();
	},
	drawCar: function (num){
		if (num<=0) {return}
		var arr = [0,416,467,517];
		while(num){
			this.ctx.drawImage(this.topImg.mycar,arr[num--],0);
		}
	},
	fnStart: function (ev){
		ev.preventDefault();
		this.touch.startX = ev.targetTouches[0].pageX;
		
	},
	fnMove: function (ev){
		ev.preventDefault();
		var curX = ev.targetTouches[0].pageX;
		var disX = curX - this.touch.startX;
		
		var x = this.me.x+disX;
		if (x <= this.MAP.l+this.me.w/2) {
			x = this.MAP.l+this.me.w/2;
		}
		if (x >= this.MAP.r-this.me.w/2) {
			x = this.MAP.r-this.me.w/2;
		}
		this.me.x = x;
		this.touch.startX = curX;
		
	},
	moveMe: function (direction){
		this.me.s += direction;
		this.me.s = this.me.s <= -1 ? 0 : (this.me.s >= 3 ? 2 : this.me.s);
	},
	fnEnd: function (ev){
		ev.preventDefault();
		this.touch.startX = ev.changedTouches[0].pageX;
		
	},
	start: function (){
		this.clearMap();
		this.drawMap();
		this.drawMe();

		if (!this.isEnd) {
			this.gameTimer = requestAnimationFrame(this.start.bind(this));
		}

		if(!this.step--){
			this.step = this.stepVelocity;
			
			// 最多4个障碍物
			var some = this.rnd(Math.min(this.iCurTime/5,1),Math.min(this.iCurTime/5,3));
			for (var i = 0; i < some; i++) {
				setTimeout(function (){
					this.createOb();
				}.bind(this),i*300);
			}
			

			if(!this.iSign.cur--){
				this.iSign.cur = this.iSign.max;
				// 与障碍物错开
				setTimeout(function (){
					this.createSign();
				}.bind(this),300);
				
			}
		}

	},
	fnCurTime: function (){
		this.iCurTime++;
		this.obVelocity = this.obMin + (this.iCurTime/4)|0;
		this.stepVelocity = Math.max(140 - (this.iCurTime/10)*30,90);

	},
	
	init: function (){

		this.box.addEventListener('touchstart',this.fnStart.bind(this),false);
		this.box.addEventListener('touchmove',this.fnMove.bind(this),false);
		this.box.addEventListener('touchend',this.fnEnd.bind(this),false);
		
		this.createOb();
		this.gameTimer = requestAnimationFrame(this.start.bind(this));
		
		this.curTimeTimer = setInterval(this.fnCurTime.bind(this), 1000);
	}
};
	
window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame 
|| window.oRequestAnimationFrame || window.msRequestAnimationFrame || 
function(callback) { 
	return window.setTimeout(function() { 
		return callback(Date.now()); 
	}, 1000 / 60);
});

window.cancelAnimationFrame || (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || 
function(timeid) {
	return clearTimeout(timeid); 
});



// 预加载
function preLoading(cb){
	var preload = document.querySelector('#loading');
	var preCon = document.querySelector('#loading .preCon');
	var preNum = document.querySelector('#loading .preNum');
	var iNow = 0;
	var allImg = ["images/ad.jpg","images/guize.png","images/me.png","images/music.png","images/road/box1.png","images/road/box2.png","images/road/car2.png","images/road/guang.png","images/road/langan.png","images/road/shidai.png","images/road/stop1.png","images/road/stop2.png","images/road/weixing.png","images/road/zhi.png","images/road.jpg","images/share/regbag.png","images/share/tiaozhan.png","images/share/share_font.png","images/sign/sign1.png","images/sign/sign2.png","images/sign/sign3.png","images/sign/sign4.png","images/sign/sign5.png","images/sign/sign6.png","images/top/guang_mini.png","images/top/guang_mini2.png","images/top/mycar.png","images/top/shidai_mini.png","images/top/shidai_mini2.png","images/top/top.png","images/top/weixing_mini.png","images/top/weixing_mini2.png","images/top/zhi_mini.png","images/top/zhi_mini2.png"];

	for (var i = 0; i < allImg.length; i++) {
		var src = allImg[i];
		fnLoad(src, function (){
			var number = Math.floor(++iNow/allImg.length*100);
			preNum.innerHTML = number;
			preCon.style.width = number + '%';
			if (iNow == allImg.length) {
				preload.parentNode && preload.parentNode.removeChild(preload);
				cb && cb();
			}
		})
	};


	function fnLoad(src,callback){
		var img = new Image();
		img.onload = function (){
			this.onload = null;
			callback && callback();
		}
		img.onerror = function (){
			this.onerror = null;
			callback && callback();
		}
		img.src = src;
	}
}
// 音乐
var music = document.getElementById('music');
var musicBtn = document.getElementById('music-btn');
var hasMusic = true;

musicBtn.onclick = function (){
	if(/close/.test(this.className)){
		this.className = 'music';
		music.play();
		hasMusic = true;
	}else{
		this.className = 'music close';
		music.pause();
		hasMusic = false;
	}
}


var gameMusic = document.getElementById('gameMusic');
var gameMusic2 = document.getElementById('gameMusic2');
gameMusic.load();
gameMusic2.load();
// 微信音乐自动播放
document.addEventListener("WeixinJSBridgeReady", function () {  
    music.play();
    gameMusic.load();
	gameMusic2.load();
}, false);


var oGame = null;
var oAd = document.getElementById('ad');
var oGz = document.querySelector('.game-gz');
var aStart = oGz.querySelectorAll('.js-start');

var oMobile = document.querySelector('.mobile-prompt');

var oMask = document.querySelector('.share-mask');
var oShare = document.querySelector('.share');
var oReStart = document.querySelector('.share .restart');
var aShareFont = document.querySelectorAll('.js-sharefont');


function __start(){
	setTimeout(function (){
		oGz.className = 'game-gz active';
	},3000);
};
preLoading(function (){
	__start();
	music.play();
})


for (var i = 0; i < aStart.length; i++) {
	aStart[i].onclick = function(){
		this.onclick = null;
		oGame = new Game('myGame');
	}
}

function removeAd(){
	oAd.parentNode && oAd.parentNode.removeChild(oAd);
	oGz.parentNode && oGz.parentNode.removeChild(oGz);
}
function showContinue(){
	oMask.className = "share-mask";
	oShare.className = 'share';
	aShareFont[0].innerHTML = oGame.iFont;
	var aY = [0,2,2,5,58];
	aShareFont[1].innerHTML = aY[oGame.iFont];
	aShareFont[2].innerHTML = aY[oGame.iFont];
}

oReStart.onclick = function (){
	oMask.className = "share-mask hide";
	oShare.className = "share hide";

	oGame = new Game('myGame');
};


function shareSuccess(){
	if (!oGame.isEnd || oGame.iFont==0) {return }
	oMobile.className = 'mobile-prompt';
}


// 填写表单
fillInput();
function fillInput(){
	var oUsername = document.getElementById('username');
	var oYzm = document.getElementById('yzm');
	var oBtn = document.getElementById('mobile-btn');
	var osignYzm = document.getElementById('sign-yzm');

	var reTel = /^1[3456789]\d{9}$/;
	
	var yzmTimer = null;
	var iNow = 60;
	// 获取验证码
	osignYzm.onclick = function (){
		var tel = oUsername.value;
		if (!reTel.test(tel)) {
			alert('请填写正确的手机号');
			return ;
		}
		if(/off/.test(osignYzm.className)){return }
		osignYzm.className = 'sign-yzm off';
		_fnInterval();
		clearInterval(yzmTimer);
		yzmTimer = setInterval(_fnInterval,1000);
		function _fnInterval(){
			osignYzm.innerHTML = iNow+'s后重发送';
			if (iNow--===0) {
				iNow = 60;
				clearInterval(yzmTimer);
				osignYzm.className = 'sign-yzm a_c';
				osignYzm.innerHTML = '获取验证码';
			}
		}


		ajax({
			url: './wechat/msg.php',
			data: {
				tel: tel
			},
			type: 'post',
			success: function (data){
				if(typeof data === 'string'){
					data = JSON.parse(data);
				}
				alert(data.message);
			},
			error: function (){
				alert('服务器错误,请稍后再试');
			}
		})
	}

	// 提交
	oBtn.onclick = function (){
		var tel = oUsername.value;
		var yzm = oYzm.value;
		if (!reTel.test(tel)) {
			alert('请填写正确的手机号');
			return ;
		}

		if (!yzm) {
			alert('请填写验证码');
			return ;
		}

		ajax({
			url: './wechat/writeSql.php',
			data: {
				tel: tel,
				yzm: yzm,
				iFont: oGame.iFont
			},
			type: 'post',
			success: function (data){
				if(typeof data === 'string'){
					data = JSON.parse(data);
				}
				alert(data.message);
			},
			error: function (){
				alert('服务器错误,请稍后再试');
			}
		})

	}
}