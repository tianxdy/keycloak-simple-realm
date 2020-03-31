import React, { useEffect } from 'react'
import './App.css'
import { Button } from 'antd'
import req from './plugin/axios'

const App = () => {
  useEffect(() => {
    req.get('/users').then((data) => {
      console.log(data)
    })
  }, [])
  return (
    <div className='App' style={{ backgroundColor: 'red' }}>
      <Button>123456</Button>
    </div>
  )
}

export default App
