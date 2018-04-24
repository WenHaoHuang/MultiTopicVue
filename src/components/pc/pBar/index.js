import PBar from './index.vue'
PBar.install = function(Vue){
    Vue.component(PBar.name,PBar)
}
export default PBar
