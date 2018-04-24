<template>
    <transition name="fade">
        <div class="notify-wrapper" v-if="show" :class="[className]">
            <div class="notify-mask" v-show="showBg"></div>
            <div class="notify-alert" :class="[className]">
                <div class="notify-tbody" v-html="content"></div>
                <div class="notify-footer">
                    <div class="ft-cancle" @click="cancleFn">{{btnText[0]}}</div>
                    <div class="ft-close" @click="clickFn">{{btnText[1]}}</div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "notice",
        data(){
            return {}
        },
        props:{
            show:{
                type:Boolean,
                default:false
            },
            content:{
                type:String,
                default:''
            },
            btnText:{
                type:Array,
                default:()=>{
                    return ['取消','确认'];
                }
            },
            className:{
                type:String,
                default:''
            },
            showBg:{
                type:Boolean,
                default:true
            },
            callBack:{
                type:Function,
                default:()=>{}
            },
            transition:{
                type:Boolean,
                default:true
            }
        },
        methods:{
            cancleFn(){
                this.show = false;
            },
            clickFn(){
                this.show = false;
                this.callBack && this.callBack();
            }
        }
    }
</script>

<style lang="scss">
    @import "./index";
</style>
