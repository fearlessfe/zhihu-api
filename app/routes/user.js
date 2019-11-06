const Router = require('koa-router')
const router = new Router({ prefix: '/user' })
const { findAll, findById, create, update, delete: del}  = require('../controllers/user')

router.get('/', findAll)

router.get('/:id', findById)

router.post('/', create)

router.put('/:id', update)

router.delete('/:id', del)

module.exports = router;