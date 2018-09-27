<template lang="pug">
    div(v-if="status>0")
        .preload-box-mask(v-if="hasMask")
        .preload-box
            .preload-1(v-if="status==1")
                span
                span
                span
                span
                span
            .preload-2(v-if="status==2")
                span
                span
                span
                span
            .preload-3(v-if="status==3")
            .preload-4(v-if="status==4")
                span
                span
                span
                span
                span
            .preload-5(v-if="status==5")
</template>

<style lang="scss">
    .preload-box-mask{
        z-index: 1000;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.3);
    }
    .preload-box{
        z-index: 1100;
        position: fixed;
        top: 40%;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /*
     5 4 0 5 0
     */

    .preload-1 {
        position: relative;
        margin-left: -57px;
        span {
            display: block;
            position: absolute;
            bottom: 0px;
            width: 9px; 
            height: 5px;
            background: coral;
            animation: preload-1 1.5s infinite ease-in-out;
            @for $i from 1 to 6{
                $l: ($i/1-1)*11px;
                $d: ($i/1-1)*0.2s;
                &:nth-child(#{$i}){
                    left: $l;
                    animation-delay: $d;
                }
            }
        }
    }

    @keyframes preload-1 {
        0% {
            height: 5px;
            transform: translateY(0px);
            background: coral;
        }
        25% {
            height: 30px;
            transform: translateY(15px);
            background: cornflowerblue;
        }
        50% {
            height: 5px;
            transform: translateY(0px);
            background: cornflowerblue;
        }
         100% {
            height: 5px;
            transform: translateY(0px);
            background: coral;
        }
    }

    .preload-2 {
        position: relative;
        left: 0;
        width: 40px; 
        height: 40px;
        span {
            position: absolute;
            display: block;
            bottom: 0px;
            width: 20px; 
            height: 20px;
            background: #9b59b6;
            &:nth-child(1) {
                animation: preload-2-1 1.5s infinite ease-in-out;
            }
            &:nth-child(2) {
                left: 20px;
                animation: preload-2-2 1.5s infinite ease-in-out;
            }
            &:nth-child(3) {
                top: 0px;
                animation: preload-2-3 1.5s infinite ease-in-out;
            }
            &:nth-child(4) {
                top: 0px;
                left: 20px;
                animation: preload-2-4 1.5s infinite ease-in-out;
            }
        }
    }

    @keyframes preload-2-1 {
        0% {
            transform: translateX(0) translateY(0) rotate(0);
            border-radius: 0;
        }
        50% { 
            transform: translateX(-20px) translateY(-10px) rotate(-180deg); 
            border-radius: 50%; background: #3498db;
        }
        80% {
            transform: translateX(0) translateY(0) rotate(-360deg);
            border-radius: 0;
        }
        100% {
            transform: translateX(0) translateY(0) rotate(-360deg);
            border-radius: 0;
        }
    }
    @keyframes preload-2-2 {
        0% {
            transform: translateX(0px) translateY(0px) rotate(0deg);
            border-radius: 0;
        }
        50% {
            transform: translateX(20px) translateY(-10px) rotate(180deg); 
            border-radius: 50%; background: #f1c40f;
        }
        80% {
            transform: translateX(0) translateY(0) rotate(360deg);
            border-radius: 0;
        }
        100% {
            transform: translateX(0) translateY(0) rotate(360deg);
            border-radius: 0;
        }
    }
    @keyframes preload-2-3 {
        0% {
            transform: translateX(0px) translateY(0px) rotate(0deg);
            border-radius: 0;
        }
        50% { 
            transform: translateX(-20px) translateY(10px) rotate(-180deg); 
            border-radius: 50%; background: #2ecc71;
        }
        80% {
            transform: translateX(0) translateY(0) rotate(-360deg);
            border-radius: 0;
        }
        100% {
            transform: translateX(0) translateY(0) rotate(-360deg);
            border-radius: 0;
        }
    }
    @keyframes preload-2-4 {
        0% {
            transform: translateX(0px) translateY(0px) rotate(0deg);
            border-radius: 0;
        }
        50% {
            transform: translateX(20px) translateY(10px) rotate(180deg); 
            border-radius: 50%; background: #e74c3c;
        }
        80% {
            transform: translateX(0) translateY(0) rotate(360deg);
            border-radius: 0;
        }
        100% {    transform: translateX(0) translateY(0) rotate(360deg);
            border-radius: 0;
        }
    }

    .preload-3 {
        position: relative;
        margin-left: -45px;
        &:before, &:after {
            position: absolute;
            content: '';
            width: 20px; 
            height: 20px;
            border-radius: 50%;
        }
        
        &:before {
            background: orange;
            animation: preload-3-1 1.5s infinite ease-in-out;
        }
        &:after {
            background: yellow;
            left: 22px;
            animation: preload-3-2 1.5s infinite ease-in-out;
        }
    }

    @keyframes preload-3-1 {
        0%, 100% {
            transform: translateX(0) rotate(0);
        }
        50% {
            transform: translateX(50px) scale(1.2) rotate(260deg);
            border-radius: 0;
        }
    }
    @keyframes preload-3-2 {
        0%, 100% {
            transform: translateX(0) rotate(0);
        }
        50% {
            transform: translateX(-50px) scale(1.2) rotate(-260deg);
            border-radius: 0;
        }
    }

    .preload-4 {
        position: relative;
        left: -50px;
        span {
            position: absolute;
            width: 20px; 
            height: 20px;
            background: dodgerblue;
            border-radius: 50%;
            animation: preload-4 1s infinite ease-in-out;
            @for $i from 1 to 6{
                $l: ($i/1-1)*20px;
                $d: ($i/1-1)*0.2s;
                &:nth-child(#{$i}){
                    left: $l;
                    animation-delay: $d;
                }
            }
        }
    }
        
    @keyframes preload-4 {
        0%, 100% {
            opacity: 0.3;
            transform: translateY(0);
            box-shadow: 0 0 3px rgba(255,255,255,0.1);
        }
        50% {
            opacity: 1;
            transform: translateY(-10px);
            box-shadow: 0 20px 3px rgba(255,255,255,0.05);
        }
    }

    .preload-5 {
        position: relative;
        width: 30px; 
        height: 30px;
        border-radius: 50%;
        background: peachpuff;
        animation: preload-5 1.5s infinite linear;
        &:after {
            content: '';
            position: absolute;
            top: -20px; 
            left: -20px;
            width: 50px; 
            height: 50px;
            border-top: 10px solid coral;
            border-bottom: 10px solid coral;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-radius: 50%;
        }
    }
    @keyframes preload-5 {
        0% {
            transform: rotate(0);
        }
        50% {
            transform: rotate(180deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>

<script type="text/javascript">
    export default {
        props: {
            hasMask: {
                type: Boolean,
                default: true
            },
            status: {
                type: Number | String,
                default: 1
            }
        }
    }
</script>