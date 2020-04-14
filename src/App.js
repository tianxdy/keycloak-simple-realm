import React from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Users from './page/Users'

const App = () => {
  return (
    <div>
      <div>123</div>
      <Switch>
        <Route path='/users' component={Users}></Route>
      </Switch>
    </div>
  )
}

export default App
