import { Document } from "https://deno.land/x/mongo@v0.29.1/mod.ts";
import { rulesCollection } from "../core/mongo_service.ts";
import BaseModel from "./base_model.ts";

export default class RuleModel extends BaseModel {
  constructor(
    public userId?: string,
    public name?: string,
    public coins?: number[],
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

  static async findByUserId(userId: string): Promise<RuleModel[] | null> {
    const rules = await rulesCollection.find({ userId: userId });

    if (!rules) {
      return null;
    }
    return rules.map((rule) => RuleModel.prepare(rule));
  }

  async updateOne(
    userId?: string,
    name?: string,
    coins?: number[],
    conditions?: number[],
  ) {
    await rulesCollection.updateOne({ _id: this.id }, {
      userId,
      name,
      coins,
      conditions,
    });
  }

  async delete() {
    await rulesCollection.delete({ _id: this.id });
  }

  // deno-lint-ignore no-explicit-any
  protected static prepare(data: any) {
    if (data == null) return data;
    BaseModel.prepare(data);
    const rule = this.fromUser(data);
    return rule;
  }
}
