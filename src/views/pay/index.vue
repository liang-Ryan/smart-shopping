<template>
  <div class="main-content">
    <van-nav-bar fixed title="结算" left-arrow @click-left="$router.go(-1)" />

    <!-- 地址 -->
    <div class="address" @click="$router.push('/address')">
      <div class="left-icon">
        <van-icon name="logistics" />
      </div>

      <div class="info" v-if="defaultAddress">
        <div class="info-content">
          <span class="name">{{ defaultAddress.name }}</span>
          <span class="mobile">{{ defaultAddress.phone }}</span>
        </div>
        <div class="info-address">{{ addressDetail }}</div>
      </div>
      <div class="info" v-else>请选择收获地址</div>

      <div class="right-icon">
        <van-icon name="arrow" />
      </div>
    </div>

    <!-- 订单明细 -->
    <div class="pay-list">
      <div class="goods-list">
        <div class="goods-item" v-for="item in goodsList" :key="item.goods_id">
            <div class="left">
              <img :src="item.goods_image" alt="" />
            </div>
            <div class="right">
              <p class="tit text-ellipsis">{{ item.goods_name }}</p>
              <p class="info">
                <span class="count">x{{ item.total_num }}</span>
                <span class="price">￥{{ item.total_price}}</span>
              </p>
            </div>
        </div>
      </div>

      <div class="total-box">
        <span>共 {{ orderTotalNum }} 件商品，合计：</span>
        <span class="red">￥{{ orderPayPrice }}</span>
      </div>

      <div class="pay-detail">
        <div class="pay-cell">
          <span>订单总金额：</span>
          <span class="red">￥{{ orderPrice }}</span>
        </div>

        <div class="pay-cell">
          <span>优惠券：</span>
          <span>无优惠券可用</span>
        </div>

        <div class="pay-cell">
          <span>配送费用：</span>
          <span v-if="!defaultAddress">请先选择配送地址</span>
          <span v-else class="red">+￥0.00</span>
        </div>
      </div>

      <!-- 支付方式 -->
      <div class="pay-way">
        <span class="pay-title">支付方式</span>
        <div class="pay-cell">
          <van-icon name="balance-o" /><span>余额支付（可用 ¥ {{ balance }} 元）</span>
          <!-- <span>请先选择配送地址</span> -->
          <span class="red"><van-icon name="passed" /></span>
        </div>
      </div>

      <!-- 买家留言 -->
      <div class="buytips">
        <textarea placeholder="选填：买家留言（50字内）"  cols="30" rows="10" v-model="remark"></textarea>
      </div>
    </div>

    <!-- 底部提交 -->
    <div class="footer-fixed">
      <div class="left">实付款：<span class="red">￥{{ orderTotalPrice }}</span></div>
      <div
       class="btn"
       :class="{ disabled: !affordable }"
       v-html=" affordable ? '提交订单' : '余额不足'"
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
      defaultAddress: {},
      addressDetail: '',

      // 订单数据
      goodsList: [],
      orderPayPrice: '',
      orderPrice: '',
      orderTotalNum: '',
      orderTotalPrice: '',
      remark: '',

      // 用户信息
      balance: ''
    }
  },

  computed: {
    // 余额判断
    affordable () {
      return +this.balance > +this.orderTotalPrice
    },

    mode () {
      return this.$route.query.mode
    },

    obj () {
      return this.$route.query.obj
    }
  },

  methods: {
    // 获取订单信息
    async getOrder () {
      const { data: { order, personal } } = await payGetOrderAPI(this.mode, this.obj)

      // 收货地址
      this.defaultAddress = order.address
      this.addressDetail = order.address.region.province + ' ' + order.address.region.city + ' ' + order.address.region.region + ' ' + order.address.detail

      // 商品数据
      this.goodsList = order.goodsList
      this.orderPayPrice = order.orderPayPrice
      this.orderPrice = order.orderPrice
      this.orderTotalNum = order.orderTotalNum
      this.orderTotalPrice = order.orderTotalPrice

      // 用户信息
      this.balance = personal.balance
    },

    // 提交订单
    async submit () {
      const { data: { orderId, payType } } = await payPostSubmitAPI(this.mode, this.obj, this.remark)
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
.main-content {
  padding: 46px 0;
  font-size: 14px;
  color: #333;

  // 地址样式
  .address {
    position: relative;
    padding: 20px;
    background: url(@/assets/border-line.png) bottom repeat-x;
    background-size: 60px auto;
    display: flex;
    align-items: center;
    gap: 20px;
    color: #666;

    .right-icon {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-7px);
    }
  }

  // 商品样式
  .goods-list{
    display: flex;
    flex-direction: column;
    gap: 6px;

    .goods-item {
      height: 100px;
      padding: 10px;
      display: flex;
      gap: 10px;

      .left {
        width: 100px;

        img {
          display: block;
          width: 80px;
          margin: 10px auto;
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
    padding: 10px;
    border-bottom: 1px solid #efefef;
    display: flex;
    justify-content: flex-end;
  }

  // 订单合计样式
  .pay-detail {
    border-bottom: 1px solid #efefef;

    .pay-cell {
      padding: 10px 12px;
      display: flex;
      justify-content: space-between;
    }
  }

  // 支付方式样式
  .pay-way {
    padding: 10px 12px;
    border-bottom: 1px solid #efefef;

    .pay-cell {
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
      width: 100%;
      height: 100px;
      padding: 12px;
      border: none;
    }
  }

  // 底边功能样式
  .footer-fixed {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 46px;
    line-height: 46px;
    border-top: 1px solid #efefef;
    background-color: #fff;
    display: flex;

    .left {
      flex: 1;
      padding-left: 12px;
      color: #666;
    }

    .btn {
      width: 121px;
      line-height: 46px;
      background: linear-gradient(90deg,#f9211c,#ff6335);
      color: #fff;
      text-align: center;

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
