import { Document } from "https://deno.land/x/mongo@v0.29.1/mod.ts";
import db from "../core/mongo_service.ts";

export default class UserModel {
  public id: string;
  public username: string;
  public email: string;
  public password: string;

  constructor(
    { id = "", username = "", email = "", password = "" },
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static async findOne(params: Record<string, unknown>) {
    const user = await db.collection("users").findOne(
      params,
    ) as Document;
    user.id = user._id;
    delete user._id;
    return new UserModel(user);
  }

  async save() {
    this.id = await db.collection("users").insertOne(this);
    return this;
  }
}
