export default {
  namespaced: true,

  state () {
    return {
      searchHistoryKey: 'smart_shopping_searchHistory'
    }
  },

  getters: { },

  mutations: {
    // 保存搜索历史记录
    setLocalSearchHistory (state) {
      localStorage.setItem(state.searchHistoryKey, JSON.stringify(state.searchHistory))
    },
    // 查询搜索历史记录
    getLocalSearchHistory  (state) {
      const result = localStorage.getItem(state.searchHistoryKey)
      state.searchHistory = result ? JSON.parse(result) : []
    },
    // 清空搜索历史记录
    clearLocalSearchHistory  (state) {
      state.searchHistory = []
      localStorage.removeItem(state.searchHistoryKey)
    }
  },

  actions: {
    // 添加搜索历史记录
    addLocalSearchHistory (context, searchContent) {
      context.commit('getLocalSearchHistory') // 检验搜索历史记录

      const arrIndex = context.state.searchHistory.indexOf(searchContent) // 查重
      if (arrIndex !== -1) context.state.searchHistory.splice(arrIndex, 1) // 删除同名记录后，再将搜索结果保存至最前面
      context.state.searchHistory.unshift(searchContent) // 将搜索结果保存至最前面

      context.commit('setLocalSearchHistory') // 保存搜索历史记录
    }
  }
}
