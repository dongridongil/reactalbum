// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//     app.use(
//         '/reactalbum/signup',
//         createProxyMiddleware({
//             target: 'https://photosplash.fly.dev/',
//             pathRewrite: {
//                 '^/api': '',
//             },
//         }),
//     );
// };