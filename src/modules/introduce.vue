<template>
    <div>
        <div class="avatar"><router-link to="/about"><span>关于何哲</span></router-link></div>
        <div class="topspaceinfo">
            <h1>take it five minutes</h1>
            <p>于千万人之中，我遇见了我所遇见的人....</p>
        </div>
        <div class="about_c">
            <p>网名：踩在🐢上的🐰</p>
            <p>职业：前端开发工程师</p>
            <p>籍贯：湖北省—汉川市</p>
            <p>电话：15072496166</p>
            <p><a href="mailto:zhe-he@qq.com">邮箱：zhe-he@qq.com</a></p>
        </div>
    </div>
</template>

<style lang="scss">
    @import "../styles/base";
    .avatar { 
        margin: 10px auto; 
        width: 160px; 
        height: 160px; 
        border-radius: 50%; 
        overflow: hidden; 
        a { 
            display: block; 
            padding-top: 100px; 
            width: 160px; 
            height: 60px; 
            background: url(../../images/head.png) no-repeat; 
            background-size: 100% 100%; 
            span { 
                display: block; 
                margin-top: 63px; 
                padding-top: 8px; 
                width: 160px; 
                height: 55px; 
                text-align: center; 
                line-height: 20px; 
                color: #fff; 
                background: rgba(0, 0, 0, .5); 
                transition: margin-top .2s ease-in-out; 
            }
            &:hover span { display: block; margin-top: 0; }
        }
    }
    .about_c { 
        margin: 10px 0; 
        color: #fff; 
        line-height: 26px; 
        a{ color: #fff; }
        p{
            padding-left: 40px; 
            background-image: url(../../images/about_c.png);
            background-repeat: no-repeat;
            background-position-x: 15px;
            &:nth-child(1) { background-position-y: 6px; } 
            &:nth-child(2) { background-position-y: -20px; }
            &:nth-child(3) { background-position-y: -48px; }
            &:nth-child(4) { background-position-y: -70px; }
            &:nth-child(5) { background-position-y: -97px; }
            &:hover { background-color: #222 }
        }
    }
    .topspaceinfo { 
        background-color: nth($color_arr,1);
        padding: 40px 20px;
        color: #fff;
        text-shadow: 1px 1px rgba(0,0,0,.3); 
        h1 { 
            font-size: 16px; 
            line-height: 40px; 
            font-weight: bold; 
        }
    }
</style>