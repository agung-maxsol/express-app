const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const bodyParser = require('body-parser')
const cookieSession = require('cookie-session')

//--- Components collection
const site = require('./components/site')
const test = require('./components/test')
//--- Components collection

//--- Init app
const app = express()
//--- Init app

//--- App configuration
app.set('trust proxy', 1)
app.disable('x-powered-by')
//--- App configuration

//--- App middlewares
app.use(helmet())
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({
  name: 'expr_session',
  keys: ['expr_secret'],
  cookie: {
    secure: false,
    httpOnly: true,
    domain: null,
    path: '/',
    expires: new Date(Date.now() + 60 * 60 * 1000) // 1 Hour
  }
}))
//--- App middlewares

//--- Routes collection
app.get('/', site.index)
app.get('/error', site.error)
app.get('/favicon.ico', site.favicon)
app.use('/test', test) // Route group example
//--- Routes collection

//--- Error handler
app.use(site.notFoundHandler)
app.use(site.errorHandler)
//--- Error handler

app.listen(3000, () => console.log('App listening on port 3000!'))
