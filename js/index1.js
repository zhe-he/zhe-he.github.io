myWeb.fn.hoverDir = function(obj, mouse) {
	var x = obj.offsetLeft + obj.offsetWidth / 2 - mouse.clientX;
	var y = obj.offsetTop + obj.offsetHeight / 2 - mouse.clientY;
	return Math.round((Math.atan2(y, x) * 180 / Math.PI + 180) / 90) % 4
};
myWeb.effect = {
	fnHeight: function() {
		var allWidth = myWeb.fn.getByClassName(document, "gWidth");
		for (var i = 0; i < allWidth.length; i++) {
			allWidth[i].style.height = document.documentElement.clientHeight + "px"
		}
	},
	loading: function() {
		var arrImg = ["img/load1.png", "img/load2.png", "img/accordion.jpg", "img/bg5.jpg", "img/bg1.jpg", "img/bg2.jpg", "img/bg3.jpg", "img/desktop.jpg", "img/magnifier.jpg", "img/title.png", "img/bg6.jpg", "img/dot1.png", "img/more.png", "img/waterfall.jpg", "img/block.jpg", "img/email.png", "img/photo.jpg", "img/word.png", "img/box.png", "img/face.png", "img/qq.png", "img/apple.jpg", "img/box01_bg.png", "img/face2.png", "img/skill.jpg", "img/box01_bg2.png", "img/find.png", "img/skill.png", "img/clock.jpg", "img/tab.jpg", "img/demo.png", "img/tel.png"];
		var oLoad = myWeb.fn.getById("load");
		var oBox = myWeb.fn.getById("all_box");
		var aLi = oBox.children[1].children;
		var oBar = myWeb.fn.getById("bar");
		var oSpan = oBar.children[0];
		var iNow = 0;
		for (var i = 0; i < arrImg.length; i++) {
			var oImg = new Image();
			oImg.onload = function() {
				iNow++;
				oSpan.style.width = 100 * iNow / arrImg.length + "%";
				if (iNow == arrImg.length - 1) {
					oLoad.style.display = "none";
					oBox.style.display = "block";
					myWeb.fn.move(aLi[1], {
						top: 300,	///////////////////////////////////
						opacity: 100
					},
					{
						end: function() {
							myWeb.fn.move(aLi[0], {
								width: 800,
								marginLeft: -400
							},
							{
								end: function() {
									myWeb.fn.move(aLi[0], {
										width: 547,
										marginLeft: -277
									})
								}
							})
						}
					})
				}
			};
			oImg.src = arrImg[i]
		}
	},
	nav: function() {
		var oBox = myWeb.fn.getById("all_box");
		var oUl = myWeb.fn.getById("nav");
		var aLi = oUl.children;
		var aSpan = myWeb.fn.getByTagName(oUl, "span");
		var timer = null;
		var iNow = 0;
		var Ready = true;
		//clearInterval(timer);
		for (var i = 0; i < aLi.length; i++) { (function(index) {
				aLi[i].onclick = function() {
					clearInterval(timer);
					for (var j = 0; j < aLi.length; j++) {
						aLi[j].className = ""
					}
					this.className = "active";
					timer = setInterval(function() {
						var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
						var h = (oBox.children[1].offsetHeight * index - scrollTop) / 8;
						h = h > 0 ? Math.ceil(h) : Math.floor(h);
						if (oBox.children[1].offsetHeight * index == scrollTop) {
							clearInterval(timer)
						} else {
							scrollTop += h;
							document.documentElement.scrollTop = document.body.scrollTop = scrollTop;
							iNow = index
						}
					},
					30)
				};
				aLi[i].onmouseover = function() {
					for (var j = 0; j < aSpan.length; j++) {
						myWeb.fn.move(aSpan[j], {
							opacity: 0
						})
					}
					myWeb.fn.move(aSpan[index], {
						opacity: 100
					})
				};
				aLi[i].onmouseout = function() {
					myWeb.fn.move(aSpan[index], {
						opacity: 0
					})
				}
			})(i)
		}
		function scrollFn() {
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			var h = (oBox.children[1].offsetHeight * iNow - scrollTop) / 8;
			h = h > 0 ? Math.ceil(h) : Math.floor(h);
			if (oBox.children[1].offsetHeight * iNow == scrollTop) {
				clearInterval(timer)
			} else {
				scrollTop += h;
				document.documentElement.scrollTop = document.body.scrollTop = scrollTop;
				Ready = true
			}
		}
		myWeb.fn.addWheel(document,
		function(h) {
			if (h>0) {
				clearInterval(timer);
				if (Ready) {
					iNow++;
					if (iNow > 5) {
						iNow = 5
					} else {
						Ready = false;
						for (var i = 0; i < aLi.length; i++) {
							aLi[i].className = ""
						}
						aLi[iNow].className = "active"
					}
				}
				timer = setInterval(scrollFn, 30);
				if (iNow > oBox.children.length - 2) {
					iNow = oBox.children.length - 2
				}
			} else {
				clearInterval(timer);
				if (Ready) {
					iNow--;
					if (iNow < 0) {
						iNow = 0
					} else {
						Ready = false;
						for (var i = 0; i < aLi.length; i++) {
							aLi[i].className = ""
						}
						aLi[iNow].className = "active"
					}
				}
				timer = setInterval(scrollFn, 30);
				if (iNow < 0) {
					iNow = 0
				}
			}
		})
	},
	allBox: function() {
		var oBox = myWeb.fn.getById("all_box");
		var allWidth = myWeb.fn.getByClassName(oBox, "gWidth");
		var oBg = allWidth[0].children;
		var oFace = allWidth[1].children;
		var oRoad = myWeb.fn.getById("road");
		var aDot = myWeb.fn.getByClassName(oRoad, "dot");
		var oUl = myWeb.fn.getById("character_box");
		var aLi = myWeb.fn.getById("skill_box").children;
		var oDemo = myWeb.fn.getById("demo_box");
		var aShowLi = oDemo.children;
		var oSpan = myWeb.fn.getByTagName(oDemo, "span");
		var oTell = myWeb.fn.getById("link");
		var oFind = myWeb.fn.getById("find");
		window.onscroll = function() {
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			var h = oBox.children[1].offsetHeight;
			function scrollFn() {
				oBg[1].style.top = "600px";
				oFace[1].style.bottom = "-100%";
				oFace[2].style.bottom = "-100%"
			}
			if (scrollTop == 0) {
				scrollFn();
				myWeb.fn.move(oBg[1], {
					top: 300,
					opacity: 100
				},
				{
					end: function() {
						myWeb.fn.move(oBg[0], {
							width: 800,
							marginLeft: -400
						},
						{
							end: function() {
								myWeb.fn.move(oBg[0], {
									width: 547,
									marginLeft: -277
								})
							}
						})
					}
				})
			}
			if (scrollTop == h) {
				scrollFn();
				myWeb.fn.move(oFace[0], {
					top: 0
				},
				{
					type: "ease"
				});
				myWeb.fn.move(oFace[1], {
					bottom: 0
				},
				{
					type: "ease"
				});
				myWeb.fn.move(oFace[2], {
					bottom: 0
				})
			}
			if (scrollTop == h * 2) {
				scrollFn();
				myWeb.fn.move(oRoad, {
					width: 1000
				},
				{
					end: function() {
						for (var i = 0; i < aDot.length; i++) {
							myWeb.fn.move(aDot[i], {
								opacity: 100
							},
							{
								end: function() {
									myWeb.fn.move(oUl, {
										width: 960
									},
									{
										type: "linear"
									})
								}
							})
						}
					}
				})
			}
			if (scrollTop == h * 3) {
				scrollFn();
				var iNow = 0;
				var timer = setInterval(function() {
					myWeb.fn.move(aLi[iNow], {
						opacity: 100
					});
					iNow++;
					if (iNow == aLi.length) {
						clearInterval(timer)
					}
				},
				300)
			}
			if (scrollTop == h * 4) {
				scrollFn();
				
			}
			if (scrollTop == h * 5 - 2) {
				scrollFn();
				myWeb.fn.move(oFind, {
					bottom: 70
				},
				{
					end: function() {
						myWeb.fn.move(oTell, {
							top: 0
						})
					}
				})
			}
		}
	},
	contextMenu: function() {
		document.oncontextmenu = function() {
			return false
		}
	}
};

window.onload = function() {
	myWeb.effect.fnHeight();
	myWeb.effect.loading();
	myWeb.effect.nav();
	myWeb.effect.allBox();
	//myWeb.effect.contextMenu()
};