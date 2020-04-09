import React from 'react'
import { Form, Input, Switch, Button, message } from 'antd'

import { resetPassword } from '../../api/users'

const Cred = ({ id }) => {
  const onFinish = ({ password, temporary }) => {
    if (id) {
      console.log(temporary)
      resetPassword(id, {
        type: 'password',
        value: password,
        temporary: temporary
      }).then(_ => {
        message.success('重置密码成功')
      })
    }
  }
  return (
    <Form
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 12 }}
      layout='horizontal'
      initialValues={{ temporary: false }}
    >
      <Form.Item
        name='password'
        label='密码'
        rules={[{ required: true, message: '必填' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name='restPassword'
        label='重置密码'
        dependencies={['password']}
        rules={[
          { required: true, message: '必填' },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject('两次密码不匹配')
            }
          })
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name='temporary'
        valuePropName='checked'
        label='下次登陆更新密码'
      >
        <Switch />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button htmlType='submit'>重置密码</Button>
      </Form.Item>
    </Form>
  )
}

export default Cred
