/**
* @author : wenhao.huang
* @date   : 2018/4/3
* @project: scroll-list
*/

<template>
    <section class="scroll-list" ref="scrollList">
        <div class="scroll-tbody" v-show="data">
            <div class="scroll-top" v-if="showTop" :class="{'active':upReady}"><em></em>{{scrollTopText}}</div>
            <div class="scroll-inner">
                <slot></slot>
            </div>
            <div class="scroll-footer">
                <div v-if="bottomStatus == 'over'">数据加载完毕</div>
                <div v-if="bottomStatus == 'more'">查看更多</div>
                <div v-if="bottomStatus == 'in'">
                    数据加载中…
                </div>
            </div>
        </div>
        <div class="list-empty" v-show="!data">
            <no-data :type="empty"></no-data>
        </div>
    </section>
</template>

<script>
    import BScroll from 'better-scroll'
    import noData from 'components/wap/noData'

    const mixin = {
        props: ['data']
    }

    export default {
        name: "scrollList",
        mixins: [mixin],
        components: {
            noData
        },
        data() {
            return {
                upReady: false,
                scrollTopText: '下拉刷新',
                isLoading: true,
                isEmpty: false,
                bottomStatus: 'more',
            }
        },
        props: {
            empty: {
                type: Number,
                default: 1
            },
            loading: {
                type: Boolean,
                default: false
            },
            showTop: {
                type: Boolean,
                default: true
            },
            showBottom: {
                type: Boolean,
                default: true
            }
        },
        mounted() {
            this.$nextTick(() => {
                this._initScroll();
            });
        },
        methods: {
            _initScroll() {
                this.scroll = new BScroll(this.$refs.scrollList, {
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
                        this.$emit('pullDown');
                    } else if (this.showBottom && (this.scroll.y <= this.scroll.maxScrollY + 50)) {
                        this.$emit('pullUp');
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
            },
        },
        watch: {
            data: {
                handler: function () {
                    setTimeout(() => {
                        this.refresh();
                    }, 50);
                },
                deep: true
            },
        }
    };
</script>

<style lang="scss">
    @import "./index.scss";
</style>
