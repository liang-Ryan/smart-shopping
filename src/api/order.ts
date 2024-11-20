import request from '@/utils/request'

// 获取订单列表
export const orderGetListAPI = (dataType: string, page: number) => request.get('/order/list', {
  params: {
    dataType,
    page
  }
})

// 确认收货
export const orderPostReceiptAPI = (orderId: number) => request.post('/order/receipt', {
  orderId
})

// 取消订单
export const orderPostCancelAPI = (orderId: number) => request.post('/order/cancel', {
  orderId
})
