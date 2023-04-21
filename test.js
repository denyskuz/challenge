const tape = require('tape')
const jsonist = require('jsonist')

const PORT = process.env.PORT = process.env.PORT || require('get-PORT-sync')()
const server = require('./server')

const urlBase = `http://localhost:${PORT}`

tape('should respond hello', (t) => {
  jsonist.get(urlBase, (err, body) => {
    if (err) t.error(err)

    t.equal(body.msg, 'hello')
    t.end()
  })
})

tape('should respond b64', (t) => {
  jsonist.get(`${urlBase}/b64/hello`, (err, body) => {
    if (err) t.error(err)
    t.equal(body.b64, 'aGVsbG8=')
    t.end()
  })
})
tape('should respond user-agent', (t) => {
  const options = { headers: { 'User-Agent': 'test' } };

  jsonist.get(`${urlBase}/user-agent`, options, (err, body) => {
    if (err) t.error(err)
    t.equal(body.userAgent, 'test')
    t.end()
  })
})

tape('cleanup', function (t) {
  server.close()
  t.end()
})
