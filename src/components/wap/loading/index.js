import Temple from './index.vue';

const loading = {
    install: function (Vue) {
        Vue.component('loading', Temple);
        let temple = Vue.extend(Temple);
        let $vm = new temple();
        let tpl = $vm.$mount().$el;
        document.body.appendChild(tpl);
        Vue.prototype.$loading = (function(){
            const start = function(){
                $vm.status = true;
            }
            const stop = function(){
                $vm.status = false;
            }
            return {
                start:start,
                stop:stop
            }
        })();
    }
};
export default loading;
