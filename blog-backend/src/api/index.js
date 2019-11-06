import Router from 'koa-router';
import posts from './posts';
const api = new Router();

api.use('/posts', posts.routes());

// sent out the router
export default api;