const fs = require('fs');
const del = require('del');

var delArr = [];
fs.readdir('./',(e,files)=>{
    if (e) {
        console.log(e)
        return ;
    }
    for(let name of files){
        if (/^\d{8,10}\.zip$/.test(name)){  
            delArr.push(name);
        }
    }
    
    del(delArr).then(paths=>{
        console.log('Deleted files:\n', paths.join('\n'));
    });
});
