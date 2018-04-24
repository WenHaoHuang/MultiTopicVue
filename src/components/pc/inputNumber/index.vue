<template>
    <div class="input-content">
        <input type="text" :value="value" :placeholder="placeholder" autocomplete="off" :disabled="disabled">
        <span class="icon">{{text}}</span>
    </div>
</template>
<script>
    export default {
        name: 'pinput',
        props: {
            text: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: '请输入内容'
            },
            value: {
                default: ''
            }
        }
    }
</script>
<style lang="scss" scoped>
    .input-content{
        width: 100%;
        position: relative;
        line-height: 30px;
        box-sizing: border-box;
        input{
            width: 100%;
            padding-left: 6px;
            line-height: 30px;
            border: 1px solid #E0E0E0;
            border-radius: 2px;
        }
        .icon{
            height: 100%;
            position: absolute;
            top: 0;
            right: 6px;
            line-height: 34px;
            font-size: 14px;
            color: #1f2833;
        }
    }
</style>
