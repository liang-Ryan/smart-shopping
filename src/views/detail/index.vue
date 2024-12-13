<template>
  <div class="detail">
    <van-nav-bar
      fixed
      title="商品详情页"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <!-- 轮播图 -->
    <van-swipe
      :autoplay="3000"
      @change="onChange"
    >
      <van-swipe-item
        v-for="item in images"
        :key="item.file_id"
      >
        <img :src="item.external_url" />
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">{{ current }} / {{ images?.length }}</div>
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

      <div
        class="service"
        @click="showServiceSheet = true"
      >
        <div class="left-words">
          <span
            v-for="item in serviceList"
            :key="item.service_id"
          >
            <van-icon name="passed" />{{ item.name }}
          </span>
        </div>
        <div>
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <!-- 商品保障弹出面板 -->
    <van-action-sheet
      class="service-sheet"
      v-model="showServiceSheet"
      title="商品保障服务"
    >
      <div
        v-for="item in serviceList"
        :key="item.service_id"
      >
        <van-icon name="passed" />{{ item.name }}
      </div>
    </van-action-sheet>

    <!-- 商品评价 -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">商品评价 ({{ commentSum }}条)</div>
        <div
          class="right"
          @click="showCommentList(-1, 1)"
        >
          查看更多 <van-icon name="arrow" />
        </div>
      </div>
      <div>
        <div
          class="comment-item"
          v-for="item in topThreeComment"
          :key="item.comment_id"
        >
          <div class="top">
            <img
              :src="item.user.avatar_url || defaultAvatar"
              alt=""
            />
            <div class="name">{{ item.user.nick_name }}</div>
            <van-rate
              :size="16"
              :value="item.score / 6"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </div>
          <div class="content">{{ item.content }}</div>
          <div class="time">{{ item.create_time }}</div>
        </div>
      </div>
    </div>

    <!-- 商品评价弹出面板 -->
    <van-action-sheet
      class="comment-sheet"
      v-model="showCommentSheet"
      title="商品评价"
    >
      <div>
        <div
          class="comment-item"
          v-for="item in commentList"
          :key="item.comment_id"
        >
          <div class="top">
            <img
              :src="item.user.avatar_url || defaultAvatar"
              alt=""
            />
            <div class="name">{{ item.user.nick_name }}</div>
            <van-rate
              :size="16"
              :value="item.score / 6"
              color="#ffd21e"
              void-icon="star"
              void-color="#eee"
            />
          </div>
          <div class="content">{{ item.content }}</div>
          <div class="time">{{ item.create_time }}</div>
        </div>
      </div>
    </van-action-sheet>

    <!-- 商品描述 -->
    <div
      class="content"
      v-html="detail.content"
    ></div>

    <!-- 底部 -->
    <div class="footer">
      <div
        class="icon-home"
        @click="$router.push('/home')"
      >
        <van-icon name="wap-home-o" />
        <span>首页</span>
      </div>
      <div
        class="icon-cart"
        @click="$router.push('/cart')"
      >
        <van-icon
          name="shopping-cart-o"
          :badge="cartTotal > 0 ? cartTotal : ''"
        />
        <span>购物车</span>
      </div>
      <div
        class="btn-add"
        @click="popSheet('加入购物车')"
      >
        加入购物车
      </div>
      <div
        class="btn-buy"
        @click="popSheet('立刻购买')"
      >
        立刻购买
      </div>
    </div>

    <!-- 购买弹出面板 -->
    <van-action-sheet
      v-model="showPaySheet"
      :title="paySheetTitle"
    >
      <div class="action-sheet">
        <div class="sheet-content">
          <div class="left">
            <img
              :src="detail.goods_image"
              alt=""
            />
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
          <counter v-model="count" :stock="detail.stock_total"></counter>
        </div>
        <div v-if="detail.stock_total > 0">
          <div
            :class="{ 'btn-cart': paySheetTitle === '加入购物车', 'btn-pay': paySheetTitle === '立刻购买'}"
            @click="order(paySheetTitle)"
          >
            {{ paySheetTitle }}
          </div>
        </div>
        <div class="btn-none" v-else>该商品已被抢完</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import defaultAvatar from '@/assets/default-avatar.png'
import counter from '@/components/counter.vue'
import {
  goodsGetDetailAPI,
  goodsGetServiceAPI,
  goodsGetCommentsAPI,
  goodsGeCommentListAPI
} from '@/api/goods-detail'
import { cartGetSumAPI, cartPostAddAPI } from '@/api/cart'
import { Dialog } from 'vant'

