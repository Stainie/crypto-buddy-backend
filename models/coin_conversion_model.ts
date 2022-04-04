export default class CoinConversionModel {
  constructor(
    $price: number,
    $volumeDay: number,
    $percentChangeHour: number,
    $percentChangeDay: number,
    $percentChangeWeek: number,
    $marketCap: number,
    $lastUpdated: string,
  ) {
    this.price = $price;
    this.volumeDay = $volumeDay;
    this.percentChangeHour = $percentChangeHour;
    this.percentChangeDay = $percentChangeDay;
    this.percentChangeWeek = $percentChangeWeek;
    this.marketCap = $marketCap;
    this.lastUpdated = $lastUpdated;
  }
  private price: number;
  private volumeDay: number;
  private percentChangeHour: number;
  private percentChangeDay: number;
  private percentChangeWeek: number;
  private marketCap: number;
  private lastUpdated: string;
}
