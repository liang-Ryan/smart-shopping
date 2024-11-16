<template>
  <div class="main-content">
    <div
      class="user-top"
      @click="isLogin ? null : $router.push('/login') "
    >
      <div class="user-icon">
        <img
          src="@/assets/default-avatar.png"
          alt=""
        />
      </div>
      <div class="info">
        <div class="nick-name">{{ isLogin ? userInfo.nick_name : '未登录' }}</div>
        <div v-if="isLogin" class="vip">
          <van-icon name="diamond-o" /> 普通会员
        </div>
        <div v-else>点击登录账号</div>
      </div>
    </div>

    <div class="user-info">
      <div class="user-left">
        <div class="user-left-item">
          <span class="red">{{ isLogin ? userInfo.balance : 0 }}</span>
          <span>账户余额</span>
        </div>
        <div class="user-left-item">
          <span class="red">{{ userInfo?.points }}</span>
          <span>积分</span>
        </div>
        <div class="user-left-item">
          <span class="red">0</span>
          <span>优惠券</span>
        </div>
      </div>
      <div class="user-right">
        <div class="user-right-item">
          <van-icon name="balance-pay" />
          <span>我的钱包</span>
        </div>
      </div>
    </div>

    <div class="order-list">
      <div
        class="order-list-item"
        @click="$router.push('/order?orderType=all')"
      >
        <van-icon name="balance-list-o" />
        <span>全部订单</span>
      </div>
      <div
        class="order-list-item"
        @click="$router.push('/order?orderType=payment')"
      >
        <van-icon name="clock-o" />
        <span>待支付</span>
      </div>
      <div
        class="order-list-item"
        @click="$router.push('/order?orderType=delivery')"
      >
        <van-icon name="logistics" />
        <span>待发货</span>
      </div>
      <div
        class="order-list-item"
        @click="$router.push('/order?orderType=received')"
      >
        <van-icon name="send-gift-o" />
        <span>待收货</span>
      </div>
    </div>

    <div class="service">
      <div class="service-title">我的服务</div>
      <div class="service-content">
        <div
          class="service-content-item"
          @click="$router.push('/address')"
        >
          <van-icon name="records" />
          <span>收货地址</span>
        </div>
        <div class="service-content-item">
          <van-icon name="gift-o" />
          <span>领券中心</span>
        </div>
        <div class="service-content-item">
          <van-icon name="gift-card-o" />
          <span>优惠券</span>
        </div>
        <div class="service-content-item">
          <van-icon name="question-o" />
          <span>我的帮助</span>
        </div>
        <div class="service-content-item">
          <van-icon name="balance-o" />
          <span>我的积分</span>
        </div>
        <div class="service-content-item">
          <van-icon name="refund-o" />
          <span>退换/售后</span>
        </div>
      </div>
    </div>

    <div class="logout-btn">
      <button
        @click="isLogin ? logOut() :$router.push('/login')"
      >
        {{ isLogin ? '退出登录' : '点击登录' }}
      </button>
    </div>
  </div>
</template>

<script>
import { userGetInfoAPI } from '@/api/user'
import { mapMutations } from 'vuex'

export default {
  name: 'UserPage',

  created () {
    // 获取用户信息
    this.getInfo()
  },

  data () {
    return {
      userInfo: {}, // 用户信息
      cleanTimeout: '', // 清除数据计时器
      reloadTimeout: '' // 刷新页面计时器
    }
  },

  computed: {
    isLogin () {
      return this.$store.getters.token
    }
  },

  methods: {
    ...mapMutations('user', ['delLocalUserToken']), // 用户信息

    // 获取用户信息
    async getInfo () {
      const { data: { userInfo } } = await userGetInfoAPI()
      this.userInfo = userInfo
    },

    // 退出登录
    async logOut () {
      await this.delLocalUserToken()
      this.$toast('退出登录成功')

      // 清除用户数据
      this.cleanTimeout = setTimeout(() => {
        this.$store.dispatch('user/resetInfo')
      }, 1000)

      // 刷新页面
      this.reloadTimeout = setTimeout(() => {
        location.reload()
      }, 1000)
    }
  },

  destroyed () {
    clearTimeout(this.cleanTimeout)
    clearTimeout(this.reloadTimeout)
  }
}
</script>

<style lang="less" scoped>
.main-content {
  padding-bottom: 50px;
  min-height: 100vh;
  background-color: #f7f7f7;

  // 用户样式
  .user-top {
    height: 130px;

    display: flex;
    align-items: center;

    // 用户头像样式
    .user-icon {
      border-radius: 50%;
      margin: 0 10px;
      width: 50px;
      height: 50px;

      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    // 用户昵称样式
    .info {
      align-items: start;

      display: flex;
      flex-direction: column;
      gap: 5px;

      .nick-name {
        color: #c59a46;
        font-size: 18px;
        font-weight: bold;
      }

      .vip {
        display: inline-block;
        border-radius: 5px;
        padding: 3px 5px;
        background-color: #3c3c3c;

        color: #e0d3b6;
        font-size: 14px;

        .van-icon {
          color: #ffb632;
          font-weight: bold;
        }
      }
    }
  }

  // 用户信息样式
  .user-info {
    padding: 20px 0;
    background-color: #fff;

    font-size: 14px;

    display: flex;

    .user-left {
      flex: 3;

      display: flex;
      justify-content: space-evenly;

      .user-left-item {
        align-items: center;

        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 5px;
      }
    }

    .user-right {
      flex: 1;

      .user-right-item {
        align-items: center;

        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 5px;

        .van-icon {
          font-size: 24px;
        }
      }
    }
  }

  // 订单功能样式
  .order-list {
    margin: 10px;
    border-radius: 5px;
    padding: 15px 0;
    background-color: #fff;

    font-size: 14px;

    display: flex;

    .order-list-item {
      flex: 1;

      align-items: center;

      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 5px;

      .van-icon {
        font-size: 24px;
      }
    }
  }

  // 售后功能样式
  .service {
    margin: 10px;
    border-radius: 5px;
    background-color: #fff;

    font-size: 14px;

    .service-title {
      padding: 0 15px;
      height: 50px;

      font-size: 16px;
      line-height: 50px;
    }

    .service-content {
      background-color: #fff;

      font-size: 14px;

      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;

      .service-content-item {
        margin-bottom: 20px;
        width: 25%;

        align-items: center;

        display: flex;
        flex-direction: column;
        justify-content: center;

        .van-icon {
          margin-bottom: 5px;

          color: #ff3800;
          font-size: 24px;
        }
      }
    }
  }

  // 退出登录样式
  .logout-btn {
    button {
      display: block;
      margin: 10px auto;
      border: 1px solid #dcdcdc;
      border-radius: 9px;
      padding: 7px 0;
      width: 60%;
      background-color: #ffffff;

      color: #616161;
      font-size: 13px;
      text-align: center;
    }
  }
}

// 通用样式
.red {
  color: #ff0000;
  font-size: 16px;
}
</style>
