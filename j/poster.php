<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,initial-scale=1.0">
    <meta content="yes" name="apple-mobile-web-app-capable">
    <meta content="black" name="apple-mobile-web-app-status-bar-style">
    <meta content="telephone=no" name="format-detection">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <link rel="stylesheet" type="text/css" href="css/reset.css">
    <!-- <link rel="stylesheet/less" type="text/css" href="css/poster.less">
    <script type="text/javascript" src="js/less.js"></script> -->
    <link rel="stylesheet" type="text/css" href="css/poster.css">

    <script type="text/javascript" src="js/fontsize.js"></script>
    <script type="text/javascript" src='js/poster/jquery-1.7.1.min.js'></script>
    <script type="text/javascript" src="js/jweixin-1.0.0.js"></script>
	<title>集团2015年度总结暨表彰大会</title>
</head>
<body>
    
    <div id="poster-con" class="
    <?php if($data['img']):?>
        hide
    <?php endif;?>
    ">
        <header class="poster-top">
            <img src="images/poster/logo.png" />
        </header>
        <article class="poster-con">
            <section class="poster-cell">
                <h2>输入你的名字</h2>
                <input type="text" class="poster-name" />
            </section>
            <section class="poster-cell">
                <h2>请上传你的照片</h2>
                <div class="poster-cameta">
                    <a href="javascript:;" class="poster-camera-show">
                        <div class="poster-camera-img">
                            <img class="default" src="images/poster/camera.png" />
                        </div>
                        <img class="poster-img-bg" src="images/poster/mask-demo-1.png" />
                        <input type="file" class="fileSelect" />
                    </a>
                    <nav class="poster-controller">
                        <a href="javascript:;">调整图片</a>
                        <a href="javascript:;">换一张<input type="file" class="fileSelect" /></a>
                    </nav>
                </div>
            </section>
            <section class="poster-cell">
                <h2>请选择文案颜色</h2>
                <nav class="poster-color">
                    <a class="active" href="javascript:;"><i></i></a>
                    <a href="javascript:;"><i></i></a>
                    <a href="javascript:;"><i></i></a>
                    <a href="javascript:;"><i></i></a>
                    <a href="javascript:;"><i></i></a>
                </nav>
            </section>
            <section class="poster-cell">
                <h2>请输入你的关键字</h2>
                <input tpye="text" class="poster-key" />
            </section>
            <section class="poster-cell">
                <h2>输入你的关键字解释(9字以内)</h2>
                <input type="text" class="poster-explain" />
            </section>
            <section class="poster-cell">
                <h2>输入你的年度感言(30字以内)</h2>
                <input type="text" class="poster-say" />
            </section>

        </article>
        <a class="poster-build" href="javascript:;">生成我的年度海报</a>
    </div>
	
	<!--处理图片 start -->
	<div id="mask-crop" class="mask-crop">
        <div class="crop-inner">
            <div class="crop_mask"><img src="images/poster/mask-demo-1.png"></div>
            <div class="crop" id="clipArea"></div>
            <div class="footer">
                <div class="control">
                    <a href="javascript:;" class="img-add"></a>
                    <a href="javascript:;" class="img-reduce"></a>
                    <div id="slider"></div>
                </div>
             
                <p class="btn"><a href="javascript:;" class="sure" id="clipBtn">确认</a></p>
            </div>
        </div>
    </div>
    <!--处理图片 end-->
    <!--制作完成 start-->
    <div class="poster-end poster-end1">
        <div class="poster-end-img">
            <div class="poster-end-box">
                <img src="images/poster/mask-demo-1.png" />
            </div>
            
        </div>
        <div class="poster-end-bottom">
            <nav class="poster-end-btn">
                <a class="js-cancel" href="javascript:;">取消重来</a>
                <a class="js-share" href="javascript:;">分享好友</a>
            </nav>
            <div class="poster-other"><span>*</span><p>参与者自愿上传自己的照片，若恶意上传明星照片涉嫌侵权或上传带有政治淫秽暴力反动等法律禁止的内容由上传人承担相应的法律责任。</p></div>
        </div>
        
    </div>
    <div class="poster-mask">
        <img src="images/poster/wx-mask.png" />
    </div>
    <!--制作完成 end-->

    
    <!--生成的图片 start  此处后台处理,如果是图片已生成，其他用户进来看
        请给此 div 添加class = "poster-end poster-end2 show",
        (如果希望更好，请给 最上面的<div id="poster-con">
        添加 class="hide",当然 不加也没事。)
    -->
    <div class="poster-end poster-end2 
    <?php if($data['img']):?>
        show
    <?php endif;?>
    ">
        <div class="poster-end-img">
            <div class="poster-end-box">
                <img src="<?php echo $data['img'];?>" /> <!--请修改此处的src-->
            </div>
           
        </div>
        <div class="poster-end-bottom">
            <nav class="poster-end-btn">
                <a href="index_v1.php">制作我的“年度字”海报</a>
            </nav>
            <div class="poster-other"><span>*</span><p>参与者自愿上传自己的照片，若恶意上传明星照片涉嫌侵权或上传带有政治淫秽暴力反动等法律禁止的内容由上传人承担相应的法律责任。</p></div>
        </div>
    </div>
    <!--生成的图片 end-->
    
    <input id="pic_id" type="hidden" name="pic" value="<?php echo $pid;?>" />
	<script src="js/poster/iscroll-zoom.js"></script>
	<script src="js/poster/hammer.min.js"></script>
	<script src="js/poster/nouislider.min.js"></script>
    <script src="js/fastclick.js"></script>
    <script src="js/layer/layer.js"></script>
	<script src="js/poster/poster_main.js?ver=<?php echo time().mt_rand(1111,99999);?>"></script>
    <script>
		// appId,timestamp,nonceStr,signature 请后台添加，谢谢
		var title='一个字总结我的2015';
		var desc='奋斗了365天，多少感悟在心中，有没有1个字，可以代表这一年？';
		var shareLink= window.location.href;+'?rt='+(Math.random()*1000)+'&act=poster';
        var sharePic='http://h5res.b0.upaiyun.com/spnh_one/logo.png';
		wx.config({
			debug: false,
			appId: "<?php echo $signPackage['appId'];?>",
			timestamp: "<?php echo $signPackage['timestamp'];?>",
			nonceStr: "<?php echo $signPackage['nonceStr'];?>",
			signature:"<?php echo $signPackage['signature'];?>",
			jsApiList: [
			'checkJsApi',
			'onMenuShareTimeline',
			'onMenuShareAppMessage',
			'onMenuShareQQ'
			]
		});
		wx.ready(function () {
			wx.checkJsApi({
				jsApiList: [
					'onMenuShareTimeline'
				],
				success: function (res) {
					var reslut=JSON.stringify(res);
					if(res.checkResult.onMenuShareTimeline==false){
						alert('请下载微信最新版，您当前版本将影响您使用本页面分享功能。');	
					}
				}
			});
		
			wx.onMenuShareTimeline({
			  title:title,
			  link: shareLink,
			  imgUrl: sharePic,
			  trigger: function (res) {
				// 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
				this.link= shareLink+'&pid='+window.document.getElementById('pic_id').value;
			  },
			  success: function (res) {	
				return;
			  },
			  fail: function (res) {
				alert('分享出错,网络繁忙,请尝试重新打开页面。~~');
			  }
			});
			wx.onMenuShareAppMessage({
				title: title,
				desc: desc,
				link: shareLink,
				imgUrl: sharePic,
				type: 'link', 
				dataUrl: '',
				trigger: function (res) {
					//this.title= window.document.getElementById('shareText').value;
					this.link= shareLink+'&pid='+window.document.getElementById('pic_id').value;
				},
				success: function () { 
					return;
				}
			});
			wx.onMenuShareQQ({
				title:title,
				desc: desc,
				link: shareLink,
				imgUrl: sharePic,
				trigger: function (res) {
					//this.title= window.document.getElementById('shareText').value;
					this.link= shareLink+'&pid='+window.document.getElementById('pic_id').value;
				},
				success: function () { 	
					return;
				}
			});
		
	});
    </script>
</body>
</html>