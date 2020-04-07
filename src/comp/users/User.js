import React, { useState } from 'react'
import { Tabs } from 'antd'
import Info from './Info'
import Attr from './Attr'
const { TabPane } = Tabs

const User = ({ id }) => {
  const [currentUser, setCurrentUser] = useState({})

  return (
    <Tabs defaultActiveKey='1'>
      <TabPane tab='详情' key={1}>
        <Info
          id={id}
          afterUpdateUser={user => setCurrentUser(user ? user : {})}
        />
      </TabPane>
      <TabPane tab='属性' key={2}>
        <Attr
          attributes={currentUser.attributes ? currentUser.attributes : null}
        />
      </TabPane>
      <TabPane tab='凭据' key={3}>
        Content of Tab Pane 3
      </TabPane>
      <TabPane tab='角色' key={4}>
        Content of Tab Pane 3
      </TabPane>
      <TabPane tab='组' key={5}>
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  )
}

export default User
