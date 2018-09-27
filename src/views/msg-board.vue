<template>
    <div class="ibody">
        <common-nav></common-nav>
        <article class="main-l">
            <h2 class="about_h">您现在的位置是：<router-link to="/">首页</router-link>> <span>留言板</span></h2>
            <div id="messBoard">
                
            </div>
        </article>
        <common-aside></common-aside>
        <div class="clear"></div>
    </div>
</template>

<script type="text/javascript">
    import Gitment from 'gitment'

    export default {
        data(){
            return {}
        },
        mounted(){
            this.$nextTick(() => {
                var gitment = new Gitment({
                    id: 1,
                    owner: 'zhe-he',
                    repo: 'https://github.com/zhe-he/zhe-he.github.io/issues/1',
                    oauth: {
                        client_id: 'b90faff48aa630a47352',
                        client_secret: 'd7bc7ca7fcbcfe0bc08deb099c229eea2c9b8353'
                    }
                })
                gitment.render('messBoard')
            });
        }
    }
</script>

<style type="text/css">
    #messBoard{
        margin: 20px;
    }
</style>
    
