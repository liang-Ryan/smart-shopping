<template>
  <!-- 使用vant组件构成 -->
  <div class="search">
    <van-nav-bar
      fixed
      title="商品列表"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      placeholder="请输入搜索关键词"
      :value="$route.query.search"
      show-action
      @click="$router.push(`/search?search=${$route.query.search || ''}`)"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div class="sort-item" @click="getDetail({ sortType: 'all', sortPrice: '0', categoryId, goodsName, page })"
      >综合</div>
      <div class="sort-item" @click="getDetail({ sortType: 'sales', sortPrice: '0', categoryId, goodsName, page })">销量</div>
      <div class="sort-item" @click="getDetail({ sortType: 'price', sortPrice, categoryId, goodsName, page })">价格</div>
    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in goodsList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { searchGetListAPI } from '@/api/search'

export default {
  name: 'SearchListIndex',
  created () {
    this.getDetail({
      sortType: 'all',
      sortPrice: '0',
      categoryId: this.categoryId,
      goodsName: this.goodsName,
      page: this.page
    })
  },
  data () {
    return {
      // 商品列表
      goodsList: [],

      // 查询参数
      sortPrice: '0',
      categoryId: this.$route.query.categoryId || '',
      goodsName: this.$route.query.search || '',
      page: '1'
    }
  },
  methods: {
    // 获取搜索的商品列表
    async getDetail (obj) {
      const { data: { list: { data } } } = await searchGetListAPI(obj)
      this.goodsList = data

      // 切换价格排序
      if (obj.sortType !== 'price') {
        this.sortPrice = '0'
      } else {
        this.sortPrice === '0' ? this.sortPrice = '1' : this.sortPrice = '0'
      }
    }
  },
  components: {
    GoodsItem
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;

  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-btns {
    display: flex;
    height: 36px;
    line-height: 36px;
    .sort-item {
      text-align: center;
      flex: 1;
      font-size: 16px;
    }
  }

  .goods-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    background-color: #f6f6f6;
  }
}

</style>
