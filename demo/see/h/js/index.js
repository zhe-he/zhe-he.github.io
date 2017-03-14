function Roast(id){
	this.allImgArr = [{
		name: 'bg',
		img:"images/main_bg.jpg"
	},{
		name: 'bt',
		img:"images/main_bt.png"
	},{
		name:'clock',
		img:"images/main_clock.png",
	},{
		name:'cloud',
		img:"images/main_cloud.png",
	},{
		name:'ji',
		img:"images/main_ji.png",
	},{
		name:'top',
		img:"images/main_top.png",
	},{
		name:'zhaji',
		img:"images/main_zhaji.png"
	}];
	this.srcCount = 0;
	this.src = {}; 	// 图片对象
	this.ji = []; 	// 所有的鸡
	this.gameTime = 60; 
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
		this.ctx.save();
		var txt = '雅居乐万科·热橙 | KFC';
		this.ctx.font="28px/28px sans-serif, Tahoma, Helvetica";
		var x = this.ctx.canvas.width/2 - this.ctx.measureText(txt).width/2;
		this.ctx.fillStyle = '#ffffff';
		this.ctx.fillText(txt,x,51);
		this.ctx.restore();
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
		this.createJi();
		if(!--this.gameTime){
			clearInterval(this.gameTimer);
			requestAnimationFrame(function (){
				cancelAnimationFrame(this.baseTimer)
			}.bind(this));
		}
	},
	kill: function (ev){
		if (!this.gameTime) {return}
		var touch = ev.targetTouches[0];
		var scale = 720/window.innerWidth;
		var x = touch.pageX*scale;
		var y = touch.pageY*scale;
		for (var i = this.ji.length-1; i >= 0; i--) {
			if (x >= this.ji[i].a && x <= this.ji[i].c && y >= this.ji[i].b && y<= this.ji[i].d ) {
				this.ji[i].dieTime = 50;
				break;
			}	
		}
	},
	start: function (){
		this.gameTimer = setInterval(this.checkTime.bind(this),1000);
		this.base();
		this.main.addEventListener('touchstart',this.kill.bind(this),false);
	},
	base: function (){
		this.drawBg();
		this.drawCloud();
		this.drawJi();
		this.drawTop();
		this.drawBt();
		this.drawClock();
		this.baseTimer = requestAnimationFrame(this.base.bind(this));
	},
	init: function(){
		this.start();
	}
};








window.addEventListener('DOMContentLoaded',function (){

	new Roast('main');



},false);



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