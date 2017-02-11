var webpack = require('webpack');
var path = require("path");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var TransferWebpackPlugin = require('transfer-webpack-plugin');

var commonJs = ['js/lib/autosize.js','js/lib/fastclick.js'];
var pluginsText = new Date().toUTCString() + '\n\r * built by `zhe-he`';
module.exports = {
	// 页面入口文件配置
	entry: {
		index: 		 	commonJs.concat('js/page/index.js') 	// 首页
	},
	// 入口文件输出配置
	output: {
		publicPath: 'assets/', //cdn
		path: path.resolve(__dirname,'assets'),
		filename: 'js/[name].js' //-[chunkhash]
	},
	// 插件项
	plugins: [
		new CommonsChunkPlugin("js/common.js"),
		new webpack.BannerPlugin(pluginsText),
		new TransferWebpackPlugin([
	      {from: 'images/static', to: 'images/static'}
	    ])
	],
	module: {
		// 加载器配置
		loaders: [
			{test: /\.css$/, loader: 'style-loader!css-loader'},
			{test: /\.js$/,exclude: /(node_modules|bower_components)/,loader: 'babel-loader?presets[]=es2015'},
			{test: /\.scss$/, loader: 'style!css!sass'},
			{
				test: /\.(png|jpg)$/, 
				loader: 'url-loader?limit=8192&name=[path][name].[ext]' //[hash]
			}
		]
	},
	// 其他解决方案配置
	resolve: {
		root: process.cwd(),
		extensions: ['', '.js', '.jsx'],//自动扩展文件后缀名
		alias: {
			zepto: 			'js/lib/zepto.min.js',
			swiper: 		'js/components/swiper/swiper.js'
		}
	}
};