<template>
    <aside class="main-r">
        <div class="rnav">
            <li class="rnav1"><router-link to="/">日记</router-link></li>
            <li class="rnav2"><router-link to="/">欣赏</router-link></li>
            <li class="rnav3"><router-link to="/">程序人生</router-link></li>
            <li class="rnav4"><router-link to="/">经典语录</router-link></li>
        </div>
        <div class="ph_news">
            <common-article type='hot'></common-article>
            <common-article type='suggest'></common-article>
            <!-- <div>
                <h2>
                    <p>最新评论</p>
                </h2>
                <div class="pl_n">
                    <dl v-for="i in 5" :key="i">
                        <dt><img src="images/tmp/s8.jpg"> </dt>
                        <dt> </dt>
                        <dd>DanceSmile
                            <time>49分钟前</time>
                        </dd>
                        <dd><router-link to="/">文章非常详细，我很喜欢.前端的工程师很少，我记得几年前yahoo花高薪招聘前端也招不到</router-link></dd>
                    </dl>
                </div>
                <h2>
                    <p>最近访客</p>
                    <ul>
                        <img src="images/tmp/vis.jpg">
                    </ul>
                </h2>
            </div> -->
        </div>
        <copyright></copyright>
    </aside>
</template>

<style lang="scss">
    @import "../styles/aside";
</style>