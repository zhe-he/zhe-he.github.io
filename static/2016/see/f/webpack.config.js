const webpack = require("webpack");
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // 独立样式
const fs = require('fs');
const path = require('path');

const autoprefixer = require('autoprefixer');
// const pluginsText = new Date().toUTCString() + '\n\r * built by `zhe-he`';

const ASSETS = 'assets'; // 输出目录名
var commonJs = ['whatwg-fetch','js/lib/autosize.js','js/lib/fastclick.js'];
module.exports = {
	// 页面入口文件配置
	entry: {
		"index": commonJs.concat(['js/page/index.js'])
	},
	// 入口文件输出配置
	output: {
		publicPath: `${ASSETS}/`,
		path: path.resolve(__dirname, ASSETS),
		filename: 'js/[name].js' //[chunkhash]
	},
	// 插件项
	plugins: [
		new CommonsChunkPlugin({
			name: "common",
			minChunks: 3
		}),
		// new ExtractTextPlugin('/css/[name].css'), 	// 独立样式
		new CopyWebpackPlugin([
			{from: 'images/static/**/*'}
		])
	],
	module: {
		// jshint,代码优化时打开
		preLoaders: [
			/*{
				test: /\.js$/,
				loader: 'jshint',
				exclude: /node_modules|lib/        
			}*/
	    ],
		loaders: [
			{test: /\.html$/,exclude:/node_modules/,loader: 'pug'},
			{test: /\.js$/,exclude:/(node_modules|bower_components|lib)/,loader:'babel',query: {presets:['es2015']}},
			{test: /\.tsx?$/,exclude:/(node_modules)/,loader:'ts'},
			// {test: /\.css$/,exclude:/node_modules/,loader: ExtractTextPlugin.extract('style', 'css!postcss')},
			// {test: /\.(scss|sass)$/,exclude:/node_modules/,loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')},
			// {test: /\.less$/,exclude:/node_modules/,loader: ExtractTextPlugin.extract('style', 'css!postcss!less')},
			{test: /\.css$/,exclude:/node_modules/,loader: 'style!css!postcss'},
			{test: /\.(scss|sass)$/,exclude:/node_modules/,loader: 'style!css!postcss!sass'},
			{test: /\.less$/,exclude:/node_modules/,loader: 'style!css!postcss!less'},
			{test: /\.vue$/,exclude:/node_modules/,loader: 'vue'},
			{test: /\.(json|data)$/,exclude:/node_modules/,loader: 'json'},
			{test: /\.(txt|md)$/,exclude:/node_modules/,loader: 'raw'},
			{test: /\.(png|jpe?g|gif|ttf)$/,exclude:/node_modules/,loader: 'url?limit=8192&name=[path][name].[ext]?[hash]'}
		]
	},
	jshint: {
		"freeze": true, // 禁止覆盖本地对象
		"-W041": false,    // 忽略 === 与 == 的区别
		// "loopfunc": true, // 允许循环中使用函数
		"asi": true, 	// 允许省略行尾分号
		"esversion": 6, // 支持es6语法规则
		"elision": true, // 支持[1,,,3]
		"unused": true, // 警告未使用的定义对象
		"expr": true, 	// 可以使用表达式,某些[奇淫技巧]
		"lastsemic": true // 最后的分号可以省略
		// more see -> http://www.jshint.com/docs/options/
	},
	postcss: [ autoprefixer({ browsers: ['last 9 versions'], cascade: false }) ],
	// 其他配置
	resolve: {
		root: process.cwd(),
		extensions: ['', '.js', '.vue'],
		alias: {
			"zepto": 			'js/lib/zepto.min.js',
			"swiper": 		'js/components/swiper/swiper.js'
		}
	}
};