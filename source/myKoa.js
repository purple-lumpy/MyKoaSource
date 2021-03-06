const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');

class myKoa {
    constructor() {
        this.middlewares = [];
    }

    listen(...args) {
        const server = http.createServer(async(req, res) => {
           // 创建上下文
           let ctx = this.createContect(req, res);

           // 中间件合成
           const fn = this.compose(this.middlewares);

           await fn(ctx);
           // this.callback(ctx);

           // 响应
           res.end(ctx.body);
        })
        server.listen(...args);
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    // 构建上下文
    createContect(req, res) {
        const ctx = Object.create(context);
        ctx.request = Object.create(request);
        ctx.response = Object.create(response);

        ctx.req = ctx.request.req = req;
        ctx.res = ctx.response.res = res;

        return ctx;
    }

    compose(middlewares) {
        return function(ctx) {
            // 执行第一个
            return dispatch(0);
    
            function dispatch(i) {
                let fn = middlewares[i];
                if (!fn) {
                    return Promise.resolve();
                }
                return Promise.resolve(
                    fn(ctx, function next() {
                        return dispatch(i + 1);
                    })
                );
            }
        }
    }
}

module.exports = myKoa;
