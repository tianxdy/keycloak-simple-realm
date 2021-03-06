const proxy = require('http-proxy-middleware')

module.exports = app => {
  app.use(
    proxy('/auth/**', {
      target: 'http://localhost:8082/',
      changeOrigin: true
      // pathRewrite: {
      //   '^/api': ''
      // }
    })
  )
}
