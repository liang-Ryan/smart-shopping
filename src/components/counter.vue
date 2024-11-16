<template>
  <div class="counter">
    <button @click="toDetailPage('minus')">-</button>
    <input
      type="text"
      :value="value"
      @change="changeCount"
    />
    <button @click="toDetailPage('add')">+</button>
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
    }
  },

  methods: {
    toDetailPage (type) {
      if (type === 'minus') {
        if (this.value > 1) this.$emit('input', this.value - 1)
      } else if (type === 'add') {
        this.$emit('input', this.value + 1)
      } else {
        console.log(`传入的${type}有误`)
      }
    },

    changeCount (e) {
      if (isNaN(+e.target.value)) {
        this.$toast('请输入数字')
        e.target.value = this.value
      } else if (e.target.value <= 0) {
        this.$toast('请输入大于0的数字')
        e.target.value = this.value
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
}
</style>
