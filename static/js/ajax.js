function ajax(json)
{
	json.data=json.data||{};
	json.type=json.type||'get';
	json.time=json.time||0;
	
	json.data.t=Math.random();
	var arr=[];
	for(var i in json.data)
	{
		arr.push(i+'='+encodeURIComponent(json.data[i]));
	}
	
	if(window.XMLHttpRequest)
	{
		var oAjax=new XMLHttpRequest();
	}
	else
	{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	if(json.type=='get')
	{
		oAjax.open('GET', json.url+'?'+arr.join('&'), true);
		oAjax.send();
	}
	else
	{
		oAjax.open('POST', json.url, true);
		
		oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		
		oAjax.send(arr.join('&'));
	}
	
	oAjax.onreadystatechange=function ()
	{
		if(oAjax.readyState==4)
		{
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304)
			{
				json.success && json.success(oAjax.responseText);
			}
			else
			{
				json.error && json.error();
			}
			
			clearTimeout(timer);
		}
	};
	
	//超时
	var timer=null;
	if(json.time)
	{
		timer=setTimeout(function (){
			oAjax.onreadystatechange=null;
			oAjax.abort();
			
			json.error && json.error();
		}, json.time);
	}
}