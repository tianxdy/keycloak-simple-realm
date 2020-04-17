import React from 'react'
import { Row, PageHeader, Form, Input, Col, Button, message } from 'antd'
import { withRouter } from 'react-router-dom'
import { postGroup, postChidrenGroups } from '../../api/groups'
const Add = ({
  match: {
    params: { id = '' }
  },
  history
}) => {
  console.log(id)
  const onFinish = values => {
    if (id === 'realm') {
      postGroup(values).then(({ locationId }) => {
        message.success('添加成功')
        history.push(`/groups/${locationId}`)
      })
    } else {
      postChidrenGroups(id, values).then(({ id }) => {
        message.success('添加成功')
        history.push(`/groups/${id}`)
      })
    }
  }

  return (
    <Row>
      <Col span={24}>
        <PageHeader title='创建角色组' />
      </Col>
      <Col offset={4} span={8}>
        <Form
          wrapperCol={{ span: 20 }}
          labelCol={{ offset: 4 }}
          onFinish={onFinish}
        >
          <Form.Item
            name='name'
            label='名称'
            rules={[{ required: true, message: '请输入组名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 7 }}>
            <Button htmlType='submit'>保存</Button>
            <Button
              onClick={_ => {
                history.goBack()
              }}
              style={{ marginLeft: 16 }}
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default withRouter(Add)
