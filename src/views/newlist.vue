<template>
<div class="ibody">   
    <common-nav></common-nav>
    <article>
        <h2 class="about_h">您现在的位置是：<a href="/">首页</a>><a href="1/">慢生活</a></h2>
        <div class="bloglist">
            <div v-for="i in 10" :key="i" class="newblog">
                <ul>
                    <h3><a href="/">个人博客从简不繁</a></h3>
                    <div class="autor"><span>作者：xx</span><span>分类：[<a href="/">日记</a>]</span><span>浏览（<a href="/">459</a>）</span><span>评论（<a href="/">30</a>）</span></div>
                    <p>十一月中旬开始，排名突然下降了，网站“个人博客”关键词排名从第一页第二名滑落到100页以后了，个人博客这个关键词百度已经搜不到了，仅有google、搜狗... <a href="/" target="_blank" class="readmore">全文</a></p>
                </ul>
                <figure><img src="../../images/001.jpg" ></figure>
                <div class="dateview">yyyy-mm-dd</div>
            </div>
        </div>
        <common-page></common-page>
    </article>
    <aside>
        <common-rnav></common-rnav>
        <div class="ph_news">
            <common-article type='hot'></common-article>
            <common-article type='suggest'></common-article>
            <common-discuss></common-discuss>
        </div>
        <copyright></copyright>
    </aside>
    <div class="clear"></div>

    </div>
</template> 