const fs = require('fs');
const del = require('del');
const path = require('path');

var delArr = [];
fs.readdir(path.resolve(__dirname, '../'),(e, files) => {
    if (e) {
        console.log(e);
        return
    }
    files.forEach( name => {
        if (/^\d{8,12}\.zip$/.test(name)){  
            delArr.push(name);
        }
    });
    
    del(delArr).then(paths=>{
        console.log('Deleted files:\n', paths.join('\n'));
    });
});
