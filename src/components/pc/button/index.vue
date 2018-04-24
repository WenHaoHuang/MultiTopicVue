<template>
    <button class="p-btn" @click="handleClick($event)"
    :disabled="buttonDisabled||false"
    :class="[status?'p-btn_'+status:'',
    buttonSize?'p-btn_'+size:'',
    {'p-btn_disabled': buttonDisabled}
    ]">
        <slot></slot>
    </button>
</template>
<script>
    export default {
        name: 'pbutton',
        props: {
            status: {
                type: String,
                default: ''
            },
            size: {
                type: String,
                default: ''
            },
            buttonDisabled: {
                type: Boolean
            },
            buttonSize: {
                type: String,
                default: 'middle'
            }
        },
        methods: {
            handleClick($event) {
                this.$emit('onClick')
            }
        }
    }
</script>
<style lang="scss" scoped>
    .p-btn{
        width: 140px;
        height: 36px;
        line-height: 1.5;
        color: #fff;
        font-size: 16px;
        color: #fff;
        text-align: center;
        white-space: nowrap;
        transition: all .1s ease;
        background: #4790ee;
        outline: none;
        border: none;
        cursor: pointer;
        border-radius: 2px;
        &:hover,&:focus{
            background: #3c7ac6;
        }
    }
    .p-btn_primary{
        background: #4790ee;
    }
    .p-btn_success{
        background: #4790ee;
    }
    .p-btn_primary:hover,
    p-btn_success:hover{
        background: #3c7ac6;
    }
    .p-btn_warning{
        background: #ff9140;
    }
    .p-btn_warning:hover{
         background: #e38142;
    }
    .p-btn_info{
        background: #e1e5eb;
    }
    .p-btn_info:hover{
        background: #cccccc;
    }
    .p-btn_disabled,
    .p-btn_danger{
        color: #bec4cc;
        background: #e1e5eb;
    }
    .p-btn_disabled:hover,
    .p-btn_danger:hover{
        background: #ccc;
    }
    .p-btn_middle{
        width: 140px;
        height: 36px;
        font-size: 16px;
    }
    .p-btn_small{
        width: 100px;
        height: 30px;
        font-size: 14px;
    }
</style>
