import React, { useState } from 'react'
import { Tabs, message } from 'antd'
import Info from './Info'
import Attr from './Attr'
import { putUser } from '../../api/users'
import Cred from './Cred'
import RoleMapping from './RoleMapping'
import GroupSetting from './GroupSetting'

const { TabPane } = Tabs

const User = ({ id }) => {
  const [currentUser, setCurrentUser] = useState({})

  const onAttrSave = attrs => {
    if (currentUser && currentUser.id) {
      putUser(currentUser.id, { ...currentUser, attributes: attrs }).then(_ => {
        message.success('修改成功')
      })
    }

    console.log(attrs)
  }
  return (
    <Tabs type='card' defaultActiveKey={1}>
      <TabPane tab='详情' key={1}>
        <Info
          id={id}
          afterUpdateUser={user => setCurrentUser(user ? user : {})}
        />
      </TabPane>
      <TabPane tab='属性' key={2}>
        <Attr
          attributes={currentUser.attributes ? currentUser.attributes : {}}
          onFinish={onAttrSave}
        />
      </TabPane>
      <TabPane tab='凭据' key={3}>
        <Cred id={currentUser.id} />
      </TabPane>
      <TabPane tab='角色' key={4}>
        <RoleMapping id={currentUser.id} />
      </TabPane>
      <TabPane tab='角色组' key={5}>
        <GroupSetting id={currentUser.id} />
      </TabPane>
    </Tabs>
  )
}

export default User
