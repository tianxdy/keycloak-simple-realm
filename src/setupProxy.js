const proxy = require('http-proxy-middleware')

module.exports = app => {
  app.use(
    proxy('/auth/**', {
      target: 'https://oauth.ihelpedu.cn',
      changeOrigin: true
      // pathRewrite: {
      //   '^/api': ''
      // }
    })
  )
}
