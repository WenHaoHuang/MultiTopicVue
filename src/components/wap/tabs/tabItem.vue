<template>
    <transition name="fade">
        <div v-show="isActive"
             class="tab-pane"
             :class="{ 'active': isActive }">
            <slot></slot>
        </div>
    </transition>
</template>
<script>
    import bus from 'components/js/bus.js';

    export default {
        name: "tabItem",
        props: {
            title: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: ''
            },
            selected: {
                type: Boolean,
                default: true
            },
        },
        data(){
            return {
                isActive:false
            }
        },
        beforeCreate() {
            this.isTabItem = true;
        },
        methods: {
            onActivated() {
                this.isActive = true;
                bus.$emit('tabItemActive', this.name);
            },
            deActivated() {
                this.isActive = false;
            }
        },
    };
</script>
