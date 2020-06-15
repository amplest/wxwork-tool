const path = require('path')

const resolve = dir => path.join(__dirname, dir)

const BASE_URL = process.env.NODE_ENV === 'production' ? '/H5' : '/'

module.exports = {
  lintOnSave: false,
  publicPath: BASE_URL,
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src')).set('_c', resolve('src/components'))
  },
  productionSourceMap: false,
  devServer: {
    open: true,
    proxy: {
      '/v3': {
        target: '', // 安全起见，关闭域名
        changeOrigin: true
      }
    }
  }
}
