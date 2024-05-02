import { setLocalUserInfo, getLocalUserInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      userInfo: getLocalUserInfo()
    }
  },
  getters () { },
  mutations: {
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      setLocalUserInfo(userInfo)
    }
  },
  actions: { }
}
