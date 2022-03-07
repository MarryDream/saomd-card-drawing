// const crypto = require('crypto')
const date = new Date().toUTCString()

const key = 'marrydream'
const secret = 'K0VsCWK0rGA8ta7CdqOUWl8m2tF7u8Pf'

export default function getAuth(method: string, uri: string, policy = null, md5 = null) {
  const elems: string[] = []
  const paramsList = [method, uri, date, policy, md5]
  paramsList.forEach(item => {
    if (item != null) {
      elems.push(item)
    }
  })
  let value = elems.join('&')
  let auth = hmacsha1(MD5(secret), value)
  return `UPYUN ${key}:${auth}`
}
// function MD5(value: string) {
//   return crypto
//     .createHash('md5')
//     .update(value)
//     .digest('hex')
// }
// function hmacsha1(secret: string, value: string) {
//   return crypto
//     .createHmac('sha1', secret)
//     .update(value, 'utf8')
//     .digest()
//     .toString('base64')
// }

function MD5(value: string) {
  return ''
}

function hmacsha1(secret: string, value: string) {
  return ''
}

