import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Info from '../comp/users/Info'
import UserTable from '../comp/users/Table'
import User from '../comp/users/User'

const Users = ({ history, match: { path } }) => {
  return (
    <Switch>
      <Route
        path={`${path}/add`}
        render={({ history }) => {
          return <Info onAfterFinish={() => history.push(`${path}`)} />
        }}
      />
      <Route
        path={`${path}/:id`}
        render={({ match }) => {
          return <User id={match.params.id} />
        }}
      />
      <Route path={`${path}`}>
        <UserTable
          onAdd={_ => {
            history.push(`${path}/add`)
          }}
          onEdit={id => {
            history.push(`${path}/${id}`)
          }}
        />
      </Route>
    </Switch>
  )
}

export default Users
