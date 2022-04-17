import { Context } from "../deps.ts";
import RuleModel from "../models/rule_model.ts";

class RuleController {
  async getRulesForUser(ctx: Context) {}

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

    rule = new RuleModel({ name, coins, conditions });
    await rule.save();
    ctx.response.status = 201;
    ctx.response.body = {
      id: rule.id,
      name: rule.name,
      coins: rule.coins,
      conditions: rule.conditions,
    };
  }

  async updateRule() {}

  async deleteRule() {}
}

const ruleController = new RuleController();

export default ruleController;
