import { Context } from "../deps.ts";
import exchangeController from "./exchange_controller.ts";
class CoinController {
  async getPopularCoins(ctx: Context) {
    const response = await exchangeController.getHistoricalData();

    ctx.response.status = 200;
    ctx.response.body = response;
  }
}

const coinController = new CoinController();

export default coinController;
