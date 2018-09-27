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
                    repo: 'zhe-he.github.io',
                    oauth: {
                        client_id: '527871f21f0e156b8c0e',
                        client_secret: '834bdee4f48a9b91a1ae9535b119f1deb859d824'
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
    
