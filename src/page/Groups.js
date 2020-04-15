import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Table from '../comp/groups/Table'
const Groups = ({ history, match: { path } }) => {
  return (
    <Switch>
      <Route
        path={`${path}`}
        render={({ history }) => {
          return <Table />
        }}
      />
    </Switch>
  )
}

export default Groups
