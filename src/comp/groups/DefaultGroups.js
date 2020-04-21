import React, { useEffect, useState, useCallback } from 'react'
import { Card, Row, Col, Button, Tree, message } from 'antd'
import {
  getDefaultGroups,
  putDefaultGroup,
  deleteDefaultGroup
} from '../../api/groups'

import RealmGroupsTree from '../common/RealmGroupsTree'

const DefaultGroups = () => {
  const [defaultGroups, setDefaultGroups] = useState([])

  const [removeKey, setRemoveKey] = useState()

  const onSelect = selectKeys => {
    setRemoveKey(selectKeys[0])
  }

  const onRemove = () => {
    if (removeKey) {
      deleteDefaultGroup(removeKey).then(_ => {
        loadDefaultGroups()
        message.success('删除角色组成功')
      })
    } else {
      message.warn('请选择要移除的角色组')
    }
  }

  const loadTreeData = defaultGroups =>
    defaultGroups.map(({ id, name, path }) => ({ key: id, title: path }))

  const loadDefaultGroups = useCallback(() => {
    getDefaultGroups().then(data => {
      setDefaultGroups(data)
    })
  }, [])

  useEffect(() => {
    loadDefaultGroups()
  }, [loadDefaultGroups])

  const onJoin = val => {
    if (val) {
      putDefaultGroup(val).then(_ => {
        loadDefaultGroups()
        message.success('加入成功')
      })
    } else {
      message.warn('请选择角色组')
    }
  }

  return (
    <Card>
      <Row gutter={[24, 24]}>
        <Col span={6} offset={4}>
          <Card
            title='默认角色组'
            extra={<Button onClick={onRemove}>移除</Button>}
          >
            <Tree
              onSelect={onSelect}
              blockNode
              height={500}
              treeData={loadTreeData(defaultGroups)}
            />
          </Card>
        </Col>
        <Col span={6}>
          <RealmGroupsTree join={onJoin} />
        </Col>
      </Row>
    </Card>
  )
}

export default DefaultGroups
