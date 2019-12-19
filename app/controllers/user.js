const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { secret } = require('../config')

class UserController {
  async findAll(ctx) {
    ctx.body = await User.find();
  }
  async findById(ctx) {
    const { fields } = ctx.query;
    let selectFields;
    if (fields) {
      selectFields = fields.split(';').filter(f => f).map(f => ' +' + f).join('');
    }
    const user = await User.findById(ctx.params.id).select(selectFields);
    if (!user) ctx.throw(404, '用户不存在')
    ctx.body = user;
  }
  async create(ctx) {
    ctx.verifyParams({
      name: {type: 'string', required: true},
      password: {type: 'string', required: true}
    })
    const { name } = ctx.request.body;
    const repeatedUser = await User.findOne({name})
    if (repeatedUser) {ctx.throw(409, '用户已经存在')}
    const user = await new User(ctx.request.body).save()
    delete user.password
    delete user._v
    ctx.body = user
  }
  async checkOwner(ctx, next) {
    if(ctx.params.id !== ctx.state.user._id) {ctx.throw(403, '没有权限')}
    await next()
  }
  async update(ctx) {
    ctx.verifyParams({
      name: {type: 'string', required: false},
      password: {type: 'string', required: false},
      avatar_url: {type: 'string', required: false},
      gender: {type: 'string', required: false},
      headline: {type: 'string', required: false},
      locations: {type: 'array', itemType: 'string', required: false},
      business: {type: 'string', required: false},
      employments: {type: 'array', itemType: 'object', required: false},
      educations: {type: 'array', itemType: 'object', required: false},
    })
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!user) ctx.throw(404, '用户不存在')
    ctx.body = user
  }
  async delete(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id)
    if (!user) ctx.throw(404, '用户不存在')
    ctx.status = 204
  }
  async login(ctx) {
    ctx.verifyParams({
      name: {type: 'string', required: true},
      password: {type: 'string', required: true}
    })
    const user = await User.findOne(ctx.request.body);
    if(!user) {ctx.throw(401, '用户名和密码不正确')}
    const {_id, name} = user;
    const token = jwt.sign({_id, name}, secret, {expiresIn: '1d'});
    ctx.body = {token}
  }
  async checkUserExist(ctx, next) {
    const user = await User.findById(ctx.params.id);
    if(!user){
      ctx.throw(404, '用户不存在');
    }
    await next();
  }
  async listFollowers(ctx) {
    const users = await User.find({ following: ctx.params.id })
    ctx.body = users;
  }
  async listFollowing(ctx) {
    const user = await User.findById(ctx.params.id).select('+following').populate('following');
    if(!user) {
      ctx.throw(404);
    }
    ctx.body = user.following;
  }
  async follow(ctx){
    const me = await User.findById(ctx.state.user._id).select('+following')
    // mogodb中自带的id无法直接与字符串做比较，需要先转为字符串
    if(!me.following.map(id => id.toString()).includes(ctx.params.id)){
      me.following.push(ctx.params.id);
      me.save();
    }
    ctx.status = 204;
  }
  async unfollow(ctx){
    const me = await User.findById(ctx.state.user._id).select('+following')
    const index = me.following.map(id => id.toString()).indexOf(ctx.params.id)
    // mogodb中自带的id无法直接与字符串做比较，需要先转为字符串
    if(index > -1){
      me.following.splice(index, 1);
      me.save();
    }
    ctx.status = 204;
  }
}

module.exports = new UserController()