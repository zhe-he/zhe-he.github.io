const showLoad = (state,status) => {
	state.loadStatus = status || 1;
};

const hideLoad = state => {
    state.loadStatus = 0;
};

const showMsg = (state,msg) => {
    state.toast.status = 1;
    state.toast.msg = msg;
};

const setMsgTimer = (state,{fn}) => {
    clearTimeout(state.toast.timer);
    state.toast.timer = fn;
};

const hideMsg = (state) => {
    state.toast.status = 2;
};

export {
    showLoad,
    hideLoad,
    showMsg,
    setMsgTimer,
    hideMsg
}