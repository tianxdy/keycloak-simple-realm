import { useState, useEffect } from 'react'
import { getRequiredActions } from '../api/authentication'

const useRequiredActions = () => {
  const [requiredActions, setRequiredActions] = useState([])

  useEffect(() => {
    getRequiredActions().then(data => {
      setRequiredActions(data.filter(i => i.enabled))
    })
  }, [])
  // 只第一次使用

  return requiredActions
}

export default useRequiredActions
