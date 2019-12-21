const Koa = require('koa')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const json = require('koa-json')
const logger = require('koa-logger')
const path = require('path')
const cors = require('koa2-cors')


const index = require('./routes/index')
const { check_token } = require('./utils/token')


const app = new Koa()

const schedule = require('./module/schedule')

schedule()
onerror(app)

//跨域配置
app.use(cors({
    origin: function (ctx) {
        return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
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