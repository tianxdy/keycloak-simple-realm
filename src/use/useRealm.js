import { useState, useEffect } from 'react'
import { getRealm } from '../api/realms'

import { config } from '../plugin/keycloak'

const useRealm = () => {
  const [realm, setRealm] = useState({})

  useEffect(() => {
    getRealm(config.realm).then(data => {
      setRealm(data)
    })
  }, [])
  // 只第一次使用

  return realm
}

export default useRealm
