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
          <input
            v-model="phoneNumber"
            class="inputbar"
            maxlength="11"
            placeholder="请输入手机号码"
            type="text"
          />
        </div>
        <div class="form-item">
          <input
            v-model="imgCode"
            class="inputbar"
            maxlength="4"
            placeholder="请输入图形验证码"
            type="text"
          />
          <img
            v-if="imgUrl"
            :src="imgUrl"
            @click="getImgCode"
          />
        </div>
        <div class="form-item">
          <input
            v-model="captchaCode"
            class="inputbar"
            placeholder="请输入短信验证码"
            type="text"
          />
          <button @click="getCaptchaCode">
            {{
              countDownTimer ? `${currentCountDown}秒后重新发送` : '获取验证码'
            }}
          </button>
        </div>
      </div>

      <div
        class="login-btn"
        @click="login"
      >
        登录
      </div>
    </div>
  </div>
</template>

<script>
import {
  userGetImgCodeAPI,
  userPostCaptchaAPI,
  userPostLoginAPI
} from '@/api/user'

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
      captchaCode: '' // 短信验证码
    }
  },

  created () {
    this.getImgCode()
  },

  methods: {
    // 图形验证码
    async getImgCode () {
      const { data: { base64, key } } = await userGetImgCodeAPI()
      this.imgUrl = base64
      this.imgKey = key
    },

    // 手机号和验证码格式验证
    validFn (phone, img, captcha) {
      if (phone === 'phone' && !/^1[3-9]\d{9}$/.test(this.phoneNumber)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (img === 'img' && !/^\w{4}$/.test(this.imgCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      if (captcha === 'captcha' && !/^\d{6}$/.test(this.captchaCode)) {
        console.log('in')

        this.$toast('请输入6位短信验证码')
        return false
      }
      return true
    },

    // 短信验证码
    async getCaptchaCode () {
      if (this.countDownTimer) return

      if (this.validFn('phone', 'img')) {
        // 发送请求
        const msgResult = await userPostCaptchaAPI(
          this.imgCode,
          this.imgKey,
          this.phoneNumber
        )
        this.$toast(msgResult.message)

        // 开启计时器
        if (
          msgResult.status === 200 &&
          !this.countDownTimer
        ) {
          this.countDownTimer = setInterval(() => {
            this.currentCountDown--

            // 重置计时器
            if (this.currentCountDown <= 0) {
              clearInterval(this.countDownTimer)
              this.countDownTimer = null
              this.currentCountDown = this.countDown
            }
          }, 1000)
        }
      }
    },

    // 登录
    async login () {
      if (!this.validFn('phone', 'img', 'captcha')) return

      // 发起请求
      const { data, message, status } = await userPostLoginAPI(
        this.phoneNumber,
        this.captchaCode
      )
      this.$store.dispatch('user/setUserToken', data)
      this.$toast(message)

      if (status === 200) {
        setTimeout(() => {
          this.$router.replace(this.$route.query.backUrl || '/')
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
      color: #b8b8b8;
      font-size: 14px;
      line-height: 40px;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;

    display: flex;
    align-items: center;

    .inputbar {
      flex: 1;

      border: none;
      height: 32px;

      font-size: 14px;
    }

    img {
      width: 94px;
      height: 31px;
    }

    button {
      border: none;
      padding-right: 9px;
      height: 31px;
      background-color: transparent;

      color: #cea26a;
      font-size: 13px;
    }
  }

  .login-btn {
    margin-top: 39px;
    border-radius: 39px;
    width: 100%;
    height: 42px;
    background: linear-gradient(90deg, #ecb53c, #ff9211);
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);

    color: #fff;
    letter-spacing: 2px;

    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
