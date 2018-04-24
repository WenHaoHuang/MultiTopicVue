<template>
    <div class="cell-bar" @click="onClickFn()">
        <div class="cell-icon" v-if="leftIcon != ''"><img :src="leftIconPic" class="img-responsive"></div>
        <div class="cell-hd">{{leftText}}</div>
        <div class="cell-bd" v-if="rightText != ''">{{rightText}}</div>
        <div class="cell-ft" v-if="hasRightIcon"></div>
    </div>
</template>

<script>

    export default {
        name: 'cellItem',
        props: {
            hasRightIcon: {
                type: Boolean,
                default: true
            },
            leftIcon: {
                type: String,
                default: ''
            },
            leftText: {
                type: String,
                default: ''
            },
            rightText: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                leftIconPic: ''
            }
        },
        created() {
            if (this.leftIcon != '') {
                this.leftIconPic = this.leftIcon ? this.leftIcon : '';
            }
        },
        methods: {
            onClickFn() {
                this.$emit('onClick');
            }
        }
    }
</script>

<style lang="scss">
    .cell-bar {
        display:flex;
        flex-direction:row;
        justify-content:flex-start;
        align-items:center;
        padding-left: 0.3rem;
        padding-right: 0.3rem;
        background: #FFF;
        position: relative;
        & + .cell-bar {
            &:before {
                position: absolute;
                content: '';
                left: 0;
                right: 0;
                top: 0;
                border-top: 0.02rem solid #E0E0E0;
            }
        }
        .cell-icon {
            margin-right: 0.15rem;
            width: 0.4rem;
            height: 0.4rem;
            overflow:hidden;
            img {
                display:block;
                width: 0.4rem;
                height: 0.4rem;
            }
        }
        .cell-hd {
            flex: 1;
            padding-top: 0.24rem;
            padding-bottom: 0.24rem;
            line-height: 0.4rem;
            font-size: 0.3rem;
            color: #333;
        }
        .cell-bd {
            margin-left: 0.15rem;
            font-size: 0.2rem;
        }
        .cell-ft {
            display: block;
            content: '';
            width: 0.24rem;
            height: 0.24rem;
            border-top: 0.02rem solid #D0D0D0;
            border-right: 0.02rem solid #D0D0D0;
            transform: rotate(45deg);
        }
    }
</style>
