function getStyle(obj,name){
	return (obj.currentStyle || getComputedStyle(obj,false))[name];
}
function startMove(obj,json,options){
	options=options || {};
	options.time=options.time || 500;
	options.type=options.type || 'ease-out';
	
	clearInterval(obj.timer);
	
	//算
	var count=Math.floor(options.time/30);
	
	var start={};
	var dis={};
	
	for(var name in json){
		if(name=='opacity'){
			start[name]=Math.round(parseFloat(getStyle(obj,name))*100);
		}else{
			start[name]=parseInt(getStyle(obj,name));
		}
		if(isNaN(start[name])){
			switch(name){
				case 'left':
					start[name]=obj.offsetLeft;
					break;
				case 'top':
					start[name]=obj.offsetTop;
					break;
				case 'width':
					start[name]=obj.offsetWidth;
					break;
				case 'height':
					start[name]=obj.offsetHeight;
					break;
				case 'marginLeft':
					start[name]=0;
					break;
			}	
		}
		dis[name]=json[name]-start[name];
	}
	
	var n=0;
	
	obj.timer=setInterval(function(){
		n++;
		
		for(var name in json){
			switch(options.type){
				case 'linear':
					var a=n/count;
					var cur=start[name]+dis[name]*a;
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[name]+dis[name]*a*a*a;
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-a*a*a);
					break;
			}
			
			if(name=='opacity'){
				obj.style.opacity=cur/100;
				obj.style.filter='alpha(opacity:'+cur+')';
			}else{
				obj.style[name]=cur+'px';	
			}
		}
		
		if(n==count){
			clearInterval(obj.timer);
			options.end && options.end();	
		}
	},30);
}












