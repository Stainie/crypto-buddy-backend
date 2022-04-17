import { Document } from "https://deno.land/x/mongo@v0.29.1/mod.ts";
import { rulesCollection } from "../core/mongo_service.ts";
import CoinInfoModel from "./coin_info_model.ts";

export default class RuleModel {
  constructor(
    { id = "", name = "", coins = [], conditions = [] },
  ) {
    this.id = id;
    this.name = name;
    this.coins = coins;
    this.conditions = conditions;
  }
  id: string;
  name: string;
  coins: CoinInfoModel[];
  conditions: number[];

  static async findOne(params: Record<string, unknown>) {
    const rule = await rulesCollection.findOne(
      params,
    ) as Document;
    rule.id = rule._id;
    delete rule._id;
    return new RuleModel(rule);
  }

  async save() {
    this.id = await rulesCollection.insertOne(this);
    return this;
  }
}
