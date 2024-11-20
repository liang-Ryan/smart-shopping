<template>
  <div class="cart">
    <van-nav-bar
      title="购物车"
      fixed
    />

    <div
      v-if="isLogin && cartList.length > 0"
    >
      <!-- 购物车top -->
      <div class="cart-top">
        <span class="all"
          >共<span>{{ cartTotal }}</span
          >件商品</span
        >
        <span
          class="edit"
          @click="switchMode"
        >
          <van-icon name="edit" />
          {{ editMode ? '取消' : '编辑' }}
        </span>
      </div>

      <!-- 购物车列表 -->
      <div class="cart-list">
        <div
          class="cart-item"
          v-for="item in cartList"
          :key="item.goods_id"
        >
          <van-checkbox
            :value="item.isChecked"
            @click="changeChecked(item.goods_id)"
          ></van-checkbox>
          <div
            class="show"
            @click="$router.push(`/detial/${item.goods_id}`)"
          >
            <img
              :src="item.goods.goods_image"
              alt=""
            />
          </div>
          <div class="info">
            <span
              class="tit text-ellipsis"
              @click="$router.push(`/detial/${item.goods_id}`)"
              >{{ item.goods.goods_name }}</span
            >
            <span class="bottom">
              <div class="price">
                ¥ <span>{{ item.goods.goods_price_min }}</span>
              </div>
              <counter
                :value="item.goods_num"
                :stock="item.goods.stock_total"
                @input="
                  value =>
                    changeGoods({
                      goodsId: item.goods_id,
                      goodsNum: value,
                      goodsSkuId: item.goods_sku_id
                    })
                "
              ></counter>
            </span>
          </div>
        </div>
      </div>

      <!-- 底部功能 -->
      <div class="footer-fixed">
        <div
          class="select-check"
          @click="changeAllChecked(isAllChecked)"
        >
          <van-checkbox
            :value="isAllChecked"
            icon-size="18"
          ></van-checkbox>
          全选
        </div>

        <div class="select-total">
          <div class="price">
            <span>合计：</span>
            <span
              >¥ <span class="total-price">{{ cartPriceSelected }}</span></span
            >
          </div>
          <div
            class="btn"
            :class="{ disabled: cartTotalSelected === 0 }"
            @click="editMode ? delCheck() : toPay()"
          >
            {{ editMode ? '删除' : `结算(${cartTotalSelected})` }}
          </div>
        </div>
      </div>
    </div>

    <!-- 未登录 和 空购物车 -->
    <div
      class="empty-cart"
      v-else
    >
      <img
        src="@/assets/empty.png"
        alt=""
      />
      <div
        class="tips"
        v-html="isLogin ? '您的购物车是空的, 快去逛逛吧' : '请先登录'"
      ></div>
      <div
        class="btn"
        @click="isLogin ? $router.push('/') : $router.push('/login')"
      >
        {{ isLogin ? '去逛逛' : '登录' }}
      </div>
    </div>
  </div>
</template>

<script>
import counter from '@/components/counter.vue'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
  name: 'CartPage',

  created () {
    // 登录判断
    if (this.isLogin) this.getList()
  },

  data () {
    return {
      checkAll: false, // 全选判断
      editMode: false // 编辑模式判断
    }
  },

  computed: {
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', [
      'cartTotal',
      'cartListSelected',
      'cartTotalSelected',
      'cartPriceSelected',
      'isAllChecked'
    ]),

    // 登录判断
    isLogin () {
      return this.$store.getters.token
    }
  },

  methods: {
    ...mapMutations('cart', ['changeChecked', 'changeAllChecked']),
    ...mapActions('cart', ['getList', 'changeGoods', 'delGoodsList']),

    // 切换编辑和购买模式
    switchMode () {
      this.editMode = !this.editMode
    },

    // 结算商品
    toPay () {
      if (this.cartTotalSelected > 0) {
        this.$router.push({
          path: '/pay',
          query: {
            mode: 'cart',
            obj: JSON.stringify({
              cartIds: this.cartListSelected
                .map(element => element.id)
                .join()
            })
          }
        })
      }
    },

    // 删除商品
    delCheck () {
      if (this.cartTotalSelected > 0) {
        this.$dialog
          .confirm({
            message: '确认删除所选商品吗？'
          })
          .then(() => {
            this.delGoodsList()
            this.editMode = false
          })
          .catch(() => {})
      }
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
  min-height: 100vh;
  background-color: #f5f5f5;

  .cart-top {
    padding: 0 10px;
    height: 40px;

    font-size: 14px;

    display: flex;
    justify-content: space-between;
    align-items: center;

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
      margin: 0 10px;
      border-radius: 5px;
      padding: 10px;
      background-color: #ffffff;

      display: flex;
      justify-content: space-between;

      .show img {
        width: 100px;
        height: 100px;
      }

      .info {
        padding: 10px 5px;
        width: 180px;

        font-size: 14px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

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

  border-bottom: 1px solid #ccc;
  padding: 0 10px;
  width: 100%;
  height: 50px;
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

    .btn {
      border-radius: 18px;
      min-width: 100px;
      height: 36px;
      background-color: #fa2f21;

      color: #fff;
      line-height: 36px;
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
    border-radius: 16px;
    width: 110px;
    height: 32px;
    background-color: #fa2c20;

    color: #fff;
    line-height: 32px;
    text-align: center;
  }
}
</style>
