const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({ prefix: '/question' })
const { 
  find,
  findById,
  update,
  create,
  delete: del,
  checkQuestionExist,
  checkQuestioner
}  = require('../controllers/question')
const { secret } = require('../config')

// 自己实现的鉴权中间价
// const auth = async(ctx, next) => {
//   const { authorization = '' } = ctx.request.header;
//   const token = authorization.replace('Bearer ', '');
//   try {
//     const user = jwt.verify(token, secret);
//     ctx.state.user = user;
//   } catch (error) {
//     ctx.throw(401, error.message)
//   }
//   await next()
// }

const auth = jwt({ secret })

router.get('/', find)

router.get('/:id', checkQuestionExist, findById)

router.post('/', auth, create)

router.patch('/:id', auth, checkQuestionExist, checkQuestioner, update)

router.delete('/:id', auth, checkQuestionExist, checkQuestioner, del)

module.exports = router;