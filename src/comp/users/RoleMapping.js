import React, { useEffect, useState, useCallback } from 'react'
import {
  getAssignedRoleMapping,
  getEffectiveRoleMapping,
  deleteRoleMapping,
  postRoleMapping,
  getClientAssignedRoleMapping,
  getClientAvailableRoleMapping,
  getClientEffectiveRoleMapping,
  deleteClientRoleMapping,
  postClientRoleMapping,
  getAvailableRoleMapping
} from '../../api/users'
import RoleMappingSetting from '../common/RoleMappingSetting'
import { Row, Col, Form, Select, message } from 'antd'

import useClients from '../../use/useClients'

const { Option } = Select

const RoleMapping = ({ id }) => {
  const clients = useClients()

  const [assignedRole, setAssignedRole] = useState([])
  const [availabledRole, setAvailabledRole] = useState([])
  const [effectiveRole, setEffectiveRole] = useState([])

  const [clientAssignedRole, setClientAssignedRole] = useState([])
  const [clientAvailabledRole, setClientAvailabledRole] = useState([])
  const [clientEffectiveRole, setclientEffectiveRole] = useState([])

  const [clientId, setClientId] = useState()

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

  return (
    <Form layout='horizontal' labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
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
