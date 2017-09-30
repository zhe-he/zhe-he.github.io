function Roast(id){
	this.allImgArr = [{
		name: 'bg',
		img:"images/main_bg.jpg"
	},{
		name: 'bt',
		img:"images/main_bt.png"
	},{
		name: 'dabo',
		img: "images/dabo.png"
	},{
		name: 'play',
		img: "images/menu_play.png"
	},{
		name: 'more',
		img: "images/menu_more.png"
	},{
		name:'clock',
		img:"images/main_clock.png"
	},{
		name:'clock2',
		img:"images/main_clock2.png"
	},{
		name:'cloud',
		img:"images/main_cloud.png"
	},{
		name:'ji',
		img:"images/main_ji.png"
	},{
		name:'top',
		img:"images/main_top.png"
	},{
		name:'top2',
		img:"images/main-top.jpg"
	},{
		name:'zhaji',
		img:"images/main_zhaji.png"
	}];
	this.isStart = false;
	this.srcCount = 0;
	this.createStep = 10;
	this.score = 0;
	this.src = {}; 	// 图片对象
	this.ji = []; 	// 所有的鸡
	this.gameTime = 30; 
	this.gameTimer = null;
	this.main = document.getElementById(id);
	this.ctx = this.main.getContext('2d');
	this.setClient();
	this.setSrc();
	this.checkTimer = setInterval(this.checkSrc.bind(this),30);

}

