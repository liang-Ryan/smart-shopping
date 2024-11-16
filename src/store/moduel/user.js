const userTokenKey = 'smart_shopping_userToken'

// 查询用户信息
const getLocalUserToken = () => {
  const result = localStorage.getItem(userTokenKey)
  return result ? JSON.parse(result) : { token: '', userId: '' }
}

export default {
  namespaced: true,

  state () {
    return {
      userToken: getLocalUserToken(userTokenKey) || {}
    }
  },

  getters: { },

  mutations: {
    // 保存用户信息至本地
    setLocalUserToken (state) {
      localStorage.setItem(userTokenKey, JSON.stringify(state.userToken))
    },
    // 删除本地用户信息
    delLocalUserToken () {
      localStorage.removeItem(userTokenKey)
    }
  },

  actions: {
    // 保存用户信息
    setUserToken (context, userToken) {
      context.state.userToken = userToken
      context.commit('setLocalUserToken')
    },
    // 退出登录
    resetInfo (context) {
      context.commit('cart/setCartList', [], { root: true }) // 重置购物车信息
      context.dispatch('setUserToken', {}) // 重置用户信息
    }
  }
}
