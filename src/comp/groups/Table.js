import React from 'react'
import { Row, Col, PageHeader, Tabs } from 'antd'
import DefaultGroups from './DefaultGroups'
import GroupsTree from './GroupsTree'

const Table = () => {
  return (
    <Row>
      <PageHeader title='角色组' />
      <Col span={24}>
        <Tabs type='card'>
          <Tabs.TabPane key={1} tab='角色组'>
            <GroupsTree />
          </Tabs.TabPane>
          <Tabs.TabPane key={2} tab='默认角色组'>
            <DefaultGroups />
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  )
}

export default Table
