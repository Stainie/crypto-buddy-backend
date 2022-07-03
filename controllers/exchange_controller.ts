import { apiUrls } from "../constants/api_urls.ts";
import { constants } from "../constants/constant_values.ts";
import { redisClient } from "../core/redis_service.ts";
import firebaseService from "../core/firebase_service.ts";
import RuleModel from "../models/rule_model.ts";
import RuleCoinModel from "../models/rule_coin_model.ts";

const options = { priority: "high", timeToLive: 60 * 60 * 24 };

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

  // deno-lint-ignore no-explicit-any
  sendNotification(payload: any) {
    firebaseService.sendToDevice(
      Deno.env.get("FIREBASE_TOKEN"),
      payload,
      options,
    );
  }

  async getDataAndNotifyListeners() {
    const promise = await Promise.all([
      this.getHistoricalData(),
      RuleModel.findNonNotifiedRules() ?? [],
    ]);

    const cmcData = promise[0]! as unknown as [];
    const rules = promise[1]! as unknown as RuleModel[];

    for (let i = 0; i < rules.length; i++) {
      const rulesToNotify = new Set<RuleModel>();

      let isPeak;

      const rule = rules[i];
      const cmcCoin = cmcData.find((coin) => {
        if (coin["id"] == rule.dipCoin) {
          isPeak = false;
          return true;
        } else if (coin["id"] == rule.peakCoin) {
          isPeak = true;
          return true;
        } else return false;
      });

      if (cmcCoin) {
        const coin = await RuleCoinModel.findOne({ cmcId: cmcCoin["id"] });
        const cmcPrice = cmcCoin["quote"]["USD"]["price"];
        if (
          (coin.value > cmcPrice && isPeak) ||
          (coin.value < cmcPrice && !isPeak)
        ) {
          if (rulesToNotify.has(rule)) {
            this.sendNotification({ rule: rule.id });
          } else {
            rulesToNotify.add(rule);
          }
        }
      }
    }
  }
}

const exchangeController = new ExchangeController();

export default exchangeController;
