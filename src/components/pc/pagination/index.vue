<template>
    <div class="pagination-content">
        <button class="pager-btn previous" @click="goPreviousFn" :disabled="currentPage<=1">上一页</button>
        <ul class="pager-list">
            <li class="pager-item"
                v-for="(page,index) in curPagesList"
                :class="{'active':currentPage==page}"
                @click="currentPage=page"
            >{{page}}</li>
        </ul>
        <button class="pager-btn next" @click="goNextFn" :disabled="currentPage>=totalPages">下一页</button>
        <span class="desc">共{{total}}条记录，{{totalPages}}页</span>
    </div>

</template>

<script>
    export default {
        name: 'pagination',
        props: {
            total: {
                type: Number,
                require: true
            },
            display: {
                type: Number,
                default: 3
            },
            pageSize: {
                type: Number,
                default: 10
            },
            currentNum: {
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                currentPage: this.currentNum,
            }
        },
        computed: {
            totalPages() {
                let total = this.total
                let pageSize = this.pageSize
                if (total % pageSize === 0) {
                    return total / pageSize
                } else {
                    return parseInt(total / pageSize) + 1
                }
            },
            curPagesList() {
                let arr = []
                let currentNum = 0
                let display = this.display
                if (this.currentPage > display) {
                    if (this.currentPage % display === 0) {
                        currentNum = this.currentPage / display - 1
                    } else {
                        currentNum = parseInt(this.currentPage / display)
                    }
                }
                let start = currentNum * display + 1
                let end = (currentNum + 1) * display
                if (end >= this.totalPages) {
                    end = this.totalPages
                }
                for (let i = start; i <= end; i++) {
                    arr.push(i)
                }
                return arr
            }
        },
        methods: {
            goPreviousFn(){
                this.currentPage--;
            },
            goNextFn(){
                this.currentPage++;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .pagination-content {
        width: 800px;
        margin: 20px auto 0;
        .pager-btn {
            display: inline-block;
            vertical-align: middle;
            margin: 0 5px;
            width: 70px;
            line-height: 32px;
            font-size: 13px;
            color: #333;
            text-align: center;
            background: #fff;
            border: 1px solid #ddd;
            cursor: pointer;
            &:disabled{
                cursor: no-drop;
            }
        }
        .pager-list {
            display: inline-block;
            vertical-align: middle;
            font-size: 0;
            .pager-item {
                min-width: 40px;
                margin: 0 5px;
                line-height: 32px;
                padding: 0 4px;
                font-size: 13px;
                color: #333;
                text-align: center;
                background: #ffffff;
                display: inline-block;
                vertical-align: middle;
                border: 1px solid #ddd;
                border-radius: 5px;
                cursor: pointer;
                transition: all .2s;
                &.active {
                    color: #fff;
                    background: #448ff2;
                }
            }
        }
        .desc {
            display: inline-block;
            vertical-align: middle;
            font-size: 13px;
            color: #333;
        }
    }
</style>
