const http = require('http')

const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  if (req.url === '/') return respondHello(req, res)
  if (req.url.match(/^\/b64\//)) return respondBase64(req, res)
  if (req.url === '/user-agent') return respondUserAgent(req, res)

  res.end()
})

function respondHello (req, res) {
  res.end(JSON.stringify({ msg: 'hello' }))
}

function respondBase64 (req, res) {
  const response = req.url.replace(/^\/b64\//, '')
  res.end(JSON.stringify({
    b64: Buffer.from(response).toString('base64')
  }))
}

function respondUserAgent (req, res) {
  const userAgent = req.headers['user-agent'];
  
  res.end(JSON.stringify({
    userAgent
  }))
}
server.listen(PORT)
console.log(`Server listening on port ${PORT}`)

if (require.main !== module) module.exports = server
