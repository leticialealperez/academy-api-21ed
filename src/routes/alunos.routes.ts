import { Router } from "express";
import { AlunosController } from "../controllers/alunos.controller";
import { EnderecosController } from "../controllers/enderecos.controller";

export class AlunosRoutes {
  public static bind(): Router {
    const router = Router();

    const controller = new AlunosController();
    const controllerEnderecos = new EnderecosController();

    router.get("/alunos", controller.listar); // listando todos os alunos
    router.get("/alunos/:id", controller.buscarPorID); // buscar um aluno por ID
    router.post("/alunos", controller.cadastrar); // cadastrando um aluno
    router.put("/alunos/:id", controller.atualizar); // atualizar um aluno
    router.delete("/alunos/:id", controller.deletar); // atualizar um aluno

    router.post("/alunos/:id/enderecos", controllerEnderecos.cadastrar);
    router.put("/alunos/:id/enderecos", controllerEnderecos.atualizar);

    return router;
  }
}
