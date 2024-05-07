import Vue from 'vue'
import { Tabbar, TabbarItem, NavBar, Toast, Search, Swipe, SwipeItem, Grid, GridItem, Icon, rate, ActionSheet, Checkbox, Dialog } from 'vant'

// login页面
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(NavBar)

Vue.use(Toast)

// home页面
Vue.use(GridItem)
Vue.use(Search)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Grid)

// 搜索页面
Vue.use(Icon)

// 商品详情
Vue.use(rate)
Vue.use(ActionSheet)

// 购物车
Vue.use(Checkbox)
Vue.use(Dialog)
