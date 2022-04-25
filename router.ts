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
  .get("/api/coins", coinController.getPopularCoins)
  // Rule service endpoints
  .get("/api/rules/:userId", (ctx, next) => {
    return ruleController.getRulesForUser(ctx, ctx.params.userId);
  })
  .post("/api/rules", ruleController.storeRule)
  .put("/api/rules/:id", (ctx, next) => {
    return ruleController.updateRule(ctx, ctx.params.id);
  })
  .delete("/api/rules/:id", (ctx, next) => {
    return ruleController.deleteRule(ctx, ctx.params.id);
  });

export default router;
