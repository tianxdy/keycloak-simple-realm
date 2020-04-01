import React, { useEffect } from 'react'
import './App.css'
import { Button } from 'antd'
import req from './plugin/axios'
import Users from './comp/users/Index'

const App = () => {
  return (
    <div className='App'>
      <Users />
    </div>
  )
}

export default App
