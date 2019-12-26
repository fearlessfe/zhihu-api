const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({ prefix: '/question/:questionId/answer' })
const { 
  find,
  findById,
  update,
  create,
  delete: del,
  checkAnswerExist,
  checkAnswerer
}  = require('../controllers/answer')
const { secret } = require('../config')

const auth = jwt({ secret })

router.get('/', find)

router.get('/:id', checkAnswerExist, findById)

router.post('/', auth, create)

router.patch('/:id', auth, checkAnswerExist, checkAnswerer, update)

router.delete('/:id', auth, checkAnswerExist, checkAnswerer, del)

module.exports = router;