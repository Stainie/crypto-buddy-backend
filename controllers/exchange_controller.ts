import { apiUrls } from "../constants/api_urls.ts";
import { constants } from "../constants/constant_values.ts";
import { redisClient } from "../core/redis_service.ts";
class ExchangeController {
  async getHistoricalData() {
    console.log("long pooling");
    const myHeaders = new Headers({
      accept: "application/json",
      "X-CMC_PRO_API_KEY": Deno.env.get("COIN_MARKET_CAP_API_KEY")!,
    });
    const request = new Request(apiUrls.GET_COINS_HISTORICAL, {
      method: "GET",
      headers: myHeaders,
    });

    const response = await fetch(request);

    const coinList = await response.text();

    redisClient.set(constants.POPULAR_COINS, coinList);

    return coinList;
  }
}

const exchangeController = new ExchangeController();

export default exchangeController;
