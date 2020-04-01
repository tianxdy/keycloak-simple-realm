import Keycloak from 'keycloak-js'

export const config = {
  url: 'https://oauth.ihelpedu.cn/auth',
  realm: 'test',
  clientId: 'security-admin-console'
}

const kec = new Keycloak(config)

export default kec
