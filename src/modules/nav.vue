<template>
    <nav id="topnav">
        <router-link to="/index">首页</router-link>
        <router-link to="/about">关于我</router-link>
        <router-link to="/newlist">慢生活</router-link>
        <router-link to="/share">模板分享</router-link>
        <router-link to="/new">模板主题</router-link>
    </nav>
</template>

<script type="text/javascript">
    export default {
        data(){
            return {}
        }
    }
</script>

<style lang="scss">
    /*#topnav {
        background: rgba(0,0,0,0.8); 
        height: 48px; 
        line-height: 48px; 
        padding-left: 80px;
        a {
            display: inline-block; 
            font-size: 18px; 
            color: #FFF; 
            padding: 0 20px; 
            transition: all 1s;
            &.hover,&.router-link-active{
                background: #e41635;
            }
        }
    }*/
    
</style>