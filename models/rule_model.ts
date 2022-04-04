import CoinInfoModel from "./coin_info_model.ts";

export default class RuleModel {
  constructor(
    $id: string,
    $name: string,
    $coins: CoinInfoModel[],
    $conditions: number[],
  ) {
    this.id = $id;
    this.name = $name;
    this.coins = $coins;
    this.conditions = $conditions;
  }
  private id: string;
  private name: string;
  private coins: CoinInfoModel[];
  private conditions: number[];
}
