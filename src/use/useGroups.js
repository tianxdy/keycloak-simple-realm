import { useState, useEffect } from 'react'

import { getGroups, getCount } from '../api/groups'

const useGroups = ({ first = 0, max = 20, search = undefined } = {}) => {
  const [groups, setGroups] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    getGroups({
      first,
      max,
      search
    }).then(data => {
      setGroups(data)
    })
  }, [first, max, search])

  useEffect(() => {
    getCount({ search, top: true }).then(data => {
      setCount(data.count)
    })
  }, [search])
  return { groups, count }
}

export default useGroups
