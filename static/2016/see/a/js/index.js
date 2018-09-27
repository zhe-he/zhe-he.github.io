$(function (){
	var $item1 = $('#main .cell1');
	var $item2 = $('#main .cell2');
	var $item3 = $('#main .cell3');
	var $item4 = $('#main .cell4');
	var $item5= $('#main .cell5');
	var $item6 = $('#main .cell6');
	var $item7 = $('#main .cell7');
	var $gift = $('#main .cell-gift');
	var allImg = ["bg1.jpg","bg2.jpg","bg3.jpg","bg4.jpg","bg5.jpg","bg6.jpg","bg7.jpg","dr.png","flower.png","hand-l.png","hand-m.png","hand-r.png","head.png","hat.png","kz.png","large.png","logo.png","man1.png","man2.png","map.png","maplogo.png","mohe.png","my.png","share-t.png","share.png","sheep.png","small.png","snow.png","t1.png","t2.png","t3.png","t4.png","t5.png","t6.png","thanks.png","wj.png","xmc.png","xz-l.png","xz-r.png","yf.png"];
	var bTimer = false;
	


	waiting();

	function init(){
		
		$item1.on('click',function (){
			$item2.addClass('transition center');
		});
		$item2.find('.start').on('click',function (){
			$item1.remove();
			$item2.remove();
			$item3.removeClass('hide').addClass('center');
			game();
		});
		
		document.getElementById('music').play();
		fnMusic();
		formSubmit();

		// 分享
		$('.g-share').on('click',function (){
			$('.g-share').addClass('open');
		})
	}
	// 表单提交
	function formSubmit(){
		var $name = $('.gift-form .input-cell1 input');
		var $tel = $('.gift-form .input-cell2 input');
		var $address = $('.gift-form .input-cell3 input');
		var $prize = $('.gift-form .prize');
		
		$('.gift-form .input-btn').on('click', function (){
			var name = $name.val();
			var tel = $tel.val();
			var address = $address.val();
			var prize = $prize.val();
			if (!name.trim()) {
				alert('请输入姓名！')
				return false;
			}else if(!isNaN(Number(name))){
				alert('请输入正确的姓名！');
				return false;
			};

			if (!tel.trim()) {
				alert('请输入手机号！');
				return false;
			}else if(!/^1[3-9]\d{9}$/.test(tel)){
				alert('请输入正确的手机号！');
				return false;
			};

			if (!address.trim()) {
				alert('请填写地址！');
				return false;
			};

			$item5.addClass('transition center');

		})
	}


	function gift(){
		$item6.find('.gift-box').on('click',function (){
			if(Math.random()<0.5){
				$item6.find('.gift2').addClass('active');
			}else{
				$item6.find('.gift3').addClass('active');
			}
		});
	}

	function game(){
		var canvas = document.getElementById('game');
		var ctx = canvas.getContext('2d');
		var W = $(window).width(),
			H = $(window).height();
		canvas.width = W;
		canvas.height = H;
		// 雪花
		canvas.X = 0;
		canvas.Y = 0;
		// 感应距离
		canvas.R = 70;
		// 红色点集合
		canvas.pointArr = [];
		// 当前状态
		canvas.STEP = 0;

		canvas.addEventListener('touchstart',function (ev){
			var touch = ev.targetTouches[0];
			var pageX = touch.pageX,
				pageY = touch.pageY;

			for (var i = this.pointArr.length-1; i >= 0; i--) {
				if(isHit(pageX,pageY,this.pointArr[i].x,this.pointArr[i].y,canvas.R)){
					this.pointArr.splice(i,1);
					if(!this.pointArr.length){
						//状态+1
						canvas.STEP += 1;
					}
					break;
				}
			};
		});

		fnBase();
		function fnBase(){
			fnBaseStep(canvas.STEP);
			ranPoint();
			if(!bTimer){
				window.requestAnimationFrame(fnBase)
			}
		}

		

		function fnBaseStep(step){
			clearMap();
			drawBg();
			drawSnow();
			drawMan();
			drawC(Math.floor(step/2-1));
			if (step==0) {return};
			var fnArr = [[drawMy]
						,[drawMy,drawKz]
						,[drawMy,drawKz,drawYf,drawHead]
						,[drawMy,drawKz,drawYf,drawHead,drawSmall]
						,[drawXzl,drawMy,drawKz,drawYf,drawHead,drawSmall]
						,[drawXzl,drawXzr,drawMy,drawKz,drawYf,drawHead,drawSmall]
						,[drawXzl,drawXzr,drawMy,drawKz,drawYf,drawHead,drawSmall,drawHandl]
						,[drawXzl,drawXzr,drawMy,drawKz,drawYf,drawHead,drawSmall,drawHandl,drawHandr]
						,[drawXzl,drawXzr,drawMy,drawKz,drawYf,drawHead,drawSmall,drawHandl,drawHandr,drawLarge]
						,[drawXzl,drawXzr,drawMy,drawKz,drawYf,drawHead,drawSmall,drawHandl,drawHandr,drawLarge,drawHat]
						,[drawXzl,drawXzr,drawMy,drawKz,drawYf,drawHead,drawSmall,drawHandl,drawHandr,drawLarge,drawHat,drawWj]
						,[drawXzl,drawXzr,drawMy,drawKz,drawYf,drawHead,drawSmall,drawHandl,drawHandr,drawLarge,drawHat,drawWj,drawNuan]
						];

			for (var i = 0; i < fnArr[step-1].length; i++) {
				fnArr[step-1][i] && fnArr[step-1][i]();
			};
		}

		//随机取点
		
		function ranPoint(){
			if (canvas.STEP == 12) {
				gameover();
				return;
			};

			if (!canvas.pointArr.length) {
				if (canvas.STEP < 3) {
					var json = create();
					canvas.pointArr.push(json);
				}else if(canvas.STEP < 7){
					var json = create();
					canvas.pointArr.push(json);
					json = create();
					while(isSame(json.x,json.y)){
						json = create();
					}
					canvas.pointArr.push(json);
				}else{
					var json = create();
					canvas.pointArr.push(json);
					json = create();
					while(isSame(json.x,json.y)){
						json = create();
					}
					canvas.pointArr.push(json);
					json = create();
					while(isSame(json.x,json.y)){
						json = create();
					}
					canvas.pointArr.push(json);
				};
				
				
			};
			
			for (var i = 0; i < canvas.pointArr.length; i++) {
				canvas.pointArr[i].t += 0.03;
				if (canvas.pointArr[i].t >= 3) {
					canvas.pointArr[i].t = 0;
				};
				drawPoint(canvas.pointArr[i].x,canvas.pointArr[i].y,canvas.pointArr[i].t);
			};
			//428,804 	区域1 447,396  区域2 371 380+396
			function create(){
				var x1 = 428,y1 = 804; 
				var x2,y2;
				if(Math.random()<0.5){
					x2 = 447;
					y2 = 396;
				}else{
					x2 = 371;
					y2 = 776 - 35; // 修正35
				}
				var x = x1 + parseInt(canvas.R+(x2-canvas.R)*Math.random(),10),
					y =	y1 + parseInt(canvas.R+(y2-canvas.R)*Math.random(),10);
				return {x:x,y:y,t:0};
			}
			// 是否相同----一定距离，防止重合
			function isSame(x,y){
				for (var i = 0; i < canvas.pointArr.length; i++) {
					if(isHit(x,y,canvas.pointArr[i].x,canvas.pointArr[i].y,3*canvas.R)){
						return true;
					}
				};
				return false;
			}
		}

		//清空
		function clearMap(){
			ctx.clearRect(0,0,W,H);
		}
		//一定距离是否重合
		function isHit(x,y,X,Y,R){
			if (Math.abs(x-X)<R && Math.abs(y-Y)<R) {
				return true;
			};
			return false;
		}


		//画背景
		function drawBg(){
			if (!canvas.bg) {
				imgload("images/bg2.jpg",function (img){
					canvas.bg = img;
					ctx.drawImage(canvas.bg,0,0,W,H);
				})
			}else{
				ctx.drawImage(canvas.bg,0,0,W,H);
			};
			
		}
		//画雪花
		function drawSnow(){
			if (!canvas.snow) {
				imgload("images/snow.png",function (img){
					canvas.snow = img;
					fnDrawSnow(canvas.snow);
				})
			}else{
				fnDrawSnow(canvas.snow)
			};
		}
		function fnDrawSnow(snow){
			canvas.Y+=3;
			if (canvas.Y>H) {
				canvas.Y=0;
			};
			/*canvas.X+=2;
			if (canvas.X>W) {
				canvas.X=0;
			};*/
			
			// fnSnow(0,500,snow.width,snow.height);
			// fnSnow(0,1000,snow.width,snow.height);
			// fnSnow(500,500,snow.width,snow.height);
			// fnSnow(1000,1000,snow.width,snow.height);
			fnSnow(0,0,snow.width,snow.height);
			fnSnow(0,-400,snow.width,snow.height);
			fnSnow(0,-800,snow.width,snow.height);
			fnSnow(0,-1200,snow.width,snow.height);
			fnSnow(500,0,snow.width,snow.height);
			fnSnow(500,-400,snow.width,snow.height);
			fnSnow(500,-800,snow.width,snow.height);
			fnSnow(500,-1200,snow.width,snow.height);
			

			// 到底部时续接
			function fnSnow(x,y,w,h){
				ctx.drawImage(snow,canvas.X+x,canvas.Y+y,w,h);
				var disY = canvas.Y+h-H;
				var disX = canvas.X+w-W;
				// 到底
				if (disY>0) {
					ctx.drawImage(snow,0,h-disY,w,disY,
						canvas.X,0,w,disY);
				};
				if (disX>0) {
					ctx.drawImage(snow,w-disX,0,disX,h,
						0,canvas.Y,disX,h);
				};
			}
		}
		//画小人
		function drawMan(){
			if (!canvas.man) {
				imgload("images/man1.png",function (img){
					canvas.man = img;
					ctx.drawImage(canvas.man,386,273,canvas.man.width,canvas.man.height);					
				})
			}else{
				ctx.drawImage(canvas.man,386,273,canvas.man.width,canvas.man.height);	
			};
		}
		//画暖宝宝
		function drawNuan(){
			if (!canvas.nuan) {
				imgload("images/thanks.png",function (img){
					canvas.nuan = img;
					ctx.drawImage(canvas.nuan,52,610,canvas.nuan.width,canvas.nuan.height);	
				})
			}else{
				ctx.drawImage(canvas.nuan,52,610,canvas.nuan.width,canvas.nuan.height);		
			};
		}
		//画温度计
		function drawC(now){
			now=now<1?0:now;
			var arr = ["images/t1.png","images/t2.png","images/t3.png","images/t4.png","images/t5.png","images/t6.png"];
			
			if (!canvas['c'+now]) {
				imgload(arr[now],function (img){
					canvas['c'+now] = img;
					ctx.drawImage(canvas['c'+now],34,256,canvas['c'+now].width,canvas['c'+now].height);	
				})
			}else{
				ctx.drawImage(canvas['c'+now],34,256,canvas['c'+now].width,canvas['c'+now].height);	
			};
		}
		//画感应点
		function drawPoint(x,y,status){
			
			if(status>=2){
				ctx.fillStyle = 'rgba(250,25,41,0.3)';
				ctx.beginPath();
				ctx.arc(x, y, 68, 0, 2*Math.PI);
				ctx.fill();
			}
			if(status>=1){
				ctx.fillStyle = 'rgba(250,25,41,0.6)';
				ctx.beginPath();
				ctx.arc(x, y, 52, 0, 2*Math.PI);
				ctx.fill();
			}

			ctx.fillStyle = 'rgba(250,25,41,1)';
			ctx.beginPath();
			ctx.arc(x, y, 33, 0, 2*Math.PI);
			ctx.fill();

		}

		//画毛衣
		function drawMy(){
			if (!canvas.my) {
				imgload("images/my.png",function (img){
					canvas.my = img;
					ctx.drawImage(canvas.my,442,785,canvas.my.width,canvas.my.height);
				})
			}else{
				ctx.drawImage(canvas.my,442,785,canvas.my.width,canvas.my.height);
			};
		}
		//画裤子
		function drawKz(){
			if (!canvas.kz) {
				imgload("images/kz.png",function (img){
					canvas.kz = img;
					ctx.drawImage(canvas.kz,484,1034,canvas.kz.width,canvas.kz.height);
				})
			}else{
				ctx.drawImage(canvas.kz,484,1034,canvas.kz.width,canvas.kz.height);
			};
		}
		//画大衣
		function drawYf(){
			if (!canvas.yf) {
				imgload("images/yf.png",function (img){
					canvas.yf = img;
					ctx.drawImage(canvas.yf,436,746,canvas.yf.width,canvas.yf.height);
				})
			}else{
				ctx.drawImage(canvas.yf,436,746,canvas.yf.width,canvas.yf.height);
			};
		}
		//画头
		function drawHead(){
			if (!canvas.head) {
				imgload("images/head.png",function (img){
					canvas.head = img;
					ctx.drawImage(canvas.head,386,273,canvas.head.width,canvas.head.height);
				})
			}else{
				ctx.drawImage(canvas.head,386,273,canvas.head.width,canvas.head.height);
			};
		}
		//微笑
		function drawSmall(){
			if (!canvas.small) {
				imgload("images/small.png",function (img){
					canvas.small = img;
					ctx.drawImage(canvas.small,607,710,canvas.small.width,canvas.small.height);
				})
			}else{
				ctx.drawImage(canvas.small,607,710,canvas.small.width,canvas.small.height);
			};
		}

		//画鞋子
		function drawXzl(){
			if (!canvas.xzl) {
				imgload("images/xz-l.png",function (img){
					canvas.xzl = img;
					ctx.drawImage(canvas.xzl,442,1463,canvas.xzl.width,canvas.xzl.height);
				})
			}else{
				ctx.drawImage(canvas.xzl,442,1463,canvas.xzl.width,canvas.xzl.height);
			};
		}
		function drawXzr(){
			if (!canvas.xzr) {
				imgload("images/xz-r.png",function (img){
					canvas.xzr = img;
					ctx.drawImage(canvas.xzr,658,1463,canvas.xzr.width,canvas.xzr.height);
				})
			}else{
				ctx.drawImage(canvas.xzr,658,1463,canvas.xzr.width,canvas.xzr.height);
			};
		}
		//画手套
		function drawHandl(){
			if (!canvas.handl) {
				imgload("images/hand-l.png",function (img){
					canvas.handl = img;
					ctx.drawImage(canvas.handl,428,1092,canvas.handl.width,canvas.handl.height);
				})
			}else{
				ctx.drawImage(canvas.handl,428,1092,canvas.handl.width,canvas.handl.height);
			};
		}
		function drawHandr(){
			if (!canvas.handr) {
				imgload("images/hand-r.png",function (img){
					canvas.handr = img;
					ctx.drawImage(canvas.handr,793,1092,canvas.handr.width,canvas.handr.height);
				})
			}else{
				ctx.drawImage(canvas.handr,793,1092,canvas.handr.width,canvas.handr.height);
			};
		}
		//大笑
		function drawLarge(){
			if (!canvas.large) {
				imgload("images/large.png",function (img){
					canvas.large = img;
					ctx.drawImage(canvas.large,594,678,canvas.large.width,canvas.large.height);
				})
			}else{
				ctx.drawImage(canvas.large,594,678,canvas.large.width,canvas.large.height);
			};
		}
		//画帽子
		function drawHat(){
			if (!canvas.hat) {
				imgload("images/hat.png",function (img){
					canvas.hat = img;
					ctx.drawImage(canvas.hat,369,221,canvas.hat.width,canvas.hat.height);
				})
			}else{
				ctx.drawImage(canvas.hat,369,221,canvas.hat.width,canvas.hat.height);
			};
		}
		//画围巾
		function drawWj(){
			if (!canvas.wj) {
				imgload("images/wj.png",function (img){
					canvas.wj = img;
					ctx.drawImage(canvas.wj,514,732,canvas.wj.width,canvas.wj.height);
				})
			}else{
				ctx.drawImage(canvas.wj,514,732,canvas.wj.width,canvas.wj.height);
			};
		}
	}

	function gameover(){
		// window.cancelAnimationFrame(timeC);
		bTimer = true;
		setTimeout(function (){
			$item3.remove();
			$item4.addClass('translate center');
			$item4.find('.juan').on('click',function (){
				$gift.addClass('transition center');
			});
			$item5.find('.thank').on('click', function (){
				$item4.remove();
				$gift.remove();
				$item5.remove();
				$item6.addClass('active');
			})
			gift();
		},2000);
	}

	function imgload(src,success,error){
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
	}

	function fnMusic(){
		var $musicBtn = $('.music');
		var music = document.getElementById('music');
		$musicBtn.on('click',function (){
			if ($(this).hasClass('close')) {
				$musicBtn.removeClass('close');
				music.play();
			}else{
				$musicBtn.addClass('close');
				music.pause();
			};
			return false;
		});
	}

	function waiting(){
		var $loading = $('#loading p').eq(0).find('span');
		var $text = $('#loading p').eq(1).find('span');
		var count = allImg.length;
		var now = 0;
		for (var i = 0; i < allImg.length; i++) {
			imgload('images/'+allImg[i],function (){
				now++;
				var t = Math.floor(now/count*100);
				$loading.css('width',t+'%');
				$text.text(t);
				if (now === count) {
					fn();
				};
			},function (){
				now++;
				var t = Math.floor(now/count*100);
				$loading.css('width',t+'%');
				$text.text(t);
				if (now === count) {
					fn();
				};
			})
		};
		function fn(){
			$("#loading").remove();
			$("#main").removeClass('hide');
			init();
		}
	}
});


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
