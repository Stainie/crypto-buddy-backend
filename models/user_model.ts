import db from "../core/mongo_service.ts";

export default class UserModel {
  static findOne(params: Record<string, unknown>) {
    return db.collection("users").findOne(params);
  }
}
