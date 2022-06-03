import { Context } from "../deps.ts";
import { redisClient } from "../core/redis_service.ts";
import { constants } from "../constants/constant_values.ts";
import exchangeController from "../controllers/exchange_controller.ts";

class CoinController {
  async getPopularCoins(ctx: Context) {
    let popularCoins = await redisClient.hgetall(constants.POPULAR_COINS);

    if (!popularCoins) {
      popularCoins = await exchangeController.getHistoricalData();

      if (!popularCoins) {
        ctx.response.status = 404;
        ctx.response.body = { message: "No coins data found" };
        return;
      }
    }

    ctx.response.body = popularCoins;
  }
}

const coinController = new CoinController();

export default coinController;
