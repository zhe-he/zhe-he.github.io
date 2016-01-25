$(function (){
	var nowTime = Date.now();
	var ztTime = ["1453651200000","1453910400000","1454169600000","1454428800000"];

	// 倒计时
	function countdown(){
		var $aItem = $('.zt1-item');
		var $aTime = $('.zt1-item-r');
		var countdownTimer = null;
		var iNow = 0;

		jsonp({
			url: 	"https://app.huchill.com/app/activities/getSystemTime.shtml",
			// jsop: 	"reqParam",
			success: 	function (data){
				nowTime = data.systemTime;
				// nowTime = Date.now();
				go();
			},
			error: 		function (){
				go();
			}
		});

		
		function go(){
			countdownTimer = setInterval(function (){
				nowTime+=1000;
				iNow = 0;
				$aItem.eq(0).addClass('active');
				$aItem.each(function (index,ele){
					
					var endTimeArr = $aTime.eq(index).attr('data-endtime').split('-');
					var dataTime = timerFn(nowTime,endTimeArr[0],endTimeArr[1],endTimeArr[2]);
					
					var $span = $aTime.eq(index).find('span');

					if (dataTime.status == "end") {
						iNow = index;
						$span.each(function (){
							$(this).html('0');
						});
						$aItem.removeClass('active').eq(index+1).addClass('active');
						if (iNow === $aItem.length-1) {
							clearInterval(countdownTimer);
							$aItem.removeClass('active');
						};
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
			}, 1000);


			
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



	// 根据时间切换专题
	function timeTab(){

	}


	function init(){
		countdown();

		
	}

	init();
});