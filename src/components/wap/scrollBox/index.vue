/**
* @author : wenhao.huang
* @date   : 2018/1/17
* @project: scroll-box
*/

<template>
    <section class="scroll-box" ref="page">
        <div class="scroll-tbody">
            <div class="scroll-top" v-if="showTop" :class="{'active':upReady}"><em></em>{{scrollTopText}}</div>
            <div class="scroll-inner">
                <slot></slot>
            </div>
        </div>
    </section>
</template>

<script>
    import BScroll from 'better-scroll';

    export default {
        name: "scrollBox",
        data() {
            return {
                upReady: false,
                scrollTopText: '下拉刷新'
            }
        },
        props: {
            showTop: {
                type: Boolean,
                default: false
            },
            showBottom: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            this.$nextTick(() => {
                this._initScroll();
            });
        },
        methods: {
            _initScroll() {
                this.scroll = new BScroll(this.$refs.page, {
                    probeType: 1,
                    scrollY: true,
                    click: true
                });
                this.scroll.on('scroll', (pos) => {
                    if (pos.y >= 50) {
                        this.upReady = true;
                        this.scrollTopText = '松开刷新';
                    } else {
                        this.upReady = false;
                        this.scrollTopText = '下拉刷新';
                    }
                });
                this.scroll.on('scrollEnd', (pos) => {
                    if (this.upReady && this.showTop && pos.y == 0) {
                        this.upReady = false;
                        this.scrollTopText = '下拉刷新';
                        this.$emit('pullUp');
                    } else if (this.showBottom && (this.scroll.y <= this.scroll.maxScrollY + 50)) {
                        this.$emit('pullDown');
                    }
                });
                this.scroll.on('touchEnd', (pos) => {
                    this.$emit('touchEnd', {
                        x: pos.x,
                        y: pos.y,
                        height: Math.abs(this.scroll.maxScrollY)
                    });
                });
            },
            refresh() {
                this.scroll && this.scroll.refresh();
            }
        }
    };
</script>

<style lang="scss">
    @import "./index.scss";
</style>
