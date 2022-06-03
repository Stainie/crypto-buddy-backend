import { Router } from "./deps.ts";
import authController from "./controllers/auth_controller.ts";
import coinController from "./controllers/coin_controller.ts";
import ruleController from "./controllers/rule_controller.ts";
import { authMiddleware } from "./middleware/auth_middleware.ts";

const router = new Router();

// User service endpoints
router
  .post("/api/login", authController.login)
  .post("/api/register", authController.register)
  // Coin service endpoints
  .get("/api/coins", coinController.getPopularCoins)
  // Rule service endpoints
  .get("/api/rules/:userId", authMiddleware, (ctx) => {
    return ruleController.getRulesForUser(ctx, ctx.params.userId);
  })
  .post("/api/rules", authMiddleware, ruleController.storeRule)
  .put("/api/rules/:id", authMiddleware, (ctx) => {
    return ruleController.updateRule(ctx, ctx.params.id);
  })
  .delete("/api/rules/:id", authMiddleware, (ctx) => {
    return ruleController.deleteRule(ctx, ctx.params.id);
  });

export default router;
