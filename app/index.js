const Koa = require('koa')
const koaBody = require('koa-body')   // 解析post请求体内容
const error = require('koa-json-error')  // 错误处理
const parameter = require('koa-parameter')
const path = require('path')
const mongoose = require('mongoose')
const koaStatic = require('koa-static')

const { connectionStr } = require('./config')
const routing = require('./routes')

mongoose.connect(connectionStr, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
  console.log('MongoDB 连接成功了')
})
mongoose.connection.on('error', console.error)

const app = new Koa()

app.use(koaStatic(path.join(__dirname, './public')))

app.use(error({
  postFormat: (e, {stack, ...rest}) => process.env.NODE_ENV === 'production' ? rest : {...rest, stack}
}))

app.use(koaBody({
  multipart: true,  // 启用文件
  formidable: {
    uploadDir: path.join(__dirname, './public/uploads'),
    keepExtensions: true   // 保存拓展名
  }
}))
app.use(parameter(app))
routing(app)

app.listen(3000, () => console.log('程序启动成功！'));