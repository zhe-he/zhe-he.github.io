const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pluginsText = new Date().toLocaleString() + '\n\r * built by `zhe-he`';

const DIST = 'www';
var srcVue = 'node_modules/vue/dist/vue.js';
var srcVuex = 'node_modules/vuex/dist/vuex.js';
var srcVueRouter = 'node_modules/vue-router/dist/vue-router.js';
if (process.env.NODE_ENV === 'production') {
    srcVue = srcVue.replace('vue.js','vue.min.js');
    srcVuex = srcVuex.replace('vuex.js','vuex.min.js');
    srcVueRouter = srcVueRouter.replace('vue-router.js','vue-router.min.js');
}

const cssLoader = [
    {loader:'style-loader'},
    {loader: 'css-loader'},
    {loader: 'postcss-loader'}
];
const vueSassConfig = 'css-loader!sass-loader';
module.exports = {
    // 页面入口文件配置
    entry: {
        "vendor": ['babel-polyfill'],
        "main": 'src/main.js'
    },
    // 入口文件输出配置
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, DIST),
        filename: 'js/[name].js',
        chunkFilename: 'js/chunk/[name].js?[hash]',
    },
    // 插件项
    plugins: [
        new ExtractTextPlugin("css/vueStyle.css"),
        new CopyWebpackPlugin([
            {from: 'images/tmp/**/*'},
            {from: srcVue, to: 'js/vue.js'},
            {from: srcVuex, to: 'js/vuex.js'},
            {from: srcVueRouter, to: 'js/vue-router.js'}
        ]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            favicon: 'favicon.ico',
            minify: {
                minimize: true,
                removeComments: true,
                collapseWhitespace: true
            },
            inject: "body",
            hash: true,
            chunks: ["vendor","main"],
            chunksSortMode: function (a, b) {
                var orders = ["vendor","main"];
                return orders.indexOf(a.names[0])-orders.indexOf(b.names[0]);
            }
        }),
    ],
    module: {
        rules: [
            { test: /\.html$/, use: ['html-loader'] },
            { test: /\.js$/, exclude: /node_modules|libs/, use: [{ loader:'babel-loader' }] },
            { test: /\.tsx?$/, use: [{ loader: 'ts-loader' }] },
            { test: /\.css$/, exclude: /libs/, use: cssLoader },
            { test: /\.(scss|sass)$/, use: cssLoader.concat({loader:'sass-loader'}) },
            { test: /\.(json|data)$/, use: ['json-loader'] },
            { test: /\.(txt|md)$/, use: ['raw-loader'] },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            cssModules: {
                                localIdentName: '[path][name]---[local]---[hash:base64:5]',
                                camelCase: true
                            },
                            loaders: {
                                scss: ExtractTextPlugin.extract({
                                    use: vueSassConfig,
                                    fallback: 'vue-style-loader'
                                }),
                                sass: ExtractTextPlugin.extract({
                                    use: `${vueSassConfig}?indentedSyntax`,
                                    fallback: 'vue-style-loader'
                                }),
                                css: ExtractTextPlugin.extract({
                                    use: 'css-loader',
                                    fallback: 'vue-style-loader'
                                }),
                                js: 'babel-loader'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                exclude: /tmp/,
                use: [
                    {
                        loader:'url-loader',
                        options: {
                            limit: 8192,
                            name: '[path][name].[ext]?[hash]'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                include: /tmp/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]?[hash]'
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|woff2?|svg|eot)$/,
                use: [
                    {
                        loader:'file-loader',
                        options: {
                            name: '[path][name].[ext]?[hash]'
                        }
                    }
                ]
            }
        ]
    },
    externals: {
        "vue": "Vue",
        "vuex": "Vuex",
        "vue-router": "VueRouter"
    },
    // 其他配置
    resolve: {
        modules: [
            process.cwd(),
            "node_modules"
        ],
        extensions: ['.ts','.js','.vue']
    }
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: false
        }),
        new webpack.BannerPlugin(pluginsText)
    ])
} else {
    module.exports.module.rules.unshift({
        test: /\.(js|vue)$/,
        exclude: /libs/,
        loader: "eslint-loader", 
        options: { 
            configFile:  path.resolve(__dirname, 'config/.eslintrc')
        },
        enforce: 'pre'
    })
}