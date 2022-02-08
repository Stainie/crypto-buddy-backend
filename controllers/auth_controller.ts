import { Context } from "../deps.ts";
import UserModel from "../models/user_model.ts";

class AuthController {
  login() {}
  async register(ctx: Context) {
    const { email } = await ctx.request.body()
      .value;
    console.log(email);

    const user = await UserModel.findOne({ email });

    if (user) {
      ctx.response.body = { message: "Already exists" };
      ctx.response.status = 422;
      return;
    }

    ctx.response.status = 200;
    ctx.response.body = {
      message: "New user yaay!",
      action: "Create new one",
      id: 1,
    };
  }
}

const authController = new AuthController();

export default authController;
