/* 
 * 此文件为模拟线上服务器
 */
 // 30（黑色）、31（红色）、32（绿色）、 33（黄色）、34（蓝色）、35（洋红）、36（青色）、37（白色）

const express=require('express');
const portfinder = require('portfinder');
const fs = require('fs');
const path = require('path');
const DIST = 'dist';
const opn = require('opn');
const app=express();
const staticPath = path.join(__dirname, '..', DIST, 'static');
const favicon = path.join(__dirname, '..', DIST, 'favicon.ico');

app.use('/static', express.static(staticPath));
app.use('/favicon.icon', express.static(favicon));

app.use((req,res) => {
    const file = path.join(__dirname, '..', DIST, 'index.html');
    fs.readFile(file, 'utf-8',(err, content) => {
        if (err) {
            console.log('\x1B[31mPlease execute \x1B[41m\x1B[37m\x1B[1mnpm run build\x1B[0m \x1B[31mfirst\x1B[0m');
            res.status(404).send('We cannot open \'index.html\' file.<br/>Maybe you need to pack it once');
        } else {
            res.set('Content-Type', 'text/html');
            res.send(content);
        }
    });

});
portfinder.getPortPromise().then(port => {
    app.listen(port);
    opn('http://localhost:'+port);
})