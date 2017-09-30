(function (){
	var hashArr = ["#page1","#page2","#page3","#page4"]; 		//hash列表
	var aPage = document.querySelectorAll("#content .page");
	var lastIndex = 0; 		//上一个元素index
	var lastEle = aPage[0] 	//上一个元素
	var oMeauArrow = document.getElementsByClassName('menuArrow')[0]; 	//菜单箭头
	var oMeau = document.getElementsByClassName('nav')[0]; 			//菜单
	var oMask = document.getElementsByClassName('mask')[0];			//蒙层


	window.addEventListener('hashchange', hashFn, false);

	hashFn();
	function hashFn(){
		var oHash = window.location.hash;
		var now = hashArr.indexOf(oHash);

		if (now !== -1) {
			//前进
			if (now > lastIndex) {
				lastEle.classList.remove('active');
				aPage[now].classList.add('active');
				aPage[now].classList.add('center');

				lastIndex = now;
				lastEle = aPage[now];

			//后退
			}else if(now < lastIndex) {
				lastEle.classList.remove('active');
				lastEle.classList.remove('center');
				aPage[now].classList.add('active');

				lastIndex = now;
				lastEle = aPage[now];
			};
		};
	}

	//弹出菜单
	oMeauArrow.addEventListener('click', function (){
		openMeau(true)
	}, false);

	//关闭菜单
	oMask.addEventListener('click', function (){
		openMeau(false)
	}, false);

	function openMeau(bool){
		var add = bool?'add':'remove';
		var remove = bool?'remove':'add';
		lastEle.classList[add]('right75');
		lastEle.classList[remove]('active');
		lastEle.classList[remove]('center');
		oMeau.classList[add]('active');
		oMeau.classList[add]('left25');
	}
})();