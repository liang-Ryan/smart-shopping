<template>
  <div class="main-content">
    <!-- 用户信息 -->
    <div class="user-top" v-if="loginCheck">
      <div class="user-icon">
        <!-- 没有提供用户头像 -->
        <img src="@/assets/default-avatar.png" alt="" />
      </div>
      <div class="info">
        <div class="nick-name">{{ userInfo.nick_name }}</div>
        <div class="vip">
          <!-- 没有提供会员等级 -->
          <van-icon name="diamond-o" /> 普通会员</div>
      </div>
    </div>

    <!-- 未登录 -->
    <div v-else class="user-top" @click="$router.push('/login')">
      <div class="user-icon">
        <img src="@/assets/default-avatar.png" alt="" />
      </div>
      <div class="info">
        <div class="nick-name">未登录</div>
        <div class="words">点击登录账号</div>
      </div>
    </div>

    <div class="user-info">
      <div class="user-left">
        <div class="user-left-item">
          <span class="red">{{ loginCheck ? userInfo.pay_money : 0 }}</span>
          <span>账户余额</span>
        </div>
        <div class="user-left-item">
          <span class="red">0</span>
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
      <div class="order-list-item" @click="$router.push('/order?orderType=all')">
        <van-icon name="balance-list-o" />
        <span>全部订单</span>
      </div>
      <div class="order-list-item" @click="$router.push('/order?orderType=payment')">
        <van-icon name="clock-o" />
        <span>待支付</span>
      </div>
      <div class="order-list-item" @click="$router.push('/order?orderType=delivery')">
        <van-icon name="logistics" />
        <span>待发货</span>
      </div>
      <div class="order-list-item" @click="$router.push('/order?orderType=received')">
        <van-icon name="send-gift-o" />
        <span>待收货</span>
      </div>
    </div>

    <div class="service">
      <div class="service-title">我的服务</div>
      <div class="service-content">
        <div class="service-content-item" @click="$router.push('/address')">
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
      <button v-if="!loginCheck" @click="$router.push('/login')">点击登录</button>
      <button v-else @click="logOut()">退出登录</button>
    </div>
  </div>
</template>

<script>
import { userGetInfoAPI } from '@/api/user'
import { delLocalUserInfo } from '@/utils/storage'

export default {
  name: 'UserPage',

  created () {
    // 获取用户信息
    this.getInfo()
  },

  data () {
    return {
      // 用户信息
      userInfo: {},

      // 计时器
      logOutTimeout: ''
    }
  },

  computed: {
    loginCheck () {
      return this.$store.getters.token
    }
  },

  methods: {
    // 获取用户信息
    async getInfo () {
      const { data: { userInfo } } = await userGetInfoAPI()
      this.userInfo = userInfo
    },

    // 退出登录
    async logOut () {
      await delLocalUserInfo()
      this.$toast('退出登录成功')

      // 清除用户数据
      setTimeout(() => {
        this.$store.dispatch('user/logOut')
      }, 1000)

      // 刷新页面
      this.logOutTimeout = setTimeout(() => {
        location.reload()
      }, 1000)
    }
  },

  destroyed () {
    clearTimeout(this.logOutTimeout)
  }
}
</script>

<style lang="less" scoped>
.main-content {
  min-height: 100vh;
  padding-bottom: 50px;
  background-color: #f7f7f7;

  // 用户样式
  .user-top {
    height: 130px;
    // background: url("http://cba.itlike.com/public/mweb/static/background/user-header2.png");
    // background-size: cover;
    display: flex;
    align-items: center;

    // 用户头像样式
    .user-icon {
      width: 50px;
      height: 50px;
      margin: 0 10px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    // 用户昵称样式
    .info {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 5px;

      .nick-name {
        color: #c59a46;
        font-size: 18px;
        font-weight: bold;
      }

      .vip {
        display: inline-block;
        padding: 3px 5px;
        border-radius: 5px;
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
    display: flex;
    font-size: 14px;

    .user-left {
      display: flex;
      justify-content: space-evenly;
      flex: 3;

      .user-left-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;

      }
    }

    .user-right {
      flex: 1;

      .user-right-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;

        .van-icon {
          font-size: 24px;
        }
      }
    }
  }

  // 订单功能样式
  .order-list {
    padding: 15px 0;
    margin: 10px;
    border-radius: 5px;
    background-color: #fff;
    display: flex;
    font-size: 14px;

    .order-list-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
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
      height: 50px;
      line-height: 50px;
      padding: 0 15px;
      font-size: 16px;
    }

    .service-content {
      background-color: #fff;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      font-size: 14px;

      .service-content-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 25%;
        margin-bottom: 20px;

        .van-icon {
          font-size: 24px;
          margin-bottom: 5px;
          color: #ff3800;
        }
      }
    }
  }

  // 退出登录样式
  .logout-btn {
    button {
      display: block;
      width: 60%;
      padding: 7px 0;
      margin: 10px auto;
      border: 1px solid #dcdcdc;
      border-radius: 9px;
      background-color: #ffffff;
      font-size: 13px;
      color: #616161;
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
