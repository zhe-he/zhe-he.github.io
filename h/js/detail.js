$(function (){
	
	// 加载更多
	addMore();
	$(window).on('scroll',addMore);

	var addMoreComeReady = false;
	var $content = $('.detail-content');
	function addMore(){
		var H = document.documentElement.scrollHeight || document.body.scrollHeight;
	    var h = $(window).height() + $(window).scrollTop();

	    if (H - h < 10 && !addMoreComeReady){
	    	addMoreComeReady = true;
			$.ajax({
				url: 	"other/2.txt",
				data: 	{},
				// dataType: 	"json",
				success: 	function (data){
					addMoreComeReady = false;
	    			data = JSON.parse(data); // 真正接口不用这样处理，删除即可
	    			
	    			if(data.status == "1"){
	    				var data2 = data.data;
	    				for (var i = 0; i < data2.length; i++) {
	    					var imgStr = data2[i].c_img_src?'<img src="'+data2[i].c_img_src+'"><div class="box-shadow"></div>':'';
		    				var numStr = (data2[i].message_num&&data2[i].message_num!=0)?'...':'';
		    				var div = $('<div data-c_id="'+data2[i].c_id+'" class="detail-item">\
									        <div class="shadow-t"></div>\
									        <img class="detail-item-bg" src="images/bg1-r.png">\
									        <div class="detail-i-con clearfix">\
									            <div class="detail-l">\
									                <img src="'+data2[i].user_src+'">\
									            </div>\
									            <div class="detail-r">\
									                <h3>'+data2[i].username+'</h3>\
									                <p>'+data2[i].c_content+'</p>\
									            </div>\
									            <div class="detail-t"><i class="color-png"></i><span>'+data2[i].color+'</span></div>\
									        </div>\
									        <div class="detail-i-img">'
									            + imgStr + 
									            '<ul class="ui-tiled">\
									                <li><a href="javascript:;"><i></i><span>'+numFn(data2[i].wa)+'</span></a></li>\
									                <li><a href="javascript:;"><i></i><span>'+numFn(data2[i].ca)+'</span></a></li>\
									                <li><a href="javascript:;"><i></i><span>'+numFn(data2[i].qie)+'</span></a></li>\
									            </ul>\
									        </div>\
									        <div class="detail-message">\
									            <div class="js-message">\
									                <i data-num="'+data2[i].message_num+'" data-href="to-detail.html?c_id='+data2[i].c_id+'">'+numStr+'</i>\
									            </div>\
									        </div>\
									    </div> ');
		    				$content.append(div);
	    				};

	    				// 处理大于99的数字
	    				function numFn(num){
	    					return num>99?'99<sup>+</sup>':num;
	    				}
	    			}
				},
				error: 		function (a,b){
					addMoreComeReady = false;
					console.log('服务器错误');
				}
			})
		}
	}

	//点击留言
	$content.on('click', '.detail-item .js-message', function (){
		var $i = $(this).find('i');
		var num = $i.attr('data-num');
		if($i.hasClass('show') || num == '0'){
			window.location.href = $i.attr('data-href');
		}else{
			$i.addClass('show');
			$i.html(num);
		}
	});


	//点击动画
	$content.on('click', '.ui-tiled li a', function (){
		var parent_id = $(this).parents('.detail-item').attr('data-c_id');

		var $i = $(this).find('i');
		var $num = $(this).find('span');
		var typeArr = ["wa","ca","qie"];
		var index = $(this).parent().index();

		if ($i.hasClass('active')) {
			// 已经点赞过一次
			
			$i.removeClass('active');
			setTimeout(function (){
				$i.addClass('active');
			},0)
			
		}else{
			// 点赞 +1
			$i.addClass('active');
			var num = $num.text();
			if (num == '99+' || num == '99') {
				num = '99<sup>+</sup>';
			}else{
				num++;
			};
			$num.html(num);

			// 动画
			var gif = $('<img id="js-flower" src="images/flower.gif">');
			$(this).parents('.detail-i-img').append(gif);
			setTimeout(function (){
				gif.remove();
			},2000);

			$.ajax({
				url: 	'other/3.txt',
				data: 	{
					c_id: 	parent_id,
					type:　	typeArr[index]
				},
				type: 	'post'
			})
		};
		
	});

})