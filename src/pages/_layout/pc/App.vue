<template>
    <div id="app">
        this is vue content
    </div>
</template>

<script>
    export default {
        name: 'App',
        mounted(){
            this.$msg('1111')
        }
    }
</script>

<style lang="scss">
    @import "./assets/style";
</style>
