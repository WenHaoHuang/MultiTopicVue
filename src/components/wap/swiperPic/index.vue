/**
* @author : wenhao.huang
* @date   : 2018/1/15
* @project: swiper轮播图组件
*/
<template>
    <section class="swiper-section">
        <div v-if="imgList.length > 1">
            <swiper :options="swiperOption" class="swiper-box" :style="{height: height}" ref="mySwiper">
                <swiper-slide class="swiper-item" v-for="item in imgList" :key="item.id">
                    <img :src="item.picUrl" :alt="item['name']" @click="redirectUrl(item['redirectUrl'])">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"
                     :class="[`swiper-page-style-${pageStyle}`, `swiper-page-position-${pagePos}`]"></div>
            </swiper>
        </div>
        <div v-if="imgList.length == 1" :style="{height: height}">
            <div class="swiper-item" v-for="item in imgList" :key="item.id">
                <img :src="item.picUrl" :alt="item['name']" @click="redirectUrl(item['redirectUrl'])">
            </div>
        </div>
        <div v-if="!imgList.length" class="swiper-not-show" :style="{height: height}">loading</div>
    </section>
</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper';

    export default {
        name: 'swiperPic',
        components: {
            swiper,
            swiperSlide
        },
        data() {
            return {
                swiperOption: {
                    notNextTick: true,
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    direction: 'horizontal',
                    slidesPerView: 'auto',
                    paginationClickable: true,
                    // spaceBetween: 30,
                    mousewheelControl: true,
                    autoplay: true,
                    loop: true,
                    passiveListeners: false,
                    preventClicks: false
                }
            }
        },
        props: {
            imgList: {
                type: Array,
                default: () => {
                    return [
                        {
                            picUrl: '',
                            redirectUrl: '',
                            name: ''
                        }
                    ]
                }
            },
            height: {
                type: String,
                default: '3rem'
            },
            // 分页类型, dot:点，bg:带透明背景，line:横线
            pageStyle: {
                type: String,
                default: 'dot'
            },
            pagePos: {
                type: String,
                default: 'center'
            }
        },
        methods: {
            redirectUrl(url) {
                if (url != '') {
                    window.location.href = url;
                }
            }
        }
    }
</script>

<style lang="scss">
    @import './swiper.min';
    @import './index';
</style>
