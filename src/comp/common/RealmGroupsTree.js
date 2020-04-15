import React, { useState } from 'react'
import { Row, Col, Tree, Card, Tooltip, Button, Pagination, Input } from 'antd'

import useGroups from '../../use/useGroups'

import { QuestionCircleOutlined } from '@ant-design/icons'

const { TreeNode } = Tree

const generateTree = (treeNodes = [], checkKeys = []) => {
  return treeNodes.map(({ subGroups, ...props }) => (
    <TreeNode
      {...props}
      disabled={checkKeys.includes(props.name)}
      key={props.id}
      title={props.name}
    >
      {generateTree(subGroups, checkKeys)}
    </TreeNode>
  ))
}

const RealmGroupsTree = ({ join, checkKeys = [] } = {}) => {
  const [availableGroupsQuery, setAvailableGroupsQuery] = useState({
    first: 0,
    max: 20,
    search: undefined
  })

  const { groups, count } = useGroups(availableGroupsQuery)

  const [currectAvailableSelectKey, setCurrectAvailableSelectKey] = useState()

  const onAvilableGroupSearch = search => {
    const nSearch = search.trim()
    setAvailableGroupsQuery(s => ({
      ...s,
      first: 0,
      search: nSearch.length > 0 ? nSearch : undefined
    }))
  }

  const onAvailableGroupsPageChange = page => {
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
    if (join) {
      join(currectAvailableSelectKey)
      setCurrectAvailableSelectKey(undefined)
    }
  }

  return (
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
        {generateTree(groups, checkKeys)}
      </Tree>
      <Pagination
        current={availableGroupsQuery.first / availableGroupsQuery.max + 1}
        showQuickJumper
        pageSize={availableGroupsQuery.max}
        total={count}
        onChange={onAvailableGroupsPageChange}
        size='small'
        style={{ marginTop: 16, float: 'right' }}
      />
    </Card>
  )
}

export default RealmGroupsTree
