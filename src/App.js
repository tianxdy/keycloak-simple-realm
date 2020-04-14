import React from 'react'
import './App.css'
import { Switch, Route } from 'react-router-dom'
import Users from './page/Users'
import Groups from './page/Groups'

const App = () => {
  return (
    <div>
      <Switch>
        <Route path='/groups' component={Groups}></Route>
        <Route path='/users' component={Users}></Route>
      </Switch>
    </div>
  )
}

export default App
