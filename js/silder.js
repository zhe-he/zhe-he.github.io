/*导航当前页高亮*/
(function (){
	var obj=null;
	var As=document.getElementById('topnav').getElementsByTagName('a');
	obj = As[0];
	for(i=1;i<As.length;i++){
		if(window.location.href.indexOf(As[i].href)>=0)
			obj=As[i];
		}
	obj.id='topnav_current';

	/*百度分享*/
	window._bd_share_config={
		"common":{
			"bdText": document.title,
			"bdPic": "",
			"bdUrl": window.location.href,
			"bdMini":"1",
			"bdMiniList":false,
			"bdStyle":"1",
			"bdSize":"32"
		}
	};
	with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
})();


