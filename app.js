const [express, bodyParser, multerLib, cookieParser, cookieSession, consolidate] = [require('express'), require('body-parser'), require('multer'), require('cookie-parser'), require('cookie-session'), require('consolidate')];

//服务器
var app = express();
app.listen(8888);

//配置上传目录
var multer=multerLib({dest:'upload'});

//配置模板引擎
app.set('views', 'template');
app.set('view engine', 'html');
app.engine('html', consolidate.ejs);

//使用中间件 
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer.any());
app.use(cookieParser());
app.use(cookieSession({
    name:'zhe-he',
    keys:['he','zhe','web'],
    maxAge: 15*60*1000
}));

//路由
// app.use('/',require('./router/index'));
// app.use('/about',require('./router/about'));
// app.use('/share',require('./router/share'));
// app.use('/newlist',require('./router/newlist'));
// app.use('/timeAxis',require('./router/timeAxis'));
// app.use('/messBoard',require('./router/messBoard'));
app.use('/swiper',require('./router/swiper'));


//静态资源
app.use(express.static('static'));

//404
app.use(function(req,res,err){
	var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
