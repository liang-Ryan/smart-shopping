<template>
  <div class="main-content">
    <van-nav-bar fixed title="编辑收货地址" left-arrow @click-left="$router.go(-1)" />

    <div class="title">收货地址</div>

    <div class="form">
      <van-form @submit="onSubmit">
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
      </van-form>
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
      name: this.$route.query.addressName || '',
      phone: this.$route.query.addressPhone || '',
      area: this.$route.query.addressRegion || '',
      address: this.$route.query.addressDetail || ''
    }
  },
  props: ['addressName'],
  methods: {
    // 表单
    onSubmit (values) {
      console.log('submit', values)
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
    font-size: 14px;
    color: rgba(69,90,100,0.6);
  }

  .form {
    padding: 0 20px;
    margin: 20px 0;
    border-radius: 11px;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.05);

    ::v-deep .van-cell{
      padding: 20px 0;
      border-bottom: 1px solid rgb(250, 250, 250);
      font-size: 14px;
    }
  }

  .submit {
    margin-top: 40px;
    width: 100%;
    height: 46px;
    line-height: 46px;
    border-radius: 25px;
    background: linear-gradient(90deg,#f9211c,#ff6335);
    font-size: 14px;
    color: #fff;
    text-align: center;
  }

}
</style>
