<template>
  <div class="counter">
    <button :class="{ outOfStock: !Boolean(stock) || value === 1 }" @click="changeCount('minus', value === 1)">-</button>
    <input
      type="text"
      :value="value"
      @change="changeHandle"
    />
    <button :class="{ outOfStock: !Boolean(stock) || value >= stock}" @click="changeCount('add', value >= stock)">+</button>
  </div>
</template>

<script>
export default {
  name: 'goodsCounter',

  props: {
    value: {
      type: Number,
      required: true,
      default: 1
    },
    stock: {
      type: Number,
      default: 0
    }
  },

  methods: {
    changeCount (type, stockCheck) {
      if (!this.stock || stockCheck) return

      if (type === 'minus') {
        if (this.value > 1) this.$emit('input', this.value - 1)
      }
      if (type === 'add') {
        this.$emit('input', this.value + 1)
      }
    },

    changeHandle (e) {
      if (isNaN(+e.target.value)) {
        this.$toast('请输入数字')
        e.target.value = this.value
      } else if (e.target.value <= 0) {
        this.$toast('请输入大于0的数字')
        e.target.value = this.value
      } else if (e.target.value > this.stock) {
        this.$toast('已达到商品库存数量')
        e.target.value = this.stock
      } else {
        this.$emit('input', +e.target.value)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.counter {
  width: 95px;
  height: 25px;

  display: flex;
  gap: 5px;

  button {
    border: none;
    width: 25px;
    background-color: rgb(240, 240, 240);
  }

  input {
    border: none;
    width: 35px;
    background-color: rgb(240, 240, 240);

    text-align: center;

    display: flex;
    align-items: center;
  }

  .outOfStock {
    cursor: not-allowed;
  }
}
</style>
