<template>
  <div
    v-if="item.goods_id"
    class="goods-item"
    @click="$router.push(`/detial/${item.goods_id}`)"
  >
    <div class="left">
      <img :src="item.goods_image" alt=""/>
    </div>
    <div class="right">
      <p class="text-ellipsis">
        {{ item.goods_name }}
      </p>
      <p class="count">已售{{ item.goods_sales }}件</p>
      <p class="price">
        <span class="new">{{ item.goods_price_min }}</span>
        <span class="old">{{ item.goods_price_max }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.goods-item {
  padding: 10px;
  height: 148px;
  background-color: #fff;

  display: flex;

  .left {
    width: 127px;

    img {
      display: block;
      width: 100%;
    }
  }

  .right {
    flex: 1;

    padding: 10px;

    font-size: 14px;
    line-height: 1.3;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .count {
      font-size: 12px;
      color: #999;
    }

    .price {
      display: flex;
      align-items: flex-end;
      gap: 10px;

      .new {
        font-size: 16px;
        color: #f03c3c;
      }

      .old {
        font-size: 12px;
        color: #999;
        text-decoration: line-through;
      }
    }
  }
}
</style>
