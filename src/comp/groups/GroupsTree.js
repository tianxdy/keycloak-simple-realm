import React, { useState } from 'react'
import { Card, Tree, Row, Col, Input, Button, Pagination } from 'antd'
import useGroups from '../../use/useGroups'
import { withRouter } from 'react-router-dom'

const { TreeNode } = Tree

const generateTree = (treeNodes = []) => {
  return treeNodes.map(({ subGroups, ...props }) => (
    <TreeNode {...props} key={props.id} title={props.name}>
      {generateTree(subGroups)}
    </TreeNode>
  ))
}

const GroupsTree = ({ history }) => {
  const [query, setQuery] = useState({
    first: 0,
    max: 20,
    search: undefined
  })

  const { groups, count } = useGroups(query)

  const [selectKey, setSelectKey] = useState()

  const onSearch = search => {
    const nSearch = search.trim()
    setQuery(s => ({
      ...s,
      first: 0,
      search: nSearch.length > 0 ? nSearch : undefined
    }))
  }

  const onSelectKey = selectKeys => {
    setSelectKey(selectKeys[0])
  }

  const onGroupsPageChange = page => {
    setQuery(({ search, max }) => ({
      max,
      search,
      first: (page - 1) * max
    }))
  }

  const hasSelectKeyNoRoot = () => {
    return !(selectKey && selectKey !== 'realm')
  }

  const onNew = _ => {
    history.push(`/groups/add/parent/${selectKey}`)
  }
  const onEdit = _ => {
    history.push(`/groups/${selectKey}`)
  }

  return (
    <Card>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row justify='space-between'>
            <Col span={6}>
              <Input.Search onSearch={onSearch} />
              <Button style={{ marginLeft: 16 }} />
            </Col>
            <Col span={6}>
              <Button onClick={onNew} disabled={!selectKey}>
                新建
              </Button>
              <Button
                disabled={hasSelectKeyNoRoot()}
                style={{ marginLeft: 16 }}
                onClick={onEdit}
              >
                修改
              </Button>
              <Button
                disabled={hasSelectKeyNoRoot()}
                style={{ marginLeft: 16 }}
              >
                剪切
              </Button>
              <Button
                disabled={hasSelectKeyNoRoot()}
                style={{ marginLeft: 16 }}
              >
                粘贴
              </Button>
              <Button
                disabled={hasSelectKeyNoRoot()}
                style={{ marginLeft: 16 }}
              >
                删除
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Tree defaultExpandAll selectable onSelect={onSelectKey}>
            <TreeNode key='realm' title='角色组'>
              {generateTree(groups)}
            </TreeNode>
          </Tree>
          <Pagination
            current={query.first / query.max + 1}
            showQuickJumper
            pageSize={query.max}
            total={count}
            onChange={onGroupsPageChange}
            size='small'
            style={{ marginTop: 16, float: 'right' }}
          />
        </Col>
      </Row>
    </Card>
  )
}

export default withRouter(GroupsTree)
