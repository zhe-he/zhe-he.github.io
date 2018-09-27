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

<script type="text/javascript">
    import Msg from '@/components/msg/msg'
    import Loading from '@/components/loading/loading'
    import { mapState } from "vuex";

    export default {
        data (){
            return {
            }
        },
        computed: {
            ...mapState(["loadStatus", "toast"])
        },
        components: {
            Msg,
            Loading
        }
    }
</script>