<template>
  <div class="detail">
    <van-nav-bar fixed title="商品详情页" left-arrow @click-left="$router.go(-1)" />

    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="item in images" :key="item.file_id">
        <img :src="item.external_url"/>
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">{{ current }} / {{ images.length }}</div>
      </template>
    </van-swipe>

    <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥{{ detail.goods_price_min }}</span>
          <span class="oldprice">￥{{ detail.goods_price_max }}</span>
        </div>
        <div class="sellcount">已售{{ detail.goods_sales }}件</div>
      </div>
      <div class="msg text-ellipsis-2">{{ detail.goods_name }}</div>

      <div class="service">
        <div class="left-words">
          <span v-for="item in serviceList" :key="item.service_id">
            <van-icon name="passed" />{{ item.name }}
          </span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <!-- 商品评价 -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">商品评价 ({{ commentSum }}条)</div>
        <div class="right">查看更多 <van-icon name="arrow" /> </div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="item in commentList" :key="item.comment_id">
          <div class="top">
            <img :src="item.user.avatar_url || defaultImg" alt="">
            <div class="name">{{ item.user.nick_name }}</div>
            <van-rate :size="16" :value="5" color="#ffd21e" void-icon="star" void-color="#eee"/>
          </div>
          <div class="content">{{ item.content }}</div>
          <div class="time">{{ item.create_time }}</div>
        </div>
      </div>
    </div>

    <!-- 商品描述 -->
    <div class="content" v-html="detail.content"></div>

    <!-- 底部 -->
    <div class="footer">
      <div class="icon-home" @click="$router.push('/home')">
        <van-icon name="wap-home-o" />
        <span>首页</span>
      </div>
      <div class="icon-cart">
        <van-icon name="shopping-cart-o" />
        <span>购物车</span>
      </div>
      <div class="btn-add" @click="popSheet('cart')">加入购物车</div>
      <div class="btn-buy" @click="popSheet('pay')">立刻购买</div>
    </div>

    <!-- 动作面板 -->
    <van-action-sheet v-model="showSheet" :title="sheetTitle">
      <div class="action-sheet">
        <div class="sheet-content">
          <div class="left">
            <img :src="detail.goods_image" alt="">
          </div>
          <div class="right">
            <div class="price">
              <span class="price-icon">￥</span>
              <span>{{ detail.goods_price_min }}</span>
            </div>
            <div>
              <span>库存</span>
              <span>{{ detail.stock_total }}</span>
            </div>
          </div>
        </div>
        <div class="num-box">
          <span>数量</span>
          <counter v-model="count"></counter>
        </div>
        <div v-if="detail.stock_total > 0">
          <div class="btn-cart" v-if="sheetTitle === '加入购物车'" @click="order('cart')">加入购物车</div>
          <div class="btn-pay" v-else  @click="order('pay')">立刻购买</div>
        </div>
        <div class="btn-none" v-else>该商品已被抢完</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import counter from '@/components/counter.vue'
import { getGoodsDetail, getGoodsService, getGoodsComment } from '@/api/goods-detail'
import defaultImg from '@/assets/default-avatar.png'

