import request from '@/utils/request'

// 获取默认收获地址id
export const addressGetDefaultIdAPI = () => request.get('/address/defaultId')

// 获取地址详情
export const addressGetDetailAPI = (addressId: number) => request.get('/address/detail', {
  params: {
    addressId
  }
})

// 获取收货地址列表
export const addressGetListAPI = () => request.get('/address/list')

// 修改默认收货地址
export const addressPostDefaultAPI = (addressId: number) => request.post('/address/setDefault', {
  addressId
})

// 删除收货地址
export const addressPostRemoveAPI = (addressId: number) => request.post('/address/remove', {
  addressId
})
