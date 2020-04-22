import React, { useEffect, useState, useCallback } from 'react'
import {
  PageHeader,
  Tabs,
  Card,
  Form,
  Input,
  Button,
  message,
  Col,
  Row,
  Select,
  Table
} from 'antd'
import {
  getGroup,
  putGroup,
  getAssignedRoleMapping,
  getAvailableRoleMapping,
  getEffectiveRoleMapping,
  postRoleMapping,
  deleteRoleMapping,
  getClientAssignedRoleMapping,
  getClientAvailableRoleMapping,
  getClientEffectiveRoleMapping,
  deleteClientRoleMapping,
  postClientRoleMapping
} from '../../api/groups'
import { withRouter } from 'react-router-dom'
import RoleMappingSetting from '../common/RoleMappingSetting'
import useClients from '../../use/useClients'
const { TabPane } = Tabs
const { Option } = Select
const { Column } = Table

const Info = ({ id = '', history } = {}) => {
  const clients = useClients()

  const [currentGroup, setCurrentGroup] = useState({})

  const [assignedRole, setAssignedRole] = useState([])
  const [availabledRole, setAvailabledRole] = useState([])
  const [effectiveRole, setEffectiveRole] = useState([])

  const [clientAssignedRole, setClientAssignedRole] = useState([])
  const [clientAvailabledRole, setClientAvailabledRole] = useState([])
  const [clientEffectiveRole, setclientEffectiveRole] = useState([])

  const [clientId, setClientId] = useState()

  const [form] = Form.useForm()

  const loadUserRoles = useCallback(() => {
    getAssignedRoleMapping(id).then(data => {
      setAssignedRole(data)
    })
    getAvailableRoleMapping(id).then(data => {
      setAvailabledRole(data)
    })
    getEffectiveRoleMapping(id).then(data => {
      setEffectiveRole(data)
    })
  }, [id])

  useEffect(() => {
    loadUserRoles()
  }, [loadUserRoles])

  const onAddRoles = roles => {
    postRoleMapping(id, roles).then(_ => {
      message.success('修改成功')
      loadUserRoles()
    })
  }
  const onRemoveRoles = roles => {
    deleteRoleMapping(id, roles).then(_ => {
      message.success('修改成功')
      loadUserRoles()
    })
  }
  useEffect(() => {
    getGroup(id).then(data => {
      console.log(data)
      if (data) {
        form.setFieldsValue({ name: data.name })
        setCurrentGroup(data)
      }
    })
  }, [currentGroup.name, form, id])

  const onCencalEditName = _ => {
    form.setFieldsValue({ name: currentGroup.name })
  }

  const onEditName = values => {
    const newCurrentGroup = { ...currentGroup, ...values }
    putGroup(id, newCurrentGroup).then(_ => {
      message.success('修改成功')
      setCurrentGroup(newCurrentGroup)
    })
  }

  const loadUserClientRoles = useCallback(
    clientId => {
      getClientAssignedRoleMapping(id, clientId).then(data => {
        setClientAssignedRole(data)
      })
      getClientAvailableRoleMapping(id, clientId).then(data => {
        setClientAvailabledRole(data)
      })
      getClientEffectiveRoleMapping(id, clientId).then(data => {
        setclientEffectiveRole(data)
      })
    },
    [id]
  )

  const onClientChange = val => {
    setClientId(val)
    loadUserClientRoles(val)
  }

  const onAddClientRoles = roles => {
    postClientRoleMapping(id, clientId, roles).then(_ => {
      message.success('修改成功')
      loadUserClientRoles(clientId)
    })
  }
  const onRemoveClientRoles = roles => {
    deleteClientRoleMapping(id, clientId, roles).then(_ => {
      message.success('修改成功')
      loadUserClientRoles(clientId)
    })
  }

  return (
    <div>
      <PageHeader
        breadcrumb={{
          routes: [
            { breadcrumbName: '角色组', path: '/groups' },
            { breadcrumbName: `${currentGroup.name}` }
          ],
          itemRender: (route, params, routes, paths) => {
            const last = routes.indexOf(route) === routes.length - 1
            return last ? (
              <span>{route.breadcrumbName}</span>
            ) : (
              <Button
                type='link'
                onClick={_ => {
                  history.push(route.path)
                }}
                to='/groups'
              >
                {route.breadcrumbName}
              </Button>
            )
          }
        }}
        title={currentGroup.name}
      />
      <Tabs type='card' defaultActiveKey='1'>
        <TabPane tab='设置' key='1'>
          <Card>
            <Form
              form={form}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 8 }}
              initialValues={{ name: currentGroup.name }}
              onFinish={onEditName}
            >
              <Form.Item
                name='name'
                label='名称'
                rules={[{ required: true, message: '必填' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                shouldUpdate
                dependencies={['name']}
                wrapperCol={{ offset: 5 }}
              >
                {({ getFieldValue }) => {
                  return (
                    <div>
                      <Button
                        disabled={getFieldValue('name') === currentGroup.name}
                        htmlType='submit'
                        type='primary'
                      >
                        保存
                      </Button>
                      <Button
                        onClick={onCencalEditName}
                        style={{ marginLeft: 16 }}
                      >
                        取消
                      </Button>
                    </div>
                  )
                }}
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
        <TabPane tab='角色映射' key='2'>
          <Card>
            <Form labelCol={{ span: 4 }}>
              <Form.Item label='全局角色'>
                <RoleMappingSetting
                  available={availabledRole}
                  assigned={assignedRole}
                  effective={effectiveRole}
                  add={onAddRoles}
                  remove={onRemoveRoles}
                />
              </Form.Item>
              <Form.Item label={'应用角色'}>
                <Row gutter={[0, 16]}>
                  <Col span={8}>
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder='选择一个应用'
                      optionFilterProp='children'
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      onChange={onClientChange}
                    >
                      {clients.map(({ id, label }) => (
                        <Option key={id} value={id}>
                          {label}
                        </Option>
                      ))}
                    </Select>
                  </Col>
                  <Col span={24}>
                    <RoleMappingSetting
                      available={clientAvailabledRole}
                      assigned={clientAssignedRole}
                      effective={clientEffectiveRole}
                      add={onAddClientRoles}
                      remove={onRemoveClientRoles}
                    />
                  </Col>
                </Row>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
        <TabPane tab='用户' key='3'>
          <Card>
            <Table>
              <Column title=''></Column>
            </Table>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default withRouter(Info)
