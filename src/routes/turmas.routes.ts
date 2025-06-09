import { Router } from "express";
import { TurmasController } from "../controllers/turmas.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export class TurmasRoutes {
  public static bind(): Router {
    const router = Router();

    router.get("/turmas", [authMiddleware], TurmasController.listar);
    router.get("/turmas/:id", [authMiddleware], TurmasController.buscarPorID);
    router.post("/turmas", [authMiddleware], TurmasController.cadastrar);
    router.put("/turmas/:id", [authMiddleware], TurmasController.atualizar);
    router.delete("/turmas/:id", [authMiddleware], TurmasController.deletar);

    return router;
  }
}
