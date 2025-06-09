import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export class AuthRoutes {
  public static bind(): Router {
    const router = Router();

    router.post("/login", AuthController.login);

    return router;
  }
}
