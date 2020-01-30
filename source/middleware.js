function compose(middlewares) {
    return function() {
        // 执行第一个
        return dispatch(0);

        function dispatch(i) {
            let fn = middlewares[i];
            if (!fn) {
                return Promise.resolve();
            }
            return fn(function next() {
                return dispatch(i + 1);
            })
        }
    }
}

async function fn1(next) {
    console.log("fn1");
    await next();
    console.log("end fn1");
}
async function fn2(next) {
    console.log("fn2");
    await delay();
    await next();
    console.log("end fn2");
}
function fn3(next) {
    console.log("fn3");
}
function delay() {
    return new Promise((reslove, reject) => {
        setTimeout(() => {
        reslove();
    }, 2000); });
}
const middlewares = [fn1, fn2, fn3];
const finalFn = compose(middlewares);
finalFn();

// const add = (x, y) => x + y;
// const square = z => z * z;

// // 最基础的
// // const fn = (x, y) => square(add(x, y));

// // 改进 有限个函数组合
// // const compose = (fn1, fn2) => (...args) => fn2(fn1(...args));

// // 改进 无限个函数组合 双重解构赋值
// const compose = (...[first, ...others]) => (...args) => {
//     let ret = first(...args);
//     others.forEach(fn => {
//         ret = fn(ret)
//     })
//     return ret;
// }
// const fn = compose(add, square, square);

// console.log(fn(3,4));
