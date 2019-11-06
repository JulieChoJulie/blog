require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import api from './api';

const { PORT,  MONGO_URL } = process.env;

mongoose
  .connect(
    MONGO_URL,
    { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(e => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();

// apply bodyParser before applying router
// put JSON type of data in request body and parse it for a server to use
app.use(bodyParser());

router.use('/api', api.routes()); // apply api route

// apply router in app instance
app.use(router.routes()).use(router.allowedMethods());

// If port is not assigned, then use 4000
const port = PORT || 4000;

app.listen(port, () => {
  console.log('listening on port %d', port);
});