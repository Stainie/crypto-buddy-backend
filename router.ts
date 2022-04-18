import { Router } from "./deps.ts";
import authController from "./controllers/auth_controller.ts";
import coinController from "./controllers/coin_controller.ts";
import ruleController from "./controllers/rule_controller.ts";

const router = new Router();

// User service endpoints
router
  .post("/api/login", authController.login)
  .post("/api/register", authController.register)
  // Coin service endpoints
  .get("api/coins", coinController.getPopularCoins)
  // Rule service endpoints
  .get("/api/rules/:userId", (ctx, next) => {
    ruleController.getRulesForUser(ctx, ctx.params.userId);
  })
  .put("api/rules/:id", ruleController.updateRule);

export default router;
