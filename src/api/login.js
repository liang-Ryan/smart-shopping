// login页面相关请求
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
