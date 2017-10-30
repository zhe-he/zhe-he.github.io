<template>
    <div class="box">
        <div class="page page1">1</div>
        <div class="page page2">2</div>
        <div ref="page3" class="page page3">
            <div :style="{transform:'translate3d(0,'+pageY+'px,0)',transition:transition}">
                <p v-for="k in test">
                    {{k}}
                </p>
            </div>
            
        </div>
        <div class="page page4">4</div>
    </div>
</template>

<script type="text/javascript">
    const isMobile = 'ontouchstart' in window;
    const touchstart = isMobile ? 'touchstart' : 'mousedown';
    const touchmove = isMobile ? 'touchmove' : 'mousemove';
    const touchend = isMobile ? 'touchend' : 'mouseup';
    export default {
        data(){
            return {
                test: 200,
                pageY: 0,
                transition: '0.6s'
            }
        },
        mounted(){
            this.$nextTick(()=>{
                this.fnPage3();
            });
        },
        methods: {
            fnPage3(){
                var oPage3 = this.$refs.page3;
                var startY,lastY,v;
                var nextDis = 200;
                var maxHeight = oPage3.children[0].offsetHeight - window.innerHeight;
                oPage3.addEventListener(touchstart,(ev)=>{
                    var touch = isMobile ? ev.targetTouches[0] : ev;
                    startY = touch.pageY;
                    lastY = this.pageY;
                    this.transition = '0s';
                },false);
                oPage3.addEventListener(touchmove,(ev)=>{
                    var touch = isMobile ? ev.targetTouches[0] : ev;
                    var disY = touch.pageY - startY;
                    this.pageY = lastY + disY;
                    v = disY;
                },false);
                oPage3.addEventListener(touchend,(/*ev*/)=>{
                    // var touch = isMobile ? ev.changedTouches[0] : ev;
                    this.transition = '.6s';

                    this.pageY += 2*v;
                    if (this.pageY > 0) {
                        if (this.pageY > nextDis) {
                            // pre
                        }
                        this.pageY = 0;
                    }
                    if (this.pageY < -maxHeight) {
                        if (this.pageY < -maxHeight-nextDis) {
                            // next
                        }
                        this.pageY = -maxHeight;
                    }
                },false);
            }
        }
    }
</script>

<style lang="scss">
    @import "../styles/home";
</style>