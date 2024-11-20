import { state } from '@/types/vuex/search'

const searchHistoryKey = 'smart_shopping_searchHistory'
const getLocalSearchHistory = () => {
  const result = localStorage.getItem(searchHistoryKey)
  return result ? JSON.parse(result) : []
}

// 非空判断
export const isNull = (str: string) => {
  return str.trim() === ''
}

export default {
  namespaced: true,

  state () {
    return {
      searchHistory: getLocalSearchHistory()
    }
  },

  getters: { },

  mutations: {
    // 保存搜索历史记录
    setLocalSearchHistory (state: state) {
      localStorage.setItem(searchHistoryKey, JSON.stringify(state.searchHistory))
    },
    // 查询搜索历史记录
    getLocalSearchHistory  (state: state) {
      const result = localStorage.getItem(searchHistoryKey)
      state.searchHistory = result ? JSON.parse(result) : []
    },
    // 清空搜索历史记录
    clearLocalSearchHistory  (state: state) {
      state.searchHistory = []
      localStorage.removeItem(searchHistoryKey)
    }
  },

  actions: {
    // 添加搜索历史记录
    addLocalSearchHistory (context: any, searchContent: string) {
      if (isNull(searchContent)) return // 非空判断

      context.commit('getLocalSearchHistory') // 检验搜索历史记录

      const arrIndex = context.state.searchHistory.indexOf(searchContent) // 查重
      if (arrIndex !== -1) context.state.searchHistory.splice(arrIndex, 1) // 删除同名记录后，再将搜索结果保存至最前面
      context.state.searchHistory.unshift(searchContent) // 将搜索结果保存至最前面

      context.commit('setLocalSearchHistory') // 保存搜索历史记录
    }
  }
}
