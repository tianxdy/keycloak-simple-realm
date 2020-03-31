import Keycloak from 'keycloak-js'

export const config = {
  url: 'https://oauth.ihelpedu.cn/auth',
  realm: 'test',
  clientId: 'sys'
}

const kec = new Keycloak(config)

export default kec
