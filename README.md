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

## 搜索功能
* 使用 vuex 和 localStorage 管理搜索历史记录
* 使用 route查询参数 传递搜索内容

## 订单页面
* 下单页面使用 JSON.stringify 将商品信息对象转为字符串，订单页面使用 JSON.parse 重新转回对象。解决route查询参数在刷新页面后丢失对象类型的参数的问题
* :class动态绑定
* 使用 可选链运算符(.?) 解决组件初始化完毕，未发起axios请求时，computed参数找不到对象属性的报错问题

## axios请求
* 使用对象解构优化代码