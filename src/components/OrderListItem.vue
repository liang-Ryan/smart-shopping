<template>
  <div class="order-list-item">
    <div class="title">
      <div class="time">{{ item.pay_time }}</div>
      <div class="red">
        <span>{{ item.state_text }}</span>
      </div>
    </div>
    <div class="list">
      <div class="list-item" v-for="goods in item.goods" :key="goods.goods_id">
        <div class="goods-img">
          <img :src="goods.goods_image" alt="">
        </div>
        <div class="goods-content text-ellipsis">{{ goods.goods_name }}</div>
        <div class="goods-trade">
          <p>¥ {{ goods.total_price}}</p>
          <p>x {{ goods.total_num }}</p>
        </div>
      </div>
    </div>
    <div class="total">
      共{{ orderTotalNum }}件商品，总金额 ¥ {{ item.total_price }}
    </div>
    <div class="btn">
      <span v-if="item.state_text === '待支付'">立刻付款</span>
      <span v-if="item.state_text === '待发货'" @click="cancelOrder(item.order_id)">申请取消</span>
      <span v-if="item.state_text === '待收货'" @click="receiptOrder(item.order_id)">确认收货</span>
      <span v-if="item.state_text === '已完成'">评价</span>
    </div>
  </div>
</template>

<script>
import { orderPostCancelAPI, orderPostReceiptAPI } from '@/api/order'

export default {
  props: ['item'],

  data () {
    return {
      reloadimeout: ''
    }
  },

  computed: {
    orderTotalNum () {
      return this.item.goods.reduce((sum, element) => {
        return sum + element.total_num
      }, 0)
    }
  },

  methods: {
    // 确认收货
    async receiptOrder (id) {
      const { message } = await orderPostReceiptAPI(id)
      this.$toast(message)
      this.reload()
    },

    // 取消订单
    async cancelOrder (id) {
      const { message } = await orderPostCancelAPI(id)
      this.$toast(message)
      this.reload()
    },

    // 刷新页面
    reload () {
      this.reloadimeout = setTimeout(() => {
        location.reload()
      }, 1000)
    }
  },

  destroyed () {
    clearTimeout(this.reloadimeout)
  }
}
</script>

<style lang="less" scoped>
.order-list-item {
  padding: 15px;
  margin: 10px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 0.5px 2px 0 rgba(0,0,0,.05);
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 13px;

  .title {
    margin-bottom: 10px;
    height: 24px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .list-item {
      display: flex;
      gap: 10px;

      .goods-img {
        width: 90px;
        height: 90px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .goods-content {
        flex: 2;
        line-height: 18px;
        max-height: 36px;
        margin: 8px 0;
      }

      .goods-trade {
        flex: 1;
        line-height: 18px;
        text-align: right;
        margin: 8px 0;
      }
    }
  }

  .total {
    text-align: right;
  }

  .btn {
    text-align: right;

    span {
      display: inline-block;
      padding: 0 15px;
      border: 0.5px solid #a8a8a8;
      border-radius: 5px;
      height: 28px;
      line-height: 28px;
      color: #383838;
      font-size: 14px;
    }
  }

  // 通用样式
  .red {
      color: #fa2209;
  }
}
</style>
