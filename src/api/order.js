import request from '@/utils/request'

// 获取订单列表
export const getOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}

// 确认收货
export const receiptOrder = (orderId) => {
  return request.post('/order/receipt', {
    orderId
  })
}

// 取消订单
export const cancelOrder = (orderId) => {
  return request.post('/order/cancel', {
    orderId
  })
}
