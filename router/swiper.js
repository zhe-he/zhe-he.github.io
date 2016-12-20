const express=require('express');
var router=express.Router();
module.exports=router;


router.get('/',function(req,res){
    res.render('swiper',{
        
    });
});
router.get('/t',function(req,res){
    res.render('swiper2',{
        
    });
});


// 接口
router.get('/getData',function(req,res){
	//type page
	var json = {};
	var type = req.query.type;
	var page = req.query.page;
	json.data = [];
	if (page>(3+3*Math.random()|0) || type==undefined || page==undefined) {
		json.message = "无数据";
	}else{
		var t = (4+Math.random()*4|0);
		for (var i = 0; i < t; i++) {
			json.data[i] = {
				title: `标题--分类为${type}第${page}页第${i}条数据`,
				content: `内容--分类为${type}第${page}页第${i}条数据，分类为${type}第${page}页第${i}条数据，分类为${type}第${page}页第${i}条数据，分类为${type}第${page}页第${i}条数据，分类为${type}第${page}页第${i}条数据，分类为${type}第${page}页第${i}条数据`
			}
		};
	};
	setTimeout(function (){
		res.send(json);
	},(700+1500*Math.random()));
});