export default {
  name: 'DetailIndex',

  components: {
    counter
  },

  created () {
    // 渲染页面
    this.getDetail()
    this.getService()
    this.getComment(3)

    // 获取用户数据
    this.getCart()
  },

  data () {
    return {
      // 商品详情
      detail: {},

      // 商品保障服务
      serviceList: [],

      // 商品评价
      commentSum: '',
      topThreeComment: [],
      commentList: [],
      defaultAvatar,

      // 轮播图
      current: 1,

      // 购买数量
      count: 1,

      // 动作面板
      showServiceSheet: false,
      showCommentSheet: false,
      showPaySheet: false,
      paySheetTitle: '',

      // 购物车商品总数
      cartTotal: 0
    }
  },

  computed: {
    // 商品详情
    goods_id () {
      return this.$route.params.id
    },
    images () {
      return this.detail.goods_images
    },
    skuList () {
      return this.detail.skuList
    }
  },

  methods: {
    // 商品详情
    async getDetail () {
      const { data: { detail } } = await goodsGetDetailAPI(this.goods_id)
      this.detail = detail
    },

    // 商品保障服务
    async getService () {
      const { data: { list } } = await goodsGetServiceAPI(this.goods_id)
      this.serviceList = list
    },

    // 商品评价
    async getComment (amount) {
      const { data: { total, list } } = await goodsGetCommentsAPI(this.goods_id, amount)
      this.topThreeComment = list
      this.commentSum = total
    },
    async showCommentList (type, page) {
      const { data: { list: { data } } } = await goodsGeCommentListAPI(type, this.goods_id, page)
      this.commentList = data
      this.showCommentSheet = true
    },

    // 轮播图计数
    onChange () {
      this.current >= this.images.length ? this.current = 1 : this.current++
    },

    // 购物面板
    popSheet (type) {
      this.paySheetTitle = type
      this.showPaySheet = true
    },

    // 登录验证
    isLogin () {
      if (this.$store.getters.token) return true

      Dialog.confirm({
        message: '请登录后再进行操作',
        confirmButtonText: '去登录',
        cancelButtonText: '再逛逛'
      })
        .then(() => {
          this.$router.push({
            path: '/login',
            query: {
              backUrl: this.$route.fullPath // 传递参数
            }
          })
        })
        .catch(() => {})
      return false
    },

    // 购买
    async order (type) {
      if (!this.isLogin()) return // 登录验证

      // 参数
      const query = {
        goodsId: this.goods_id,
        goodsNum: this.count,
        goodsSkuId: this.skuList[0].goods_sku_id
      }

      // 加入购物车
      if (type === '加入购物车') {
        const { data, message } = await cartPostAddAPI(query)
        this.cartTotal = data.cartTotal
        this.$toast(message)
        this.showPaySheet = false
      }

      // 立即购买
      if (type === '立刻购买') {
        this.$router.push({
          path: '/pay',
          query: {
            mode: 'buyNow',
            goodsInfo: JSON.stringify(query)
          }
        })
      }
    },

    // 获取购物车商品总数
    async getCart () {
      const { data: { cartTotal } } = await cartGetSumAPI()
      this.cartTotal = cartTotal
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  padding-top: 46px;

  img {
    display: block;
    width: 100%;
    -webkit-user-drag: none;
  }

  // 轮播图计数
  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;

    border-radius: 15px;
    padding: 5px 10px;
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

      font-size: 16px;
      line-height: 40px;

      display: flex;
      justify-content: space-between;

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

  .service-sheet {
    padding: 0 10px;

    font-size: 16px;
    line-height: 40px;

    .van-icon {
      margin-right: 4px;

      color: #fa2209;
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
  }

  .comment-sheet {
    padding: 0 10px;
  }

  .comment-item {
    font-size: 16px;
    line-height: 30px;

    .top {
      margin-top: 20px;
      height: 30px;

      display: flex;
      align-items: center;

      ::v-deep img {
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

  .content {
    width: 100%;

    word-break: break-all;

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
      font-size: 14px;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .van-icon {
        font-size: 24px;
      }
    }

    .btn-add,
    .btn-buy {
      border-radius: 18px;
      width: 120px;
      height: 36px;
      background-color: #ffa900;

      color: #fff;
      font-size: 14px;
      line-height: 36px;
      text-align: center;
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
            margin-right: 5px;

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

    .btn-cart,
    .btn-pay,
    .btn-none {
      margin: 20px;
      border-radius: 20px;
      height: 40px;
      background-color: rgb(255, 148, 2);

      color: rgb(255, 255, 255);
      line-height: 40px;
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
