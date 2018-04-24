<template>
    <section class="tabs-container">
        <div class="tab-menu">
            <div class="item-tab" v-html="tab.title" v-for="(tab,index) in tabItems" :key="tab.id"
                 :class="{'active':index == selectedIndex}" @click.prevent="handleSelect(index, 'click')">
                <slot name="tab"></slot>
            </div>
        </div>
        <div class="tab-content">
            <slot></slot>
        </div>
    </section>
</template>
<script>
    import bus from 'components/js/bus.js';

    export default {
        name: "tabs",
        data() {
            return {
                tabItems: [],
                selectedIndex: 0,
                prevSelectedIndex: -1,
                activeIndex:''
            };
        },
        watch: {
            activeIndex(val) {
                this.selectedIndex = val;
            }
        },
        methods: {
            isActive(index) {
                return index === this.selectedIndex;
            },
            handleSelect(index) {
                if (this.prevSelectedIndex !== -1) {
                    this.tabItems[this.selectedIndex].deActivated();
                }
                this.prevSelectedIndex = this.selectedIndex;
                this.selectedIndex = index;
                this.tabItems[index].onActivated(index, this.prevSelectedIndex);
                bus.$emit('tabChange', index);
                this.$emit('onClick', index);
            }
        },
        mounted() {
            const query = this.$route.query
            this.activeIndex = query.status || 0
            this.tabItems = this.$children.filter(child => child.isTabItem);
            this.handleSelect(this.activeIndex);
        }
    };
</script>

<style lang="scss">
    @import "./index";
</style>
