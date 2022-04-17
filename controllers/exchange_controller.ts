import { apiUrls } from "../constants/api_urls.ts";
class ExchangeController {
  async getHistoricalData() {
    const myHeaders = new Headers({
      accept: "application/json",
      "X-CMC_PRO_API_KEY": Deno.env.get("COIN_MARKET_CAP_API_KEY")!,
    });
    const request = new Request(apiUrls.GET_COINS_HISTORICAL, {
      method: "GET",
      headers: myHeaders,
    });

    const response = await fetch(request);

    const coinList = await response.json();

    return coinList["data"];
  }
}

const exchangeController = new ExchangeController();

export default exchangeController;
