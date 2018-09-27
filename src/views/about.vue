<template>
    <div class="ibody">
        <common-nav></common-nav>
        <article class="main-l">
            <h2 class="about_h">您现在的位置是：<router-link to="/">首页</router-link>> <span>关于我</span></h2>
            <div class="about">
                <h2>Just about me</h2>
                <ul>
                    <p>个人介绍个人介绍个人介绍</p>
                </ul>
                <h2>About my blog</h2>
                <ul class="blog_a">
                    <p>域  名：www.hezhe.com 创建于2017年07月07日 <a href="http://www.net.cn/domain/" class="blog_link" target="_blank">注册域名</a><a class="blog_link" href="http://koubei.baidu.com/womc/s/www.hezhe.com" target="_blank">邀你点评</a></p>
                    <p>服务器：阿里云服务器<a href="http://www.aliyun.com/product/ecs/?ali_trackid=2:mm_11085263_4976026_15602229:1389838528_3k2_34164590" class="blog_link" target="_blank">购买空间</a><a href="javascript:;" target="_blank" class="blog_link" >参考我的空间配置</a></p>
                    <p>程  序：nodejs</p>
                    <p>微信公众号：何哲</p>
                </ul>
            </div>
        </article>
        <aside class="main-r">
            <common-introduce></common-introduce>
            <a href="mailto:hezhe@ihangmei.com">联系我</a>
        </aside>
        <div class="clear"></div>
    </div>
</template>

<style scoped lang="scss">
    @import "~@/common/styles/base.scss";
    .about { 
        line-height: 22px; 
        margin: 20px; 
        h2 { 
            font-size: 22px; 
            font-family: cursive; 
            margin-bottom: 20px; 
            color: nth($color_arr,2);
        }
        p { 
            margin-bottom: 15px 
        }
        ul { 
            color: #333; 
        }
    }
    a.blog_link { 
        color: nth($color_arr,3);
        margin: 0 20px;
    }

</style>