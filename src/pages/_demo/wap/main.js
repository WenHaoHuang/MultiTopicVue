/**
 * @author : huangwenhao
 * @date   : 2018/6/4
 */

import Vue from 'vue'
import App from './App'
import notify from 'components/wap/notify/index'

Vue.use(notify)
Vue.config.productionTip = false

new Vue({
    el: '#app',
    components: {App},
    template: '<App/>'
})
