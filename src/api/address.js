import request from '@/utils/request'

// 获取默认收获地址id
export const addressGetDefaultIdAPI = () => request.get('/address/defaultId')

// 获取地址详情
export const addressGetDetailAPI = (id) => request.get('/address/detail', {
  params: {
    addressId: id
  }
})

// 获取收货地址列表
export const addressGetListAPI = () => request.get('/address/list')

// 修改默认收货地址
export const addressPostDefaultAPI = (id) => request.post('/address/setDefault', {
  addressId: id
})

// 删除收货地址
export const addressPostRemoveAPI = (id) => request.post('/address/remove', {
  addressId: id
})
