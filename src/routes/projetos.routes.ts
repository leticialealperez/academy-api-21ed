import { NextFunction, Request, Response, Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { ProjetosController } from "../controllers/projetos.controller";
import { validateUidFormatMiddleware } from "../middlewares/validate-uid-format.middleware";
import { tipoPermitido } from "../middlewares/tipo-permitido";

export class ProjetosRoutes {
  public static bind(): Router {
    const router = Router();

    const controller = new ProjetosController();

    router.get("/projetos", [authMiddleware], controller.listar);
    router.get(
      "/projetos/:id",
      [authMiddleware, validateUidFormatMiddleware],
      controller.buscarPorID
    );
    router.post("/projetos", 
        [
          authMiddleware, 
          (req: Request, res: Response, nxt: NextFunction) =>  tipoPermitido(req, res, nxt, ['M', 'T'])
        ], 
        controller.cadastrar
    );
    router.put(
      "/projetos/:id",
      [authMiddleware, validateUidFormatMiddleware, (req: Request, res: Response, nxt: NextFunction) =>  tipoPermitido(req, res, nxt, ['T'])],
      controller.atualizar
    );
    router.delete(
      "/projetos/:id",
      [authMiddleware, validateUidFormatMiddleware, (req: Request, res: Response, nxt: NextFunction) =>  tipoPermitido(req, res, nxt, ['T'])],
      controller.excluir
    );

    return router;
  }
}
