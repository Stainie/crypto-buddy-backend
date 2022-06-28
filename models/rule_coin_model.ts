import BaseModel from "./base_model.ts";

export default class RuleCoinModel extends BaseModel {
  constructor(
    public cmcId?: string,
    public name?: string,
    public peak?: number,
    public dip?: number,
    public isPeak?: boolean,
  ) {
    super();
  }
}
