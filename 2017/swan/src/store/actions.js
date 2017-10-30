const toast = ({commit},payload) => {
    var msg,time;
    if (typeof payload == "object") {
        msg = payload.msg;
        time = payload.time;
    }else{
        msg = payload;
    }
    commit("showMsg",msg);
    commit({
        type: "setMsgTimer",
        fn: setTimeout(()=>commit("hideMsg"),time||1500)
    });
};

export {
    toast
}