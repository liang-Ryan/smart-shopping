<template>
  <div class="pay-content">
    <van-nav-bar
      fixed
      title="结算"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <!-- 地址 -->
    <div
      class="address"
      @click="$router.push('/address')"
    >
      <div>
        <van-icon name="logistics" />
      </div>

      <div v-if="Object.keys(address).length !== 0">
        <div>
          <span>{{ address.name }}</span>
          <span>{{ address.phone }}</span>
        </div>
        <div>{{ addressDetail }}</div>
      </div>
      <div v-else>请选择收获地址</div>

      <div class="right-icon">
        <van-icon name="arrow" />
      </div>
    </div>

    <!-- 订单明细 -->
    <div>
      <div class="goods-list">
        <div
          class="goods-item"
          v-for="item in goodsList"
          :key="item.goods_id"
        >
          <div class="left">
            <img
              :src="item.goods_image"
              alt=""
            />
          </div>
          <div class="right">
            <p class="text-ellipsis">{{ item.goods_name }}</p>
            <p class="info">
              <span>x{{ item.total_num }}</span>
              <span class="price">￥{{ item.total_price }}</span>
            </p>
          </div>
        </div>
      </div>

      <div class="total-box">
        <span
          >共 {{ orderTotalNum }} 件商品，合计：<span class="red"
            >￥{{ orderPayPrice }}</span
          ></span
        >
      </div>

      <div class="pay-detail">
        <div class="detail-cell">
          <span>订单总金额：</span>
          <span class="red">￥{{ orderPrice }}</span>
        </div>

        <div class="detail-cell">
          <span>优惠券：</span>
          <span>无优惠券可用</span>
        </div>

        <div class="detail-cell">
          <span>配送费用：</span>
          <span
            v-if="address"
            class="red"
            >+￥0.00</span
          >
          <span v-else>请先选择配送地址</span>
        </div>
      </div>

      <!-- 支付方式 -->
      <div class="pay-way">
        <span>支付方式</span>
        <div class="way-cell">
          <van-icon name="balance-o" /><span
            >余额支付（可用 ¥ {{ balance }} 元）</span
          >
          <span class="red"><van-icon name="passed" /></span>
        </div>
      </div>

      <!-- 买家留言 -->
      <div class="buytips">
        <textarea
          placeholder="选填：买家留言（50字内）"
          cols="30"
          rows="10"
          v-model="remark"
        ></textarea>
      </div>
    </div>

    <!-- 底部提交 -->
    <div class="footer-fixed">
      <div class="left">
        实付款：<span class="red">￥{{ orderTotalPrice }}</span>
      </div>
      <div
        class="btn"
        :class="{ disabled: !affordable }"
        v-html="affordable ? '提交订单' : '余额不足'"
        @click="submit"
      ></div>
    </div>
  </div>
</template>

<script>
import { payGetOrderAPI, payPostSubmitAPI } from '@/api/pay'

export default {
  name: 'PayIndex',

  created () {
    this.getOrder()
  },

  data () {
    return {
      // 收货地址
      address: {},

      // 用户信息
      balance: '', // 余额

      // 订单数据
      goodsList: [], // 商品列表
      orderPayPrice: '', // 商品合计价格
      orderPrice: '', // 订单总金额
      orderTotalNum: '', // 商品数量
      orderTotalPrice: '', // 实付款
      remark: '', // 买家留言

      // 商品信息
      mode: this.$route.query.mode, // 下单途径
      goodsInfo: JSON.parse(this.$route.query.goodsInfo) // 商品信息
    }
  },

  computed: {
    // 余额判断
    affordable () {
      return +this.balance > +this.orderTotalPrice
    },

    // 详细收货地址
    addressDetail () {
      return this.address?.region?.province +
        ' ' +
        this.address?.region?.city +
        ' ' +
        this.address?.region?.region +
        ' ' +
        this.address.detail
    }
  },

  methods: {
    // 获取订单信息
    async getOrder () {
      const { data: { order, personal } } = await payGetOrderAPI(this.mode, this.goodsInfo)

      // 收货地址
      this.address = order?.address
      // 商品数据
      this.goodsList = order?.goodsList
      this.orderPayPrice = order?.orderPayPrice
      this.orderPrice = order?.orderPrice
      this.orderTotalNum = order?.orderTotalNum
      this.orderTotalPrice = order?.orderTotalPrice
      // 用户信息
      this.balance = personal?.balance
    },

    // 提交订单
    async submit () {
      if (!this.affordable) return // 余额判断

      const { data: { orderId, payType } } = await payPostSubmitAPI(this.mode, this.goodsInfo, this.remark)
      this.$toast('支付成功')
      this.$router.replace({
        path: '/mypage',
        query: {
          orderId,
          payType
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.pay-content {
  padding: 46px 0;

  font-size: 14px;
  color: #333;

  // 地址样式
  .address {
    position: relative;

    padding: 20px;
    background: url(@/assets/border-line.png) bottom/60px auto repeat-x;

    color: #666;

    display: flex;
    align-items: center;
    gap: 20px;

    .right-icon {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-7px);
    }
  }

  // 商品样式
  .goods-list {
    display: flex;
    flex-direction: column;
    gap: 6px;

    .goods-item {
      padding: 10px;
      height: 100px;

      display: flex;
      gap: 10px;

      .left {
        width: 100px;

        img {
          display: block;
          margin: 10px auto;
          width: 80px;
        }
      }

      .right {
        flex: 1;

        padding: 10px 0;

        line-height: 1.3;

        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        gap: 5px;

        .info {
          display: flex;
          justify-content: space-between;

          .price {
            color: #fa2209;
          }
        }
      }
    }
  }

  // 商品合计样式
  .total-box {
    border-bottom: 1px solid #efefef;
    padding: 10px;

    display: flex;
    justify-content: flex-end;
  }

  // 订单合计样式
  .pay-detail {
    border-bottom: 1px solid #efefef;

    .detail-cell {
      padding: 10px 12px;

      display: flex;
      justify-content: space-between;
    }
  }

  // 支付方式样式
  .pay-way {
    border-bottom: 1px solid #efefef;
    padding: 10px 12px;

    .way-cell {
      padding: 10px 0;

      display: flex;
      gap: 5px;
    }

    .van-icon {
      font-size: 20px;
    }
  }

  // 卖家留言样式
  .buytips {
    textarea {
      display: block;
      border: none;
      padding: 12px;
      width: 100%;
      height: 100px;
    }
  }

  // 底边功能样式
  .footer-fixed {
    position: fixed;
    left: 0;
    bottom: 0;

    border-top: 1px solid #efefef;
    width: 100%;
    height: 46px;
    background-color: #fff;

    line-height: 46px;

    display: flex;

    .left {
      flex: 1;

      padding-left: 12px;

      color: #666;
    }

    .btn {
      width: 121px;
      background: linear-gradient(90deg, #f9211c, #ff6335);

      color: #fff;
      text-align: center;
      line-height: 46px;

      &.disabled {
        background: #ff9779;
      }
    }
  }

  // 通用样式
  .red {
    color: #fa2209;
  }
}
</style>
