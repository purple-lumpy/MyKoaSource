const Koa = require('koa');
const App = new Koa();

App.use(async (ctx, next) => {
    const start = new Date().getTime();
    console.log(`start: ${ctx.url}`);
    await next();
    const end = new Date().getTime();
    console.log(`请求${ctx.url} 耗时 ${parseInt(end - start)} ms`);
})

App.use((ctx, next) => {
    console.log('========');
    ctx.body = [{
        name: 'tom'
    }]
    next();
})

App.use((ctx, next) => {
    console.log('aaaaaaaaaaaaa');
})

App.listen(3000);
