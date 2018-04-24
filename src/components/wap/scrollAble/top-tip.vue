<template>
    <section class="top-tip" v-if="show">
        <div class="tip" :class="{'active':ready}"><em></em>
            <span v-html="ready ? '下拉即可刷新' : '松开立即刷新'"></span></div>
    </section>
</template>

<script>
    export default {
        name: 'topTip',
        data() {
            return {
                topTip: ''
            }
        },
        props: {
            show: {
                type: Boolean,
                default: true
            },
            ready: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style lang="scss">
    .top-tip {
        position: absolute;
        top: -0.8rem;
        left: 0;
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.3rem;
        color: #888;
        z-index: 1;
        .tip {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            em {
                display: inline-block;
                width: 0.44rem;
                height: 0.44rem;
                line-height: 0.44rem;
                margin-right: 0.2rem;
                background: url(./icon/loading_xiala.png) no-repeat center center;
                background-size: cover;
                transform: rotate(-180deg);
                transition: transform 0.3s;
            }
            &.active {
                em {
                    transform: rotate(0);
                }
            }
        }
    }
</style>
