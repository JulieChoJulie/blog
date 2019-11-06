const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const api = require('./api');

const app = new Koa();
const router = new Router();

// apply bodyParser before applying router
// put JSON type of data in request body and parse it for a server to use
app.use(bodyParser());

router.use('/api', api.routes()); // apply api route

// apply router in app instance
app.use(router.routes()).use(router.allowedMethods());


app.listen(4000, () => {
  console.log('listening on port 4000');
});