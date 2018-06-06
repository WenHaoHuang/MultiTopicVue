<template>
    <div id="app">
        <header-bar></header-bar>
        <div id="main">
            <div class="banner"></div>
            this is content
        </div>
        <footer-bar></footer-bar>
    </div>
</template>

<script>
    import HeaderBar from 'components/pc/HeaderBar'
    import FooterBar from 'components/pc/FooterBar'

    export default {
        name: "app",
        components: {
            HeaderBar,
            FooterBar
        },
        created() {
            //
        }
    }
</script>

<style lang="scss">
    @import '~components/style/basic-pc.scss';
    @import "./style.scss";
</style>
