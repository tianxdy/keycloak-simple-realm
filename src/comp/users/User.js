import React, { useState } from 'react'
import { Tabs, message, Row, Col, PageHeader } from 'antd'
import Info from './Info'
import Attr from './Attr'
import { putUser, deleteUser } from '../../api/users'
import Cred from './Cred'
import RoleMapping from './RoleMapping'
import GroupSetting from './GroupSetting'
import { DeleteOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
const { TabPane } = Tabs

const User = ({ id, history }) => {
  const [currentUser, setCurrentUser] = useState({})

  const onAttrSave = attrs => {
    if (currentUser && currentUser.id) {
      putUser(currentUser.id, { ...currentUser, attributes: attrs }).then(_ => {
        message.success('修改成功')
      })
    }
  }

  const onDeleteUser = _ => {
    deleteUser(currentUser.id).then(_ => {
      message.success('删除成功')
      history.push('/users')
    })
  }

  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <PageHeader
          breadcrumb={{
            routes: [
              { breadcrumbName: '用户', path: '/users' },
              { breadcrumbName: `${currentUser.username}` }
            ],
            itemRender: (route, params, routes, paths) => {
              const last = routes.indexOf(route) === routes.length - 1
              return last ? (
                <span>{route.breadcrumbName}</span>
              ) : (
                <Link
                  type='link'
                  onClick={_ => {
                    history.push(route.path)
                  }}
                >
                  {route.breadcrumbName}
                </Link>
              )
            }
          }}
          title={<span style={{ fontSize: 32 }}>{currentUser.username}</span>}
          subTitle={
            <DeleteOutlined style={{ fontSize: 20 }} onClick={onDeleteUser} />
          }
        />
      </Col>
      <Col span={24}>
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
      </Col>
    </Row>
  )
}

export default withRouter(User)
