const fs = require('fs');
const archiver = require('archiver');

var toDou = n=>n<10?'0'+n:''+n;

var date = new Date();
var name = date.getFullYear()+toDou(date.getMonth()+1)+toDou(date.getDate());
var output = fs.createWriteStream(`${name}.zip`);
var archive = archiver('zip',{store: true});


output.on('close',()=>{
    console.log(archive.pointer()+' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
});
archive.on('error',err=>{
    throw err;
});

archive.pipe(output);
archive.directory('www','/');
archive.finalize();