'use strict';

const express = require('express'),
      session = require('express-session'),
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      path = require('path'),
      routes = require('./app/routes/routes')

const app = express()
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/app/views'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('app/public'))
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}))
app.use('/',routes())

//mongoose.set('useFindAndModify', false)
mongoose.connect('mongodb+srv://boxranking:brdkoppo@boxranking-cluster-1cmvm.gcp.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
//mongoose.connect('mongodb://localhost/myDB', { useNewUrlParser: true })

app.listen(8080, () => {
  console.log(`App listening on port 8080`)
  console.log('Press Ctrl+C to quit.')
})