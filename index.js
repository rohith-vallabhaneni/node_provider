const server = require('./provider.js').server
const PORT = process.env.DRP_CF_HTTP_PORT || 8080

server.listen(PORT, () => {
  console.log('Provider Service listening on http://localhost:'+ PORT)
})