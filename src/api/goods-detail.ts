import request from '@/utils/request'

// 商品详情
export const goodsGetDetailAPI = (id: number) => request.get('/goods/detail', {
  params: {
    goodsId: id
  }
})

// 商品保障服务
export const goodsGetServiceAPI = (id: number) => request.get('/goods.service/list', {
  params: {
    goodsId: id
  }
})

// 获取商品评价
export const goodsGetCommentsAPI = (id: number, amount: number) => request.get('/comment/listRows', {
  params: {
    goodsId: id,
    limit: amount
  }
})

// 获取商品评价列表
export const goodsGeCommentListAPI = (scoreType: number, id: number, page: number) => request.get('/comment/list', {
  params: {
    scoreType,
    goodsId: id,
    page
  }
})
