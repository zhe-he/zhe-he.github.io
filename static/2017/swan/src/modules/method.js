var u = window.navigator.userAgent;
const isIos = /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(u);
const isAndroid = /(Android|Linux)/i.test(u);
const isMobile = 'ontouchstart' in window;
const isWeixin = /MicroMessenger/i.test(navigator.userAgent);
const orientation = 'onorientationchange' in window ? 'orientationchange' : 'resize';  //横竖屏
const clone = (origin) => JSON.parse(JSON.stringify(origin));


export {
    isIos,
    isAndroid,
    isMobile,
    isWeixin,
    orientation,
    clone,
};