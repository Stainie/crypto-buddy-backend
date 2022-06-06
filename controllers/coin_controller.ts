import { Context } from "../deps.ts";
import { redisClient } from "../core/redis_service.ts";
import { constants } from "../constants/constant_values.ts";
import exchangeController from "../controllers/exchange_controller.ts";

class CoinController {
  async getPopularCoins(ctx: Context) {
    const popularCoins = await redisClient.get(constants.POPULAR_COINS);

    let coinJSON = JSON.parse(popularCoins!.toString());

    if (!popularCoins) {
      coinJSON = await exchangeController.getHistoricalData();

      if (!popularCoins) {
        ctx.response.status = 404;
        ctx.response.body = { message: "No coins data found" };
        return;
      }
    }

    ctx.response.body = coinJSON["data"];
  }
}

const coinController = new CoinController();

export default coinController;
