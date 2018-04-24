<template>
    <transition name="fadeIn">
        <div class="dialog-wrap" v-if="visible">
            <div class="dialog-mask"></div>
            <div class="dialog-container">
                <div class="dialog-head clearfix">
                    <slot name="title">
                        <span class="title">{{title}}</span>
                    </slot>
                    <span class="close" @click="closeFn">×</span>
                </div>
                <div class="dialog-body"><slot></slot></div>
                <div class="dialog-foot"><slot name="footer"></slot></div>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'pdialog',
        props: {
            title: {
                type: String,
                default: ''
            },
            visible: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {}
        },
        methods: {
            closeFn(){
                this.$emit('onCloseDialog')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dialog-wrap{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: auto;
        transition: all .2s;
        .dialog-mask{
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 999;
            background: rgba(0, 0, 0, 0.6);
        }
        .dialog-container{
            width: 50%;
            margin: 200px auto 0;
            padding: 24px;
            background: #ffffff;
            position: relative;
            z-index: 1000;
            .dialog-head{
                .title{
                    color: #1f2833;
                    font-size: 16px;
                    font-weight: 700;
                }
                .close{
                    float: right;
                    font-size: 21px;
                    font-weight: 700;
                    line-height: 1;
                    color: #000;
                    text-shadow: 0 1px 0 #fff;
                    opacity: .2;
                    cursor: pointer;
                }
            }
            .dialog-body{
                color: #606266;
                line-height: 24px;
                font-size: 14px;
            }
        }
    }
    .fadeIn-enter-active, .fadeIn-leave-active{
        transition: opacity .3s ease;
    }
    .fadeIn-enter, .fadeIn-leave-to{
        opacity: 0;
    }

</style>
