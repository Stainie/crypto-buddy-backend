import CoinConversionModel from "./coin_conversion_model.ts";

export default class CoinInfoModel {
  private cmcId: number;
  private name: string;
  private symbol: string;
  private slug: string;
  private rank: number;
  private supply: number;
  private maxSupply: number;
  private dateAdded: string;
  private dateUpdated: string;
  private values: Map<string, CoinConversionModel>;

  constructor(
    $id: number,
    $name: string,
    $symbol: string,
    $slug: string,
    $rank: number,
    $supply: number,
    $maxSupply: number,
    $dateAdded: string,
    $dateUpdated: string,
    $values: Map<string, CoinConversionModel>,
  ) {
    this.cmcId = $id;
    this.name = $name;
    this.symbol = $symbol;
    this.slug = $slug;
    this.rank = $rank;
    this.supply = $supply;
    this.maxSupply = $maxSupply;
    this.dateAdded = $dateAdded;
    this.dateUpdated = $dateUpdated;
    this.values = $values;
  }
}
