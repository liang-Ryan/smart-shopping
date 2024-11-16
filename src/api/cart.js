import require from '@/utils/request'

// 添加至购物车
export const cartPostAddAPI = (goodsId, goodsNum, goodsSkuId) => require.post('/cart/add', {
  goodsId,
  goodsNum,
  goodsSkuId
})

// 获取购物车商品数量
export const cartGetSumAPI = () => require.get('/cart/total')

// 获取购物车商品列表
export const cartGetListAPI = () => require.get('/cart/list')

// 更新购物车商品
export const cartPostUpdataAPI = (goodsId, goodsNum, goodsSkuId) => require.post('/cart/update', {
  goodsId,
  goodsNum,
  goodsSkuId
})

// 删除购物车商品
export const cartPostClearAPI = (cartList) => require.post('/cart/clear', {
  cartIds: cartList
})
