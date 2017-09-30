//版权 北京智能社©, 保留所有权利

function jsonp(json)
{
	json.data=json.data||{};
	json.time=json.time||0;
	
	//data.cb分配
	var name='jsonp_'+Math.random();
	name=name.replace('.', '');
	
	json.data.cb=name;
	
	
	var arr=[];
	for(var i in json.data)
	{
		arr.push(i+'='+encodeURIComponent(json.data[i]));
	}
	
	window[json.data.cb]=function (data)
	{
		json.fnSucc && json.fnSucc(data);
		
		//用完了
		oHead.removeChild(oS);
		window[json.data.cb]=null;
		
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
			window[json.data.cb]=null;
			
			json.fnFaild && json.fnFaild();
		}, json.time);
	}
}





