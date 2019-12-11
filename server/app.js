const Koa = require('koa')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const json = require('koa-json')
const logger = require('koa-logger')
const path = require('path')

const index = require('./routes/index')
const { check_token } = require('./utils/token')


const app = new Koa()

onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(check_token)
app.use(json())
app.use(logger())


// routes
app.use(index.routes(), index.allowedMethods())

module.exports = app