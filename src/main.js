// vue组件
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 外部组件
import '@/utils/vant-ui'

// 样式
import '@/assets/common.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
