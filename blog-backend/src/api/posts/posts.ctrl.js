import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';

const { ObjectId } = mongoose.Types;


// middleware checking if the id is a valid type
export const getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  try {
    const post = await Post.findById(id);
    // no post
    if (!post) {
      ctx.status = 404; // Not Found
      return;
    }
    ctx.state.post = post;
    return next()
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state;
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403; //forbidden
    return;
  }
  return next();
}

const sanitizeOption = {
  allowedTgags: [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'blockquote',
    'a',
    'img',
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    li: ['class']
  },
  allowedSchema: ['data, http'],
};

export const write = async ctx => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array()
      .items(Joi.string())
      .required()
  });

  const result = Joi.validate(ctx.request.body, schema);
  if(result.error) {
    ctx.status = 400; //bad request
    ctx.body = result.error;
    return;
  }
  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body: sanitizeHtml(body, sanitizeOption),
    tags,
    user: ctx.state.user
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

const removeHthmlAndShorten = body => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

/*
GET /api/posts?username=&tag=&page=
 */
export const list = async ctx => {
  try {
    const page = parseInt(ctx.query.page || '1', 10);

    if (page < 1) {
      ctx.status = 400;
      return;
    }

    const { tag, username } = ctx.query;
    // if tag or usernmae is valid, store in the obj, 'query'
    const query = {
      ...(username ? {'user.username': username} : {}),
      ...(tag ? {'tags': tag} : {})
    };

    // get last ten posts
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
    const postCount = await Post.countDocuments(query).exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10)); // custom header
    ctx.body = posts
      .map(post => ({
        ...post,
        body:
          removeHthmlAndShorten(post.body),
      }));
  } catch (e) {
    ctx.throw(500, e);
  }
};
export const read = async ctx => {
  ctx.body = ctx.state.post;
};
export const remove = async ctx => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content
  } catch (e) {
    ctx.throw(500, e);
  }
};
export const update = async ctx => {
  const { id } = ctx.params;
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string())
  });

  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const nextData = { ...ctx.request.body }; //copy obj
  if (nextData.body) {
    nextData.body = sanitizeHtml(nextData.body);
  }

  try {
    const post = await Post.findByIdAndUpdate(id, nextData, {
      new: true // return updated data
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body =  post;
  } catch (e) {
    ctx.throw(500, e);
  }
};