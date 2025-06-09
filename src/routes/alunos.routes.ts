import { NextFunction, Request, Response, Router } from "express";
import { AlunosController } from "../controllers/alunos.controller";
import { EnderecosController } from "../controllers/enderecos.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateUidFormatMiddleware } from "../middlewares/validate-uid-format.middleware";
import { blockFormado } from "../middlewares/block-formado.middlerware";
import { blockMatriculado } from "../middlewares/block-matriculado.middlerware";

export class AlunosRoutes {
  public static bind(): Router {
    const router = Router();

    router.get("/alunos", [authMiddleware, blockFormado, blockMatriculado], AlunosController.listar);
    router.get(
      "/alunos/:id",
      [authMiddleware, blockFormado, blockMatriculado, validateUidFormatMiddleware],
      AlunosController.buscarPorID
    ); 
    router.post("/alunos", AlunosController.cadastrar); 
    router.put("/alunos", [authMiddleware], AlunosController.atualizar);
    router.delete("/alunos", [authMiddleware], AlunosController.deletar);
    router.post(
      "/alunos/enderecos",
      [authMiddleware],
      EnderecosController.cadastrar
    );
    router.put(
      "/alunos/enderecos",
      [authMiddleware],
      EnderecosController.atualizar
    );

    return router;
  }
}
