const Koa = require('koa')
const bodyparser = require('koa-bodyparser')   // 解析post请求体内容
const error = require('koa-json-error')  // 错误处理
const parameter = require('koa-parameter')
const mongoose = require('mongoose')
const { connectionStr } = require('./config')
const routing = require('./routes')

mongoose.connect(connectionStr, { useUnifiedTopology: true }, () => {
  console.log('MongoDB 连接成功了')
})
mongoose.connection.on('error', console.error)

const app = new Koa()

app.use(error({
  postFormat: (e, {stack, ...rest}) => process.env.NODE_ENV === 'production' ? rest : {...rest, stack}
}))

app.use(bodyparser())
app.use(parameter(app))
routing(app)

app.listen(3000, () => console.log('程序启动成功！'));