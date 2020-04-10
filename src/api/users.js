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

// 获取域角色
export const getRoleMapping = id => axios.get(`users/${id}/role-mappings/realm`)

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
  axios.delete(`users/${id}/role-mappings/clients/${clientId}`, data)

// 添加用户角色
export const postClientRoleMapping = (id, clientId, data) =>
  axios.post(`users/${id}/role-mappings/clients/${clientId}`, data)
