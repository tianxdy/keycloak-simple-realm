import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'

import kec from './plugin/keycloak'
import { ConfigProvider } from 'antd'

// 中文

moment.locale('zh-cn')

kec.init({ promiseType: 'native', onLoad: 'check-sso' }).then((auth) => {
  if (auth) {
    ReactDOM.render(
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>,
      document.getElementById('root')
    )
  } else {
    kec.login()
  }
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister()
