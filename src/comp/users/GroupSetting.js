import React, { useState, useEffect } from 'react'
import {
  Row,
  Col,
  Tree,
  Card,
  Tooltip,
  Button,
  Pagination,
  Input,
  message
} from 'antd'

import useGroups from '../../use/useGroups'
import { getGroups, getGroupsCount } from '../../api/users'

import { QuestionCircleOutlined } from '@ant-design/icons'

import { putGroup } from '../../api/users'

const { TreeNode } = Tree

const generateTree = (treeNodes = [], checkedKeys = []) => {
  return treeNodes.map(({ subGroups, ...props }) => (
    <TreeNode
      {...props}
      disabled={checkedKeys.includes(props.id)}
      key={props.id}
      title={props.name}
    >
      {generateTree(subGroups, checkedKeys)}
    </TreeNode>
  ))
}

const GroupSetting = ({ id } = {}) => {
  const [availableGroupsQuery, setAvailableGroupsQuery] = useState({
    first: 0,
    max: 20,
    search: undefined
  })

  const { groups, count } = useGroups(availableGroupsQuery)

  const [userGroups, setUserGroups] = useState([])

  const [currectAvailableSelectKey, setCurrectAvailableSelectKey] = useState()

  useEffect(() => {
    getGroups(id).then(data => {
      setUserGroups(data)
    })
  }, [id, setUserGroups])

  const onAvilableGroupSearch = search => {
    const nSearch = search.trim()
    setAvailableGroupsQuery(s => ({
      ...s,
      first: 0,
      search: nSearch.length > 0 ? nSearch : undefined
    }))
  }

  const onAvailableGroupsPageChange = (page, pageSize) => {
    setAvailableGroupsQuery(({ search, max }) => ({
      max,
      search,
      first: (page - 1) * max
    }))
  }

  const onAvailableGroupsSelect = selectKeys => {
    setCurrectAvailableSelectKey(selectKeys[0])
  }

  const onJoin = _ => {
    if (currectAvailableSelectKey) {
      putGroup(id, currectAvailableSelectKey).then(_ => {
        message.success('加入成功')
      })
    }
  }

  return (
    <Row gutter={[12]}>
      <Col offset={4} span={6}>
        <Card title='所在角色组' extra={<Button>离开</Button>}>
          <Input.Search
            style={{ marginBottom: 8 }}
            onSearch={onAvilableGroupSearch}
          />
          <Tree
            height={500}
            defaultExpandAll={true}
            selectable={true}
            blockNode
          >
            {generateTree(userGroups)}
          </Tree>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          title={
            <div>
              可用角色组
              <Tooltip
                placement='topLeft'
                title='子组拥有父组的所有属性设置子组会继承父组的所有属性'
                arrowPointAtCenter
              >
                <QuestionCircleOutlined style={{ marginLeft: 12 }} />
              </Tooltip>
            </div>
          }
          extra={<Button onClick={onJoin}>加入</Button>}
        >
          <Input.Search
            style={{ marginBottom: 8 }}
            onSearch={onAvilableGroupSearch}
          />
          <Tree
            height={500}
            defaultExpandAll={true}
            selectable={true}
            blockNode
            onSelect={onAvailableGroupsSelect}
          >
            {generateTree(groups)}
          </Tree>
          <Pagination
            showQuickJumper
            pageSize={availableGroupsQuery.max}
            total={count}
            onChange={onAvailableGroupsPageChange}
            size='small'
            style={{ marginTop: 16, float: 'right' }}
          />
        </Card>
      </Col>
    </Row>
  )
}

export default GroupSetting
