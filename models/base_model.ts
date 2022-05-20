export default abstract class BaseModel {
  public id? = "";

  // deno-lint-ignore no-explicit-any
  protected static prepare(data: any) {
    data.id = data._id;
    delete data._id;
    return data;
  }
}
