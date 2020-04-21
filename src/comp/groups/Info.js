import React, { useEffect, useState } from 'react'
import { PageHeader, Tabs, Card, Form, Input, Button, message } from 'antd'
import { getGroup, putGroup } from '../../api/groups'

const { TabPane } = Tabs

const Info = ({ id = '' } = {}) => {
  const [currentGroup, setCurrentGroup] = useState({})

  const [form] = Form.useForm()

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

  return (
    <div>
      <PageHeader title={currentGroup.name} />
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
