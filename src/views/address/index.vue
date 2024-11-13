<template>
  <div class="main-content">
    <van-nav-bar fixed title="收货地址" left-arrow @click-left="$router.go(-1)" />

    <!-- 地址主体 -->
    <div class="address-list">
      <van-radio-group v-model="defaultAddressId">
        <div class="address-item" v-for="item in addressList" :key="item.address_id">
          <div class="item-top">
            <span>{{ item.name }}</span>
            <span>{{ item.phone }}</span>
          </div>

          <div class="item-content">
            <div>{{ addressDetail(item) }}</div>
          </div>

          <hr>

          <div class="item-bottom">
            <van-radio :name="item.address_id" @click="setDefaultAddress(item.address_id)">
              <span v-html="item.address_id === defaultAddressId ? '默认' : '选择'"></span>
            </van-radio>

            <div class="item-function">
              <span @click="toAddressEdit(
                item.name,
                item.phone,
                item.region.province,
                item.region.city,
                item.region.region,
                item.detail,
              )"><van-icon name="edit" />编辑</span>
              <span @click="delAddress(item.address_id)"><van-icon name="delete-o" />删除</span>
            </div>
          </div>
        </div>
      </van-radio-group>
    </div>

    <!-- 底部功能 -->
    <div class="footer">
      <div @click="$router.push('/addressEdit')">添加新地址</div>
    </div>
  </div>
</template>

<script>
import { addressPostRemoveAPI, addressGetListAPI, addressGetDefaultIdAPI, addressPostDefaultAPI } from '@/api/address'
import { Dialog } from 'vant'

export default {
  name: 'addressPage',
  created () {
    this.getList()
    this.getDefaultAddress()
  },
  data () {
    return {
      addressList: [],
      defaultAddressId: ''
    }
  },
  methods: {
    // 获取默认收货地址
    async getDefaultAddress () {
      const { data: { defaultId } } = await addressGetDefaultIdAPI()
      this.defaultAddressId = defaultId
    },

    // 获取地址列表
    async getList () {
      const { data: { list } } = await addressGetListAPI()
      this.addressList = list
    },

    // 拼接详细地址
    addressDetail (address) {
      const { province, city, region } = address.region
      return province + ' ' + city + ' ' + region + ' ' + address.detail
    },

    // 修改默认收货地址
    async setDefaultAddress (id) {
      await addressPostDefaultAPI(id)
      this.$toast('修改默认收货地址成功')
    },

    // 传递编辑地址参数
    toAddressEdit (name, phone, province, city, region, detail) {
      this.$router.push({
        path: '/addressEdit',
        query: {
          addressName: name,
          addressPhone: phone,
          addressRegion: province + city + region,
          addressDetail: detail
        }
      })
    },

    // 删除收货地址
    async delAddress (id) {
      Dialog.confirm({
        message: '确认删除该地址吗？'
      })
        .then(async () => {
          const { message } = await addressPostRemoveAPI(id)
          this.$toast(message)
          this.getList()
        })
        .catch(() => {
        })
    },

    // 返回订单结算页
    toPay () {
      this.$router.push({
        path: '/pay',
        query: {
          mode: this.$route.query.mode,
          obj: JSON.stringify(this.$route.query.obj)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main-content {
  padding: 46px 0;
  background-color: rgb(250, 250, 250);

  // 地址样式
  .address-list{
    .address-item {
      padding: 25px;
      margin: 20px;
      border-radius: 11px;
      background-color: #fff;
      box-shadow: 0 1px 3px 0 rgba(0,0,0,0.05);
      display: flex;
      flex-direction: column;
      gap: 10px;

      .item-top {
        display: flex;
        align-items: flex-end;
        gap: 10px;
        font-size: 20px;
      }

      .item-content {
        font-size: 16px;
      }

      hr {
        border-color: rgb(250, 250, 250);
      }

      .item-bottom {
        display: flex;
        justify-content: space-between;
        font-size: 16px;

        .item-function {
          display: flex;
          gap: 20px;
        }
      }
    }
  }

  // 底部功能
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 46px;
    line-height: 46px;
    background: linear-gradient(90deg,#f9211c,#ff6335);
    color: #fff;
    text-align: center;
}
}
</style>
