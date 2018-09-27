<template>
    <div class="box">
        <div :class="['page','page1',showPage==1?'show':'']">
            <p class="logo1"></p>
            <p class="logo2"></p>
            <a class="come1" @click="showPage=2" href="javascript:;"></a>
            <p class="font1"></p>
            <p class="font2"></p>
        </div>
        <div ref="page2" :class="['page','page2',showPage==2?'show':'']">
            <div class="page2-main" :style="{transform:'translate3d(0,'+pageY+'px,0)',transition:transition}">
                <div class="btn open"><a @click="showPage=1" class="javascript:;"></a></div>
                <div v-for="i in 4" :key="i">
                    <div :class="['list','list'+i]"></div>
                    <div :class="['detail','detail'+i]"></div>
                </div>
                
                <div class="list5"></div>
                <div class="detail5"></div>

                <div class="say1"></div>
                <div class="say2"></div>

                <div class="btn come2"><a @click="showPage=3" class="javascript:;"></a></div>
            </div>
        </div>
        <div :class="['page','page3',showPage==3?'show':'']">
            <div class="swiper-container" :style="{height:height+'px'}">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <p></p>
                        <aside></aside>
                        <p></p>
                        <aside></aside>
                        <p></p>
                        <aside></aside>
                    </div>
                    <div class="swiper-slide">
                        <p></p>
                        <aside></aside>
                        <p></p>
                        <aside></aside>
                        <p></p>
                        <aside></aside>
                    </div>
                    <div class="swiper-slide">
                        <div class="end1"></div>
                        <div class="end2"></div>
                        <div class="rect">
                            <a href="tel:0757-23886666"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import "swiper/dist/css/swiper.min.css";
    import Swiper from "swiper";
    const isMobile = 'ontouchstart' in window;
    const touchstart = isMobile ? 'touchstart' : 'mousedown';
    const touchmove = isMobile ? 'touchmove' : 'mousemove';
    const touchend = isMobile ? 'touchend' : 'mouseup';
    export default {
        data(){
            return {
                showPage: 1,
                pageY: 0,
                transition: '0.6s',
                height: window.innerHeight,

            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.fnPage2();
                this.fnPage3();
            });
        },
        methods: {
            fnPage2(){
                var oPage2 = this.$refs.page2;
                var startY,lastY,v;
                var nextDis = 200;
                var maxHeight = oPage2.children[0].offsetHeight - window.innerHeight;
                oPage2.addEventListener(touchstart,(ev)=>{
                    var touch = isMobile ? ev.targetTouches[0] : ev;
                    startY = touch.pageY;
                    lastY = this.pageY;
                    this.transition = '0s';
                },false);
                oPage2.addEventListener(touchmove,(ev)=>{
                    var touch = isMobile ? ev.targetTouches[0] : ev;
                    var disY = touch.pageY - startY;
                    this.pageY = lastY + disY;
                    v = disY;
                },false);
                oPage2.addEventListener(touchend,(/*ev*/)=>{
                    // var touch = isMobile ? ev.changedTouches[0] : ev;
                    this.transition = '.6s';

                    this.pageY += 2*v;
                    if (this.pageY > 0) {
                        if (this.pageY > nextDis) {
                            // pre
                            // this.showPage = 1;
                        }
                        this.pageY = 0;
                    }
                    if (this.pageY < -maxHeight) {
                        if (this.pageY < -maxHeight-nextDis) {
                            // next
                            // this.showPage = 3;
                        }
                        this.pageY = -maxHeight;
                    }
                },false);
            },
            fnPage3(){
                new Swiper('.swiper-container', {
                    direction : 'vertical'
                })
            }
        }
    }
</script>

<style lang="scss">
    @import "../styles/home";
</style>