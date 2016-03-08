//调用 viewPort(navigator.userAgent,设计图给的尺寸，不传为750)
(function (){

var view_timer = null;
function viewPort(userAgent, pageWidth) {
    var oView = document.getElementById('viewport');
    //判断viewport是否存在，存在就移除掉（为onresize准备）
    if (oView) {
        document.head.removeChild(oView);
    }
    //设计尺寸的宽度，如果不给 默认为750
    if (!pageWidth) {
        pageWidth = 750;
    }
    var screen_w = parseInt(window.screen.width),
        scale = screen_w / pageWidth;
    if (/Android (\d+\.\d+)/.test(userAgent)) {
        var creat_meta = document.createElement('meta');
        creat_meta.name = 'viewport';
        creat_meta.id = 'viewport';
        var version = parseFloat(RegExp.$1);
        if (version > 2.3) {
            creat_meta.content = 'width=' + pageWidth + ', initial-scale = ' + scale + ',user-scalable=1, minimum-scale = ' + scale + ', maximum-scale = ' + scale + ', target-densitydpi=device-dpi';
        } else {
            creat_meta.content = 'width=' + pageWidth + ', target-densitydpi=device-dpi';
        }
        document.head.appendChild(creat_meta);
    } else {
        var creat_meta = document.createElement('meta');
        creat_meta.name = 'viewport';
        creat_meta.id = 'viewport';
        //检测横屏
        if(window.orientation=='-90' || window.orientation == '90'){
            //横屏的话用屏幕高度计算(iphone横屏下依然取出的是竖屏的宽度)
            scale = window.screen.height / pageWidth;
            creat_meta.content = 'width=' + pageWidth + ', initial-scale = ' + scale + ' ,minimum-scale = ' + scale + ', maximum-scale = ' + scale + ', user-scalable=no';
        }
        else{
            creat_meta.content = 'width=' + pageWidth + ', initial-scale = ' + scale + ' ,minimum-scale = ' + scale + ', maximum-scale = ' + scale + ', user-scalable=no';
        }
        document.head.appendChild(creat_meta);
    }
}
viewPort(navigator.userAgent);

window.onresize = function() {
    //添加定时器 解决大UC反应慢的问题、慢的问题、慢的问题（重要的事儿说三遍）!!!
    clearTimeout(view_timer);
    view_timer = setTimeout(function(){
        viewPort(navigator.userAgent);
    }, 300);
}

})();