Roast.prototype = {
	constructor: Roast,
	setClient: function (){
		var w = 720;
		var W = Math.min(window.innerWidth,720);
		var H = window.innerHeight;
		var h = w/W*H|0;
		this.main.width = w;
		this.main.height = h;
	},
	checkSrc: function (){
		if (this.srcCount==this.allImgArr.length) {
			clearInterval(this.checkTimer);
			this.init();
		}
	},
	setSrc: function (){
		for (var i = 0; i < this.allImgArr.length; i++) {
			this.imgload(this.allImgArr[i].img,this.allImgArr[i].name);
		}
	},
	imgload: function (src,name){
		var img = new Image();
		img.onload = function (){
			img.onload = null;
			this.srcCount++;
			this.src[name] = img;
		}.bind(this);
		img.onerror = function (){
			img.onerror = null;
			this.srcCount++;
			this.src[name] = null;
		}.bind(this);
		img.src = src;
	},
	drawBg: function (){
		this.ctx.drawImage(this.src.bg,0,0,this.ctx.canvas.width,this.ctx.canvas.height);
	},
	drawTop: function (){
		this.ctx.drawImage(this.src.top,0,0);
		this.ctx.drawImage(this.src.top2,0,0);
		/*this.ctx.save();
		var txt = '雅居乐万科·热橙 | KFC';
		this.ctx.font="28px/28px sans-serif, Tahoma, Helvetica";
		var x = this.ctx.canvas.width/2 - this.ctx.measureText(txt).width/2;
		this.ctx.fillStyle = '#ffffff';
		this.ctx.fillText(txt,x,51);
		this.ctx.restore();*/
	},
	drawBt: function (){
		var y = this.ctx.canvas.height - this.src.bt.height;
		this.ctx.drawImage(this.src.bt,0,y);
	},
	drawClock: function (){
		var y = this.ctx.canvas.height - this.src.clock.height - 62;
		var x = 65;
		this.ctx.drawImage(this.src.clock,x,y);
		this.ctx.save();
		var gameTime = '0' + this.toDou(this.gameTime);
		this.ctx.font="bold 105px/105px sans-serif, Tahoma, Helvetica";
		this.ctx.fillStyle = '#ec455c';
		this.ctx.fillText(gameTime,258,this.ctx.canvas.height-114);
		this.ctx.restore();
	},
	drawClock2: function (){
		var y = this.ctx.canvas.height - this.src.clock2.height - 62;
		var x = 65;
		var y2 = this.ctx.canvas.height - this.src.play.height - 53;
		var x2 = 209;
		this.ctx.drawImage(this.src.clock2,x,y);
		this.ctx.drawImage(this.src.play,x2,y2);
	},
	drawDabo: function (){
		var x = (this.ctx.canvas.width - this.src.dabo.width)/2;
		var y = (this.ctx.canvas.height - this.src.dabo.height)/2 - 80;
		this.ctx.drawImage(this.src.dabo,x,y);
	},
	drawMore: function (){
		var x = (this.ctx.canvas.width - this.src.more.width)/2;
		var y = (this.ctx.canvas.height - this.src.more.height)/2 - 80;
		this.ctx.drawImage(this.src.more,x,y);
	},
	toDou: function (n){
		return n<10?'0'+n:''+n;
	},
	drawCloud: function (){
		var y = this.src.top.height;
		var x = -55;
		var w = this.src.cloud.width;
		var h = this.ctx.canvas.height-y-this.src.bt.height;
		this.ctx.drawImage(this.src.cloud,x,y,w,h);
	},
	drawJi: function (){
		for (var i = 0; i < this.ji.length; i++) {
			if (this.ji[i].dieTime!=-1) {
				if(this.ji[i].dieTime--){
					this.ctx.drawImage(this.src.zhaji,this.ji[i].a,this.ji[i].b,this.ji[i].c-this.ji[i].a,this.ji[i].d-this.ji[i].b);
				}else{
					this.ji.splice(i--,1);
					continue;
				}
			}else{
				this.ji[i].y += this.ji[i].s;
				if (this.ji[i].y>=this.ji[i].maxY) {
					this.ji.splice(i--,1);
					continue;
				}
				var scale = this.ji[i].scale;
				var w = this.src.ji.width*scale;
				var h = this.src.ji.height*scale;
				var x = this.ji[i].x+this.src.ji.width*(1-scale)/2;
				var y = this.ji[i].y+this.src.ji.height*(1-scale)/2;
				this.ji[i].a = x;
				this.ji[i].b = y;
				this.ji[i].c = x+w;
				this.ji[i].d = y+w;
				this.ctx.drawImage(this.src.ji,x,y,w,h);
			}
		}
	},
	drawZhaji: function (){
		this.ctx.drawImage(this.src.zhaji,100,300);
	},
	rnd: function (m,n){
		return (Math.random()*(n-m+1)+m)|0;
	},
	createJi: function (){
		var minY = this.src.top.height-this.src.ji.height;
		var maxY = this.ctx.canvas.height-this.src.bt.height+50;
		var minX = -this.src.ji.width/2;
		var maxX = this.ctx.canvas.width+minX;
		var x = this.rnd(minX,maxX);
		var y = minY;
		var scale = this.rnd(4,9)/10;
		this.ji.push({
			x: x,
			y: y,
			maxY: maxY,
			scale: scale,
			s: this.rnd(3,8),
			dieTime: -1
		});
	},
	checkTime: function (){
		if (this.gameTime>=1) {
			this.createJi();
		}else{
			sendScore && sendScore(this.score);
		}
		if(!--this.gameTime){
			clearInterval(this.gameTimer);
			requestAnimationFrame(function (){
				cancelAnimationFrame(this.baseTimer);

				var t = oPage3.className.replace('hide','');
				oPage3.className = t;
			}.bind(this));
		}
	},
	kill: function (ev){
		ev.preventDefault();
		var touch = ev.targetTouches[0];
		var scale = 720/window.innerWidth;
		var x = touch.pageX*scale;
		var y = touch.pageY*scale;

		if (!this.isStart) {
			if(this.gameTime==30){
				var a = 209;
				var b = window.innerHeight*scale-327;
				var c = 477;
				var d = window.innerHeight*scale-53;
				if (x >= a && x <= c && y >= b && y<= d) {
					this.start();
				}
			}
		}else{
			for (var i = this.ji.length-1; i >= 0; i--) {
				if (x >= this.ji[i].a && x <= this.ji[i].c && y >= this.ji[i].b && y<= this.ji[i].d ) {
					this.score++;
					this.ji[i].dieTime = 50;
					break;
				}	
			}
		}
		
	},
	start: function (){
		this.isStart = true;
		this.gameTimer = setInterval(this.checkTime.bind(this),1000);
		this.base();
	},
	base: function (){

		if ( (this.gameTime <= 17 && this.gameTime >= 15) ||
			 (this.gameTime <= 10 && this.gameTime >= 9) ||
			 (this.gameTime <= 5 && this.gameTime >= 4)
			) {
			this.drawBg();
			this.drawCloud();
			this.drawMore();
			this.drawTop();
			this.drawBt();
			this.drawClock();
		}else{
			if ( (this.gameTime<=15 && this.gameTime>=11) || 
				 (this.gameTime<=9 && this.gameTime>=6) ||
				 (this.gameTime<=4 && this.gameTime>=1)
				) {
				if(!--this.createStep){
					this.createStep = 10;
					this.createJi();
				}
			}

			this.drawBg();
			this.drawCloud();
			this.drawJi();
			this.drawTop();
			this.drawBt();
			this.drawClock();
		}
		
		this.baseTimer = requestAnimationFrame(this.base.bind(this));
	},
	drawDefault: function (){
		this.drawBg();
		this.drawCloud();
		this.drawTop();
		this.drawBt();
		this.drawClock2();
		this.drawDabo();
	},
	init: function(){
		this.main.addEventListener('touchstart',this.kill.bind(this),false);
		this.main.addEventListener('touchmove',function (ev){
			ev.preventDefault();
		},false);
		this.drawDefault();

	}
};



