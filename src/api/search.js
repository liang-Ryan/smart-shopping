import request from '@/utils/request'

// 获取搜索商品数据
export const searchGetListAPI = (obj) => request.get('/goods/list', {
  params: obj
})
