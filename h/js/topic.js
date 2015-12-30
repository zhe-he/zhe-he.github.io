$(function (){
	//发表
	
	fn();
	function fn(){
		var $enter = $('.topic-top a').eq(1); 	// 发表按钮
		var $em = $('.topic-text li').eq(1); 	// 表情按钮
		var $con = $('.topic-text textarea'); 	// 文本内容负

		var $fileBox = $('.topic-file'); 		// 上传外层按钮
		var $show = $('.topic-imgshow'); 		// 显示图片的盒子

		window.Faces($em,$con);

		$enter.on('click', function (){
			// 提交
			var value = $con.val();
			if (!value.trim()) {
				alert('内容不能为空!');
				return false;
			};

			//以下ajax
			
		});

		// 表情菜单切换
		$em.on('click',function (){
			$('.topic-imgshow').removeClass('show');
		});
		// 上传图片菜单切换
		$('.topic-text li').eq(0).on('click',function (){
			$('.topic-imgshow').addClass('show');
			$('.topic-faces').removeClass('show');
		});


		// 删除图片
		$show.on('click','.close',function (){
			var parent = $(this).parent('.topic-file-item');
			$show.find('.topic-file-cell').eq(parent.index()).remove();
			parent.remove();
			$fileBox.css('display','block');
			$('#file').val('');

		});
		//上传图片
		$('#file').on('change', function () {
			lrz(this.files[0])
			    .then(function (rst) {
			        // 处理成功会执行
			    	var img = new Image();
			    	img.onload = function (){
			    		$fileBox.before('<div class="topic-file-cell"><img src="'+img.src+'" /></div>');
			    		$show.find('section').append('<div class="topic-file-item"><img src="'+img.src+'" /><a class="close" href="javascript:;"></a></div>');
			    		
			    		// 上传1张关闭上传按钮 --- 可以上传多张
			    		if($show.find('.topic-file-item').length==1){
			    			$fileBox.css('display','none');
			    		}
			    	}
			    	img.src = rst.base64;
			    })
			    .catch(function (err) {
			        // 处理失败会执行
			        alert('上传失败,请稍后重试!');
			    })
			    .always(function () {
			        // 不管是成功失败，都会执行
			    });
		});
	}

})