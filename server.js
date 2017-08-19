'use strict'

const express = require('express')
const app = express()
const requestHeaderParser = require('./lib/requestHeaderParser.js')

app.use('/public', express.static(process.cwd() + '/public'))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

// Request Header Parser
app.get('/api/who-are-you', function (req, res) {
  res.send(requestHeaderParser.whoAreYou(req.headers))
})

// Respond not found to all the wrong routes
app.use(function (req, res, next) {
  res.status(404)
  res.type('txt').send('Not found')
})

// Error Middleware
app.use(function (err, req, res, next) {
  if (err) {
    res.status(err.status || 500)
      .type('txt')
      .send(err.message || 'SERVER ERROR')
  }
})

app.listen(process.env.PORT, function () {
  console.log('Node.js listening on port ' + process.env.PORT)
})
