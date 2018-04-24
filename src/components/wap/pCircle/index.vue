/**
* @author : wenhao.huang
* @date   : 2018/1/15
* @project: 圆环进度条组件
*/

<template>
    <div class="p-circle">
        <div class="p-circle-process" v-if="showProcess">
            <div class="circle" :class="{'clip-auto': clipAuto}">
                <div class="percent left" v-bind:style="{transform: 'rotate(' + (360 - (360/100)*number) + 'deg)'}"></div>
                <div class="percent right" :class="{wth0: wth0}"></div>
            </div>
            <div class="num"><span>{{number}}</span>%</div>
        </div>
        <div class="p-circle-status" v-if="!showProcess">
            <div class="circle"></div>
            <div class="num">{{text}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pCircle",
        data() {
            return {
                clipAuto: false,
                wth0: true,
                number: 0,
                showProcess: true
            };
        },
        props: {
            percent: {
                type: String,
                default: '0'
            }
        },
        created() {
            const self = this;
            const percentdata = Number(this.percent);
            let percent = 0;

            if(percentdata >= 100){
                this.showProcess = false;
                this.text = '满标';
            }else {
                var loading = setInterval(()=>{
                    if(percent >= percentdata){
                        clearInterval(loading);
                        self.number = percentdata;
                    }else if(percent > 50){
                        self.clipAuto = true;
                        self.wth0 = false;
                    }
                    self.number = percent;
                    percent++;
                },50);
            }
        },
        mounted() {}
    };
</script>

<style lang="scss">
    @import './index';
</style>
