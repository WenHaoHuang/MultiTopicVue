/**scrollAble.vue
* @author 陈浩
* 页面滚动组件
*/
<template>
    <section class="scroll-able" ref="myScrollAble">
        <div v-show="!showDataStatus(data)">
            <div class="scroll-top" v-if="topTipShow" :class="{'active':topReady}"><em></em>{{scrollTopText}}</div>
            <slot></slot>
            <div class="scroll-footer">
                <div v-if="bottomStatus == 'done'">数据加载完毕</div>
                <div v-if="bottomStatus == 'more'">查看更多</div>
                <div v-if="bottomStatus == 'loading'">
                    <loading></loading>
                </div>
            </div>
        </div>
        <div class="loading-style" v-show="showDataStatus(data)">
            <!--<loading></loading>-->
        </div>
        <div class="not-data-wraper" v-if="noData">
            <no-data :type="noDataType"></no-data>
        </div>
    </section>
</template>
<script>
    import bus from 'components/js/bus.js';
    import BScroll from "better-scroll";
    import bottomTip from './bottom-tip.vue';
    import loading from 'components/wap/loading';
    import noData from 'components/wap/noData';

    const props = {
        props: ['data']
    };

    export default {
        name: "scrollAble",
        mixins: [props],
        components: {
            bottomTip,
            loading,
            noData
        },
        props: {
            topTipShow: {
                type: Boolean,
                default: true
            },
            bottomTipShow: {
                type: Boolean,
                default: false
            },
            canPullUp: {
                type: Boolean,
                default: true
            },
            canPullDown: {
                type: Boolean,
                default: true
            },
            noDataType: {
                type: String,
                default: '1'
            }
        },
        data() {
            return {
                scrollTopText:'下拉即可刷新',
                pullDown: false,
                noData: false,
                topReady:false,
                bottomStatus: 'more',
                showInfo: false
            }
        },
        mounted() {
            const self = this;

            function runInit() {
                setTimeout(() => {
                    self._initScroll();
                }, 200);
            }

            runInit();
            bus.$on('tabChange', (msg) => {
                setTimeout(() => {
                    if (self.scroll.scrollerWidth == 0) {
                        self.refresh();
                    }
                }, 200);
            });
        },
        methods: {
            _initScroll() {
                const self = this;
                this.scroll = new BScroll(this.$refs.myScrollAble, {
                    probeType: 1,
                    scrollY: true,
                    click: true
                });
                this.scroll.on('scroll', (pos) => {
                    if (pos.y > 50) {
                        self.topReady = true;
                        self.scrollTopText = '松开立即刷新';
                    } else {
                        self.topReady = false;
                        self.scrollTopText = '下拉即可刷新';
                    }
                });
                this.scroll.on('scrollEnd', (pos) => {
                    if (self.canPullUp && self.topReady && pos.y == 0) {
                        self.topReady = false;
                        self.scrollTopText = '下拉即可刷新';
                        self.$emit('pullUp');
                    }
                    if (self.canPullDown) {
                        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                            this.$emit('pullDown');
                        }
                    }
                });
                this.scroll.on('touchEnd', (pos) => {
                    self.$emit('touchEnd', {
                        x: pos.x,
                        y: Math.abs(pos.y),
                        height: Math.abs(this.scroll.maxScrollY)
                    });
                });
            },
            refresh() {
                this.scroll && this.scroll.refresh();
            },
            showDataStatus(data) {
                return JSON.stringify(data) == '' || JSON.stringify(data) == '' || JSON.stringify(data) == '[]' || JSON.stringify(data) == '{}'
            }
        },
        watch: {
            data: {
                handler: function (val, oldVal) {
                    const self = this;
                    setTimeout(() => {
                        self.refresh();
                    }, 50);
                },
                deep: true
            },
        }
    };
</script>
<style lang="scss">
    .scroll-able {
        position:absolute;
        left:0;top:0;
        width:100%;height:100%;
        overflow:hidden;
        .not-data-wraper {
            position:absolute;
            top:0;
            left:0;
            width: 100%;
            height:100%;
        }
        .loading-style {
            position:absolute;
            left:0;right:0;top:0;bottom:0;
            z-index:100;
            text-align:center;
        }
        .scroll-top{
            position:absolute;
            left:0;right:0;
            top:-0.8rem;
            height:0.8rem;
            display:flex;
            flex-direction:row;
            justify-content:center;
            align-items:center;
            text-align:center;
            color:#888;
            em{
                display:block;
                width:0.3rem;height:0.3rem;
                margin-right:0.04rem;
                background:transparent url("./icon/loading_shanghua.png");
                background-size:100%;
                transition:all 0.2s;
            }
            &.active{
                em{
                    transform:rotate(-180deg);
                }
            }
        }
        .scroll-footer{
            width: 100%;
            height: 0.4rem;
            line-height: 0.4rem;
            text-align: center;
            font-size: 0.3rem;
            margin-top: 0.1rem;
            color: #888;
        }
    }
</style>
