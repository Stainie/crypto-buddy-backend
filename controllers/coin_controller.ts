import { Context } from "../deps.ts";
import { redisClient } from "../core/redis_service.ts";
import { constants } from "../constants/constant_values.ts";
import exchangeController from "../controllers/exchange_controller.ts";
import RuleCoinModel from "../models/rule_coin_model.ts";

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

  async storeCoin(ctx: Context) {
    if (ctx.request.hasBody) {
      ctx.response.status = 400;
      ctx.response.body = {
        success: false,
        message: "No data",
      };
    }

    const { cmcId, name, value } = await ctx.request.body().value;

    const coin = new RuleCoinModel(cmcId, name, value);
    await coin.save();
    ctx.response.status = 201;
    ctx.response.body = {
      id: coin.id,
      cmcId: coin.cmcId,
      name: coin.name,
      value: coin.value,
    };
  }
}

const coinController = new CoinController();

export default coinController;
