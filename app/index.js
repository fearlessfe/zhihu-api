const Koa = require('koa')
const bodyparser = require('koa-bodyparser')   // 解析post请求体内容
const routing = require('./routes')

const app = new Koa()

app.use(bodyparser())
routing(app)

app.listen(3000, () => console.log('程序启动成功！'));