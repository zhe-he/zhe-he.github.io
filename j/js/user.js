$(function (){
	//修改名字
	changeName();
	function changeName(){
		var $name = $('.change-name');
		var $btn = $('.change-img');
		$btn.on('click', function (){
			if($name.attr('disabled')=='disabled'){
				$name.get(0).removeAttribute('disabled');
				$name.focus();
			}else{
				fn();
			}
		});

		$name.on('keydown',function(e){
			// 回车
			if(e.keyCode == 13){
				fn();
			}
		});

		// 修改名字
		function fn(){
			var name = $name.val();
			if (!name.trim()) {
				alert('姓名不能为空！');
				return false;
			};
			$name.attr('disabled','disabled');

			$.ajax({
				url: 	'',
				data: 	{

				},
				dataType: 	'json',
				success: 	function (data){

				},
				error: 		function (){

				}
			})
		}
	}

	//修改图像
	$('#file2').on('change', function () {
		lrz(this.files[0])
		    .then(function (rst) {
		        // 处理成功会执行
		    	var img = new Image();
		    	img.onload = function (){
		    		$('.user-hot .file2I').attr('src',img.src);
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


	//我的消息动画
	myAniFn();
	function myAniFn(){
		var $item = $('.user-item h3');
		$item.on('click', function (){
			var $em = $(this).find('em');
			var $ul = $(this).next();
			var $li = $ul.find('li');
			var h = ($li.eq(0).height()+1)*$li.length;

			if ($em.hasClass('open')) {
				$em.removeClass('open');
				$ul.height(0);
			}else{
				$em.addClass('open');
				$ul.height(h);
			};
		});
	}
	
})