import axios from '../plugin/axios'

// 查询用户信息
export const getUsers = query => axios.get('users', { params: query })
// 查询单个用户信息
export const getUser = id => axios.get(`users/${id}`)
// 添加用户
export const postUser = user => axios.post('users', user)
// 修改用户
export const putUser = (id, user) => axios.put(`users/${id}`, user)
// 得用搜索条件的用户总数
export const getCount = query => axios.get('users/count', { params: query })
// 解锁用户
export const unLockUsers = _ =>
  axios.delete('attack-detection/brute-force/users')

export const deleteUser = id => axios.delete(`users/${id}`)

// 重置密码
export const resetPassword = (id, data) =>
  axios.put(`users/${id}/reset-password`, data)

// 域角色
export const getAssignedRoleMapping = id =>
  axios.get(`users/${id}/role-mappings/realm`)

// 有效 角色
export const getEffectiveRoleMapping = id =>
  axios.get(`users/${id}/role-mappings/realm/composite`)
// 可选择角色
export const getAvailableRoleMapping = id =>
  axios.get(`users/${id}/role-mappings/realm/available`)

// 删除用户角色
export const deleteRoleMapping = (id, data) =>
  axios.delete(`users/${id}/role-mappings/realm`, { data })

// 添加用户角色
export const postRoleMapping = (id, data) =>
  axios.post(`users/${id}/role-mappings/realm`, data)

// 获取用户在客户端下的可用角色
export const getClientAssignedRoleMapping = (id, clientId) =>
  axios.get(`users/${id}/role-mappings/clients/${clientId}`)

//   获取用户的有效角色
export const getClientEffectiveRoleMapping = (id, clientId) =>
  axios.get(`users/${id}/role-mappings/clients/${clientId}/composite`)

// 获取用户可激活角色
export const getClientAvailableRoleMapping = (id, clientId) =>
  axios.get(`users/${id}/role-mappings/clients/${clientId}/available`)

// 删除用户角色
export const deleteClientRoleMapping = (id, clientId, data) =>
  axios.delete(`users/${id}/role-mappings/clients/${clientId}`, { data })

// 添加用户角色
export const postClientRoleMapping = (id, clientId, data) =>
  axios.post(`users/${id}/role-mappings/clients/${clientId}`, data)

// 添加分组
export const putGroup = (id, groupId) =>
  axios.put(`users/${id}/groups/${groupId}`)
//删除用户分组
export const deleteGroup = (id, groupId) =>
  axios.delete(`users/${id}/groups/${groupId}`)
// 得到用户所在分组
export const getGroups = (id, query) =>
  axios.get(`users/${id}/groups`, { params: query })
// 得到用户组的数量
export const getGroupsCount = (id, query) =>
  axios.get(`users/${id}/groups/count`, { params: query })
