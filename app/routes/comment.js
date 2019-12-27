const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({ prefix: '/question/:questionId/answer/:answerId/comments' })
const { 
  find,
  findById,
  update,
  create,
  delete: del,
  checkCommentExist,
  checkCommentator
}  = require('../controllers/comment')
const { secret } = require('../config')

const auth = jwt({ secret })

router.get('/', find)

router.get('/:id', checkCommentExist, findById)

router.post('/', auth, create)

router.patch('/:id', auth, checkCommentExist, checkCommentator, update)

router.delete('/:id', auth, checkCommentExist, checkCommentator, del)

module.exports = router;