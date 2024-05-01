// login页面相关请求
import request from '@/utils/request'

// 图像验证码
export const getImgCode = () => {
  return request.get('/captcha/image')
}
