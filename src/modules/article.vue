<template>
    <div>
        <h2>
            <p v-if="type=='newArticle'" class="tj_t1">最新文章</p>
            <p v-if="type=='suggest'" class="tj_t2">推荐文章</p>
            <p v-if="type=='hot'">点击排行</p>
        </h2>
        <ul v-if="type!='hot'">
            <router-link tag="li" v-for="i in 6" :key="i" to="/"><a>犯错了怎么办？</a></router-link>
        </ul>

        <ul v-if="type=='hot'" class="ph_n">
            <li v-for="(i,index) in 9" :key="i"><span :class="'num'+(index+1)">{{index+1}}</span><router-link to="/">有一种思念，是淡淡的幸福,一个心情一行文字</router-link></li>
            
        </ul>

    </div>
</template>

<script type="text/javascript">
    export default {
        props: ["type"],
        data(){
            return {}
        },
        mounted(){
            
        }
    }
</script>

<style lang="scss">
    @import "../styles/base";
    .tj_news h2, .links h2 { 
        font-size: 16px; 
        color: #FFF; 
        p{
            height: 40px; 
            line-height: 40px;
            width: 100px; 
            padding: 0 0 0 30px; 
            border-radius: 0 20px 20px 0; 
            text-shadow: rgba(0,0,0,.65) 1px 1px;
        }
    }
    .tj_t1 { 
        background-color: nth($color_arr,3);
    }
    .tj_t2 { 
        background-color: nth($color_arr,6);
    }
    .tj_news ul,.links ul { 
        margin: 20px 0;
        a{
            color: #bbbbbb;
            &:hover{
                text-decoration: underline; 
                color: #FFF;
            }
        }
    }
    .tj_news ul{
        margin-left: 20px;
        li { 
            height: 25px; 
            line-height: 25px; 
            clear: both; 
            padding-left: 5px; 
            overflow: hidden; 
            padding-left: 15px; 
            background: url(../../images/li.jpg) no-repeat left center; 
        }
    }
    .links h2 p { 
        background: #222; 
    }
    .links ul li { 
        height: 30px; 
        line-height: 30px; 
        text-align: center;
        border-bottom: #333 1px dashed; 
        margin: 0 40px; 
    }
    .ph_n li span { 
        margin-right: 10px; 
        color: #FFF; 
        background: #404040; 
        padding: 0 5px;
        font-size: 12px;
        &.num1,&.num2,&.num3{
            background-color: nth($color_arr,2);
        }
        &.num1{
            padding: 0 6px;
        }
    }
</style>