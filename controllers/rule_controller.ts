import { Bson, Context } from "../deps.ts";
import RuleModel from "../models/rule_model.ts";
import UserModel from "../models/user_model.ts";

class RuleController {
  async getRulesForUser(ctx: Context, userId: string) {
    const user = ctx.state.user as UserModel;

    if (userId != user.id) {
      ctx.response.status = 403;
      ctx.response.body = { message: "Unauthorised user" };
      return;
    }

    const rules = await RuleModel.findByUserId(userId);

    if (!rules) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Incorrect id" };
      return;
    }

    ctx.response.body = rules;
  }

  async storeRule(ctx: Context) {
    if (ctx.request.hasBody) {
      ctx.response.status = 400;
      ctx.response.body = {
        success: false,
        message: "No data",
      };
    }

    const { userId, name, coins, conditions } = await ctx.request.body().value;

    let rule = await RuleModel.findOne({ userId, name });

    if (rule) {
      ctx.response.body = { message: "Already exists" };
      ctx.response.status = 422;
      return;
    }

    rule = new RuleModel(userId, name, coins, conditions);
    await rule.save();
    ctx.response.status = 201;
    ctx.response.body = {
      id: rule.id,
      userId: rule.userId,
      name: rule.name,
      coins: rule.coins,
      conditions: rule.conditions,
    };
  }

  async updateRule(ctx: Context, id: string) {
    const rule: RuleModel = await RuleModel.findOne({
      _id: new Bson.ObjectId(id),
    });

    console.log(rule);

    if (!rule) {
      ctx.response.body = { message: "Does not exist" };
      ctx.response.status = 404;
      return;
    }

    const { userId, name, coins, conditions } = await ctx.request.body().value;

    await rule.updateOne(userId, name, coins, conditions);
    ctx.response.body = rule;
    ctx.response.status = 200;
  }

  async deleteRule(ctx: Context, id: string) {
    const rule: RuleModel = await RuleModel.findOne({
      _id: new Bson.ObjectId(id),
    });

    if (!rule) {
      ctx.response.body = { message: "Does not exist" };
      ctx.response.status = 404;
      return;
    }

    await rule.deleteOne();
    ctx.response.status = 204;
  }
}

const ruleController = new RuleController();

export default ruleController;
