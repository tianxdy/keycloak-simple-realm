import React, { useEffect, useState } from 'react'
import {
  getRoleMapping,
  getClientAssignedRoleMapping,
  getClientAvailableRoleMapping,
  getClientEffectiveRoleMapping,
  deleteClientRoleMapping,
  postClientRoleMapping
} from '../../api/users'

import { Transfer, Row, Col, Form, Select } from 'antd'

import useClients from '../../use/useClients'
import TransferList from 'antd/lib/transfer/list'

const { Option } = Select

// 所有的 可用角色  符合
const RoleMappingSetting = ({
  available = [], // 可配角色
  assigned = [], // 用户拥有角色
  effective = [], // 有效角色
  add,
  remove
}) => {
  const [selectedKeys, setSelectedKeys] = useState([])
  const [targetKeys, setTargetKeys] = useState([])

  useEffect(() => {
    setTargetKeys(assigned.map(i => i.id))
  }, [assigned])

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
  }

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    console.log(nextTargetKeys)
    console.log(direction)
    const dataSource = [...available, ...assigned]
    switch (direction) {
      case 'left':
        if (remove) {
          remove(moveKeys)
        }
        break
      case 'right':
        if (add) {
          add(moveKeys)
        }
        break
      default:
        break
    }
    setTargetKeys(nextTargetKeys)
  }

  return (
    <Row gutter={[36]}>
      <Col>
        <Transfer
          dataSource={[...available, ...assigned].map(
            ({ id: key, name: title }) => ({
              key,
              title
            })
          )}
          titles={['可用角色', '分配的角色']}
          selectedKeys={selectedKeys}
          targetKeys={targetKeys}
          onSelectChange={onSelectChange}
          onChange={onChange}
          render={item => item.title}
        />
      </Col>
      <Col span={12}>
        <TransferList
          disabled={true}
          dataSource={effective.map(({ id: key, name: title }) => ({
            key,
            title
          }))}
          prefixCls='ant-transfer-list'
          itemUnit='项'
          direction={'left'}
          checkedKeys={effective.map(i => i.id)}
          titleText={'有效角色'}
          render={data => {
            return data.title
          }}
        ></TransferList>
      </Col>
    </Row>
  )
}

const RoleMapping = ({ id }) => {
  const clients = useClients()

  const [clientAssignedRole, setClientAssignedRole] = useState([])
  const [clientAvailabledRole, setClientAvailabledRole] = useState([])
  const [clientEffectiveRole, setclientEffectiveRole] = useState([])
  const [clientId, setClientId] = useState()

  const onClientChange = val => {
    setClientId(val)
    getClientAssignedRoleMapping(id, val).then(data => {
      setClientAssignedRole(data)
    })
    getClientAvailableRoleMapping(id, val).then(data => {
      setClientAvailabledRole(data)
    })
    getClientEffectiveRoleMapping(id, val).then(data => {
      setclientEffectiveRole(data)
    })
  }

  const onAddClientRoles = keys => {
    postClientRoleMapping(
      id,
      clientId,
      keys.map(i => ({ id: i }))
    )
  }
  const onRemoveClientRoles = keys => {
    deleteClientRoleMapping(
      id,
      clientId,
      keys.map(i => ({ id: i }))
    )
  }

  useEffect(() => {
    getRoleMapping(id).then(data => {
      console.log(data)
    })
  }, [id])

  return (
    <Form layout='horizontal' labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
      <Form.Item label='全局角色'>
        <Transfer
          dataSource={[]}
          titles={['可用角色', '分配的角色']}
          selectedKeys={[]}
          render={item => item.title}
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
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
  )
}

export default RoleMapping
