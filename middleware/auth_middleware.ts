import { Context, verify } from "../deps.ts";
import UserModel from "../models/user_model.ts";
import key from "./key.ts";

const unauthorised = (ctx: Context) => {
  ctx.response.status = 401;
  ctx.response.body = { message: "Unauthorized" };
};

// deno-lint-ignore ban-types
export const authMiddleware = async (ctx: Context, next: Function) => {
  const headers = ctx.request.headers;

  const authHeader = headers.get("Authorization");

  if (!authHeader) {
    unauthorised(ctx);
    return;
  }

  const jwt = authHeader.split(" ")[1];

  if (!jwt) {
    unauthorised(ctx);
    return;
  }

  const data = await verify(jwt, key);

  if (data) {
    const user = await UserModel.findOne({ email: data.iss });
    ctx.state.user = user;
    await next();
  } else {
    unauthorised(ctx);
  }
};
