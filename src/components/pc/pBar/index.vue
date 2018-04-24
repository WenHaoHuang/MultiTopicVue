<template>
    <div class="progress-base" :class="[`progress_${types[type]}`]">
        <p class="percent" :style="{width: progressW }"></p>
        <span class="tip" :style="{left: progressW }">{{progressW}}</span>
    </div>
</template>
<script>
    export default {
        name: 'pbar',
        props: {
            percent: {
                type: Number,
                default: 0
            },
            type: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                types: ['app', 'vip', 'new', 'end'],
                progressW: 0,
            }
        },
        created(){
            const percent = this.percent
            this.$nextTick(() => {
                this.progressW = percent*100 + '%'
            })
        },
        watch: {
            progressW(val) {
                this.$nextTick(() => {
                    this.percentData = val + '%'
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .progress-base {
        width: 100%;
        height: 3px;
        position: relative;
        border-radius: 10px;
        background: #c7ddfb;
        .percent {
            position: absolute;
            top: 0;
            left: 0;
            height: 3px;
            width: 40px;
            font-size: 0;
            z-index: 1;
            transition: all .3s ease;
            background: linear-gradient(to right,#448ef2, #447cf2);
        }
        .tip {
            width: 44px;
            color: #fff;
            font-size: 12px;
            text-align: center;
            border-radius: 5px;
            background: #447cf2;
            transition: all .3s ease;
            position: absolute;
            top: -28px;
            margin-left: -24px;
            &:after {
                content: '';
                position: absolute;
                top: 100%;
                left: 50%;
                margin-left: -2px;
                border: 4px solid transparent;
                border-top-color: #447cf2;
            }
        }
    }

    .progress_app {
        background: #c7ddfb;
        .percent {
            background: linear-gradient(to right,#448ef2, #447cf2);
        }
        .tip {
            background: #447ef2;
            &:after {
                border-top-color: #447ef2;
            }
        }
    }

    .progress_vip {
        background: #f4e8cb;
        .percent {
            background: linear-gradient(to right,#e7c36d, #dab255);
        }
        .tip {
            background: #dab356;
            &:after {
                border-top-color: #dab356;
            }
        }
    }

    .progress_new {
        background: #ffeac8;
        .percent {
            background: linear-gradient(to right,#fed14a, #feba4a);
        }
        .tip {
            background: #fec24a;
            &:after {
                border-top-color: #fec24a;
            }
        }
    }

    .progress_end {
        background: #d1d6dd;
        .percent {
            background: linear-gradient(to right,#e1e5eb , #bfc5cd);
        }
        .tip {
            background: #bec4cc;
            &:after {
                border-top-color: #bec4cc;
            }
        }
    }
</style>
