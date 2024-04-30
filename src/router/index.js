import Vue from 'vue'
import VueRouter from 'vue-router'
// 一级页面
import Layout from '@/views/layout'
import Login from '@/views/login'
import Search from '@/views/search'
import SearchList from '@/views/search/list'
import Pay from '@/views/pay'
import Detial from '@/views/detail'
import MyPage from '@/views/mypage'
// 二级页面
import Home from '@/views/layout/home'
import Category from '@/views/layout/category'
import Cart from '@/views/layout/cart'
import User from '@/views/layout/user'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
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
    { path: '/detial/:id', component: Detial },
    { path: '/mypage', component: MyPage }
  ]
})

export default router