import { Dialog } from 'vant'

export default {
  methods: {
    // 登录验证
    loginCheck () {
      if (this.$store.getters.token) {
        return true
      } else {
        Dialog.confirm({
          message: '请登录后再进行操作',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            this.$router.push('/login')
            // this.$router.replace({
            //   path: '/login',
            //   query: {
            //     backUrl: this.$route.fullPath // 传递参数
            //   }
            // })
          })
          .catch(() => {
          })
        return false
      }
    }
  }
}
