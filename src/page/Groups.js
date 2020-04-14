import React from 'react'
import { Row, PageHeader, Col, Tabs, Layout } from 'antd'
import GroupsTree from '../comp/groups/GroupsTree'

const Groups = () => {
  return (
    <Row>
      <PageHeader title='角色组' />
      <Col span={24}>
        <Tabs type='card'>
          <Tabs.TabPane key={1} tab='角色组'>
            <GroupsTree />
          </Tabs.TabPane>
          <Tabs.TabPane key={2} tab='默认角色组'>
            123
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  )
}

export default Groups
