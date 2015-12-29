$(function (){

	// 下拉加载
	addMore();
	$(window).on('scroll',addMore);


	var addMoreComeReady = false;
	var $content = $('.index-content');
	function addMore(){
		var H = document.documentElement.scrollHeight || document.body.scrollHeight;
	    var h = $(window).height() + $(window).scrollTop();

	    if (H - h < 10 && !addMoreComeReady){
	    	addMoreComeReady = true;

	    	$.ajax({
	    		url: 'other/1.txt',
	    		data: 	{},
	    		// dataType: 	'json',
	    		success:　	function(data){
	    			addMoreComeReady = false;
	    			data = JSON.parse(data); // 真正接口不用这样处理，删除即可
	    			
	    			if(data.status == "1"){
	    				var data2 = data.data;
	    				for (var i = 0; i < data2.length; i++) {
		    				var div = $('<a href="detail.html?id='+data2[i].id+'">\
								            <div class="index-hot">\
								                <img class="index-bg" src="images/bg1.png">\
								                <h3>'+data2[i].title+'</h3>\
								                <p>'+data2[i].content+'</p>\
								                <div class="index-hot-i">\
								                    <i class="hot-img"></i>\
								                    <span>'+data2[i].hot+'</span>\
								                </div>\
								                <div class="index-hot-line"></div>\
								            </div>\
								        </a>');
		    				$content.append(div);
		    				for (var j = 0; j < data2[i].child.length; j++) {
		    					var imgstr = data2[i].child[j].c_img_src?'<img class="index-item-img" src="'+data2[i].child[j].c_img_src+'"><div class="down-arrow"></div><div class="box-shadow"></div>':'<div class="box-shadow"></div>';

		    					var div2 = $('<a href="detail.html?id='+data2[i].id+'">\
									            <div class="index-item">\
									                <h3>'+data2[i].child[j].c_content+'</h3>'+imgstr+
									            '</div>\
									        </a>')
		    					$content.append(div2);
		    				};
	    				};
	    			}
	    		},
				error: 		function (a,b){
					addMoreComeReady = false;
					console.log('服务器错误');
				}
	    	})
	    }
	}
})
