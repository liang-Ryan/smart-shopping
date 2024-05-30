import Vue from 'vue'
import VueRouter from 'vue-router'
// 其他组件
import store from '@/store'
// 一级页面
import Layout from '@/views/layout'
// 二级页面
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'

// 一级页面 异步组件
const Login = () => import('@/views/login')
const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list')
const Pay = () => import('@/views/pay')
const Address = () => import('@/views/address')
const AddressEdit = () => import('@/views/address/edit')
const Detial = () => import('@/views/detail')
const Order = () => import('@/views/order')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',

      // 二级路由
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: Category },
        { path: '/cart', component: Cart },
        { path: '/user', component: User }
      ]
    },
    { path: '/login', component: Login },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    { path: '/pay', component: Pay },
    { path: '/address', component: Address },
    { path: '/addressEdit', component: AddressEdit },
    { path: '/detial/:id', component: Detial },
    { path: '/order', component: Order }
  ]
})

// 全局前置守卫
const urlArr = ['/pay', '/address', 'addressEdit', '/order'] // 需要登录验证的网址

router.beforeEach((to, from, next) => {
  // to为请求前往的路由页面信息对象
  // from为发送请求的路由页面信息对象
  // next(路径)为一个方法，无形参传入时不拦截请求，传入路径形参时跳转到形参的路由路径
  if (urlArr.includes(to.path)) {
    if (store.getters.token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
