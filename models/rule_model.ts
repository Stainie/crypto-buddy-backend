import { Document } from "https://deno.land/x/mongo@v0.29.1/mod.ts";
import { rulesCollection } from "../core/mongo_service.ts";
import BaseModel from "./base_model.ts";
import CoinInfoModel from "./coin_info_model.ts";

export default class RuleModel extends BaseModel {
  constructor(
    public userId?: string,
    public name?: string,
    public coins?: CoinInfoModel[],
    public conditions?: number[],
  ) {
    super();
  }

  static fromUser(rule: RuleModel) {
    const newInstance = new RuleModel(
      rule.userId,
      rule.name,
      rule.coins,
      rule.conditions,
    );
    newInstance.id = rule.id;

    return newInstance;
  }

  static async findOne(params: Record<string, unknown>) {
    const rule = await rulesCollection.findOne(
      params,
    ) as Document;
    const modifiedRule = RuleModel.prepare(rule);
    return modifiedRule;
  }

  async save() {
    this.id = await rulesCollection.insertOne(this);
    return this;
  }

  static async findByUserId(userId: string): Promise<RuleModel[]> {
    const rules = await rulesCollection.find({ userId });
    return rules.map((rule) => RuleModel.prepare(rule));
  }

  // deno-lint-ignore no-explicit-any
  protected static prepare(data: any) {
    BaseModel.prepare(data);
    const rule = this.fromUser(data);
    return rule;
  }
}
