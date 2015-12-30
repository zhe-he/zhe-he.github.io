(function (){
    function Faces($btn,$content){
        // 创建i 21*5
        var $li = $('.ui-slider-content li');
        var $box = $('.topic-faces');
        for (var j = 0; j < 5; j++) {
            for (var i = 0; i < 21; i++) {
                var index= i+20*j;
                if (i === 20) {
                    index = -1;
                };
                $li.eq(j).append($('<i index='+index+'></i>'));
            };
        };

        var slider = new fz.Scroll('.ui-slider', {
            role: 'slider',
            indicator: true,
            autoplay: false
        });
        
        

        $btn.on('click', function (){
            if ($box.hasClass('show')) {
                $box.removeClass('show');
            }else{
                $box.addClass('show');
            };
        });
        $content.on('focus',function (){
            $box.removeClass('show');
        });

        $li.on('click','i',function (){
            var index = $(this).attr('index');
            var str = $content.val();
            if (index != -1) {
                $content.val(str+='[emot'+index+']');
            }else{
                // 删除上一个表情
                if (/\[emot(\d+)?\]$/.test(str)) {
                    $content.val(str.substring(0,str.lastIndexOf('[')));
                }else{
                // 删除上一个文字
                    $content.val(str.substring(0,str.length-1));   
                };
            };
        });
    }

    window.Faces = Faces;
})();