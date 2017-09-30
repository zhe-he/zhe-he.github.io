<template>
    <div class="ibody">
        <common-nav></common-nav>
        <article class="main-l">
            <div class="banner">
                <ul class="texts">
                    <p>The best life is use of willing attitude, a happy-go-lucky life. </p>
                    <p>最好的生活是用心甘情愿的态度，过随遇而安的生活。</p>
                </ul>
            </div>
            <div class="bloglist">
                <h2>
                    <p><span>推荐</span>文章</p>
                </h2>
                <div v-for="i in 5" :key="i" class="blogs">
                    <h3><router-link to="/">犯错了怎么办？</router-link></h3>
                    <figure><img src="images/tmp/01.jpg" ></figure>
                    <ul>
                        <p>看到昔日好友发了一篇日志《咎由自取》他说他是一个悲观者，感觉社会抛弃了他，脾气、性格在6年的时间里变化很大，很难适应这个社会。人生其实就是不断犯错的过程，在这个过程中不断的犯错，不断的吸取教训，不断的成长。也许日子里的惊涛骇浪，不过是人生中的水花摇晃，别用显微镜放大你的悲伤。</p>
                        <router-link to="/" class="readmore">阅读全文&gt;&gt;</router-link>
                    </ul>
                    <p class="autor autor1"><span>作者：xx</span><span>分类：【<router-link to="/">日记</router-link>】</span><span>浏览（<router-link to="/">459</router-link>）</span><span>评论（<router-link to="/">30</router-link>）</span></p>
                    <div class="dateview">yyyy-mm-dd</div>
                </div>
            </div>
        </article>
        <aside class="main-r">
            <common-introduce></common-introduce>
            
            <div class="tj_news">
                <common-article type="suggest"></common-article>
                <common-article type="newArticle"></common-article>
            </div>
            <div class="links">
                <h2>
                    <p>友情链接</p>
                </h2>
                <ul>
                    <li><a href="/" target="black">xxx</a></li>
                    <li><a href="/" target="black">xxx</a></li>
                </ul>
            </div>
            <copyright></copyright>
        </aside>
        <div class="clear"></div>
    </div>
</template>