<template>
  <!-- 使用vant组件构成 -->
  <div class="home">
    <!-- nav -->
    <van-nav-bar title="智慧商城" fixed />

    <!-- search -->
    <van-search
      readonly
      shape="round"
      background="#f1f1f2"
      placeholder="请输入搜索关键词"
      @click="$router.push('/search')"
    />

    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in swipeBannerList" :key="index">
        <img :src="item.imgUrl" alt="">
      </van-swipe-item>
    </van-swipe>

    <!-- 导航 -->
    <!--
      后端没有提供对应导航类目与分类页对应项目的id，无法跳转到分类页对应项目
    -->
    <van-grid column-num="5" icon-size="40">
      <van-grid-item
        v-for="(item, index) in gridList" :key="index"
        :icon="item.imgUrl"
        :text="item.text"
        @click="$router.push(`/category?categoryId=${index}`)"
      />
    </van-grid>

    <!-- 主会场banner -->
    <div class="main">
      <img :src=bannerImgUrl alt="">
    </div>

    <!-- 猜你喜欢 -->
    <div class="guess">
      <div class="guess-title">—— 猜你喜欢 ——</div>

      <div class="goods-list">
        <GoodsItem v-for="item in goodsList" :key="item.goods_id" :item="item"></GoodsItem>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getHomePageDetail } from '@/api/home'

export default {
  name: 'HomePage',
  created () {
    this.getDetail()
  },
  data () {
    return {
      swipeBannerList: [], // swipe轮播
      gridList: [], // 导航
      bannerImgUrl: '', // 主会场banner
      goodsList: [] // 商品
    }
  },
  methods: {
    async getDetail () {
      const { data: { pageData: { items } } } = await getHomePageDetail()
      this.swipeBannerList = items[1].data
      this.gridList = items[3].data
      this.bannerImgUrl = items[4].data[0].imgUrl
      this.goodsList = items[6].data
    }
  },
  components: {
    GoodsItem
  }
}
</script>

<style lang="less" scoped>
.home {
  padding-top: 100px;
  padding-bottom: 50px;
}

// nav样式
.van-nav-bar {
  z-index: 999;
  background-color: #c21401;
  ::v-deep .van-nav-bar__title {
    color: #fff;
  }
}

// search样式
.van-search {
  position: fixed;
  width: 100%;
  top: 46px;
  z-index: 999;
}

// 轮播图样式
.my-swipe .van-swipe-item {
  height: 185px;
  background-color: #39a9ed;
  font-size: 20px;
  color: #fff;
  text-align: center;
}
.my-swipe .van-swipe-item img {
  width: 100%;
  height: 185px;
}

// 主会场banner样式
.main img {
  display: block;
  width: 100%;
}

// 猜你喜欢样式
.guess .guess-title {
  height: 40px;
  line-height: 40px;
  text-align: center;
}

// 商品样式
.goods-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  background-color: #f6f6f6;
}
</style>
