// =============================
// 用户信息
// =============================

const userInfoKey = 'smart_shopping_userInfo'

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
