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
      :value="query.goodsName"
      show-action
      @click="$router.push(`/search?search=${query.goodsName || ''}`)"
    >
      <template #action>
        <van-icon
          class="tool"
          name="apps-o"
        />
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-btns">
      <div
        class="sort-item"
        @click="getDetail('all')"
      >
        综合
      </div>
      <div
        class="sort-item"
        @click="getDetail('sales')"
      >
        销量
      </div>
      <div
        class="sort-item"
        @click="getDetail('price')"
      >
        价格
      </div>
    </div>

    <div class="goods-list">
      <GoodsItem
        v-for="item in goodsList"
        :key="item.goods_id"
        :item="item"
      ></GoodsItem>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { searchGetListAPI } from '@/api/search'
import { mapActions } from 'vuex'

export default {
  name: 'SearchListIndex',

  created () {
    this.getDetail('all') // 请求数据
    this.addLocalSearchHistory(this.query.goodsName) // 添加搜索历史记录
  },

  watch: {
    // 页面后退时重新请求数据
    $route (to) {
      this.query.goodsName = to.query.search
      this.getDetail('all')
    }
  },

  data () {
    return {
      // 商品列表
      goodsList: [],

      // 查询参数
      query: {
        sortType: 'all',
        sortPrice: '0',
        categoryId: this.$route.query.categoryId || '',
        goodsName: this.$route.query.search || '',
        page: '1'
      }
    }
  },

  methods: {
    ...mapActions('search', ['addLocalSearchHistory']), // 搜索历史记录

    // =============================
    // 请求数据
    // =============================

    // 获取搜索的商品列表
    async getDetail (sortType) {
      this.switchSortPrice(sortType) // 初始化价格排序
      this.query.sortType = sortType

      const { data: { list: { data } } } = await searchGetListAPI(this.query)
      this.goodsList = data
    },

    // =============================
    // 初始化价格排序
    // =============================

    switchSortPrice (sortType) {
      // 首次切换“排序” / 选择“非价格排序” / 选择价格排序且价格降序(1) => 价格升序(0)
      sortType !== this.query.sortType || sortType !== 'price' || this.query.sortPrice !== '0' ? this.query.sortPrice = '0' : this.query.sortPrice = '1'
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
    height: 40px;

    font-size: 24px;
    line-height: 40px;
  }

  .sort-btns {
    height: 36px;

    line-height: 36px;

    display: flex;

    .sort-item {
      flex: 1;

      font-size: 16px;
      text-align: center;
    }
  }

  .goods-list {
    background-color: #f6f6f6;

    display: flex;
    flex-direction: column;
    gap: 6px;
  }
}
</style>
