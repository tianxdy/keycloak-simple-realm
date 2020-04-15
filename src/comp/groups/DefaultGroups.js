import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Button, Tree } from 'antd'
import { getDefaultGroups } from '../../api/groups'
import useGroups from '../../use/useGroups'
const DefaultGroups = () => {
  const [defaultGroups, setDefaultGroups] = useState([])

  const { groups, count } = useGroups()

  const loadTreeData = defaultGroups =>
    defaultGroups.map(({ id, name, path }) => ({ key: id, title: path }))

  useEffect(() => {
    getDefaultGroups().then(data => {
      setDefaultGroups(data)
    })
  }, [])

  return (
    <Card>
      <Row gutter={[24, 24]}>
        <Col span={6} offset={4}>
          <Card
            title='默认角色组'
            extra={
              <Button
                onClick={_ => {
                  console.log(123)
                }}
              >
                移除
              </Button>
            }
          >
            <Tree treeData={loadTreeData(defaultGroups)} />
          </Card>
        </Col>
        <Col span={6}>
          <Card title=''></Card>
        </Col>
      </Row>
    </Card>
  )
}

export default DefaultGroups
