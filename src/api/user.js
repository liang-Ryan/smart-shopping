import request from '@/utils/request'

// 图像验证码
export const getImgCode = () => { return request.get('/captcha/image') }

// 短信验证码
export const getMsgCode = (imgCode, imgKey, phoneNumber) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode: imgCode,
      captchaKey: imgKey,
      mobile: phoneNumber
    }
  })
}

// 登录验证
export const login = (phoneNumber, msgCode) => {
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
export const getUserInfo = () => {
  return request.get('/user/info')
}
