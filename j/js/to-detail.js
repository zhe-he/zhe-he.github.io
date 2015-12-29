$(function (){
	//发表
	joinTopic();
	function joinTopic(){
		var $enter = $('.to-detail-enter');
		var $em = $('.to-detail-em');
		var $con = $('.to-detail-con');

		window.Faces($em,$con);

		var to_user_id='', to_user='';
		$('.to-detail-say').on('click',function (){
			to_user = $(this).attr('data-user');
			to_user_id = $(this).attr('data-user_id');

			$con.val('回复：'+to_user+' ');
			$con.focus();
		});


		$enter.on('click', function (){
			// 提交
			var value = $con.val();
			if (!value.trim()) {
				alert('内容不能为空!');
				return false;
			};

			$.ajax({
				url: 	'other/4.txt',
				data: 	{
					to_user_id: 	to_user_id,
					c_id: 		$('.to-detail-item').attr('data-c_id')
				},
				type: 	'post'
			})
		})
	}
	
	//点击动画
	$('.to-detail-content').on('click', '.ui-tiled li a', function (){
		var parent_id = $(this).parents('.to-detail-item').attr('data-c_id');

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
			$(this).parents('.to-detail-item').children(':nth-child(2)').append(gif);
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