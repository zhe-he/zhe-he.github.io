<template>
    <div>
        <keep-alive v-if="$route.meta.keepAlive">
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        
        <msg :status="toast.status" :msg="toast.msg"></msg>
        <loading :status="loadStatus"></loading>
    </div>
</template>

<style lang="scss">
    @import "./styles/reset";
    @import "./styles/app";
    @import "./styles/media";
</style>
<script type="text/javascript">
    import 'gitment/style/default.css';

    import msg from './modules/msg';
    import loading from './modules/loading';
    import FastClick from 'fastclick';
    // import "./libs/autosize.js";
    import { mapState } from "vuex";

    export default {
        name: 'app',
        data (){
            return {

            }
        },
        computed: {
            ...mapState(["loadStatus","toast"])
        },
        created(){
            this.$nextTick(()=>{
                FastClick.attach(document.body);
            })
        },
        components: {
            msg,
            loading
        }
    }
</script>