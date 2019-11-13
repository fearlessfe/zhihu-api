const jwt = require('jsonwebtoken')
const Router = require('koa-router')
const router = new Router({ prefix: '/user' })
const { 
  findAll,
  findById,
  create,
  update,
  delete: del,
  login,
  checkOwner
}  = require('../controllers/user')
const { secret } = require('../config')

const auth = async(ctx, next) => {
  const { authorization = '' } = ctx.request.header;
  const token = authorization.replace('Bearer ', '');
  try {
    const user = jwt.verify(token, secret);
    ctx.state.user = user;
  } catch (error) {
    ctx.throw(401, error.message)
  }
  await next()
}

router.get('/', auth, findAll)

router.get('/:id', auth, findById)

router.post('/', create)

router.patch('/:id', auth, checkOwner, update)

router.delete('/:id', auth, checkOwner, del)

router.post('/login', login)

module.exports = router;