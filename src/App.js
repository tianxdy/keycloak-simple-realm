import React, { useEffect } from 'react'
import './App.css'
import Users from './comp/users/Table'
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
