import request from '@/utils/request'

// 商品详情
export const getGoodsDetail = (id) => {
  return request.get('/goods/detail', {
    params: {
      goodsId: id
    }
  })
}

// 商品保障服务
export const getGoodsService = (id) => {
  return request.get('/goods.service/list', {
    params: {
      goodsId: id
    }
  })
}

// 获取商品评价
export const getGoodsComment = (id, amount) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId: id,
      limit: amount
    }
  })
}
// 获取商品评价列表
export const getGoodsCommentList = (scoreType, id, page) => {
  return request.get('/comment/list', {
    params: {
      scoreType,
      goodsId: id,
      page
    }
  })
}
