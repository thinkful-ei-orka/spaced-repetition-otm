import jwt from 'jsonwebtoken'

export function makeLoginToken() {
  const loginUser = {
    user_id: 1,
    name: 'Dunder Mifflin Admin',
  }
  return jwt.sign(loginUser, 'spaced-rep-secret', {
    subject: 'admin',
    expiresIn: '2m',
    algorithm: 'HS256',
  })
}
