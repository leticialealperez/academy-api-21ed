import { NextFunction, Request, Response, Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ProjetosController } from "../controllers/projetos.controller";
import { validateUidFormatMiddleware } from "../middlewares/validate-uid-format.middleware";

export class ProjetosRoutes {
  public static bind(): Router {
    const router = Router();

    router.get("/projetos", [authMiddleware], ProjetosController.listar);
    router.get(
      "/projetos/:id",
      [authMiddleware, validateUidFormatMiddleware],
      ProjetosController.buscarPorID
    );
    router.post("/projetos", 
        [
          authMiddleware, 
        ], 
        ProjetosController.cadastrar
    );
    router.put(
      "/projetos/:id",
      
      ProjetosController.atualizar
    );
    router.delete(
      "/projetos/:id",
      [authMiddleware],
      ProjetosController.excluir
    );

    return router;
  }
}
