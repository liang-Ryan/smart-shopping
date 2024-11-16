# 项目介绍
项目基于vue2，使用vue cli创建

使用npm管理，并使用了以下包

* vuex （状态管理）
* vue-router （路由管理）
* vant2 （组件库）
* axios （网络请求）
* eslint （代码格式化）
* babel
* less （样式）
* postcss-px-to-viewport

## 首页-分类页面
* 使用 可选链运算符(.?) 解决组件初始化完毕，未发起axios请求时，模板渲染找不到对象属性的报错问题
* 使用 :class动态绑定 实现动态绑定激活样式

## 购物车页面
* 按照单向数据流(:value和@click)实现 全选/单选 逻辑
* 使用 三元表达式 + :class动态绑定 取代 v-show / v-if 进行渲染，减少template内容冗余

## 我的订单页面
* destroyed() 钩子清除定时器，减少内存泄漏
* 
## 订单支付页面
* 下单页面使用 JSON.stringify 将商品信息对象转为字符串，订单页面使用 JSON.parse 重新转回对象。解决route查询参数在刷新页面后丢失对象类型的参数的问题
* 使用 可选链运算符(.?) 解决组件初始化完毕，未发起axios请求时，computed参数找不到对象属性的报错问题

## 登录页面
* 正则表达式验证手机号码、图形验证码
* destroyed() 钩子清除定时器，减少内存泄漏

## 搜索功能
* 使用 vuex 和 localStorage 管理搜索历史记录
* 使用 route查询参数 传递搜索内容

## axios请求
* 使用对象解构优化代码