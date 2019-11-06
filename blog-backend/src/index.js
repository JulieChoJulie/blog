const Koa = require('koa');
const Router = require('koa-router');

const api = require('./api');

const app = new Koa();
const router = new Router();

router.use('/api', api.routes()); // apply api route

// apply router in app instance
app.use(router.routes()).use(router.allowedMethods());


app.listen(4000, () => {
  console.log('listening on port 4000');
});