// Vue根组件
import Vue from 'vue'
import Vuex from 'vuex'

// 模块
import user from './moduel/user'
import search from './moduel/search'
import cart from './moduel/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    token (theState) {
      return theState.user.userInfo.token
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    search,
    cart
  }
})
