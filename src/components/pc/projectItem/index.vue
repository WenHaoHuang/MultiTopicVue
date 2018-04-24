<template>
    <div class="project-box">
        <div class="project-name">{{data.projectName}}</div>
        <div class="project-apr text-primary text-center"><span>{{data.apr}}</span>%</div>
        <div class="project-item text-center text-info">预期年化利率</div>
        <div class="project-progress">
            <progress-bar :precent="data.progress"></progress-bar>
        </div>
        <div class="project-item text-right text-sm text-info pb10">剩余{{data.restAmountText}}/{{data.projectAmountText}}</div>
        <div class="project-detail">
            <div class="pull-right">{{data.durationText}}</div>
            <span>项目期限</span>
        </div>
        <div class="project-detail">
            <div class="pull-right">{{data.minAmountText}}</div>
            <span>起投金额</span>
        </div>
        <div class="project-detail">
            <div class="pull-right">先息后本</div>
            <span>还款方式</span>
        </div>
        <div class="project-item text-center pt20">
            <a :href="`/project/detail?id=${data.projectId}`" class="btn btn-primary is-plain">立即出借</a>
        </div>
        <div class="project-item text-center text-info text-sm pt20 pb20">
            <a href="/project/list">查看更多固投项目&gt;&gt;</a>
        </div>
    </div>
</template>

<script>
    import progressBar from 'components/pc/progressBar'

    export default {
        name: "index",
        components:{
            progressBar
        },
        props:{
            data:''
        }
    }
</script>

<style lang="scss">
@import "index";
</style>
