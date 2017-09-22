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

<style>
    @import "./styles/reset.scss";
    @import "./styles/index.scss";
    @import "./styles/base.css";
    @import "./styles/style.css";
    @import "./styles/media.css";
</style>
<script type="text/javascript">
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