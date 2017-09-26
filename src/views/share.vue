<template>
    <div class="ibody">
    <common-nav></common-nav>
    <article class="main-l">
        <h2 class="about_h">您现在的位置是：<a href="/">首页</a>><a href="1/">模板分享</a>><a href="1/">个人博客模板</a></h2>
        <div class="template">
            <h3>
                <p><span>个人博客</span>模板</p>
                <a href="/" class="more">更多>></a> </h3>
            <ul>
                <li v-for="i in 9" :key="i"><a href="/"  target="_blank"><img src="../../images/t00.jpg"></a><span>黑色Html5个人博客模板主题《如影随形》</span></li>
            </ul>
            <h3>
                <p><span>企业</span>网站模板</p>
                <a href="/" class="more">更多>></a> </h3>
            <ul>
                <li v-for="i in 9" :key="i"><a href="/" target="_blank"><img src="../../images/01.jpg"></a><span>仿新浪博客风格·梅——古典个人博客模板</span></li>
            </ul>
        </div>
        <common-page></common-page>
    </article>
    <common-aside></common-aside>
    <div class="clear"></div>
    </div>
</template>