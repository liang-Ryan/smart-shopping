<template>
  <div>
    <!-- nav：使用vant的navbar组件 -->
    <van-nav-bar
      title="会员登录"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 主体 -->
    <div class="container">
      <div class="title">
        <h1>手机号登录</h1>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div>
        <div class="form-item">
          <input v-model="phoneNumber" class="inputbar" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="imgCode" class="inputbar" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="imgUrl" :src="imgUrl" @click="toGetImgCode">
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inputbar" placeholder="请输入短信验证码" type="text">
          <button @click="getMsgCode">{{ countDownSwitch ? `${currentCountDown}秒后重新发送` : '获取验证码' }}</button>
        </div>
      </div>

      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { getImgCode, getMsgCode, login } from '@/api/user'

export default {
  name: 'LoginIndex',

  data () {
    return {
      phoneNumber: '',
      // 图形验证码
      imgCode: '', // 输入的图形验证码
      imgUrl: '', // 图形验证码地址
      imgKey: '', // 图形验证码标识
      // 短信验证
      countDown: 60, // 短信倒计时的时长
      currentCountDown: 60, // 当前倒计时的时长
      countDownTimer: null, // 短信计时器ID
      countDownSwitch: false, // 判断是否发送短信
      msgCode: '' // 短信验证码
    }
  },

  created () {
    this.getImgCode()
  },

  methods: {
    // 图形验证码
    async getImgCode () {
      const { data: { base64, key } } = await getImgCode()
      this.imgUrl = base64
      this.imgKey = key
    },
    toGetImgCode () {
      this.getImgCode()
      this.$toast('获取图像验证码成功')
    },

    // 手机号和验证码格式验证
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.phoneNumber)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.imgCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },

    // 短信验证码
    async getMsgCode () {
      if (this.validFn()) {
        // 发送请求
        const msgResult = await getMsgCode(this.imgCode, this.imgKey, this.phoneNumber)
        this.$toast(msgResult.message)

        // 开启计时器
        // 短信验证码后端接口有问题，获取不到成功响应，无法采用status统一判断，采用message内容进行判断
        if (msgResult.message === '小智提醒：测试环境短信验证码为：246810' && !this.countDownTimer && !this.countDownSwitch) {
          this.countDownSwitch = true
          this.countDownTimer = setInterval(() => {
            this.currentCountDown--

            // 重置计时器
            if (this.currentCountDown <= 0) {
              clearInterval(this.countDownTimer)
              this.countDownTimer = null
              this.currentCountDown = this.countDown
              this.countDownSwitch = false
            }
          }, 1000)
        }
      }
    },

    // 登录
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入6位短信验证码')
        return
      }

      // 发起请求
      const loginResponse = await login(this.phoneNumber, this.msgCode)
      this.$store.commit('user/setUserInfo', loginResponse.data)
      this.$toast(loginResponse.message)
      if (loginResponse.status === 200) {
        setTimeout(() => {
          this.$router.replace(this.$route.query.backUrl || '/') // replace在不登录，直接返回上一页时，会回到搜索页
          this.$router.go(-1)
        }, 1500)
      }
    }
  },

  destroyed () {
    clearInterval(this.countDownTimer) // 离开网页时，清除计时器
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h1 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inputbar {
      border: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
