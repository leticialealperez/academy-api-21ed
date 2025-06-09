import { NextFunction, Request, Response, Router } from "express";
import { AlunosController } from "../controllers/alunos.controller";
import { EnderecosController } from "../controllers/enderecos.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateUidFormatMiddleware } from "../middlewares/validate-uid-format.middleware";

export class AlunosRoutes {
  public static bind(): Router {
    const router = Router();

    router.get("/alunos", AlunosController.listar);
    router.get(
      "/alunos/:id",
      [validateUidFormatMiddleware],
      AlunosController.buscarPorID
    ); 
    router.post("/alunos", AlunosController.cadastrar); 

    // Rotas privadas - é preciso estar logado
    router.put("/alunos", [authMiddleware], AlunosController.atualizar); // atualizar um aluno
    router.delete("/alunos", [authMiddleware], AlunosController.deletar); // excluir um aluno

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
