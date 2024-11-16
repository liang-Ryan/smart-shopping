import { cartGetListAPI, cartPostUpdataAPI, cartPostClearAPI } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,

  state () {
    return {
      cartList: []
    }
  },

  getters: {
    // 所有商品总数
    cartTotal (state) {
      return state.cartList.reduce((sum, list) => sum + list.goods_num, 0)
    },

    // 选中的商品列表
    cartListSelected (state) {
      return state.cartList.filter(item => item.isChecked)
    },

    // 选中商品数量
    cartTotalSelected (state, getters) {
      return getters.cartListSelected.reduce((sum, list) => sum + list.goods_num, 0)
    },

    // 选中商品总价
    cartPriceSelected (state, getters) {
      return getters.cartListSelected.reduce((sum, list) => sum + list.goods_num * list.goods.goods_price_min, 0).toFixed(2)
    },

    // 全选判断
    isAllChecked (state) {
      return state.cartList.length === 0 ? false : state.cartList.every(element => element.isChecked)
    }
  },

  mutations: {
    // 获取购物车内容
    setCartList (state, data) {
      state.cartList = data.list
    },

    // 修改购物车内容
    changeGoodsNum (state, data) {
      const { id, num } = data
      const goods = state.cartList.find(element => element.goods_id === id)
      goods.goods_num = num
    },

    // 单选
    changeChecked (state, id) {
      const goods = state.cartList.find(element => element.goods_id === id)
      goods.isChecked = !goods.isChecked
    },

    // 全选
    changeAllChecked (state, checkStatus) {
      state.cartList.forEach(element => {
        element.isChecked = !checkStatus
      })
    }
  },

  actions: {
    // 获取购物车列表
    async getList (context) {
      const { data } = await cartGetListAPI()

      // 为返回数组添加isCheacked属性，方便与商品id绑定
      data.list.forEach(element => {
        element.isChecked = false
      })

      context.commit('setCartList', data)
    },

    // 修改购物车内容
    async changeGoods (context, data) {
      const { id, num, skuid } = data

      // 发起请求，修改后台内容
      await cartPostUpdataAPI(id, num, skuid)

      // 修改本地内容
      context.commit('changeGoodsNum', { id: id, num: num })
    },

    // 删除购物车内容
    async delGoodsList (context) {
      const delList = context.getters.cartListSelected.map(element => element.id)
      const { message } = await cartPostClearAPI(delList)
      Toast(message)
      context.dispatch('getList')
    }
  }
}
