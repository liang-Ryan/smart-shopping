<template>
  <div class="main-content">
    <van-nav-bar title="我的订单" left-arrow @click-left="$router.go(-1)" />

    <!-- 导航栏 -->
    <van-tabs v-model="active">
      <van-tab title="全部" name="all"></van-tab>
      <van-tab title="待支付" name="payment"></van-tab>
      <van-tab title="待发货" name="delivery"></van-tab>
      <van-tab title="待收货" name="received"></van-tab>
      <van-tab title="待评价" name="comment"></van-tab>
    </van-tabs>

    <OrderListItem v-for="item in list" :key="item.order_id" :item="item"></OrderListItem>
    <div v-if="list.length === 0" class="order-none">暂无订单信息</div>
  </div>
</template>

<script>

import { orderGetListAPI } from '@/api/order'
import OrderListItem from '@/components/OrderListItem.vue'

export default {
  name: 'orderIndex',
  components: {
    OrderListItem
  },

  created () {
    this.getList(this.active, this.page)
  },

  data () {
    return {
      // van-tabs标签高亮
      active: this.$route.query.orderType || 'all',

      // 订单信息
      list: [],
      page: 1
    }
  },

  methods: {
    // 获取订单信息
    async getList (type, page) {
      const { data: { list: { data } } } = await orderGetListAPI(type, page)
      this.list = data
    }
  },

  watch: {
    active: {
      immediate: true,
      handler () {
        this.getList(this.active, this.page)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main-content {
  background-color: #fafafa;
}
.van-tabs {
  position: sticky;
  top: 0;
}
.order-none {
  padding: 20px 0;
  background-color: #fff;
  font-size: 14px;
  color: #383838;
  text-align: center;
}
</style>
