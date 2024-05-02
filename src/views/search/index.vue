<template>
  <!-- 使用vant组件构成 -->
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <van-search show-action placeholder="请输入搜索关键词" clearable v-model="searchContent">
      <template #action>
        <div @click="toSearchPage(searchContent)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div v-if="history.length > 0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon name="delete-o" size="16" @click="clearHistory"/>
      </div>
      <div class="list">
        <div class="list-item" @click="toSearchPage(item)" v-for="(item, index) in history" :key="index">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { setLocalSearchHistory, getLocalSearchHistory, delLocalSearchHistory } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  data () {
    return {
      history: getLocalSearchHistory(),
      searchContent: ''
    }
  },
  methods: {
    toSearchPage (keyWords) {
      // 清空搜索栏
      this.searchContent = ''

      // 非空判断
      if (keyWords.trim() === '') return

      // 添加历史记录
      const arrIndex = this.history.indexOf(keyWords)
      if (arrIndex === -1) {
        // 将搜索结果保存至最前面
        this.history.unshift(keyWords)
      } else {
        // 删除同名记录后，再将搜索结果保存至最前面
        this.history.splice(arrIndex, 1)
        this.history.unshift(keyWords)
      }

      // 保存至本地
      setLocalSearchHistory(this.history)

      // 跳转至搜索详情页
      this.$router.push(`/searchlist?search=${keyWords}`)
    },
    clearHistory () {
      this.history = []
      delLocalSearchHistory()
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
