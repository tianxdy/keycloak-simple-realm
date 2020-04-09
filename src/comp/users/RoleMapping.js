import React, { useEffect, useState } from 'react'
import { getRoleMapping, getClientAssignedRoleMapping } from '../../api/users'

import { Transfer, Row, Col, Form, Select } from 'antd'

import useClients from '../../use/useClients'

const { Option } = Select

// 所有的 可用角色  符合
const RoleMappingSetting = ({
  available = [], // 可配角色
  assigned = [], // 用户拥有角色
  effective = [] // 真实角色
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
    setTargetKeys(nextTargetKeys)
  }

  return (
    <div>
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
    </div>
  )
}

const RoleMapping = ({ id }) => {
  const clients = useClients()

  const [clientAssignedRole, setClientAssignedRole] = useState([])

  const onClientChange = val => {
    getClientAssignedRoleMapping(id, val).then(data => {
      setClientAssignedRole(data)
    })
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
            <RoleMappingSetting assigned={clientAssignedRole} />
          </Col>
        </Row>
      </Form.Item>
    </Form>
  )
}

export default RoleMapping
