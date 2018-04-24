<!--
 * @author wh
 * @Date   2017/12/23
-->
<template>
    <header class="header flex flex-align-center text-center">
        <aside class="header_back" @click="backFn"></aside>
        <div class="header_title flex-bd text-md">{{title}}</div>
        <aside class="header_menu" @click="showMenuFn"></aside>
    </header>
</template>

<script>

    export default {
        name: 'headerBar',
        data() {
            return {
                data: ''
            }
        },
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        methods:{
            showMenuFn(){
                this.$emit('onClick',true);
            },
            backFn(){
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="scss">
 @import "index";
</style>
