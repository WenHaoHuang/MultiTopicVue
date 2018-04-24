<template>
    <transition :name="transition">
        <div class="dialog-wrapper" v-show="isShow" :class="[className]" ref="dialog">
            <div class="dialog-mask" v-show="showBg"></div>
            <div class="dialog-content" :class="[className]">
                <div class="btn-close" v-show="close" @click="cancleFn"></div>
                <div class="dialog-header" v-if="title">{{title}}</div>
                <div class="dialog-tbody">
                    <slot name="content"></slot>
                </div>
                <div class="dialog-footer">
                    <div class="ft-cancle" @click="cancleFn">取消</div>
                    <div class="ft-close" @click="clickFn">确认</div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "zDialog",
        props:{
            className:{
                type:String,
                default:''
            },
            showBg:{
                type:Boolean,
                default:true
            },
            close:{
                type:Boolean,
                default:true
            },
            transition:{
                type:String,
                default:'fade'
            }
        },
        data(){
            return{
                isShow:false,
                title:'',
                callBack:'',
                width:'500'
            }
        },
        methods:{
            show(options,callBack){
                this.title = options.title || ''
                this.width = options.width || '500'
                this.callBack = callBack
                this.isShow = true
            },
            cancleFn(){
                this.isShow = false
            },
            clickFn(){
                this.isShow = false;
                this.callBack && this.callBack()
            }
        }
    }
</script>

<style lang="scss">
    .dialog-wrapper{
        position:fixed;
        z-index:10001;
        content:'';
        left:0;right:0;
        top:0;bottom:0;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        .dialog-mask{
            position:absolute;
            width:100%;
            height:100%;
            background-color:rgba(0,0,0,0.6);
        }
        .dialog-content{
            position:relative;
            width:500px;
            max-height:95%;
            display:flex;
            flex-direction:column;
            border-radius:4px;
            background-color: #fff;
            .btn-close{
                position:absolute;
                z-index:5;
                right:0;
                top:0;
                width:30px;height:30px;
                border-radius:100%;
                background-color: #FFF;
                border:1px solid #E0E0E0;
                margin:-15px -15px 0 0;
                transition:transform 0.5s ease-in-out;
                cursor:pointer;
                &:before,&:after{
                    position:absolute;
                    content:'';
                    left:6px;top:13px;
                    width:16px;height:2px;
                    background-color: #09c;
                }
                &:before{
                    transform:rotate(45deg);
                }
                &:after{
                    transform:rotate(-45deg);
                }
                &:hover{
                    transform:rotate(360deg);
                }
            }
        }
        .dialog-header{
            padding:10px 15px;
            border-bottom:1px solid #E0E0E0;
            font-size:16px;
            font-weight:500;
            & + .dialog-tbody{
                padding-top:20px;
            }
        }
        .dialog-tbody{
            padding:40px 15px 20px;
            flex:1;
            overflow-y:auto;
            -webkit-overflow-scrolling: touch;
        }
        .dialog-footer{
            display:flex;
            flex-direction:row;
            justify-content: center;
            align-items: center;
            border-top:1px solid #E0E0E0;
            padding:20px 15px;
            .ft-cancle,.ft-close{
                border:1px solid transparent;
                border-radius:4px;
                padding:8px 30px;
                text-align:center;
                cursor:pointer;
            }
            .ft-cancle{
                border-color:#dedede;
                background-color: #f1f1f1;
                & + .ft-close{
                    margin-left:30px;
                }
            }
            .ft-close{
                border-color:#448FF2;
                color:#FFF;
                background-color: #448FF2;
                transition:all 0.3s;
                &:hover{
                    background-color: rgba(#448FF2,0.8);
                }
            }
        }
    }
</style>
