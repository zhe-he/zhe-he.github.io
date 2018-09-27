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
                    repo: 'https://github.com/zhe-he/zhe-he.github.io/issues',
                    oauth: {
                        client_id: 'ec289dade103967c53a3',
                        client_secret: '726d51e54cfcda701e261d001774a9b8ec137cae'
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
    
