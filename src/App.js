import React, { useEffect } from 'react'
import './App.css'
import { Button } from 'antd'
import req from './plugin/axios'
import Users from './comp/users/Index'
import Info from './comp/users/Info'

const App = () => {
  return (
    <div>
      <Info />
      <Users />
    </div>
  )
}

export default App
