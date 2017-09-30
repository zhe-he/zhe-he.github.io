<template>
    <div class="ibody">
        <common-nav></common-nav>
        <article class="main-l">
        <h2 class="about_h">您现在的位置是：<router-link to="/">首页</router-link>><router-link to="/newlist">慢生活</router-link>> <span>xxx</span></h2>
            <div class="index_about">
                <h2 class="c_titile">标题</h2>
                <p class="box_c"><span class="d_time">发布时间：yyyy-mm-dd</span><span>编辑：xxx</span><span>浏览（390）</span><span>评论览（14）</span></p>
                <ul class="infos">
                    <p>文字文字文字文字：<img src="images/tmp/color.jpg" alt="主色调"></p>
                </ul>
                <div class="keybq">
                    <p><span>关键字词</span>：黑色,个人博客,时间轴,响应式</p>
                </div>
                <div class="nextinfo">
                    <p>上一篇：<router-link to="/">xxx</router-link></p>
                    <p>下一篇：<router-link to="/">xxx</router-link></p>
                </div>
                <div class="otherlink">
                    <h2>相关文章</h2>
                    <ul>
                        <li v-for="i in 6" :key="i"><router-link to="/" title="现在，我相信爱情！">现在，我相信爱情！</router-link></li>
                    </ul>
                </div>
            </div>
        </article>
        <common-aside></common-aside>
        <div class="clear"></div>
    </div>
</template>

<style lang="scss" scoped>
    .index_about { margin: 20px }
    .c_titile { 
        font-size: 22px; 
        margin: 20px 0; 
        text-align: center; 
    }
    .box_c { 
        color: #999; 
        text-align: center;
        span { 
            margin: 0 10px;
            a { color: #099; } 
        }
    }
    .infos { 
        overflow: hidden; 
        margin: 20px 0; 
        line-height: 28px; 
        font-size: 14px; 
        text-indent: 2em; 
        color: #525554;
        p { 
            margin-bottom: 10px;
            img { display: block; margin: auto }
        }
    }
    .nextinfo { line-height: 24px; }
    .nextinfo a, .otherlink li a { 
        color: #756f71; 
        &:hover { text-decoration: underline }
    }
    .otherlink{
        h2 { 
            border-bottom: #099 2px solid; 
            line-height: 40px; 
            font-size: 12px; 
            background: url(../../images/5794.png) 10px center no-repeat; 
            padding-left: 40px; 
            color: #099 
        }
        ul { margin: 10px 0; }
        li { 
            line-height: 24px; 
            height: 24px; 
            display: block; 
            width: 290px; 
            float: left; 
            overflow: hidden; 
            margin-right: 30px; 
        }
    }
</style>