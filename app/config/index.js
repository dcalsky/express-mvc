const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  port: 4000,
  db: {
    name: 'demo',
    user: 'dcalsky',
    password: 'secret'
  },
  role: {
    admin: 2,
    normal: 1
  },
  header: {
    'Access-Control-Allow-Origin': isProduction ? 'noddl.me' : '*'
  },
  token: {
    secret: 'secret',
    expired: '1d'
  },
  errCode: {
    1000: 'USER_NOT_EXISTED',
    1001: 'WRONG_PASSWORD',
    1002: 'PERMISSION_DENIED'
  }
}
