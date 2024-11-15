<template>
  <!-- 使用vant组件构成 -->
  <div class="search">
    <van-nav-bar
      title="商品搜索"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <van-search
      show-action
      placeholder="请输入搜索关键词"
      clearable
      v-model="searchContent"
    >
      <template #action>
        <div @click="toSearchPage(searchContent)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div v-if="searchHistory.length > 0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon
          name="delete-o"
          size="16"
          @click="clearLocalSearchHistory"
        />
      </div>

      <div class="list">
        <div
          class="list-item"
          @click="toSearchPage(searchContent)"
          v-for="(searchContent, index) in searchHistory"
          :key="index"
        >
          {{ searchContent }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isNull } from '@/utils/search'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'SearchPage',

  created () {
    this.getLocalSearchHistory()
  },
  watch: {
    // 页面后退时重新获取route参数
    $route (to) {
      this.searchContent = to.query.search
    }
  },

  data () {
    return {
      searchContent: this.$route.query.search || ''
    }
  },

  computed: {
    ...mapState('search', ['searchHistory']) // 搜索历史记录
  },

  methods: {
    ...mapMutations('search', ['getLocalSearchHistory', 'clearLocalSearchHistory']), // 搜索历史记录

    // =============================
    // 搜索栏跳转
    // =============================

    toSearchPage (searchContent) {
      if (isNull(searchContent)) return // 非空判断
      this.searchContent = '' // 清空搜索栏

      this.$router.replace(`/searchlist?search=${searchContent}`) // 跳转至搜索详情页
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  ::v-deep .van-search__action {
    margin-right: 10px;
    border-radius: 0 5px 5px 0;
    padding: 0 20px;
    background-color: #c21401;

    color: #fff;
  }

  .title {
    padding: 0 15px;
    height: 40px;

    font-size: 14px;
    line-height: 40px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .list {
    padding: 0 10px;

    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 5%;
  }

  .list-item {
    margin-bottom: 10px;
    border: 1px solid #efefef;
    border-radius: 50px;
    padding: 7px;
    width: 30%;
    background: #fff;

    font-size: 13px;
    line-height: 15px;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
