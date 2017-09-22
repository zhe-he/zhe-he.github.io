<template>
    <div>
        <h2>
            <p v-if="type=='newArticle'" class="tj_t1">最新文章</p>
            <p v-if="type=='suggest'" class="tj_t2">推荐文章</p>
            <p v-if="type=='hot'">点击排行</p>
        </h2>
        <ul v-if="type!='hot'">
            <li><router-link to="/">犯错了怎么办？</router-link></li>
            <li><router-link to="/">两只蜗牛艰难又浪漫的一吻</router-link></li>
            <li><router-link to="/">春暖花开-走走停停-发现美</router-link></li>
            <li><router-link to="/">琰智国际-Nativ for Life官方网站</router-link></li>
            <li><router-link to="/">个人博客模板（2014草根寻梦）</router-link></li>
            <li><router-link to="/">简单手工纸玫瑰</router-link></li>
            <li><router-link to="/">响应式个人博客模板（蓝色清新）</router-link></li>
            <li><router-link to="/">蓝色政府（卫生计划生育局）网站</router-link></li>
        </ul>

        <ul v-if="type=='hot'" class="ph_n">
            <li><span class="num1">1</span><router-link to="/">有一种思念，是淡淡的幸福,一个心情一行文字</router-link></li>
            <li><span class="num2">2</span><router-link to="/">励志人生-要做一个潇洒的女人</router-link></li>
            <li><span class="num3">3</span><router-link to="/">女孩都有浪漫的小情怀——浪漫的求婚词</router-link></li>
            <li><span>4</span><router-link to="/">Green绿色小清新的夏天-个人博客模板</router-link></li>
            <li><span>5</span><router-link to="/">女生清新个人博客网站模板</router-link></li>
            <li><span>6</span><router-link to="/">Wedding-婚礼主题、情人节网站模板</router-link></li>
            <li><span>7</span><router-link to="/">Column 三栏布局 个人网站模板</router-link></li>
            <li><span>8</span><router-link to="/">时间煮雨-个人网站模板</router-link></li>
            <li><span>9</span><router-link to="/">花气袭人是酒香—个人网站模板</router-link></li>
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
            console.log(this.type);
        }
    }
</script>