import { Document } from "https://deno.land/x/mongo@v0.29.1/mod.ts";
import { userCollection } from "../core/mongo_service.ts";

export default class UserModel {
  id: string;
  username: string;
  email: string;
  password: string;

  constructor(
    { id = "", username = "", email = "", password = "" },
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static async findOne(params: Record<string, unknown>) {
    const user = await userCollection.findOne(
      params,
    ) as Document;
    user.id = user._id;
    delete user._id;
    return new UserModel(user);
  }

  async save() {
    this.id = await userCollection.insertOne(this);
    return this;
  }
}
