import { compareSync, Context, create, hashSync, Payload } from "../deps.ts";
import UserModel from "../models/user_model.ts";

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

class AuthController {
  async login(ctx: Context) {
    const { email, password } = await ctx.request.body().value;
    const user = await UserModel.findOne({ email });
    if (!user) {
      ctx.response.body = { message: "Invalid email" };
      ctx.response.status = 422;
      return;
    }

    const passwordExists = compareSync(password, user.password ?? "");
    if (!passwordExists) {
      ctx.response.body = { message: "Invalid password" };
      ctx.response.status = 422;
      return;
    }

    const payload: Payload = {
      iss: user.email,
      exp: new Date().getTime() + 60 * 60 * 1000,
    };

    const jwt = await create({ alg: "HS512", typ: "JWT" }, payload, key);

    ctx.response.body = {
      id: user.id,
      email: user.email,
      username: user.username,
      jwt,
    };
  }

  async register(ctx: Context) {
    const { email, username, password } = await ctx.request.body()
      .value;

    let user = await UserModel.findOne({ email });

    if (user) {
      ctx.response.body = { message: "Already exists" };
      ctx.response.status = 422;
      return;
    }
    const hashedPassword = hashSync(password);

    user = new UserModel(username, email, hashedPassword);
    await user.save();
    ctx.response.status = 201;
    ctx.response.body = {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
    };
  }
}

const authController = new AuthController();

export default authController;