export default {
  name: 'DetailIndex',
  created () {
    this.getDetail()
    this.getService()
    this.getComment(3)
  },
  data () {
    return {
      // 商品详情
      detail: {},
      images: [],

      // 商品保障服务
      serviceList: [],

      // 商品评价
      commentSum: '',
      commentList: [],
      defaultImg,

      // 轮播图
      current: 1,

      // 购买数量
      count: 1,

      // 动作面板
      showSheet: false,
      sheetTitle: '加入购物车',

      // 计时器
      addCartTimeout: ''
    }
  },
  computed: {
    goods_id () {
      return this.$route.params.id
    }
  },
  methods: {
    // 商品详情
    async getDetail () {
      const { data: { detail } } = await getGoodsDetail(this.goods_id)
      this.detail = detail
      this.images = detail.goods_images
    },

    // 商品保障服务
    async getService () {
      const { data: { list } } = await getGoodsService(this.goods_id)
      this.serviceList = list
    },

    // 商品评价
    async getComment (amount) {
      const { data: { total, list } } = await getGoodsComment(this.goods_id, amount)
      this.commentList = list
      this.commentSum = total
    },

    // 轮播图计数
    onChange () {
      this.current >= 4 ? this.current = 1 : this.current++
    },

    // 动作面板
    popSheet (action) {
      if (action === 'cart') {
        this.sheetTitle = '加入购物车'
      } else if (action === 'pay') {
        this.sheetTitle = '立刻购买'
        console.log(this.sheetTitle)
      }
      this.showSheet = true
    },

    // 加入购物车
    order (type) {
      console.log(this.$store.getters.token)

      if (this.$store.getters.token) {
        if (type === 'cart') {
          // msg = '加入购物车'
        } else if (type === 'pay') {
          // msg = '进行购买'
        } else {
          console.log('type值错误')
        }
      } else {
        this.$toast('请登录后再进行操作')
        this.addCartTimeout = setTimeout(() => {
          this.router.push('/login')
          // this.$router.replace({
          //   path: '/login',
          //   query: {
          //     backUrl: this.$route.fullPath // 传递参数
          //   }
          // })
        }, 2000)
      }
    }
  },
  components: {
    counter
  },
  destroyed () {
    clearTimeout(this.addCartTimeout)
  }
}
</script>

<style lang="less" scoped>
.detail {
  padding-top: 46px;

  img {
    display: block;
    width: 100%;
  }

  // 轮播图计数
  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    border-radius: 15px;
    background: rgba(0, 0, 0, 0.1);
    font-size: 12px;
  }

  .info {
    padding: 10px;

    .title {
      display: flex;
      justify-content: space-between;

      .now {
        color: #fa2209;
        font-size: 20px;
      }

      .oldprice {
        margin-left: 5px;
        color: #959595;
        font-size: 16px;
        text-decoration: line-through;
      }

      .sellcount {
        position: relative;
        top: 4px;
        color: #959595;
        font-size: 16px;
      }
    }

    .msg {
      margin-top: 5px;
      font-size: 16px;
      line-height: 24px;
    }

    .service {
      margin-top: 10px;
      background-color: #fafafa;
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      line-height: 40px;

      .left-words {
        span {
          margin-right: 10px;
        }
        .van-icon {
          margin-right: 4px;
          color: #fa2209;
        }
      }
    }
  }

  .comment {
    padding: 10px;

    .comment-title {
      display: flex;
      justify-content: space-between;

      .right {
        color: #959595;
      }
    }

    .comment-item {
      line-height: 30px;
      font-size: 16px;
      .top {
        margin-top: 20px;
        height: 30px;
        display: flex;
        align-items: center;

        img {
          width: 20px;
          height: 20px;
        }

        .name {
          margin: 0 10px;
        }
      }

      .time {
        color: #999;
      }
    }
  }

  .content {
    width: 100%;
    overflow: scroll;
    ::v-deep img {
      width: 100% !important;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    border-top: 1px solid #ccc;
    width: 100%;
    height: 55px;
    background-color: #fff;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .icon-home,
    .icon-cart {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;

      .van-icon {
        font-size: 24px;
      }
    }

    .btn-add,
    .btn-buy {
      width: 120px;
      height: 36px;
      line-height: 36px;
      background-color: #ffa900;
      border-radius: 18px;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }

    .btn-buy {
      background-color: #fe5630;
    }
  }

  .action-sheet {
    .sheet-content {
      display: flex;

      .left {
        padding: 10px;

        img {
          width: 90px;
          height: 90px;
        }
      }

      .right {
        flex: 1;
        padding: 10px;

        .price {
          color: #fe560a;
          font-size: 24px;
          .price-icon {
            margin-right:5px;
            font-size: 14px;
          }
        }
      }
    }

    .num-box {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .btn-cart, .btn-pay, .btn-none {
      height: 40px;
      line-height: 40px;
      background-color: rgb(255, 148, 2);
      margin: 20px;
      border-radius: 20px;
      color: rgb(255, 255, 255);
      text-align: center;
    }
    .btn-pay {
      background-color: #fe5630;
    }
    .btn-none {
      background-color: #cccccc;
    }
  }
}
</style>
