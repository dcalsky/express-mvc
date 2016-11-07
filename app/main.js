const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const unless = require('express-unless')
const config = require('./config')
const routes = require('./routes')
const nunjucks = require('nunjucks')

let app = express()

nunjucks.configure(path.join(__dirname, 'templates'), {
  autoescape: true,
  express: app,
})

app.set('view engine', 'njk') // Set template engine
app.use(logger('dev'))
app.use(express.static(path.resolve('./dist')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

// CORS
const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', config.header['Access-Control-Allow-Origin']);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next()
}
app.use(allowCrossDomain)

// Routing
app.use('/', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Page Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
// todo: Not found page
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err,
    })
    next()
  })
}

// production error handler
// no stacktraces leaked to user
// todo: Error page
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  next()
  /* res.render('error', {
   message: err.message,
   error: {}
   }); */
  res.send()
})

module.exports = app
