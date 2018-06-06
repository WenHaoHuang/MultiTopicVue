<template>
    <div id="app">
        this is content
    </div>
</template>

<script>
    export default {
        name: "app",
        created(){
            this.$msg('开启一段奇妙的旅程')
        }
    }
</script>

<style lang="scss">
    @import "./style.scss";
</style>
