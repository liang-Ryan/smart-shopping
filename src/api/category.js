import request from '@/utils/request'

// 获取商品分类数据
export const catagoryGetDetailAPI = () => request.get('/category/list')
