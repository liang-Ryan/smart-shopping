import request from '@/utils/request'

// 获取搜索商品数据
export const searchGetListAPI = (query: searchQuery) => request.get('/goods/list', {
  params: query
})
