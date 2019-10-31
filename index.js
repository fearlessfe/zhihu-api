const Koa = require('koa')

const app = new Koa()

app.use(async (ctx, next) => {
  await next()
  console.log(1)
  ctx.body = 'Hello World!'
});

app.use((ctx) => {
  console.log(2)
})

app.listen(3000);