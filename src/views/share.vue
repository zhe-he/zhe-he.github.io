<template>
    <div class="ibody">
    <common-nav></common-nav>
    <article class="main-l">
        <h2 class="about_h">您现在的位置是：<router-link to="/">首页</router-link>> <span>程序人生</span></h2>
        <div class="template">
            <div :key="index" v-for="(item,index) in share">
                <h3>
                    <p><span>{{item.title}}</span>分享</p>
                    <router-link to="/" class="more">更多>></router-link>
                </h3>
                <ul>
                    <li v-for="item2 in item.content">
                        <a :href="item2.url"><img :src="item2.imgSrc"></a>
                        <span>{{item2.title}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <common-page></common-page>
    </article>
    <common-aside></common-aside>
    <div class="clear"></div>
    </div>
</template>

<script type="text/javascript">
    var shareDate = require('../data/share.json');
    export default {
        data(){
            return {
                share: shareDate.data
            }
        },
        mounted(){

        }
    }
</script>



<style lang="scss" scoped>
    @import "../styles/base";
    .template { 
        margin: 0 10px 0 10px; 
        h3 { 
            border-bottom: #333 2px solid;
            width: 100%;
            overflow: hidden; 
            font-size: 14px; 
            display: block; 
            clear: both; 
            margin-bottom: 10px; 
            position: relative; 
            p { 
                background-color: nth($color_yb,2);
                width: 180px; 
                height: 25px; 
                line-height: 25px; 
                color: #fff; 
                text-align: center; 
                box-shadow: #999 4px 5px 1px; 
                span { color: nth($color_arr,5); }
            }
        }
        ul li { 
            margin: 3px; 
            float: left; 
            display: block; 
            padding: 5px 5px 6px 5px; 
            transition: all 1s; 
            img { 
                width: 140px; 
                height: 80px; 
                background: #FFF; 
                padding: 4px; 
                box-shadow: 0px 0px 2px rgba(0,0,0,.5); 
                display: block; 
            }
            span { 
                color: #fff; 
                display: block; 
                text-align: center; 
                margin-top: 5px; 
                width: 142px; 
                overflow: hidden; 
                text-overflow: ellipsis; 
                height: 14px;
            }
            &:hover { 
                background-color: nth($color_yb,3); 
                padding: 5px 5px 6px 5px; 
            }
        }
    }
    .more { 
        position: absolute; 
        right: 0; 
        top: 4px; 
        color: nth($color_yb,3); 
        font-size: 12px; 
    }
</style>