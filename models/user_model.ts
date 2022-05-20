import { Document } from "https://deno.land/x/mongo@v0.29.1/mod.ts";
import { userCollection } from "../core/mongo_service.ts";
import BaseModel from "./base_model.ts";

export default class UserModel extends BaseModel {
  constructor(
    public username?: string,
    public email?: string,
    public password?: string,
  ) {
    super();
  }

  static fromUser(user: UserModel) {
    const newInstance = new UserModel(user.username, user.email, user.password);
    newInstance.id = user.id;

    return newInstance;
  }

  static async findOne(params: Record<string, unknown>) {
    const user = await userCollection.findOne(
      params,
    ) as Document;
    const modifiedUser = BaseModel.prepare(user);

    return this.fromUser(modifiedUser);
  }

  async save() {
    delete this.id;
    const { $oid } = await userCollection.insertOne(this);
    this.id = $oid;
    return this;
  }
}
