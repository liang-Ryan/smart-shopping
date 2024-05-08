<template>
  <div class="main-content">
    <van-nav-bar fixed title="结算" left-arrow @click-left="$router.go(-1)" />

    <!-- 地址 -->
    <div class="address" @click="$router.push('/address')">
      <div class="left-icon">
        <van-icon name="logistics" />
      </div>

      <div class="info" v-if="addressDefault">
        <div class="info-content">
          <span class="name">{{ addressDefault.name }}</span>
          <span class="mobile">{{ addressDefault.phone }}</span>
        </div>
        <div class="info-address">{{ addressDetail }}</div>
      </div>
      <div class="info" v-else>请选择收获地址</div>

      <div class="right-icon">
        <van-icon name="arrow" />
      </div>
    </div>

    <!-- 订单明细 -->
    <div class="pay-list">
      <div class="goods-list">
        <div class="goods-item">
            <div class="left">
              <img src="http://cba.itlike.com/public/uploads/10001/20230321/8f505c6c437fc3d4b4310b57b1567544.jpg" alt="" />
            </div>
            <div class="right">
              <p class="tit text-ellipsis">
                 三星手机 SAMSUNG Galaxy S23 8GB+256GB 超视觉夜拍系统 超清夜景 悠雾紫 5G手机 游戏拍照旗舰机s23
              </p>
              <p class="info">
                <span class="count">x3</span>
                <span class="price">¥9.99</span>
              </p>
            </div>
        </div>
        <div class="goods-item">
            <div class="left">
              <img src="http://cba.itlike.com/public/uploads/10001/20230321/8f505c6c437fc3d4b4310b57b1567544.jpg" alt="" />
            </div>
            <div class="right">
              <p class="tit text-ellipsis">
                 三星手机 SAMSUNG Galaxy S23 8GB+256GB 超视觉夜拍系统 超清夜景 悠雾紫 5G手机 游戏拍照旗舰机s23
              </p>
              <p class="info">
                <span class="count">x3</span>
                <span class="price">¥9.99</span>
              </p>
            </div>
        </div>
      </div>

      <div class="total-box">
        <span>共 12 件商品，合计：</span>
        <span class="red">￥1219.00</span>
      </div>

      <div class="pay-detail">
        <div class="pay-cell">
          <span>订单总金额：</span>
          <span class="red">￥1219.00</span>
        </div>

        <div class="pay-cell">
          <span>优惠券：</span>
          <span>无优惠券可用</span>
        </div>

        <div class="pay-cell">
          <span>配送费用：</span>
          <span v-if="false">请先选择配送地址</span>
          <span v-else class="red">+￥0.00</span>
        </div>
      </div>

      <!-- 支付方式 -->
      <div class="pay-way">
        <span class="pay-title">支付方式</span>
        <div class="pay-cell">
          <van-icon name="balance-o" /><span>余额支付（可用 ¥ 999919.00 元）</span>
          <!-- <span>请先选择配送地址</span> -->
          <span class="red"><van-icon name="passed" /></span>
        </div>
      </div>

      <!-- 买家留言 -->
      <div class="buytips">
        <textarea placeholder="选填：买家留言（50字内）" name="" id="" cols="30" rows="10"></textarea>
      </div>
    </div>

    <!-- 底部提交 -->
    <div class="footer-fixed">
      <div class="left">实付款：<span class="red">￥999919</span></div>
      <div class="btn">提交订单</div>
    </div>
  </div>
</template>

<script>
import { getDefaultAddressID, getAddressDetail, getAddressList } from '@/api/address'

export default {
  name: 'PayIndex',
  created () {
    this.getDefaulitID()
    this.getAddress()
  },
  data () {
    return {
      addressDefaultId: '',
      addressList: []
    }
  },
  computed: {
    addressDefault () {
      return this.addressList ? this.addressList[0] : {}
    },
    addressDetail () {
      const { province, city, region } = this.addressDefault.region
      return province + ' ' + city + ' ' + region + ' ' + this.addressDefault.detail
    }
  },
  methods: {
    async getDefaulitID () {
      const { data: { defaultId } } = await getDefaultAddressID()
      this.addressDefaultId = defaultId
      this.getDetail(defaultId)
    },
    async getDetail (id) {
      console.log(id)
      const res = await getAddressDetail(id)
      console.log(res)
    },
    async getAddress () {
      const { data: { list } } = await getAddressList()
      this.addressList = list
    }
  }
}
</script>

<style lang="less" scoped>
.main-content {
  padding-top: 46px 0;
  font-size: 14px;
  color: #333;

  // 地址样式
  .address {
    position: relative;
    padding: 20px;
    background: url(@/assets/border-line.png) bottom repeat-x;
    background-size: 60px auto;
    display: flex;
    align-items: center;
    gap: 20px;
    color: #666;

    .right-icon {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-7px);
    }
  }

  // 商品样式
  .goods-list{
    display: flex;
    flex-direction: column;
    gap: 6px;

    .goods-item {
      height: 100px;
      padding: 10px;
      display: flex;
      gap: 10px;

      .left {
        width: 100px;

        img {
          display: block;
          width: 80px;
          margin: 10px auto;
        }
      }

      .right {
        flex: 1;
        padding: 10px 0;
        line-height: 1.3;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        gap: 5px;

        .info {
          display: flex;
          justify-content: space-between;

          .price {
            color: #fa2209;
          }
        }
      }
    }
  }

  // 商品合计样式
  .total-box {
    padding: 10px;
    border-bottom: 1px solid #efefef;
    display: flex;
    justify-content: flex-end;
  }

  // 订单合计样式
  .pay-detail {
    border-bottom: 1px solid #efefef;

    .pay-cell {
      padding: 10px 12px;
      display: flex;
      justify-content: space-between;
    }
  }

  // 支付方式样式
  .pay-way {
    padding: 10px 12px;
    border-bottom: 1px solid #efefef;

    .pay-cell {
      padding: 10px 0;
      display: flex;
      gap: 5px;
    }

    .van-icon {
      font-size: 20px;
    }
  }

  // 卖家留言样式
  .buytips {
    textarea {
      display: block;
      width: 100%;
      height: 100px;
      padding: 12px;
      border: none;
    }
  }

  // 底边功能样式
  .footer-fixed {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 46px;
    line-height: 46px;
    border-top: 1px solid #efefef;
    background-color: #fff;
    display: flex;

    .left {
      flex: 1;
      padding-left: 12px;
      color: #666;
    }

    .btn {
      width: 121px;
      line-height: 46px;
      background: linear-gradient(90deg,#f9211c,#ff6335);
      color: #fff;
      text-align: center;
    }
  }

  // 通用样式
  .red {
        color: #fa2209;
  }
}
</style>
