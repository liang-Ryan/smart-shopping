import { setLocalUserInfo, getLocalUserInfo } from '@/utils/storage'

export default {
  namespaced: true,

  state () {
    return {
      userInfo: getLocalUserInfo()
    }
  },

  getters: { },

  mutations: {
    // 保存用户信息
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      setLocalUserInfo(userInfo)
    }
  },

  actions: {
    // 退出登录
    logOut (context) {
      // 重置购物车信息
      context.commit('cart/setCartList', [], { root: true })
      // 重置用户信息
      context.commit('setUserInfo', {})
    }
  }
}
