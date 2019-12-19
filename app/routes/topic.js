const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({ prefix: '/topic' })
const { 
  find,
  findById,
  create,
  update,
  listTopicFollowers,
  checkTopicExist
}  = require('../controllers/topic')
const { secret } = require('../config')


const auth = jwt({ secret })

router.get('/', find)

router.get('/:id', checkTopicExist, findById)

router.post('/', auth, create)

router.patch('/:id', auth, checkTopicExist, update)

router.get('/:id/followerTopic', checkTopicExist, listTopicFollowers)

module.exports = router;