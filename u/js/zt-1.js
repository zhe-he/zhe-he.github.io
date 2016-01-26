$(function (){

	// var nowTime = new Date(2016,0,27,23,59,55).getTime(); 	// 备用的时间
	var nowTime = Date.now(); 	// 备用的时间
	var ztTime = [1453392000000,1453651200000,1453910400000,1454169600000,1454428800000]; 	// 专题切换的时间
	var nowZT = 1; 				// 当前的专题
	var lastZT = 0; 			// 上一个专题
	var $aItem = $('.zt1-item'); 	// 巡回时间表

	var index = window.prompt('测试: 请输入你要看的专题页（数字），默认2') || 1;
	index = isNaN(Number(index))?2:Number(index);

	var timeend = window.prompt('请填写专题切换时间（数字），默认10秒') || 10;
	timeend = isNaN(Number(timeend))?10:Number(timeend);

	if (index == 1) {
		nowTime = ztTime[index];
	}else if (index>=5) {
		index=4;
		nowTime = ztTime[index];
	}else{
		nowTime = ztTime[index]-timeend*1000;
	};

	// 倒计时
	function countdown(){
		
		var $aTime = $('.zt1-item-r');
		var countdownTimer = null;
		var iNow = 0;

		jsonp({
			url: 	"https://app.huchill.com/app/activities/getSystemTime.shtml",
			// jsonp: 	"reqParam",
			success: 	function (data){
				// nowTime = data.systemTime;
				go();
			},
			error: 		function (){
				go();
			}
		});

		
		function go(){
			_fn();
			countdownTimer = setInterval(_fn, 1000);

			function _fn(){
				
				
				iNow = 0;
				$aItem.each(function (index,ele){
					
					var endTimeArr = $aTime.eq(index).attr('data-endtime').split('-');
					var dataTime = timerFn(nowTime,endTimeArr[0],endTimeArr[1],endTimeArr[2]);
					
					var $span = $aTime.eq(index).find('span');

					if (dataTime.status == "end") {
						iNow = index;
						$span.each(function (){
							$(this).html('0');
						});
						if (iNow === $aItem.length-1) {
							clearInterval(countdownTimer);
							$aItem.removeClass('active');
						};

						lastZT = index+1;
						return;
					};
					if (dataTime.d>0) {
						$span.eq(0).html(dataTime.d.charAt(0));
						$span.eq(1).html(dataTime.d.charAt(1));
						$span.eq(2).html(dataTime.h.charAt(0));
						$span.eq(3).html(dataTime.h.charAt(1));
						$span.eq(4).html(dataTime.m.charAt(0));
						$span.eq(5).html(dataTime.m.charAt(1));
						$aTime.eq(index).addClass('is-has-day');
					}else{
						$aTime.eq(index).removeClass('is-has-day');
						
						$span.eq(0).html(dataTime.h.charAt(0));
						$span.eq(1).html(dataTime.h.charAt(1));
						$span.eq(2).html(dataTime.m.charAt(0));
						$span.eq(3).html(dataTime.m.charAt(1));
						$span.eq(4).html(dataTime.s.charAt(0));
						$span.eq(5).html(dataTime.s.charAt(1));
					};
				});


				if (lastZT != nowZT){
					nowZT = lastZT;
					changeZT(nowZT);
					$aItem.removeClass('active').eq(nowZT).addClass('active');
				};

				nowTime+=1000;
			}
		}
	}

	function timerFn(nowTime,year,month,date){ 
		year = parseInt(year,10);
		month = parseInt(month,10)-1;
		date =  parseInt(date,10);
        var ts = (new Date(year, month, date, 23, 59, 59)) - nowTime;//计算剩余的毫秒数  
        if (ts < 0) {
        	return {status:"end"};
        };

        var dd = parseInt(ts / 1000 / 60 / 60 / 24, 10);//计算剩余的天数  
        var hh = parseInt(ts / 1000 / 60 / 60 % 24, 10);//计算剩余的小时数  
        var mm = parseInt(ts / 1000 / 60 % 60, 10);//计算剩余的分钟数  
        var ss = parseInt(ts / 1000 % 60, 10);//计算剩余的秒数  
        

        if (dd < 3) {
        	hh += dd*24;
        	dd = 0;
        };

        dd = checkTime(dd);  
        hh = checkTime(hh);  
        mm = checkTime(mm);  
        ss = checkTime(ss);  
          
        return {d:dd,h:hh,m:mm,s:ss,status:"start"};  
    }  
    function checkTime(i){    
       return i<10?'0'+i:''+i;    
    }    

	// zepto jsop改不了参数（可能版本问题），故用此函数
	function jsonp(json){
		json.data=json.data||{};
		json.time=json.time||0;
		
		//data.cb分配
		var name='jsonp_'+Math.random();
		name=name.replace('.', '');
		
		json.data.reqParam=name;
		
		
		var arr=[];
		for(var i in json.data)
		{
			arr.push(i+'='+encodeURIComponent(json.data[i]));
		}
		
		window[json.data.reqParam]=function (data)
		{
			json.success && json.success(data);
			
			//用完了
			oHead.removeChild(oS);
			window[json.data.reqParam]=null;
			
			clearTimeout(timer);
		};
		
		var oS=document.createElement('script');
		oS.src=json.url+'?'+arr.join('&');
		
		var oHead=document.getElementsByTagName('head')[0];
		oHead.appendChild(oS);
		
		if(json.time)
		{
			var timer=setTimeout(function (){
				oHead.removeChild(oS);
				window[json.data.reqParam]=null;
				
				json.error && json.error();
			}, json.time);
		}
	}

	// 动画 关闭
	function animateAll(){
		var t1 = $('.zt1-cell1').offset().top;
		var t2 = $('.zt1-proposal-cell').offset().top;
		var t3 = $('.zt1-time .zt1-item').eq(0).offset().top;
		var t4 = $('.zt1-other li').eq(0).offset().top;
		var h = $(window).height();
		
		setTimeout(_fn,0);
		$(window).on('scroll', _fn);

		function _fn(){
			var T = $(window).scrollTop()+h;
			
			if (T > t1) {
				$('.zt1-evaluate').addClass('animate');
			};
			if (T > t2) {
				$('.zt1-proposal').addClass('animate');
			};
			if (T > t3) {
				$('.zt1-time').addClass('animate');
			};
			if (T > t4) {
				$('.zt1-other').addClass('animate');
				$(window).off('scroll',_fn);
			};
		}

		// 下落的皇冠
		$('.zt1-time-crown').on('webkitTransitionEnd transitionend', function (){
			$aItem.removeClass('active').eq(nowZT).addClass('active');
			$(this).off('webkitTransitionEnd transitionend').remove();
		});
	}


	// 根据时间切换专题
	function timeTab(){
		for (var i = ztTime.length - 1; i >= 0; i--) {
			if(nowTime >= ztTime[i]){
				nowZT = i;
				break;
			}
		};
		lastZT = nowZT;
		changeZT(nowZT);
		$aItem.removeClass('active').eq(nowZT).addClass('active');
	}
	function changeZT(now){
		$('body').removeClass().addClass('zt-body-'+(now+1));
		var data = window.ztData[now];

		document.title = data.top.title;
		// 头部
		$('.zt1-top-con h1').text(data.top.title);
		$('.zt1-top-con p').text(data.top.aside);
		$('.zt1-hot a').attr('href',data.top.src);
		$('.zt1-hot-l h2').text(data.top.h2);
		$('.zt1-hot-l div').text(data.top.p1);
		$('.zt1-hot-l p').eq(0).text(data.top.p2);
		$('.zt1-hot-l p').eq(1).text(data.top.price[0]);
		$('.zt1-hot-l span').eq(0).text(data.top.price[1]);
		$('.zt1-hot-l span').eq(1).text(data.top.price[2]);
		$('.zt1-hot-font').text(data.top.text);
		$('.zt1-hot-r p span').eq(1).text(data.top.p3);
		// 评价
		$('.zt1-evaluate a').attr('href',data.evaluate.src);
		$('.zt1-evaluate .zt1-cell').each(function (index,ele){
			$(this).find('div').eq(1).text(data.evaluate.text[index]);
		});

		// 建议搭配
		$('.zt1-proposal h2').text(data.proposal.h2);
		$('.zt1-proposal-cell').each(function (index,ele){
			$(this).find('a').attr('href',data.proposal.text[index].src);
			$(this).find('h3').text(data.proposal.text[index].h3);
			$(this).find('p').text(data.proposal.text[index].p);
		});
	}


	function init(){
		timeTab();
		countdown();
		// animateAll();
	}

	init();
});