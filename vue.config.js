const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './', // 打包时，将绝对路径配置成相对路径
  transpileDependencies: true
})
