import BaseModel from "./base_model.ts";
import { coinCollection } from "../core/mongo_service.ts";
import { Document } from "https://deno.land/x/mongo@v0.29.1/mod.ts";

export default class RuleCoinModel extends BaseModel {
  constructor(
    public cmcId?: string,
    public name?: string,
    public value?: number,
  ) {
    super();
  }

  static async findOne(params: Record<string, unknown>) {
    const coin = await coinCollection.findOne(
      params,
    ) as Document;
    const modifiedCoin = RuleCoinModel.prepare(coin);
    return modifiedCoin;
  }

  async save() {
    delete this.id;
    const { $oid } = await coinCollection.insertOne(this);
    this.id = $oid;
    return this;
  }
}
