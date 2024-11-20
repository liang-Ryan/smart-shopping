<template>
  <div class="main-content">
    <van-nav-bar
      fixed
      :title="title"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <div class="title">收货地址</div>

    <div class="form">
      <van-field
        v-model="name"
        name="name"
        label="姓名"
        placeholder="姓名"
      />

      <van-field
        v-model="phone"
        type="phone"
        name="phone"
        label="手机号码"
        placeholder="手机号码"
      />

      <van-field
        v-model="area"
        type="area"
        name="area"
        label="地区"
        placeholder="地区"
      />

      <van-field
        v-model="address"
        type="address"
        name="address"
        label="详细地址"
        placeholder="详细地址"
      />
    </div>

    <div class="submit">提交</div>
  </div>
</template>

<script>
export default {
  name: 'AddressEdit',

  data () {
    return {
      // 表单数据
      name: this.$route.query.name || '',
      phone: this.$route.query.phone || '',
      area: this.$route.query.area || '',
      address: this.$route.query.address || ''
    }
  },

  computed: {
    title () {
      return this.$route.query.name ? '编辑收货地址' : '添加收货地址'
    }
  }
}
</script>

<style lang="less" scoped>
.main-content {
  padding: 46px 20px 0;
  background-color: rgb(250, 250, 250);

  .title {
    margin-top: 30px;

    color: rgba(69, 90, 100, 0.6);
    font-size: 14px;
  }

  .form {
    margin: 20px 0;
    border-radius: 11px;
    padding: 0 20px;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);

    ::v-deep .van-cell {
      padding: 20px 0;
      border-bottom: 1px solid rgb(250, 250, 250);

      font-size: 14px;
    }
  }

  .submit {
    margin-top: 40px;
    border-radius: 25px;
    width: 100%;
    height: 46px;
    background: linear-gradient(90deg, #f9211c, #ff6335);

    color: #fff;
    font-size: 14px;
    line-height: 46px;
    text-align: center;
  }
}
</style>
