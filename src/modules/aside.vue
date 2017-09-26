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
            <div>
                <h2>
                    <p>最新评论</p>
                </h2>
                <div class="pl_n">
                    <dl v-for="i in 5" :key="i">
                        <dt><img src="../../images/s8.jpg"> </dt>
                        <dt> </dt>
                        <dd>DanceSmile
                            <time>49分钟前</time>
                        </dd>
                        <dd><a href="/">文章非常详细，我很喜欢.前端的工程师很少，我记得几年前yahoo花高薪招聘前端也招不到</a></dd>
                    </dl>
                </div>
                <h2>
                    <p>最近访客</p>
                    <ul>
                        <img src="../../images/vis.jpg">
                    </ul>
                </h2>
            </div>
        </div>
        <copyright></copyright>
    </aside>
</template>

<style lang="scss">
    .ph_news {
        h2 { 
            font-size: 16px;
            color: #FFF; 
            p { 
                height: 40px; 
                line-height: 40px; 
                width: 100px; 
                padding: 0 0 0 30px; 
                border-radius: 0 20px 20px 0; 
                text-shadow: rgba(0,0,0,.65) 1px 1px; 
                background: #0f9c7c; 
            }
        }
        ul { 
            margin: 10px; 
            li { 
                white-space: nowrap; 
                text-overflow: ellipsis; 
                overflow: hidden; 
                width: 100%; 
                color: #cdcbcb; 
                line-height: 24px; 
                height: 24px; 
                a { 
                    color: #cdcbcb; 
                }
            }
        }
    }
    .ph_news li a:hover, .pl_n dd a:hover { 
        text-decoration: underline; 
    }
    .pl_n dl { 
        display: block; 
        overflow: hidden; 
        margin-bottom: 12px; 
        color: #cdcbcb; 
    }
    .pl_n dd { 
        line-height: 22px;
        white-space: nowrap; 
        text-overflow: ellipsis; 
        overflow: hidden;
        a{ 
            color: #555454;
        }
     }
    .pl_n time { 
        color: #066; 
        margin-left: 10px;
    }
    .pl_n dt { 
        float: left; 
    }
    .pl_n dt img { 
        width: 50px; 
        height: 50px; 
        margin-right: 10px; 
        border-radius: 50%; 
        transition: all 1s;
        &:hover { 
            transform: rotate(30deg); 
        }
    }

</style>