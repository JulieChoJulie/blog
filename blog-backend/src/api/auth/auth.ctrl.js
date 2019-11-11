import Joi from 'joi';
import User from '../../models/user';

/*
POST /api/auth/register
{
  username: 'username',
  password: 'password'
}
 */
export const register = async ctx => {
  // validate req.body using Joi
  const schema = Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(20)
      .required(),
    password: Joi.string().required()
  });
  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;
  try {
    // check if username already exists in DB
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409; // Conflict
      return;
    }

    const user = new User({
      username,
    });
    await user.setPassword(password);
    await user.save();

    // return user without hashedPassword
    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};


/*
POST /api/auth/login
{
  usernmae: 'username',
  password: 'password'
}
 */
export const login = async ctx => {
  const { username, password} = ctx.request.body;
  if (!username || !password) {
    ctx.status = 401; //unauthroized;
    return;
  }

  try {
    const user = await User.findByUsername(username);
    if (!user) {
      ctx.status = 401;
      return;
    }
    const valid = await user.checkPassword(password);
    if (!valid) {
      ctx.status = 401;
      return;
    }
    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7days
      httpOnly: true,
    });
    ctx.status = 202;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const check = async ctx => {
  // check login status
  const { user } = ctx.state;
  if (!user) {
    // not logged in
    ctx.status = 401; // unauthorized
    return;
  }
  ctx.body = user;
};

export const  logout = async ctx => {
  ctx.cookies.set('access_token');
  ctx.status = 204; // No content
};