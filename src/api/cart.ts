import require from '@/utils/request'

// 添加至购物车
export const cartPostAddAPI = (goodsInfo: goodsInfo) => require.post('/cart/add', {
  ...goodsInfo
})

// 获取购物车商品数量
export const cartGetSumAPI = () => require.get('/cart/total')

// 获取购物车商品列表
export const cartGetListAPI = () => require.get('/cart/list')

// 更新购物车商品
export const cartPostUpdataAPI = (goodsInfo: goodsInfo) => require.post('/cart/update', {
  ...goodsInfo
})

// 删除购物车商品
export const cartPostClearAPI = (cartList: number[]) => require.post('/cart/clear', {
  cartIds: cartList
})
