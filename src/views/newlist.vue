<template>
    <div class="ibody">   
        <common-nav></common-nav>
        <article class="main-l">
            <h2 class="about_h">您现在的位置是：<router-link to="/">首页</router-link>> <span>慢生活</span></h2>
            <div class="bloglist">
                <div v-for="i in 10" :key="i" class="newblog">
                    <ul>
                        <h3><router-link to="/">个人博客从简不繁</router-link></h3>
                        <div class="autor autor2"><span>作者：xx</span><span>分类：[<router-link to="/">日记</router-link>]</span><span>浏览（<router-link to="/">459</router-link>）</span><span>评论（<router-link to="/">30</router-link>）</span></div>
                        <p>十一月中旬开始，排名突然下降了，网站“个人博客”关键词排名从第一页第二名滑落到100页以后了，个人博客这个关键词百度已经搜不到了，仅有google、搜狗... <router-link to="/" class="readmore">全文</router-link></p>
                    </ul>
                    <figure><img src="images/tmp/001.jpg" ></figure>
                    <div class="dateview">yyyy-mm-dd</div>
                </div>
            </div>
            <common-page></common-page>
        </article>
        <common-aside></common-aside>
        <div class="clear"></div>
    </div>
</template>