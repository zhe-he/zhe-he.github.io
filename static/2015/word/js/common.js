'use strict';

var myWeb = {};
myWeb.fn = {
	//仅为压缩 s
	getById: function(id) {
		return document.getElementById(id);
	},
	getByTagName: function(oParent, aChild) {
		return oParent.getElementsByTagName(aChild);
	},
	//仅为压缩 e
	//获取class
	getByClassName: function(oParent, sClass) {
		if (arguments.length === 1) {
			var sClass = arguments[0];
			var oParent = document;
		};
		if (oParent.getElementsByClassName) {
			return oParent.getElementsByClassName(sClass);
		} else {
			var aEl = oParent.getElementsByTagName("*");
			var arr=[];
			var re=new RegExp('\\b'+sClass+'\\b');
			for (var i = 0; i < aEl.length; i++) {
				if (re.test(aEl[i].className)) {
					arr.push(aEl[i]);
				};
			};
			return arr;
		}
	},
	//添加class
	addClass: 	function (obj, sClass){
		if(document.body.classList != null){
			obj.classList.add(sClass);
		}else{
			var re = new RegExp('\\b' + sClass + '\\b');
			if (!re.test(obj.className)){
				if (obj.className) {
					obj.className += ' '+sClass;
				}else{
					obj.className = sClass;
				};
			};
		}
	},
	//移除class
	removeClass: 	function (obj, sClass){
		if (document.body.classList != null) {
			obj.classList.remove(sClass);
		}else{
			var re = new RegExp('\\b' + sClass + '\\b');
			if (!re.test(obj.className)) return;
			var arr = obj.className.replace(re, '').match(/\S+/g);
			if (arr) {
				obj.className=arr.join(' ');
			}else{
				obj.className='';
				obj.removeAttribute('class');
			};
		};
	},
	//判断是否有class
	hasClass: 		function (obj, sClass){
		if (document.body.classList != null) {
			return obj.classList.contains(sClass);
		}else{
			var re = new RegExp('\\b' + sClass + '\\b');
			return re.test(obj.className);
		};
	},
	//绑定事件	
	on: function(obj, sEv, fn) {
		if (obj.addEventListener) {
			obj.addEventListener(sEv, fn, false)
		}else if (obj.attachEvent) {
			obj.attachEvent("on" + sEv, fn)
		}else{
			obj['on' + sEv] = fn;
		}
	},
	//取消事件	
	off: function (obj, sEv){
		if (obj.removeEventListener) {
			obj.removeEventListener(sEv, false);
		}else if (obj.detachEvent) {
			obj.detachEvent('on' + sEv);
		}else {
			obj['on' + sEv] = null;
		};
	},
	//获取样式
	getStyle: function(obj, attr) {
		return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr];
	},
	//简单运动框架
	move: function(obj, json, options) {
		options = options || {};
		options.time = options.time || 700;
		options.type = options.type || "ease-out";

		clearInterval(obj.timer);
		var start = {};
		var dis = {};

		for (var name in json) {
			if (name == "opacity") {
				start[name] = Math.round(parseFloat(myWeb.fn.getStyle(obj, name)) * 100)
			} else {
				start[name] = parseInt(myWeb.fn.getStyle(obj, name))
			}
			dis[name] = json[name] - start[name];
		}

		var n = 0;
		var count = Math.floor(options.time / 30);
		obj.timer = setInterval(function() {
			n++;
			for (var name in json) {
				switch (options.type) {
				case "linear":
					var v = n / count;
					var cur = start[name] + dis[name] * v;
					break;
				case "ease-in":
					var v = n / count;
					var cur = start[name] + dis[name] * v * v * v;
					break;
				case "ease-out":
					var v = 1 - n / count;
					var cur = start[name] + dis[name] * (1 - v * v * v);
					break;
				}
				if (name === "opacity") {
					obj.style.opacity = cur / 100;
					obj.style.filter = "alpha(opacity:" + cur + ")"
				} else {
					obj.style[name] = cur + "px";
				}
			}
			if (n === count) {
				clearInterval(obj.timer);
				options.end && options.end()
			}
		},
		30)
	},
	//滚轮
	addWheel: function(obj, Wheelfn) {
		var mouse = document.mozHidden==null?'mousewheel':'DOMMouseScroll';

		//此法绑定的fn，需用arguments.callee.caller解除
		function fn(ev) {
			var oEvent = ev || window.event;
			var down;
			down = ev.wheelDelta?-ev.wheelDelta:ev.detail*40;
			Wheelfn && Wheelfn(down);
			if (ev.preventDefault) {
				ev.preventDefault();
			}else{
				ev.returnValue = false;
			};
		}

		myWeb.fn.on(obj, mouse, fn)
	},
	//判断来源
	isChild: function(parent, child){
		if (typeof parent.contains == 'function') {
			//webkit < 522 低版本不作考虑
			return parent.contains(child)
		} else if (typeof parent.compareDocumentPosition == 'function') {
			return !!(parent.compareDocumentPosition(child) & 16)
		} else{
			var newParent = child.parentNode;
			do{
				if (newParent == parent) {
					return true
				}else {
					newParent = child.parentNode
				};
			}while(newParent !== null);
			return false;
		};
	},
	//获取元素在整个页面的位置
	getPos: function(obj) {
		var l = 0;
		var t = 0;
		while (obj) {
			l += obj.offsetLeft;
			t += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return {
			left: l,
			top: t
		}
	},
	//获取元素在可视区窗口的位置
	getBoundRect: function(element){
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
		if (element.getBoundingClientRect) {
			if (typeof arguments.callee.offset != 'number') {
				var temp = document.createElement('div');
				temp.cssText = "position: absolute; top: 0; left: 0;";
				document.body.appendChild(temp);
				arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
				document.body.removeChild(temp);
				temp = null;
			};
			var rect = element.getBoundingClientRect();
			var offset = arguments.callee.offset;
			return {
				top: 	rect.top + offset,
				left: 	rect.left + offset,
				right: 	rect.right + offset,
				bottom: rect.bottom + offset
			}
		}else{
			var rect = myWeb.fn.getPos(element);
			return {
				top: 	rect.top - scrollTop,
				left: 	rect.left - scrollLeft,
				right: 	rect.left - scrollLeft + element.offsetWidth,
				bottom: rect.top - scrollTop + element.offsetHeight
			}
		};
	},
	//ready 加载
	ready: function(readyFn) {
		var bReady=true;
		function f(){
			if(!bReady)return;
			try{
				document.documentElement.doScroll('left');
				bReady=false;	
				readyFn();		
			}catch(e){
				setTimeout(f,1);
			};	
		};
		if(document.addEventListener){	
			document.addEventListener('DOMContentLoaded',function(){
				if(!bReady)return;
				bReady=false;
				readyFn();			
			},false);
			
			window.addEventListener('load',function(){
				if(!bReady)return;
				bReady=false;	
				readyFn();
			},false);
			return;
		}else{
			//IE678
			document.attachEvent('onreadystatechange',function(){
				if(!bReady)return;
				if(document.readyState=='complete'){
					bReady=false;	
					readyFn();		
				};
			});
			window.attachEvent('onload',function(){
				if(!bReady)return;
				bReady=false;	
				readyFn();		
			});
			
			if(!window.frameElement)setTimeout(f,1);
			
		}
	}
};
