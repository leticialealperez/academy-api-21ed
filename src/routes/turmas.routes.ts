import { Router } from "express";
import { TurmasController } from "../controllers/turmas.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export class TurmasRoutes {
  public static bind(): Router {
    const router = Router();

    const controller = new TurmasController();

    router.get("/turmas", [authMiddleware], controller.listar);
    router.get("/turmas/:id", [authMiddleware], controller.buscarPorID);
    router.post("/turmas", [authMiddleware], controller.cadastrar);
    router.put("/turmas/:id", [authMiddleware], controller.atualizar);
    router.delete("/turmas/:id", [authMiddleware], controller.deletar);

    return router;
  }
}
