/**
 * Created by zhe-he.
 */
const fs = require('fs');
const express=require('express');
const bodyParser=require('body-parser');
const multerLib=require('multer');
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');
const consolidate=require('consolidate');
// var multer=multerLib({dest:'upload'});

var app=express();
var port = process.argv[2]?process.argv[2].replace('--',''):3037;
app.listen(port);

//使用中间件
app.use(bodyParser.urlencoded({extended:false}));
// app.use(multer.any());
app.use(cookieParser());
app.use(cookieSession({
    name:'test-session',
    keys:['dev','test'],
    maxAge:20*60*1000
}));

// 接口
// get post file cookie session
// console.log(req.query,req.body,req.files,req.cookies,req.session);

//静态资源
app.use(express.static(__dirname));

//404
app.use(function(req,res){
	fs.readdir(__dirname+req.url, function (err,data){
		var strl = `<!DOCTYPE html>
				<html>
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,initial-scale=1.0">
				    <meta content="yes" name="apple-mobile-web-app-capable">
				    <meta content="black" name="apple-mobile-web-app-status-bar-style">
				    <meta content="telephone=no" name="format-detection">
					<title>大王你好</title>
				</head>
				<body>`;
		var strr = `</body></html>`;
		if (err) {
			res.status(404).send(strl+`<h1>大大大……大王，不好啦！找不到当前页面</h1>`+strr);
		}else{
			var str = '';
			var str2 = '恭迎大王大驾光临！';
			var i=0;
			if(req.url!='/'){
				str += `<li><b>恭 </b><a href="../">恭送大王</a></li>`;
				i=1;
			};
			data.forEach(function (name,index){
				str += `<li><b>${str2.charAt(index+i)||'　'} </b><a href="${req.url+name}">${name}</a></li>`;
			});
			res.send(strl+str+strr);
		};
	});
});


var child_process = require('child_process');
var cmd;
if (process.platform === 'win32') {
	cmd = 'start "%ProgramFiles%\Internet Explorer\iexplore.exe"';
} else if (process.platform === 'linux') {
	cmd = 'xdg-open';
} else if (process.platform === 'darwin') {
	cmd = 'open';
}
child_process.exec(`${cmd} "http:\/\/localhost:${port}"`);