preLoading(function (){
	music.play();
	new Roast('main');
})


var oA1 = document.querySelector('.page_btn1');
var oA2 = document.querySelector('.page_btn2');
var oMain = document.getElementById('main');
var oPage2 = document.querySelector('.page2');
var oPage3 = document.querySelector('.page3');
var oRestart = document.querySelector('.restart');
var oClose = document.querySelector('.page3 .close');
var oShare = document.querySelector('.page3 .share');

oA1.addEventListener('click',function (){
	oPage2.className = 'page2 page';
});
oA2.addEventListener('click',function (){
	oMain.className = 'show';
});

oShare.addEventListener('click',function(){
	alert('点击右上角，分享给好友~');
});
oRestart.onclick = oClose.onclick = function (){
	window.location.reload();
};

// 分数
function sendScore(score){
	sendScore = null;
	ajax({
		url: '/test.txt',
		type: 'POST',
		data: {
			score: score
		},
		success: function (data){
			data = eval('('+data+')');
			if (data.err_code==0) {
				_succ(data.data);
			}else{
				// 服务器错误可以直接对应最小的奖励 小徒弟
				_faild();
			}
		},
		error: function (err){
			// alert('网络不稳定');
			// 网络失败可以直接对应最小的奖励 小徒弟
			_faild();
		}
	});

	function _faild(){
		oPage3.className = 'page3 page status1 hide';
	}
	function _succ(type){
		oPage3.className = 'page3 page hide status'+type;
	}
}


document.addEventListener("WeixinJSBridgeReady", function () {  
    music.play();
}, false);


// 预加载
function preLoading(cb){
	var preload = document.querySelector('#loading');
	var preCon = document.querySelector('#loading .preCon');
	var preNum = document.querySelector('#loading .preNum');
	var iNow = 0;
	var allImg = ["images/bg.jpg","images/bg3.jpg","images/bg2.jpg","images/come.png","images/dabo.png","images/end_font1.png","images/end_img1.png","images/main-top.jpg","images/main_bg.jpg","images/main_bt.png","images/main_clock.png","images/main_clock2.png","images/main_cloud.png","images/main_ji.png","images/main_top.png","images/main_zhaji.png","images/menu_more.png","images/menu_play.png","images/music.png","images/restart.png","images/share.png","images/zhuoji.png"];
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

musicBtn.onclick = function (){
	if(/close/.test(this.className)){
		this.className = 'music';
		music.play();
	}else{
		this.className = 'music close';
		music.pause();
	}
}


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