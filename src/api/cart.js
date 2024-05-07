import require from '@/utils/request'

// 添加至购物车
export const addToCart = (goodsId, goodsNum, goodsSkuId) => {
  return require.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 获取购物车商品数量
export const getCartSum = () => {
  return require.get('/cart/total')
}

// 获取购物车商品列表
export const getCartList = () => {
  return require.get('/cart/list')
}

// 更新购物车商品
export const changeCartGoods = (goodsId, goodsNum, goodsSkuId) => {
  return require.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 删除购物车商品
export const delCartGoods = (cartList) => {
  return require.post('/cart/clear', {
    cartIds: cartList
  })
}
