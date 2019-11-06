const Router = require('koa-router');
const posts = require('./posts');
const api = new Router();

api.use('/posts', posts.routes());

// sent out the router
module.exports = api;