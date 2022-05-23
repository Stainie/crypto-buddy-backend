import { Context, verify } from "../deps.ts";
import UserModel from "../models/user_model.ts";
import key from "./key.ts";

// deno-lint-ignore ban-types
export const authMiddleware = async (ctx: Context, next: Function) => {
  const headers = ctx.request.headers;

  const authHeader = headers.get("Authorization");

  if (!authHeader) {
    ctx.response.status = 401;
    ctx.response.body = { message: "Unauthorized" };
    return;
  }

  const jwt = authHeader.split(" ")[1];

  if (!jwt) {
    ctx.response.status = 401;
    ctx.response.body = { message: "Unauthorized" };
    return;
  }

  const data = await verify(jwt, key);

  if (data) {
    const user = await UserModel.findOne({ email: data.iss });
    ctx.state.user = user;
    await next();
  } else {
    ctx.response.status = 401;
    ctx.response.body = { message: "Unauthorized" };
  }
};
