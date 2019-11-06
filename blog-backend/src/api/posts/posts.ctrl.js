let postId = 1; // initial value of postId

// initial data of posts arr
const posts = [
  {
    id: 1,
    title: 'title',
    body: 'body',
  },
];

/* exports.name = ......
{
  write: Function,
  list: Fn,
  read: fn,
  remove: fn,
  replace: fn,
  update: fn
}
 */


/*
 write a post
 POST /api/posts
 { title, body }
 */
exports.write = ctx => {
  // Request body in REST API can search ctx.request.body
  const { title, body } = ctx.request.body;
  postId += 1;
  const post = { id: postId, title, body };
  posts.push(post);
  ctx.body = post;
}

/*
Post List
GET /api/posts
 */
exports.list = ctx => {
  ctx.body = posts;
};

/*
Search a specific post
GET /api/posts/:id
 */
exports.read = ctx => {
  const { id } = ctx.params;
  // id from params is str
  // convert id(will compare with id from params) to str
  const post = posts.find(p => p.id.toString() === id);
  // if no post -> error
  if (!post) {
    ctx.status = 404;
    ctx.body = {
      message: 'NO POST',
    };
    return;
  }
  ctx.body = post;
}

/*
Delete a specific post
DELETE /api/posts/:id
 */
exports.remove = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);
  // if no post -> error
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'NO POST'
    };
    return;
  }
  // delete index th item
  posts.splice(index, 1);
  ctx.status = 204; // No content
};

/*
Edit Post
PUT /api/posts/:id
 */
exports.replace = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'NO POST',
    };
    return;
  }
  posts[index] = {
    id,
    ...ctx.request.body,
  };
  ctx.body = posts[index];
};

/*
Edit Post (specific field)
PATCH /api/posts/:id
 */
exports.update = ctx => {
  const { id } = ctx.params;
  const index = posts.findIndex(p => p.id.toString() === id);
  if (index === -1) {
    ctx.status = 404;
    ctx.body = {
      message: 'NO POST',
    };
    return;
  }
  posts[index] = {
    ...posts[index],
    ...ctx.request.body,
  };
  ctx.body = posts[index];
}
