import axios from '../plugin/axios'

export const getGroups = query => axios.get('groups', { params: query })

// 获取数量
export const getCount = query => axios.get('groups/count', { params: query })

export const getDefaultGroups = _ => axios.get('default-groups')
