<template>
    <div :class="{'fadeIn': this.status==1,'hide': this.status==0,'fadeOut': this.status==2}">
        <p v-html="msg"></p>
    </div>
</template>

<style type="text/css">
    @keyframes fadeInUp{
        0%{
            z-index: 1000;
            opacity:0;
            transform:translateY(20px)
        }
        100%{
            z-index: 1000;
            opacity:1;
            transform:translateY(0)
        }
    }
    @keyframes fadeOutDown{
        0%{
            z-index: 1000;
            opacity:1;
            transform:translateY(0)
        }
        100%{
            z-index: -1;
            opacity:0;
            transform:translateY(20px)
        }
    }
</style>
<style scoped>
    .fadeIn{
        animation: fadeInUp 1s 0s ease both;
    }
    .fadeOut{
        z-index: -1;
        animation: fadeOutDown 0.6s 0s ease both;
    }
    .hide{
        z-index: -1;
        opacity: 0;
    }
    div{
        z-index: 1000;
        display: flex;
        jusitify-content: center;
        align-items: center;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top: -1.6rem;
        margin-left: -2.4rem;
        width: 4.8rem;
        height: 1.9rem;
        background-color: rgba(0,0,0,0.8);
        border-radius: 0.1rem;
    }
    p{
        width: 100%;
        line-height: 0.54rem;
        text-align: center;
        color: #fff;
        font-size: 0.32rem;
    }
</style>

<script>
    export default {
        props: {
            msg: {
                type: String,
                required: true
            },
            status: {
                type: String | Number,
                default: 1
            }
        },
        data(){
            return {
            }
        }
    }
</script>