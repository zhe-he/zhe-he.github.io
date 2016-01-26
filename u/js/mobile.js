/*!
 * by: zhe-he
 * e-mail: zhe@feicredit.com
 * Last updata time: 2015-06-11
 * 版本： 	1.0.5-删减版
 */
'use strict';

(function(window, navigator){

	var Mobile = {};
	Mobile.shuping = 'onorientationchange' in window ? 'orientationchange' : 'resize';

	Mobile.isMobile = function (){
		return 'ontouchstart' in window;
	}

	Mobile.isWeixin = function (){
		return /MicroMessenger/i.test(navigator.userAgent)
	}

	Mobile.isAndroid = function (){
		return /(Android)/i.test(navigator.userAgent)
	}

	Mobile.isIos = function (){
		return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
	}

	//改变地址栏参数
	Mobile.changeUrl = function (name, value){
	    var name = name + '=';
	    var href = window.location.href;
	    var re = new RegExp(name + '\\d*');
	    
	    //判断是否有name,有则改变name值,没有则添加name值,同事判断url是否有其他参数,没有则添加?
	    href = href.indexOf(name) != -1 ? href.replace(re, name + value) : href.indexOf('?') !=-1 ? href + '&' + name + value : href + '?' + name + value;
	    window.location.href = href;
	}

	//获取地址栏参数
	Mobile.getLocationSearch = function (url){
	    if (!!url) {
	        var search = url.substring(url.indexOf('?'));
	    }else{
	        var search = window.location.search || '?';
	    } 
	    var arr1 = search.substring(1).split('&');
	    var json = {};
	    for (var i = 0; i < arr1.length; i++) {
	        var arr2 = arr1[i].split('=');
	        if (!json[arr2[0]]) {
	            json[arr2[0]] = arr2[1];
	        };
	    }
	    return json
	}

	//获取地址栏参数(允许同名name、无=、值为空)
	Mobile.getSearch = function (url){
		var url = url?url.substr(url.indexOf('?')):window.location.search;	
		var str = url.substr(1);
		if (!str) {return {}};
		var json = {};
		var arr1 = str.split('&');
		var arr2 = [];
		for (var i = 0; i < arr1.length; i++) {
			arr2 = arr1[i].split('=');
			if (arr2.length === 1) {
				arr2[1] = undefined; // or arr[1] = null;
			};
			if (arr2[0] in json) {
				//判断上一个是单个值 还是数组
				var last = json[arr2[0]];
				last = (last == null || typeof last === 'string')?[last] : last;
				last = last.concat([arr2[1]]);
				json[arr2[0]] = last;
			}else{
				json[arr2[0]] = arr2[1];
			};
		};
		return json;
	}

	Mobile.getUrlData = function (name){
	    var json = this.getLocationSearch();
	    var str = json[name] || '';
	    return str
	}
	Mobile.getData = function (name){
		var json = this.getSearch();
	    var data = json[name] || '';
	    return data
	}

	Mobile.getPosition = function (opts){
		var lat,lng;
		opts.accuracy = opts.accuracy || false;
		opts.timeout = opts.timeout || 5000;
		opts.maxAge = opts.maxAge || 3000;

		if (window.navigator.geolocation) {
	            var options = {
	               enableHighAccuracy:  opts.accuracy,
	               timeout: 			opts.timeout,
	               maximumAge: 			opts.maxAge
	            };
	        window.navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);
	    } else {
	        console.log("浏览器不支持html5来获取地理位置信息");
	    };

	    function handleSuccess(position){         
	        lat = position.coords.latitude;
	        lng = position.coords.longitude;
	        opts.success && opts.success(lat, lng);
	    };

	    function handleError(error){
	        switch(error.code) {
	            case error.TIMEOUT:
	                console.log("A timeout occured! Please try again!");
	       			opts.error && opts.error(error.code);
	                break;
	            case error.POSITION_UNAVAILABLE:
	                console.log('We can\'t detect your location. Sorry!');
	                opts.error && opts.error(error.code);
	                break;
	            case error.PERMISSION_DENIED:
	                console.log('Please allow geolocation access for this to work.');
	       			opts.error && opts.error(error.code);
	                break;
	            case error.UNKNOWN_ERROR:
	                console.log('An unknown error occured!');
	       			opts.error && opts.error(error.code);
	                break;
	        }
	    };
	}


	Mobile.jsonp = function (json){
	    json.data=json.data||{};
	    json.time=json.time||0;
	    
	    //data.cb分配
	    var name='jsonp_'+Math.random();
	    name=name.replace('.', '');
	    
	    json.data.callback=name;
	    
	    
	    var arr=[];
	    for(var i in json.data){
	        arr.push(i+'='+encodeURIComponent(json.data[i]));
	    }
	    
	    window[json.data.callback]=function (data){
	        json.success && json.success(data);
	        
	        //用完了
	        oHead.removeChild(oS);
	        window[json.data.callback]=null;
	        
	        clearTimeout(timer);
	    };
	    
	    var oS=document.createElement('script');
	    oS.src=json.url+'?'+arr.join('&');
	    
	    var oHead=document.getElementsByTagName('head')[0];
	    oHead.appendChild(oS);
	    
	    if(json.time){
	        var timer=setTimeout(function (){
	            oHead.removeChild(oS);
	            window[json.data.callback]=null;
	            
	            json.error && json.error();
	        }, json.time);
	    }
	}

	Mobile.json2url = function (json){
		json.t=Math.random();
		var arr=[];
		for(var name in json){
			arr.push(name+'='+encodeURIComponent(json[name]));
		}
		return arr.join('&');
	}
	Mobile.ajax = function (json){
		var _this = this;
		var timer=null;
		json=json || {};
		if(!json.url){
			console.log('用法不符合规范');
			return;
		}
		json.type=json.type || 'get';
		json.data=json.data || {};
		json.time=json.time || 5;
		json.dataType=json.dataType || 'json';
		
		if(window.XMLHttpRequest){
			var oAjax=new XMLHttpRequest();
		}else{
			var oAjax=new ActiveXObject('Microsoft.XMLHTTP');	
		}
		
		switch(json.type.toLowerCase()){
			case 'get':
				oAjax.open('GET',json.url+'?'+_this.json2url(json.data),true);
				oAjax.send();
				break;
			case 'post':
				oAjax.open('POST',json.url,true);
				oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
				oAjax.send(_this.json2url(json.data));
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
		};
		
		//网络超时
		timer=setTimeout(function(){
			console.log('网络不给力');
			oAjax.onreadystatechange=null;
		},json.time*1000);
	}
	
	//回到顶部
	Mobile.scrollMove = function (options){
	    options = options || {};
	    options.time = options.time || 700;
	    options.type = options.type || "ease-out";
	    options.y = options.y || 0;
	    var start = document.documentElement.scrollTop || document.body.scrollTop;

	    var dis = options.y - start;
	    var n = 0;
	    var count = Math.floor(options.time / 16.7);
	    var _this = this;
	    if (!dis) {return false};

	    this.clearTime(this.scrollMoveTimer);
	    this.scrollMoveTimer = this.setTime(base);

	    function base(){
	        n++;
	        switch (options.type) {
		        case "linear":
		          var v = n / count;
		          var cur = start + dis * v;
		          break;
		        case "ease-in":
		          var v = n / count;
		          var cur = start + dis * v * v * v;
		          break;
		        case "ease-out":
		          var v = 1 - n / count;
		          var cur = start + dis * (1 - v * v * v);
		          break;
	        }
	        document.documentElement.scrollTop = document.body.scrollTop = cur;

	        if (n === count) {
	          _this.clearTime(_this.scrollMoveTimer);
	          options.end && options.end();
	        }else{
	        	_this.scrollMoveTimer = _this.setTime(base);
	        }
	    }
	}

	Mobile.weiboShare = function (options){
		var url = 'http://service.weibo.com/share/' + (this.isMobile ?'mobile':'share') + '.php?';
		var key,urlArray = [];
		
		if(options){
			for(key in options){
				if(options.hasOwnProperty(key)){
					switch(key){
						case 'url':
						case 'pic':
						case 'title':
							urlArray.push(key + '=' + encodeURIComponent(options[key]))
							break;
						case 'ralateUid':
						case 'appkey':
							urlArray.push(key + '=' + options[key])
							break;
					}
				}
			}
			try{
				window.open(url + urlArray.join('&'));	
			}catch(e){};
		}
	}

	Mobile.addMorePageIndex = 1;
	Mobile.addMoreComeReady = false;
	Mobile.addMore = function(dataJson, haddMore, success, error){
	    //参数设定
	    var _this = this;
	    var dataJson = dataJson || {};
	    dataJson.dataType = dataJson.dataType || 'json';
	    dataJson.data = dataJson.data || {};
	    dataJson.pShow = dataJson.pShow || '加载中';
	    dataJson.pShow2 = dataJson.pShow2 || '.';
	    dataJson.pShowNum = parseInt(dataJson.pShowNum, 10) || 3;
	    dataJson.pNo = dataJson.pNo || '暂无数据信息';
	    dataJson.error = dataJson.error || '加载失败，请刷新重试';
	    dataJson.success = dataJson.success || '已加载完';
	    dataJson.distance = dataJson.distance || 10;
	    dataJson.message = dataJson.message || 'message';

	    var timer,pMore = [];

	    var H = document.documentElement.scrollHeight || document.body.scrollHeight;
	    
	    var h = window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight + document.documentElement.scrollTop||document.body.scrollTop;
	    //var h = $(window).height() + $(window).scrollTop(); 	
	    if (H - h < dataJson.distance && !this.addMoreComeReady) {
	        
	        this.addMoreComeReady = true;
	        this.addMorePageIndex++;
	        
	        var k = 0;
	        for (var i = 0; i <= dataJson.pShowNum; i++) {
	        	var str = '';
	        	var j = i;
	        	while(j){
	        		j--;
	        		str += dataJson.pShow2;
	        	}
	        	pMore[i] = dataJson.pShow + str;
	        };
	        
	        pMoreShow();
	        clearInterval(timer);
	        timer = setInterval(pMoreShow, 500);

	        var addMoreJson = {
				url: 	dataJson.url,
				data:   dataJson.data,
				success:    function(data){
	                if(dataJson.dataType == 'json'){
	                	data = eval('(' + data + ')')
	                };
	                clearInterval(timer);
	                haddMore.innerHTML = '';
	                if (data instanceof Array) {
	                    var data2 = data;
	                }else{
	                    var data2 = data.data||[];
	                };
	                if (data2.length == 0) {
	                    _this.addMoreDataMessage = data[dataJson.message];
	                    pNoShow();
	                    _this.addMorePageIndex--;
	                }else{
	                    _this.addMoreComeReady = false;
	                };
	                success && success(data);
	            },
	            error:  function (error1){
	                clearInterval(timer);
	                haddMore.innerHTML = dataJson.error;
	                setTimeout(function (){
	                    _this.addMoreComeReady = false;
	                }, 1000);
	                error && error(error1);
	            }
			}

	        switch(dataJson.dataType){
				case 'json':
					addMoreJson.type = dataJson.type || 'get';
					_this.ajax(addMoreJson);
					break;
				case 'jsonp':
					addMoreJson.type = dataJson.type || 'post';
					_this.jsonp(addMoreJson);
					break;
			}

	    }
	    function pNoShow(){
	        haddMore.innerHTML = dataJson.success;
	        setTimeout(function (){
	            haddMore.innerHTML = '';
	            _this.addMoreComeReady = false;
	            //第一次加载没数据显示
	            if (_this.addMorePageIndex == 1 && _this.addMoreComeReady == false) {
	                _this.addMoreDataMessage = _this.addMoreDataMessage || dataJson.pNo;
	                haddMore.innerHTML = _this.addMoreDataMessage;
	            };

	        }, 1000);

	    }
	    function pMoreShow(){
	        k++;
	        if (k >= pMore.length) k = 0;
	        haddMore.innerHTML = pMore[k];
	    }
	};

	Mobile.setTime = function (callback){
		var _this = this;
		var a = window['requestAnimationFrame'] || window['webkitRequestAnimationFrame'] || window['mozRequestAnimationFrame'] || function (callback){
			_this.setTimeoutLastTime = 0;
			var currTime = Date.now();
			var timeToCall = Math.max(0, 16 - (currTime - _this.setTimeoutLastTime));
			_this.setTimeoutLastTime = currTime + timeToCall;
			return window.setTimeout(function (){
				callback();
			}, timeToCall);
		};
		return a(callback);
	}
	Mobile.clearTime = function (id){
		var a = window['cancelAnimationFrame'] || window['webkitCancelAnimationFrame'] || window['mozCancelAnimationFrame'] || function (id){
			window.clearTimeout(id);
		} 
		return a(id);
	};

	window.Mobile = Mobile;
	
})(window, navigator);