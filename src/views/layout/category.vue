<template>
  <div class="category">
    <!-- 分类 -->
    <van-nav-bar
      title="全部分类"
      fixed
    />

    <!-- 搜索框 -->
    <van-search
      readonly
      shape="round"
      background="#f1f1f2"
      placeholder="请输入搜索关键词"
      @click="$router.push('/search')"
    />

    <!-- 分类列表 -->
    <div class="list-box">
      <div class="left">
        <ul>
          <li
            v-for="(item, index) in list"
            :key="item.category_id"
          >
            <a
              :class="{ active: index === activeIndex }"
              @click="activeIndex = index"
              href="javascript:;"
              >{{ item.name }}</a
            >
          </li>
        </ul>
      </div>
      <div class="right">
        <div
          class="cate-goods"
          v-for="item in list[activeIndex]?.children"
          :key="item.category_id"
          @click="
            $router.push(
              `/searchlist?categoryId=${item.category_id}&search=${item.name}`
            )
          "
        >
          <img
            :src="item.image.external_url"
            alt=""
          />
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { catagoryGetDetailAPI } from '@/api/category'

export default {
  name: 'CategoryPage',

  created () {
    this.getPageDetail()
  },

  data () {
    return {
      list: [],
      activeIndex: 0
    }
  },

  methods: {
    async getPageDetail () {
      const { data: { list } } = await catagoryGetDetailAPI()
      this.list = list
    }
  }
}
</script>

<style lang="less" scoped>
.category {
  padding-top: 100px;
  padding-bottom: 50px;
  height: 100vh;

  .list-box {
    height: 100%;

    display: flex;

    .left {
      width: 85px;
      height: 100%;
      background-color: #f3f3f3;

      overflow: auto;

      a {
        display: block;
        height: 45px;

        color: #444444;
        font-size: 12px;
        line-height: 45px;
        text-align: center;

        &.active {
          background-color: #fff;

          color: #fb442f;
        }
      }
    }

    .right {
      flex: 1;

      padding: 10px 0;
      height: 100%;
      background-color: #ffffff;

      overflow: auto;

      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;

      .cate-goods {
        margin-bottom: 10px;
        width: 33.3%;

        img {
          display: block;
          margin: 5px auto;
          width: 70px;
          height: 70px;
        }

        p {
          font-size: 12px;
          text-align: center;
        }
      }
    }
  }
}

// 导航条样式
.van-nav-bar {
  z-index: 999;
}

// 搜索框样式
.van-search {
  position: fixed;
  top: 46px;
  z-index: 999;

  width: 100%;
}
</style>
