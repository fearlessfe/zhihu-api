const Koa = require('koa')
const bodyparser = require('koa-bodyparser')   // 解析post请求体内容
const error = require('koa-json-error')  // 错误处理
const parameter = require('koa-parameter')

const routing = require('./routes')

const app = new Koa()

app.use(error({
  postFormat: (e, {stack, ...rest}) => process.env.NODE_ENV === 'production' ? rest : {...rest, stack}
}))

app.use(bodyparser())
app.use(parameter(app))
routing(app)

app.listen(3000, () => console.log('程序启动成功！'));