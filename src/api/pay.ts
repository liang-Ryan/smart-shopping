import request from '@/utils/request'

// 获取订单
export const payGetOrderAPI = (mode: string, goodsInfo: goodsInfo) => request.get('/checkout/order', {
  params: {
    mode, // cart 或者 buyNow
    delivery: 10,
    shopId: 0,
    couponId: 0,
    isUsePoints: 0,
    ...goodsInfo // { goodsId, goodsNum, goodsSkuId }
  }
})

// 提交订单
export const payPostSubmitAPI = (mode: string, goodsInfo: goodsInfo, remark: string) => request.post('/checkout/submit', {
  delivery: 10,
  couponId: 0,
  isUsePoints: 0,
  payType: 10,
  remark,
  mode,
  ...goodsInfo
})
