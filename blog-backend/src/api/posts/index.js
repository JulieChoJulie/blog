import Router from'koa-router';
import * as postsCtrl from'./posts.ctrl';
import checkedLoggedIn from '../../lib/checkLoggedIn';


const posts = new Router();

const printInfo = ctx => {
  ctx.body = {
    method: ctx.method,
    path: ctx.path,
    params: ctx.params,
  };
};

posts.get('/', postsCtrl.list);
posts.post('/', checkedLoggedIn, postsCtrl.write);

const post = new Router(); // /api/posts/:id
post.get('/', postsCtrl.read);
post.delete('/', checkedLoggedIn, postsCtrl.remove);
post.patch('/', checkedLoggedIn, postsCtrl.update);

posts.use('/:id', postsCtrl.checkObjectId, post.routes());

export default posts;