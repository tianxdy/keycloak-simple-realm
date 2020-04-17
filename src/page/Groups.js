import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Table from '../comp/groups/Table'
import Add from '../comp/groups/Add'

const Groups = ({ history, match: { path } }) => {
  return (
    <Switch>
      <Route path={`${path}/add/parent/:id`} component={Add} />

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
