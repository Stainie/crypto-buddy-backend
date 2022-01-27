import { Context } from "../deps.ts";
import { UserModel } from "../models/user_model.ts";

const user: UserModel = { id: 1, title: "Mr" };

class AuthController {
  login() {}
  register(ctx: Context) {
    ctx.response.body = user;
    ctx.response.status = 200;
  }
}

const authController = new AuthController();

export default authController;
