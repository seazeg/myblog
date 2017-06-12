const fs = require('fs')
const path = require('path')
const express = require('express')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const db = require('./db')
const resolve = file => path.resolve(__dirname, file)
const api = require('./api')
const app = express()

// const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

app.set('port', (process.env.port || 3000));
// app.use(express.compress());
app.use(favicon(resolve('../dist/favicon.ico')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cookieParser("sessionuser"));
app.use(session({
  name: 'usertoken',
  secret: 'sessionuser',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 6
  },
}));
app.use('/dist', express.static(resolve('../dist')))
app.use(api)



app.get('*', function (req, res) {
  const fileName = 'index.html'
  const html = fs.readFileSync(resolve('../' + fileName), 'utf-8')
  res.send(html)
})

app.listen(app.get('port'), function () {
  console.log('Visit http://localhost:' + app.get('port'))
})