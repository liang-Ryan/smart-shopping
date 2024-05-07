<template>
  <div class="cart">
    <van-nav-bar title="购物车" fixed />
    <div class="cart-content" v-if="loginCheck && cartList.length > 0">
      <!-- 购物车top -->
      <div class="cart-top">
        <span class="all">共<span>{{ cartTotal }}</span>件商品</span>
        <span class="edit" @click="switchMode">
          <van-icon name="edit" />
          编辑
        </span>
      </div>

      <!-- 购物车列表 -->
      <div class="cart-list">
        <div class="cart-item" v-for="item in cartList" :key="item.goods_id">
          <van-checkbox :value="item.isChecked" @click="changeChecked(item.goods_id)"></van-checkbox>
          <div class="show" @click="$router.push(`/detial/${item.goods_id}`)">
            <img :src="item.goods.goods_image" alt="">
          </div>
          <div class="info">
            <span class="tit text-ellipsis" @click="$router.push(`/detial/${item.goods_id}`)">{{ item.goods.goods_name }}</span>
            <span class="bottom">
              <div class="price">¥ <span>{{ item.goods.goods_price_min }}</span></div>
              <counter :value="item.goods_num" @input="(value) => changeGoods({id: item.goods_id, num: value, skuid: item.goods_sku_id})"></counter>
            </span>
          </div>
        </div>
      </div>

      <div class="footer-fixed">
        <div class="select-check" @click="changeAllChecked(isAllChecked)">
          <van-checkbox :value="isAllChecked" icon-size="18"></van-checkbox>
          全选
        </div>

        <div class="select-total">
          <div class="price">
            <span>合计：</span>
            <span>¥ <span class="total-price">{{ cartPriceSelected }}</span></span>
          </div>
          <div v-if="!editMode" class="pay" :class="{ disabled: cartTotalSelected === 0 }">结算({{ cartTotalSelected }})</div>
          <div v-else class="delete" :class="{ disabled: cartTotalSelected === 0 }" @click="delCheck()" >删除</div>
        </div>
      </div>
    </div>
    <div class="empty-cart" v-else >
      <img src="@/assets/empty.png" alt="">
      <div class="tips" v-html="loginCheck ? '您的购物车是空的, 快去逛逛吧' : '请先登录'"></div>
      <div class="btn" v-if="loginCheck" @click="$router.push('/')">去逛逛</div>
      <div class="btn" v-else @click="$router.push('/login')">登录</div>
    </div>
  </div>
</template>

<script>
import counter from '@/components/counter.vue'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'CartPage',

  created () {
    if (this.loginCheck) {
      this.getList()
    }
  },

  data () {
    return {
      checkAll: false,
      editMode: false
    }
  },

  computed: {
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', ['cartTotal', 'cartTotalSelected', 'cartPriceSelected', 'isAllChecked']),
    loginCheck () {
      return this.$store.getters.token
    }
  },

  methods: {
    ...mapMutations('cart', ['changeChecked', 'changeAllChecked']),
    ...mapActions('cart', ['getList', 'changeGoods', 'delGoodsList']),
    switchMode () {
      this.editMode = !this.editMode
    },
    delCheck () {
      this.$dialog.confirm({
        message: '确认删除所选商品吗？'
      })
        .then(() => {
          this.delGoodsList()
          this.editMode = false
        })
        .catch(() => {
        })
    }
  },

  components: {
    counter
  }
}
</script>

<style lang="less" scoped>
.cart {
  padding-top: 46px;
  padding-bottom: 100px;
  background-color: #f5f5f5;
  min-height: 100vh;

  .cart-top {
    height: 40px;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;

    .all {
      span {
        margin: 0 2px;
        color: #fa2209;
        font-size: 16px;
      }
    }

    .edit {
      .van-icon {
        font-size: 18px;
      }
    }
  }

  .cart-list {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .cart-item {
      padding: 10px;
      margin: 0 10px;
      border-radius: 5px;
      background-color: #ffffff;
      display: flex;
      justify-content: space-between;

      .show img {
        width: 100px;
        height: 100px;
      }

      .info {
        width: 180px;
        padding: 10px 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 14px;

        .bottom {
          display: flex;
          justify-content: space-between;

          .price {
            display: flex;
            align-items: flex-end;
            color: #fa2209;
            font-size: 12px;

            span {
              font-size: 16px;
            }
          }
        }
      }
    }
  }

}

.footer-fixed {
  position: fixed;
  left: 0;
  bottom: 50px;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .select-check {
    display: flex;
    align-items: center;

    .van-checkbox {
      margin-right: 5px;
    }
  }

  .select-total {
    display: flex;
    line-height: 36px;

    .price {
      margin-right: 10px;
      font-size: 14px;

      .total-price {
        color: #fa2209;
        font-size: 18px;
      }
    }

    .pay, .delete {
      min-width: 100px;
      height: 36px;
      line-height: 36px;
      border-radius: 18px;
      background-color: #fa2f21;
      color: #fff;
      text-align: center;

      &.disabled {
        background-color: #ff9779;
      }
    }
  }
}

// 空购物车和未登录样式
.empty-cart {
  padding: 80px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  img {
    width: 140px;
    height: 92px;
  }

  .tips {
    color: #666;
  }

  .btn {
    width: 110px;
    height: 32px;
    line-height: 32px;
    border-radius: 16px;
    background-color: #fa2c20;
    color: #fff;
    text-align: center;
  }
}
</style>
