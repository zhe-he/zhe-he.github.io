const path = require('path');
const express = require('express');
const webpack = require('webpack');
const opn = require('opn');
const proxyMiddleware = require('http-proxy-middleware');
const webpackBase = require("./webpack.config.js");
var cfg = Object.assign(webpackBase, {
    devtool: "cheap-module-eval-source-map"
});

const port = process.argv[2]?process.argv[2].replace('--',''):4010;
const app = express();

cfg.plugins = (webpackBase.plugins || []).concat(
    new webpack.HotModuleReplacementPlugin()
);


//entry 
Object.getOwnPropertyNames((webpackBase.entry || {})).map(function (name) {
    if (name != 'vendor') {
        cfg.entry[name] = []
            .concat("webpack-hot-middleware/client")
            .concat(webpackBase.entry[name])
    }
});
var compiler = webpack(cfg);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackBase.output.publicPath,
    noInfo: true,
    stats: {
        colors: true,
        chunks: false
    }
});


var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})

app.use(require('connect-history-api-fallback')());
app.use(devMiddleware);
app.use(hotMiddleware);


module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    var url = 'http://localhost:' + port;
    console.log('Listening at ' + url + '\n')

    opn(url);
});