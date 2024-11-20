export type state = {
  cartList: []
}

export type goods = {
  goods: {
    'goods_price_min': number
  },
  'goods_num': number,
  'goods_id': string,
  isChecked?: boolean
}
