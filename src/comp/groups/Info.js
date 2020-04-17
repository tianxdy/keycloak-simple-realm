import React, { useEffect, useState } from 'react'
import { PageHeader, Tabs, Card, Form, Input, Button } from 'antd'
import { getGroup } from '../../api/groups'

const { TabPane } = Tabs

const Info = ({ id = '' } = {}) => {
  const [currentGroup, setCurrentGroup] = useState({})

  useEffect(() => {
    getGroup(id).then(data => {
      setCurrentGroup(data)
    })
  }, [id])

  return (
    <div>
      <PageHeader title='hh' />
      <Tabs type='card' defaultActiveKey='1'>
        <TabPane tab='设置' key='1'>
          <Card>
            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 8 }}>
              <Form.Item
                name='name'
                label='名称'
                rules={[{ required: true, message: '必填' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 5 }}>
                <Button htmlType='submit' type='primary'>
                  保存
                </Button>
                <Button style={{ marginLeft: 16 }}>取消</Button>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
        <TabPane tab='角色映射' key='2'>
          <Card>2</Card>
        </TabPane>
        <TabPane tab='Tab 3' key='3'>
          <Card>3</Card>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Info
