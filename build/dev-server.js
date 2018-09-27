const path = require('path');
const express = require('express');
const webpack = require('webpack');
const opn = require('opn');
const proxyMiddleware = require('http-proxy-middleware');
const webpackBase = require("./index");
const portfinder = require('portfinder');
var config = Object.assign(webpackBase, {
    devtool: "cheap-module-eval-source-map"
});

const app = express();

config.plugins = (webpackBase.plugins || []).concat(
    new webpack.HotModuleReplacementPlugin()
);

// other file change
var chokidar = require('chokidar');
chokidar.watch(__dirname+ '/index.js').on('change', function(){
    process.send('restart');
})

//entry
Object.getOwnPropertyNames((webpackBase.entry || {})).map(function (name) {
    config.entry[name] = []
        .concat("webpack-hot-middleware/client")
        .concat(webpackBase.entry[name])
});
var compiler = webpack(config);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackBase.output.publicPath,
    noInfo: true,
    hot: true,
    stats: {
        colors: true,
        chunks: false
    }
});

var hotMiddleware = require('webpack-hot-middleware')(compiler)

app.use(require('connect-history-api-fallback')());
app.use(devMiddleware);
app.use(hotMiddleware);

module.exports = new Promise((reslove, reject) => {
    portfinder.getPortPromise().then(port => {
        app.listen(port, function(err) {
            if (err) {
                console.log('\x1B[31m', err)
                return
            }
            var url = 'http://localhost:' + port;
            console.log('Listening at ' + url + '\n')
            if (process.env.NODE_RESTART !== "restart") {
                opn(url);
            }
        });
        reslove(app);
    }).catch(e => {
        reject(e);
    })
});
