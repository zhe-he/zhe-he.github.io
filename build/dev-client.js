var cp = require('child_process');

function start(){
    const p = cp.fork(__dirname + '/dev-server.js');
    p.on('message', function(data){
        if(data === 'restart'){
            p.kill('SIGINT');
            process.env.NODE_RESTART = "restart";
            start();
        }
    })
}
if(!process.send){
    start();
}