window.onload=function ()
{
	var oBox=document.getElementById('box');
	var oUl=oBox.children[0];
	var aLi=oUl.children;
	var aImg=oUl.getElementsByTagName('img');

	oBox.style.display='none';
	var oBg=document.getElementById('bg');
	var oProg=document.getElementById('prog');
	var oSpan=oProg.getElementsByTagName('span')[0];
	var oBar=document.getElementById('bar');
	var iImgCount=8;
	var iLoad=0;
	for (var i = 0; i < iImgCount; i++) {
		(function(i)
		{
			var oNewImg=new Image();
			oNewImg.onload=function()
			{
				oSpan.innerHTML=oBar.style.width=parseInt(100*(iLoad+1)/iImgCount)+'%';
				oNewImg.onload=null;
				aImg[i].src=this.src;
				if(++iLoad==iImgCount)onLoad();
			};
			if(i<5){
				oNewImg.src='img/'+(i+1)+'.jpg';
			}else{
				oNewImg.src='img/'+(i+1)+'.png';
			}
			
		})(i);
	};

	function onLoad()
	{
		for(i=0;i<iImgCount;i++)if(!aImg[i])alert('资源加载失败，请刷新重试');
		oProg.style.display=oBg.style.display='none';
		oBox.style.display='block';
		oUl.style.width=aLi[0].offsetWidth*aLi.length+'px';

		var oldWidth=aImg[0].offsetWidth,
			oldHeight=aImg[0].offsetHeight;

		oUl.onmousedown=function (ev)
		{
			var oEvent=ev || event;
			var disX=oEvent.clientX-oUl.offsetLeft;
			document.onmousemove=function (ev)
			{
				var oEvent=ev || event;
				var l=oEvent.clientX-disX;
				if(l>-0.5*aLi[0].offsetWidth+oBox.offsetWidth/2)l=-0.5*aLi[0].offsetWidth+oBox.offsetWidth/2;
				if(l<-(aLi.length-0.5)*aLi[0].offsetWidth+oBox.offsetWidth/2)l=-(aLi.length-0.5)*aLi[0].offsetWidth+oBox.offsetWidth/2;
				oUl.style.left=l+'px';
				setPos();
				
			};
			document.onmouseup=function ()
			{
				document.onmousemove=null;
				document.onmouseup=null;
				oUl.releaseCapture && oUl.releaseCapture();
			};
			oUl.setCapture && oUl.setCapture();
			return false;
		};
	
		function setCur (n)
		{
			oUl.style.left=-(n+0.5)*aLi[0].offsetWidth+oBox.offsetWidth/2+'px';
		};
		setCur(1);
		setPos();
		function setPos ()
		{
			for (var i = 0; i < aLi.length; i++) {
				var l=aLi[i].offsetLeft+oUl.offsetLeft+aLi[i].offsetWidth/2;
				var dis=Math.abs(l-oBox.offsetWidth/2);
				var scale=1-dis/800;
				if(scale<0.5)scale=0.5;
				aImg[i].style.width=oldWidth*scale*2+'px';
				aImg[i].style.height=oldHeight*scale*2+'px';
				aImg[i].style.marginTop=-(aImg[i].offsetHeight-oldHeight)/2+'px';
				aImg[i].style.marginLeft=-(aImg[i].offsetWidth-oldWidth)/2+'px';

				aLi[i].style.zIndex=parseInt(scale*10000);
				aLi[i].style.opacity=scale;
				aLi[i].style.filter='alpha(opacity:'+scale*100+')';

			};
		};

		/*for (var i = 0; i < aLi.length; i++) {
			aLi[i].index=i;
			aLi[i].onclick=function ()
			{
				setCur(this.index);
				setPos();
			};
		};*/
	};
};