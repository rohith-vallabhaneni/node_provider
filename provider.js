const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


const server = express()
server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({
  extended: true
}))
server.use((req, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  next()
})

server.all('/.well-known/live|ready', (req, res) => {
  res.status(204)
  res.end()
})

server.get('/user', (req, res) => {
  res.json({
    id: 1,
    name: 'John'
  })
})
 
 module.exports = {
  server
 }

