import { Router } from "./deps.ts";
import authController from "./controllers/auth_controller.ts";

const router = new Router();

// User service endpoints
router.post("/api/login", authController.login);
router.post("/api/register", authController.register);

// Coin service endpoint

export default router;
