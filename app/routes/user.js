const jwt = require('koa-jwt')
const Router = require('koa-router')
const router = new Router({ prefix: '/user' })
const { 
  findAll,
  findById,
  create,
  update,
  delete: del,
  login,
  checkOwner,
  checkUserExist,
  listFollowers,
  listFollowing,
  follow,
  unfollow,
  listFollowingTopic,
  followTopic,
  unfollowTopic,
  listQuestions
}  = require('../controllers/user')
const { checkTopicExist } = require('../controllers/topic')
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

router.get('/', auth, findAll)

router.get('/:id', auth, findById)

router.post('/', create)

router.patch('/:id', auth, checkOwner, update)

router.delete('/:id', auth, checkOwner, del)

router.post('/login', login)

router.get('/:id/followers', listFollowers)

router.get('/:id/following', listFollowing);

router.put('/following/:id', auth, checkUserExist, follow);

router.delete('/unfollowing/:id', auth, checkUserExist, unfollow);

router.get('/:id/followingTopic', listFollowingTopic);

router.put('/followingTopic/:id', auth, checkTopicExist, followTopic);

router.delete('/unfollowingTopic/:id', auth, checkTopicExist, unfollowTopic);

router.get('/:id/questions', listQuestions);

module.exports = router;