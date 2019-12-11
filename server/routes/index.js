const router = require('koa-router')()
// const upload = require('../utils/upload')
const controller = require('../controller')
router.get('/', async (ctx, next) => {
  ctx.body = 'Hello world!'
})

router.get('/api/code/getCode', controller.code.getCode)// 验证码获取
router.post('/api/user/register', controller.user.register)// 注册
router.post('/api/user/login', controller.user.login)// 登陆




module.exports = router