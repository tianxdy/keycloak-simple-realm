import React, { useEffect, useState } from 'react'

import { Transfer, Row, Col } from 'antd'

import TransferList from 'antd/lib/transfer/list'

// 所有的 可用角色  符合
const RoleMappingSetting = ({
  available = [], // 可配角色
  assigned = [], // 用户拥有角色
  effective = [], // 有效角色
  add,
  remove
} = {}) => {
  const [dataSource, setDatasource] = useState([...available, ...assigned])
  const [selectedKeys, setSelectedKeys] = useState([])
  const [targetKeys, setTargetKeys] = useState([])

  useEffect(() => {
    setDatasource([...available, ...assigned])
    setTargetKeys(_ => assigned.map(i => i.id))
  }, [assigned, available])

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
  }

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    switch (direction) {
      case 'left':
        if (remove) {
          remove(assigned.filter(i => moveKeys.includes(i.id)))
        }
        break
      case 'right':
        if (add) {
          add(available.filter(i => moveKeys.includes(i.id)))
        }
        break
      default:
        break
    }
  }

  return (
    <Row gutter={[36]}>
      <Col>
        <Transfer
          dataSource={dataSource.map(({ id: key, name: title }) => ({
            key,
            title
          }))}
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

export default RoleMappingSetting
