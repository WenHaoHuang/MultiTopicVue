<template>
    <div class="progress-project" :class="`skin-${type}`">
        <div class="pgs-bar" :style="{'width':number}"></div>
        <div class="pgs-tag" :style="{'left':number}">{{number}}</div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                number:'0%'
            }
        },
        props: {
            precent: {
                type: Number,
                default: 0
            },
            type:{
                type:Number,
                default:0
            }
        },
        mounted(){
            setTimeout(()=>{
                this.number = this.precent * 100 + '%'
            },200)
        }
    }
</script>

<style lang="scss">
    .progress-project{
        height:6px;
        width:100%;
        position:relative;
        background-color: #fff1c9;
        border-radius:6px;
        .pgs-bar{
            width:0;
            height:6px;
            background:linear-gradient(to right,#fed14a,#fcae18);
            border-radius:6px;
            position:relative;
            transition:width 1s ease-in-out;
        }
        .pgs-tag{
            position:absolute;
            z-index:2;
            color:#FFF;
            background-color: #fcae18;
            left:0;top:-28px;
            width:45px;
            text-align:center;
            border-radius:4px;
            transition:left 1s ease-in-out;
            margin-left:-24px;
            &:after{
                content:'';
                position:absolute;
                z-index:2;
                border-left:6px solid transparent;
                border-right:6px solid transparent;
                border-top:6px solid #fcae18;
                bottom:-5px;
                left:50%;
                margin-left:-4px;
            }
        }
        &.skin-0{
            background-color: #fff1c9;
            .pgs-bar{
                background:linear-gradient(to right,#fed14a,#fcae18);
            }
            .pgs-tag{
                background-color: #fcae18;
            }.pgs-tag:after{
                 border-top:6px solid #fcae18;
             }
        }
        &.skin-1{
            background-color: #c7ddfb;
            .pgs-bar{
                background:linear-gradient(to right,#78d1fa,#448ff2);
            }
            .pgs-tag{
                background-color: #448ff2;
            }.pgs-tag:after{
                 border-top:6px solid #448ff2;
             }
        }
        &.skin-2{
            background-color: #d1d6dd;
            .pgs-bar{
                background:linear-gradient(to right,#e1e5eb,#bfc5cd);
            }
            .pgs-tag{
                background-color: #bfc5cd;
            }.pgs-tag:after{
                 border-top:6px solid #bfc5cd;
             }
        }
    }
</style>
