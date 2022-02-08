import { Router } from "./deps.ts";
import authController from "./controllers/auth_controller.ts";

const router = new Router();

router.post("/api/login", authController.login);
router.post("/api/register", authController.register);

export default router;
