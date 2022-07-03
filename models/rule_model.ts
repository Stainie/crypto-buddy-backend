import { Document } from "https://deno.land/x/mongo@v0.29.1/mod.ts";
import { Bson } from "../deps.ts";
import { rulesCollection } from "../core/mongo_service.ts";
import BaseModel from "./base_model.ts";

export default class RuleModel extends BaseModel {
  constructor(
    public userId?: string,
    public name?: string,
    public dipCoin?: string,
    public peakCoin?: string,
    public notified?: boolean,
  ) {
    super();
  }

  static fromUser(rule: RuleModel) {
    const newInstance = new RuleModel(
      rule.userId,
      rule.name,
      rule.dipCoin,
      rule.peakCoin,
      rule.notified,
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
    delete this.id;
    const { $oid } = await rulesCollection.insertOne(this);
    this.id = $oid;
    return this;
  }

  static async findByUserId(userId: string): Promise<RuleModel[] | null> {
    const rules = await rulesCollection.find({ userId: userId });

    if (!rules) {
      return null;
    }
    return rules.map((rule) => RuleModel.prepare(rule));
  }

  static async findNonNotifiedRules() {
    const rules = await rulesCollection.find({ notified: false });

    if (!rules) {
      return null;
    }

    return rules.map((rule) => {
      rule.updateOne({ notified: true });
      RuleModel.prepare(rule);
    });
  }

  async updateOne(
    userId?: string,
    name?: string,
    dipCoin?: string,
    peakCoin?: string,
    notified?: boolean,
  ) {
    await rulesCollection.replaceOne({ _id: new Bson.ObjectId(this.id) }, {
      userId,
      name,
      dipCoin,
      peakCoin,
      notified,
    });
  }

  async deleteOne() {
    await rulesCollection.delete({ _id: new Bson.ObjectId(this.id) });
  }
}
