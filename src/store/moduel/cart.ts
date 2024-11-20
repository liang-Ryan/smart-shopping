import { cartGetListAPI, cartPostUpdataAPI, cartPostClearAPI } from '@/api/cart'
import { Toast } from 'vant'
import { state, goods } from '@/types/vuex/cart'

export default {
  namespaced: true,

  state () {
    return {
      cartList: []
    }
  },

  getters: {
    // 所有商品总数
    cartTotal (state: state) {
      return state.cartList.reduce((sum: number, list: goods) => sum + list.goods_num, 0)
    },

    // 选中的商品列表
    cartListSelected (state: state) {
      return state.cartList.filter((item:goods) => item.isChecked)
    },

    // 选中商品数量
    cartTotalSelected (state: state, getters: any) {
      return getters.cartListSelected.reduce((sum: number, list: goods) => sum + list.goods_num, 0)
    },

    // 选中商品总价
    cartPriceSelected (state: state, getters: any) {
      return getters.cartListSelected.reduce((sum: number, list: goods) => sum + list.goods_num * list.goods.goods_price_min, 0).toFixed(2)
    },

    // 全选判断
    isAllChecked (state: state) {
      return state.cartList.length === 0 ? false : state.cartList.every((element: goods) => element.isChecked)
    }
  },

  mutations: {
    // 获取购物车内容
    setCartList (state: state, data:{ list: [] }) {
      state.cartList = data.list
    },

    // 修改购物车内容
    changeGoodsNum (state: state, data: goodsInfo) {
      const { goodsId, goodsNum } = data
      const goods: goods = state.cartList.find((element: goods) => element.goods_id === goodsId)!
      goods.goods_num = goodsNum
    },

    // 单选
    changeChecked (state: state, goodsId: string) {
      const goods: goods = state.cartList.find((element: goods) => element.goods_id === goodsId)!
      goods.isChecked = !goods.isChecked
    },

    // 全选
    changeAllChecked (state: state, checkStatus: boolean) {
      state.cartList.forEach((element: goods) => {
        element.isChecked = !checkStatus
      })
    }
  },

  actions: {
    // 获取购物车列表
    async getList (context: any) {
      const { data } = await cartGetListAPI()

      // 为返回数组添加isCheacked属性，方便与商品id绑定
      data.list.forEach((element: goods) => {
        element.isChecked = false
      })

      context.commit('setCartList', data)
    },

    // 修改购物车内容
    async changeGoods (context: any, goodsInfo: goodsInfo) {
      // 发起请求，修改后台内容
      await cartPostUpdataAPI(goodsInfo)

      // 修改本地内容
      context.commit('changeGoodsNum', { goodsId: goodsInfo.goodsId, goodsNum: goodsInfo.goodsNum })
    },

    // 删除购物车内容
    async delGoodsList (context: any) {
      console.log(context.getters.cartListSelected)
      const delList = context.getters.cartListSelected.map((element: any) => element.id)
      const { message }: { message: string } = await cartPostClearAPI(delList)
      console.log(message)
      Toast(message)
      context.dispatch('getList')
    }
  }
}
