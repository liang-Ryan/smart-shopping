const userInfoKey = 'smart_shopping_userInfo' // 用户信息
const searchHistoryKey = 'smart_shopping_searchHistory' // 搜索历史记录

// 保存用户信息
export const setLocalUserInfo = (userInfo) => {
  localStorage.setItem(userInfoKey, JSON.stringify(userInfo))
}
// 查询用户信息
export const getLocalUserInfo = () => {
  const result = localStorage.getItem(userInfoKey)
  return result ? JSON.parse(result) : { token: '', userId: '' }
}
// 删除用户信息
export const delLocalUserInfo = () => {
  localStorage.removeItem(userInfoKey)
}

// 保存搜索历史记录
export const setLocalSearchHistory = (searchHistory) => {
  localStorage.setItem(searchHistoryKey, JSON.stringify(searchHistory))
}
// 查询搜索历史记录
export const getLocalSearchHistory = () => {
  const result = localStorage.getItem(searchHistoryKey)
  return result ? JSON.parse(result) : []
}
// 删除搜索历史记录
export const delLocalSearchHistory = () => {
  localStorage.removeItem(searchHistoryKey)
}
