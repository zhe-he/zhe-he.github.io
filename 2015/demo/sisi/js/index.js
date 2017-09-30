$(function (){
	var mySwiper = new Swiper('.swiper-container',{
		effect : 'cube',
		cube: {
		  slideShadows: true,
		  shadow: true,
		  shadowOffset: 100,
		  shadowScale: 0.6
		}
	});

	var $aA = $('.swiper-slide > nav > a');
	$aA.on('click', function (){
		mySwiper.slideNext();
	});
	var $last = $('.swiper-end > nav > a');
	$last.on('click', function (){
		switch($(this).index()){
			case 0:
				alert('么么哒,思思开心就好');
				break;
			case 1:
				alert('^_^');
				break;
			case 2:
				alert('桑心~');
				break;
		}
	});
	var $s = $('.swiper-slide');
	for (var i = 0; i < $s.length-1; i++) {
		base($s.eq(i));
	};
	
	function base($s){
		var $title = $s.find('header > h2');
		var $p = $s.find('nav > a i');
		var $input = $s.find('footer > input');
		$input.eq(0).on('keyup', function (){
			$title.text($(this).val())
		}).on('blur',function (){
			$title.text($(this).val())
		});
		for (var i = 1; i < $input.length; i++) {
			(function (i){
				$input.eq(i).on('keyup', function (){
					$p.eq(i-1).text($(this).val());
				}).on('blur',function (){
					$p.eq(i-1).text($(this).val())
				});
			})(i);
		};
	}

});