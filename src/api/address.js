import request from '@/utils/request'

// 获取默认收获地址id
export const getDefaultAddressID = () => {
  return request.get('/address/defaultId')
}
// 获取地址详情
export const getAddressDetail = (addressId) => {
  return request.get('/address/detail', {
    param: {
      addressId
    }
  })
}

// 获取收货地址列表
export const getAddressList = () => {
  return request.get('/address/list')
}

// 删除收货地址
export const delAddress = (id) => {
  return request.post('/address/remove', {
    addressId: id
  })
}
