function json2url(json){
	json.t=Math.random();
	var arr=[];
	for(var name in json){
		arr.push(name+'='+json[name]);
	}
	return arr.join('&');
}
function ajax(json){
	var timer=null;
	json=json || {};
	if(!json.url){
		alert('用法不符合规范');
		return;
	}
	json.type=json.type || 'get';
	json.data=json.data || {};
	json.timeout=json.timeout || 5;
	json.dataType=json.dataType || 'json';
	
	if(window.XMLHttpRequest){
		var oAjax=new XMLHttpRequest();
	}else{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');	
	}
	
	switch(json.type.toLowerCase()){
		case 'get':
			oAjax.open('GET',json.url+'?'+json2url(json.data),true);
			oAjax.send();
			break;
		case 'post':
			oAjax.open('POST',json.url,true);
			oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			oAjax.send(json2url(json.data));
			break;
	}
		
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			if((oAjax.status>=200 && oAjax.status<300) || oAjax.status==304){
				if(json.dataType=='xml'){
					json.success && json.success(oAjax.responseXML);	
				}else{
					json.success && json.success(oAjax.responseText);
				}
				clearTimeout(timer);
			}else{
				json.error && json.error(oAjax.status);	
				clearTimeout(timer);
			}	
		}
	}
	
	//网络超时
	timer=setTimeout(function(){
		oAjax.onreadystatechange=null;
	},json.timeout*1000);
}

function jsonp(json){
	json.data=json.data||{};
	json.timeout=json.timeout||0;
	json.jsonp = json.jsonp || 'callback';

	var name='jsonp_'+Math.random();
	name=name.replace('.', '');
	
	json.data[json.jsonp]=name;
	
	
	var arr=[];
	for(var i in json.data){
		arr.push(i+'='+encodeURIComponent(json.data[i]));
	}
	
	window[json.data[json.jsonp]]=function (data){
		json.success && json.success(data);
		
		oHead.removeChild(oS);
		window[json.data[json.jsonp]]=null;
		
		clearTimeout(timer);
	}
	
	var oS=document.createElement('script');
	oS.src=json.url+'?'+arr.join('&');
	
	var oHead=document.getElementsByTagName('head')[0];
	oHead.appendChild(oS);
	
	if(json.timeout){
		var timer=setTimeout(function (){
			oHead.removeChild(oS);
			window[json.data[json.jsonp]]=null;
			
			json.error && json.error();
		}, json.timeout);
	}
}