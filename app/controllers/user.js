const db = [{name: '李雷'}]

class UserController {
  findAll(ctx) {
    ctx.body = db
  }
  findById(ctx) {
    ctx.body = db[+ctx.params.id]
  }
  create(ctx) {
    db.push(ctx.request.body)
    ctx.body = ctx.request.body
  }
  update(ctx) {
    db[+ctx.params.id] = ctx.request.body
    ctx.body = ctx.request.body
  }
  delete(ctx) {
    let index = +ctx.params.id
    db.splice(index, 1)
    ctx.status = 204
  }
}

module.exports = new UserController()