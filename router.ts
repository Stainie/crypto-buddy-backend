import { Router } from "./deps.ts";
import authController from "./controllers/auth_controller.ts";
import coinController from "./controllers/coin_controller.ts";

const router = new Router();

// User service endpoints
router
  .post("/api/login", authController.login)
  .post("/api/register", authController.register)
  // Coin service endpoint
  .get("api/coins", coinController.getPopularCoins);

export default router;
