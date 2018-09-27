<template>
    <div class="page">
        <a title="Total record"><b>113</b></a>
        <b>1</b>
        <a href="/">2</a>
        <a href="/">3</a>
        <a href="/">4</a>
        <a href="/">5</a>
        <a href="/">&gt;</a>
        <a href="/">&gt;&gt;</a>
    </div>
</template>

<style lang="scss">
    .page { 
        margin: 20px 0; 
        text-align: center; 
        width: 100%; 
        overflow: hidden;
        a b { 
            color: #999; 
        } 
        > b, a{
            margin: 0 2px; 
            height: 26px; 
            line-height: 26px; 
            border-radius: 50%; 
            width: 26px; 
            text-align: center; 
            display: inline-block;
        }
        > b, a:hover{
            background: #333; 
            color: #FFF;
        }
        a{
            margin: 0 2px; 
            height: 26px; 
            line-height: 26px; 
            border-radius: 50%; 
            width: 26px; 
            text-align: center; 
            display: inline-block;
            color: #F33; 
            border: #999 1px solid;
        }
    }
</style>