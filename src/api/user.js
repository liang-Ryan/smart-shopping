import request from '@/utils/request'

// 图像验证码
export const userGetImgCodeAPI = () => {
  return request.get('/captcha/image')
}

// 短信验证码
export const userPostCaptchaAPI = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 登录验证
export const userPostLoginAPI = (phoneNumber, msgCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false,
      mobile: phoneNumber,
      partyData: {},
      smsCode: msgCode
    }
  })
}

// 我的页面
// 获取用户信息
export const userGetInfoAPI = () => {
  return request.get('/user/info')
}
